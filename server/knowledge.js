import { teamMembers } from '../src/data/team.js'

// Approved public facts from the completed Wren_Labs_Knowledge_Intake.xlsx,
// reviewed 2026-09-28. Removed intake tabs supply no new service or pricing terms.
export const KNOWLEDGE_DOCUMENTS = [
  {
    slug: 'wren-bird',
    title: 'The wren bird',
    keywords: ['wren', 'wrens', 'bird', 'birds', 'animal', 'species', 'song', 'sing', 'voice', 'loud', 'habitat', 'nest', 'nests', 'eat', 'diet', 'insects', 'brown', 'ibon'],
    content: 'Wrens are birds in the family Troglodytidae. One example, the Northern House Wren, is a small brown songbird with a loud, lively song. It searches shrubs and low branches for insects and can nest in cavities or nest boxes. This species is familiar in backyards across much of the United States and southern Canada; other wrens have different ranges and habits. Its small size and strong voice make it a useful image for Wren Labs’ idea of a small team with a noticeable impact. These bird details refer to the Northern House Wren and do not identify the exact species in the company logo. Source: Cornell Lab of Ornithology, https://www.allaboutbirds.org/guide/House_Wren/overview .',
  },
  {
    slug: 'brand-story',
    title: 'Why the name Wren Labs?',
    keywords: ['name', 'named', 'meaning', 'means', 'mean', 'why', 'logo', 'symbol', 'symbolism', 'brand', 'story', 'inspiration', 'intelligence', 'adaptability', 'pangalan', 'bakit', 'ibig', 'sabihin'],
    priorityKeywords: ['name', 'named', 'meaning', 'mean', 'logo', 'symbol', 'symbolism', 'pangalan'],
    content: 'Wren Labs takes its name and bird logo from the wren. For the team, this small bird represents intelligence, energy, adaptability, and the ability to make an impact beyond its size. Those qualities are the company’s chosen symbolism: a small, focused team that listens, learns, and builds useful solutions. Labs reflects an approach of exploring ideas, testing prototypes, and improving what is built. The logo represents a wren in general; the team has not specified a particular species. Do not describe intelligence or power as a measured scientific ranking of birds.',
  },
  {
    slug: 'company',
    title: 'About Wren Labs',
    keywords: ['company', 'wren', 'labs', 'who', 'team', 'services', 'studio', 'freelance', 'startup', 'provide', 'offer', 'capabilities', 'kaya', 'ginagawa', 'serbisyo'],
    content: 'Wren Labs is a small, independent technology team founded in 2026, building websites, web and mobile applications, e-commerce systems, and AI-powered solutions. It helps businesses turn ideas and practical problems into useful digital products. The team targets small and medium businesses locally and internationally. Its mission is to solve meaningful problems through useful digital products and AI solutions while building a sustainable team that clients trust. The team combines experience working together with hands-on software development, product design, AI automation, and agentic AI skills, working closely with clients to shape solutions around their needs. Wren Assistant is the website AI guide, not a human team member.',
  },
  {
    slug: 'company-story',
    title: 'Founding story and name',
    keywords: ['founded', 'founding', 'started', 'story', 'name', 'bird', 'year', '2026'],
    content: 'Wren Labs began in 2026 from the desire to build a technology company during the rapid rise of agentic AI. The founding story includes AI Lead Developer experience and bringing together a team whose skills and ideas could become meaningful solutions for clients. The name comes from the wren, a small bird known for intelligence, energy, and adaptability.',
  },
  {
    slug: 'location',
    title: 'Location and time zone',
    keywords: ['location', 'located', 'based', 'where', 'country', 'philippines', 'city', 'address', 'timezone', 'zone', 'pht'],
    content: 'Wren Labs is based in the Philippines and uses Philippine Standard Time (PHT, UTC+8). No company city or street address has been specified. It serves small and medium businesses locally and internationally. Its time zone does not imply confirmed office hours or support response times.',
  },
  {
    slug: 'team-portfolios',
    title: 'Team and portfolio',
    keywords: ['team', 'people', 'members', 'everyone', 'portfolio', 'portfolios', 'developers', 'talents', 'builders', 'domain', 'transfer'],
    priorityKeywords: ['portfolio', 'portfolios'],
    content: 'The confirmed Wren Labs team has four people: Raynato Pedrajeta, Head Developer / Owner; Peter Gil T. Ma-año, Assistant Head Developer; John Lester Malonzo, Full Stack Developer; and Renzo Pedrajeta, AI Automation Developer. Team experience and individual portfolios are not a verified list of company client projects. No specific company client project names or results have been confirmed.' + ' ' + teamMembers.map(member => `${member.name} has a prepared Wren Labs profile at ${member.href}; the current full portfolio is ${member.currentPortfolio}.`).join(' ') + ' Both prepared profiles use this website domain. Full portfolio migration is planned; these pages link to the current full sites in the meantime.',
  },
  {
    slug: 'raynato',
    title: 'Raynato Pedrajeta — Head Developer and Owner',
    keywords: ['raynato', 'owner', 'head', 'lead', 'architecture', 'leadership'],
    content: 'Raynato Pedrajeta is the Head Developer / Owner. He leads technical planning and architecture, develops core features and AI integrations, guides the development team, and oversees testing and delivery. His specialties include agentic AI, multi-agent systems, generative AI, workflow automation, systems integration, and full-stack development. His technologies include Python, TypeScript, React/Next.js, Angular, Vue.js, REST APIs, OpenClaw, OpenAI, Claude, Google Gemini/Vertex AI, Azure OpenAI, Google Cloud, and Microsoft Azure. He has more than eight years of software engineering experience across web development, generative AI, and team leadership. His project areas include AI agents, automation platforms, custom web applications, business systems, API integrations, and digital marketing workflows. He enjoys turning complex ideas into practical software and AI products. Portfolio: https://raynatopedrajeta.vercel.app',
  },
  {
    slug: 'peter',
    title: 'Peter Gil T. Ma-año — Assistant Head Developer',
    keywords: ['peter', 'gil', 'ma', 'flutter', 'laravel'],
    content: 'Peter Gil T. Ma-año is the Assistant Head Developer. He supports the development team, builds and maintains full-stack applications, reviews code, and handles integrations, debugging, deployment, and technical improvements. His specialties include full-stack, web and mobile development, backend APIs, databases, e-commerce, AI integrations, and system architecture. His technologies include React, Next.js, TypeScript, Flutter, Node.js, Express.js, Laravel, MongoDB, MySQL, Firebase, Tailwind CSS, Git, Vercel, and Render. His experience includes production-ready e-commerce, business management, school management, delivery, and multi-role applications. His project areas include web and mobile apps, e-commerce, POS/HRIS, marketplaces, delivery platforms, APIs, and AI-powered tools. He uses AI alongside modern development tools to build practical, reliable, scalable applications. Portfolio: https://ma-ano-portfolio.vercel.app/',
  },
  {
    slug: 'john-lester',
    title: 'John Lester Malonzo — Full Stack Developer',
    keywords: ['john', 'lester', 'malonzo', 'scraper', 'scraping', 'playwright', 'supabase', 'postgresql'],
    content: 'John Lester Malonzo is a Full Stack Developer. He supports system conceptualization, MVP building, technical improvements, and full-stack application maintenance. His specialties include web development, generative AI, POS, and scripting automation. His technologies include Python, BS4 (Beautiful Soup), Playwright, React, Next.js, Express.js, Tailwind CSS, Git, Vercel, TypeScript, Supabase, and PostgreSQL. His experience includes automated unit testing, AI integration for education, and web-scraper automation. His project area is web applications. Portfolio: https://malonzo-portfolio-page.vercel.app/ LinkedIn: https://www.linkedin.com/in/john-lester-malonzo/',
  },
  {
    slug: 'renzo',
    title: 'Renzo Pedrajeta — AI Automation Developer',
    keywords: ['renzo', 'n8n', 'zapier'],
    content: 'Renzo Pedrajeta is an AI Automation Developer who creates AI automation workflows and application systems. His specialties are AI automation workflows and web development. His technologies include React, Next.js, TypeScript, Node.js, Express.js, Laravel, MongoDB, MySQL, Firebase, Tailwind CSS, Git, n8n, and Zapier. His experience includes AI agents, automation platforms, and production-grade application development and support. His project areas include AI automation workflows and enterprise or production-grade application development support. LinkedIn: https://www.linkedin.com/in/renzo-pedrajeta-3a4b80213/?locale=en',
  },
  {
    slug: 'project-fit',
    title: 'Project fit and ideal clients',
    keywords: ['fit', 'client', 'clients', 'business', 'businesses', 'industry', 'industries', 'small', 'medium', 'size', 'sizes'],
    content: 'Wren Labs welcomes small and medium businesses seeking software, AI, or other technology solutions, with or without a technical background. It is open to different industries, with no single preferred industry or blanket industry exclusions defined. Each request is assessed individually for feasibility and fit with team capabilities; this is not a promise to accept every project. The team addresses problems through custom software, websites, business systems, AI, automation, and integrations. It considers different project sizes, from a focused solution or MVP to a larger product build, with scope and delivery approach depending on the project.',
  },
  {
    slug: 'project-start',
    title: 'Ideas, nontechnical clients, and project acceptance',
    keywords: ['idea', 'ideas', 'nontechnical', 'technical', 'requirements', 'acceptance', 'agreement', 'scope'],
    content: 'An idea or business problem is enough to start a conversation with Wren Labs. The team can help explore what should be built and define an initial scope. It helps nontechnical clients explain the problem, define requirements, and understand the proposed solution in plain language. Support is provided during development, and a project walkthrough and developer manual are provided at handover. Scope, timeline, deliverables, and responsibilities must be agreed before work begins. Bug-fix warranty terms after handover should also be set in the project agreement.',
  },
  {
    slug: 'project-takeover',
    title: 'Taking over unfinished projects',
    keywords: ['unfinished', 'takeover', 'existing', 'incomplete', 'take', 'over'],
    content: 'Wren Labs is open to reviewing unfinished projects. Before agreeing to scope, the team needs to understand the existing product, its current state, available documentation and access, and the work required. Acceptance is subject to that review, not automatic.',
  },
  {
    slug: 'handover',
    title: 'Handover and walkthrough',
    keywords: ['handover', 'walkthrough', 'training', 'manual', 'documentation', 'deliverables', 'completed'],
    content: 'Handover includes the completed project, a project walkthrough, the overall project scope, and a developer manual. The walkthrough covers the features and how to use the completed project. Other deliverables are specified in the project agreement. Source-code or design-file delivery and ownership should not be assumed from these general handover details.',
  },
  {
    slug: 'warranty',
    title: 'Bug-fix warranty and support boundaries',
    keywords: ['warranty', 'bug', 'bugs', 'fix', 'fixes', 'support', 'launch', 'exclusions'],
    content: 'Wren Labs provides support during product development and an agreed bug-fix warranty after completion and handover. The warranty duration and conditions are stated in the project agreement; no fixed duration is confirmed. It covers bugs in the delivered, agreed project. New features and changes to agreed scope are separate requests. Work beyond the warranty bug-fix scope or outside its period requires a separate arrangement. To request support, email wrenlabsph@gmail.com with a description of the issue or request.',
  },
  {
    slug: 'support-terms',
    title: 'Unconfirmed ownership, maintenance, hosting, support hours and response targets',
    keywords: ['ownership', 'own', 'owns', 'code', 'maintenance', 'hosting', 'domain', 'domains', 'accounts', 'fees', 'recurring', 'hours', 'response', 'sla'],
    content: 'Code and design ownership terms are not decided and will be stated in the project agreement. Ongoing maintenance is not decided; any arrangement will be agreed separately. Hosting, domain, and third-party account setup, ownership, and management are not decided and will be defined for each project. Responsibility for recurring hosting, domain, subscription, and third-party fees is not decided; applicable fees will be identified in the project agreement. Support hours and response targets are not decided. There is no confirmed commitment to free hosting, automatic ownership transfer, included ongoing maintenance, 24/7 support, or a guaranteed response time.',
  },
  {
    slug: 'sample-concepts',
    title: 'Sample concepts',
    keywords: ['concept', 'concepts', 'example', 'examples', 'sample', 'samples', 'marketing', 'payment', 'campaign'],
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
    keywords: ['design', 'ux', 'ui', 'research', 'strategy', 'wireframe', 'wireframes', 'prototype', 'prototypes', 'interface', 'identity', 'visual', 'branding'],
    content: 'Wren Labs provides product design, research and strategy: mapping user journeys, organizing content, creating wireframes, designing interfaces, and building interactive prototypes for feedback before development. Visual identity and reusable interface elements can help keep a product consistent. Deliverables and revision rounds are discussed when defining the scope; no fixed design package or unlimited revisions are published.',
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
    keywords: ['updates', 'revisions', 'payment', 'contract'],
    priorityKeywords: ['revisions', 'contract'],
    content: 'Payment terms and revision limits must be discussed with the team for the specific project. No fixed payment terms or unlimited revisions are published. Support during development and an agreed bug-fix warranty are described in the separate warranty policy; ownership, maintenance and hosting arrangements remain undecided until agreed for each project.',
  },
  {
    slug: 'wren-assistant',
    title: 'What Wren Assistant can help with',
    keywords: ['assistant', 'bot', 'human', 'person', 'help', 'chat', 'gemini'],
    content: 'Wren Assistant is an AI guide for this website. It can explain Wren Labs, the meaning of the wren name, team portfolios, services, sample concepts, and the project agenda, and help a visitor shape an initial brief. The AI uses all approved public Wren Labs knowledge with Gemini; the browser can also show basic website information when AI is unavailable. It cannot send emails, submit inquiries, book a meeting, see private customer data, or confirm project availability. Visitors need to use the contact form or email the team to send an inquiry.',
  },
  {
    slug: 'pricing-timeline',
    title: 'Pricing and timelines',
    priorityKeywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'timeline', 'duration'],
    keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'time', 'timeline', 'duration', 'weeks'],
    content: 'No fixed prices, minimum budgets, or guaranteed delivery timelines are published. Pricing and timing depend on scope, integrations, and the launch target. The team can provide a tailored estimate after discussing requirements.',
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
  const tokens = new Set(tokenize(question).map(word => ({ websites: 'website', apps: 'app', applications: 'application', charge: 'pricing', charges: 'pricing', rates: 'pricing', people: 'team' })[word] || word))
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
