export const KNOWLEDGE_DOCUMENTS = [
  {
    slug: 'websites',
    title: 'Websites and commerce',
    keywords: ['website', 'web', 'landing', 'ecommerce', 'commerce', 'store', 'shop', 'react'],
    content: 'Wren Labs designs and builds responsive React marketing sites, e-commerce experiences, and web platforms. The team can shape product direction, design the interface, build integrations, and deliver a Vercel-ready launch.',
  },
  {
    slug: 'applications',
    title: 'Applications and digital products',
    keywords: ['application', 'app', 'mobile', 'saas', 'mvp', 'product', 'software'],
    content: 'Wren Labs creates web and mobile applications from early user flows through production. Engagements can include product design, a working MVP, integrations, and a practical launch plan.',
  },
  {
    slug: 'ai-automation',
    title: 'AI, RAG, and automation',
    keywords: ['ai', 'rag', 'retrieval', 'automation', 'agent', 'agentic', 'chatbot', 'assistant', 'llm'],
    content: 'Wren Labs builds AI assistants, retrieval-augmented generation knowledge systems, agentic workflows, and Python services. Solutions are grounded in approved source material, designed with human controls, and can connect to the tools a client already uses.',
  },
  {
    slug: 'process',
    title: 'How Wren Labs works',
    keywords: ['process', 'work', 'approach', 'design', 'build', 'launch'],
    content: 'Wren Labs follows three practical stages: find the signal by clarifying the audience and core problem; make it tangible through early prototypes; then build, polish, and ship a launch-ready experience.',
  },
  {
    slug: 'pricing-timeline',
    title: 'Pricing and timelines',
    keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'time', 'timeline', 'duration', 'weeks'],
    content: 'Pricing and delivery timing depend on scope, integrations, and the launch target. A focused website can often be delivered in a few weeks, while larger applications and AI systems are planned in milestones after discovery.',
  },
  {
    slug: 'contact',
    title: 'Starting a project',
    keywords: ['contact', 'email', 'talk', 'start', 'project', 'hire', 'inquiry'],
    content: 'To start a project, share what you are building, who it is for, the main outcome, and your ideal timeline. Wren Labs can be reached at wrenlabsph@gmail.com or through the website contact form.',
  },
]

const tokenize = (value) => value.toLowerCase().match(/[a-z0-9]+/g) || []

export function rankKnowledge(question, documents = KNOWLEDGE_DOCUMENTS, limit = 4) {
  const tokens = new Set(tokenize(question))

  return documents
    .map((document) => ({
      ...document,
      score: document.keywords.reduce((total, keyword) => total + (tokens.has(keyword) ? 2 : 0), 0)
        + tokenize(document.title).reduce((total, word) => total + (tokens.has(word) ? 1 : 0), 0),
    }))
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
}
