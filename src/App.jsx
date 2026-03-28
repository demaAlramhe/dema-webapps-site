import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Projects from './components/Projects'
import About from './components/About'
import Process from './components/Process'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AccessibilityButton from './components/AccessibilityButton'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Projects />
        <About />
        <Process />
        <CTA />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
      {/* Circular accessibility button for people with disabilities */}
      <AccessibilityButton />
    </>
  )
}
