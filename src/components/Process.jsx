import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function Process() {
  const { lang, t } = useLanguage()
  const steps = translations[lang].process.steps

  return (
    <section className="py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-ink text-center mb-16"
        >
          {t('process.title')}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative text-center cursor-default"
            >
              {i < steps.length - 1 && (
                <div className={`hidden lg:block absolute top-12 w-[80%] h-px from-brand-600/40 to-transparent ${translations[lang].dir === 'rtl' ? 'right-[60%] bg-gradient-to-l' : 'left-[60%] bg-gradient-to-r'}`} />
              )}
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-brand-600/15 text-brand-800 text-2xl font-bold mb-4 border border-brand-600/20"
                whileHover={{ scale: 1.08, transition: { type: 'spring', stiffness: 300 } }}
              >
                {step.num}
              </motion.div>
              <h3 className="text-xl font-semibold text-ink mb-2">{step.title}</h3>
              {step.desc && <p className="text-ink-muted text-sm">{step.desc}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
