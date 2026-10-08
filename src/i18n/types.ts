export type Lang = 'tr' | 'en' | 'ru' | 'ar'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'ar', label: 'AR' },
]

/** Her dil için ayrı metin; `tr` her zaman dolu olmalı, diğerleri boş string olabilir (henüz çevrilmemiş). */
export type LocalizedText = Record<Lang, string>

export type VoltageCategoryText = {
  id: string
  index: string
  name: string
  description: string
}

export type Dictionary = {
  nav: {
    home: string
    company: string
    products: string
    contact: string
  }
  voltageCategories: VoltageCategoryText[]
  hero: {
    eyebrowSuffix: string
    title: string[]
    subtitle: string
    scrollHint: string
  }
  about: {
    kicker: string
    title: string
    body: string
  }
  vision: {
    index: string
    kicker: string
    title: string
    body: string
  }
  mission: {
    index: string
    kicker: string
    title: string
    body: string
  }
  closing: {
    kicker: string
    body: string
  }
  contact: {
    emailLabel: string
    phoneLabel: string
    addressLabel: string
  }
  portfolio: {
    title: string
  }
  product: {
    viewLabel: string
    drawerClose: string
    drawerBrandLabel: string
    drawerCategoryLabel: string
    drawerCta: string
    categoryFallbackLow: string
    categoryFallbackMedium: string
  }
  spec: {
    visualLabel: string
    columnLabel0: string
    columnLabel1: string
    emptyState: string
  }
  footer: {
    rights: string
  }
  menuAria: {
    burger: string
    showBrands: string
    sideNav: string
  }
}
