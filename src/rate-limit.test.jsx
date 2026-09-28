// @vitest-environment node
import { afterEach, expect, it, vi } from 'vitest'
vi.mock('../server/mongodb.js', () => ({ getDatabase: vi.fn() }))
import { getDatabase } from '../server/mongodb.js'
afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); vi.resetModules(); vi.clearAllMocks() })

it('local server quota persists across requests and enforces day allowance after refresh', async () => {
  vi.stubEnv('MONGODB_URI', '')
  vi.stubEnv('NODE_ENV', 'development')
  vi.stubEnv('VERCEL', '')
  vi.useFakeTimers()
  const { checkChatRateLimit } = await import('../server/rate-limit.js')
  const request = { socket: { remoteAddress: 'test' } }
  for (let i = 0; i < 100; i++) {
    vi.setSystemTime(new Date(Date.UTC(2026, 8, 24, 0, i)))
    expect((await checkChatRateLimit(request)).allowed).toBe(true)
  }
  vi.setSystemTime(new Date(Date.UTC(2026, 8, 24, 2)))
  expect((await checkChatRateLimit({ ...request })).allowed).toBe(false)
})
it('production fails closed without persistent storage', async () => {
  vi.stubEnv('MONGODB_URI', '')
  vi.stubEnv('NODE_ENV', 'production')
  const { checkChatRateLimit } = await import('../server/rate-limit.js')
  await expect(checkChatRateLimit({})).rejects.toThrow('RATE_LIMIT_STORAGE_REQUIRED')
})
it('Mongo saturation is denied with atomic capped unique-ID counters', async () => {
  vi.stubEnv('MONGODB_URI', 'configured')
  const collection = { createIndex: vi.fn().mockResolvedValue('ttl'), findOneAndUpdate: vi.fn().mockRejectedValue({ code: 11000 }) }
  getDatabase.mockResolvedValue({ collection: () => collection })
  const { checkChatRateLimit } = await import('../server/rate-limit.js')
  expect((await checkChatRateLimit({})).allowed).toBe(false)
  const [query, update, options] = collection.findOneAndUpdate.mock.calls[0]
  expect(query._id).toMatch(/^cooldown:/)
  expect(query.count).toEqual({ $lt: 1 })
  expect(update.$inc).toEqual({ count: 1 })
  expect(options.upsert).toBe(true)
})
it('index creation can recover after a transient error', async () => {
  vi.stubEnv('MONGODB_URI', 'configured')
  const collection = { createIndex: vi.fn().mockRejectedValueOnce(new Error('temporary')).mockResolvedValue('ttl'), findOneAndUpdate: vi.fn().mockResolvedValue({ count: 1 }) }
  getDatabase.mockResolvedValue({ collection: () => collection })
  const { checkChatRateLimit } = await import('../server/rate-limit.js')
  await expect(checkChatRateLimit({})).rejects.toThrow('temporary')
  expect((await checkChatRateLimit({})).allowed).toBe(true)
  expect(collection.createIndex).toHaveBeenCalledTimes(2)
})
