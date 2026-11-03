import { motion } from 'motion/react'
import { skillCategories } from '../../data/profile'

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-border" aria-labelledby="skills-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow">Technical skills</span>
          <h2 id="skills-title" className="section-title mt-3">
            The tools behind the work.
          </h2>
          <p className="section-subtitle">Web, mobile, backend systems, and AI automation. I choose the tools around what the project needs.</p>
        </motion.div>

        <dl className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.label}
              className="rounded-lg border border-border bg-bg-elevated p-6 sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.08 }}
            >
              <dt className="text-sm font-medium tracking-widest uppercase text-text-subtle">
                {category.label}
              </dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-md border border-border text-text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
