import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Brand } from '../../data/types'
import { useHorizontalGallery } from '../../hooks/useHorizontalGallery'
import { ProductCard } from './ProductCard'
import styles from './BrandSection.module.css'

type BrandSectionProps = {
  brand: Brand
  position: number
  total: number
}

export function BrandSection({ brand, position, total }: BrandSectionProps) {
  const { wrapperRef, trackRef, x, wrapperHeight, isCompact } = useHorizontalGallery([brand.id])

  const brandStyle = {
    '--brand-bg': brand.backgroundColor,
    '--brand-accent': brand.accentColor,
    '--brand-text': brand.textColor,
  } as CSSProperties

  return (
    <div id={`brand-${brand.id}`} className={styles.brand} style={brandStyle} data-nav-theme="brand">
      <div className={styles.intro}>
        <div className={`container ${styles.introInner}`}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className={styles.count}
          >
            {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.span>

          <motion.h3
            lang="en"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={styles.name}
          >
            {brand.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={styles.tagline}
          >
            {brand.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={styles.description}
          >
            {brand.description}
          </motion.p>
        </div>
      </div>

      <div ref={wrapperRef} className={styles.galleryWrapper} style={{ height: wrapperHeight }}>
        <div className={styles.sticky}>
          <motion.div
            ref={trackRef}
            className={styles.track}
            style={isCompact ? undefined : { x }}
          >
            {brand.products.map((product, i) => (
              <ProductCard key={product.id} product={product} brand={brand} index={i} />
            ))}
            <div className={styles.trackSpacer} aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
