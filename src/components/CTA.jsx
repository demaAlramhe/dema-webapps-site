import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CTA() {
  const { t, dir } = useLanguage()
  const isRtl = dir === 'rtl'

  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-600/12 via-transparent to-brand-800/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-brand-600/20 bg-gradient-to-br from-surface-elevated/95 via-surface-card to-surface-alt/90 p-10 shadow-card md:p-16"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-600/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-brand-800/10 blur-3xl"
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
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-10 py-4 text-lg font-semibold text-white shadow-card transition-all hover:bg-brand-700 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('cta.button')}
              <ArrowRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
