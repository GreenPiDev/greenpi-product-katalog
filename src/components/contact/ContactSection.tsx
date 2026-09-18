import { motion } from 'framer-motion'
import { companyContent } from '../../data/categories'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const { closing, contact } = companyContent

  return (
    <section id="contact" className={styles.section} data-nav-theme="dark">
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.kicker}`}>{closing.kicker}</p>

        <motion.h2
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
          <a href={`mailto:${contact.email}`} className={styles.detailItem} data-cursor="open">
            <span className={styles.detailLabel}>E-POSTA</span>
            <span className={styles.detailValue}>{contact.email}</span>
          </a>
          <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className={styles.detailItem} data-cursor="open">
            <span className={styles.detailLabel}>TELEFON</span>
            <span className={styles.detailValue}>{contact.phone}</span>
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.detailItem}
            data-cursor="open"
          >
            <span className={styles.detailLabel}>ADRES</span>
            <span className={styles.detailValue}>{contact.address}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
