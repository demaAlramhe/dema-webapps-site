import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ScrollProgress() {
  const { dir } = useLanguage()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const h = el.scrollHeight - el.clientHeight
      setProgress(h > 0 ? (el.scrollTop / h) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const origin = dir === 'rtl' ? 'right' : 'left'

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      aria-hidden
    >
      <div className="h-full w-full bg-ink/5">
        <div
          className="h-full w-full bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 opacity-95 shadow-[0_1px_8px_rgba(103,93,84,0.35)]"
          style={{
            transform: `scaleX(${progress / 100})`,
            transformOrigin: origin,
          }}
        />
      </div>
    </div>
  )
}
