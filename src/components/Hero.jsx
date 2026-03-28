import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t, dir } = useLanguage()
  const isRtl = dir === 'rtl'

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-page">
      <div className="absolute inset-0 bg-hero-pattern" />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none bg-[radial-gradient(rgba(103,93,84,0.09)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-page via-page to-surface-alt" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-600/12 blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ink leading-tight tracking-tight"
        >
          {t('hero.headline')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg sm:text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed"
        >
          {t('hero.subheadline')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-700/30"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -12px rgba(103, 93, 84, 0.35)' }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta')}
            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
          </motion.a>
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-brand-600/35 hover:border-brand-600/60 hover:bg-surface-card text-ink font-medium transition-all"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5" />
            {t('hero.viewWork')}
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#services" className="flex flex-col items-center gap-2 text-ink-subtle hover:text-ink-muted transition-colors">
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-current"
            />
          </div>
        </a>
      </motion.div>
    </section>
  )
}
