import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, MessageCircle, Phone, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const PHONE = '0543223106'
const EMAIL = 'demaalramhe@gmail.com'
const INSTAGRAM = 'https://www.instagram.com/dema_webapps?igsh=MW83cDU0ejZ0NjF2Mg%3D%3D&utm_source=qr'
const WHATSAPP_NUMBER = '972543223106'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

// לקבלת מייל: הירשם ב־https://formspree.io, צור טופס, והדבק כאן את ה־ID (רק החלק אחרי /f/).
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_ID || ''

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
      'הודעה חדשה מהאתר Dema WebApps',
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

  return (
    <section id="contact" className="py-24 md:py-32 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
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
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 border border-white/5 hover:border-brand-500/20 transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-400" />
              </span>
              <div>
                <span className="text-white/60 text-sm">{t('contact.email')}</span>
                <p className="text-white font-medium">{EMAIL}</p>
              </div>
            </motion.a>
            <motion.a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 border border-white/5 hover:border-brand-500/20 transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/20 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-brand-400" />
              </span>
              <div>
                <span className="text-white/60 text-sm">{t('contact.instagram')}</span>
                <p className="text-white font-medium">@dema_webapps</p>
              </div>
            </motion.a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 border border-white/5 hover:border-brand-500/20 transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-brand-400" />
              </span>
              <div>
                <span className="text-white/60 text-sm">{t('contact.whatsapp')}</span>
                <p className="text-white font-medium">{PHONE}</p>
              </div>
            </motion.a>
            <motion.a
              href={`tel:+972543223106`}
              className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 border border-white/5 hover:border-brand-500/20 transition-colors"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="w-12 h-12 rounded-lg bg-brand-600/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-brand-400" />
              </span>
              <div>
                <span className="text-white/60 text-sm">{t('contact.phone')}</span>
                <p className="text-white font-medium">{PHONE}</p>
              </div>
            </motion.a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-dark-700/50 border border-white/5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="sm:col-span-2 sm:col-start-1">
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.name')}</span>
                <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition" placeholder={t('contact.fields.name')} />
              </label>
              <label>
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.business')}</span>
                <input type="text" name="business" className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition" placeholder={t('contact.fields.business')} />
              </label>
              <label>
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.email')}</span>
                <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition" placeholder={t('contact.fields.email')} />
              </label>
              <label className="sm:col-span-2">
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.phone')}</span>
                <input type="tel" name="phone" className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition" placeholder={t('contact.fields.phone')} />
              </label>
              <label className="sm:col-span-2">
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.service')}</span>
                <select name="service" className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition">
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
                <span className="block text-sm font-medium text-white/80 mb-2">{t('contact.fields.message')}</span>
                <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 text-white placeholder-white/40 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition resize-none" placeholder={t('contact.fields.message')} />
              </label>
            </div>
            {success && (
            <p className="mt-4 text-sm text-green-400">
              המייל נשלח. פתח את וואטסאפ כדי לשלוח את ההודעה.
            </p>
          )}
            <motion.button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-70 text-white font-medium transition-colors"
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
