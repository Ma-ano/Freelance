export const KNOWLEDGE_DOCUMENTS = [
  {
    slug: 'company',
    title: 'About Wren Labs',
    keywords: ['company', 'wren', 'labs', 'who', 'you', 'us', 'team', 'do', 'services'],
    content: 'Wren Labs is a small independent freelance technology team building websites, web and mobile applications, AI automation, and product designs. The name comes from the wren: a small bird known for intelligence, energy, adaptability, and surprising power. The team works with startups and businesses worldwide. Wren Assistant is the website AI guide, not a human team member.',
  },
  {
    slug: 'team-portfolios',
    title: 'Team and portfolio',
    keywords: ['team', 'portfolio', 'portfolios', 'work', 'projects', 'made', 'built', 'peter', 'raynato', 'developers'],
    content: 'Raynato Pedrajeta is the Head Developer at Wren Labs, focused on agentic AI, Python, LLM applications, and governed multi-agent systems (https://raynatopedrajeta.vercel.app/). Peter Gil Ma-año is the Assistant Developer, focused on full-stack software, web, and mobile development (https://ma-ano-portfolio.vercel.app/). These are individual team portfolios, not a verified list of company client projects. No specific client project names or results have been confirmed.',
  },
  {
    slug: 'sample-concepts',
    title: 'Sample concepts',
    keywords: ['concept', 'concepts', 'example', 'examples', 'sample', 'samples', 'marketing', 'payment', 'campaign', 'support'],
    content: 'The Sample Concepts section demonstrates four ideas: e-commerce with automated payment confirmation and order tracking; an agentic digital marketing workspace with human approval; campaign analytics with email or SMS follow-ups; and a support assistant connecting several business systems. These are illustrative concepts, not shipped client work or live products. Visitors can discuss a similar idea with the team.',
  },
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
    content: 'No fixed prices, minimum budgets, or guaranteed delivery timelines are published. Pricing and timing depend on scope, integrations, and the launch target. The team can provide a tailored estimate after discussing requirements. Do not promise a delivery date.',
  },
  {
    slug: 'contact',
    title: 'Starting a project',
    keywords: ['contact', 'email', 'talk', 'start', 'project', 'hire', 'inquiry'],
    content: 'To start a project, share what you are building, who it is for, the main outcome, and your ideal timeline. Wren Labs can be reached at wrenlabsph@gmail.com or through the website contact form.',
  },
]

const tokenize = (value) => value.toLowerCase().match(/[a-z0-9]+/g) || []

export function rankKnowledge(question, documents = KNOWLEDGE_DOCUMENTS, limit = 4, history = []) {
  const tokens = new Set(tokenize(question))
  const previousTokens = new Set(tokenize(history.filter((item) => item.role === 'user').slice(-2).map((item) => item.content).join(' ')))

  return documents
    .map((document) => ({
      ...document,
      score: document.keywords.reduce((total, keyword) => total + (tokens.has(keyword) ? 3 : previousTokens.has(keyword) ? 0.5 : 0), 0)
        + tokenize(document.title).reduce((total, word) => total + (tokens.has(word) ? 1 : 0), 0),
    }))
    .filter((document) => document.score > 0)
    .sort((first, second) => second.score - first.score)
    .slice(0, limit)
}

export function localAnswer(question, history = []) {
  if (/^(hi|hello|hey|hello wren|hi wren)[!.\s]*$/i.test(question.trim())) return 'Hi! I’m Wren, the Wren Labs website guide. What would you like to know about our team or what we build?'
  if (/^(thanks|thank you|thank you wren)[!.\s]*$/i.test(question.trim())) return 'You’re welcome! I’m here if another question comes up.'
  const match = rankKnowledge(question, KNOWLEDGE_DOCUMENTS, 1, history)[0]
  return match?.content || 'I don’t have that information yet. Tell me a little more about what you mean, or contact the team at wrenlabsph@gmail.com.'
}
