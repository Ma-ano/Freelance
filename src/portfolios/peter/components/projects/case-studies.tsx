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
      className="card flex min-w-0 flex-col"
      aria-labelledby={`project-${index}-title`}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-mono text-accent" aria-hidden="true">{String(index + 1).padStart(2, '0')} / PROJECT</span>
        {project.websiteStatus === 'paused' && <span className="rounded-full border border-border-strong px-3 py-1 text-text-muted">Website currently paused</span>}
      </div>
      <div>
        <p className="mb-3 text-xs text-text-subtle">{project.type}</p>
        <h3 id={`project-${index}-title`} className="text-xl sm:text-2xl font-medium text-text">
          {project.name}
        </h3>
      </div>

      <p className="mt-5 text-base leading-relaxed text-text-muted">{project.overview}</p>

      <dl className="mt-6 grid gap-6">
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
            <div className="pt-8 mt-8 border-t border-border grid gap-8">
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
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent hover:text-accent-muted transition-colors duration-200"
              aria-label={`Visit ${project.websiteStatus === 'paused' ? 'paused website' : 'live site'}: ${project.name} (opens in a new tab)`}
            >
              {project.websiteStatus === 'paused' ? 'Website (paused)' : 'Visit website'}
              <ExternalLinkIcon />
            </a>
          )}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={expanded ? `project-${index}-details` : undefined}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-muted hover:text-text transition-colors duration-200"
            aria-label={`${expanded ? 'Less detail' : 'More detail'} about ${project.name}`}
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
          <span className="eyebrow">Selected work</span>
          <h2 id="projects-title" className="section-title mt-3">
            Different problems. Working solutions.
          </h2>
          <p className="section-subtitle">
            A closer look at the storefronts, systems, and recording tools I’ve worked on,
            alongside a personal exploration of frontend design.
          </p>
        </motion.div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {[...projects.filter((project) => project.liveUrl), ...projects.filter((project) => !project.liveUrl)].map((project, index) => (
            <CaseStudy key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
