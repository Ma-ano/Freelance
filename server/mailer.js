import nodemailer from 'nodemailer'

export const CONTACT_RECIPIENT = 'wrenlabsph@gmail.com'

export function mailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}

export function inquiryEmail(inquiry) {
  return {
    from: { name: 'Wren Labs Website', address: process.env.GMAIL_USER },
    to: CONTACT_RECIPIENT,
    replyTo: inquiry.email,
    subject: 'New Wren Labs project inquiry',
    text: [
      'A visitor submitted a project inquiry on the Wren Labs website.',
      '',
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Company: ${inquiry.company || 'Not provided'}`,
      '',
      'Project details:',
      inquiry.message,
      '',
      'Reply to this email to respond to the visitor.',
    ].join('\n'),
  }
}

export async function sendInquiryEmail(inquiry) {
  if (!mailConfigured()) throw new Error('MAIL_NOT_CONFIGURED')
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD.replace(/\s/g, '') },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const result = await transport.sendMail(inquiryEmail(inquiry))
  if (!result.accepted?.includes(CONTACT_RECIPIENT)) throw new Error('MAIL_NOT_ACCEPTED')
  return { messageId: result.messageId }
}
