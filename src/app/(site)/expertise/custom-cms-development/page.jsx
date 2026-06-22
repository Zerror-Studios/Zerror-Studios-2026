import CustomsIconsPop from '@/components/expertise/customCMS/CustomsIconsPop'
import CustomTechinicalCards from '@/components/expertise/customCMS/CustomTechinicalCards'
import DetailedExpertiseHero from '@/components/expertise/DetailedExpertiseHero'
import React from 'react'

const page = () => {
  return (
    <>
      <DetailedExpertiseHero
        expertiseName="content first. future ready."
        expertiseHeading={
          <>
            Custom CMS solutions <br /> built for growth.
          </>
        }
        btnsLabels={["headless cms", "content strategy", "enterprise scalability"]}
      />
      <CustomTechinicalCards/>
      <CustomsIconsPop/>
    </>
  )
}

export default page