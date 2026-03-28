import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function WhyUs() {
  const { lang, t } = useLanguage()
  const items = translations[lang].whyUs.items

  return (
    <section className="py-24 md:py-32 bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-ink text-center mb-16"
        >
          {t('whyUs.title')}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-start gap-4 p-4 rounded-xl bg-surface-card border border-ink/10 hover:border-brand-600/25 transition-colors cursor-default shadow-sm"
            >
              <motion.span
                className="w-8 h-8 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0 mt-0.5"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Check className="w-4 h-4 text-brand-700" />
              </motion.span>
              <span className="text-ink font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
