"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PixelTrail from "@/components/about/PixelTrail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

const ImageEffect = () => {

  useGSAP(() => {
    const ctx = gsap.context(() => {

      const wrappers = gsap.utils.toArray(".ot-wrapper");

      // hide all except first
      gsap.set(wrappers, { opacity: 0 });
      gsap.set(wrappers[0], { opacity: 1 });

      const splits = wrappers.map((wrapper) => {
        const text = wrapper.querySelector(".ot-text");

        const split = SplitText.create(text, {
          type: "lines",
          linesClass: "line-child"
        });

        // wrap each line (for overflow hidden)
        split.lines.forEach(line => {
          const wrap = document.createElement("div");
          wrap.style.overflow = "hidden";
          line.parentNode.insertBefore(wrap, line);
          wrap.appendChild(line);
        });

        gsap.set(split.lines, { yPercent: 100 });

        return split;
      });

      const TLVI = gsap.timeline({
        scrollTrigger: {
          trigger: ".IVMainCont",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // existing animations
      TLVI.to(".cardVI", { top: "50%" });
      TLVI.to(".cardVI", { rotateY: 90 });

      TLVI.to(".VCI", { opacity: 0 }, "a11");
      TLVI.to(".cardVI", { rotateY: 0 }, "a11");
      TLVI.to(".cardVI", {
        width: "100%",
        height: "100vh",
      });

      // 🔥 text animation
      splits.forEach((split, i) => {
        const lines = split.lines;

        TLVI.to(wrappers[i], { opacity: 1 });

        TLVI.to(lines, {
          yPercent: 0,
          stagger: 0.04,
          ease: "power2.out"
        });

        if (i !== splits.length - 1) {
          TLVI.to(lines, {
            delay: 0.2,
            yPercent: 100,
            stagger: 0.04,
            ease: "power2.in"
          });

          TLVI.to(wrappers[i], { opacity: 0 });
        }
      });

    });

    return () => ctx.revert();
  });

  return (
    <>
      <div className="w-full h-[600vh] relative IVMainCont">
        {/* Cont */}
        <div className="w-full h-screen sticky top-0 left-0 flex text-center flex-col justify-center items-center text_blue scene">

          <p className=" uppercase  font-medium">
            WHY US?
          </p>
          <h2 className="  text-5xl  primary-font  leading-none font-medium">
            5 Reasons
          </h2>
          <h2 className="  text-5xl primary-font  leading-none font-medium">
            To Be With Zerror
          </h2>

          {/* Video & Img  */}
          <div className=" absolute w-[300px] h-[400px] top-[150%] left-1/2 -translate-x-1/2 -translate-y-1/2  cardVI center overflow-hidden ">
            <div className="w-full h-full relative ">
              {/* Img */}
              <div className="w-full h-full absolute top-0 left-0 z-40  VCI ">
                <Image
                fill
                  src={"/images/about/card_img.png"}
                  alt="IMGR"
                  className="cover"
                />
              </div>

              {/* Video */}
              <div className="w-screen h-screen absolute center top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-20  VCV ">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/videos/about_video.mp4"
                  className="cover "
                ></video>
              </div>

              {/* Text-Animater */}
              <div className="w-[100vw] shrink-0 h-screen relative z-80 ">
                <div className="w-full h-fit absolute top-[20%] md:top-[42%] left-[1rem] md:left-[2.5rem] ">
                  <div className="w-full h-fit text-start! font-semibold relative text-white">

                    <div className="OT w-full relative text-5xl capitalize">
                      {[
                        "5+ years of hands-on product and digital execution",
                        "Trusted by 50+ clients across industries",
                        "200+ websites and digital products shipped",
                        "15M+ lines of production-grade code written",
                        "Design × Technology under one roof",
                      ].map((text, i) => (
                        <div
                          key={i}
                          className="ot-wrapper absolute top-0 left-0 w-full md:w-1/2"
                        >
                          <h2 className="ot-text primary-font font-medium">{text}</h2>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageEffect;
