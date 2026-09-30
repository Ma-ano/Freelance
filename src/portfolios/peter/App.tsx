import Hero from './components/heroes/hero'
import About from './components/about/profile'
import Experience from './components/experience/timeline'
import Projects from './components/projects/case-studies'
import Skills from './components/skills/technical-skills'
import Strengths from './components/strengths/core-strengths'
import Education from './components/education/education'
import Contact from './components/contact/contact'
import Footer from './components/footer/footer'
import Navigation from './components/navigation/navigation'

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Navigation />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Strengths />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
