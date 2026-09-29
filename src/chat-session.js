import { PAGE_LIMIT } from './chat-utils.js'

const STORAGE_KEY = 'wren-chat-allowance-v1'

// Per-tab visit state survives reloads. This is UI bookkeeping, not a security
// boundary; persistent server-side rate limits still protect the Gemini quota.
export function readChatSession() {
  try {
    const value = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY))
    return {
      used: Number.isInteger(value?.used) ? Math.min(PAGE_LIMIT, Math.max(0, value.used)) : 0,
      waitUntil: Number.isFinite(value?.waitUntil) && value.waitUntil > 0 ? Math.min(value.waitUntil, Date.now() + 86400000) : 0,
    }
  } catch {
    return { used: 0, waitUntil: 0 }
  }
}

export function saveChatSession(used, waitUntil) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ used, waitUntil }))
  } catch {
    // Storage may be unavailable in restricted browsers; chat must still work.
  }
}
