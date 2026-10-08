import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLanguage } from '../../i18n/LanguageContext'
import { scrollToId } from '../../lib/lenis'
import { brandsWithUserProducts, mediumVoltageGroupsWithUserProducts } from '../../data/mergedBrands'
import styles from './SideNavigation.module.css'

type NavChild = { id: string; label: string; lang: 'tr' | 'en' }
type NavItem = { id: string; index: string; label: string; children?: NavChild[] }

type SubNavListProps = {
  expanded: boolean
  items: NavChild[]
  activeId: string
  onSelect: (id: string) => void
}

function SubNavList({ expanded, items, activeId, onSelect }: SubNavListProps) {
  const [overflowVisible, setOverflowVisible] = useState(false)

  useEffect(() => {
    if (!expanded) setOverflowVisible(false)
  }, [expanded])

  return (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.ul
          className={styles.subList}
          style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          onAnimationComplete={() => setOverflowVisible(true)}
        >
          {items.map((child) => (
            <li key={child.id} className={styles.subItem}>
              <button
                type="button"
                data-cursor="open"
                onClick={() => onSelect(child.id)}
                className={`${styles.subDotButton} ${activeId === child.id ? styles.subDotActive : ''}`}
                aria-current={activeId === child.id}
              >
                <span className={styles.subDot} />
                <span lang={child.lang} className={`${styles.tooltip} ${styles.subTooltip}`}>
                  {child.label}
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export function SideNavigation() {
  const { t } = useLanguage()

  const NAV_ITEMS: NavItem[] = [
    { id: 'hero', index: '01', label: t.nav.home },
    { id: 'company', index: '02', label: t.nav.company },
    { id: 'portfolio', index: '03', label: t.nav.products },
    {
      id: 'low-voltage',
      index: '04',
      label: t.voltageCategories[0].name,
      children: brandsWithUserProducts.map((brand) => ({
        id: `brand-${brand.id}`,
        label: brand.name,
        lang: brand.nameLang ?? 'en',
      })),
    },
    {
      id: 'medium-voltage',
      index: '05',
      label: t.voltageCategories[1].name,
      children: mediumVoltageGroupsWithUserProducts.map((group) => ({
        id: `brand-${group.id}`,
        label: group.name,
        lang: group.nameLang ?? 'en',
      })),
    },
    { id: 'contact', index: '06', label: t.nav.contact },
  ]

  const ALL_IDS = NAV_ITEMS.flatMap((item) => [item.id, ...(item.children?.map((child) => child.id) ?? [])])

  const activeId = useActiveSection(ALL_IDS)

  function handleClick(id: string) {
    scrollToId(id, { duration: 1.1 })
  }

  function isGroupExpanded(item: NavItem) {
    if (!item.children) return false
    return item.id === activeId || item.children.some((child) => child.id === activeId)
  }

  return (
    <nav className={styles.nav} aria-label={t.menuAria.sideNav}>
      <ul>
        {NAV_ITEMS.map((item) => {
          const expanded = isGroupExpanded(item)

          return (
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

              {item.children && (
                <SubNavList expanded={expanded} items={item.children} activeId={activeId} onSelect={handleClick} />
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
