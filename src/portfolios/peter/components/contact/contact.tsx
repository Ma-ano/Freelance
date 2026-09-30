import { motion } from 'motion/react'
import { profile } from '../../data/profile'

export default function Contact() {
  return (
    <section id="contact" className="section border-t border-border" aria-labelledby="contact-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Contact</span>
          <h2 id="contact-title" className="section-title mt-3 text-balance">
            Have a project in mind? Let's build it.
          </h2>
          <p className="section-subtitle">
            I'm available for freelance and software development work. Whether you need a full
            application built from the ground up or an existing system improved, I'd like to
            hear about it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="card group"
            aria-label={`Email ${profile.name} at ${profile.email}`}
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-text-subtle">Email</h3>
            <p className="mt-4 text-base text-text break-all group-hover:text-accent-muted transition-colors duration-200">
              {profile.email}
            </p>
          </a>

          <a
            href={profile.viber}
            className="card group"
            aria-label={`Chat on Viber: ${profile.viberDisplay}`}
          >
            <h3 className="text-sm font-medium tracking-widest uppercase text-text-subtle">Viber</h3>
            <p className="mt-4 text-base text-text group-hover:text-accent-muted transition-colors duration-200">
              {profile.viberDisplay}
            </p>
            <p className="mt-1 text-sm text-text-subtle">Chat on Viber</p>
          </a>

          <div className="card">
            <h3 className="text-sm font-medium tracking-widest uppercase text-text-subtle">Elsewhere</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-text hover:text-accent-muted transition-colors duration-200"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  github.com/ma-ano
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-text hover:text-accent-muted transition-colors duration-200"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  linkedin.com/in/peter-gil-maaño
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
