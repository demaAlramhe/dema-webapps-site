import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'

export default function WhyUs() {
  const { lang, t } = useLanguage()
  const items = translations[lang].whyUs.items

  return (
    <section className="relative overflow-hidden bg-page py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-warm opacity-50"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('whyUs.title')}</SectionHeading>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface-card/90 p-5 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-brand-600/25 hover:shadow-card-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-600/20 bg-brand-600/12 text-brand-800 shadow-inner-light transition-colors group-hover:bg-brand-600/20">
                <Check className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="pt-0.5 text-[0.9375rem] font-semibold leading-snug text-ink">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
