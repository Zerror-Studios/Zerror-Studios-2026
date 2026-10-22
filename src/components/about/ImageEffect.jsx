"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BackgroundSnake from "../animation/BackgroundSnake";
import Signature from "./Signature";
gsap.registerPlugin(ScrollTrigger);

const ImageEffect = () => {
  const flipCardBgRef = useRef(null);
  const txtScrollBgRef = useRef(null);
  const cardVIRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: flipCardBgRef.current,
        start: "top top",
        endTrigger: txtScrollBgRef.current,
        end: "top top",
        scrub: true,
      },
    });

    tl.to(cardVIRef.current, {
      width: "100vw",
      height: "100vh",
    });

     gsap.to(".abt_vid",{
      filter:"brightness(0.5)",
      scrollTrigger: {
        trigger: txtScrollBgRef.current,
        start: "top top",
        end: "15% top",
        scrub: true,
      },
    });
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: txtScrollBgRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // 1. "Why us / In Numbers" fades up into the centre, holds, then fades up and out
    textTl
      .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "power2.out" })
      .to({}, { duration: 0.5 })
      .to(headingRef.current, { opacity: 0, y: -40, ease: "power2.in" });

    // 2. Then the five reasons come in one by one
    textRefs.current.forEach((text) => {
      textTl.to(text, { opacity: 1, transform: "translateY(0)" });
    });
  });

  return (
    <>
      {/* -mt-[100vh] overlaps HeroSection's trailing spacer (keeps the dice sticky until this reaches top) */}
      <div className="w-full relative -mt-[100vh]">
        {/* Sticky signature layer with snake background — the video card slides over it */}
        <div className="canvas_space sticky top-0 h-screen w-full flex justify-center items-end pb-20 overflow-hidden">
          <BackgroundSnake />
          <Signature className="w-60 relative z-10" />
        </div>

        {/* Sticky background scene */}
        <div ref={flipCardBgRef} className="flip_card_bg relative">
          <div className="  w-full h-screen sticky top-0 center ">
            <div ref={cardVIRef} className=" w-75 h-100   cardVI center overflow-hidden relative  ">
              <div className="absolute w-screen h-screen center">

                {/* Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/videos/about_video.mp4"
                  className="cover abt_vid brightness-100"></video>
              </div>
            </div>
          </div>

          <div ref={txtScrollBgRef} className="txt_scroll_bg  padding py-0! w-full h-[500vh] relative z-[80] ">
            <div className="sticky top-0 h-screen flex justify-center gap-y-12 flex-col w-full pointer-events-none">
              {/* Heading: centred overlay, shown and hidden before the stats */}
              <div
                ref={headingRef}
                className="absolute inset-0 center flex-col text-center text-white opacity-0"
              >
                <p className="uppercase font-medium">WHY US?</p>
                <h2 className="text-5xl primary-font leading-none font-medium">
                  In Numbers
                </h2>
              </div>
              {[
                {
                  heading: "Since 2022",
                  desc: "Founded in Mumbai",
                },
                {
                  heading: "100+",
                  desc: "Clients",
                },
                {
                  heading: "200+",
                  desc: "Websites and products",
                },
                {
                  heading: "80+",
                  desc: "Online stores",
                },
                {
                  heading: "One team",
                  desc: "Design, build, marketing",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (textRefs.current[i] = el)}
                  className="animate-text translate-y-5 max-w-2xl mx-auto text-center opacity-0"
                >
                  <h3 className="text-3xl md:text-5xl primary-font  text-white ">
                    {item.heading}
                  </h3>
                  <p className="text-base md:text-xl text-white">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ImageEffect;
