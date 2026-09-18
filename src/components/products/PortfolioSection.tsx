import { motion } from 'framer-motion'
import { voltageCategories } from '../../data/categories'
import { scrollToId } from '../../lib/lenis'
import styles from './PortfolioSection.module.css'

export function PortfolioSection() {
  return (
    <section id="portfolio" className={styles.section} data-nav-theme="dark">
      <div className="container">
        <p className={`eyebrow ${styles.eyebrow}`}>ÜRÜN PORTFÖYÜ</p>

        <ul className={styles.list}>
          {voltageCategories.map((category, i) => (
            <motion.li
              key={category.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <a
                href={`#${category.id}`}
                className={styles.row}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(category.id, { duration: 1.1 })
                }}
              >
                <span className={styles.index}>{category.index}</span>
                <span className={styles.name}>{category.name}</span>
                <span className={styles.desc}>{category.description}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
