import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { companyContent } from '../../data/categories'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="hero" ref={ref} className={styles.hero} data-nav-theme="dark">
      <div className={styles.grid} aria-hidden="true" />
      <motion.div className={styles.backdrop} style={{ y }} aria-hidden="true" />

      <motion.div className={`container ${styles.content}`} style={{ opacity }}>
        <p className={`eyebrow ${styles.eyebrow}`}>{companyContent.name} — DİJİTAL KATALOG</p>

        <h1 className={styles.title}>
          {companyContent.heroTitle.map((line, i) => (
            <span key={line} className={styles.titleLine}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 * i }}
                className={styles.titleReveal}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className={styles.subtitle}
        >
          {companyContent.heroSubtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span>KEŞFETMEK İÇİN KAYDIR</span>
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}
