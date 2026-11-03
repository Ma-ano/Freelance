import Hero from './components/heroes/hero'
import About from './components/about/profile'
import Experience from './components/experience/timeline'
import Projects from './components/projects/case-studies'
import Skills from './components/skills/technical-skills'
import Strengths from './components/strengths/core-strengths'
import Contact from './components/contact/contact'
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'
import { MotionConfig } from 'motion/react'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-text">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navigation />

        <main id="main" tabIndex={-1}>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Strengths />
          <Experience />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
