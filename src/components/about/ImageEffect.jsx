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
        // endTrigger: txtScrollBgRef.current,
        end: "top top",
        scrub: true,
      },
    });

    tl.to(cardVIRef.current, {
      width: "100vw",
      height: "100vh",
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
                    className="cover"></video>
                    </div>
            </div>
          </div>

          <div ref={txtScrollBgRef} className="txt_scroll_bg padding py-0! w-full h-[300vh] relative z-[80] ">
            <div className="sticky top-0 h-screen flex justify-center gap-y-5 flex-col w-full pointer-events-none">
              {[
                "5+ years of hands-on product and digital execution",
                "Trusted by 50+ clients across industries",
                "200+ websites and digital products shipped",
                "15M+ lines of production-grade code written",
                "Design × Technology under one roof",
              ].map((text, i) => (
                <h2
                  key={i}
                  ref={(el) => (textRefs.current[i] = el)}
                  className="animate-text translate-y-5 text-3xl md:text-5xl max-w-2xl text-white  primary-font font-medium opacity-0"
                >
                  {text}
                </h2>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ImageEffect;
