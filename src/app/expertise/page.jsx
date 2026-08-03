import Exp_HeroSection from '@/components/expertise/Exp_HeroSection'
import Our_Services from '@/components/expertise/Our_Services'
import React from 'react'
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/expertise");

const page = () => {
  return (
    <>
      <Exp_HeroSection />
      <Our_Services />
    </>
  )
}

export default page