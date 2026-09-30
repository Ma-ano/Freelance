import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Navigation from './portfolios/peter/components/navigation/navigation'
import Projects from './portfolios/peter/components/projects/case-studies'
import Contact from './portfolios/peter/components/contact/contact'
import Hero from './portfolios/peter/components/heroes/hero'

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
  })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

describe('migrated Peter portfolio', () => {
  it('shows Peter’s portrait with accessible text and reserved dimensions', () => {
    render(<Hero />)
    const photo = screen.getByRole('img', { name: 'Portrait of Peter Gil T. Ma-año' })
    expect(photo.getAttribute('src')).toContain('peter-portrait.png')
    expect(photo.getAttribute('width')).toBe('1254')
    expect(photo.getAttribute('height')).toBe('1254')
  })
  it('keeps the brand link on this page and provides a Wren Labs return link', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: /Peter.*Home/ }).getAttribute('href')).toBe('#home')
    expect(screen.getByRole('link', { name: 'Wren Labs ↗' }).getAttribute('href')).toBe('/#work')
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(screen.getByRole('button', { name: 'Close menu' }).getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(screen.getAllByRole('link', { name: 'About', exact: true })[1])
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe('false')
  })

  it('preserves personal contact destinations', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /Email Peter/ }).getAttribute('href')).toBe('mailto:manopetergil@gmail.com')
    expect(screen.getByRole('link', { name: /Chat on Viber/ }).getAttribute('href')).toMatch(/^viber:/)
  })

  it('preserves projects and expandable case studies', () => {
    render(<Projects />)
    expect(screen.getAllByRole('article')).toHaveLength(3)
    const button = screen.getAllByRole('button', { name: /More detail/ })[0]
    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(screen.getAllByRole('link', { name: /Visit live site/ })).toHaveLength(2)
  })
})
