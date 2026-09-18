import { motion } from 'framer-motion'
import { voltageCategories } from '../../data/categories'
import { mediumVoltageProducts } from '../../data/brands'
import { CategoryIntro } from '../products/CategoryIntro'
import { ProductCard } from '../products/ProductCard'
import { useHorizontalGallery } from '../../hooks/useHorizontalGallery'
import styles from './MediumVoltageSection.module.css'

const MEDIUM_VOLTAGE_BRAND = {
  name: 'Orta Gerilim',
  accentColor: '#7fb8c9',
  backgroundColor: '#14181a',
  textColor: '#eef1ee',
}

export function MediumVoltageSection() {
  const category = voltageCategories[1]
  const { wrapperRef, trackRef, x, wrapperHeight, isCompact } = useHorizontalGallery()

  return (
    <>
      <CategoryIntro category={category} id="medium-voltage" />

      <div className={styles.section} data-nav-theme="brand">
        <div className={styles.intro}>
          <div className={`container ${styles.introInner}`}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className={styles.tagline}
            >
              Trafo merkezleri ve dağıtım hücreleri
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className={styles.description}
            >
              Bu ürün grubu marka bağımsız olarak, saha ve proje ihtiyacına göre uygun teknik
              spesifikasyonlarla tedarik edilir.
            </motion.p>
          </div>
        </div>

        <div ref={wrapperRef} className={styles.galleryWrapper} style={{ height: wrapperHeight }}>
          <div className={styles.sticky}>
            <motion.div ref={trackRef} className={styles.track} style={isCompact ? undefined : { x }}>
              {mediumVoltageProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} brand={MEDIUM_VOLTAGE_BRAND} index={i} />
              ))}
              <div className={styles.trackSpacer} aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
