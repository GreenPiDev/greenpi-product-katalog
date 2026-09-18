import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { VoltageCategory } from '../../data/types'
import styles from './CategoryIntro.module.css'

export function CategoryIntro({ category, id }: { category: VoltageCategory; id: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id={id} ref={ref} className={styles.section} data-nav-theme="dark">
      <motion.div className={styles.inner} style={{ scale, opacity }}>
        <span className={styles.index}>{category.index}</span>
        <h2 className={styles.title}>{category.name}</h2>
        <p className={styles.desc}>{category.description}</p>
      </motion.div>
    </section>
  )
}
