"use client";
import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import useDevice from "../hooks/useDevice";
import Image from "next/image";
import DiceCanvas from "./DiceCanvas";
import PixelGridCanvas from "@/components/common/PixelGridCanvas";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  const { isDesktop } = useDevice();
  const [isRevealedL, setIsRevealedL] = useState(false);
  const [isRevealedR, setIsRevealedR] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".ImgEffectContR",
      start: "top 60%",
      onEnter: () => setIsRevealedR(true),
      onLeaveBack: () => setIsRevealedR(false),
    });
  }, []);

  useGSAP(() => {
    const heading_split = SplitText.create(".heading_split", {
      type: "lines",
      linesClass: "split-line",
    });

    [...heading_split.lines].forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.set([heading_split.lines], { yPercent: 100, x: 10 });

    const tl = gsap.timeline({
      delay: 0.5,
    });
    tl.to(".content_box", {
      opacity: 1,
      duration: 0.01,
    });
    tl.to(
      heading_split.lines,
      {
        yPercent: 0,
        x: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.05,
      },
      "<"
    );
    // Left image reveals once the heading intro finishes, not on scroll
    tl.call(() => setIsRevealedL(true));
  });

  return (
    <div className=" content_box opacity-0 about_hero_paren  w-full relative  padding pt-0!">
      {/* Dice sticks and animates through the hero, then scrolls away before the signature section */}
      <div className="w-full sticky top-0 h-screen z-100 center pointer-events-none">
        <DiceCanvas />
      </div>

      <div className="w-full aboutTitle flex -mt-[100vh] py-44 max-sm:pb-20  ">
        <h1 className=" heading_split text-5xl md:text-8xl   leading-none  primary-font text_blue md:w-[80%]">
          A studio for brands that refuse to look average.
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-1/2  space-y-5">
          <div className="md:w-[80%] ">
            <h2 className=" heading_split primary-font text_blue text-3xl">
              For founders who dream in beta.
            </h2>
          </div>

          <div className="w-full ImgEffectContL relative  aspect-5/6  overflow-hidden relative">
            <PixelGridCanvas
              isActive={!isRevealedL}
              color="#ffffff"
              boxSize={30}
              duration={1.5}
              className="absolute inset-0 w-full h-full pointer-events-none z-40"
            />
            <Image fill src={'/images/about/gen_img_5.png'} alt="l-Img" className="cover" />
          </div>
        </div>

        {/* Right */}
        <div className=" w-full mt-16 md:w-1/2 flex flex-col text_blue items-end ">
          {/* cont*/}
          <div className=" w-full md:w-1/2 flex flex-col gap-3">
            {/* Text */}
            <h3 className=" heading_split  uppercase text-xl font-semibold">
              Why we exist
            </h3>
            <div className="w-full flex flex-col gap-3">
              <p className=" heading_split leading-tight">
                Zerror. Zero error. Naming a studio after perfection is a risk. Every launch has to keep the promise.
                That is the point.
              </p>
              <p className=" heading_split leading-tight">
                We started in 2022 to close the gap between the people who design and the people who build. Today one
                team designs, builds, launches and markets the brand. What gets imagined is what goes live.
              </p>
            </div>

            {/* Img */}
            <div className="w-full ImgEffectContR aspect-5/6 mt-5 bg-[#002bba] overflow-hidden relative">
              <PixelGridCanvas
                isActive={!isRevealedR}
                color="#ffffff"
                boxSize={30}
                duration={1.5}
                className="absolute inset-0 w-full h-full pointer-events-none z-40"
              />
              <Image fill src={'/images/about/gen_img_4.png'} alt="l-Img" className="cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Extends the dice's sticky range by one screen; ImageEffect overlaps this with -mt-[100vh],
          so the dice un-sticks exactly when the signature section reaches top top */}
      <div className="h-screen w-full pointer-events-none" aria-hidden="true" />
    </div>
  );
};

export default HeroSection;
