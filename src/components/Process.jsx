import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'

export default function Process() {
  const { lang, t } = useLanguage()
  const steps = translations[lang].process.steps

  return (
    <section className="relative bg-surface-alt py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(103,93,84,0.06),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('process.title')}</SectionHeading>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-center"
            >
              <motion.div
                className="relative z-[1] mx-auto mb-5 inline-flex h-28 w-28 items-center justify-center rounded-2xl border border-brand-600/20 bg-gradient-to-br from-brand-600/18 to-brand-800/10 text-2xl font-bold text-brand-900 shadow-card backdrop-blur-sm"
                whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
              >
                <span className="font-mono tracking-tight">{step.num}</span>
              </motion.div>
              <h3 className="text-lg font-bold tracking-tight text-ink md:text-xl">{step.title}</h3>
              {step.desc && (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
