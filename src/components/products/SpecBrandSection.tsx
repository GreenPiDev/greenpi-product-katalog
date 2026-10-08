import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Brand } from '../../data/types'
import { useLanguage } from '../../i18n/LanguageContext'
import { pickLocalizedText } from '../../i18n/localize'
import { assetUrl } from '../../utils/assetUrl'
import brandStyles from './BrandSection.module.css'
import styles from './SpecBrandSection.module.css'

type SpecBrandSectionProps = {
  brand: Brand
  position: number
  total: number
}

export function SpecBrandSection({ brand, position, total }: SpecBrandSectionProps) {
  const { t, lang } = useLanguage()
  const tables = brand.specTables ?? []
  // Tek ve kısa bir matris tablosu varsa (ör. OG şönt), sticky görselin dikey
  // ortasıyla hizalanması için tableArea de dikeyde ortalanır.
  const isSingleGrid = tables.length === 1 && tables[0].kind === 'grid'

  const brandStyle = {
    '--brand-bg': brand.backgroundColor,
    '--brand-accent': brand.accentColor,
    '--brand-text': brand.textColor,
  } as CSSProperties

  return (
    <div id={`brand-${brand.id}`} className={brandStyles.brand} style={brandStyle} data-nav-theme="brand">
      <div className={brandStyles.intro}>
        <div className={`container ${brandStyles.introInner}`}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className={brandStyles.count}
          >
            {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </motion.span>

          <motion.h3
            lang={brand.nameLang ?? 'en'}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className={brandStyles.name}
          >
            {brand.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={brandStyles.tagline}
          >
            {pickLocalizedText(brand.tagline, lang)}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={brandStyles.description}
          >
            {pickLocalizedText(brand.description, lang)}
          </motion.p>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.visualCol}>
          <div className={styles.visual}>
            {brand.specImage ? (
              <img
                className={styles.image}
                src={assetUrl(brand.specImage)}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                style={brand.specImageScale ? { transform: `scale(${brand.specImageScale})` } : undefined}
              />
            ) : (
              <svg className={styles.placeholder} viewBox="0 0 200 200" aria-hidden="true">
                <rect x="1" y="1" width="198" height="198" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" />
                <path d="M100 40 L100 160 M40 100 L160 100" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            )}
            <span className={styles.visualLabel}>{t.spec.visualLabel}</span>
          </div>
        </div>

        <div className={`${styles.tableArea} ${isSingleGrid ? styles.tableAreaCentered : ''}`}>
          {tables.length > 0 ? (
            tables.map((table, ti) => (
              <div key={ti} className={styles.tableBlock}>
                {table.title && <h4 className={styles.tableTitle}>{table.title}</h4>}

                {table.kind === 'list' ? (
                  <>
                    <div className={styles.tableHead} aria-hidden="true">
                      <span>{table.columnLabels?.[0] ?? t.spec.columnLabel0}</span>
                      <span>{table.columnLabels?.[1] ?? t.spec.columnLabel1}</span>
                    </div>
                    <div className={styles.list}>
                      {table.rows.map((row, i) => (
                        <div key={`${row.code}-${i}`} className={styles.row}>
                          <span className={styles.rowIndex}>{String(i + 1).padStart(2, '0')}</span>
                          <span className={styles.code}>{row.code}</span>
                          <span className={styles.desc}>{row.description}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={styles.gridWrapper}>
                    <table className={styles.grid}>
                      <thead>
                        <tr>
                          <th>{table.rowHeaderLabel}</th>
                          {table.columnHeaders.map((head) => (
                            <th key={head}>{head}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row) => (
                          <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            {row.values.map((value, vi) => (
                              <td key={vi}>{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.empty}>{t.spec.emptyState}</div>
          )}
        </div>
      </div>
    </div>
  )
}
