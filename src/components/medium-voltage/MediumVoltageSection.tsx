import { voltageCategories } from '../../data/categories'
import { mediumVoltageGroupsWithUserProducts } from '../../data/mergedBrands'
import { CategoryIntro } from '../products/CategoryIntro'
import { BrandSection } from '../products/BrandSection'

export function MediumVoltageSection() {
  const category = voltageCategories[1]

  return (
    <>
      <CategoryIntro category={category} id="medium-voltage" />
      {mediumVoltageGroupsWithUserProducts.map((group, i) => (
        <BrandSection
          key={group.id}
          brand={group}
          position={i + 1}
          total={mediumVoltageGroupsWithUserProducts.length}
        />
      ))}
    </>
  )
}
