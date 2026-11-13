import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { certificateLogo, certificateStandards, certificateThumb } from '../../data/certificates'
import { useHorizontalGallery } from '../../hooks/useHorizontalGallery'
import { useLanguage } from '../../i18n/LanguageContext'
import { assetUrl } from '../../utils/assetUrl'
import { CertificateDrawer, type CertificateDrawerItem } from './CertificateDrawer'
import styles from './CertificatesSection.module.css'

export function CertificatesSection() {
  const { t, textDir } = useLanguage()
  const { certificates } = t
  const { wrapperRef, trackRef } = useHorizontalGallery()
  const [active, setActive] = useState<CertificateDrawerItem | null>(null)
  const closeDrawer = useCallback(() => setActive(null), [])

  return (
    <section id="certificates" className={styles.section} data-nav-theme="brand">
      <div ref={wrapperRef} className={styles.wrapper}>
        <img
          src={assetUrl(certificateLogo)}
          alt="ISO"
          className={styles.logo}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.content}>
          <div className={styles.intro} dir={textDir}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className={styles.title}
            >
              {certificates.title}
            </motion.h2>
            <p className={styles.description}>{certificates.description}</p>
          </div>

          <div ref={trackRef} className={styles.track}>
            <ul className={styles.list} aria-label={certificates.listAria}>
              {certificateStandards.map((code, i) => (
                <li key={code} className={styles.item}>
                  <button
                    type="button"
                    className={styles.card}
                    data-cursor="view"
                    aria-haspopup="dialog"
                    aria-label={`ISO ${code} — ${certificates.standardNames[i]}`}
                    onClick={() =>
                      setActive({
                        code,
                        name: certificates.standardNames[i],
                        description: certificates.standardDescriptions[i],
                      })
                    }
                  >
                    <img
                      className={styles.thumb}
                      src={assetUrl(certificateThumb(code))}
                      alt=""
                      width={640}
                      height={905}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                  <span className={styles.caption} dir="ltr" aria-hidden="true">
                    <span className={styles.iso}>ISO</span>
                    <span className={styles.code}>{code}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.spacer} aria-hidden="true" />
          </div>
        </div>

        <span className={styles.hint} aria-hidden="true">
          {certificates.scrollHint} <span className={styles.arrow}>→</span>
        </span>
      </div>

      <CertificateDrawer item={active} onClose={closeDrawer} />
    </section>
  )
}
