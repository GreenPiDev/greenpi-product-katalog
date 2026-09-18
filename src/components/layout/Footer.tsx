import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>GREEN PI ENERJİ</span>
        <span className={styles.meta}>© {new Date().getFullYear()} Tüm hakları saklıdır.</span>
        <span className={styles.meta}>Gizlilik · Yasal Bilgiler</span>
      </div>
    </footer>
  )
}
