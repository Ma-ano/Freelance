import { MongoClient } from 'mongodb'

let clientPromise

export async function getDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is not configured')
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    })
    clientPromise = client.connect().catch(async (error) => {
      clientPromise = undefined
      await client.close().catch(() => {})
      throw error
    })
  }

  const client = await clientPromise
  return client.db(process.env.MONGODB_DB || 'wrenlabs')
}
