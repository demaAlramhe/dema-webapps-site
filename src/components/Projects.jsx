import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, Stagger, StaggerItem, useMotionSafe } from './motion/Reveal'
import { hoverLiftProject, hoverTap } from '../lib/hover'

export default function Projects() {
  const { lang, t, dir } = useLanguage()
  const items = translations[lang].projects.items
  const isRtl = dir === 'rtl'
  const motionSafe = useMotionSafe()

  return (
    <section id="projects" className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <AmbientBackground variant="alt" intensity="soft" />
      <div className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-brand-600/25 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('projects.title')}</SectionHeading>
        </Reveal>

        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10" stagger={0.12} delayChildren={0.08}>
          {items.map((project, i) => (
            <StaggerItem
              key={i}
              as={motion.article}
              variant="fadeUp"
              whileHover={motionSafe ? {} : hoverLiftProject}
              whileTap={motionSafe ? {} : hoverTap}
              className="project-card glass-card glass-interactive hover-card-ring group overflow-hidden rounded-2xl"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
              >
                <div className="project-card-media relative aspect-[16/10] overflow-hidden bg-surface-alt">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling?.classList.remove('hidden')
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-t from-surface-alt to-surface-card">
                    <span className="text-sm text-ink-subtle">{project.title}</span>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/8 to-transparent opacity-80 transition-opacity duration-400 ease-out-expo group-hover:opacity-95"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="project-card-badge inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-[transform,border-color] duration-300 ease-out-expo">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="border-t border-ink/10 p-6 transition-colors duration-300 group-hover:border-brand-600/15 md:p-7">
                  <h3 className="text-xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-900">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {project.desc}
                  </p>
                  <span className="project-card-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-800">
                    {t('projects.viewProject')}
                    <ExternalLink className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
