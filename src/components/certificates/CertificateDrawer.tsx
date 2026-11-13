import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { certificateImage, type CertificateStandard } from '../../data/certificates'
import { useLanguage } from '../../i18n/LanguageContext'
import { getLenis } from '../../lib/lenis'
import { assetUrl } from '../../utils/assetUrl'
import styles from './CertificateDrawer.module.css'

export type CertificateDrawerItem = {
  code: CertificateStandard
  name: string
  description: string
}

type Props = {
  item: CertificateDrawerItem | null
  onClose: () => void
}

/**
 * Sağdan açılan, sertifikayı tam ekran yüksekliğinde gösteren drawer; standart
 * bilgileri görselin altında yer alır. Bölüm yatay
 * galeride transform ile kaydırıldığı için `position: fixed` bozulmasın diye
 * body'ye portal ile basılır.
 */
export function CertificateDrawer({ item, onClose }: Props) {
  const { t, textDir } = useLanguage()
  const isOpen = item !== null
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const lenis = getLenis()
    const previousFocus = document.activeElement as HTMLElement | null
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      lenis?.start()
      document.body.style.overflow = ''
      previousFocus?.focus({ preventScroll: true })
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={`ISO ${item.code} — ${item.name}`}
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label={t.product.drawerClose}
              data-cursor="close"
            >
              <span />
              <span />
            </button>

            <img
              key={item.code}
              className={styles.image}
              src={assetUrl(certificateImage(item.code))}
              alt={`ISO ${item.code} ${item.name}`}
              width={2480}
              height={3508}
              decoding="async"
            />

            <div className={styles.body} dir={textDir}>
              <span className={styles.code} dir="ltr">ISO {item.code}</span>
              <h2 className={styles.name}>{item.name}</h2>
              <p className={styles.desc}>{item.description}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
