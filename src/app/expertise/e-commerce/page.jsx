import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import EcommCategorySlider from '@/components/expertise/e-comm/EcommCategorySlider'
import EcommCmsCards from '@/components/expertise/e-comm/EcommCmsCards'
import EcommStoreSection from '@/components/expertise/e-comm/EcommStoreSection'
import EcommPriceSection from '@/components/expertise/e-comm/EcommPriceSection'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "eCommerce Development & the Zcom Platform — Zerror Studios",
  description: "Commerce built to sell and scale. Shopify when it fits — Zcom, our own platform, when your business has outgrown templates.",
  path: "/expertise/e-commerce",
});

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/a14fb47e-f79b-40cc-9dae-3fe784bcf05b/playlist.m3u8"

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "provider": { "@id": "https://www.zerrorstudios.com/#org" },
        "serviceType": ["eCommerce development", "custom eCommerce platform development", "Shopify development"]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DetailedExpertiseHero
        expertiseName="Commerce that earns the cart"
        expertiseHeading={<>Commerce built to sell. <br /> And scale.</>}
        btnsLabels={["Storefront UX", "Checkout", "Zcom"]}
        introHeading={<>A store should make buying feel effortless — natural, fast, and true to the brand people came for.</>}
        introText="We build commerce that balances storytelling, discovery, and a checkout that never fumbles the sale."
        videoSrc={heroVideo}
        supportingText="From product cards to cart behaviour, every detail is shaped around shopper confidence — fewer
drop-offs, smoother paths to purchase, and buyers who return."
        features={[
          { label: "Revenue growth", value: "" },
          { label: "YoY", value: "+350%" },
          { label: "Traffic growth", value: "+165%" },
          { label: "Average order value", value: "↑" },
          { label: " Repeat purchases", value: "↑" },
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
