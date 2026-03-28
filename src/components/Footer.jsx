import { motion } from 'framer-motion'
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

export default function Footer() {
  const { lang, setLang, t } = useLanguage()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="py-12 md:py-16 bg-page border-t border-ink/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <motion.a href="#home" className="inline-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <img
                src="/demalogo/logo.png"
                alt="Dema Digital Solutions"
                className="h-20 sm:h-24 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/logo.svg'
                }}
              />
            </motion.a>
            <p className="mt-3 text-ink-subtle text-sm max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {navLinks.map(({ key, href }) => (
              <motion.a key={key} href={href} className="text-sm text-ink-muted hover:text-brand-700 transition-colors" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                {t(`nav.${key}`)}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1.5 rounded-md text-sm ${lang === code ? 'bg-brand-600 text-white' : 'text-ink-muted hover:text-ink border border-ink/10'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-10 pt-8 border-t border-ink/10 text-ink-subtle text-sm text-center md:text-start">
          {t('footer.copyright')}
        </p>
      </div>
    </motion.footer>
  )
}
