export type Product = {
  id: string
  name: string
  description: string
  category?: string
  code?: string
  image?: string
}

export type UserProduct = Product & { brandId: string }

export type SpecRow = {
  code: string
  description: string
}

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
  /** 'spec' = tek görsel + yatay kayan teknik veri tablosu (ör. hücre/trafo serileri) */
  displayMode?: 'gallery' | 'spec'
  specImage?: string
  specTable?: SpecRow[]
}

export type VoltageCategory = {
  id: string
  index: string
  name: string
  title: string
  description: string
}
