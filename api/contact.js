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

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return response.status(400).json({ error: 'Please complete the inquiry form.', code: 'INVALID_INPUT' })
    }

    if (body.website) {
      return response.status(201).json({ ok: true })
    }

    const inquiry = {
      name: clean(body.name, 100),
      email: clean(body.email, 180).toLowerCase(),
      company: clean(body.company, 140),
      message: clean(body.message, 3000),
    }

    if (inquiry.name.length < 2) {
      return response.status(400).json({ error: 'Please enter a name with at least 2 characters.', code: 'INVALID_INPUT' })
    }
    if (!EMAIL_PATTERN.test(inquiry.email)) {
      return response.status(400).json({ error: 'Please enter a valid email address.', code: 'INVALID_INPUT' })
    }
    if (inquiry.message.length < 12) {
      return response.status(400).json({ error: 'Please describe your project in at least 12 characters.', code: 'INVALID_INPUT' })
    }
    if (!process.env.MONGODB_URI) {
      return response.status(503).json({ error: 'Online inquiries are not available yet. Please email wrenlabsph@gmail.com.', code: 'CONTACT_NOT_CONFIGURED' })
    }

    const database = await getDatabase()
    const result = await database.collection('inquiries').insertOne({
      ...inquiry,
      status: 'new',
      source: 'wrenlabs-website',
      createdAt: new Date(),
    })

    return response.status(201).json({ ok: true, reference: result.insertedId.toString() })
  } catch (error) {
    console.error('Contact submission failed', error instanceof Error ? error.name : 'UnknownError')
    return response.status(503).json({ error: 'We could not save your inquiry. Please try again shortly or email wrenlabsph@gmail.com.', code: 'CONTACT_UNAVAILABLE' })
  }
}
