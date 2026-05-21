import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import AmbientBackground from './AmbientBackground'
import { Reveal, useMotionSafe } from './motion/Reveal'
import { hoverButtonPrimary, hoverTap } from '../lib/hover'

export default function CTA() {
  const { t, dir } = useLanguage()
  const isRtl = dir === 'rtl'
  const motionSafe = useMotionSafe()

  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <AmbientBackground variant="cta" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal variant="scaleIn" className="glass-panel relative overflow-hidden rounded-[2rem] p-10 md:p-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-600/15 blur-3xl animate-glow-drift motion-reduce:animate-none"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-brand-800/10 blur-3xl animate-glow-drift-slow motion-reduce:animate-none"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600/[0.06] via-transparent to-brand-800/[0.08] animate-mesh-shift opacity-80 motion-reduce:animate-none"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted md:text-xl">
              {t('cta.text')}
            </p>
            <motion.a
              href="#contact"
              className="btn-premium-primary group mt-10 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-10 py-4 text-lg font-semibold text-white shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
              whileHover={motionSafe ? {} : hoverButtonPrimary}
              whileTap={motionSafe ? {} : hoverTap}
            >
              {t('cta.button')}
              <ArrowRight
                className={`h-5 w-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
              />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
