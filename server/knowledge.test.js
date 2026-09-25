import test from 'node:test'
import assert from 'node:assert/strict'
import { KNOWLEDGE_DOCUMENTS, localAnswer, rankKnowledge } from './knowledge.js'
import { findPortfolioByPath } from '../src/data/team.js'

test('visitor questions retrieve the relevant business or bird facts', () => {
  const questions = [
    ['What is a wren bird?', 'wren-bird'],
    ['Where do wrens live?', 'wren-bird'],
    ['What does a wren eat?', 'wren-bird'],
    ['Why did you name it Wren Labs?', 'brand-story'],
    ['What does your bird logo mean?', 'brand-story'],
    ['What do you provide?', 'company'],
    ['Ano ang kaya ninyong gawin?', 'company'],
    ['What is the agenda for a project?', 'process'],
    ['Do you design UI and UX?', 'product-design'],
    ['Who is your head developer?', 'team-portfolios'],
    ['Where can I see Peter portfolio?', 'team-portfolios'],
    ['What is RAG?', 'ai-automation'],
    ['How much does a website cost?', 'pricing-timeline'],
    ['What do I need to prepare?', 'project-brief'],
    ['Do you offer maintenance?', 'support-and-scope'],
    ['Can the assistant send an email?', 'wren-assistant'],
    ['How can I contact you?', 'contact'],
  ]
  for (const [question, slug] of questions) {
    assert.equal(rankKnowledge(question)[0]?.slug, slug, question)
  }
})

test('a new specific question outranks an unrelated recent conversation', () => {
  const history = [
    { role: 'user', content: 'I want a website and application with AI automation and RAG.' },
    { role: 'assistant', content: 'We can discuss the scope.' },
  ]
  assert.equal(rankKnowledge('What does your bird logo mean?', KNOWLEDGE_DOCUMENTS, 1, history)[0].slug, 'brand-story')
  assert.match(localAnswer('What is the project agenda?', history), /Plan together/)
})

test('the fallback explains the name, project steps, and contact address', () => {
  assert.match(localAnswer('Why the name Wren Labs?'), /symbolism/)
  assert.match(localAnswer('What is the project agenda?'), /Test and launch/)
  assert.match(localAnswer('How can I contact you?'), /wrenlabsph@gmail\.com/)
  assert.match(localAnswer('Where is Peter portfolio?'), /migration is planned/)
})

test('prepared portfolio URLs resolve directly and tolerate trailing slashes', () => {
  assert.equal(findPortfolioByPath('/PORTFOLIO/maanopetergil')?.name, 'Peter Gil Ma-año')
  assert.equal(findPortfolioByPath('/PORTFOLIO/raynatopedrajeta/')?.name, 'Raynato Pedrajeta')
  assert.equal(findPortfolioByPath('/portfolio/maanopetergil')?.id, 'peter')
  assert.equal(findPortfolioByPath('/PORTFOLIO/unknown'), undefined)
  assert.equal(findPortfolioByPath('/PORTFOLIO/maanopetergil/another'), undefined)
  assert.equal(findPortfolioByPath('/'), undefined)
})
