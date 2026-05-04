import WebPageSchema from '@/components/seo/WebPageSchema'
import WorkListing from '@/components/work/WorkListing'
import React from 'react'

export const metadata = {
  title: "Work | Zerror Studios",
  description:
    "Explore Zerror Studios' portfolio of creative web projects, featuring GSAP animations, Next.js builds, Three.js experiences, and high-performance digital products.",

  keywords: [
    "Zerror Studios work",
    "web design portfolio",
    "GSAP animation projects",
    "Next.js projects",
    "Three.js websites",
    "creative developer portfolio",
    "interactive web experiences",
    "modern web development agency",
  ].join(", "),

  alternates: {
    canonical: "https://www.zerrorstudios.com/work",
  },

  openGraph: {
    title: "Work | Zerror Studios",
    description:
      "Dive into Zerror Studios’ portfolio showcasing immersive websites, animations, and modern web experiences.",
    url: "https://www.zerrorstudios.com/work",
    siteName: "Zerror Studios",
    type: "website",
     images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Zerror Studios – Creative Web Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Work | Zerror Studios",
    description:
      "Explore our latest web projects powered by GSAP, Next.js, and Three.js.",
    images: ["/og.png"],
  },
};

const page = () => {
  return (
    <>
      <WebPageSchema
        name="Work | Zerror Studios"
        description="Explore Zerror Studios' portfolio of web projects, featuring interactive experiences, animations, and modern development technologies."
        url="https://www.zerrorstudios.com/work"
        />
        <h1 className='opacity-0 pointer-events-none'>Explore Latest Work</h1>
      <WorkListing />
    </>
  )
}

export default page