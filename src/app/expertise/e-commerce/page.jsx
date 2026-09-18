import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import EcommPlatformCompare from '@/components/expertise/e-comm/platformCompare/EcommPlatformCompare'
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

const heroIcons = {
  "Storefront UX": [
    { src: "/images/expertisePage/e-comm/icons/ecomm_storefront.png", top: "18%", left: "10%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_grid.png", top: "22%", right: "12%", size: "w-16 md:w-24", rotate: "15deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_bag.png", bottom: "25%", left: "15%", size: "w-24 md:w-32", rotate: "-8deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_star.png", bottom: "30%", right: "16%", size: "w-20 md:w-28", rotate: "10deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_filter.png", top: "48%", left: "5%", size: "w-16 md:w-24", rotate: "-5deg" },
  ],
  "Checkout": [
    { src: "/images/expertisePage/e-comm/icons/ecomm_checkout.png", top: "20%", left: "12%", size: "w-20 md:w-28", rotate: "15deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_card.png", top: "15%", right: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_lock.png", bottom: "28%", left: "18%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_bolt.png", bottom: "24%", right: "12%", size: "w-20 md:w-28", rotate: "-15deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_truck.png", top: "45%", right: "8%", size: "w-18 md:w-24", rotate: "8deg" },
  ],
  "Zcom": [
    { src: "/images/expertisePage/e-comm/icons/ecomm_zcom.png", top: "16%", left: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_rocket.png", top: "20%", right: "10%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_analytics.png", bottom: "26%", left: "12%", size: "w-20 md:w-28", rotate: "18deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_api.png", bottom: "28%", right: "16%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/e-comm/icons/ecomm_scale.png", top: "50%", left: "8%", size: "w-18 md:w-24", rotate: "6deg" },
  ]
};

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
        heroIcons={heroIcons}
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
      <EcommPlatformCompare />
      <EcommCmsCards />
      <EcommPriceSection />
      <WebDevClients />
      <TicketEffect/>
    </>
  )
}

export default page
