"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import CmsDashboard from "./cmsDashboard/CmsDashboard";

gsap.registerPlugin(ScrollTrigger);

const CustomsCmsExplore = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cms-dashboard-wrapper", {
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions:"play none none reverse"
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg_blue mb-10 md:mb-24"
    >

      <div className="py-10! md:py-24! space-y-12 " style={{ position: "relative", zIndex: 10 }}>

        <div className="w-full   padding pt-0! text-white ">
          <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
            <div className="">
              <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Explore what your CMS can do </h2>
            </div>
            <div className="text-xs max-sm:hidden pt-4">
            </div>
            <div className=" text-3xl  md:pl-2">
              <h3 data-para-effect className="">
                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                From content to commerce, our CMS gives you complete control to create, manage, and scale—without limitations.
              </h3>
            </div>
          </div>
        </div>

        <div className=" padding md:p-0! cms-dashboard-wrapper">
          <CmsDashboard />
        </div>
      </div>

    </section>
  );
};

export default CustomsCmsExplore;