import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import WebDevHero from '@/components/expertise/website-development/WebDevHero'
import WebDevProjectsSwiper from '@/components/expertise/website-development/WebDevProjectsSwiper'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

import { createMetadata } from "@/lib/seo";
import WebDevProcess from '@/components/expertise/website-development/WebDevProcess'
import WebDevInEveryBuild from '@/components/expertise/website-development/WebDevInEveryBuild'
import { WEBSITE_PROCESS } from '@/components/expertise/website-development/processSections/websiteProcess'

export const metadata = createMetadata({
  title: "Website design and development in Mumbai | Zerror Studios",
  description: "Custom websites designed and built by one team. GSAP and scroll-led motion, Next.js, and SEO and AI search built in.",
  path: "/expertise/websites",
});

const heroVideo = "/videos/expertise/website.mp4"

const heroIcons = {
  "Design": [
    { src: "/images/expertisePage/website-development/icons/ui_figma.png", top: "18%", left: "10%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/website-development/icons/ui_cursor.png", top: "22%", right: "12%", size: "w-16 md:w-24", rotate: "15deg" },
    { src: "/images/expertisePage/website-development/icons/ui_wireframe.png", bottom: "25%", left: "15%", size: "w-24 md:w-32", rotate: "-8deg" },
    { src: "/images/expertisePage/website-development/icons/ui_components.png", bottom: "30%", right: "16%", size: "w-20 md:w-28", rotate: "10deg" },
    { src: "/images/expertisePage/website-development/icons/ui_prototype.png", top: "48%", left: "5%", size: "w-16 md:w-24", rotate: "-5deg" },
  ],
  "Motion": [
    { src: "/images/expertisePage/website-development/icons/motion_keyframe.png", top: "20%", left: "12%", size: "w-20 md:w-28", rotate: "15deg" },
    { src: "/images/expertisePage/website-development/icons/motion_sparkles.png", top: "15%", right: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/website-development/icons/motion_easing.png", bottom: "28%", left: "18%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/website-development/icons/motion_play.png", bottom: "24%", right: "12%", size: "w-20 md:w-28", rotate: "-15deg" },
    { src: "/images/expertisePage/website-development/icons/motion_3dcube.png", top: "45%", right: "8%", size: "w-18 md:w-24", rotate: "8deg" },
  ],
  "Build": [
    { src: "/images/expertisePage/website-development/icons/dev_code.png", top: "16%", left: "14%", size: "w-24 md:w-32", rotate: "-10deg" },
    { src: "/images/expertisePage/website-development/icons/dev_terminal.png", top: "20%", right: "10%", size: "w-24 md:w-32", rotate: "12deg" },
    { src: "/images/expertisePage/website-development/icons/dev_react.png", bottom: "26%", left: "12%", size: "w-20 md:w-28", rotate: "18deg" },
    { src: "/images/expertisePage/website-development/icons/dev_git.png", bottom: "28%", right: "16%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/website-development/icons/dev_api.png", top: "50%", left: "8%", size: "w-18 md:w-24", rotate: "6deg" },
  ],
  "Search": [
    { src: "/images/expertisePage/branding/icons/seo_search.png", top: "18%", left: "12%", size: "w-20 md:w-28", rotate: "-10deg" },
    { src: "/images/expertisePage/branding/icons/seo_ai.png", top: "20%", right: "12%", size: "w-20 md:w-28", rotate: "12deg" },
    { src: "/images/expertisePage/branding/icons/seo_chart.png", bottom: "26%", left: "16%", size: "w-24 md:w-32", rotate: "8deg" },
    { src: "/images/expertisePage/branding/icons/seo_score.png", bottom: "28%", right: "14%", size: "w-20 md:w-28", rotate: "-12deg" },
    { src: "/images/expertisePage/branding/icons/seo_link.png", top: "48%", right: "6%", size: "w-18 md:w-24", rotate: "6deg" },
  ]
};

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
        expertiseHeading={<>Moves like a story. <br />Loads like nothing.</>}
        btnsLabels={["Design", "Motion", "Build", "Search"]}
        heroIcons={heroIcons}
        introHeading={<>You get about three seconds before someone decides you're worth their time. We make them count.</>}
        introText="Motion with meaning, detail that rewards attention, and speed that never asks anyone to wait."
        videoSrc={heroVideo}
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
      <WebDevProjectsSwiper heading={<>See it move.</>} />
      <WebDevInEveryBuild />
      <WebDevProcess {...WEBSITE_PROCESS} />
      <WebDevClients />
    </>
  )
}

export default page
