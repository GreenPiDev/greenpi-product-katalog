import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useProductDrawer } from '../../context/ProductDrawerContext'
import { getLenis } from '../../lib/lenis'
import styles from './ProductDrawer.module.css'

export function ProductDrawer() {
  const { state, close } = useProductDrawer()
  const isOpen = state !== null

  useEffect(() => {
    const lenis = getLenis()
    if (isOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [close])

  return (
    <AnimatePresence>
      {state && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />

          <motion.aside
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={state.product.name}
            style={
              {
                '--brand-accent': state.brand.accentColor,
                '--brand-bg': state.brand.backgroundColor,
                '--brand-text': state.brand.textColor,
              } as React.CSSProperties
            }
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <button type="button" className={styles.close} onClick={close} aria-label="Kapat" data-cursor="open">
              <span />
              <span />
            </button>

            <div className={styles.imageBox}>
              {state.product.image ? (
                <img
                  className={styles.image}
                  src={state.product.image}
                  alt={state.product.name}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <svg className={styles.placeholder} viewBox="0 0 200 200" aria-hidden="true">
                  <rect x="1" y="1" width="198" height="198" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M100 30 L100 170 M30 100 L170 100" stroke="currentColor" strokeWidth="0.35" />
                </svg>
              )}
              <span className={styles.code}>{state.product.code}</span>
            </div>

            <div className={styles.body}>
              <span className={styles.brand} lang="en">
                {state.brand.name}
              </span>
              <h2 className={styles.name}>{state.product.name}</h2>
              <p className={styles.desc}>{state.product.description}</p>

              <dl className={styles.specs}>
                <div className={styles.specRow}>
                  <dt>Ürün Kodu</dt>
                  <dd>{state.product.code}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Marka</dt>
                  <dd lang="en">{state.brand.name}</dd>
                </div>
                <div className={styles.specRow}>
                  <dt>Kategori</dt>
                  <dd>{state.product.category ?? 'Alçak Gerilim'}</dd>
                </div>
              </dl>

              <a
                href={`mailto:info@greenpi.com.tr?subject=${encodeURIComponent(
                  `Teklif Talebi — ${state.product.name} (${state.product.code})`,
                )}`}
                className={styles.cta}
                data-cursor="open"
              >
                Teklif İste <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
