import { WREN_INSTRUCTIONS } from './conversation.js'
import { KNOWLEDGE_DOCUMENTS } from './knowledge.js'
import { getGeminiConfig } from './gemini-config.js'

export function geminiRequest(message, history) {
  return {
    systemInstruction: { parts: [{ text: `${WREN_INSTRUCTIONS}\n\nApproved company knowledge:\n${KNOWLEDGE_DOCUMENTS.map(d => `[${d.title}]\n${d.content}`).join('\n\n')}\n\nReply as Wren on this turn, even deep into a conversation: warm first-person guidance, with one light bird touch in ordinary answers and at most one approved emoji. For serious concerns or a request for less playfulness, stay gentle and direct. Vary recent phrasing. Answer the current question before offering contact. Keep the inquiry draft emoji-free and include only visitor-stated requirements, never your own suggested features.` }] },
    contents: [...history, { role: 'user', content: message }].map(item => ({ role: item.role === 'assistant' ? 'model' : 'user', parts: [{ text: item.content }] })),
    generationConfig: {
      temperature: 0.4, maxOutputTokens: 1000,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT', properties: {
          answer: { type: 'STRING' },
          offerInquiry: { type: 'BOOLEAN' },
          inquirySummary: { type: 'STRING' },
        }, required: ['answer', 'offerInquiry', 'inquirySummary'],
      },
    },
  }
}

export function parseGeminiResult(result) {
  const candidate = result.candidates?.[0]
  if (candidate?.finishReason !== 'STOP') throw new Error('INCOMPLETE_RESPONSE')
  const text = candidate.content?.parts?.filter(p => !p.thought).map(p => p.text || '').join('')
  const data = JSON.parse(text || '{}')
  if (typeof data.answer !== 'string' || !data.answer.trim() || data.answer.length > 4000 || typeof data.offerInquiry !== 'boolean' || typeof data.inquirySummary !== 'string') throw new Error('INVALID_RESPONSE')
  return { answer: data.answer.trim(), offerInquiry: data.offerInquiry, inquirySummary: data.offerInquiry ? data.inquirySummary.trim().slice(0, 2200) : '' }
}

export async function generateReply(message, history, fetcher = fetch) {
  const { apiKey, model } = getGeminiConfig()
  const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(geminiRequest(message, history)), signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) {
    const error = new Error('GEMINI_UNAVAILABLE')
    error.status = response.status
    throw error
  }
  return parseGeminiResult(await response.json())
}
