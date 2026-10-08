import { motion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'
import styles from './VisionMissionSection.module.css'

function StatementCard({
  id,
  kicker,
  title,
  body,
  className,
  delay,
  textDir,
}: {
  id: string
  kicker: string
  title: string
  body: string
  className: string
  delay: number
  textDir: 'ltr' | 'rtl'
}) {
  return (
    <motion.div
      id={id}
      className={`${styles.card} ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.corner} aria-hidden="true" />
      <span className={styles.cornerEnd} aria-hidden="true" />

      <span className={styles.kicker} aria-hidden="true">
        {kicker}
      </span>

      <h3 dir={textDir} className={styles.title}>
        {title.split('\n').map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </h3>
      <p dir={textDir} className={styles.body}>
        {body}
      </p>
    </motion.div>
  )
}

export function VisionMissionSection() {
  const { t, textDir } = useLanguage()
  const { vision, mission } = t

  return (
    <section className={styles.section} data-nav-theme="dark">
      <div className={`container ${styles.grid}`}>
        <StatementCard
          id="vision"
          className={styles.cardVision}
          delay={0}
          textDir={textDir}
          {...vision}
        />
        <StatementCard
          id="mission"
          className={styles.cardMission}
          delay={0.15}
          textDir={textDir}
          {...mission}
        />
      </div>
    </section>
  )
}
