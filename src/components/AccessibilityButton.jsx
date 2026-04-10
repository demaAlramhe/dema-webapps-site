import { useState, useEffect, useRef, useId, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accessibility,
  Type,
  Minus,
  Plus,
  Contrast,
  Pause,
  AlignJustify,
  Link2,
  Highlighter,
  Palette,
  Focus,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
  BookOpen,
  Heading2,
  MousePointer2,
  LayoutTemplate,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import {
  loadA11ySettings,
  persistAndApply,
  getDefaultA11yState,
} from '../lib/accessibility.js'

function SectionLabel({ children }) {
  return (
    <p className="mb-2.5 mt-5 first:mt-0 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
      {children}
    </p>
  )
}

function A11ySwitch({ checked, onToggle, disabled, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onToggle}
      className={[
        'inline-flex h-7 w-12 shrink-0 items-center rounded-full px-[3px] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card',
        checked ? 'justify-end bg-brand-600' : 'justify-start bg-ink/15',
        disabled ? 'pointer-events-none opacity-50' : '',
      ].join(' ')}
    >
      <span className="pointer-events-none h-5 w-5 rounded-full bg-white shadow-md" aria-hidden />
    </button>
  )
}

/** Segmented control with icons + short labels */
function IconSegmented({ value, options, onChange }) {
  return (
    <div
      className="grid gap-1 rounded-2xl bg-brand-600/[0.08] p-1 ring-1 ring-brand-600/10"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role="group"
    >
      {options.map((opt) => {
        const active = value === opt.id
        const Icon = opt.icon
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            title={opt.label}
            aria-label={opt.label}
            aria-pressed={active}
            className={[
              'flex min-h-[2.5rem] flex-col items-center justify-center gap-0.5 rounded-xl px-1.5 py-2 text-[0.65rem] font-semibold transition-all duration-200',
              active
                ? 'bg-white text-brand-900 shadow-sm ring-1 ring-black/5'
                : 'text-ink-muted hover:bg-white/60 hover:text-ink',
            ].join(' ')}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="max-w-full truncate leading-tight">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-ink">
        <Icon className="h-4 w-4 shrink-0 text-brand-700" aria-hidden />
        <span className="leading-snug">{label}</span>
      </span>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

export default function AccessibilityButton() {
  const { t, dir } = useLanguage()
  const titleId = useId()
  const panelRef = useRef(null)
  const fabRef = useRef(null)
  const closeRef = useRef(null)

  const [open, setOpen] = useState(false)
  const [s, setS] = useState(() => loadA11ySettings())

  const patch = useCallback((partial) => {
    setS((prev) => persistAndApply({ ...prev, ...partial }))
  }, [])

  const resetAll = useCallback(() => {
    setS(persistAndApply(getDefaultA11yState()))
  }, [])

  const reduceMotion = s.reduceMotion
  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring', damping: 32, stiffness: 380, mass: 0.85 }

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const focusables = panel?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const list = focusables?.length ? Array.from(focusables) : []
    const first = list[0]
    const last = list[list.length - 1]
    requestAnimationFrame(() => closeRef.current?.focus())

    const onKeyDown = (e) => {
      if (e.key !== 'Tab' || list.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    panel?.addEventListener('keydown', onKeyDown)

    return () => panel?.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onDoc)
    return () => document.removeEventListener('keydown', onDoc)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const closePanel = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => fabRef.current?.focus())
  }, [])

  const themeOptions = [
    { id: 'default', icon: Monitor, label: t('a11y.themeDefault') },
    { id: 'light', icon: Sun, label: t('a11y.themeLight') },
    { id: 'dark', icon: Moon, label: t('a11y.themeDark') },
  ]

  const alignOptions = [
    { id: 'default', icon: LayoutTemplate, label: t('a11y.alignDefault') },
    { id: 'start', icon: AlignLeft, label: t('a11y.alignStart') },
    { id: 'center', icon: AlignCenter, label: t('a11y.alignCenter') },
    { id: 'end', icon: AlignRight, label: t('a11y.alignEnd') },
  ]

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="a11y-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-0 z-[45] bg-stone-900/25 backdrop-blur-[3px]"
            aria-hidden
            onClick={closePanel}
          />
        )}
      </AnimatePresence>

      {/* dir=ltr anchors flex children to the physical left; panel sets its own dir for text */}
      <div
        dir="ltr"
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-[max(1.25rem,env(safe-area-inset-left,0px))] z-50 flex w-[min(calc(100vw-2.5rem),22rem)] flex-col gap-3 sm:bottom-6 sm:left-6"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              key="a11y-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              dir={dir}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={panelTransition}
              className="max-h-[min(78vh,34rem)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[1.35rem] border border-ink/[0.08] bg-surface-card/95 shadow-[0_24px_80px_-20px_rgba(28,25,23,0.25),0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-black/[0.04] backdrop-blur-xl"
            >
              <div className="sticky top-0 z-[1] flex items-start justify-between gap-3 border-b border-ink/[0.06] bg-gradient-to-b from-white/50 to-transparent px-4 pb-3 pt-4 backdrop-blur-md">
                <div className="min-w-0">
                  <p id={titleId} className="text-base font-semibold tracking-tight text-ink">
                    {t('a11y.panelTitle')}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{t('a11y.description')}</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closePanel}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-white/80 text-ink shadow-sm transition hover:border-brand-600/25 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  aria-label={t('a11y.close')}
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="space-y-1 px-4 pb-4 pt-1">
                <SectionLabel>{t('a11y.sectionTypography')}</SectionLabel>

                <div className="rounded-2xl border border-ink/[0.06] bg-white/40 px-3 py-2 ring-1 ring-black/[0.02]">
                  <Row icon={Type} label={t('a11y.textSize')}>
                    <div className="flex items-center gap-1 rounded-xl bg-brand-600/10 p-1 ring-1 ring-brand-600/10">
                      <button
                        type="button"
                        onClick={() => patch({ fontSize: Math.max(80, s.fontSize - 10) })}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink transition hover:bg-brand-600/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        aria-label={t('a11y.decreaseFont')}
                      >
                        <Minus className="h-4 w-4" aria-hidden />
                      </button>
                      <span className="min-w-[2.75rem] text-center text-xs font-bold tabular-nums text-ink">
                        {s.fontSize}%
                      </span>
                      <button
                        type="button"
                        onClick={() => patch({ fontSize: Math.min(150, s.fontSize + 10) })}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink transition hover:bg-brand-600/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        aria-label={t('a11y.increaseFont')}
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => patch({ fontSize: 100 })}
                        className="rounded-lg px-2 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-800 transition hover:bg-brand-600/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                        aria-label={t('a11y.resetFont')}
                      >
                        100%
                      </button>
                    </div>
                  </Row>
                </div>

                <Row icon={BookOpen} label={t('a11y.readableFont')}>
                  <A11ySwitch
                    checked={s.readableFont}
                    onToggle={() => patch({ readableFont: !s.readableFont })}
                    ariaLabel={t('a11y.readableFont')}
                  />
                </Row>

                <SectionLabel>{t('a11y.sectionDisplay')}</SectionLabel>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-ink-muted">{t('a11y.theme')}</p>
                  <IconSegmented value={s.theme} options={themeOptions} onChange={(id) => patch({ theme: id })} />
                </div>

                <Row icon={Contrast} label={t('a11y.highContrast')}>
                  <A11ySwitch
                    checked={s.highContrast}
                    onToggle={() => patch({ highContrast: !s.highContrast })}
                    ariaLabel={t('a11y.highContrast')}
                  />
                </Row>

                <Row icon={Palette} label={t('a11y.grayscale')}>
                  <A11ySwitch
                    checked={s.grayscale}
                    onToggle={() => patch({ grayscale: !s.grayscale })}
                    ariaLabel={t('a11y.grayscale')}
                  />
                </Row>

                <Row icon={Highlighter} label={t('a11y.highlightLinks')}>
                  <A11ySwitch
                    checked={s.highlightLinks}
                    onToggle={() => patch({ highlightLinks: !s.highlightLinks })}
                    ariaLabel={t('a11y.highlightLinks')}
                  />
                </Row>

                <Row icon={Heading2} label={t('a11y.highlightHeadings')}>
                  <A11ySwitch
                    checked={s.highlightHeadings}
                    onToggle={() => patch({ highlightHeadings: !s.highlightHeadings })}
                    ariaLabel={t('a11y.highlightHeadings')}
                  />
                </Row>

                <Row icon={Link2} label={t('a11y.underlineLinks')}>
                  <A11ySwitch
                    checked={s.underlineLinks}
                    onToggle={() => patch({ underlineLinks: !s.underlineLinks })}
                    ariaLabel={t('a11y.underlineLinks')}
                  />
                </Row>

                <SectionLabel>{t('a11y.sectionMotion')}</SectionLabel>

                <Row icon={Pause} label={t('a11y.reduceMotion')}>
                  <A11ySwitch
                    checked={s.reduceMotion}
                    onToggle={() => patch({ reduceMotion: !s.reduceMotion })}
                    ariaLabel={t('a11y.reduceMotion')}
                  />
                </Row>

                <Row icon={MousePointer2} label={t('a11y.largeCursor')}>
                  <A11ySwitch
                    checked={s.largeCursor}
                    onToggle={() => patch({ largeCursor: !s.largeCursor })}
                    ariaLabel={t('a11y.largeCursor')}
                  />
                </Row>

                <Row icon={Focus} label={t('a11y.strongFocus')}>
                  <A11ySwitch
                    checked={s.strongFocus}
                    onToggle={() => patch({ strongFocus: !s.strongFocus })}
                    ariaLabel={t('a11y.strongFocus')}
                  />
                </Row>

                <SectionLabel>{t('a11y.sectionContent')}</SectionLabel>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-ink-muted">{t('a11y.textAlign')}</p>
                  <IconSegmented
                    value={s.textAlign}
                    options={alignOptions}
                    onChange={(id) => patch({ textAlign: id })}
                  />
                </div>

                <Row icon={AlignJustify} label={t('a11y.readableSpacing')}>
                  <A11ySwitch
                    checked={s.readableSpacing}
                    onToggle={() => patch({ readableSpacing: !s.readableSpacing })}
                    ariaLabel={t('a11y.readableSpacing')}
                  />
                </Row>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/10 bg-brand-600/10 py-3 text-sm font-semibold text-ink transition hover:bg-brand-600/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    {t('a11y.resetAll')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          ref={fabRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          whileTap={reduceMotion ? {} : { scale: 0.96 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 28 }}
          className="flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-[0_12px_40px_-8px_rgba(103,93,84,0.55),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition-[box-shadow] hover:shadow-[0_16px_48px_-8px_rgba(103,93,84,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          aria-label={t('a11y.label')}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Accessibility className="h-7 w-7" aria-hidden />
        </motion.button>
      </div>
    </>
  )
}
