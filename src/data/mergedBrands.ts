import type { Brand, Product, UserProduct } from './types'
import { lowVoltageBrands, mediumVoltageProducts } from './brands'
import userProductsRaw from './userProducts.json'

const userProducts = userProductsRaw as UserProduct[]

export const brandsWithUserProducts: Brand[] = lowVoltageBrands.map((brand) => ({
  ...brand,
  products: [...brand.products, ...userProducts.filter((p) => p.brandId === brand.id)],
}))

export const mediumVoltageProductsWithUser: Product[] = [
  ...mediumVoltageProducts,
  ...userProducts.filter((p) => p.brandId === 'medium-voltage'),
]
