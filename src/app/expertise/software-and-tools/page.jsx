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

const heroIcons = {
  "Headless CMS": [
    { src: "/images/expertisePage/custom-cms/icons/cms_headless.png", top: "18%", left: "10%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/custom-cms/icons/cms_content.png", top: "22%", right: "12%", size: "w-16 md:w-24", rotate: "15deg" },
    { src: "/images/expertisePage/custom-cms/icons/cms_media.png", bottom: "25%", left: "15%", size: "w-24 md:w-32", rotate: "-8deg" },
    { src: "/images/expertisePage/custom-cms/icons/cms_webhook.png", bottom: "30%", right: "16%", size: "w-20 md:w-28", rotate: "10deg" },
    { src: "/images/expertisePage/custom-cms/icons/cms_schema.png", top: "48%", left: "5%", size: "w-16 md:w-24", rotate: "-5deg" },
  ],
  "Content Ops": [
    { src: "/images/expertisePage/custom-cms/icons/ops_workflow.png", top: "20%", left: "12%", size: "w-20 md:w-28", rotate: "15deg" },
    { src: "/images/expertisePage/custom-cms/icons/ops_team.png", top: "15%", right: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/custom-cms/icons/ops_approval.png", bottom: "28%", left: "18%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/custom-cms/icons/ops_version.png", bottom: "24%", right: "12%", size: "w-20 md:w-28", rotate: "-15deg" },
    { src: "/images/expertisePage/custom-cms/icons/ops_timer.png", top: "45%", right: "8%", size: "w-18 md:w-24", rotate: "8deg" },
  ],
  "Scalable Admin": [
    { src: "/images/expertisePage/custom-cms/icons/admin_dashboard.png", top: "16%", left: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/custom-cms/icons/admin_users.png", top: "20%", right: "10%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/custom-cms/icons/admin_server.png", bottom: "26%", left: "12%", size: "w-20 md:w-28", rotate: "18deg" },
    { src: "/images/expertisePage/custom-cms/icons/admin_speed.png", bottom: "28%", right: "16%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/custom-cms/icons/admin_shield.png", top: "50%", left: "8%", size: "w-18 md:w-24", rotate: "6deg" },
  ]
};

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
        heroIcons={heroIcons}
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
      <CustomWhyCms />
      <CustomTechinicalCards />
      <CustomsCmsExplore />
      <WebDevClients />
      <TicketEffect/>
    </>
  )
}

export default page
