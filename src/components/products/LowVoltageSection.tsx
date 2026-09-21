import { voltageCategories } from '../../data/categories'
import { brandsWithUserProducts } from '../../data/mergedBrands'
import { CategoryIntro } from './CategoryIntro'
import { BrandSection } from './BrandSection'

export function LowVoltageSection() {
  const category = voltageCategories[0]

  return (
    <>
      <CategoryIntro category={category} id="low-voltage" />
      {brandsWithUserProducts.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} position={i + 1} total={brandsWithUserProducts.length} />
      ))}
    </>
  )
}
