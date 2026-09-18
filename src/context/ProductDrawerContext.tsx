import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../data/types'

export type DrawerBrand = {
  name: string
  accentColor: string
  backgroundColor: string
  textColor: string
}

type DrawerState = {
  product: Product
  brand: DrawerBrand
} | null

type ProductDrawerContextValue = {
  state: DrawerState
  open: (product: Product, brand: DrawerBrand) => void
  close: () => void
}

const ProductDrawerContext = createContext<ProductDrawerContextValue | null>(null)

export function ProductDrawerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DrawerState>(null)

  const value = useMemo<ProductDrawerContextValue>(
    () => ({
      state,
      open: (product, brand) => setState({ product, brand }),
      close: () => setState(null),
    }),
    [state],
  )

  return <ProductDrawerContext.Provider value={value}>{children}</ProductDrawerContext.Provider>
}

export function useProductDrawer() {
  const ctx = useContext(ProductDrawerContext)
  if (!ctx) throw new Error('useProductDrawer must be used within ProductDrawerProvider')
  return ctx
}
