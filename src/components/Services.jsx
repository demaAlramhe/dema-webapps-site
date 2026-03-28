import { motion } from 'framer-motion'
import {
  Globe,
  Layout,
  Code2,
  Wrench,
  Share2,
  Video,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

const icons = [Globe, Layout, Code2, Wrench, Share2, Video]

export default function Services() {
  const { lang, t } = useLanguage()
  const items = translations[lang].services.items

  return (
    <section id="services" className="py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-ink text-center mb-16"
        >
          {t('services.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = icons[i] || Globe
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative p-6 md:p-8 rounded-2xl bg-surface-card border border-ink/10 hover:border-brand-600/35 hover:bg-surface-elevated transition-all duration-300 cursor-default shadow-sm"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-brand-600/15 flex items-center justify-center text-brand-700 mb-4 group-hover:bg-brand-600/25 transition-colors"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-4">{item.desc}</p>
                {item.features && item.features.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.features.map((f, j) => (
                      <li key={j} className="text-ink-subtle text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
