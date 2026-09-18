import { motion } from 'framer-motion'
import { companyContent } from '../../data/categories'
import styles from './VisionMissionSection.module.css'

function StatementCard({
  id,
  kicker,
  title,
  body,
  className,
  delay,
}: {
  id: string
  kicker: string
  title: string
  body: string
  className: string
  delay: number
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

      <h3 className={styles.title}>
        {title.split('\n').map((line) => (
          <span key={line} className={styles.line}>
            {line}
          </span>
        ))}
      </h3>
      <p className={styles.body}>{body}</p>
    </motion.div>
  )
}

export function VisionMissionSection() {
  const { vision, mission } = companyContent

  return (
    <section className={styles.section} data-nav-theme="dark">
      <div className={`container ${styles.grid}`}>
        <StatementCard
          id="vision"
          className={styles.cardVision}
          delay={0}
          {...vision}
        />
        <StatementCard
          id="mission"
          className={styles.cardMission}
          delay={0.15}
          {...mission}
        />
      </div>
    </section>
  )
}
