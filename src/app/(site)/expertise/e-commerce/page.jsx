import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import EcommCategorySlider from '@/components/expertise/e-comm/EcommCategorySlider'
import EcommCmsCards from '@/components/expertise/e-comm/EcommCmsCards'
import EcommStoreSection from '@/components/expertise/e-comm/EcommStoreSection'
import EcommPriceSection from '@/components/expertise/e-comm/EcommPriceSection'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="Shopify shops with brand energy and conversion focus."
        expertiseHeading={<>Crafting eCommerce <br /> that actually converts.</>}
        btnsLabels={["shopify","brand-driven","conversion"]}
      />
      <EcommCategorySlider />
      <EcommCmsCards/>
      {/* <EcommStoreSection/> */}
      <EcommPriceSection/>
      <WebDevClients/>
      <TicketEffect/>
    </>
  )
}

export default page