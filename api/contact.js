import { getDatabase } from '../server/mongodb.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body)
  return request.body || {}
}

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = readBody(request)

    if (body.website) {
      return response.status(201).json({ ok: true })
    }

    const inquiry = {
      name: clean(body.name, 100),
      email: clean(body.email, 180).toLowerCase(),
      company: clean(body.company, 140),
      message: clean(body.message, 3000),
    }

    if (inquiry.name.length < 2 || !EMAIL_PATTERN.test(inquiry.email) || inquiry.message.length < 12) {
      return response.status(400).json({ error: 'Please complete the required fields.' })
    }

    const database = await getDatabase()
    await database.collection('inquiries').insertOne({
      ...inquiry,
      status: 'new',
      source: 'wrenlabs-website',
      createdAt: new Date(),
    })

    return response.status(201).json({ ok: true })
  } catch (error) {
    console.error('Contact submission failed', error instanceof Error ? error.name : 'UnknownError')
    return response.status(503).json({ error: 'Contact service is temporarily unavailable.' })
  }
}
