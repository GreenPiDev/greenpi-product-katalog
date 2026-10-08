import { motion } from 'framer-motion'
import { contactInfo } from '../../data/categories'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { t, textDir } = useLanguage()
  const { closing, contact } = t

  return (
    <section id="contact" className={styles.section} data-nav-theme="dark">
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.kicker}`}>{closing.kicker}</p>

        <motion.h2
          dir={textDir}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={styles.body}
        >
          {closing.body}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={styles.details}
        >
          <a href={`mailto:${contactInfo.email}`} className={styles.detailItem} data-cursor="open">
            <span className={styles.detailLabel}>{contact.emailLabel}</span>
            <span className={styles.detailValue}>{contactInfo.email}</span>
          </a>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>{contact.phoneLabel}</span>
            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
              className={styles.detailValue}
              data-cursor="open"
            >
              {contactInfo.phone}
            </a>
            <a
              href={`tel:${contactInfo.phone2.replace(/\s+/g, '')}`}
              className={styles.detailValue}
              data-cursor="open"
            >
              {contactInfo.phone2}
            </a>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.detailItem}
            data-cursor="open"
          >
            <span className={styles.detailLabel}>{contact.addressLabel}</span>
            <span className={styles.detailValue}>{contactInfo.address}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
