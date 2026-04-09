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
  const { lang, setLang, t, dir } = useLanguage()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="border-t border-ink/10 bg-page/95"
      dir={dir}
    >
      {/* subtle top highlight — matches premium cards elsewhere */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-brand-600/20 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <motion.a
            href="#home"
            className="inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/demalogo/logo.png"
              alt="Dema Digital Solutions"
              className="h-20 w-auto object-contain sm:h-24 md:h-28"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/logo.svg'
              }}
            />
          </motion.a>

          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-ink-muted md:text-[0.9375rem]">
            {t('footer.tagline')}
          </p>

          <nav
            className="mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10"
            aria-label="Footer"
          >
            {navLinks.map(({ key, href }) => (
              <motion.a
                key={key}
                href={href}
                className="text-sm font-semibold text-ink-muted transition-colors hover:text-brand-800"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {t(`nav.${key}`)}
              </motion.a>
            ))}
          </nav>

          <div className="mt-9 flex justify-center">
            <div className="inline-flex items-center gap-0.5 rounded-xl border border-ink/10 bg-surface-card/90 p-1 shadow-soft">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
                    lang === code
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-ink-muted hover:bg-brand-600/10 hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-ink/10 pt-8 text-center text-sm text-ink-subtle">
          {t('footer.copyright')}
        </p>
      </div>
    </motion.footer>
  )
}
