import Exp_HeroSection from '@/components/expertise/Exp_HeroSection'
import Our_Services from '@/components/expertise/Our_Services'
import WebPageSchema from '@/components/seo/WebPageSchema';
import React from 'react'

export const metadata = {
  title: "Expertise",
  description:
    "Discover Zerror Studios’ expertise in GSAP animations, Next.js development, Three.js experiences, headless CMS, and custom eCommerce solutions.",

  keywords: [
    "Zerror Studios expertise",
    "GSAP animations",
    "Next.js development",
    "Three.js websites",
    "custom CMS development",
    "headless ecommerce",
    "interactive website development",
    "creative web technology",
  ].join(", "),

  alternates: {
    canonical: "https://www.zerrorstudios.com/expertise",
  },

  openGraph: {
    title: "Expertise | Zerror Studios",
    description:
      "From GSAP animations to Next.js and Three.js, explore the technologies and capabilities behind our immersive digital experiences.",
    url: "https://www.zerrorstudios.com/expertise",
    siteName: "Zerror Studios",
    type: "website",
    images: ["/og.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Expertise | Zerror Studios",
    description:
      "Explore Zerror Studios’ expertise in animation-driven web experiences and modern development stacks.",
    images: ["/og.png"],
  },
};


const page = () => {
  return (
    <>
      <WebPageSchema
        name="Expertise | Zerror Studios"
        description="Explore Zerror Studios’ expertise in GSAP animations, Next.js development, Three.js experiences, headless CMS, and custom eCommerce solutions."
        url="https://www.zerrorstudios.com/expertise"
      />
      <Exp_HeroSection />
      <Our_Services />
    </>
  )
}

export default page