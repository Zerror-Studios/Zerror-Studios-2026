import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import EcommPlatformCompare from '@/components/expertise/e-comm/platformCompare/EcommPlatformCompare'
import EcommCmsCards from '@/components/expertise/e-comm/EcommCmsCards'
import EcommStoreSection from '@/components/expertise/e-comm/EcommStoreSection'
import EcommPriceSection from '@/components/expertise/e-comm/EcommPriceSection'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import WebDevProcess from '@/components/expertise/website-development/WebDevProcess'
import { ECOMMERCE_PROCESS } from '@/components/expertise/website-development/processSections/serviceProcesses'
import TicketEffect from '@/components/home/TicketEffect'

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Shopify stores and Zcom | Zerror Studios",
  description: "Online stores designed and built in Mumbai, on Shopify or on Zcom, our own platform with AI built in. Indian payments and GST ready.",
  path: "/expertise/ecommerce",
});

const heroVideo = "/videos/expertise/e_comm.mp4"

const heroIcons = {
  "Shopify": [
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
        expertiseHeading={<>Stores built to sell. <br /> And to look like you.</>}
        btnsLabels={["Shopify", "Zcom", "Checkout"]}
        heroIcons={heroIcons}
        introHeading={<>A store should make buying feel easy, and true to the brand.</>}
        introText="We design and build the whole store, down to a checkout that doesn't lose the sale."
        videoSrc={heroVideo}
        features={[
          { label: "Revenue growth (YoY)", value: "+350%" },
          { label: "Traffic growth", value: "+165%" },
          { label: "Average order value", value: "↑" },
          { label: "Repeat purchases", value: "↑" },
          { label: "Online stores launched", value: "80+" },
          { label: "Platforms", value: "Shopify + Zcom" },
        ]}
      />
      <EcommPlatformCompare />
      <EcommCmsCards />
      <EcommPriceSection />
      <WebDevClients />
    </>
  )
}

export default page
