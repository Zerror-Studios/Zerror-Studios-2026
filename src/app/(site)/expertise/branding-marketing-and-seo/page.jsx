import BrandingDisciplines from '@/components/expertise/branding/BrandingDisciplines'
import BrandingWhyUs from '@/components/expertise/branding/BrandingWhyUs'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/eb0dedc2-f474-4c0c-8efc-57751e3e5202/playlist.m3u8"

const page = () => {
    return (
        <>
          <DetailedExpertiseHero
        expertiseName="Brand systems with search-ready clarity"
        expertiseHeading={<>Building brands <br /> people remember.</>}
        btnsLabels={["Strategy", "Identity", "SEO"]}
        introHeading={<>A strong brand does more than look consistent. It makes every message easier to trust, find, and remember.</>}
        introText="We shape positioning, identity, content direction, and organic visibility into one clear system for growth."
        videoSrc={heroVideo}
        supportingText="From visual identity to SEO structure, we build brands that feel distinct and work across campaigns, landing pages, social touchpoints, and search journeys."
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
