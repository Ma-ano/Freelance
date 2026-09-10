import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import wrenLabsLogo from './assets/wren-labs-logo.png'
import wrenMark from './assets/wren-mark.png'
import { localAnswer } from '../server/knowledge.js'

const COMPANY_NAME = 'Wren Labs'
const CONTACT_EMAIL = 'wrenlabsph@gmail.com'

const projects = [
  {
    id: 'peter',
    title: 'PETER GIL MA-AÑO',
    initials: 'PM',
    eyebrow: 'Assistant Developer',
    category: 'Web & Mobile',
    href: 'https://ma-ano-portfolio.vercel.app/',
    color: '#1A1A1A',
    textColor: '#ffffff',
    dark: true,
    summary: 'Full-stack, software, web, and mobile development focused on production applications for real businesses.',
    services: ['Full-stack engineering', 'Web applications', 'Mobile development'],
  },
  {
    id: 'raynato',
    title: 'RAYNATO PEDRAJETA',
    initials: 'RP',
    eyebrow: 'Head Developer',
    category: 'AI & Python',
    href: 'https://raynatopedrajeta.vercel.app/',
    color: '#ffffff',
    textColor: '#1A1A1A',
    dark: false,
    summary: 'Agentic AI, Python services, and governed multi-agent systems built for real enterprise workflows.',
    services: ['Agentic systems', 'LLM applications', 'Python engineering'],
  },
]

const services = [
  {
    number: '01',
    title: 'Websites',
    text: 'Distinctive marketing sites and web platforms built to be fast, clear, and easy to grow.',
    tags: ['React', 'E-commerce', 'CMS'],
  },
  {
    number: '02',
    title: 'Applications',
    text: 'Useful, intuitive products for mobile and web—from the first user flow to a launch-ready build.',
    tags: ['Mobile', 'SaaS', 'MVPs'],
  },
  {
    number: '03',
    title: 'AI & automation',
    text: 'RAG assistants, chatbots, and agentic workflows grounded in your knowledge and connected to real tools.',
    tags: ['RAG', 'Chatbots', 'Agents'],
  },
  {
    number: '04',
    title: 'Product design',
    text: 'Research, strategy, and visual systems that give good ideas a sharper point of view.',
    tags: ['UX/UI', 'Strategy', 'Identity'],
  },
]

const concepts = [
  {
    id: 'commerce',
    eyebrow: 'Commerce',
    title: 'E-commerce with automated payment',
    description: 'A seamless online store with secure checkout, automated payment confirmation, and order tracking.',
  },
  {
    id: 'marketing',
    eyebrow: 'AI & Automation',
    title: 'Agentic digital marketing team',
    description: 'An AI workspace that plans content, creates assets, and coordinates publishing with human approval.',
  },
  {
    id: 'analytics',
    eyebrow: 'Analytics & Engagement',
    title: 'Campaign analytics with automated follow-ups',
    description: 'Track campaign performance and trigger timely email or SMS follow-ups from one connected dashboard.',
  },
  {
    id: 'support',
    eyebrow: 'Conversational AI',
    title: 'Multi-system support assistant',
    description: 'One assistant connected to your tools, helping customers find answers, check orders, and complete everyday tasks.',
  },
]


function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.8">
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5 12h14m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

