export type Product = {
  id: string
  name: string
  description: string
  category?: string
  code?: string
  image?: string
  /** false ise katalog sayfasında gösterilmez. Tanımsızsa görünür kabul edilir. */
  isVisible?: boolean
}

export type UserProduct = Product & { brandId: string }

export type SpecRow = {
  code: string
  description: string
}

/** Kod/açıklama şeklinde dikey liste tablosu (ör. hücre model kodları, güç-açıklama eşleşmeleri). */
export type SpecListTable = {
  kind: 'list'
  /** PDF'teki tablonun kendi başlığı, ör. "KURU TİP TRANSFORMATÖR — IEC 60076-11". */
  title?: string
  /** Varsayılan ['Model Kodu', 'Teknik Açıklama'] yerine geçer (ör. ['Güç', 'Teknik Açıklama']). */
  columnLabels?: [string, string]
  rows: SpecRow[]
}

/** Satır × sütun matris tablosu (ör. kademe no / güç aralığı gibi gerçek çapraz tablolar). */
export type SpecGridTable = {
  kind: 'grid'
  title?: string
  rowHeaderLabel: string
  columnHeaders: string[]
  rows: {
    label: string
    values: string[]
  }[]
}

export type SpecTable = SpecListTable | SpecGridTable

export type Brand = {
  id: string
  name: string
  nameLang?: 'tr' | 'en'
  tagline: string
  description: string
  accentColor: string
  backgroundColor: string
  textColor: string
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

export type VoltageCategory = {
  id: string
  index: string
  name: string
  title: string
  description: string
}
