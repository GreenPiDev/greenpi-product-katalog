import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToId } from '../../lib/lenis'
import styles from './SideNavigation.module.css'

const NAV_ITEMS = [
  { id: 'hero', index: '01', label: 'ANA SAYFA' },
  { id: 'company', index: '02', label: 'ŞİRKET' },
  { id: 'portfolio', index: '03', label: 'ÜRÜNLER' },
  { id: 'low-voltage', index: '04', label: 'ALÇAK GERİLİM' },
  { id: 'medium-voltage', index: '05', label: 'ORTA GERİLİM' },
  { id: 'contact', index: '06', label: 'İLETİŞİM' },
]

export function SideNavigation() {
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id))
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? doc.scrollTop / max : 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleClick(id: string) {
    scrollToId(id, { duration: 1.1 })
  }

  return (
    <nav className={styles.nav} aria-label="Bölüm navigasyonu">
      <div className={styles.track}>
        <div className={styles.progressFill} style={{ transform: `scaleY(${progress})` }} />
      </div>
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.id} className={styles.item}>
            <button
              type="button"
              data-cursor="open"
              onClick={() => handleClick(item.id)}
              className={`${styles.dotButton} ${activeId === item.id ? styles.dotActive : ''}`}
              aria-current={activeId === item.id}
            >
              <span className={styles.dot} />
              <span className={styles.tooltip}>
                <span className={styles.tooltipIndex}>{item.index}</span>
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
