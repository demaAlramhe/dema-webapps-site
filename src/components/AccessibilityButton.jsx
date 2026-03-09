import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, Type, Contrast } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Circular accessibility button for people with disabilities.
 * Provides quick access to accessibility-related options and clearly indicates
 * that the website supports accessibility needs.
 */
export default function AccessibilityButton() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    return () => { document.documentElement.style.fontSize = '' }
  }, [fontSize])

  const increaseFont = () => setFontSize((s) => Math.min(130, s + 10))
  const decreaseFont = () => setFontSize((s) => Math.max(90, s - 10))
  const resetFont = () => setFontSize(100)

  const toggleContrast = () => {
    setHighContrast((c) => !c)
    document.documentElement.classList.toggle('high-contrast')
  }

  return (
    <>
      <style>{`
        html.high-contrast body { background: #0a0a0a !important; color: #fff !important; }
        html.high-contrast a { text-decoration: underline; }
        html.high-contrast [class*="border-white"] { border-color: rgba(255,255,255,0.2) !important; }
      `}</style>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-2" dir="ltr">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-2 p-4 rounded-2xl bg-dark-700 border border-white/10 shadow-xl min-w-[200px]"
            >
              <p className="text-sm font-medium text-white mb-3">{t('a11y.description')}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/80 text-sm flex items-center gap-2">
                    <Type className="w-4 h-4" /> Text size
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={decreaseFont} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold" aria-label="Decrease text size">A−</button>
                    <button type="button" onClick={resetFont} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs" aria-label="Reset text size">100%</button>
                    <button type="button" onClick={increaseFont} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold" aria-label="Increase text size">A+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/80 text-sm flex items-center gap-2">
                    <Contrast className="w-4 h-4" /> High contrast
                  </span>
                  <button
                    type="button"
                    onClick={toggleContrast}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${highContrast ? 'bg-brand-600 text-white' : 'bg-white/10 text-white/80'}`}
                  >
                    {highContrast ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-dark-900"
          aria-label={t('a11y.label')}
          aria-expanded={open}
        >
          <Accessibility className="w-7 h-7" />
        </motion.button>
      </div>
    </>
  )
}
