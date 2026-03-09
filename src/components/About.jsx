import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          {t('about.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-white/75 leading-relaxed"
        >
          {t('about.text')}
        </motion.p>
      </div>
    </section>
  )
}
