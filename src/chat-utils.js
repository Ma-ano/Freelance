export const PAGE_LIMIT = 10
export const COOLDOWN_MS = 4000

export function mergeInquiryDraft(existing, summary) {
  const draft = summary.trim().slice(0, 2200)
  if (!draft || existing.includes(draft)) return { message: existing, notice: 'Review your details, then send your inquiry when ready.' }
  const message = existing.trim() ? `${existing}\n\nProject details from Wren chat:\n${draft}` : draft
  if (message.length > 3000) return { message: existing, notice: 'Your existing message was preserved. There was not enough room to add the chat summary; you can edit your message before sending.' }
  return { message, notice: 'Wren prepared project details from your conversation. Please review and edit them before sending.' }
}

export function chatHistory(messages) {
  return messages.filter(m => m.id !== 'welcome' && !m.fallback).slice(-6).map(m => ({ role: m.role, content: m.text.slice(0, 800) }))
}
