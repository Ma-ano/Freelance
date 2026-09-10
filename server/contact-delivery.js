// Both destinations are attempted independently. Never report a saved inquiry as emailed.
export async function deliverInquiry(inquiry, { save, send, emailConfigured }) {
  const [storage, email] = await Promise.allSettled([
    save(inquiry),
    emailConfigured ? send(inquiry) : Promise.reject(new Error('MAIL_NOT_CONFIGURED')),
  ])
  const saved = storage.status === 'fulfilled'
  const emailed = email.status === 'fulfilled'
  return {
    saved,
    emailed,
    reference: saved ? storage.value : undefined,
    code: emailed ? 'EMAIL_SENT' : saved ? 'SAVED_WITHOUT_EMAIL' : emailConfigured ? 'CONTACT_UNAVAILABLE' : 'CONTACT_NOT_CONFIGURED',
  }
}
