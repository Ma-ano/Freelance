// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
vi.mock('../server/rate-limit.js', () => ({ checkChatRateLimit: vi.fn() }))
vi.mock('../server/gemini.js', () => ({ generateReply: vi.fn() }))
import { checkChatRateLimit } from '../server/rate-limit.js'
import { generateReply } from '../server/gemini.js'
import handler from '../api/chat.js'
function response() { return { setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn() } }
beforeEach(() => { vi.stubEnv('GOOGLE_GEMINI_API_KEY', 'test-key'); checkChatRateLimit.mockResolvedValue({ allowed: true }); generateReply.mockResolvedValue({ answer: 'Hello', offerInquiry: false, inquirySummary: '' }) })
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks() })
it('invalid input and oversized bodies never reach Gemini', async () => {
  const res = response()
  await handler({ method: 'POST', body: { message: '' } }, res)
  expect(res.status).toHaveBeenCalledWith(400)
  await handler({ method: 'POST', body: { message: 'Hi', extra: 'x'.repeat(16001) } }, res)
  expect(res.status).toHaveBeenCalledWith(413)
  expect(generateReply).not.toHaveBeenCalled()
})
it('server limits block the provider and expose retry time', async () => {
  checkChatRateLimit.mockResolvedValue({ allowed: false, retryAfter: 80 })
  const res = response()
  await handler({ method: 'POST', body: { message: 'Hello' } }, res)
  expect(res.status).toHaveBeenCalledWith(429)
  expect(res.setHeader).toHaveBeenCalledWith('Retry-After', '80')
  expect(generateReply).not.toHaveBeenCalled()
})
it('successful requests return the structured reply', async () => {
  const res = response()
  await handler({ method: 'POST', body: { message: 'Hello' } }, res)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith({ answer: 'Hello', offerInquiry: false, inquirySummary: '', mode: 'gemini' })
})
