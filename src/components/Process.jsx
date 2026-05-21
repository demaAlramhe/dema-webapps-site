import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, Stagger, StaggerItem, useMotionSafe } from './motion/Reveal'
import { hoverIconPop, hoverTap } from '../lib/hover'

export default function Process() {
  const { lang, t } = useLanguage()
  const steps = translations[lang].process.steps
  const motionSafe = useMotionSafe()

  return (
    <section className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <AmbientBackground variant="alt" intensity="soft" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('process.title')}</SectionHeading>
        </Reveal>

        <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.11} delayChildren={0.06}>
          {steps.map((step, i) => (
            <StaggerItem key={i} as={motion.div} variant="scaleIn" className="relative text-center">
              <motion.div
                className="glass-card glass-interactive hover-card-ring relative z-[1] mx-auto mb-5 inline-flex h-28 w-28 cursor-default items-center justify-center rounded-2xl text-2xl font-bold text-brand-900"
                whileHover={motionSafe ? {} : hoverIconPop}
                whileTap={motionSafe ? {} : hoverTap}
              >
                <span className="font-mono tracking-tight">{step.num}</span>
              </motion.div>
              <h3 className="text-lg font-bold tracking-tight text-ink md:text-xl">{step.title}</h3>
              {step.desc && (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
