import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CTA() {
  const { t, dir } = useLanguage()
  const isRtl = dir === 'rtl'

  return (
    <section className="py-24 md:py-32 bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-brand-600/20 to-brand-700/10 border border-brand-500/20 p-12 md:p-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {t('cta.text')}
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-lg transition-all shadow-lg shadow-brand-600/25"
            whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(51, 140, 250, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {t('cta.button')}
            <ArrowRight className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
