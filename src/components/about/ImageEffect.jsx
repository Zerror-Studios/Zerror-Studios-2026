"use client";
import Image from "next/image";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const ImageEffect = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flip_card_bg",
        start: "top top",
        endTrigger: ".txt_scroll_bg",
        end: "top top",
        scrub: true,
      },
    });

    tl.to(".cardVI", { rotateY: 90 });

    tl.to(".VCI", { opacity: 0 }, "a11");
    tl.to(".cardVI", { rotateY: 0 }, "a11");
    tl.to(".cardVI", {
      width: "100%",
      height: "100vh",
    });

    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".txt_scroll_bg",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const textLines = gsap.utils.toArray(".animate-text");
    textLines.forEach((text, i) => {
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
        <div className="flip_card_bg relative">
          <div className="  w-full h-screen sticky top-0 center scene">
            <div className="absolute w-75 h-100   cardVI center overflow-hidden">
              <div className="w-full h-full relative">
                {/* Img */}
                <div className="w-full h-full absolute top-0 left-0 z-40 VCI">
                  <Image
                    fill
                    src={"/images/about/card_img.png"}
                    alt="IMGR"
                    className="cover"
                  />
                </div>

                {/* Video */}
                <div className="w-screen h-screen absolute center top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-20 VCV">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/videos/about_video.mp4"
                    className="cover"
                  ></video>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[50vh]"></div>

          <div className="txt_scroll_bg padding py-0! w-full h-[300vh] relative z-[80] ">
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
