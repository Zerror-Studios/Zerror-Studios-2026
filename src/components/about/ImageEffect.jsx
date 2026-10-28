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
    const mm = gsap.matchMedia();

    // Desktop only. Mobile is a static full-screen video with the numbers on top.
    mm.add("(min-width: 768px)", () => {
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

    // 2. Then the five reasons, one by one
    textRefs.current.forEach((text) => {
      textTl.to(text, { opacity: 1, transform: "translateY(0)" });
    });
    });
  });

  return (
    <>
      {/* -mt-[100vh] overlaps HeroSection's trailing spacer (keeps the dice sticky until this reaches top) */}
      <div className="w-full relative -mt-[100vh]">
        {/* Sticky signature layer with snake background — the video card slides over it */}
        <div className="canvas_space sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          <BackgroundSnake />
          <Signature className="w-60 translate-y-44 hidden md:block relative z-10" />
        </div>

        {/* Sticky background scene */}
        <div ref={flipCardBgRef} className="flip_card_bg relative">
          <div className="w-full h-screen md:sticky top-0 center">
            {/* Full screen on mobile; small card that expands on desktop */}
            <div ref={cardVIRef} className="w-full h-screen md:w-75 md:h-100 cardVI center overflow-hidden relative">
              <div className="absolute w-screen h-screen center">

                {/* Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/videos/about_video.mp4"
                  className="cover abt_vid brightness-50 md:brightness-100"></video>
              </div>
            </div>
          </div>

          {/* Mobile: one screen pulled up over the video so the numbers sit on it */}
          <div ref={txtScrollBgRef} className="txt_scroll_bg  padding py-0! w-full h-screen max-md:-mt-[100vh] md:h-[500vh] relative z-[80] ">
            {/* Mobile: heading top left, numbers in a 2-col grid at the bottom. Desktop: centred column */}
            <div className="md:sticky top-0 h-screen flex flex-col justify-between md:justify-center py-section w-full pointer-events-none">
              {/* Heading: top left on mobile; centred overlay on desktop, shown and hidden before the stats */}
              <div
                ref={headingRef}
                className="flex flex-col text-white md:absolute md:inset-0 md:items-center md:justify-center md:text-center md:opacity-0"
              >
                <p className="uppercase font-medium">WHY US?</p>
                <h2 data-para-effect className="font-medium">
                  In Numbers
                </h2>
              </div>
              <div className="grid grid-cols-[60%_40%] gap-x-4 gap-y-8 md:flex md:flex-col md:gap-y-12">
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
                  className={`animate-text text-left md:text-center md:max-w-2xl md:mx-auto md:translate-y-5 md:opacity-0 ${i === 4 ? "col-span-2" : ""}`}
                >
                  {/* .h2 is 3rem on desktop, same as .h3, so only mobile gets bigger */}
                  <p data-para-effect className="h2 text-white">
                    {item.heading}
                  </p>
                  <p className="para-lg text-white">
                    {item.desc}
                  </p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ImageEffect;
