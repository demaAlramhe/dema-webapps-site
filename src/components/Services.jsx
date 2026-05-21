import { motion } from 'framer-motion'
import { Globe, Layout, Code2, Wrench, Share2, Video } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, Stagger, StaggerItem, useMotionSafe } from './motion/Reveal'
import { hoverLift, hoverIconPop, hoverTap } from '../lib/hover'

const icons = [Globe, Layout, Code2, Wrench, Share2, Video]

export default function Services() {
  const { lang, t } = useLanguage()
  const items = translations[lang].services.items
  const motionSafe = useMotionSafe()

  return (
    <section id="services" className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <AmbientBackground variant="alt" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('services.title')}</SectionHeading>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" stagger={0.1} delayChildren={0.06}>
          {items.map((item, i) => {
            const Icon = icons[i] || Globe
            const num = String(i + 1).padStart(2, '0')
            return (
              <StaggerItem
                key={i}
                as={motion.article}
                whileHover={motionSafe ? {} : hoverLift()}
                whileTap={motionSafe ? {} : hoverTap}
                className="glass-card glass-interactive hover-card-ring group relative cursor-default overflow-hidden rounded-2xl p-6 md:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-shine-edge opacity-0 transition-opacity duration-400 ease-out-expo group-hover:opacity-100"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -end-6 -top-6 h-28 w-28 rounded-full bg-brand-600/15 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative flex items-start justify-between gap-4">
                  <motion.div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand-600/15 bg-brand-600/10 text-brand-800 shadow-inner-light transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out-expo group-hover:border-brand-600/30 group-hover:bg-brand-600/18 group-hover:shadow-soft"
                    whileHover={motionSafe ? {} : hoverIconPop}
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
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
