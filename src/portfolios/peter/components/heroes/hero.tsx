import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import portrait from '../../assets/peter-portrait.png'

export default function Hero() {
  return (
    <section id="home" className="editorial-hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-index"><span>Independent developer / Philippines</span><span>Portfolio — {new Date().getFullYear()}</span></div>
        <div className="hero-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <p className="hero-intro">Hi, I’m Peter Gil T. Ma-año.</p>
            <h1 id="hero-title">Thoughtfully built.<br /><span>Ready for</span><br /><em>real life.</em></h1>
            <p className="hero-role">Full-stack developer / Web & mobile</p>
            <p className="hero-description">I turn complex workflows into software that feels simple. From a customer’s first checkout to a school’s daily operations, I build the interface, the logic, and everything that connects them.</p>
            <div className="hero-actions">
              <a href="#projects" className="hero-primary">Explore my work <span aria-hidden="true">↗</span></a>
              <a href="#contact" className="hero-secondary">Let’s talk ↗</a>
            </div>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={profile.viber}>Viber ↗</a>
            </div>
          </motion.div>
          <motion.figure className="hero-portrait" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="hero-photo">
              <img src={portrait} alt="Portrait of Peter Gil T. Ma-año" width={1254} height={1254} fetchPriority="high" />
              <span className="photo-cross" aria-hidden="true">+</span>
              <span className="photo-side" aria-hidden="true">DESIGN / DEVELOP / DELIVER</span>
              <div className="photo-caption"><span>Behind the code</span><strong>Peter Gil<br />T. Ma-año.</strong></div>
            </div>
            <figcaption><span>Based in Las Piñas, PH</span><span>From idea to deployment ↗</span></figcaption>
          </motion.figure>
        </div>
        <div className="hero-colophon"><span>Interfaces with intent. Systems with purpose.</span><span>Next.js / React / Firebase / Laravel</span><a href="#projects">Selected work ↓</a></div>
      </div>
    </section>
  )
}

