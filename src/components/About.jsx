import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeading from './SectionHeading'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden bg-page py-28 md:py-36">
      <div
        className="pointer-events-none absolute -right-[20%] top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-brand-600/8 blur-[100px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('about.title')}</SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="absolute -start-1 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-brand-600/50 via-brand-600/25 to-transparent md:block" aria-hidden />
          <div className="surface-premium relative rounded-2xl border border-ink/10 p-8 shadow-card md:p-12 md:ps-14">
            <Sparkles
              className="absolute end-6 top-6 h-6 w-6 text-brand-600/35"
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="text-pretty text-lg leading-relaxed text-ink-muted md:text-xl md:leading-relaxed">
              {t('about.text')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
