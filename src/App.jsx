import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const COMPANY_NAME = '(replace)'
const CONTACT_EMAIL = '(replace)'

const projects = [
  {
    id: 'peter',
    title: 'PETER MA-AÑO',
    initials: 'PM',
    eyebrow: 'Full-Stack Developer',
    category: 'Web & Mobile',
    href: 'https://ma-ano-portfolio.vercel.app/',
    color: '#ff4d24',
    textColor: '#11110f',
    summary: 'Full-stack, software, web, and mobile development focused on production applications for real businesses.',
    services: ['Full-stack engineering', 'Web applications', 'Mobile development'],
  },
  {
    id: 'raynato',
    title: 'RAYNATO PEDRAJETA',
    initials: 'RP',
    eyebrow: 'Agentic AI Developer',
    category: 'AI & Python',
    href: 'https://raynatopedrajeta.vercel.app/',
    color: '#2054ff',
    textColor: '#ffffff',
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
    title: 'Product design',
    text: 'Research, strategy, and visual systems that give good ideas a sharper point of view.',
    tags: ['UX/UI', 'Strategy', 'Identity'],
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

function LogoMark() {
  return (
    <span className="relative grid size-8 place-items-center rounded-full bg-[#ff4d24]" aria-hidden="true">
      <span className="h-3.5 w-3.5 rotate-45 border-2 border-[#11110f]" />
    </span>
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
    ['Services', '#services'],
    ['About', '#about'],
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11110f]/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => scrollTo('#top')} className="flex items-center gap-3" aria-label={`${COMPANY_NAME} home`}>
          <LogoMark />
          <span className="text-sm font-bold tracking-[0.16em]">{COMPANY_NAME}</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <button key={href} onClick={() => scrollTo(href)} className="nav-link text-sm text-white/70 hover:text-white">
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo('#contact')}
          className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#11110f] transition-transform hover:-translate-y-0.5 md:flex"
        >
          Start a project <ArrowIcon diagonal />
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
            className="overflow-hidden border-t border-white/10 bg-[#11110f] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col px-5 py-5">
              {navItems.map(([label, href], index) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-left text-2xl font-semibold"
                >
                  {label} <span className="text-sm text-white/40">0{index + 1}</span>
                </button>
              ))}
              <button onClick={() => scrollTo('#contact')} className="mt-5 flex items-center justify-between bg-[#ff4d24] px-5 py-4 font-semibold text-[#11110f]">
                Start a project <ArrowIcon diagonal />
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
      <div className="relative flex aspect-[4/3] min-h-[360px] flex-col justify-between overflow-hidden p-6 sm:p-8" style={{ backgroundColor: project.color, color: project.textColor }}>
        <div className="absolute -bottom-[18%] -right-[8%] select-none text-[clamp(13rem,30vw,26rem)] font-black leading-none tracking-[-0.1em] opacity-10" aria-hidden="true">
          {project.initials}
        </div>
        <div className="relative flex items-start justify-between">
          <span className="rounded-full border border-current/25 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">
            {project.category}
          </span>
          <span className="grid size-12 place-items-center rounded-full border border-current/30 transition-transform duration-300 group-hover:rotate-45 group-hover:bg-[#11110f] group-hover:text-white sm:size-14">
            <ArrowIcon diagonal />
          </span>
        </div>
        <div className="relative max-w-md">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] opacity-65">Team portfolio / 0{index + 1}</p>
          <p className="text-2xl font-semibold leading-tight sm:text-3xl">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span key={service} className="rounded-full border border-current/25 px-3 py-1 text-xs font-semibold">{service}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between border-b border-[#11110f]/20 py-5">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#11110f]/55">{project.eyebrow}</p>
          <h3 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">{project.title}</h3>
        </div>
        <p className="hidden items-center gap-2 pb-1 text-sm font-semibold text-[#11110f]/55 sm:flex">View portfolio <ArrowIcon diagonal /></p>
      </div>
    </motion.a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const startProject = () => {
    if (CONTACT_EMAIL === '(replace)') return
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=New%20project%20inquiry`
  }

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#f2efe8] text-[#11110f]">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[#ff4d24]" style={{ scaleX }} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <section className="relative min-h-[760px] overflow-hidden bg-[#11110f] px-5 pb-10 pt-32 text-white sm:px-8 sm:pt-40 lg:px-12">
          <div className="mx-auto flex min-h-[620px] max-w-[1440px] flex-col justify-between">
            <div className="flex flex-col gap-6 border-l border-white/20 pl-4 sm:flex-row sm:items-center sm:justify-between sm:pl-6">
              <p className="max-w-[250px] text-sm leading-relaxed text-white/60">Independent digital product studio<br />working across borders.</p>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#b8ff55] opacity-70" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#b8ff55]" />
                </span>
                Available for select projects
              </div>
            </div>

            <div className="py-14 sm:py-20">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d24] sm:text-sm"
              >
                Strategy · Design · Development
              </motion.p>
              <h1 className="max-w-[1320px] overflow-hidden text-[clamp(3.4rem,9.4vw,9rem)] font-black leading-[0.82] tracking-[-0.075em]">
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="block">
                  WE BUILD
                </motion.span>
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }} className="block text-[#ff4d24]">
                  DIGITAL THINGS
                </motion.span>
                <motion.span initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }} className="block">
                  THAT WORK.
                </motion.span>
              </h1>
            </div>

            <div className="flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-white/65 sm:text-xl">
                We help startups and ambitious teams turn early ideas into useful websites, apps, and digital products.
              </p>
              <button onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-4 self-start text-sm font-semibold uppercase tracking-[0.14em] sm:self-auto">
                <span className="grid size-14 place-items-center rounded-full border border-white/25 transition-colors group-hover:bg-white group-hover:text-[#11110f]">
                  <ArrowIcon />
                </span>
                See our work
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-b border-[#11110f]/20 bg-[#ff4d24] py-4" aria-label="What we make">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.18em]">
            {[...Array(2)].flatMap((_, repeat) => ['Websites', 'Applications', 'Digital products', 'Brand systems'].map((item) => (
              <span key={`${repeat}-${item}`} className="flex items-center gap-8">
                {item}<span className="text-2xl">✳</span>
              </span>
            )))}
          </div>
        </section>

        <section id="work" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-12 flex flex-col gap-8 border-b border-[#11110f]/20 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d24]">Meet the builders</p>
                <h2 className="text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.88] tracking-[-0.065em]">TWO MINDS.<br /><span className="font-serif font-normal italic">One team.</span></h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-black/55">Explore the individual work, experience, and technical depth behind our studio.</p>
            </Reveal>

            <div className="grid gap-x-6 gap-y-14 lg:grid-cols-2">
              {projects.map((project, index) => (
                <PortfolioCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#11110f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-14 grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff4d24]">What we do</p>
                <h2 className="text-[clamp(3.1rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.065em]">BIG-TEAM<br /><span className="font-serif font-normal italic">thinking.</span></h2>
              </div>
              <p className="max-w-lg text-lg leading-relaxed text-white/60 md:justify-self-end md:text-xl">
                A small senior team for the whole journey. Fewer handoffs, faster decisions, and craft that stays consistent from idea to launch.
              </p>
            </Reveal>

            <div className="grid border-t border-white/20 lg:grid-cols-3">
              {services.map((service, index) => (
                <motion.article
                  key={service.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group border-b border-white/20 px-0 py-9 lg:border-r lg:px-8 lg:py-12 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="mb-16 flex items-center justify-between lg:mb-24">
                    <span className="text-sm font-semibold text-[#ff4d24]">{service.number}</span>
                    <span className="grid size-11 place-items-center rounded-full border border-white/20 transition-all group-hover:rotate-45 group-hover:border-[#ff4d24] group-hover:bg-[#ff4d24] group-hover:text-[#11110f]">
                      <ArrowIcon diagonal />
                    </span>
                  </div>
                  <h3 className="mb-5 text-4xl font-black tracking-[-0.04em]">{service.title}</h3>
                  <p className="mb-8 max-w-sm leading-relaxed text-white/55">{service.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/65">{tag}</span>)}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 size-2.5 rounded-full bg-[#ff4d24]" />
                <p className="text-xs font-bold uppercase tracking-[0.2em]">How we work</p>
              </div>
              <div>
                <h2 className="max-w-4xl text-[clamp(2.6rem,5.8vw,6rem)] font-black leading-[0.94] tracking-[-0.055em]">
                  CLOSE COLLABORATION.<br />CLEAR DECISIONS.<br /><span className="font-serif font-normal italic text-[#ff4d24]">No black box.</span>
                </h2>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-black/60 sm:text-xl">
                  You work directly with the people designing and building your product. We share progress early, test assumptions, and keep momentum visible from week one.
                </p>
              </div>
            </Reveal>

            <div className="mt-20 grid border-y border-[#11110f]/20 sm:grid-cols-3">
              {[
                ['01', 'Find the signal', 'We clarify the audience, the problem, and what a successful first release needs to do.'],
                ['02', 'Make it tangible', 'We prototype the important flows early so the product can be discussed, tested, and improved.'],
                ['03', 'Ship it well', 'We build the final experience, sweat the details, and prepare a clean handoff or launch.'],
              ].map(([number, title, text], index) => (
                <Reveal key={number} delay={index * 0.08} className="border-b border-[#11110f]/20 py-8 sm:border-b-0 sm:border-r sm:px-6 sm:py-10 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                  <p className="mb-14 text-sm font-bold text-[#ff4d24]">{number}</p>
                  <h3 className="mb-4 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                  <p className="max-w-sm leading-relaxed text-black/55">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 bg-[#ff4d24] px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <Reveal className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-3 border-b border-black/20 pb-6">
              <span className="size-2.5 rounded-full bg-[#11110f]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Have a project in mind?</p>
            </div>
            <div className="grid gap-10 pt-10 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="max-w-5xl text-[clamp(3.5rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.075em]">
                LET’S MAKE<br /><span className="font-serif font-normal italic">it real.</span>
              </h2>
              <motion.button
                onClick={startProject}
                whileHover={{ rotate: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="grid size-36 place-items-center rounded-full bg-[#11110f] p-6 text-center text-sm font-semibold text-white sm:size-44"
              >
                <span className="flex flex-col items-center gap-3">Start a project <ArrowIcon diagonal /></span>
              </motion.button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-[#11110f] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 border-b border-white/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3"><LogoMark /><span className="text-sm font-bold tracking-[0.16em]">{COMPANY_NAME}</span></div>
              <span className="footer-email text-2xl font-semibold sm:text-4xl">{CONTACT_EMAIL}</span>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 self-start text-sm font-semibold text-white/65 hover:text-white sm:self-auto">
              Back to top <span className="grid size-10 -rotate-90 place-items-center rounded-full border border-white/20"><ArrowIcon /></span>
            </button>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}</p>
            <p>Independent team · Working worldwide</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
