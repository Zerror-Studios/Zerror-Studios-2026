import BrandingDisciplines from '@/components/expertise/branding/BrandingDisciplines'
import BrandingHero from '@/components/expertise/branding/BrandingHero'
import BrandingWhyUs from '@/components/expertise/branding/BrandingWhyUs'
import TicketEffect from '@/components/home/TicketEffect'
import React from 'react'

const page = () => {
    return (
        <>
            <BrandingHero />
            <BrandingWhyUs />
            <BrandingDisciplines/>
            <TicketEffect />
        </>
    )
}

export default page