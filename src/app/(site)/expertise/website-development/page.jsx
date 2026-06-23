import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import WebDevExperiencesCards from '@/components/expertise/website-development/WebDevExperiencesCards'
import WebDevHero from '@/components/expertise/website-development/WebDevHero'
import WebDevProcessScroller from '@/components/expertise/website-development/WebDevProcessScroller'
import WebDevProjectsSwiper from '@/components/expertise/website-development/WebDevProjectsSwiper'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const heroVideo = "https://vz-f76b55f9-7b8.b-cdn.net/2b3c385c-35e7-406c-bb11-8c7d71d90001/playlist.m3u8"

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="Motion websites built for product teams"
        expertiseHeading={<>Designed to feel. <br /> Built to perform.</>}
        btnsLabels={["UI/UX", "Motion", "Development"]}
        introHeading={<>Your website is not just a page. It is the stage for your brand, product, and user journey.</>}
        introText="We design and develop fast, expressive web experiences that guide attention, explain value, and turn visitors into action."
        videoSrc={heroVideo}
        supportingText="Every interaction should feel effortless. We combine product thinking, visual systems, animation, and front-end engineering to make websites that look sharp and perform under pressure."
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
