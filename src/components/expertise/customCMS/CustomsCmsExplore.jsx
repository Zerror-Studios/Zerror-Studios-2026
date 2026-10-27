"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import CmsDashboard from "./Dashboard/CmsDashboard";
import SectionHeader from "@/components/common/SectionHeader";
import Br from "@/components/common/Br";

gsap.registerPlugin(ScrollTrigger);

const CustomsCmsExplore = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {

    gsap.from(".cms-dashboard-wrapper", {
      y: 80,
      opacity: 0,
      scale: 0.96,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      },
    });
  }, { scope: sectionRef });

  return (
    <section
    data-hide-header
      ref={sectionRef}
      className="relative overflow-hidden bg_blue"
    >

      <div className="py-section! space-y-block " style={{ position: "relative", zIndex: 10 }}>

        <div className="w-full   padding pt-0! text-white ">
          <SectionHeader
              title={<>See one in <Br /> action</>}
              lines={["A sample dashboard.", "Click around."]}
          >
              Add a product, check a payment, see who your customers are. Yours is built around the screens your team uses every day.
          </SectionHeader>
        </div>

        <div className="ui-mock padding md:p-0! cms-dashboard-wrapper">
          <div className="md:w-[80%] h-[90vh] mx-auto">
            <CmsDashboard />
          </div>
        </div>
      </div>

    </section>
  );
};

export default CustomsCmsExplore;