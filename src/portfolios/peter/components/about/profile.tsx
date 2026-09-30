import { motion } from 'motion/react'
import { profile } from '../../data/profile'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-sm font-medium tracking-widest uppercase text-text-subtle">About</span>
          <h2 id="about-title" className="section-title mt-3">
            Building software that businesses actually run on.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-3 space-y-6 text-lg leading-relaxed text-text-muted"
          >
            <p>
              I'm an Information Technology graduate and freelance full-stack developer based in{' '}
              <span className="text-text">{profile.location}</span>. I build production web
              applications for businesses, with systems that handle
              payments, orders, grades, and the day-to-day operations people depend on.
            </p>
            <p>
              For Pinay Victorious Beauty Australia, I use Next.js 16, React 19, TypeScript,
              Tailwind CSS 4, and Firebase to support the storefront and admin dashboard,
              with PayPal and Afterpay payments.
            </p>
            <p>
              For Everbright International Academy Inc., I use Laravel 11, PHP 8.2+, and MySQL,
              with server-rendered Blade templates and Bootstrap 5.3. Hosted on Hostinger,
              the system supports academic records and administrative workflows, with Laravel
              Dompdf for PDFs and PhpSpreadsheet for spreadsheet handling.
            </p>
            <p>
              My work covers database design, server-side authentication, file storage,
              email integration, responsive interfaces, and image optimization. I translate
              client requirements into maintainable applications and troubleshoot issues
              across the frontend and backend.
            </p>
            <p>
              I work independently from requirements gathering through planning, implementation,
              testing, and deployment — communicating directly with clients at every step.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-2"
            aria-label="Areas of expertise"
          >
            <div className="card h-full">
              <h3 className="text-sm font-medium tracking-widest uppercase text-text-subtle">
                What I work with
              </h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-3 text-base">
                {[
                  'Next.js & React',
                  'TypeScript & Tailwind CSS',
                  'Laravel, PHP & Blade',
                  'Firestore & MySQL',
                  'Route Handlers & REST APIs',
                  'Firebase Authentication & RBAC',
                  'PayPal & Afterpay',
                  'Bootstrap & responsive UI',
                  'PDFs & spreadsheets',
                  'Hostinger & Vercel',
                  'Debugging & root-cause analysis',
                  'Requirements gathering',
                  'Client communication',
                  'System design',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-muted">
                    <svg
                      className="mt-1.5 w-4 h-4 shrink-0 text-text-subtle"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

