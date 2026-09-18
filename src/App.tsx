import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ProductDrawerProvider } from './context/ProductDrawerContext'
import { CustomCursor } from './components/ui/CustomCursor'
import { CustomScrollbar } from './components/ui/CustomScrollbar'
import { ProductDrawer } from './components/ui/ProductDrawer'
import { Header } from './components/layout/Header'
import { SideNavigation } from './components/layout/SideNavigation'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { CompanySection } from './components/company/CompanySection'
import { VisionMissionSection } from './components/company/VisionMissionSection'
import { PortfolioSection } from './components/products/PortfolioSection'
import { LowVoltageSection } from './components/products/LowVoltageSection'
import { MediumVoltageSection } from './components/medium-voltage/MediumVoltageSection'
import { ContactSection } from './components/contact/ContactSection'

export default function App() {
  useSmoothScroll()

  return (
    <ProductDrawerProvider>
      <div className="noise" aria-hidden="true" />
      <CustomCursor />
      <CustomScrollbar />
      <Header />
      <SideNavigation />
      <ProductDrawer />

      <main>
        <HeroSection />
        <CompanySection />
        <VisionMissionSection />
        <PortfolioSection />
        <LowVoltageSection />
        <MediumVoltageSection />
        <ContactSection />
      </main>

      <Footer />
    </ProductDrawerProvider>
  )
}
