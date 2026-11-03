import { motion } from 'motion/react'
import { coreStrengths } from '../../data/profile'

const workingPrinciples = [
  { title: 'Understand the actual problem.', description: 'Start with questions, requirements, and the people using the system. Make the next step clear before building.' },
  { title: 'Follow it through.', description: 'Connect the interface, backend, and data. Trace issues to their cause and check the whole workflow.' },
  { title: 'Keep the conversation clear.', description: 'Explain decisions in plain language, work through feedback, and keep the client involved from planning to delivery.' },
]

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
          <span className="eyebrow">My approach</span>
          <h2 id="strengths-title" className="section-title mt-3">
            How I like to work.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {workingPrinciples.map((principle, index) => (
            <div key={principle.title} className="border-t border-border pt-6">
              <span className="font-mono text-xs text-accent" aria-hidden="true">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-medium">{principle.title}</h3>
              <p className="mt-3 leading-relaxed text-text-muted">{principle.description}</p>
            </div>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" aria-label="Core strengths">
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
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <span className="text-xs font-mono text-text-subtle shrink-0" aria-hidden="true">
                /
              </span>
              {strength}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
