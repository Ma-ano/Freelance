import { motion } from 'motion/react'
import { profile } from '../../data/profile'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg-elevated/50 text-sm font-medium text-text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for freelance work
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-text leading-[1.05] text-balance"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="mt-6 flex flex-col lg:flex-row items-center justify-center gap-3 text-lg text-text-muted"
          >
            <span className="font-medium text-text">Full-Stack Developer</span>
            <span className="hidden lg:inline" aria-hidden="true">•</span>
            <span className="font-medium text-text">Software Developer</span>
            <span className="hidden lg:inline" aria-hidden="true">•</span>
            <span className="font-medium text-text">Web & Mobile Developer</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="mt-8 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed text-balance"
          >
            I build e-commerce platforms and school management systems with Next.js, React,
            Firebase, and Laravel — from customer interfaces to backend services and deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="btn-primary w-full sm:w-auto"
              aria-label="View my work - Project case studies"
            >
              View My Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-secondary w-full sm:w-auto"
              aria-label="Contact me - Get in touch"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="mt-16 flex items-center justify-center gap-8"
          >
            <a
              href="https://github.com/ma-ano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/peter-gil-maaño-28364a2b4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={profile.viber}
              className="text-text-muted hover:text-text transition-colors duration-200"
              aria-label={`Chat on Viber: ${profile.viberDisplay}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .8C6.3.8 1.6 4.8 1.6 10c0 3 1.6 5.7 4.1 7.4v3.9c0 .6.7 1 1.2.6l3.3-2.4c.6.1 1.2.1 1.8.1 5.7 0 10.4-4 10.4-9.2S17.7.8 12 .8zm5.6 11.6c-.3.8-1.5 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.2-.4-2-.8-1.8-.8-3-2.6-3.1-2.7-.1-.2-.7-1-.7-1.9 0-.9.5-1.3.6-1.5.2-.2.4-.2.5-.2h.4c.1 0 .3 0 .5.4l.7 1.6c.1.1.1.3 0 .4l-.3.4-.3.3c-.1.1-.2.3-.1.4.2.3.6.9 1.1 1.3.6.6 1.2.8 1.5 1 .2.1.3.1.4 0l.6-.7c.1-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.2 0 .2 0 .4-.1.6z" />
              </svg>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-12 flex justify-center motion-safe:animate-bounce"
          aria-hidden="true"
        >
          <svg className="w-6 h-6 text-text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

