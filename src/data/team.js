export const teamMembers = [
  {
    id: 'peter',
    slug: 'maanopetergil',
    name: 'Peter Gil Ma-año',
    title: 'PETER GIL MA-AÑO',
    initials: 'PM',
    eyebrow: 'Assistant Head Developer',
    category: 'Web & Mobile',
    href: '/PORTFOLIO/maanopetergil',
    currentPortfolio: 'https://ma-ano-portfolio.vercel.app/',
    color: '#1A1A1A',
    textColor: '#ffffff',
    dark: true,
    summary: 'Full-stack development for websites, web applications, and mobile experiences built around everyday business needs.',
    services: ['Full-stack engineering', 'Web applications', 'Mobile development'],
  },
  {
    id: 'raynato',
    slug: 'raynatopedrajeta',
    name: 'Raynato Pedrajeta',
    title: 'RAYNATO PEDRAJETA',
    initials: 'RP',
    eyebrow: 'Head Developer',
    category: 'AI & Python',
    href: '/PORTFOLIO/raynatopedrajeta',
    currentPortfolio: 'https://raynatopedrajeta.vercel.app/',
    color: '#ffffff',
    textColor: '#1A1A1A',
    dark: false,
    summary: 'AI assistants, Python services, and agentic workflows that connect business knowledge with useful tools.',
    services: ['Agentic systems', 'LLM applications', 'Python engineering'],
  },
]

export function findPortfolioByPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase()
  return teamMembers.find((member) => member.href.toLowerCase() === normalized)
}
