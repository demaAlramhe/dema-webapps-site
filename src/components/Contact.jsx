import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, MessageCircle, Phone, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeading from './SectionHeading'

const PHONE = '0543223106'
const EMAIL = 'demadigital.business@gmail.com'
/** קישור מלא לפרופיל (כולל פרמטרים מ-QR של אינסטגרם) */
const INSTAGRAM =
  'https://www.instagram.com/dema.digital.solutions?igsh=MW83cDU0ejZ0NjF2Mg%3D%3D&utm_source=qr'
const WHATSAPP_URL = 'https://wa.me/972543223106'

/** Formspree — טופס יצירת קשר (פרודקשן/Vercel) */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeepwdbg'

const inputClass =
  'w-full rounded-xl border border-ink/12 bg-page/90 px-4 py-3.5 text-ink shadow-inner transition-all placeholder:text-ink-subtle/55 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20'

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
    'group flex items-center gap-4 rounded-2xl border border-ink/10 bg-surface-card/90 p-4 shadow-card transition-all duration-300 hover:border-brand-600/30 hover:shadow-card-hover'

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-alt py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-warm opacity-40"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>{t('contact.title')}</SectionHeading>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 lg:col-span-2"
          >
            <motion.a
              href={`mailto:${EMAIL}`}
              className={cardClass}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-600/15 bg-brand-600/12 text-brand-800 shadow-inner-light transition-colors group-hover:bg-brand-600/18">
                <Mail className="h-5 w-5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  {t('contact.email')}
                </span>
                <p className="mt-0.5 truncate font-medium text-ink">{EMAIL}</p>
              </div>
            </motion.a>
            <motion.a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} cursor-pointer`}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
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
            </motion.a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
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
            </motion.a>
            <motion.a
              href={`tel:+972543223106`}
              className={cardClass}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.99 }}
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
            </motion.a>
          </motion.div>

          <div className="relative lg:col-span-3">
            <div
              className="absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-brand-600/30 via-ink/10 to-brand-600/15 opacity-90"
              aria-hidden
            />
            <motion.form
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="relative rounded-[1.25rem] border border-white/30 bg-surface-card/95 p-6 shadow-card backdrop-blur-md md:p-10"
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
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-card transition-all hover:bg-brand-700 hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card"
                whileHover={!sending ? { scale: 1.02 } : {}}
                whileTap={!sending ? { scale: 0.98 } : {}}
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                {sending ? '...' : t('contact.submit')}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  )
}
