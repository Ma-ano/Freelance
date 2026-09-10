import test from 'node:test'
import assert from 'node:assert/strict'
import { deliverInquiry } from './contact-delivery.js'
import { inquiryEmail, CONTACT_RECIPIENT } from './mailer.js'

const inquiry = { name: 'Test visitor', email: 'visitor@example.com', company: '', message: 'Test project details.' }
const success = async () => 'test-reference'
const failure = async () => { throw new Error('Unavailable') }

test('email still succeeds when MongoDB is unavailable', async () => {
  const result = await deliverInquiry(inquiry, { save: failure, send: success, emailConfigured: true })
  assert.equal(result.emailed, true)
  assert.equal(result.saved, false)
  assert.equal(result.code, 'EMAIL_SENT')
})

test('saved inquiry is never represented as emailed when SMTP fails', async () => {
  const result = await deliverInquiry(inquiry, { save: success, send: failure, emailConfigured: true })
  assert.equal(result.saved, true)
  assert.equal(result.emailed, false)
  assert.equal(result.code, 'SAVED_WITHOUT_EMAIL')
})

test('missing mail credentials and failed database return a failure', async () => {
  const result = await deliverInquiry(inquiry, { save: failure, send: () => assert.fail('Must not send'), emailConfigured: false })
  assert.equal(result.code, 'CONTACT_NOT_CONFIGURED')
  assert.equal(result.emailed, false)
  assert.equal(result.saved, false)
})

test('notification has fixed destination, visitor reply-to and plain text details', () => {
  const mail = inquiryEmail(inquiry)
  assert.equal(mail.to, CONTACT_RECIPIENT)
  assert.equal(mail.replyTo, inquiry.email)
  assert.match(mail.text, /Test project details/)
  assert.equal(mail.html, undefined)
})
