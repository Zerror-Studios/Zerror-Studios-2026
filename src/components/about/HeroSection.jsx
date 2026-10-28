"use client";
import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import { dropHiddenBreaks } from "@/lib/splitText";
import useDevice from "../hooks/useDevice";
import Image from "next/image";
import dynamic from "next/dynamic";
import { preload } from "react-dom";

// three.js is heavy: load the dice in its own chunk so the hero text renders and animates first
const DiceCanvas = dynamic(() => import("./DiceCanvas"), { ssr: false });
import PixelGridCanvas from "@/components/common/PixelGridCanvas";
import Signature from "./Signature";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  // Start downloading the dice model and lighting from the HTML head, while JS is still loading
  preload("/models/Tyrus_dice.glb", { as: "fetch", crossOrigin: "anonymous" });
  preload("/hdri/studio_small_03_1k.hdr", { as: "fetch", crossOrigin: "anonymous" });

  const { isDesktop } = useDevice();
  const [isRevealedL, setIsRevealedL] = useState(false);
  const [isRevealedR, setIsRevealedR] = useState(false);
  // The dice mounts after the heading intro: setting up three.js and decoding the
  // lighting file blocks the main thread, which made the intro stutter.
  const [showDice, setShowDice] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".ImgEffectContR",
      start: "top 60%",
      onEnter: () => setIsRevealedR(true),
      onLeaveBack: () => setIsRevealedR(false),
    });
  }, []);

  useGSAP(() => {
    dropHiddenBreaks(".heading_split");
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
    // Files are already downloading (preloads above); start the dice in the next idle moment
    tl.call(() => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => setShowDice(true), { timeout: 500 });
      else setTimeout(() => setShowDice(true), 0);
    });
  });

  return (
    <div className=" content_box opacity-0 about_hero_paren  w-full relative  padding pt-0!">
      {/* Dice sticks and animates through the hero, then scrolls away before the signature section */}
      <div className="w-full sticky top-0 h-screen z-100 center pointer-events-none">
        {showDice && <DiceCanvas />}
      </div>

      <div className="w-full aboutTitle flex -mt-[100vh] pt-hero pb-section h-[65vh] md:h-[80vh]  items-center  ">
        <h1 className="heading_split text_blue md:w-[80%]">
          A studio for brands that refuse to look average.
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-1/2  space-y-5">
          <div className="md:w-[80%] ">
            <p className="heading_split h4 text_blue">
              For founders who dream in beta.
            </p>
          </div>

          <div className="w-full ImgEffectContL  aspect-5/6  overflow-hidden relative">
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
        <div className=" w-full mt-block md:w-1/2 flex flex-col text_blue items-end ">
          {/* cont*/}
          <div className=" w-full md:w-1/2 flex flex-col gap-3">
            {/* Text */}
            <h2 className="heading_split  h4">
              Why we exist
            </h2>
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
      <div className="h-screen center w-full pointer-events-none" aria-hidden="true">
        <Signature className="w-60 md:hidden translate-y-44 relative z-10" />

      </div>
    </div>
  );
};

export default HeroSection;
