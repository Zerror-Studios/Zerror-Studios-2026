import CustomsCmsExplore from '@/components/expertise/customCMS/CustomsCmsExplore'
import CustomTechinicalCards from '@/components/expertise/customCMS/CustomTechinicalCards'
import CustomWhyCms from '@/components/expertise/customCMS/CustomWhyCms'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Custom Software & CMS Development — Zerror Studios",
  description: "Dashboards, content systems and workflows built around how your team works. Software shaped to the business — never the other way around.",
  path: "/expertise/custom-software-development",
});

const heroVideo = "/videos/expertise/custom_cms.mp4"

const page = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "provider": { "@id": "https://www.zerrorstudios.com/#org" },
        "serviceType": ["custom software development", "headless CMS development", "admin dashboard development"]
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
        expertiseName="Software shaped to the business"
        expertiseHeading={
          <>
            Built around <br /> how you work.
          </>
        }
        btnsLabels={["Headless CMS", "Content Ops", "Scalable Admin"]}
        introHeading={<>Off-the-shelf tools are fine — right up until your business stops being off-the-shelf.</>}
        introText="We build content systems, dashboards and workflows that fit your operation exactly"
        videoSrc={heroVideo}
        supportingText="When teams start working around their software instead of with it, growth has outrun the tools. We
build the version that keeps up — and keeps scaling."
        features={[
          { label: "Publishing speed", value: "+67%" },
          { label: "Editor workflow steps", value: "-38%" },
          { label: "Reusable content blocks", value: "+74%" },
          { label: "Admin usability score", value: "95%" },
          { label: "Content model flexibility", value: "+61%" },
          { label: "Approval cycle time", value: "-42%" },
          { label: "API response time", value: "< 220ms" },
          { label: "Role-based access coverage", value: "100%" },
        ]}
      />
      <CustomWhyCms/>
      <CustomTechinicalCards/>
      <CustomsCmsExplore/>
      <WebDevClients/>
      <TicketEffect/>
    </>
  )
}

export default page
