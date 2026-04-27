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

      <p className=" split_t text-5xl md:text-8xl capitalize primary-font relative z-10 ">
        Design and technology, unified as one system
      </p>

      <div className="md:pl-44">
        <p className="split_t text-2xl md:text-4xl  relative z-10">
          We create scalable, performance-driven digital systems where design and engineering operate as one — built for clarity, adaptability, and long-term impact.
        </p>
      </div>
    </div>
  );
};

export default Exp_HeroSection;
