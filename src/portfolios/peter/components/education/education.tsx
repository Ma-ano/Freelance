import { motion } from 'motion/react'
import { education } from '../../data/profile'

export default function Education() {
  return (
    <section id="education" className="section border-t border-border" aria-labelledby="education-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Education</span>
          <h2 id="education-title" className="sr-only">
            Education
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"
        >
          <div>
            <h3 className="text-xl font-medium text-text">{education.degree}</h3>
            <p className="mt-2 text-base text-text-muted">{education.school}</p>
          </div>
          <p className="text-sm text-text-subtle shrink-0">Graduated {education.graduated}</p>
        </motion.div>
      </div>
    </section>
  )
}
