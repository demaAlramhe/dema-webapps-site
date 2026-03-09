import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('dema-lang')
    if (saved && translations[saved]) return saved
    return 'he'
  })

  useEffect(() => {
    localStorage.setItem('dema-lang', lang)
    const dir = translations[lang].dir
    document.documentElement.lang = lang === 'he' ? 'he' : lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = dir
  }, [lang])

  const t = (keyPath) => {
    const keys = keyPath.split('.')
    let value = translations[lang]
    for (const key of keys) {
      value = value?.[key]
      if (value === undefined) return keyPath
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: translations[lang].dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
