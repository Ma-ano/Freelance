import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import wrenLabsLogo from './assets/wren-labs-logo.png'
import { teamMembers } from './data/team.js'

export default function PortfolioPage({ member }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.title = member ? `${member.name} | Wren Labs Portfolio` : 'Portfolio not found | Wren Labs'
  }, [member])

  return (
    <div className="min-h-dvh bg-white text-[#1A1A1A]">
      <header className="border-b border-[#EBEBEB]/20 bg-[#1A1A1A] px-5 py-5 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <a href="/" aria-label="Wren Labs home" className="flex min-h-11 items-center">
            <img src={wrenLabsLogo} alt="" className="h-8 w-auto brightness-0 invert sm:h-9" />
          </a>
          <a href="/#work" className="flex min-h-11 items-center gap-2 text-sm font-semibold">← Meet the builders</a>
        </div>
      </header>

      <main className="grid-surface px-5 py-14 sm:px-8 sm:py-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          {member ? (
            <>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/65">Wren Labs / Team portfolio</p>
              <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
                <div className="min-w-0">
                  <p className="mb-4 text-sm font-semibold">{member.eyebrow}</p>
                  <h1 className="break-words text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.95] tracking-[-0.06em]">{member.name}</h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#1A1A1A]/65">{member.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of focus">
                    {member.services.map((service) => <li key={service} className="rounded-full border border-[#EBEBEB] bg-white px-3 py-2 text-sm">{service}</li>)}
                  </ul>
                </div>
                <aside className="min-w-0 border border-[#EBEBEB] bg-white p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1A1A1A]/65">A new home for my work</p>
                  <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em]">Full portfolio coming here soon.</h2>
                  <p className="mt-4 leading-relaxed text-[#1A1A1A]/65">This space is being prepared for my portfolio. You can explore my current work using the link below.</p>
                  <a href={member.currentPortfolio} target="_blank" rel="noreferrer" className="mt-6 flex min-h-12 items-center justify-between gap-4 rounded-full bg-[#1A1A1A] px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-80">
                    View current portfolio <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </aside>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Wren Labs / Portfolio</p>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-6xl">Portfolio not found.</h1>
              <p className="mt-5 text-lg text-[#1A1A1A]/65">Choose one of our builders below to explore their work.</p>
            </>
          )}

          <nav aria-label="Team portfolios" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#EBEBEB] pt-6">
            {teamMembers.filter((person) => person.id !== member?.id).map((person) => (
              <a key={person.id} href={person.href} className="flex min-h-11 items-center gap-3 font-semibold underline decoration-[#EBEBEB] underline-offset-4 hover:decoration-current">{person.name} <span aria-hidden="true">→</span></a>
            ))}
          </nav>
        </motion.div>
      </main>

      <footer className="border-t border-[#EBEBEB] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <a href="/#contact" className="flex min-h-11 items-center font-semibold underline underline-offset-4">Have a project in mind?</a>
          <a href="mailto:wrenlabsph@gmail.com" className="break-all text-sm">wrenlabsph@gmail.com</a>
        </div>
      </footer>
    </div>
  )
}
