// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
vi.mock('../server/rate-limit.js', () => ({ checkChatRateLimit: vi.fn() }))
vi.mock('../server/gemini.js', () => ({ generateReply: vi.fn() }))
import { checkChatRateLimit } from '../server/rate-limit.js'
import { generateReply } from '../server/gemini.js'
import handler from '../api/chat.js'
function response() { return { setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn() } }
beforeEach(() => { vi.stubEnv('GOOGLE_GEMINI_API_KEY', 'test-key'); vi.stubEnv('GEMINI_API_KEY', ''); vi.stubEnv('GOOGLE_API_KEY', ''); checkChatRateLimit.mockResolvedValue({ allowed: true }); generateReply.mockResolvedValue({ answer: 'Hello', offerInquiry: false, inquirySummary: '' }) })
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
it('missing local configuration is explicit and never contacts storage or Gemini', async () => {
  vi.stubEnv('GOOGLE_GEMINI_API_KEY', ' ')
  const res = response()
  await handler({ method: 'POST', body: { message: 'Hello' } }, res)
  expect(res.status).toHaveBeenCalledWith(503)
  expect(res.json).toHaveBeenCalledWith({ code: 'AI_NOT_CONFIGURED' })
  expect(checkChatRateLimit).not.toHaveBeenCalled()
  expect(generateReply).not.toHaveBeenCalled()
})
it('standard Gemini environment name enables the same provider', async () => {
  vi.stubEnv('GOOGLE_GEMINI_API_KEY', '')
  vi.stubEnv('GEMINI_API_KEY', 'test-standard-key')
  const res = response()
  await handler({ method: 'POST', body: { message: 'Hello' } }, res)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(generateReply).toHaveBeenCalledTimes(1)
})
it('storage failure fails closed with safe stage diagnostics', async () => {
  const log = vi.spyOn(console, 'error').mockImplementation(() => {})
  checkChatRateLimit.mockRejectedValue(new Error('private connection details'))
  const res = response()
  await handler({ method: 'POST', body: { message: 'Hello' } }, res)
  expect(res.status).toHaveBeenCalledWith(503)
  expect(generateReply).not.toHaveBeenCalled()
  expect(log).toHaveBeenCalledWith('Wren chat unavailable', { stage: 'rate-limit storage', type: 'Error', status: undefined })
  expect(res.json).toHaveBeenCalledWith({ code: 'AI_STORAGE_UNAVAILABLE' })
  expect(JSON.stringify(res.json.mock.calls)).not.toContain('private')
  log.mockRestore()
})
