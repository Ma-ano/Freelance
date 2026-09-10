import OpenAI from 'openai'
import { getDatabase } from '../server/mongodb.js'
import { KNOWLEDGE_DOCUMENTS, rankKnowledge } from '../server/knowledge.js'

let knowledgeReady

function readBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body)
  return request.body || {}
}

async function loadKnowledge(question) {
  if (!process.env.MONGODB_URI) return { documents: rankKnowledge(question), source: 'bundled' }

  try {
    const database = await getDatabase()
    const collection = database.collection('wren_knowledge')

    if (!knowledgeReady) {
      knowledgeReady = Promise.all(
        KNOWLEDGE_DOCUMENTS.map(({ slug, ...document }) => collection.updateOne(
          { slug },
          { $set: { ...document, updatedAt: new Date() }, $setOnInsert: { slug, createdAt: new Date() } },
          { upsert: true },
        )),
      )
    }

    await knowledgeReady
    const storedDocuments = await collection.find({}, { projection: { _id: 0 } }).limit(50).toArray()
    return {
      documents: rankKnowledge(question, storedDocuments.length ? storedDocuments : KNOWLEDGE_DOCUMENTS),
      source: storedDocuments.length ? 'mongodb' : 'bundled',
    }
  } catch (error) {
    knowledgeReady = undefined
    console.error('Knowledge retrieval fell back to bundled content', error instanceof Error ? error.name : 'UnknownError')
    return { documents: rankKnowledge(question), source: 'bundled' }
  }
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const body = readBody(request)
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : ''

  if (!message) {
    return response.status(400).json({ error: 'A message is required.' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(503).json({ error: 'AI is not configured.', code: 'AI_NOT_CONFIGURED' })
  }

  try {
    const { documents: relevantDocuments, source } = await loadKnowledge(message)
    const context = relevantDocuments
      .map((document) => `[${document.title}]\n${document.content}`)
      .join('\n\n')

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const result = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      store: false,
      max_output_tokens: 320,
      instructions: 'You are Wren, the concise and friendly AI studio assistant for Wren Labs. Answer only from the retrieved Wren Labs context. If the context does not answer the question, say what information is missing and invite the visitor to use the contact form. Never invent pricing, clients, guarantees, or capabilities. Keep answers under 120 words.',
      input: `Retrieved Wren Labs context:\n\n${context}\n\nVisitor question: ${message}`,
    })

    const answer = result.output_text?.trim()
    if (!answer) throw new Error('The AI response did not include text')

    return response.status(200).json({
      answer,
      mode: source === 'mongodb' ? 'ai-mongodb-rag' : 'ai-bundled-rag',
      sources: relevantDocuments.map((document) => document.title),
    })
  } catch (error) {
    console.error('Wren Assistant request failed', error instanceof Error ? error.name : 'UnknownError')
    return response.status(502).json({ error: 'Wren Assistant is temporarily unavailable.' })
  }
}
