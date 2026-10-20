import React from "react";
import DiceCanvas from "@/components/about/DiceCanvas";
import HeroSection from "@/components/about/HeroSection";
import ImageEffect from "@/components/about/ImageEffect";
import InfoSection from "@/components/about/InfoSection";
import OurTeam from "@/components/about/OurTeam";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { createMetadata } from "@/lib/seo";

gsap.registerPlugin(ScrollTrigger);

export const metadata = createMetadata({
  title: "About | Zerror Studios",
  description: "Zerror Studios is a design studio in Mumbai, started in 2022. Meet the team behind the brands.",
  path: "/about",
});

const about = () => {

  return (
    <>
      <HeroSection />
      <ImageEffect  alt="Dynamic Graphic"/>
      <InfoSection />
      <OurTeam />

    </>
  );
};

export default about;
