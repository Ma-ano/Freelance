import { checkChatRateLimit } from '../server/rate-limit.js'
import { parseConversation } from '../server/conversation.js'
import { generateReply } from '../server/gemini.js'
import { getGeminiConfig } from '../server/gemini-config.js'

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }
  let message, history
  try {
    const raw = typeof request.body === 'string' ? request.body : JSON.stringify(request.body || {})
    if (Buffer.byteLength(raw) > 16000) return response.status(413).json({ error: 'Message is too large.' })
    ;({ message, history } = parseConversation(JSON.parse(raw)))
  } catch {
    return response.status(400).json({ error: 'Please send a message between 1 and 1,000 characters.' })
  }
  if (!getGeminiConfig().apiKey) return response.status(503).json({ code: 'AI_NOT_CONFIGURED' })
  let stage = 'rate-limit storage'
  try {
    const limit = await checkChatRateLimit(request)
    if (!limit.allowed) {
      response.setHeader('Retry-After', String(limit.retryAfter))
      return response.status(429).json({ code: 'RATE_LIMITED', retryAfter: limit.retryAfter })
    }
    stage = 'Gemini response'
    return response.status(200).json({ ...await generateReply(message, history), mode: 'gemini' })
  } catch (error) {
    // Useful Vercel diagnostics without logging messages, keys, or provider bodies.
    console.error('Wren chat unavailable', { stage, type: error.name, status: error.status })
    if (error.status === 429) {
      response.setHeader('Retry-After', '60')
      return response.status(429).json({ code: 'RATE_LIMITED', retryAfter: 60 })
    }
    return response.status(503).json({ code: stage === 'rate-limit storage' ? 'AI_STORAGE_UNAVAILABLE' : 'AI_UNAVAILABLE' })
  }
}
