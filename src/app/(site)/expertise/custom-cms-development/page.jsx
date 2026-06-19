import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import React from 'react'

const page = () => {
  return (
    <>
         <DetailedExpertiseHero
        expertiseName="Custom CMS Development"
        expertiseImage="/images/expertisePage/e-comm/hero_img.png"
        expertiseDescription="Flexible, scalable, and built from the ground up to match your workflows, your team, and your goals"
        expertiseHeading={<>Develop faster. <br /> Manage content <br /> effortlessly.</>}
      />
    </>
  )
}

export default page