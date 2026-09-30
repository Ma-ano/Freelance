import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { portfolioEntryForPath, peterPortfolioEntry, portfolioPages } from './portfolio-pages.js'

test('Peter portfolio direct URLs resolve to the separate entry', () => {
  for (const path of ['/PORTFOLIO/maanopetergil', '/PORTFOLIO/maanopetergil/', '/portfolio/maanopetergil', '/portfolio/maanopetergil/', peterPortfolioEntry]) {
    assert.equal(portfolioEntryForPath(path), peterPortfolioEntry)
  }
})

test('other profiles, assets, and APIs remain unaffected', () => {
  for (const path of ['/', '/PORTFOLIO/raynatopedrajeta', '/PORTFOLIO/maanopetergil-other', '/PORTFOLIO/maanopetergil/unknown', '/api/chat', '/assets/file.js']) {
    assert.equal(portfolioEntryForPath(path), null)
  }
})

test('dev and preview preserve query strings and call next', () => {
  for (const hook of ['configureServer', 'configurePreviewServer']) {
    let middleware
    portfolioPages()[hook]({ middlewares: { use: fn => { middleware = fn } } })
    const req = { url: '/PORTFOLIO/maanopetergil?ref=team' }
    let nextCalled = false
    middleware(req, {}, () => { nextCalled = true })
    assert.equal(req.url, peterPortfolioEntry + '?ref=team')
    assert.equal(nextCalled, true)
  }
})

test('Vercel exact rewrites precede generic portfolio fallback', () => {
  const { rewrites } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  const genericIndex = rewrites.findIndex(rule => rule.source === '/PORTFOLIO/:path*')
  for (const path of ['/PORTFOLIO/maanopetergil', '/PORTFOLIO/maanopetergil/', '/portfolio/maanopetergil', '/portfolio/maanopetergil/']) {
    const index = rewrites.findIndex(rule => rule.source === path)
    assert.ok(index >= 0 && index < genericIndex)
    assert.equal(rewrites[index].destination, peterPortfolioEntry)
  }
})
