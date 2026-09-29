import test from 'node:test'
import assert from 'node:assert/strict'
import { getGeminiConfig } from './gemini-config.js'
import { teamMembers, findPortfolioByPath } from '../src/data/team.js'

test('Gemini config supports project and Google-standard keys without blank masking', () => {
  assert.equal(getGeminiConfig({}).apiKey, '')
  assert.equal(getGeminiConfig({ GOOGLE_GEMINI_API_KEY: ' project ', GEMINI_API_KEY: 'studio' }).apiKey, 'project')
  assert.equal(getGeminiConfig({ GOOGLE_GEMINI_API_KEY: ' ', GEMINI_API_KEY: ' studio ' }).apiKey, 'studio')
  assert.equal(getGeminiConfig({ GOOGLE_API_KEY: ' google ' }).apiKey, 'google')
  assert.equal(getGeminiConfig({ GEMINI_MODEL: ' ' }).model, 'gemini-3.5-flash-lite')
  assert.equal(getGeminiConfig({ GEMINI_MODEL: ' custom-model ' }).model, 'custom-model')
})

test('talents place Raynato before Peter and retain their portfolio routes', () => {
  assert.deepEqual(teamMembers.map(member => member.id), ['raynato', 'peter'])
  assert.equal(findPortfolioByPath('/PORTFOLIO/raynatopedrajeta/').name, 'Raynato Pedrajeta')
  assert.equal(findPortfolioByPath('/PORTFOLIO/maanopetergil').name, 'Peter Gil Ma-año')
})
