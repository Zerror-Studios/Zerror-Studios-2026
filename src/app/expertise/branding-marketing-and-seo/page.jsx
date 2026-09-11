import BrandingDisciplines from '@/components/expertise/branding/BrandingDisciplines'
import BrandingWhyUs from '@/components/expertise/branding/BrandingWhyUs'
import BrandingWorkflowSection from '@/components/expertise/branding/BrandingWorkflowSection'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Branding, Marketing & SEO — Zerror Studios",
  description: "Identity, content and search — including AI search — built as one system, so being found and being remembered work together.",
  path: "/expertise/branding-marketing-and-seo",
});

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/eb0dedc2-f474-4c0c-8efc-57751e3e5202/playlist.m3u8"

const heroIcons = {
  "Strategy": [
    { src: "/images/expertisepage/branding/icons/brand_target.png", top: "18%", left: "10%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisepage/branding/icons/brand_compass.png", top: "22%", right: "12%", size: "w-16 md:w-24", rotate: "15deg" },
    { src: "/images/expertisepage/branding/icons/brand_growth.png", bottom: "25%", left: "15%", size: "w-24 md:w-32", rotate: "-8deg" },
    { src: "/images/expertisepage/branding/icons/brand_bulb.png", bottom: "30%", right: "16%", size: "w-20 md:w-28", rotate: "10deg" },
    { src: "/images/expertisepage/branding/icons/brand_map.png", top: "48%", left: "5%", size: "w-16 md:w-24", rotate: "-5deg" },
  ],
  "Identity": [
    { src: "/images/expertisepage/branding/icons/brand_palette.png", top: "20%", left: "12%", size: "w-20 md:w-28", rotate: "15deg" },
    { src: "/images/expertisepage/branding/icons/brand_typography.png", top: "15%", right: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisepage/branding/icons/brand_logo.png", bottom: "28%", left: "18%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisepage/branding/icons/brand_book.png", bottom: "24%", right: "12%", size: "w-20 md:w-28", rotate: "-15deg" },
    { src: "/images/expertisepage/branding/icons/brand_diamond.png", top: "45%", right: "8%", size: "w-18 md:w-24", rotate: "8deg" },
  ],
  "SEO": [
    { src: "/images/expertisepage/branding/icons/seo_search.png", top: "16%", left: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisepage/branding/icons/seo_chart.png", top: "20%", right: "10%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisepage/branding/icons/seo_ai.png", bottom: "26%", left: "12%", size: "w-20 md:w-28", rotate: "18deg" },
    { src: "/images/expertisepage/branding/icons/seo_link.png", bottom: "28%", right: "16%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisepage/branding/icons/seo_score.png", top: "50%", left: "8%", size: "w-18 md:w-24", rotate: "6deg" },
  ]
};

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "provider": { "@id": "https://www.zerrorstudios.com/#org" },
        "serviceType": ["brand identity design", "SEO services", "AI search optimisation"]
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
        expertiseName="Found first. Remembered longer. "
        expertiseHeading={<>Be found. <br /> Be remembered.</>}
        btnsLabels={["Strategy", "Identity", "SEO"]}
        heroIcons={heroIcons}
        introHeading={<>A brilliant website nobody finds is a well-kept secret. We make sure yours isn't.</>}
        introText="Identity, content and search built as one system — each making the others work harder."
        videoSrc={heroVideo}
        supportingText="A strong brand makes every message easier to trust, easier to find, easier to recall. We shape all
three together, because separately they underperform."
        features={[
          { label: "Brand recall lift", value: "+58%" },
          { label: "Organic visibility", value: "+72%" },
          { label: "Messaging clarity", value: "+64%" },
          { label: "Campaign consistency", value: "96%" },
          { label: "Keyword opportunity map", value: "120+" },
          { label: "Identity system coverage", value: "+68%" },
          { label: "Content engagement", value: "+44%" },
          { label: "Search-ready page score", value: "93" },
        ]}
      />
      <BrandingWhyUs />
      <BrandingDisciplines />
      <BrandingWorkflowSection />
      <WebDevClients />
      {/* <TicketEffect /> */}
    </>
  )
}

export default page
