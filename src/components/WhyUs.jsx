import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, Stagger, StaggerItem, useMotionSafe } from './motion/Reveal'
import { hoverLiftSubtle, hoverTap } from '../lib/hover'

export default function WhyUs() {
  const { lang, t } = useLanguage()
  const items = translations[lang].whyUs.items
  const motionSafe = useMotionSafe()

  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <AmbientBackground variant="page" intensity="soft" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('whyUs.title')}</SectionHeading>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" stagger={0.08} delayChildren={0.05}>
          {items.map((item, i) => (
            <StaggerItem
              key={i}
              as={motion.div}
              whileHover={motionSafe ? {} : hoverLiftSubtle}
              whileTap={motionSafe ? {} : hoverTap}
              className="glass-card glass-interactive hover-card-ring group flex items-start gap-4 rounded-2xl p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-600/20 bg-brand-600/12 text-brand-800 shadow-inner-light transition-[transform,background-color,border-color] duration-300 ease-out-expo group-hover:scale-105 group-hover:border-brand-600/35 group-hover:bg-brand-600/22">
                <Check className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="pt-0.5 text-[0.9375rem] font-semibold leading-snug text-ink">{item}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
