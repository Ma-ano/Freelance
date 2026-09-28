import { checkChatRateLimit } from '../server/rate-limit.js'
import { parseConversation } from '../server/conversation.js'
import { generateReply } from '../server/gemini.js'

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
  if (!process.env.GOOGLE_GEMINI_API_KEY) return response.status(503).json({ code: 'AI_UNAVAILABLE' })
  try {
    const limit = await checkChatRateLimit(request)
    if (!limit.allowed) {
      response.setHeader('Retry-After', String(limit.retryAfter))
      return response.status(429).json({ code: 'RATE_LIMITED', retryAfter: limit.retryAfter })
    }
    return response.status(200).json({ ...await generateReply(message, history), mode: 'gemini' })
  } catch (error) {
    console.error('Wren chat unavailable', error.name)
    if (error.status === 429) {
      response.setHeader('Retry-After', '60')
      return response.status(429).json({ code: 'RATE_LIMITED', retryAfter: 60 })
    }
    return response.status(503).json({ code: 'AI_UNAVAILABLE' })
  }
}
