import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import portrait from '../../assets/peter-portrait.png'

export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-6">{profile.name} <span className="text-text-subtle">/ Portfolio</span></p>
            <h1 id="hero-title" className="hero-title">
              I build software.<br />
              <span className="text-accent">I make it work.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-muted">
              Hi, I’m Peter. A software engineer and full-stack developer who enjoys
              turning real problems into working systems — from web and mobile apps
              to AI automation.
            </p>
            <ul className="mt-6 flex max-w-xl flex-wrap gap-x-5 gap-y-2 text-sm text-text" aria-label="Professional roles">
              {profile.roles.map((role) => <li key={role}>{role}</li>)}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">Explore my work <span aria-hidden="true">↗</span></a>
              <a href="#contact" className="btn-secondary">Let’s talk</a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Available for freelance & automation work
            </p>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="portrait-card"
          >
            <div className="portrait-frame">
              <img
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                width="1254"
                height="1254"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
              <span className="portrait-note">The person behind the code.</span>
            </div>
            <figcaption className="flex flex-wrap justify-between gap-3 border-t border-border px-5 py-4 text-xs text-text-muted">
              <span>{profile.location}</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Find me on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </figcaption>
          </motion.figure>
        </div>
        <div className="hero-bottom">
          <p>Practical thinking. Clear communication. Complete workflows.</p>
          <a href="#projects" className="text-text hover:text-accent">Selected work <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}

