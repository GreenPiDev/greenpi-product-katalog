import type { Brand, UserProduct } from './types'
import { lowVoltageBrands, mediumVoltageGroups } from './brands'
import userProductsRaw from './userProducts.json'
import brandVisibilityRaw from './brandVisibility.json'

const userProducts = userProductsRaw as UserProduct[]
const brandVisibility = brandVisibilityRaw as Record<string, boolean>

const isVisible = (p: UserProduct) => p.isVisible !== false
const isBrandVisible = (id: string) => brandVisibility[id] !== false

export const brandsWithUserProducts: Brand[] = lowVoltageBrands
  .filter((brand) => isBrandVisible(brand.id))
  .map((brand) => ({
    ...brand,
    products: [...brand.products, ...userProducts.filter((p) => p.brandId === brand.id && isVisible(p))],
  }))

export const mediumVoltageGroupsWithUserProducts: Brand[] = mediumVoltageGroups
  .filter((group) => isBrandVisible(group.id))
  .map((group) => ({
    ...group,
    products: [...group.products, ...userProducts.filter((p) => p.brandId === group.id && isVisible(p))],
  }))
