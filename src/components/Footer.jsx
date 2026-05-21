import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import AmbientBackground from './AmbientBackground'
import { Reveal, useMotionSafe } from './motion/Reveal'
import { hoverTap } from '../lib/hover'

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
  const motionSafe = useMotionSafe()

  return (
    <Reveal
      as={motion.footer}
      variant="fade"
      className="relative overflow-hidden border-t border-ink/8 bg-page/98 backdrop-blur-sm"
      dir={dir}
    >
      <AmbientBackground variant="page" intensity="soft" />

      {/* Top accent line + soft glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1]" aria-hidden>
        <div className="footer-glow-top h-px w-full" />
        <div className="mx-auto h-10 max-w-3xl bg-gradient-to-b from-brand-600/10 via-brand-600/4 to-transparent blur-sm" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2" aria-hidden>
        <div className="mx-auto h-32 w-[min(100%,22rem)] rounded-full bg-brand-600/[0.06] blur-3xl sm:h-36 sm:w-[26rem]" />
      </div>

      <div className="relative z-[1] mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-9 md:py-10">
        <div className="flex flex-col items-center text-center">
          <motion.a
            href="#home"
            className="inline-block shrink-0"
            whileHover={motionSafe ? {} : { scale: 1.02 }}
            whileTap={motionSafe ? {} : hoverTap}
          >
            <img
              src="/demalogo/logo.png"
              alt="Dema Digital Solutions"
              className="h-12 w-auto object-contain sm:h-14 md:h-[3.75rem]"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/logo.svg'
              }}
            />
          </motion.a>

          <p className="mt-2.5 max-w-sm text-pretty text-xs leading-snug text-ink-muted sm:max-w-md sm:text-sm sm:leading-relaxed">
            {t('footer.tagline')}
          </p>

          <nav
            className="mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7"
            aria-label="Footer"
          >
            {navLinks.map(({ key, href }) => (
              <motion.a
                key={key}
                href={href}
                className="footer-link"
                whileHover={motionSafe ? {} : { y: -1 }}
                transition={{ duration: 0.22 }}
              >
                {t(`nav.${key}`)}
              </motion.a>
            ))}
          </nav>

          <div className="mt-4">
            <div className="glass-pill inline-flex items-center gap-0.5 rounded-xl p-0.5">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-300 ease-out-expo sm:px-3.5 sm:text-sm ${
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

        <p className="mt-6 border-t border-ink/10 pt-4 text-center text-xs text-ink-subtle sm:mt-7 sm:pt-5 sm:text-sm">
          {t('footer.copyright')}
        </p>
      </div>
    </Reveal>
  )
}
