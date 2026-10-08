import type { LocalizedText } from '../i18n/types'

export type Product = {
  id: string
  name: LocalizedText
  description: LocalizedText
  category?: string
  code?: string
  image?: string
  /** false ise katalog sayfasında gösterilmez. Tanımsızsa görünür kabul edilir. */
  isVisible?: boolean
}

export type UserProduct = Product & { brandId: string }

export type SpecRow = {
  code: string
  description: LocalizedText
}

/** Kod/açıklama şeklinde dikey liste tablosu (ör. hücre model kodları, güç-açıklama eşleşmeleri). */
export type SpecListTable = {
  kind: 'list'
  /** PDF'teki tablonun kendi başlığı, ör. "KURU TİP TRANSFORMATÖR — IEC 60076-11". */
  title?: LocalizedText
  /** Varsayılan ['Model Kodu', 'Teknik Açıklama'] yerine geçer (ör. ['Güç', 'Teknik Açıklama']). */
  columnLabels?: [LocalizedText, LocalizedText]
  rows: SpecRow[]
}

/** Satır × sütun matris tablosu (ör. kademe no / güç aralığı gibi gerçek çapraz tablolar). */
export type SpecGridTable = {
  kind: 'grid'
  title?: LocalizedText
  rowHeaderLabel: LocalizedText
  columnHeaders: string[]
  rows: {
    label: string
    values: string[]
  }[]
}

export type SpecTable = SpecListTable | SpecGridTable

export type Brand = {
  id: string
  name: LocalizedText
  nameLang?: 'tr' | 'en'
  tagline: LocalizedText
  description: LocalizedText
  accentColor: string
  backgroundColor: string
  logos?: string[]
  products: Product[]
  /** 'spec' = tek görsel (sticky) + aşağı doğru uzayan teknik veri tablo(lar)ı. */
  displayMode?: 'gallery' | 'spec'
  specImage?: string
  /** Sadece bu markanın görseli için büyütme oranı (ör. 1.2 = %20 daha büyük). */
  specImageScale?: number
  /** PDF'teki tablo yapısı farklıysa (liste / matris) her biri kendi şeklinde eklenir. */
  specTables?: SpecTable[]
}

