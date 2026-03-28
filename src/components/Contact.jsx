import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, MessageCircle, Phone, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const PHONE = '0543223106'
const EMAIL = 'demadigital.business@gmail.com'
/** קישור מלא לפרופיל (כולל פרמטרים מ-QR של אינסטגרם) */
const INSTAGRAM =
  'https://www.instagram.com/dema.digital.solutions?igsh=MW83cDU0ejZ0NjF2Mg%3D%3D&utm_source=qr'
const WHATSAPP_NUMBER = '972543223106'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_ID || ''

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-page border border-ink/15 text-ink placeholder-ink-subtle/60 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition'

export default function Contact() {
  const { t } = useLanguage()
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get('name') || ''
    const business = data.get('business') || ''
    const email = data.get('email') || ''
    const phone = data.get('phone') || ''
    const service = data.get('service') || ''
    const message = data.get('message') || ''

    const whatsappText = [
      'הודעה חדשה מהאתר Dema Digital Solutions',
      '─────────────────',
      `שם: ${name}`,
      business ? `עסק: ${business}` : null,
      `אימייל: ${email}`,
      phone ? `טלפון: ${phone}` : null,
      service ? `שירות: ${service}` : null,
      message ? `הודעה: ${message}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    setSending(true)
    setSuccess(false)

    if (FORMSPREE_FORM_ID) {
      try {
        await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          body: JSON.stringify({
            name,
            business,
            email,
            phone,
            service,
            message,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        setSuccess(true)
      } catch (err) {
        console.error(err)
      }
    }

    const encoded = encodeURIComponent(whatsappText)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
    setSending(false)
  }

  const cardClass =
    'flex items-center gap-4 p-4 rounded-xl bg-surface-card border border-ink/10 hover:border-brand-600/30 transition-colors shadow-sm'

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-ink text-center mb-16"
        >
          {t('contact.title')}
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.a
              href={`mailto:${EMAIL}`}
              className={cardClass}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/15 flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-700" />
              </span>
              <div>
                <span className="text-ink-subtle text-sm">{t('contact.email')}</span>
                <p className="text-ink font-medium">{EMAIL}</p>
              </div>
            </motion.a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClass} cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1 active:scale-[0.98] motion-reduce:transform-none`}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/15 flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5 text-brand-700" />
              </span>
              <div className="min-w-0">
                <span className="text-ink-subtle text-sm">{t('contact.instagram')}</span>
                <p className="text-ink font-medium" dir="ltr">
                  dema.digital.solutions
                </p>
              </div>
            </a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/15 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-brand-700" />
              </span>
              <div>
                <span className="text-ink-subtle text-sm">{t('contact.whatsapp')}</span>
                <p className="text-ink font-medium">{PHONE}</p>
              </div>
            </motion.a>
            <motion.a
              href={`tel:+972543223106`}
              className={cardClass}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/15 flex items-center justify-center">
                <Phone className="w-5 h-5 text-brand-700" />
              </span>
              <div>
                <span className="text-ink-subtle text-sm">{t('contact.phone')}</span>
                <p className="text-ink font-medium">{PHONE}</p>
              </div>
            </motion.a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-surface-card border border-ink/10 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="sm:col-span-2 sm:col-start-1">
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.name')}</span>
                <input type="text" name="name" required className={inputClass} placeholder={t('contact.fields.name')} />
              </label>
              <label>
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.business')}</span>
                <input type="text" name="business" className={inputClass} placeholder={t('contact.fields.business')} />
              </label>
              <label>
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.email')}</span>
                <input type="email" name="email" required className={inputClass} placeholder={t('contact.fields.email')} />
              </label>
              <label className="sm:col-span-2">
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.phone')}</span>
                <input type="tel" name="phone" className={inputClass} placeholder={t('contact.fields.phone')} />
              </label>
              <label className="sm:col-span-2">
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.service')}</span>
                <select name="service" className={inputClass}>
                  <option value="">—</option>
                  <option value="website">Website</option>
                  <option value="landing">Landing Page</option>
                  <option value="webapp">Web App</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="social">Social Media</option>
                  <option value="video">Video / Content</option>
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="block text-sm font-medium text-ink-muted mb-2">{t('contact.fields.message')}</span>
                <textarea name="message" rows={4} className={`${inputClass} resize-none`} placeholder={t('contact.fields.message')} />
              </label>
            </div>
            {success && (
              <p className="mt-4 text-sm text-brand-800">
                המייל נשלח. פתח את וואטסאפ כדי לשלוח את ההודעה.
              </p>
            )}
            <motion.button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white font-medium transition-colors"
              whileHover={!sending ? { scale: 1.03 } : {}}
              whileTap={!sending ? { scale: 0.98 } : {}}
            >
              <Send className="w-4 h-4" />
              {sending ? '...' : t('contact.submit')}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
