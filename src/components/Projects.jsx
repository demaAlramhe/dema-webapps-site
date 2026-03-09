import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function Projects() {
  const { lang, t, dir } = useLanguage()
  const items = translations[lang].projects.items
  const isRtl = dir === 'rtl'

  return (
    <section id="projects" className="py-24 md:py-32 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
        >
          {t('projects.title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((project, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group rounded-2xl overflow-hidden bg-dark-700/50 border border-white/5 hover:border-brand-500/20 transition-all duration-300"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-video bg-dark-600 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-t from-dark-800 to-dark-700">
                    <span className="text-white/50 text-sm">{project.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-brand-400 text-sm font-medium">{project.category}</span>
                  <h3 className="text-xl font-semibold text-white mt-1 mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  <span className="inline-flex items-center gap-2 text-brand-400 font-medium text-sm group-hover:gap-3 transition-all">
                    {t('projects.viewProject')}
                    <ExternalLink className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
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
