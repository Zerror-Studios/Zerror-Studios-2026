import CustomsCmsExplore from '@/components/expertise/customCMS/CustomsCmsExplore'
import CustomTechinicalCards from '@/components/expertise/customCMS/CustomTechinicalCards'
import CustomWhyCms from '@/components/expertise/customCMS/CustomWhyCms'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const heroVideo = "/videos/expertise/custom_cms.mp4"

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="Custom CMS for fast-moving content teams"
        expertiseHeading={
          <>
            Custom CMS solutions <br /> built for growth.
          </>
        }
        btnsLabels={["Headless CMS", "Content Ops", "Scalable Admin"]}
        introHeading={<>Your CMS should feel simple for editors and powerful for the business behind it.</>}
        introText="We create custom content systems that make publishing faster, governance cleaner, and future changes easier to manage."
        videoSrc={heroVideo}
        supportingText="From schema design to editorial workflows, we build CMS architecture around the way your team actually ships content, pages, products, and campaigns."
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
