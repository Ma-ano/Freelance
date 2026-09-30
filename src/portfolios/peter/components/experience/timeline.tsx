import { motion } from 'motion/react'

const responsibilities = [
  {
    title: 'End-to-end delivery',
    description:
      'Develop web and mobile applications from requirements gathering and planning through implementation, testing, and deployment.',
  },
  {
    title: 'Direct client collaboration',
    description:
      'Work directly with clients to understand requirements, troubleshoot issues, explain technical decisions, and iterate based on feedback.',
  },
  {
    title: 'Sound engineering practices',
    description:
      'Build with Next.js, React, Firebase, and Laravel MVC with Blade, covering database design, server-side authentication, payment and email integration, PDF and spreadsheet handling, and responsive interfaces.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-border" aria-labelledby="experience-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Experience</span>
          <h2 id="experience-title" className="section-title mt-3">
            Where I've worked
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-4"
          >
            <h3 className="text-xl font-medium text-text">Freelance Full-Stack Developer</h3>
            <p className="mt-2 text-base text-text-muted">Philippines</p>
            <p className="mt-1 text-sm text-text-subtle">2025 – Present</p>
            <p className="mt-6 text-base leading-relaxed text-text-muted">
              Sole developer on production systems for real clients — owning everything from the
              first requirements conversation to deployment.
            </p>
          </motion.div>

          <motion.ol
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-8 space-y-0"
            aria-label="Key responsibilities"
          >
            {responsibilities.map((item, index) => (
              <li
                key={item.title}
                className={`flex gap-6 py-6 ${
                  index !== responsibilities.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <span
                  className="text-sm font-mono text-text-subtle pt-1 shrink-0"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="text-base font-medium text-text">{item.title}</h4>
                  <p className="mt-2 text-base leading-relaxed text-text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

