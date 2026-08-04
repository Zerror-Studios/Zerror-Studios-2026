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
  title: "About Zerror Studios — Named After a Standard",
  description: "Zerror means zero error. A Mumbai studio where designers and developers build side by side, so nothing gets lost between idea and launch.",
  path: "/about",
});

const about = () => {

  return (
    <>
      <HeroSection />
      <ImageEffect />
      <InfoSection />
      <OurTeam />

    </>
  );
};

export default about;
