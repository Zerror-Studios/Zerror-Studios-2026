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
        expertiseName="E-commerce"
        expertiseImage="/images/expertisePage/e-comm/hero_img.png"
        expertiseDescription="We provide a powerful eCommerce dashboard with greater flexibility and advanced features to help you manage your store effortlessly."
        expertiseHeading={<>Build to sell. designed <br /> to grow.</>}
      />
      <EcommCategorySlider />
      <EcommCmsCards/>
      <EcommStoreSection/>
      <EcommPriceSection/>
      <WebDevClients/>
      <TicketEffect/>
    </>
  )
}

export default page