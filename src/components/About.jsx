import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, useMotionSafe } from './motion/Reveal'
import { hoverLiftSubtle, hoverTap } from '../lib/hover'

export default function About() {
  const { t } = useLanguage()
  const motionSafe = useMotionSafe()

  return (
    <section id="about" className="relative overflow-hidden bg-page py-28 md:py-36">
      <AmbientBackground variant="spotlight" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('about.title')}</SectionHeading>
        </Reveal>

        <Reveal variant="scaleIn" delay={0.1} className="relative mx-auto max-w-3xl">
          <div className="absolute -start-1 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-brand-600/50 via-brand-600/25 to-transparent md:block" aria-hidden />
          <motion.div
            className="surface-premium glass-interactive hover-card-ring relative rounded-2xl p-8 md:p-12 md:ps-14"
            whileHover={motionSafe ? {} : hoverLiftSubtle}
            whileTap={motionSafe ? {} : hoverTap}
          >
            <Sparkles
              className="absolute end-6 top-6 h-6 w-6 text-brand-600/35"
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="text-pretty text-lg leading-relaxed text-ink-muted md:text-xl md:leading-relaxed">
              {t('about.text')}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
