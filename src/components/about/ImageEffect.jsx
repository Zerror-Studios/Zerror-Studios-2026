"use client";
import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const ImageEffect = () => {
  const flipCardBgRef = useRef(null);
  const txtScrollBgRef = useRef(null);
  const cardVIRef = useRef(null);
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

    textRefs.current.forEach((text, i) => {
      textTl.to(text, { opacity: 1, transform: "translateY(0)" });
    });
  });

  return (
    <>
      <div className="w-full relative ">
        <div className="sticky top-0 h-screen center text-center text_blue">
          <div className="">
            <p data-para-effect className="uppercase font-medium">WHY US?</p>
            <h2 data-para-effect className="text-5xl primary-font leading-none font-medium">
              5 Reasons
            </h2>
            <h2 data-para-effect className="text-5xl primary-font leading-none font-medium">
              To Be With Zerror
            </h2>
          </div>
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

          <div ref={txtScrollBgRef} className="txt_scroll_bg  padding py-0! w-full h-[300vh] relative z-[80] ">
            <div className="sticky top-0 h-screen flex justify-center gap-y-12 flex-col w-full pointer-events-none">
              {[
                {
                  heading: "5+ Years",
                  desc: "Hands-on product and digital execution",
                },
                {
                  heading: "100+ Clients",
                  desc: "Trusted by businesses across industries",
                },
                {
                  heading: "500+ Products",
                  desc: "Websites and digital products shipped",
                },
                {
                  heading: "30M+ Lines",
                  desc: "Production-grade code written",
                },
                {
                  heading: "Design × Tech",
                  desc: "Everything integrated under one roof",
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
