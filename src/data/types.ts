export type Product = {
  id: string
  name: string
  description: string
  category?: string
  code?: string
}

export type Brand = {
  id: string
  name: string
  tagline: string
  description: string
  accentColor: string
  backgroundColor: string
  textColor: string
  products: Product[]
}

export type VoltageCategory = {
  id: string
  index: string
  name: string
  title: string
  description: string
}
