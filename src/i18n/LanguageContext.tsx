import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations } from './translations'
import type { Dictionary, Lang } from './types'

const STORAGE_KEY = 'gp_lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
  /** Yalnızca metin bloklarında kullanılmak üzere: 'ar' ise 'rtl', aksi halde 'ltr'.
   *  Sayfa iskeletini (scroll, pin, side nav) bozmamak için bilerek <html>'e basılmıyor. */
  textDir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'tr' || stored === 'en' || stored === 'ru' || stored === 'ar') return stored
  return 'tr'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    // <html>'in dir'i kasıtlı olarak hep 'ltr' kalır: GSAP ScrollTrigger pin'leri,
    // Lenis scroll ölçümleri ve tarayıcı scrollbar'ı dir="rtl" ile ciddi şekilde
    // bozuluyor (bölümler arası geçişte "native" hissin kaybolmasının sebebi buydu).
    document.documentElement.dir = 'ltr'
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: (next) => {
        localStorage.setItem(STORAGE_KEY, next)
        setLangState(next)
      },
      t: translations[lang],
      textDir: lang === 'ar' ? 'rtl' : 'ltr',
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
