import { motion } from 'framer-motion'
import { certificateLogo, certificateStandards } from '../../data/certificates'
import { useHorizontalGallery } from '../../hooks/useHorizontalGallery'
import { useLanguage } from '../../i18n/LanguageContext'
import { assetUrl } from '../../utils/assetUrl'
import styles from './CertificatesSection.module.css'

export function CertificatesSection() {
  const { t, textDir } = useLanguage()
  const { certificates } = t
  const { wrapperRef, trackRef } = useHorizontalGallery()

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
              <li key={code} className={styles.card} dir={textDir}>
                <span className={styles.iso} dir="ltr">ISO</span>
                <span className={styles.code} dir="ltr">{code}</span>
                <span className={styles.name}>
                  {certificates.standardNames[i]}
                </span>
                <p className={styles.desc}>
                  {certificates.standardDescriptions[i]}
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.spacer} aria-hidden="true" />
        </div>

        <span className={styles.hint} aria-hidden="true">
          {certificates.scrollHint} <span className={styles.arrow}>→</span>
        </span>
      </div>
    </section>
  )
}
