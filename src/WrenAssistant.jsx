import { useEffect, useRef, useState } from 'react'
import wrenMark from './assets/wren-mark.png'
import { localAnswer } from '../server/knowledge.js'
import { PAGE_LIMIT, COOLDOWN_MS, chatHistory } from './chat-utils.js'
import { readChatSession, saveChatSession } from './chat-session.js'

export default function WrenAssistant({ open, setOpen, onContact, conceptQuestion }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ id: 'welcome', role: 'assistant', text: 'Chirp! I’m Wren, your little guide to Wren Labs. 🐦 Ask about our people, services, or an idea you’d like to give wings.' }])
  const [thinking, setThinking] = useState(false)
  const [session] = useState(readChatSession)
  const [used, setUsed] = useState(session.used)
  const [waitUntil, setWaitUntil] = useState(session.waitUntil)
  const [now, setNow] = useState(Date.now)
  const [mode, setMode] = useState('Your Gemini-powered studio guide')
  const [handoff, setHandoff] = useState(null)
  const pending = useRef(false)
  const count = useRef(session.used)
  const nextRequest = useRef(session.waitUntil)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const endRef = useRef(null)
  const controllerRef = useRef(null)
  const [previousConcept, setPreviousConcept] = useState(null)
  const restoreFocus = useRef(null)
  const remaining = PAGE_LIMIT - used
  const seconds = Math.max(0, Math.ceil((waitUntil - now) / 1000))

  useEffect(() => {
    if (!open) return
    restoreFocus.current = document.activeElement
    inputRef.current?.focus()
  }, [open])
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [open, messages, thinking])
  useEffect(() => {
    if (!waitUntil) return
    const timer = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(timer)
  }, [waitUntil])
  useEffect(() => () => controllerRef.current?.abort(), [])

  // A selected concept is a draft question; opening it never spends an AI request.
  const conceptDraft = conceptQuestion && conceptQuestion !== previousConcept
  const displayedInput = conceptDraft ? conceptQuestion.text : input
  function updateInput(value) {
    setPreviousConcept(conceptQuestion)
    setInput(value)
  }
  function close() {
    setOpen(false)
    const target = restoreFocus.current
    window.setTimeout(() => (target?.isConnected ? target : launcherRef.current)?.focus(), 0)
  }
  function continueInquiry() {
    setOpen(false)
    onContact(handoff?.summary || '')
  }
  async function send(event) {
    event.preventDefault()
    const question = displayedInput.trim()
    if (!question || pending.current || count.current >= PAGE_LIMIT || Date.now() < nextRequest.current) return
    pending.current = true
    count.current += 1
    nextRequest.current = Date.now() + COOLDOWN_MS
    // Save before the request so refreshing while it is pending still counts.
    saveChatSession(count.current, nextRequest.current)
    setUsed(count.current)
    const history = chatHistory(messages)
    updateInput('')
    setHandoff(null)
    setThinking(true)
    setMessages(current => [...current, { id: crypto.randomUUID(), role: 'user', text: question }].slice(-40))
    const controller = new AbortController()
    controllerRef.current = controller
    const timeout = setTimeout(() => controller.abort(), 25000)
    let delay = COOLDOWN_MS
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question, history }), signal: controller.signal })
      const data = await response.json()
      if (response.status === 429) {
        delay = Math.max(COOLDOWN_MS, Math.min(86400, Number(data.retryAfter) || 60) * 1000)
        throw new Error('RATE_LIMITED')
      }
      if (!response.ok || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error(data.code === 'AI_NOT_CONFIGURED' ? 'AI_NOT_CONFIGURED' : 'UNAVAILABLE')
      setMessages(current => [...current, { id: crypto.randomUUID(), role: 'assistant', text: data.answer }].slice(-40))
      setMode('Connected to Gemini')
      if (data.offerInquiry === true) setHandoff({ summary: typeof data.inquirySummary === 'string' ? data.inquirySummary : '' })
    } catch (error) {
      const limited = error.message === 'RATE_LIMITED'
      const connectionNote = error.message === 'AI_NOT_CONFIGURED'
        ? 'Gemini isn’t configured for this version of the site yet.'
        : 'I can’t reach Gemini right now.'
      const answer = limited ? 'I’ve reached my chat allowance for now. You can wait for the timer or continue to the inquiry form to reach our team. I’ll be here on my perch when chat is available again.' : `I’m still here to help. ${connectionNote} Here’s information from our website, not an AI-generated reply:\n\n${localAnswer(question, history)}`
      setMessages(current => [...current, { id: crypto.randomUUID(), role: 'assistant', text: answer, fallback: true }].slice(-40))
      setMode(limited ? 'Chat limit reached' : 'Website guide · Offline mode')
      setHandoff({ summary: '' })
    } finally {
      clearTimeout(timeout)
      pending.current = false
      setThinking(false)
      nextRequest.current = Date.now() + delay
      saveChatSession(count.current, nextRequest.current)
      setWaitUntil(nextRequest.current)
      setNow(Date.now())
    }
  }

  if (!open) return <button ref={launcherRef} type="button" onClick={() => setOpen(true)} aria-label="Talk to Wren Assistant" className="fixed bottom-4 right-4 z-[90] flex min-h-14 items-center gap-3 rounded-full bg-[#1A1A1A] px-5 py-3 font-bold text-white shadow-xl sm:bottom-6 sm:right-6"><img src={wrenMark} alt="" className="size-7 object-contain brightness-0 invert" /><span>Talk to Wren</span></button>
  return (
    <aside ref={panelRef} role="dialog" aria-label="Wren Assistant" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); close() } }} className="fixed inset-x-3 bottom-3 z-[90] flex h-[calc(100dvh-1.5rem)] max-h-[620px] flex-col overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white text-[#1A1A1A] shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px]">
      <div className="flex items-center justify-between bg-[#1A1A1A] px-4 py-3 text-white">
        <div className="flex items-center gap-3"><img src={wrenMark} alt="" className="size-9 object-contain brightness-0 invert" /><div><p className="font-bold">Wren Assistant</p><p className="text-xs text-white/65">{mode}</p></div></div>
        <button type="button" onClick={close} aria-label="Close Wren Assistant" className="size-11 rounded-full text-2xl hover:bg-white/10">×</button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <p className="mb-4 text-xl font-black">Big ideas start here.</p>
        <div role="log" aria-label="Conversation" aria-live="polite" className="space-y-3">
          {messages.map(message => <div key={message.id} className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-auto bg-[#1A1A1A] text-white' : 'bg-[#EBEBEB]/70'}`}><span className="sr-only">{message.role === 'user' ? 'You: ' : 'Wren: '}</span>{message.text}</div>)}
          {thinking && <p className="text-sm" role="status">A little thinking on my perch… 🪶</p>}
        </div>
        {(handoff || remaining === 0) && !thinking && <div className="mt-4 rounded-2xl border border-[#EBEBEB] p-3">
          {handoff?.summary && <><p className="text-xs font-bold uppercase">Your inquiry draft</p><p className="mt-2 whitespace-pre-wrap break-words text-sm">{handoff.summary}</p></>}
          {remaining === 0 && <p className="mb-3 text-sm">That’s our 10-message flight for this visit. 🪶 I can point you to the inquiry form so our team can continue by email.</p>}
          <button type="button" onClick={continueInquiry} className="mt-2 w-full rounded-full bg-[#1A1A1A] px-4 py-3 text-sm font-semibold text-white">Continue to inquiry →</button>
          <p className="mt-2 text-xs text-[#1A1A1A]/65">Review your details in the form before sending.</p>
        </div>}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="border-t border-[#EBEBEB] p-3">
        <div className="flex gap-2"><label htmlFor="wren-message" className="sr-only">Message Wren Assistant</label><input ref={inputRef} id="wren-message" value={displayedInput} onChange={event => updateInput(event.target.value)} maxLength={1000} disabled={remaining === 0} placeholder="Ask Wren about your idea…" className="min-w-0 flex-1 rounded-full border border-[#EBEBEB] px-4 py-3 text-base disabled:opacity-50" /><button type="submit" disabled={!displayedInput.trim() || thinking || remaining === 0 || seconds > 0} aria-label="Send message" className="size-12 shrink-0 rounded-full bg-[#1A1A1A] text-white disabled:opacity-35">↑</button></div>
        <p role="status" className="mt-2 text-center text-xs text-[#1A1A1A]/65">{remaining} of {PAGE_LIMIT} messages left this visit{seconds > 0 && remaining > 0 ? ` · Wait ${seconds}s` : ''}</p>
        <p className="mt-2 text-center text-[11px] text-[#1A1A1A]/60">AI can make mistakes. Keep sensitive details out of chat.</p>
      </form>
    </aside>
  )
}
