import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PixelTrail from "@/components/about/PixelTrail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ImageEffect = () => {
  useEffect(() => {
    const TLVI = gsap.timeline({
      scrollTrigger: {
        trigger: ".IVMainCont",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      },
    });
    TLVI.to(".cardVI", {
      top: "50%",
      ease: "linear",
    });
    TLVI.to(".cardVI", {
      rotateY: 90,
      ease: "linear",
    });
    TLVI.to(
      ".VCI ",
      {
        opacity: 0,
        ease: "linear",
      },
      "a11"
    );
    TLVI.to(
      ".cardVI",
      {
        rotateY: 0,
        ease: "linear",
      },
      "a11"
    );
    TLVI.to(
      ".cardVI",
      {
        delay: 0.5,
        width: "100%",
        height: "100vh",
        ease: "linear",
      },
      "a11"
    );
    TLVI.to(
      ".OTI1",
      {
        delay: 0.5,
        y: 0,
        ease: "linear"
      },
    );
    TLVI.to(
      ".OTI1",
      {
        delay: 0.5,
        y: '100%',
        ease: "linear"
      },
    );
    TLVI.to(
      ".OTI2",
      {
        y: 0,
        ease: "linear"
      },
    );
    TLVI.to(
      ".OTI2",
      {
        delay: 0.5,
        y: '100%',
        ease: "linear"
      },
    );
    TLVI.to(
      ".OTI3",
      {
        y: 0,
        ease: "linear"
      },
    );
    TLVI.to(
      ".OTI3",
      {
        delay: 0.5,
        y: '100%',
        ease: "linear"
      },
    );

  }, []);

  return (
    <>
      <div className="w-full h-[600vh] relative IVMainCont">
        {/* Cont */}
        <div className="w-full h-screen sticky top-0 left-0 flex text-center flex-col justify-center items-center text_blue scene">

          <p className=" uppercase font-medium">
            WHY US?
          </p>
          <p className="  text-5xl md:text-6xl  leading-none font-semibold">
            5 Reasons
          </p>
          <p className="  text-5xl md:text-6xl  leading-none font-semibold">
            To Be With Zerrorian
          </p>

          {/* Video & Img  */}
          <div className=" absolute w-[300px] h-[400px] top-[150%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-700 cardVI center overflow-hidden ">
            <div className="w-[100vw] h-[100vh]  relative center">
              {/* Img */}
              <div className="w-[100vw] h-[100vh] absolute top-0 left-0 z-40  VCI ">
                <img
                  src={"/images/about/AboutMainBg.jpg"}
                  alt="IMGR"
                  className="w-[100vw] h-[100vh] object-cover  whitespace-nowrap"
                />
              </div>

              {/* Video */}
              <div className="w-[100%] h-[100%] absolute center top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-20  VCV ">
                <video
                  autoPlay
                  muted
                  loop
                  src="/videos/about_video.mp4"
                  className="w-[100%] h-full object-cover "
                ></video>
              </div>

              {/* Text-Animater */}
              <div className="w-[100vw] shrink-0 h-screen relative z-80 ">
                <div className="w-full h-fit absolute top-[60%] left-0 -translate-y-1/2">
                  <div className="w-full h-fit relative text-white">

                    {/* Text-1 */}
                    <div className="w-full OT1 absolute top-0 left-0 ">
                      {/* top */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className="OTI1 font-bold translate-y-[100%]">15 YEAR</p>
                      </div>

                      {/* bottom */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className="OTI1 font-bold translate-y-[100%]">OF EXPERTIES</p>
                      </div>
                    </div>

                    {/* Text-2 */}
                    <div className="w-full OT2 absolute top-0 left-0 ">
                      {/* top */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className="OTI2 font-bold translate-y-[100%]">100+</p>
                      </div>

                      {/* bottom */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className="OTI2 font-bold translate-y-[100%]">AWARDS</p>
                      </div>
                    </div>

                    {/* Text-3 */}
                    <div className="w-full OT3 absolute top-0 left-0 ">
                      {/* top */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className=" OTI3 font-bold translate-y-[100%]">1500+</p>
                      </div>

                      {/* bottom */}
                      <div className="w-full h-[4rem] md:h-[6rem] leading-none overflow-hidden text-5xl md:text-8xl flex text-center justify-center items-center" >
                        <p className=" OTI3 font-bold translate-y-[100%]">PROJECTS</p>
                      </div>
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
