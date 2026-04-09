import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'

export default function Projects() {
  const { lang, t, dir } = useLanguage()
  const items = translations[lang].projects.items
  const isRtl = dir === 'rtl'

  return (
    <section id="projects" className="relative bg-surface-alt py-28 md:py-36">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-600/25 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('projects.title')}</SectionHeading>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {items.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-24px' }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-surface-card shadow-card transition-shadow duration-300 hover:border-brand-600/25 hover:shadow-card-hover"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-t from-surface-alt to-surface-card">
                    <span className="text-sm text-ink-subtle">{project.title}</span>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="border-t border-ink/10 p-6 md:p-7">
                  <h3 className="text-xl font-bold tracking-tight text-ink">{project.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {project.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-800 transition-all group-hover:gap-3">
                    {t('projects.viewProject')}
                    <ExternalLink className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
