import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, MessageCircle, Phone, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeading from './SectionHeading'
import AmbientBackground from './AmbientBackground'
import { Reveal, SlideReveal, Stagger, StaggerItem, useMotionSafe } from './motion/Reveal'
import { EASE_OUT_EXPO } from '../lib/motion'
import { hoverLiftSubtle, hoverButtonPrimary, hoverTap } from '../lib/hover'

const PHONE = '0543223106'
const EMAIL = 'demadigital.business@gmail.com'
/** קישור מלא לפרופיל (כולל פרמטרים מ-QR של אינסטגרם) */
const INSTAGRAM =
  'https://www.instagram.com/dema.digital.solutions?igsh=MW83cDU0ejZ0NjF2Mg%3D%3D&utm_source=qr'
const WHATSAPP_URL = 'https://wa.me/972543223106'

/** Formspree — טופס יצירת קשר (פרודקשן/Vercel) */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeepwdbg'

const inputClass =
  'glass-input w-full rounded-xl px-4 py-3.5 text-ink transition-all placeholder:text-ink-subtle/55 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20'

export default function Contact() {
  const { t, lang } = useLanguage()
  const phoneFieldId = useId()
  /** Align typed + placeholder text: RTL for Hebrew/Arabic, LTR for English */
  const isFormRtl = lang === 'he' || lang === 'ar'
  const fieldDir = isFormRtl ? 'rtl' : 'ltr'
  const fieldClass = `${inputClass} ${isFormRtl ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`
  const serviceOptions = Array.isArray(t('contact.serviceOptions'))
    ? t('contact.serviceOptions')
    : []
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const motionSafe = useMotionSafe()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') || ''
    const business = data.get('business') || ''
    const email = data.get('email') || ''
    const phone = data.get('phone') || ''
    const service = data.get('service') || ''
    const message = data.get('message') || ''

    setSending(true)
    setSuccess(false)
    setSubmitError(false)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          business,
          email,
          phone,
          service,
          message,
          _replyto: email,
          _subject: 'פנייה חדשה מהאתר — Dema Digital Solutions',
        }),
      })

      if (res.ok) {
        setSuccess(true)
        form.reset()
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    } finally {
      setSending(false)
    }
  }

  const cardClass =
    'glass-card glass-interactive hover-card-ring group flex items-center gap-4 rounded-2xl p-4'

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <AmbientBackground variant="alt" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="heading">
          <SectionHeading>{t('contact.title')}</SectionHeading>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <SlideReveal from="start" className="lg:col-span-2">
            <Stagger className="space-y-4" stagger={0.09} delayChildren={0.05}>
            <StaggerItem
              as={motion.a}
              href={`mailto:${EMAIL}`}
              className={cardClass}
              whileHover={motionSafe ? {} : hoverLiftSubtle}
              whileTap={motionSafe ? {} : hoverTap}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/15 bg-brand-600/12 text-brand-800 shadow-inner-light transition-[transform,background-color,border-color] duration-300 ease-out-expo group-hover:scale-105 group-hover:border-brand-600/28 group-hover:bg-brand-600/18">
                <Mail className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  {t('contact.email')}
                </span>
                <p className="mt-0.5 truncate font-medium text-ink">{EMAIL}</p>
              </div>
            </StaggerItem>
            <StaggerItem
              as={motion.a}
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} cursor-pointer`}
              whileHover={motionSafe ? {} : hoverLiftSubtle}
              whileTap={motionSafe ? {} : hoverTap}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/15 bg-brand-600/12 text-brand-800 shadow-inner-light">
                <Instagram className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  {t('contact.instagram')}
                </span>
                <p className="mt-0.5 font-medium text-ink" dir="ltr">
                  dema.digital.solutions
                </p>
              </div>
            </StaggerItem>
            <StaggerItem
              as={motion.a}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
              whileHover={motionSafe ? {} : hoverLiftSubtle}
              whileTap={motionSafe ? {} : hoverTap}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/15 bg-brand-600/12 text-brand-800 shadow-inner-light">
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  {t('contact.whatsapp')}
                </span>
                <p className="mt-0.5 font-medium text-ink">{PHONE}</p>
              </div>
            </StaggerItem>
            <StaggerItem
              as={motion.a}
              href={`tel:+972543223106`}
              className={cardClass}
              whileHover={motionSafe ? {} : hoverLiftSubtle}
              whileTap={motionSafe ? {} : hoverTap}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/15 bg-brand-600/12 text-brand-800 shadow-inner-light">
                <Phone className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  {t('contact.phone')}
                </span>
                <p className="mt-0.5 font-medium text-ink">{PHONE}</p>
              </div>
            </StaggerItem>
            </Stagger>
          </SlideReveal>

          <SlideReveal from="end" className="relative lg:col-span-3">
            <div
              className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-brand-600/30 via-ink/10 to-brand-600/15 opacity-90"
              aria-hidden
            />
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-48px', amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="glass-panel relative rounded-[1.25rem] p-6 md:p-10"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2 sm:col-start-1">
                  <span className="mb-2 block text-sm font-semibold text-ink-muted">
                    {t('contact.fields.name')}
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    dir={fieldDir}
                    className={fieldClass}
                    placeholder={t('contact.fields.name')}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-ink-muted">
                    {t('contact.fields.business')}
                  </span>
                  <input
                    type="text"
                    name="business"
                    autoComplete="organization"
                    dir={fieldDir}
                    className={fieldClass}
                    placeholder={t('contact.fields.business')}
                  />
                </label>
                <label>
                  <span className="mb-2 block text-sm font-semibold text-ink-muted">
                    {t('contact.fields.email')}
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    dir={fieldDir}
                    className={fieldClass}
                    placeholder={t('contact.fields.email')}
                  />
                </label>
                {/* tel inside <label> can break RTL label alignment; use htmlFor + id */}
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor={phoneFieldId} className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink-muted">
                      {t('contact.fields.phone')}
                    </span>
                  </label>
                  <input
                    id={phoneFieldId}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    dir={fieldDir}
                    className={fieldClass}
                    placeholder={t('contact.fields.phone')}
                  />
                </div>
                <label className="sm:col-span-2 sm:col-start-1">
                  <span className="mb-2 block text-sm font-semibold text-ink-muted">
                    {t('contact.fields.service')}
                  </span>
                  <select key={lang} name="service" dir={fieldDir} className={fieldClass}>
                    <option value="">—</option>
                    {serviceOptions.map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-2 sm:col-start-1">
                  <span className="mb-2 block text-sm font-semibold text-ink-muted">
                    {t('contact.fields.message')}
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    dir={fieldDir}
                    className={`${fieldClass} resize-none`}
                    placeholder={t('contact.fields.message')}
                  />
                </label>
              </div>
              {(success || submitError) && (
                <div className="mt-5 space-y-2" role="status" aria-live="polite">
                  {success && (
                    <p className="rounded-xl border border-brand-600/25 bg-brand-600/10 px-4 py-3 text-sm font-medium text-brand-900">
                      ההודעה נשלחה בהצלחה. נחזור אליך בהקדם.
                    </p>
                  )}
                  {submitError && (
                    <p className="rounded-xl border border-red-800/20 bg-red-900/5 px-4 py-3 text-sm font-medium text-red-900">
                      אירעה שגיאה בשליחת הטופס. נסה שוב.
                    </p>
                  )}
                </div>
              )}
              <motion.button
                type="submit"
                disabled={sending}
                className="btn-premium-primary mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-card disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
                whileHover={!sending && !motionSafe ? hoverButtonPrimary : {}}
                whileTap={!sending && !motionSafe ? hoverTap : {}}
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                {sending ? '...' : t('contact.submit')}
              </motion.button>
            </motion.form>
          </SlideReveal>
        </div>
      </div>
    </section>
  )
}
