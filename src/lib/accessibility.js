/**
 * Accessibility preferences: persistence + DOM application (vanilla JS, no React).
 */

export const A11Y_STORAGE_KEY = 'dema-a11y-settings'

const SCHEMA_VERSION = 1

/** @typedef {'default' | 'light' | 'dark'} A11yTheme */
/** @typedef {'default' | 'start' | 'center' | 'end'} A11yTextAlign */

/**
 * @typedef {object} A11yState
 * @property {number} fontSize
 * @property {A11yTheme} theme
 * @property {boolean} highContrast
 * @property {boolean} grayscale
 * @property {boolean} reduceMotion
 * @property {boolean} readableSpacing
 * @property {boolean} readableFont
 * @property {boolean} highlightLinks
 * @property {boolean} highlightHeadings
 * @property {boolean} underlineLinks
 * @property {boolean} strongFocus
 * @property {boolean} largeCursor
 * @property {A11yTextAlign} textAlign
 */

/** CSS classes managed by this module (toggle on <html>) */
export const A11Y_CLASS_NAMES = [
  'high-contrast',
  'a11y-light',
  'a11y-dark',
  'a11y-reduce-motion',
  'a11y-spacing',
  'a11y-underline-links',
  'a11y-grayscale',
  'a11y-strong-focus',
  'a11y-highlight-links',
  'a11y-highlight-headings',
  'a11y-readable-font',
  'a11y-large-cursor',
  'a11y-text-align-start',
  'a11y-text-align-center',
  'a11y-text-align-end',
]

/** @returns {A11yState} */
export function getDefaultA11yState() {
  return {
    fontSize: 100,
    theme: 'default',
    highContrast: false,
    grayscale: false,
    reduceMotion: false,
    readableSpacing: false,
    readableFont: false,
    highlightLinks: false,
    highlightHeadings: false,
    underlineLinks: false,
    strongFocus: false,
    largeCursor: false,
    textAlign: 'default',
  }
}

/** @param {Partial<A11yState>} raw */
function normalizeState(raw) {
  const d = getDefaultA11yState()
  if (!raw || typeof raw !== 'object') return d

  let fontSize = Number(raw.fontSize)
  if (!Number.isFinite(fontSize)) fontSize = d.fontSize
  fontSize = Math.round(Math.min(150, Math.max(80, fontSize)))

  const theme = ['default', 'light', 'dark'].includes(raw.theme) ? raw.theme : d.theme

  let textAlign = raw.textAlign
  if (!['default', 'start', 'center', 'end'].includes(textAlign)) textAlign = d.textAlign

  return {
    fontSize,
    theme,
    highContrast: Boolean(raw.highContrast),
    grayscale: Boolean(raw.grayscale),
    reduceMotion: Boolean(raw.reduceMotion),
    readableSpacing: Boolean(raw.readableSpacing),
    readableFont: Boolean(raw.readableFont),
    highlightLinks: Boolean(raw.highlightLinks),
    highlightHeadings: Boolean(raw.highlightHeadings),
    underlineLinks: Boolean(raw.underlineLinks),
    strongFocus: Boolean(raw.strongFocus),
    largeCursor: Boolean(raw.largeCursor),
    textAlign,
  }
}

/** @returns {A11yState} */
export function loadA11ySettings() {
  try {
    const stored = localStorage.getItem(A11Y_STORAGE_KEY)
    if (!stored) return getDefaultA11yState()
    const parsed = JSON.parse(stored)
    if (parsed && typeof parsed === 'object' && parsed.v === SCHEMA_VERSION && parsed.state) {
      return normalizeState(parsed.state)
    }
    if (parsed && typeof parsed === 'object' && 'fontSize' in parsed) {
      return normalizeState(parsed)
    }
  } catch {
    /* ignore */
  }
  return getDefaultA11yState()
}

/** @param {A11yState} state */
export function saveA11ySettings(state) {
  try {
    const payload = JSON.stringify({ v: SCHEMA_VERSION, state: normalizeState(state) })
    localStorage.setItem(A11Y_STORAGE_KEY, payload)
  } catch {
    /* ignore */
  }
}

/** Remove toggle classes from <html> (not font-size). */
export function clearA11yClassesFromDocument() {
  const root = document.documentElement
  A11Y_CLASS_NAMES.forEach((c) => root.classList.remove(c))
}

/**
 * Apply full state to the document.
 * @param {A11yState} state
 */
export function applyA11ySettings(state) {
  const s = normalizeState(state)
  const root = document.documentElement

  root.style.fontSize = `${s.fontSize}%`

  clearA11yClassesFromDocument()

  if (s.highContrast) root.classList.add('high-contrast')
  if (s.theme === 'light') root.classList.add('a11y-light')
  if (s.theme === 'dark') root.classList.add('a11y-dark')
  if (s.reduceMotion) root.classList.add('a11y-reduce-motion')
  if (s.readableSpacing) root.classList.add('a11y-spacing')
  if (s.underlineLinks) root.classList.add('a11y-underline-links')
  if (s.grayscale) root.classList.add('a11y-grayscale')
  if (s.strongFocus) root.classList.add('a11y-strong-focus')
  if (s.highlightLinks) root.classList.add('a11y-highlight-links')
  if (s.highlightHeadings) root.classList.add('a11y-highlight-headings')
  if (s.readableFont) root.classList.add('a11y-readable-font')
  if (s.largeCursor) root.classList.add('a11y-large-cursor')

  if (s.textAlign === 'start') root.classList.add('a11y-text-align-start')
  else if (s.textAlign === 'center') root.classList.add('a11y-text-align-center')
  else if (s.textAlign === 'end') root.classList.add('a11y-text-align-end')
}

/** Load from storage and apply (call early in main). */
export function hydrateA11yFromStorage() {
  applyA11ySettings(loadA11ySettings())
}

/** @param {A11yState} state */
export function persistAndApply(state) {
  const next = normalizeState(state)
  saveA11ySettings(next)
  applyA11ySettings(next)
  return next
}
