import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import EcommCategorySlider from '@/components/expertise/e-comm/EcommCategorySlider'
import EcommCmsCards from '@/components/expertise/e-comm/EcommCmsCards'
import EcommStoreSection from '@/components/expertise/e-comm/EcommStoreSection'
import EcommPriceSection from '@/components/expertise/e-comm/EcommPriceSection'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/a14fb47e-f79b-40cc-9dae-3fe784bcf05b/playlist.m3u8"

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="Commerce experiences designed to sell"
        expertiseHeading={<>Crafting eCommerce <br /> that actually converts.</>}
        btnsLabels={["Shopify ecomm", "Storefront UX", "Conversion"]}
        introHeading={<>A store should make buying feel natural, fast, and aligned with the brand people came for.</>}
        introText="We build commerce experiences that balance storytelling, product discovery, checkout flow, and performance."
        videoSrc={heroVideo}
        supportingText="From product cards to cart behavior, every detail is shaped around shopper confidence, fewer drop-offs, and a smoother path to purchase."
        features={[
          { label: "Add-to-cart rate", value: "+39%" },
          { label: "Checkout drop-off", value: "-28%" },
          { label: "Product discovery speed", value: "+52%" },
          { label: "Average order value", value: "+24%" },
          { label: "Mobile cart completion", value: "+47%" },
          { label: "Storefront load time", value: "< 1.8s" },
          { label: "Repeat purchase intent", value: "+31%" },
          { label: "Conversion readiness score", value: "96" },
        ]}
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
