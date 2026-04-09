import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function BackToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={goTop}
          className="fixed bottom-6 end-6 z-[48] flex h-12 w-12 items-center justify-center rounded-full border border-ink/12 bg-surface-card/95 text-ink shadow-card backdrop-blur-sm transition-colors hover:border-brand-600/40 hover:bg-surface-elevated hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          aria-label={t('nav.backToTop')}
          title={t('nav.backToTop')}
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.25} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
