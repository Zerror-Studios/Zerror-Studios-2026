import BrandingDisciplines from '@/components/expertise/branding/BrandingDisciplines'
import BrandingWhyUs from '@/components/expertise/branding/BrandingWhyUs'
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
            <BrandingDisciplines/>
      <WebDevClients/>
            <TicketEffect />
        </>
    )
}

export default page
