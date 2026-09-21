import type { Product } from '../../data/types'
import { useProductDrawer, type DrawerBrand } from '../../context/ProductDrawerContext'
import styles from './ProductCard.module.css'

type ProductCardProps = {
  product: Product
  brand: DrawerBrand
  index: number
}

export function ProductCard({ product, brand, index }: ProductCardProps) {
  const { open } = useProductDrawer()

  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        {product.image ? (
          <img
            className={styles.image}
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <svg className={styles.placeholder} viewBox="0 0 200 200" aria-hidden="true">
            <rect x="1" y="1" width="198" height="198" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <path d="M100 40 L100 160 M40 100 L160 100" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        )}
        <span className={styles.code}>{product.code}</span>
      </div>

      <div className={styles.meta}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>
        <button
          type="button"
          className={styles.link}
          data-cursor="view"
          onClick={() => open(product, brand)}
        >
          İncele <span aria-hidden="true">→</span>
        </button>
      </div>

      <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
    </article>
  )
}
