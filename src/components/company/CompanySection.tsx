import { motion } from 'framer-motion'
import { companyContent } from '../../data/categories'
import styles from './CompanySection.module.css'

export function CompanySection() {
  const { about } = companyContent

  return (
    <section id="company" className={styles.section} data-nav-theme="dark">
      <div className={`container ${styles.grid}`}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className={`eyebrow ${styles.eyebrow}`}
        >
          {about.kicker}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className={styles.title}
        >
          {about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={styles.body}
        >
          {about.body}
        </motion.p>
      </div>
    </section>
  )
}
