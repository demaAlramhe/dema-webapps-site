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
import { SectionFloatingDecor } from './components/FloatingDecor3D'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative overflow-x-hidden">
        <Hero />
        <SectionFloatingDecor variant={0} />
        <Services />
        <SectionFloatingDecor variant={1} />
        <WhyUs />
        <SectionFloatingDecor variant={2} />
        <Projects />
        <SectionFloatingDecor variant={3} />
        <About />
        <SectionFloatingDecor variant={4} />
        <Process />
        <SectionFloatingDecor variant={5} />
        <CTA />
        <SectionFloatingDecor variant={6} />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
      {/* Circular accessibility button for people with disabilities */}
      <AccessibilityButton />
    </>
  )
}
