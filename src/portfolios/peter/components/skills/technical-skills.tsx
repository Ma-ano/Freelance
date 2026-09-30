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
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Skills</span>
          <h2 id="skills-title" className="section-title mt-3">
            Tools of the trade.
          </h2>
        </motion.div>

        <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.label}
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
                      className="px-3 py-1.5 text-sm rounded-md border border-border text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text"
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
