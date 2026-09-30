import { motion } from 'motion/react'
import { coreStrengths } from '../../data/profile'

export default function Strengths() {
  return (
    <section id="strengths" className="section border-t border-border" aria-labelledby="strengths-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Strengths</span>
          <h2 id="strengths-title" className="section-title mt-3">
            How I work.
          </h2>
        </motion.div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" aria-label="Core strengths">
          {coreStrengths.map((strength, index) => (
            <motion.li
              key={strength}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: (index % 5) * 0.06,
              }}
              className="flex items-center gap-3 py-4 sm:py-6 border-b border-border lg:border-b-0 lg:[&:not(:nth-child(5n))]:border-r pr-0 lg:pr-6 text-base text-text-muted"
            >
              <span className="text-xs font-mono text-text-subtle shrink-0" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {strength}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
