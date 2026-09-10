import OpenAI from 'openai'
import { getDatabase } from '../server/mongodb.js'
import { KNOWLEDGE_DOCUMENTS, rankKnowledge } from '../server/knowledge.js'
import { checkChatRateLimit } from '../server/rate-limit.js'
import { parseConversation, WREN_INSTRUCTIONS } from '../server/conversation.js'

let knowledgeReady

function readBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body)
  return request.body || {}
}

async function loadKnowledge(question, history) {
  if (!process.env.MONGODB_URI) return { documents: rankKnowledge(question, KNOWLEDGE_DOCUMENTS, 4, history), source: 'bundled' }

  try {
    const database = await getDatabase()
    const collection = database.collection('wren_knowledge')

    if (!knowledgeReady) {
      knowledgeReady = Promise.all(
        KNOWLEDGE_DOCUMENTS.map(({ slug, ...document }) => collection.updateOne(
          { _id: `wren:${slug}` },
          { $set: { ...document, slug, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
          { upsert: true },
        )),
      )
    }

    await knowledgeReady
    const storedDocuments = await collection.find({ _id: { $in: KNOWLEDGE_DOCUMENTS.map(({ slug }) => `wren:${slug}`) } }, { projection: { _id: 0 } }).limit(50).toArray()
    return {
      documents: rankKnowledge(question, storedDocuments.length ? storedDocuments : KNOWLEDGE_DOCUMENTS, 4, history),
      source: storedDocuments.length ? 'mongodb' : 'bundled',
    }
  } catch (error) {
    knowledgeReady = undefined
    console.error('Knowledge retrieval fell back to bundled content', error instanceof Error ? error.name : 'UnknownError')
    return { documents: rankKnowledge(question, KNOWLEDGE_DOCUMENTS, 4, history), source: 'bundled' }
  }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  let message, history
  try {
    ;({ message, history } = parseConversation(readBody(request)))
  } catch {
    return response.status(400).json({ error: 'Please send a valid message between 1 and 1,000 characters.' })
  }

  if (!process.env.GROQ_API_KEY) {
    return response.status(503).json({ error: 'AI is not configured.', code: 'AI_NOT_CONFIGURED' })
  }

  try {
    const rateLimit = await checkChatRateLimit(request)
    if (!rateLimit.allowed) {
      response.setHeader('Retry-After', String(rateLimit.retryAfter))
      return response.status(429).json({ error: 'Wren is receiving a lot of questions right now. Please try again shortly.' })
    }

    const { documents: relevantDocuments, source } = await loadKnowledge(message, history)
    const context = relevantDocuments
      .map((document) => `[${document.title}]\n${document.content}`)
      .join('\n\n')

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      timeout: 20000,
      maxRetries: 0,
    })
    const result = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
      temperature: 0.3,
      max_tokens: 800,
      messages: [
        {
          role: 'system',
          content: `${WREN_INSTRUCTIONS}\n\nRetrieved reference material:\n${context || 'No relevant company facts were found for this question.'}`,
        },
        ...history,
        { role: 'user', content: message },
      ],
    })

    const answer = result.choices[0]?.message?.content?.trim()
    if (!answer) throw new Error('The AI response did not include text')

    return response.status(200).json({
      answer,
      mode: source === 'mongodb' ? 'ai-mongodb-rag' : 'ai-bundled-rag',
      sources: relevantDocuments.map((document) => document.title),
    })
  } catch (error) {
    if (error instanceof OpenAI.APIError && error.status === 429) {
      return response.status(429).json({ error: 'Wren is receiving a lot of questions right now. Please try again shortly.' })
    }

    console.error('Wren Assistant request failed', error instanceof Error ? error.name : 'UnknownError')
    return response.status(502).json({ error: 'Wren Assistant is temporarily unavailable.' })
  }
}
