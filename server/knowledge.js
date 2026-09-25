import { teamMembers } from '../src/data/team.js'

export const KNOWLEDGE_DOCUMENTS = [
  {
    slug: 'company',
    title: 'About Wren Labs',
    keywords: ['company', 'wren', 'labs', 'who', 'team', 'studio', 'freelance', 'startup', 'services', 'provide', 'offer', 'capabilities', 'kaya', 'ginagawa', 'serbisyo'],
    content: 'Wren Labs is a small independent freelance technology team working with startups and businesses worldwide. The team provides business websites, portfolios, online stores, web and mobile applications, AI assistants and automation, and product design. Clients work directly with the builders through planning, design, development, and launch. The aim is to solve useful problems with a focused team. The studio tagline is Small team. Big impact. Built to last. Wren Assistant is the website AI guide, not a human team member.',
  },
  {
    slug: 'brand-story',
    title: 'Why the name Wren Labs?',
    keywords: ['name', 'named', 'meaning', 'means', 'mean', 'why', 'logo', 'symbol', 'symbolism', 'brand', 'story', 'inspiration', 'intelligence', 'adaptability', 'pangalan', 'bakit', 'ibig', 'sabihin'],
    priorityKeywords: ['name', 'named', 'meaning', 'mean', 'logo', 'symbol', 'symbolism', 'pangalan'],
    content: 'Wren Labs takes its name and bird logo from the wren. For the team, this small bird represents intelligence, energy, adaptability, and the ability to make an impact beyond its size. Those qualities are the company’s chosen symbolism: a small, focused team that listens, learns, and builds useful solutions. Labs reflects an approach of exploring ideas, testing prototypes, and improving what is built. The logo represents a wren in general; the team has not specified a particular species. Do not describe intelligence or power as a measured scientific ranking of birds.',
  },
  {
    slug: 'wren-bird',
    title: 'The wren bird',
    keywords: ['wren', 'wrens', 'bird', 'birds', 'animal', 'species', 'song', 'sing', 'voice', 'loud', 'habitat', 'nest', 'nests', 'eat', 'diet', 'insects', 'brown', 'ibon'],
    content: 'Wrens are birds in the family Troglodytidae. One example, the Northern House Wren, is a small brown songbird with a loud, lively song. It searches shrubs and low branches for insects and can nest in cavities or nest boxes. This species is familiar in backyards across much of the United States and southern Canada; other wrens have different ranges and habits. Its small size and strong voice make it a useful image for Wren Labs’ idea of a small team with a noticeable impact. These bird details refer to the Northern House Wren and do not identify the exact species in the company logo. Source: Cornell Lab of Ornithology, https://www.allaboutbirds.org/guide/House_Wren/overview .',
  },
  {
    slug: 'team-portfolios',
    title: 'Team and portfolio',
    keywords: ['team', 'portfolio', 'portfolios', 'talents', 'builders', 'peter', 'gil', 'maano', 'raynato', 'pedrajeta', 'head', 'developer', 'developers', 'domain', 'transfer'],
    content: `${teamMembers.map((member) => `${member.name} is the ${member.eyebrow}. Focus: ${member.services.join(', ')}. Their Wren Labs profile is ${member.href}; their current full portfolio is ${member.currentPortfolio}`).join(' ')} Both profiles use the same website domain, with a separate /PORTFOLIO/ path for each person. Full portfolio migration is planned; the prepared profiles link to the current sites in the meantime. These are individual team portfolios, not a verified list of company client projects. No specific company client names or results have been confirmed.`,
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
    keywords: ['website', 'websites', 'web', 'landing', 'ecommerce', 'commerce', 'store', 'shop', 'react', 'responsive', 'cms', 'vercel'],
    content: 'Wren Labs can build business websites, landing pages, portfolios, and online stores. Work can include responsive layouts, content structure, forms, and agreed integrations such as a CMS or checkout provider. React, Tailwind CSS, and Motion are used on the Wren Labs website, which is prepared for Vercel hosting. The team discusses which tools fit each project; hosting, domain, payment-provider charges, and other third-party requirements depend on that setup.',
  },
  {
    slug: 'applications',
    title: 'Applications and digital products',
    keywords: ['application', 'applications', 'app', 'apps', 'mobile', 'saas', 'mvp', 'software', 'dashboard', 'database'],
    content: 'Wren Labs can design and develop web and mobile applications, dashboards, and MVPs. The team helps define the first release, map user journeys, build screens, connect databases and services, and prepare a launch plan. Features such as accounts, reporting, or integrations can be discussed as part of the scope; they are not automatically included in every project.',
  },
  {
    slug: 'ai-automation',
    title: 'AI, RAG, and automation',
    keywords: ['ai', 'rag', 'retrieval', 'automation', 'automate', 'agent', 'agents', 'agentic', 'chatbot', 'chatbots', 'llm', 'python', 'documents'],
    content: 'Wren Labs can build AI assistants, RAG knowledge systems, agentic workflows, and Python services. RAG means Retrieval-Augmented Generation: retrieve relevant information from approved documents, then give that context to an AI model to help it answer. Possible uses include company FAQs, internal knowledge search, and connected support tools. Automation can connect tools and help with repetitive tasks, with human approval where needed. Source quality, access permissions, and accuracy checks matter; AI answers can still be wrong. Providers, running costs, and the level of automation are agreed per project.',
  },
  {
    slug: 'product-design',
    title: 'Product design and user experience',
    keywords: ['design', 'ux', 'ui', 'wireframe', 'wireframes', 'prototype', 'prototypes', 'interface', 'identity', 'visual', 'branding'],
    content: 'Wren Labs provides product design: mapping user journeys, organizing content, creating wireframes, designing interfaces, and building interactive prototypes for feedback before development. Visual identity and reusable interface elements can help keep a product consistent. Deliverables and revision rounds are discussed when defining the scope; no fixed design package or unlimited revisions are published.',
  },
  {
    slug: 'process',
    title: 'How Wren Labs works',
    keywords: ['process', 'agenda', 'steps', 'stages', 'approach', 'workflow', 'journey', 'launch', 'handoff', 'paano'],
    priorityKeywords: ['agenda', 'process', 'steps', 'stages', 'workflow', 'handoff'],
    content: 'The project agenda has three stages. 1. Plan together: discuss goals, audience, must-have features, budget, and target date, then agree on scope and priorities. 2. Design and build: map key user flows, share designs or prototypes, develop the agreed features, and use client feedback to refine the result. 3. Test and launch: check key journeys across screen sizes, polish details, prepare deployment and handoff, and discuss support after launch. A target date is a planning input, not a guaranteed deadline.',
  },
  {
    slug: 'project-brief',
    title: 'Preparing for the first project conversation',
    keywords: ['prepare', 'brief', 'requirements', 'meeting', 'kickoff', 'discuss', 'need', 'needed', 'assets', 'kailangan'],
    content: 'For a useful first conversation, share what you want to build, who will use it, the problem to solve, and the main features. A budget range, target launch date, examples you like, existing website links, and available branding or content help the team understand the scope. It is fine to have an early idea rather than a complete specification. Do not send account passwords or private customer data through chat or the inquiry form.',
  },
  {
    slug: 'support-and-scope',
    title: 'Updates, support, and project scope',
    keywords: ['support', 'maintenance', 'updates', 'revisions', 'hosting', 'ownership', 'payment', 'contract'],
    priorityKeywords: ['maintenance', 'revisions', 'ownership', 'contract'],
    content: 'Post-launch maintenance, ongoing support, hosting responsibilities, source-code handoff, ownership, payment terms, and revision limits must be discussed with the team for the specific project. Wren Labs has not published fixed terms for these services. Do not promise free hosting, lifetime support, unlimited changes, or a particular ownership agreement.',
  },
  {
    slug: 'wren-assistant',
    title: 'What Wren Assistant can help with',
    keywords: ['assistant', 'bot', 'human', 'person', 'help', 'chat', 'groq'],
    content: 'Wren Assistant is an AI guide for this website. It can explain Wren Labs, the meaning of the wren name, team portfolios, services, sample concepts, and the project agenda, and help a visitor shape an initial brief. The AI uses retrieved public Wren Labs knowledge; the browser can also show basic website information when AI is unavailable. It cannot send emails, submit inquiries, book a meeting, see private customer data, or confirm project availability. Visitors need to use the contact form or email the team to send an inquiry.',
  },
  {
    slug: 'pricing-timeline',
    title: 'Pricing and timelines',
    keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'time', 'timeline', 'duration', 'weeks'],
    priorityKeywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'timeline', 'duration'],
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
const commonWords = new Set('a an and are as at be by can do does for from how i in is it me my of on or our that the this to us what when where which who will with you your'.split(' '))

export function rankKnowledge(question, documents = KNOWLEDGE_DOCUMENTS, limit = 4, history = []) {
  const tokens = new Set(tokenize(question))
  const previousTokens = new Set(tokenize(history.filter((item) => item.role === 'user').slice(-2).map((item) => item.content).join(' ')))

  return documents
    .map((document) => ({
      ...document,
      score: document.keywords.reduce((total, keyword) => total + (tokens.has(keyword) ? 3 : previousTokens.has(keyword) ? 0.5 : 0), 0)
        + (document.priorityKeywords || []).reduce((total, keyword) => total + (tokens.has(keyword) ? 4 : 0), 0)
        + tokenize(document.title).reduce((total, word) => total + (!commonWords.has(word) && tokens.has(word) ? 1 : 0), 0),
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
