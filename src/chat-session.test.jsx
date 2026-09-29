import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { readChatSession, saveChatSession } from './chat-session.js'

beforeEach(() => sessionStorage.clear())
afterEach(() => vi.restoreAllMocks())

it('stores only the count and retry deadline and restores them', () => {
  const waitUntil = Date.now() + 60000
  saveChatSession(3, waitUntil)
  expect(readChatSession()).toEqual({ used: 3, waitUntil })
})
it('handles malformed data and bounds stored counts', () => {
  sessionStorage.setItem('wren-chat-allowance-v1', '{broken')
  expect(readChatSession()).toEqual({ used: 0, waitUntil: 0 })
  saveChatSession(100, -10)
  expect(readChatSession()).toEqual({ used: 10, waitUntil: 0 })
})
it('does not break chat if storage access is denied', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('denied') })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('denied') })
  expect(readChatSession()).toEqual({ used: 0, waitUntil: 0 })
  expect(() => saveChatSession(1, 0)).not.toThrow()
})
