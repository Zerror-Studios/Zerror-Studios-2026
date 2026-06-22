import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import WebDevClients from '@/components/expertise/website-development/WebDevClients'
import WebDevExperiencesCards from '@/components/expertise/website-development/WebDevExperiencesCards'
import WebDevHero from '@/components/expertise/website-development/WebDevHero'
import WebDevProcessScroller from '@/components/expertise/website-development/WebDevProcessScroller'
import WebDevProjectsSwiper from '@/components/expertise/website-development/WebDevProjectsSwiper'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="Scroll-stopping sites. Motion-first experiences. "
        expertiseHeading={<>Designed to feel. <br /> Built to perform.</>}
        btnsLabels={["UI/UX","Motion","development"]}
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