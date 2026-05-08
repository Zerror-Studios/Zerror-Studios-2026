"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import useDevice from "../hooks/useDevice";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
  const { isMobile, isDesktop } = useDevice();
  const rows = 20;
  const cols = 20;
  const totalCells = rows * cols;
  const gridRefl = useRef(null);
  const gridRefR = useRef(null);

  useGSAP(() => {
    if (!gridRefl.current || !gridRefR.current) return;

    const cells = gridRefl.current.children;
    const cells2 = gridRefR.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ImgEffectContL",
        start: "top 50%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(cells, {
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.001,
        from: "random",
      },
      ease: "expo.out",
    }, "a1");

    tl.to(cells2, {
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.001,
        from: "random",
      },
      ease: "expo.out",
    }, "a1");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isDesktop]);

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
    <div className=" about_hero_paren  w-full   padding">

      <div className="w-full aboutTitle flex py-44 max-sm:pb-20  ">
        <h1 className=" split_t text-5xl md:text-8xl  leading-none capitalize primary-font text_blue">
          We believe a great user experience is not just intuitive it’s
          entertaining. Because clarity is good, but delight is better.
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row">
        <div className=" w-full md:w-1/2  space-y-5 md:space-y-10">
          <div className="md:w-[80%] ">
            <h2 className=" split_t primary-font text_blue text-3xl">
              We make stuff look good. We make it work better. Creative.
              Scalable. Reliable. Fresh. Tech-first. Entertaining.
            </h2>
          </div>

          <div className="w-full ImgEffectContL relative  aspect-5/6  overflow-hidden relative">

            {isDesktop && (
              <div
                ref={gridRefl}
                style={{
                  gridTemplateColumns: "repeat(20,1fr)"
                }}
                className=" hidden absolute pointer-events-none top-0 left-0 w-full h-full  z-40 lg:grid"
              >
                {Array.from({ length: totalCells }).map((_, i) => (
                  <div key={i} className="bg-white opacity-100" />
                ))}
              </div>
            )}

            <Image fill src={'/images/about/gen_img_5.png'} alt="l-Img" className="cover" />

          </div>

        </div>

        {/* Right */}
        <div className=" w-full mt-16 md:w-1/2 flex flex-col text_blue items-end ">
          {/* cont*/}
          <div className=" w-full md:w-1/2 flex flex-col gap-3">
            {/* Text */}
            <h3 className=" split_t  uppercase text-xl font-medium">
              Why we exist
            </h3>
            <div className="w-full flex flex-col gap-3">
              <p className=" split_t leading-tight">
                We’re here to help you stand out—even in a crowded digital
                world. From turning napkin sketches into fully functional
                platforms to moving fast without breaking your brand, we focus
                on building experiences that scale smoothly and entertain, not
                just inform or convert.
              </p>
              <p className=" split_t leading-tight">
                While most teams do either design or development, few truly
                understand both—and even fewer do it fast. We’re here to change
                that.
              </p>
            </div>

            {/* Img */}
            <div className="w-full aspect-5/6 mt-4 md:mt-12 bg-[#0000FF] overflow-hidden relative">
              {isDesktop && (
                <div
                  ref={gridRefR}
                  style={{
                    gridTemplateColumns: "repeat(10,1fr)"
                  }}
                  className=" hidden absolute pointer-events-none top-0 left-0 w-full h-full  z-40 lg:grid"
                >
                  {Array.from({ length: totalCells }).map((_, i) => (
                    <div key={i} className="bg-white w-full aspect-square opacity-100" />
                  ))}
                </div>
              )}
            <Image fill src={'/images/about/gen_img_4.png'} alt="l-Img" className="cover" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HeroSection;
