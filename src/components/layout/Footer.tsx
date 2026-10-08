import { useLanguage } from '../../i18n/LanguageContext'
import styles from './Footer.module.css'

export function Footer() {
  const { t, textDir } = useLanguage()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>GREEN PI ENERJİ</span>
        <span className={styles.meta}>
          © {new Date().getFullYear()} <span dir={textDir}>{t.footer.rights}</span>
        </span>
      </div>
    </footer>
  )
}
