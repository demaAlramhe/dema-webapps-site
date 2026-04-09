import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'services', href: '#services' },
  { key: 'projects', href: '#projects' },
  { key: 'about', href: '#about' },
  { key: 'contact', href: '#contact' },
]

const languages = [
  { code: 'he', label: 'עברית' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'EN' },
]

const navLinkClass =
  'relative text-sm font-medium text-ink-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-brand-600 after:transition-transform hover:after:scale-x-100'

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-page/75 shadow-soft backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between md:h-24">
          <motion.a
            href="#home"
            className="flex shrink-0 items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/demalogo/logo.png"
              alt="Dema Digital Solutions"
              className="h-[5rem] w-auto object-contain sm:h-[5.5rem] md:h-[6rem]"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/logo.svg'
              }}
            />
          </motion.a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {navLinks.map(({ key, href }) => (
              <motion.a key={key} href={href} className={navLinkClass} whileTap={{ scale: 0.98 }}>
                {t(`nav.${key}`)}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-0.5 rounded-xl border border-ink/10 bg-surface-card/90 p-1 shadow-inner sm:flex">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-all ${
                    lang === code
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-ink-muted hover:bg-brand-600/10 hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <motion.a
              href="#contact"
              className="hidden rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-700 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:inline-flex"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('nav.cta')}
            </motion.a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl p-2.5 text-ink-muted transition-colors hover:bg-surface-card hover:text-ink md:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-ink/10 bg-surface-alt/98 shadow-card backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-4 py-5">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-3 font-medium text-ink transition-colors hover:bg-surface-card"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
              <div className="flex flex-wrap gap-2 pt-3">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLang(code)
                      setMobileOpen(false)
                    }}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      lang === code
                        ? 'bg-brand-600 text-white'
                        : 'border border-ink/10 bg-surface-card text-ink-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block w-full rounded-xl bg-brand-600 py-3.5 text-center font-semibold text-white shadow-card hover:bg-brand-700"
              >
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
