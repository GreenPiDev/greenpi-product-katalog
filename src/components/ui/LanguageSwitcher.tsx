import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { LANGS } from '../../i18n/types'
import styles from './LanguageSwitcher.module.css'

type LanguageSwitcherProps = {
  className?: string
  variant?: 'desktop' | 'mobile'
}

export function LanguageSwitcher({ className = '', variant = 'desktop' }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage()

  if (variant === 'mobile') {
    return (
      <div className={`${styles.mobileRow} ${className}`}>
        {LANGS.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`${styles.mobileOption} ${item.code === lang ? styles.mobileOptionActive : ''}`}
            onClick={() => setLang(item.code)}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  return <DesktopSwitcher className={className} />
}

function DesktopSwitcher({ className }: { className: string }) {
  const { lang, setLang } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className={`${styles.wrap} ${className}`}>
      <button
        type="button"
        className={styles.trigger}
        data-cursor="view"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {lang.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.menu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {LANGS.map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  className={`${styles.option} ${item.code === lang ? styles.optionActive : ''}`}
                  onClick={() => {
                    setLang(item.code)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
