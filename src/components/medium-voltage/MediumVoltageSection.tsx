import { voltageCategories } from '../../data/categories'
import { mediumVoltageGroupsWithUserProducts } from '../../data/mergedBrands'
import { CategoryIntro } from '../products/CategoryIntro'
import { BrandSection } from '../products/BrandSection'
import { SpecBrandSection } from '../products/SpecBrandSection'

export function MediumVoltageSection() {
  const category = voltageCategories[1]

  return (
    <>
      <CategoryIntro category={category} id="medium-voltage" />
      {mediumVoltageGroupsWithUserProducts.map((group, i) => {
        const Section = group.displayMode === 'spec' ? SpecBrandSection : BrandSection
        return (
          <Section
            key={group.id}
            brand={group}
            position={i + 1}
            total={mediumVoltageGroupsWithUserProducts.length}
          />
        )
      })}
    </>
  )
}
