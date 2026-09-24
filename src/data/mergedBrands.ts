import type { Brand, UserProduct } from './types'
import { lowVoltageBrands, mediumVoltageGroups } from './brands'
import userProductsRaw from './userProducts.json'

const userProducts = userProductsRaw as UserProduct[]

export const brandsWithUserProducts: Brand[] = lowVoltageBrands.map((brand) => ({
  ...brand,
  products: [...brand.products, ...userProducts.filter((p) => p.brandId === brand.id)],
}))

export const mediumVoltageGroupsWithUserProducts: Brand[] = mediumVoltageGroups.map((group) => ({
  ...group,
  products: [...group.products, ...userProducts.filter((p) => p.brandId === group.id)],
}))
