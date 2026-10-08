import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { brandsWithUserProducts, mediumVoltageGroupsWithUserProducts } from '../../data/mergedBrands'
import { useLanguage } from '../../i18n/LanguageContext'
import { pickLocalizedText } from '../../i18n/localize'
import { scrollToId } from '../../lib/lenis'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import styles from './Header.module.css'

export function Header() {
  const { t, lang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProducts, setMobileProducts] = useState(false)
  const [mobileCategory, setMobileCategory] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function openMenu() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }

  function scheduleClose() {
    closeTimer.current = window.setTimeout(() => {
      setMenuOpen(false)
      setActiveCategory(null)
    }, 140)
  }

  function go(id: string) {
    if (id === 'hero') {
      window.location.href = 'https://greenpi.com.tr'
      return
    }
    setMenuOpen(false)
    setMobileOpen(false)
    setActiveCategory(null)
    scrollToId(id, { duration: 0.85 })
  }

  const PRODUCT_CATEGORIES = [
    { id: 'low-voltage', name: t.voltageCategories[0].name, brands: brandsWithUserProducts },
    { id: 'medium-voltage', name: t.voltageCategories[1].name, brands: mediumVoltageGroupsWithUserProducts },
  ]

  const NAV_LINKS = [
    { id: 'hero', label: t.nav.home },
    { id: 'company', label: t.nav.company },
  ]

  const activeBrands = PRODUCT_CATEGORIES.find((c) => c.id === activeCategory)?.brands ?? []

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <nav className={styles.nav} onMouseLeave={scheduleClose}>
            {NAV_LINKS.map((link) => (
              <button key={link.id} type="button" className={styles.navItem} onClick={() => go(link.id)}>
                {link.label}
              </button>
            ))}

            <div className={styles.dropdownWrap} onMouseEnter={openMenu}>
              <button
                type="button"
                className={styles.navItem}
                onClick={() => go('portfolio')}
                aria-expanded={menuOpen}
              >
                {t.nav.products}
              </button>

              <div className={styles.megaMenuPosition}>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      className={styles.megaMenu}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={openMenu}
                    >
                      <div className={styles.categoryColumn}>
                        {PRODUCT_CATEGORIES.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            className={`${styles.categoryItem} ${
                              activeCategory === category.id ? styles.categoryItemActive : ''
                            }`}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onClick={() => go(category.id)}
                          >
                            {category.name}
                            <span className={styles.categoryArrow} aria-hidden="true">
                              →
                            </span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {activeBrands.length > 0 && (
                          <motion.div
                            key={activeCategory}
                            className={styles.brandColumn}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -14 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {activeBrands.map((brand) => (
                              <button
                                key={brand.id}
                                type="button"
                                className={styles.brandItem}
                                onClick={() => go(`brand-${brand.id}`)}
                              >
                                {pickLocalizedText(brand.name, lang)}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button type="button" className={styles.navItem} onClick={() => go('contact')}>
              {t.nav.contact}
            </button>
          </nav>

          <LanguageSwitcher className={styles.langSwitcherDesktop} />

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={t.menuAria.burger}
            aria-expanded={mobileOpen}
          >
            <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLineOpenTop : ''}`} />
            <span className={`${styles.burgerLine} ${mobileOpen ? styles.burgerLineOpenBottom : ''}`} />
          </button>
        </div>
      </header>

      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}>
        <div className={styles.mobileList}>
          {NAV_LINKS.map((link) => (
            <button key={link.id} type="button" className={styles.mobileItem} onClick={() => go(link.id)}>
              {link.label}
            </button>
          ))}

          <button
            type="button"
            className={styles.mobileItem}
            onClick={() => setMobileProducts((v) => !v)}
          >
            {t.nav.products}
          </button>

          {mobileProducts && (
            <div className={styles.mobileSub}>
              {PRODUCT_CATEGORIES.map((category) => (
                <div key={category.id}>
                  <div className={styles.mobileSubRow}>
                    <button
                      type="button"
                      className={styles.mobileSubItem}
                      onClick={() => go(category.id)}
                    >
                      {category.name}
                    </button>
                    {category.brands.length > 0 && (
                      <button
                        type="button"
                        className={styles.mobileExpand}
                        aria-label={t.menuAria.showBrands}
                        onClick={() =>
                          setMobileCategory((c) => (c === category.id ? null : category.id))
                        }
                      >
                        {mobileCategory === category.id ? '−' : '+'}
                      </button>
                    )}
                  </div>
                  {mobileCategory === category.id && (
                    <div className={styles.mobileBrandList}>
                      {category.brands.map((brand) => (
                        <button
                          key={brand.id}
                          type="button"
                          className={styles.mobileBrandItem}
                          onClick={() => go(`brand-${brand.id}`)}
                        >
                          {pickLocalizedText(brand.name, lang)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button type="button" className={styles.mobileItem} onClick={() => go('contact')}>
            {t.nav.contact}
          </button>

          <LanguageSwitcher className={styles.langSwitcherMobile} variant="mobile" />
        </div>
      </div>
    </>
  )
}
