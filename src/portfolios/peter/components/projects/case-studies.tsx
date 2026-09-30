import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects, type Project } from '../../data/profile'

function ExternalLinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5h7v7M21 5l-9 9M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"
      />
    </svg>
  )
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      className={`card ${index === 0 ? 'lg:p-10' : ''}`}
      aria-labelledby={`project-${index}-title`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id={`project-${index}-title`} className="text-xl sm:text-2xl font-medium text-text">
          {project.name}
        </h3>
        <p className="text-sm text-text-subtle">{project.type}</p>
      </div>

      <p className="mt-5 text-base leading-relaxed text-text-muted">{project.overview}</p>

      <dl className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium tracking-widest uppercase text-text-subtle">My role</dt>
          <dd className="mt-3 text-base leading-relaxed text-text-muted">{project.role}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium tracking-widest uppercase text-text-subtle">
            What I built
          </dt>
          <dd className="mt-3 space-y-2.5">
            {project.built.map((item) => (
              <p key={item} className="text-base leading-relaxed text-text-muted flex gap-3">
                <span className="mt-2 h-1 w-1 rounded-full bg-text-subtle shrink-0" aria-hidden="true" />
                {item}
              </p>
            ))}
          </dd>
        </div>
      </dl>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`project-${index}-details`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-8 mt-8 border-t border-border grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase text-text-subtle">
                  Key functionality
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key features">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="px-3 py-1.5 text-sm rounded-full border border-border text-text-muted"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-widest uppercase text-text-subtle">
                  Technical areas
                </h4>
                <ul className="mt-4 space-y-2">
                  {project.technicalAreas.map((area) => (
                    <li key={area} className="text-base leading-relaxed text-text-muted flex gap-3">
                      <span className="mt-2 h-1 w-1 rounded-full bg-text-subtle shrink-0" aria-hidden="true" />
                      {area}
                    </li>
                  ))}
                </ul>
                {project.integrations && (
                  <>
                    <h4 className="mt-6 text-sm font-medium tracking-widest uppercase text-text-subtle">
                      Integrations
                    </h4>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Integrations">
                      {project.integrations.map((integration) => (
                        <li
                          key={integration}
                          className="px-3 py-1.5 text-sm rounded-full border border-border-strong text-text"
                        >
                          {integration}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-subtle" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-text hover:text-accent-muted transition-colors duration-200"
              aria-label={`Visit live site: ${project.name} (opens in a new tab)`}
            >
              View live site
              <ExternalLinkIcon />
            </a>
          )}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`project-${index}-details`}
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-text transition-colors duration-200"
          >
            {expanded ? 'Less detail' : 'More detail'}
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section border-t border-border" aria-labelledby="projects-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">Work</span>
          <h2 id="projects-title" className="section-title mt-3">
            Selected projects.
          </h2>
          <p className="section-subtitle">
            Production systems built for real businesses — plus one personal exploration of
            frontend craft.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6 lg:space-y-8">
          {projects.map((project, index) => (
            <CaseStudy key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
