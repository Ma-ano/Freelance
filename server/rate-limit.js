import { createHash } from 'node:crypto'
import { getDatabase } from './mongodb.js'

let indexReady

function getClientAddress(request) {
  const forwarded = request.headers?.['x-forwarded-for']
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded
  return value?.split(',')[0]?.trim() || request.headers?.['x-real-ip'] || 'unknown'
}

function hashAddress(address) {
  return createHash('sha256').update(address).digest('hex').slice(0, 24)
}

async function incrementCounter(collection, key, expiresAt) {
  await collection.updateOne(
    { key },
    { $inc: { count: 1 }, $setOnInsert: { key, createdAt: new Date(), expiresAt } },
    { upsert: true },
  )

  const counter = await collection.findOne({ key }, { projection: { count: 1 } })
  return counter?.count || 0
}

export async function checkChatRateLimit(request) {
  if (!process.env.MONGODB_URI) return { allowed: true }

  const database = await getDatabase()
  const collection = database.collection('ai_rate_limits')

  if (!indexReady) {
    indexReady = collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
  }
  await indexReady

  const now = new Date()
  const minuteBucket = Math.floor(now.getTime() / 60000)
  const dayBucket = now.toISOString().slice(0, 10)
  const visitor = hashAddress(getClientAddress(request))
  const minuteExpiry = new Date((minuteBucket + 2) * 60000)
  const dayExpiry = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

  const [visitorMinute, visitorDay, globalDay] = await Promise.all([
    incrementCounter(collection, `visitor:${visitor}:minute:${minuteBucket}`, minuteExpiry),
    incrementCounter(collection, `visitor:${visitor}:day:${dayBucket}`, dayExpiry),
    incrementCounter(collection, `global:day:${dayBucket}`, dayExpiry),
  ])

  return {
    allowed: visitorMinute <= 10 && visitorDay <= 100 && globalDay <= 900,
    retryAfter: visitorMinute > 10 ? 60 : 3600,
  }
}
