import { profile } from '../../data/profile'

export default function About() {
  return (
    <section id="about" className="section border-t border-border" aria-labelledby="about-title">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">A little about me</p>
          <h2 id="about-title" className="section-title mt-4">Curious about the problem.<br />Committed to the solution.</h2>
          <p className="mt-6 text-sm text-text-muted">Based in {profile.location}</p>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-text-muted lg:col-span-7">
          <p>
            I’m Peter, an Information Technology graduate and freelance software engineer.
            I like understanding how things fit together: the interface someone uses,
            the logic behind it, and the data that keeps it running.
          </p>
          <p>
            My work includes an online beauty store, a school management system, and
            DinkVision’s match recording platform. Each involves a different problem,
            from taking payments to managing academic records and recovering video uploads.
          </p>
          <p>
            I work directly with clients, ask questions, troubleshoot, and build through
            to deployment. I also work on AI automation to connect tools and reduce
            repetitive tasks. I care about making the complete workflow useful and reliable.
          </p>
          <a href="#skills" className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-accent">
            See the tools I work with <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

