import { createHash } from 'node:crypto'
import { getDatabase } from './mongodb.js'

let indexReady
const localCounters = new Map()
export const CHAT_LIMITS = { page: 10, minute: 10, day: 100, global: 900, cooldownSeconds: 4 }

export function rateBuckets(address, now = Date.now()) {
  const visitor = createHash('sha256').update(address).digest('hex').slice(0, 24)
  return [
    { key: `cooldown:${visitor}:${Math.floor(now / 4000)}`, limit: 1, end: (Math.floor(now / 4000) + 1) * 4000 },
    { key: `minute:${visitor}:${Math.floor(now / 60000)}`, limit: CHAT_LIMITS.minute, end: (Math.floor(now / 60000) + 1) * 60000 },
    { key: `day:${visitor}:${Math.floor(now / 86400000)}`, limit: CHAT_LIMITS.day, end: (Math.floor(now / 86400000) + 1) * 86400000 },
    { key: `global:${Math.floor(now / 86400000)}`, limit: CHAT_LIMITS.global, end: (Math.floor(now / 86400000) + 1) * 86400000 },
  ]
}

export async function consumeBuckets(buckets, consume, now = Date.now()) {
  for (const bucket of buckets) {
    if (!await consume(bucket)) return { allowed: false, retryAfter: Math.max(1, Math.ceil((bucket.end - now) / 1000)) }
  }
  return { allowed: true }
}

function consumeLocal(buckets, now) {
  for (const [key, value] of localCounters) if (value.end <= now) localCounters.delete(key)
  return consumeBuckets(buckets, async ({ key, limit, end }) => {
    const count = localCounters.get(key)?.count || 0
    if (count >= limit) return false
    localCounters.set(key, { count: count + 1, end })
    return true
  }, now)
}

export async function checkChatRateLimit(request) {
  const forwarded = request.headers?.['x-forwarded-for']
  // Vercel's trusted forwarding header in production; socket address locally.
  const address = process.env.VERCEL
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() || 'unknown'
    : request.socket?.remoteAddress || 'local'
  const now = Date.now()
  const buckets = rateBuckets(address, now)
  if (!process.env.MONGODB_URI) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) throw new Error('RATE_LIMIT_STORAGE_REQUIRED')
    return consumeLocal(buckets, now)
  }
  let collection
  try {
    collection = (await getDatabase()).collection('ai_rate_limits')
  } catch (error) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) throw error
    return consumeLocal(buckets, now)
  }
  if (!indexReady) indexReady = collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(error => {
    indexReady = undefined
    throw error
  })
  await indexReady
  return consumeBuckets(buckets, async ({ key, limit, end }) => {
    try {
      await collection.findOneAndUpdate(
        { _id: key, count: { $lt: limit } },
        { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(end) } },
        { upsert: true, returnDocument: 'after' },
      )
      return true
    } catch (error) {
      if (error.code === 11000) return false
      throw error
    }
  }, now)
}
