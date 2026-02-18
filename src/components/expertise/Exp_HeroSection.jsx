"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import React from "react";

gsap.registerPlugin(SplitText);

const Exp_HeroSection = () => {

  useGSAP(() => {
    const splitText = SplitText.create(".split_t", { type: "lines" });

    gsap.fromTo(splitText.lines, {
      yPercent: 50,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      ease: "expo.out",
      delay: .5,
      stagger: 0.03,
    })
  })

  return (
    <div className=" noise-bg  relative w-full h-screen bg_blue flex flex-col py-24! md:py-0 justify-between   padding md:pb-32! md:grid grid-cols-2 md:items-end   text-white z-90">

      <p className=" split_t text-5xl md:text-8xl capitalize pfn relative z-10 ">
        Our services bridge the gap between Design development
      </p>

      <div className="md:pl-52">
        <p className=" split_t text-2xl md:text-4xl font-medium relative z-10">
          We design and develop websites that are more than just
          good-looking—they’re engineered for speed, clarity, and
          conversion.
        </p>
      </div>
    </div>
  );
};

export default Exp_HeroSection;
