import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accessibility,
  Type,
  Contrast,
  Pause,
  AlignJustify,
  Link2,
  Palette,
  Focus,
  RotateCcw,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const A11Y_CLASSES = [
  'high-contrast',
  'a11y-reduce-motion',
  'a11y-spacing',
  'a11y-underline-links',
  'a11y-grayscale',
  'a11y-strong-focus',
]

/**
 * Circular accessibility button for people with disabilities.
 * Extended panel: text size, contrast, motion, spacing, links, grayscale, focus.
 */
export default function AccessibilityButton() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [readableSpacing, setReadableSpacing] = useState(false)
  const [underlineLinks, setUnderlineLinks] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [strongFocus, setStrongFocus] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    return () => {
      document.documentElement.style.fontSize = ''
    }
  }, [fontSize])

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-reduce-motion', reduceMotion)
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-spacing', readableSpacing)
  }, [readableSpacing])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-underline-links', underlineLinks)
  }, [underlineLinks])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-grayscale', grayscale)
  }, [grayscale])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-strong-focus', strongFocus)
  }, [strongFocus])

  useEffect(() => {
    return () => {
      document.documentElement.style.fontSize = ''
      A11Y_CLASSES.forEach((c) => document.documentElement.classList.remove(c))
    }
  }, [])

  const increaseFont = () => setFontSize((s) => Math.min(130, s + 10))
  const decreaseFont = () => setFontSize((s) => Math.max(90, s - 10))
  const resetFont = () => setFontSize(100)

  const resetAll = useCallback(() => {
    setFontSize(100)
    setHighContrast(false)
    setReduceMotion(false)
    setReadableSpacing(false)
    setUnderlineLinks(false)
    setGrayscale(false)
    setStrongFocus(false)
  }, [])

  const toggleBtn = (active) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium min-w-[3.25rem] text-center transition-colors ${
      active ? 'bg-brand-600 text-white' : 'bg-brand-600/15 text-ink hover:bg-brand-600/25'
    }`

  return (
    <>
      <style>{`
        html.high-contrast body { background: #2c2620 !important; color: #ebe8e3 !important; }
        html.high-contrast a { text-decoration: underline; }
        html.high-contrast [class*="border-ink"] { border-color: rgba(255,255,255,0.25) !important; }

        html.a11y-reduce-motion *,
        html.a11y-reduce-motion *::before,
        html.a11y-reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        html.a11y-spacing body {
          line-height: 1.75 !important;
        }
        html.a11y-spacing body p,
        html.a11y-spacing body li,
        html.a11y-spacing body h1,
        html.a11y-spacing body h2,
        html.a11y-spacing body h3 {
          line-height: 1.75 !important;
        }
        html.a11y-spacing body p {
          margin-bottom: 0.85em !important;
        }

        html.a11y-underline-links a:not([class*="bg-brand-600"]) {
          text-decoration: underline !important;
          text-underline-offset: 3px;
        }
        html.a11y-underline-links a.bg-brand-600,
        html.a11y-underline-links button {
          text-decoration: none !important;
        }

        html.a11y-grayscale {
          filter: grayscale(1);
        }

        html.a11y-strong-focus *:focus-visible {
          outline: 3px solid #675d54 !important;
          outline-offset: 4px !important;
        }
      `}</style>
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-2" dir="ltr">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              className="mb-2 max-h-[min(85vh,32rem)] w-[min(calc(100vw-2rem),20rem)] overflow-y-auto overscroll-contain rounded-3xl border border-ink/12 bg-surface-card/98 p-5 shadow-2xl shadow-brand-900/10 backdrop-blur-md"
            >
              <p className="text-sm font-medium text-ink mb-3 border-b border-ink/10 pb-2">
                {t('a11y.description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-ink-muted text-sm flex items-center gap-2">
                    <Type className="w-4 h-4 shrink-0" /> {t('a11y.textSize')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={decreaseFont} className="w-8 h-8 rounded-lg bg-brand-600/15 hover:bg-brand-600/25 text-ink text-sm font-bold" aria-label="Decrease text size">
                      A−
                    </button>
                    <button type="button" onClick={resetFont} className="w-8 h-8 rounded-lg bg-brand-600/15 hover:bg-brand-600/25 text-ink text-xs" aria-label="Reset text size">
                      100%
                    </button>
                    <button type="button" onClick={increaseFont} className="w-8 h-8 rounded-lg bg-brand-600/15 hover:bg-brand-600/25 text-ink text-sm font-bold" aria-label="Increase text size">
                      A+
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <Contrast className="w-4 h-4 shrink-0" /> {t('a11y.highContrast')}
                  </span>
                  <button type="button" onClick={() => setHighContrast((v) => !v)} className={toggleBtn(highContrast)}>
                    {highContrast ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <Pause className="w-4 h-4 shrink-0" /> {t('a11y.reduceMotion')}
                  </span>
                  <button type="button" onClick={() => setReduceMotion((v) => !v)} className={toggleBtn(reduceMotion)}>
                    {reduceMotion ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <AlignJustify className="w-4 h-4 shrink-0" /> {t('a11y.readableSpacing')}
                  </span>
                  <button type="button" onClick={() => setReadableSpacing((v) => !v)} className={toggleBtn(readableSpacing)}>
                    {readableSpacing ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <Link2 className="w-4 h-4 shrink-0" /> {t('a11y.underlineLinks')}
                  </span>
                  <button type="button" onClick={() => setUnderlineLinks((v) => !v)} className={toggleBtn(underlineLinks)}>
                    {underlineLinks ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <Palette className="w-4 h-4 shrink-0" /> {t('a11y.grayscale')}
                  </span>
                  <button type="button" onClick={() => setGrayscale((v) => !v)} className={toggleBtn(grayscale)}>
                    {grayscale ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted text-sm flex items-center gap-2 min-w-0">
                    <Focus className="w-4 h-4 shrink-0" /> {t('a11y.strongFocus')}
                  </span>
                  <button type="button" onClick={() => setStrongFocus((v) => !v)} className={toggleBtn(strongFocus)}>
                    {strongFocus ? t('a11y.on') : t('a11y.off')}
                  </button>
                </div>

                <div className="pt-2 border-t border-ink/10">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-600/15 hover:bg-brand-600/25 text-ink text-sm font-medium transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('a11y.resetAll')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-card transition-all hover:bg-brand-700 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 focus:ring-offset-page"
          aria-label={t('a11y.label')}
          aria-expanded={open}
        >
          <Accessibility className="w-7 h-7" />
        </motion.button>
      </div>
    </>
  )
}
