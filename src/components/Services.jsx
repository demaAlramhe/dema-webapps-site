import { motion } from 'framer-motion'
import { Globe, Layout, Code2, Wrench, Share2, Video } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'

const icons = [Globe, Layout, Code2, Wrench, Share2, Video]

export default function Services() {
  const { lang, t } = useLanguage()
  const items = translations[lang].services.items

  return (
    <section id="services" className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(103,93,84,0.07),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('services.title')}</SectionHeading>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i] || Globe
            const num = String(i + 1).padStart(2, '0')
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-b from-surface-elevated/90 to-surface-card/95 p-6 shadow-card transition-shadow duration-300 hover:border-brand-600/30 hover:shadow-card-hover md:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-shine-edge opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-4">
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-600/15 bg-brand-600/10 text-brand-800 shadow-inner-light transition-colors duration-300 group-hover:border-brand-600/30 group-hover:bg-brand-600/18"
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </motion.div>
                  <span className="font-mono text-xs font-semibold tracking-widest text-brand-600/70">
                    {num}
                  </span>
                </div>
                <h3 className="relative mt-5 text-xl font-bold tracking-tight text-ink md:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-muted md:text-[0.9375rem]">
                  {item.desc}
                </p>
                {item.features && item.features.length > 0 && (
                  <ul className="relative mt-5 space-y-2 border-t border-ink/10 pt-5">
                    {item.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-snug text-ink-subtle"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600/80"
                          aria-hidden
                        />
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