function BrandLogo({ className = '' }) {
  return (
    <img src={wrenLabsLogo} alt="" className={`h-8 w-auto brightness-0 invert sm:h-9 ${className}`} />
  )
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Header({ menuOpen, setMenuOpen }) {
  const navItems = [
    ['Work', '#work'],
    ['Concepts', '#concepts'],
    ['Services', '#services'],
    ['About', '#about'],
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#EBEBEB]/20 bg-[#1A1A1A]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => scrollTo('#top')} className="flex min-h-11 items-center" aria-label={`${COMPANY_NAME} home`}>
          <BrandLogo />
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <button key={href} onClick={() => scrollTo(href)} className="nav-link flex min-h-11 min-w-11 items-center justify-center px-1 text-sm text-white/70 hover:text-white">
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('#contact')}
          className="hidden min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-transform hover:-translate-y-0.5 md:flex"
        >
          Contact us <ArrowIcon diagonal />
        </button>

        <button
          className="relative grid size-11 place-items-center md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`absolute h-px w-6 bg-white transition-transform ${menuOpen ? 'rotate-45' : '-translate-y-1'}`} />
          <span className={`absolute h-px w-6 bg-white transition-transform ${menuOpen ? '-rotate-45' : 'translate-y-1'}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#EBEBEB]/20 bg-[#1A1A1A] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-5 py-5">
              {navItems.map(([label, href], index) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="flex items-center justify-between border-b border-[#EBEBEB]/20 py-4 text-left text-2xl font-semibold"
                >
                  {label} <span className="text-sm text-white/40">0{index + 1}</span>
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="mt-5 flex items-center justify-between bg-white px-5 py-4 font-semibold text-[#1A1A1A]">
                Contact Us <ArrowIcon diagonal />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function PortfolioCard({ project, index }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="project-card group block text-left"
      aria-label={`Open ${project.title}'s portfolio in a new tab`}
    >
      <div className={`relative flex flex-col gap-6 overflow-hidden border p-5 sm:p-6 ${project.dark ? 'border-[#EBEBEB]/20' : 'border-[#EBEBEB]'}`} style={{ backgroundColor: project.color, color: project.textColor }}>
        <div className="absolute -bottom-[18%] -right-[8%] select-none text-[clamp(13rem,30vw,26rem)] font-black leading-none tracking-[-0.1em] opacity-10" aria-hidden="true">
          {project.initials}
        </div>
        <div className="relative flex items-start justify-between">
          <span className="rounded-full border border-current/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
            {project.category}
          </span>
          <span className={`grid size-10 shrink-0 place-items-center rounded-full border border-current/30 transition-all duration-300 group-hover:rotate-45 ${project.dark ? 'group-hover:bg-white group-hover:text-[#1A1A1A]' : 'group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
            <ArrowIcon diagonal />
          </span>
        </div>
        <div className="relative w-full min-w-0 max-w-md">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] opacity-65">Team portfolio / 0{index + 1}</p>
          <p className="text-lg font-semibold leading-snug sm:text-xl">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="max-w-full rounded-full border border-current/25 px-3 py-1 text-xs font-semibold">{service}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#EBEBEB] py-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A]/55">{project.eyebrow}</p>
          <h3 className="text-xl font-black leading-tight tracking-[-0.04em] sm:text-2xl">{project.title}</h3>
        </div>
        <p className="hidden items-center gap-2 pb-1 text-sm font-semibold text-[#1A1A1A]/55 sm:flex">View portfolio <ArrowIcon diagonal /></p>
      </div>
    </motion.a>
  )
}

function ConceptPreview({ type }) {
  if (type === 'commerce') {
    return (
      <div className="concept-preview bg-white">
        <div className="flex items-center justify-between border-b border-[#EBEBEB] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] sm:px-4">
          <span className="font-serif text-sm tracking-[0.2em]">Vela</span>
          <span className="hidden text-[#1A1A1A]/45 min-[360px]:inline">Shop · Bags · Shoes</span>
        </div>
        <div className="grid min-h-48 grid-cols-[.88fr_1.12fr] gap-2 p-2 min-[360px]:grid-cols-[1fr_.82fr] min-[360px]:p-3 sm:gap-4 sm:p-4">
          <div className="flex flex-col justify-between bg-[#EBEBEB]/65 p-3 sm:p-4">
            <div>
              <p className="font-serif text-xl leading-none sm:text-3xl">Modern<br />Essentials</p>
              <p className="mt-2 text-[9px] text-[#1A1A1A]/55 sm:text-[10px]">Timeless pieces for a brighter day.</p>
            </div>
            <span className="w-fit bg-[#1A1A1A] px-3 py-2 text-[9px] font-semibold text-white">Shop collection →</span>
          </div>
          <div className="flex flex-col rounded-xl border border-[#EBEBEB] bg-white p-3 shadow-sm sm:p-4">
            <span className="mb-2 grid size-7 place-items-center rounded-full bg-[#1A1A1A] text-xs text-white">✓</span>
            <p className="text-xs font-bold sm:text-sm">Payment successful</p>
            <p className="mt-1 text-[8px] text-[#1A1A1A]/45 sm:text-[9px]">Your order is confirmed.</p>
            <div className="my-3 space-y-2 text-[8px] sm:text-[9px]">
              <div className="flex justify-between border-b border-[#EBEBEB] pb-2"><span>Classic sneakers</span><strong>$120</strong></div>
              <div className="flex justify-between border-b border-[#EBEBEB] pb-2"><span>Everyday tote</span><strong>$280</strong></div>
            </div>
            <span className="mt-auto bg-[#1A1A1A] px-2 py-2 text-center text-[8px] font-semibold text-white">View order</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'marketing') {
    return (
      <div className="concept-preview grid grid-cols-[54px_1fr] bg-white min-[360px]:grid-cols-[64px_1fr] sm:grid-cols-[84px_1fr]">
        <div className="border-r border-[#EBEBEB] p-2 sm:p-3">
          <p className="mb-4 text-[10px] font-black sm:text-xs">◈ Lumen</p>
          {['Home', 'Content', 'Calendar', 'AI team', 'Analytics'].map((item, index) => (
            <div key={item} className={`mb-1 rounded px-1.5 py-2 text-[8px] sm:text-[9px] ${index === 1 ? 'bg-[#EBEBEB] font-bold' : 'text-[#1A1A1A]/45'}`}>{item}</div>
          ))}
        </div>
        <div className="min-w-0 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <div><p className="text-sm font-bold sm:text-base">Content calendar</p><p className="text-[8px] text-[#1A1A1A]/45 sm:text-[9px]">Plan and publish with your AI team.</p></div>
            <span className="shrink-0 bg-[#1A1A1A] px-2 py-1.5 text-[7px] text-white sm:text-[8px]">+ Campaign</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
            {['Write', 'Design', 'Review'].map((item, index) => (
              <div key={item} className="rounded border border-[#EBEBEB] p-2">
                <p className="text-[7px] text-[#1A1A1A]/45">APR {14 + index * 2}</p>
                <div className="my-2 h-12 bg-[#EBEBEB] sm:h-16" />
                <p className="text-[7px] font-bold min-[360px]:text-[8px] sm:text-[9px]">{item}</p>
                <span className="mt-2 block w-fit rounded-full bg-[#EBEBEB] px-1.5 py-1 text-[7px]">Approved</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[7px] text-[#1A1A1A]/60">
            {['Strategist', 'Copywriter', 'Designer'].map((role) => <span key={role} className="rounded-full border border-[#EBEBEB] px-2 py-1">{role}</span>)}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'analytics') {
    return (
      <div className="concept-preview grid grid-cols-[54px_1fr] bg-white min-[360px]:grid-cols-[64px_1fr] sm:grid-cols-[84px_1fr]">
        <div className="border-r border-[#EBEBEB] p-2 sm:p-3">
          <p className="mb-4 text-[10px] font-black sm:text-xs">● Pulse</p>
          {['Overview', 'Campaigns', 'Audience', 'Automations', 'Reports'].map((item, index) => (
            <div key={item} className={`mb-1 rounded px-1.5 py-2 text-[8px] sm:text-[9px] ${index === 0 ? 'bg-[#EBEBEB] font-bold' : 'text-[#1A1A1A]/45'}`}>{item}</div>
          ))}
        </div>
        <div className="min-w-0 p-3 sm:p-4">
          <p className="text-sm font-bold sm:text-base">Campaign performance</p>
          <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
            {[['Sends', '24.3k'], ['Open', '48.2%'], ['Clicks', '12.6%'], ['Convert', '3.4%']].map(([label, value]) => (
              <div key={label} className="rounded border border-[#EBEBEB] p-2"><p className="text-[7px] text-[#1A1A1A]/45">{label}</p><p className="mt-1 text-xs font-black sm:text-sm">{value}</p></div>
            ))}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1.45fr_.75fr]">
            <div className="rounded border border-[#EBEBEB] p-2">
              <p className="text-[8px] font-bold">Engagement over time</p>
              <svg viewBox="0 0 260 82" className="mt-2 h-20 w-full" aria-hidden="true">
                <path d="M4 70 C28 58 38 66 55 48 S86 58 103 39 S132 53 150 28 S183 43 201 20 S229 32 256 9" fill="none" stroke="#1A1A1A" strokeWidth="2" />
                <path d="M4 75 C30 67 49 71 67 61 S99 69 118 54 S150 62 172 48 S213 54 256 30" fill="none" stroke="#EBEBEB" strokeWidth="4" />
              </svg>
            </div>
            <div className="space-y-1.5 rounded border border-[#EBEBEB] p-2 text-[7px] sm:text-[8px]">
              {['Welcome email', 'Wait 2 days', 'Follow-up SMS'].map((step) => <div key={step} className="bg-[#EBEBEB]/70 px-2 py-2">→ {step}</div>)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="concept-preview grid grid-cols-[56px_1fr_58px] bg-white min-[360px]:grid-cols-[72px_1fr_78px] sm:grid-cols-[100px_1fr_120px]">
      <div className="border-r border-[#EBEBEB] p-2 sm:p-3">
        <p className="mb-3 text-[9px] font-black sm:text-xs">Nova Support</p>
        {['Emily', 'James', 'Priya', 'Michael'].map((name, index) => (
          <div key={name} className={`mb-1 rounded px-1.5 py-2 text-[7px] sm:text-[9px] ${index === 0 ? 'bg-[#EBEBEB] font-bold' : 'text-[#1A1A1A]/45'}`}>{name}</div>
        ))}
      </div>
      <div className="min-w-0 p-2 sm:p-3">
        <div className="border-b border-[#EBEBEB] pb-2 text-[8px] font-bold sm:text-[10px]">Emily Carter · Online</div>
        <div className="space-y-2 py-3 text-[7px] sm:text-[9px]">
          <p className="w-fit rounded-lg bg-[#EBEBEB] px-2 py-2">Where is my order?</p>
          <p className="ml-auto w-fit max-w-[90%] break-words rounded-lg bg-[#1A1A1A] px-2 py-2 text-white">Order #78421 is in transit and arriving Apr 17.</p>
          <div className="grid grid-cols-4 gap-1 pt-2 text-center text-[6px] text-[#1A1A1A]/55 sm:text-[7px]">
            {['Confirmed', 'Shipped', 'Transit', 'Arriving'].map((step) => <span key={step} className="border-t border-[#1A1A1A] pt-1">{step}</span>)}
          </div>
        </div>
        <div className="mt-auto rounded-full border border-[#EBEBEB] px-2 py-2 text-[7px] text-[#1A1A1A]/35">Type a message…</div>
      </div>
      <div className="border-l border-[#EBEBEB] p-2 sm:p-3">
        <p className="mb-3 text-[8px] font-bold sm:text-[10px]">Connected</p>
        {['CRM', 'Orders', 'Knowledge', 'Help desk'].map((item) => <div key={item} className="mb-1.5 rounded border border-[#EBEBEB] px-1.5 py-2 text-[6px] sm:text-[8px]">✓ {item}</div>)}
      </div>
    </div>
  )
}

function ConceptCard({ concept, index, onAsk }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="min-w-0 border border-[#EBEBEB] bg-white p-2 min-[360px]:p-3 sm:p-4"
    >
      <ConceptPreview type={concept.id} />
      <div className="flex flex-col items-start gap-4 px-1 pb-2 pt-5 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between sm:px-2">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1A1A1A]/55">{concept.eyebrow}</p>
          <h3 className="text-2xl font-black leading-tight tracking-[-0.035em] sm:text-3xl">{concept.title}</h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#1A1A1A]/55">{concept.description}</p>
        </div>
        <button
          type="button"
          onClick={onAsk}
          className="grid size-12 shrink-0 place-items-center self-end rounded-full border border-[#1A1A1A] transition-all hover:rotate-45 hover:bg-[#1A1A1A] hover:text-white sm:size-14"
          aria-label={`Ask Wren Assistant about ${concept.title}`}
        >
          <ArrowIcon diagonal />
        </button>
      </div>
    </motion.article>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [deliveryMessage, setDeliveryMessage] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const submitInquiry = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const result = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(35000),
      })

      const isJson = result.headers.get('content-type')?.includes('application/json')
      const data = isJson ? await result.json() : null
      if (!result.ok || !data?.ok) {
        const knownCodes = ['INVALID_INPUT', 'CONTACT_NOT_CONFIGURED', 'CONTACT_UNAVAILABLE']
        setErrorMessage(knownCodes.includes(data?.code) ? data.error : 'The contact service could not be reached. Please email us directly.')
        setStatus('error')
        return
      }

      setForm({ name: '', email: '', company: '', message: '', website: '' })
      setDeliveryMessage(data.emailed
        ? 'Thanks! Your inquiry was sent to the Wren Labs team.'
        : 'Your inquiry was saved, but the email notification could not be sent. Please email us directly for a quicker response.')
      setStatus('success')
    } catch (error) {
      setErrorMessage(error.name === 'TimeoutError'
        ? 'The request timed out and we could not confirm delivery. Please email us if you need confirmation.'
        : 'Connection interrupted. Check your internet connection or email us directly.')
      setStatus('error')
    }
  }

  const fieldClass = 'w-full rounded-none border border-[#EBEBEB] bg-white px-4 py-3.5 text-base text-[#1A1A1A] outline-none transition-colors placeholder:text-[#1A1A1A]/35 focus:border-[#1A1A1A] disabled:cursor-wait disabled:opacity-55'

  return (
    <form onSubmit={submitInquiry} className="border border-[#EBEBEB] bg-white p-4 min-[360px]:p-5 sm:p-7" aria-label="Project inquiry form">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#EBEBEB] pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1A1A]/55">Contact Wren Labs</p>
          <p className="mt-1 text-sm text-[#1A1A1A]/55">Tell us about your next project.</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#1A1A1A] text-white"><ArrowIcon diagonal /></span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold" htmlFor="contact-name">
          <span>Name <span aria-hidden="true">*</span></span>
          <input id="contact-name" name="name" value={form.name} onChange={updateField} autoComplete="name" required minLength="2" maxLength="100" disabled={status === 'submitting'} className={fieldClass} placeholder="Your name" />
        </label>
        <label className="grid gap-2 text-sm font-semibold" htmlFor="contact-email">
          <span>Email <span aria-hidden="true">*</span></span>
          <input id="contact-email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required maxLength="180" disabled={status === 'submitting'} className={fieldClass} placeholder="you@company.com" />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-semibold" htmlFor="contact-company">
        <span>Company <span className="font-normal text-[#1A1A1A]/45">Optional</span></span>
        <input id="contact-company" name="company" value={form.company} onChange={updateField} autoComplete="organization" maxLength="140" disabled={status === 'submitting'} className={fieldClass} placeholder="Your company or team" />
      </label>

      <label className="mt-4 grid gap-2 text-sm font-semibold" htmlFor="contact-message">
        <span>What are you building? <span aria-hidden="true">*</span></span>
        <textarea id="contact-message" name="message" value={form.message} onChange={updateField} required minLength="12" maxLength="3000" rows="5" disabled={status === 'submitting'} className={`${fieldClass} resize-y`} placeholder="Tell us about the goal, audience, timeline, and any important integrations." />
      </label>

      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" value={form.website} onChange={updateField} tabIndex="-1" autoComplete="off" />
      </label>

      <div className="mt-5 flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
        <p className="text-sm leading-relaxed text-[#1A1A1A]/55" aria-live="polite">
          {status === 'success' && <>{deliveryMessage} <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>Email Wren Labs</a></>}
          {status === 'error' && <>{errorMessage} <a className="break-all font-semibold text-[#1A1A1A] underline" href={`mailto:${CONTACT_EMAIL}`}>Email Wren Labs</a></>}
          {(status === 'idle' || status === 'submitting') && <>Or email <a className="font-semibold text-[#1A1A1A] underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
        </p>
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#1A1A1A] px-6 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-55"
        >
          {status === 'submitting' ? 'Sending…' : 'Send inquiry'} <ArrowIcon />
        </motion.button>
      </div>
    </form>
  )
}

function WrenAssistant({ open, setOpen, onContact }) {
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [assistantMode, setAssistantMode] = useState('Your Wren Labs guide')
  const requestPending = useRef(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I’m Wren. Ask me about websites, applications, RAG systems, AI automation, or how to start a project.',
    },
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [open, messages, isThinking])

  const sendMessage = async (question) => {
    const cleanQuestion = question.trim()
    if (!cleanQuestion || requestPending.current) return
    requestPending.current = true
    const history = messages.filter((item) => item.id !== 'welcome' && !item.fallback).slice(-6).map(({ role, text }) => ({ role, content: text }))

    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: 'user', text: cleanQuestion }])
    setInput('')
    setIsThinking(true)

    try {
      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanQuestion, history }),
        signal: AbortSignal.timeout(25000),
      })

      if (!result.ok) throw new Error('AI request failed')

      const data = await result.json()
      if (!data.answer) throw new Error('AI response was empty')

      setMessages((current) => [...current.slice(-39), { id: `wren-${Date.now()}`, role: 'assistant', text: data.answer }])
      setAssistantMode('Your AI guide to Wren Labs')
    } catch {
      setMessages((current) => [...current.slice(-39), { id: `wren-${Date.now()}`, role: 'assistant', text: localAnswer(cleanQuestion, history), fallback: true }])
      setAssistantMode('AI unavailable · Showing website information')
    } finally {
      setIsThinking(false)
      requestPending.current = false
    }
  }

  const submitMessage = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const quickActions = [
    { label: 'Plan my website', question: 'I want to build a website. Briefly explain marketing sites, online stores, and web platforms in plain sentences without a table, then ask one question to get started.' },
    { label: 'Find an AI use case', question: 'Explain your multi-system support assistant sample concept and how a knowledge-based assistant could help answer customer questions. Keep proposed uses distinct from confirmed features, then ask which workflow I want to improve.' },
    { label: 'Scope my application', question: 'I have an application idea. Help me plan a first version and ask about the main user problem.' },
  ]

  return (
    <AnimatePresence mode="wait">
      {open ? (
        <motion.aside
          key="assistant-panel"
          role="dialog"
          aria-label="Wren Assistant"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[90] flex h-[calc(100dvh-1.5rem)] max-h-[620px] flex-col overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white text-[#1A1A1A] shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[390px]"
        >
          <div className="flex items-center justify-between bg-[#1A1A1A] px-4 py-3.5 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <img src={wrenMark} alt="" className="size-9 shrink-0 object-contain brightness-0 invert" />
              <div className="min-w-0">
                <p className="font-bold">Wren Assistant</p>
                <p className="text-xs text-white/50">{assistantMode}</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="grid size-11 shrink-0 place-items-center rounded-full text-2xl text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close Wren Assistant">×</button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/45">Talk to Wren</p>
              <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Big ideas start here.</h2>
            </div>

            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-auto bg-[#1A1A1A] text-white' : 'bg-[#EBEBEB]/70'}`}>
                  {message.text}
                </div>
              ))}
              {isThinking && <div className="flex w-fit items-center gap-1 rounded-2xl bg-[#EBEBEB]/70 px-4 py-4" aria-label="Wren is thinking"><span className="assistant-dot" /><span className="assistant-dot" /><span className="assistant-dot" /></div>}
              <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 grid gap-2">
              {quickActions.map((action) => (
                <button key={action.label} type="button" disabled={isThinking} onClick={() => sendMessage(action.question)} className="flex min-h-11 items-center justify-between gap-3 rounded-full border border-[#EBEBEB] px-4 py-2 text-left text-sm font-semibold transition-colors hover:border-[#1A1A1A] disabled:cursor-wait disabled:opacity-50">
                  {action.label} <ArrowIcon diagonal />
                </button>
              ))}
              <button type="button" onClick={() => { setOpen(false); onContact() }} className="flex min-h-11 items-center justify-between rounded-full bg-[#1A1A1A] px-4 py-2 text-left text-sm font-semibold text-white">
                Send a project inquiry <ArrowIcon diagonal />
              </button>
            </div>
          </div>

          <form onSubmit={submitMessage} className="flex gap-2 border-t border-[#EBEBEB] bg-white p-3">
            <label htmlFor="wren-message" className="sr-only">Message Wren Assistant</label>
            <input
              id="wren-message"
              maxLength={1000}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask Wren about your idea…"
              className="min-w-0 flex-1 rounded-full border border-[#EBEBEB] px-4 py-3 text-base outline-none transition-colors focus:border-[#1A1A1A]"
            />
            <button type="submit" disabled={!input.trim() || isThinking} className="grid size-12 shrink-0 place-items-center rounded-full bg-[#1A1A1A] text-white disabled:cursor-not-allowed disabled:opacity-35" aria-label="Send message">
              <ArrowIcon />
            </button>
          </form>
          <p className="px-4 pb-3 text-center text-[11px] text-[#1A1A1A]/60">AI can make mistakes. Please keep sensitive details out of chat.</p>
        </motion.aside>
      ) : (
        <motion.button
          key="assistant-button"
          type="button"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-4 right-4 z-[90] flex size-14 items-center justify-center rounded-full border border-white/20 bg-[#1A1A1A] text-sm font-bold text-white shadow-[0_12px_40px_rgba(0,0,0,0.24)] min-[360px]:min-h-12 min-[360px]:w-auto min-[360px]:gap-3 min-[360px]:px-4 min-[360px]:py-3 sm:bottom-6 sm:right-6"
          aria-label="Talk to Wren Assistant"
        >
          <img src={wrenMark} alt="" className="size-7 object-contain brightness-0 invert" />
          <span className="hidden min-[360px]:inline">Talk to Wren</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const startProject = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => document.querySelector('#contact-name')?.focus({ preventScroll: true }), 650)
  }

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-white text-[#1A1A1A]">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[#EBEBEB] mix-blend-difference" style={{ scaleX }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[#1A1A1A] px-5 pb-10 pt-32 text-white sm:px-8 sm:pt-40 lg:px-12">
          <img src={wrenMark} alt="" className="pointer-events-none absolute -right-20 top-24 w-[clamp(22rem,52vw,52rem)] select-none brightness-0 invert opacity-[0.06]" aria-hidden="true" />
          <div className="mx-auto flex min-h-[620px] max-w-[1440px] flex-col justify-between">
            <div className="flex flex-col gap-6 border-l border-[#EBEBEB]/20 pl-4 sm:flex-row sm:items-center sm:justify-between sm:pl-6">
              <p className="max-w-[280px] text-sm leading-relaxed text-white/60">Wren Labs is an independent technology studio working across borders.</p>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-50" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-white" />
                </span>
                Available for select projects
              </div>
            </div>

            <div className="py-14 sm:py-20">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 sm:text-sm"
              >
                Websites · Applications · AI
              </motion.p>
              <h1 className="max-w-[1320px] overflow-hidden text-[clamp(3.4rem,9.4vw,9rem)] font-black leading-[0.82] tracking-[-0.075em]">
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="block">
                  SMALL TEAM.
                </motion.span>
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="block text-transparent [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:2px_white]">
                  BIG IMPACT.
                </motion.span>
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }} className="block">
                  BUILT TO LAST.
                </motion.span>
              </h1>
            </div>

            <div className="flex flex-col gap-6 border-t border-[#EBEBEB]/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
                We help startups and ambitious teams turn early ideas into useful websites, apps, and digital products.
              </p>
              <button onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-4 self-start text-sm font-semibold uppercase tracking-[0.14em] sm:self-auto">
                <span className="grid size-14 place-items-center rounded-full border border-[#EBEBEB]/25 transition-colors group-hover:bg-white group-hover:text-[#1A1A1A]">
                  <ArrowIcon />
                </span>
                See our work
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-b border-[#EBEBEB] bg-white py-4 text-[#1A1A1A]" aria-label="What we make">
          <p className="sr-only">Brand systems, websites, applications, and digital products.</p>
          <div aria-hidden="true" className="marquee-track flex w-max whitespace-nowrap text-sm font-black uppercase tracking-[0.18em]">
            {[0, 1].map((copy) => (
              <div key={copy} className="marquee-group">
                {Array.from({ length: 8 }, () => ['Brand systems', 'Websites', 'Applications', 'Digital products']).flat().map((item, index) => (
                  <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-5">
                    {item}<span className="text-2xl">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="grid-surface scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-12 flex flex-col gap-8 border-b border-[#EBEBEB] pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/55">Meet the builders</p>
                <h2 className="text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.065em]">Our Talents.</h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-[#1A1A1A]/55">Explore the individual work, experience, and technical depth behind our studio.</p>
            </Reveal>

            <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
              {projects.map((project, index) => (
                <PortfolioCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="concepts" className="grid-surface scroll-mt-20 border-t border-[#EBEBEB] px-3 py-24 min-[360px]:px-5 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-12 text-center sm:mb-16">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.26em] text-[#1A1A1A]/55">Selected work / Sample concepts</p>
              <h2 className="text-[clamp(2.2rem,10vw,2.7rem)] font-black leading-[0.9] tracking-[-0.065em] min-[360px]:text-[clamp(2.7rem,7vw,6.7rem)]">SMALL TEAM.<br className="sm:hidden" /> REAL SOLUTIONS.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#1A1A1A]/55 sm:text-xl">A look at what Wren Labs can build for ambitious businesses.</p>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-2">
              {concepts.map((concept, index) => (
                <ConceptCard key={concept.id} concept={concept} index={index} onAsk={() => setAssistantOpen(true)} />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#1A1A1A] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/55">What we do</p>
                <h2 className="text-[clamp(3.1rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.065em]">BIG-TEAM<br /><span className="font-serif font-normal italic">thinking.</span></h2>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-white/60 md:justify-self-end md:text-xl">
                A small senior team for the whole journey. Fewer handoffs, faster decisions, and craft that stays consistent from idea to launch.
              </p>
            </Reveal>

            <div className="grid border-t border-[#EBEBEB]/20 lg:grid-cols-4">
              {services.map((service, index) => (
                <motion.article
                  key={service.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group border-b border-[#EBEBEB]/20 px-0 py-9 lg:border-r lg:px-8 lg:py-12 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="mb-16 flex items-center justify-between lg:mb-24">
                    <span className="text-sm font-semibold text-white/55">{service.number}</span>
                    <span className="grid size-11 place-items-center rounded-full border border-[#EBEBEB]/20 transition-all group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#1A1A1A]">
                      <ArrowIcon diagonal />
                    </span>
                  </div>
                  <h3 className="mb-5 text-4xl font-black tracking-[-0.04em]">{service.title}</h3>
                  <p className="mb-8 max-w-sm leading-relaxed text-white/55">{service.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="rounded-full border border-[#EBEBEB]/20 px-3 py-1 text-xs text-white/65">{tag}</span>)}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="contour-surface scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 size-2.5 rounded-full bg-[#1A1A1A]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em]">Why Wren Labs</p>
              </div>
              <div className="min-w-0">
                <h2 className="max-w-4xl break-words text-[clamp(1.5rem,8vw,2.5rem)] font-black leading-[0.94] tracking-[-0.055em] sm:text-[clamp(2.6rem,5.8vw,6rem)]">
                  SMALL BIRD.<br />FOCUSED TEAM.<br /><span className="font-serif font-normal italic">Significant impact.</span>
                </h2>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[#1A1A1A]/60 sm:text-xl">
                  The wren is a small bird known for intelligence, energy, adaptability, and surprising power. It reflects how we work: a focused technology team building websites, applications, and systems with impact beyond our size.
                </p>
              </div>
            </Reveal>

            <div className="mt-20 grid border-y border-[#EBEBEB] sm:grid-cols-3">
              {[
                ['01', 'Find the signal', 'We clarify the audience, the problem, and what a successful first release needs to do.'],
                ['02', 'Make it tangible', 'We prototype the important flows early so the product can be discussed, tested, and improved.'],
                ['03', 'Ship it well', 'We build the final experience, sweat the details, and prepare a clean handoff or launch.'],
              ].map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 0.08} className="border-b border-[#EBEBEB] py-8 sm:border-b-0 sm:border-r sm:px-6 sm:py-10 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                  <p className="mb-14 text-sm font-bold text-[#1A1A1A]/55">{number}</p>
                  <h3 className="mb-4 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                  <p className="max-w-sm leading-relaxed text-[#1A1A1A]/55">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="grid-surface scroll-mt-16 border-y border-[#EBEBEB] bg-white px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <Reveal className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-3 border-b border-[#EBEBEB] pb-6">
              <span className="size-2.5 rounded-full bg-[#1A1A1A]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Have a project in mind?</p>
            </div>
            <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.72fr)] lg:items-start">
              <div>
                <h2 className="max-w-5xl text-[clamp(3.2rem,10vw,8.2rem)] font-black leading-[0.82] tracking-[-0.075em]">
                  LET’S MAKE<br /><span className="font-serif font-normal italic">it real.</span>
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#1A1A1A]/55 sm:text-xl">Send the essentials and we’ll get back to you at the email you provide. Your message is saved to the Wren Labs project inbox.</p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-[#1A1A1A] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 border-b border-[#EBEBEB]/20 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BrandLogo className="mb-5 h-10 sm:h-12" />
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email break-all text-xl font-semibold min-[360px]:text-2xl sm:text-4xl">{CONTACT_EMAIL}</a>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex min-h-11 items-center gap-3 self-start text-sm font-semibold text-white/65 hover:text-white sm:self-auto">
              Back to top <span className="grid size-10 -rotate-90 place-items-center rounded-full border border-[#EBEBEB]/20"><ArrowIcon /></span>
            </button>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}</p>
            <p>Independent team · Working worldwide</p>
          </div>
        </div>
      </footer>

      <WrenAssistant open={assistantOpen} setOpen={setAssistantOpen} onContact={startProject} />

    </div>
  )
}

export default App
