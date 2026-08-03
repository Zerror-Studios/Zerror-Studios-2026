import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import WebDevExperiencesCards from '@/components/expertise/website-development/WebDevExperiencesCards'
import WebDevHero from '@/components/expertise/website-development/WebDevHero'
import WebDevProcessScroller from '@/components/expertise/website-development/WebDevProcessScroller'
import WebDevProjectsSwiper from '@/components/expertise/website-development/WebDevProjectsSwiper'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Website Design & Development — Zerror Studios",
  description: "Websites designed to be felt and engineered to last. Custom-built, motion-led and fast — for brands that want people to stop, stay and remember.",
  path: "/expertise/website-development",
});

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/2b3c385c-35e7-406c-bb11-8c7d71d90001/playlist.m3u8"

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "provider": { "@id": "https://www.zerrorstudios.com/#org" },
        "serviceType": ["custom website development", "GSAP website development", "Three.js development"]
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
        expertiseName="Websites worth stopping for"
        expertiseHeading={<>Designed to be felt.<br /> Built to last.</>}
        btnsLabels={["UI/UX", "Motion", "Development"]}
        introHeading={<>You get about three seconds before someone decides you're worth their time. We make them count.</>}
        introText="Motion with meaning, detail that rewards attention, and speed that never asks anyone to wait."
        videoSrc={heroVideo}
        supportingText="Every site is custom — designed and built by one team, so what you approve is exactly what ships.
No templates. Nothing lost in translation."
        features={[
          { label: "Bounce rate", value: "-41%" },
          { label: "Load time", value: "< 1.6s" },
          { label: "Engagement duration", value: "+78%" },
          { label: "Conversion uplift", value: "+35%" },
          { label: "Return visits", value: "+46%" },
          { label: "Mobile responsiveness score", value: "98%" },
          { label: "Design system reusability", value: "+62%" },
          { label: "PageSpeed Insights", value: "94" },
        ]}
      />
      <WebDevProjectsSwiper />
      <WebDevExperiencesCards />
      <WebDevProcessScroller />
      <WebDevClients />
      <TicketEffect />
    </>
  )
}

export default page
