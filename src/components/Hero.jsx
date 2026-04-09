import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, Play, Shield, Smartphone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t, dir } = useLanguage()
  const isRtl = dir === 'rtl'
  const reduceMotion = useReducedMotion()

  const orbTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 8, repeat: Infinity, ease: 'easeInOut' }

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-page pt-24 md:pt-28"
    >
      {/* Depth layers */}
      <div className="absolute inset-0 bg-mesh-warm" aria-hidden />
      <div className="absolute inset-0 bg-hero-pattern opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(103,93,84,0.07)_1px,transparent_1px)] opacity-[0.45] [background-size:32px_32px]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-page/95 via-page/80 to-surface-alt"
        aria-hidden
      />

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute -left-[20%] top-1/4 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-[100px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,800px)] w-[min(90vw,800px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/12 blur-[120px]"
        animate={
          reduceMotion
            ? { scale: 1, opacity: 0.45 }
            : { scale: [1, 1.12, 1], opacity: [0.35, 0.52, 0.35] }
        }
        transition={orbTransition}
        aria-hidden
      />
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute -right-[15%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-brand-800/10 blur-[90px]"
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-surface-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800 shadow-soft backdrop-blur-md">
            DEMA DIGITAL SOLUTIONS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tighter text-ink sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted sm:text-xl md:text-[1.35rem] md:leading-relaxed"
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-9 flex justify-center gap-8 text-brand-700/35"
          aria-hidden
        >
          <Globe className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
          <Smartphone className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
          <Shield className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-card transition-all hover:bg-brand-700 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            whileHover={reduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta')}
            <ArrowRight
              className={`h-5 w-5 transition-transform group-hover:translate-x-0.5 ${isRtl ? 'rotate-180' : ''}`}
            />
          </motion.a>
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-2xl border border-ink/12 bg-surface-card/80 px-8 py-4 text-base font-semibold text-ink shadow-soft backdrop-blur-md transition-all hover:border-brand-600/35 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            whileHover={reduceMotion ? {} : { scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="h-5 w-5 text-brand-700" strokeWidth={2} />
            {t('hero.viewWork')}
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-ink-subtle transition-colors hover:text-brand-700"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            {t('hero.scrollHint')}
          </span>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-current p-2">
            <motion.span
              animate={reduceMotion ? {} : { y: [0, 6, 0] }}
              transition={reduceMotion ? {} : { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-current"
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
