import BrandingDisciplines from '@/components/expertise/branding/BrandingDisciplines'
import BrandingWhyUs from '@/components/expertise/branding/BrandingWhyUs'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const page = () => {
    return (
        <>
          <DetailedExpertiseHero
        expertiseName="Not just seen. felt"
        expertiseHeading={<>Building brands <br /> people feel.</>}
        btnsLabels={["strategy","identity","guidelines"]}
      />
            <BrandingWhyUs />
            <BrandingDisciplines/>
            <TicketEffect />
        </>
    )
}

export default page