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

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a href="#home" className="flex items-center gap-2 shrink-0" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <img
              src="/demalogo/logo.png"
              alt="Dema WebApps"
              className="h-24 sm:h-28 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/logo.svg'
              }}
            />
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ key, href }) => (
              <motion.a
                key={key}
                href={href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors relative"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t(`nav.${key}`)}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-white/5">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    lang === code ? 'bg-brand-600 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <motion.a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('nav.cta')}
            </motion.a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden border-t border-white/5 bg-dark-800/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-white/90 hover:text-white font-medium"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setMobileOpen(false) }}
                    className={`px-3 py-1.5 rounded-md text-sm ${lang === code ? 'bg-brand-600 text-white' : 'bg-white/10 text-white/80'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 rounded-lg bg-brand-600 text-white font-medium"
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
