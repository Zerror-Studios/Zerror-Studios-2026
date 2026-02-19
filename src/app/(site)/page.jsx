import About from "@/components/home/About";
import Clients from "@/components/home/Clients";
import Hero from "@/components/home/Hero";
import OurWork from "@/components/home/OurWork";
import Services from "@/components/home/Services";
import TicketEffect from "@/components/home/TicketEffect";
import WebPageSchema from "@/components/seo/WebPageSchema";

export const metadata = {
  title: {
    default: "Zerror Studios | GSAP & Next.js Creative Web Studio",
    template: "%s | Zerror Studios",
  },

  description:
    "Zerror Studios is a creative web studio building GSAP-powered animated websites, Next.js applications, immersive Three.js experiences, and custom eCommerce solutions for bold brands.",

  keywords: [
    "Zerror Studios",
    "creative web studio",
    "GSAP websites",
    "GSAP animations",
    "Next.js agency",
    "Three.js websites",
    "interactive websites",
    "custom website development",
    "ecommerce website development",
    "headless ecommerce",
    "digital experience studio",
    "animated brand websites",
    "creative development agency",
  ].join(", "),

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.zerrorstudios.com/",
  },

  openGraph: {
    title: "Zerror Studios | GSAP & Next.js Creative Web Studio",
    description:
      "We design and develop high-performance, animation-driven websites using GSAP, Next.js, and Three.js for brands that want to stand out.",
    url: "https://www.zerrorstudios.com/",
    siteName: "Zerror Studios",
    images: [
      {
        url: "https://www.zerrorstudios.com/logo.svg",
        width: 1200,
        height: 630,
        alt: "Zerror Studios – Creative Web Studio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zerror Studios | GSAP & Next.js Creative Web Studio",
    description:
      "GSAP-powered animated websites, Next.js development, and immersive digital experiences for modern brands.",
    images: ["https://www.zerrorstudios.com/og.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <WebPageSchema
        name="Zerror Studios"
        description="Zerror Studios is a creative web studio specializing in GSAP-powered animations, Next.js development, immersive Three.js websites, and custom eCommerce solutions."
        url="https://www.zerrorstudios.com/"
      />
      <Hero />
      <About />
      <OurWork />
      <Services />
      <Clients />
      <TicketEffect />
    </>
  );
}
