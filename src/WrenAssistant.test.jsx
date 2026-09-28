import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import WrenAssistant from './WrenAssistant.jsx'

const reply = (body = {}) => ({ ok: true, status: 200, json: async () => ({ answer: 'We build websites.', offerInquiry: false, inquirySummary: '', ...body }) })
const props = () => ({ open: true, setOpen: vi.fn(), onContact: vi.fn(), conceptQuestion: null })
async function send(text = 'Tell me about websites') {
  fireEvent.change(screen.getByLabelText('Message Wren Assistant'), { target: { value: text } })
  await act(async () => fireEvent.submit(screen.getByLabelText('Message Wren Assistant').closest('form')))
}
async function cooldown() { await act(async () => vi.advanceTimersByTime(4500)) }
beforeEach(() => {
  vi.useFakeTimers()
  Element.prototype.scrollIntoView = vi.fn()
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(reply()))
})
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.useRealTimers() })

describe('Wren chat interaction', () => {
  it('starts focused with no permanent shortcuts or inquiry button', () => {
    render(<WrenAssistant {...props()} />)
    expect(document.activeElement).toBe(screen.getByLabelText('Message Wren Assistant'))
    expect(screen.queryByText('Plan my website')).toBeNull()
    expect(screen.queryByText('Continue to inquiry →')).toBeNull()
    expect(screen.getByText(/10 of 10 messages/)).toBeTruthy()
    expect(screen.getByText(/Chirp!.*🐦/)).toBeTruthy()
  })
  it('enforces ten attempts and keeps the allowance when closed and reopened', async () => {
    const p = props()
    const view = render(<WrenAssistant {...p} />)
    for (let i = 0; i < 10; i++) { await send(); await cooldown() }
    expect(fetch).toHaveBeenCalledTimes(10)
    await send('one more')
    expect(fetch).toHaveBeenCalledTimes(10)
    expect(screen.getByLabelText('Message Wren Assistant').disabled).toBe(true)
    view.rerender(<WrenAssistant {...p} open={false} />)
    view.rerender(<WrenAssistant {...p} open />)
    expect(screen.getByText(/0 of 10 messages/)).toBeTruthy()
    expect(screen.getByText(/10-message flight/)).toBeTruthy()
    expect(screen.getByText('Continue to inquiry →')).toBeTruthy()
    view.unmount()
    render(<WrenAssistant {...p} />)
    expect(screen.getByText(/10 of 10 messages/)).toBeTruthy()
  })
  it('blocks concurrent sends and cooldown submissions', async () => {
    let resolve
    fetch.mockImplementationOnce(() => new Promise(r => { resolve = r }))
    render(<WrenAssistant {...props()} />)
    await send()
    expect(screen.getByText(/thinking on my perch/)).toBeTruthy()
    await send('duplicate')
    expect(fetch).toHaveBeenCalledTimes(1)
    await act(async () => resolve(reply()))
    await send('too early')
    expect(fetch).toHaveBeenCalledTimes(1)
    await cooldown()
    await send('allowed')
    expect(fetch).toHaveBeenCalledTimes(2)
  })
  it('hands off only on visitor click and keeps the returned draft editable in the form', async () => {
    fetch.mockResolvedValue(reply({ offerInquiry: true, inquirySummary: 'A clothing store' }))
    const p = props()
    render(<WrenAssistant {...p} />)
    await send('Please prepare my inquiry')
    expect(p.onContact).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('Continue to inquiry →'))
    expect(p.onContact).toHaveBeenCalledWith('A clothing store')
    expect(p.setOpen).toHaveBeenCalledWith(false)
  })
  it('honors server retry time and exposes contact without another AI call', async () => {
    fetch.mockResolvedValue({ ok: false, status: 429, json: async () => ({ retryAfter: 60 }) })
    render(<WrenAssistant {...props()} />)
    await send()
    expect(screen.getByText(/Wait 60s/)).toBeTruthy()
    expect(screen.getByText(/here on my perch/)).toBeTruthy()
    await cooldown()
    await send('try again')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Continue to inquiry →')).toBeTruthy()
  })
  it('handles network errors with website facts and no invented draft', async () => {
    fetch.mockRejectedValue(new Error('offline'))
    render(<WrenAssistant {...props()} />)
    await send('How much do you charge?')
    expect(screen.getByText(/No fixed prices/)).toBeTruthy()
    expect(screen.getByText(/I’m still here to help/)).toBeTruthy()
    expect(screen.queryByText('Your inquiry draft')).toBeNull()
    expect(screen.getByText(/9 of 10 messages/)).toBeTruthy()
  })
  it('prepares a concept question without spending a message and supports Escape', () => {
    const p = props()
    render(<WrenAssistant {...p} conceptQuestion={{ text: 'Tell me about commerce' }} />)
    expect(screen.getByLabelText('Message Wren Assistant').value).toBe('Tell me about commerce')
    expect(fetch).not.toHaveBeenCalled()
    fireEvent.keyDown(screen.getByLabelText('Message Wren Assistant'), { key: 'Escape' })
    expect(p.setOpen).toHaveBeenCalledWith(false)
  })
})
