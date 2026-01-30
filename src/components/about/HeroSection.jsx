import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const rows = 20;
  const cols = 20;
  const totalCells = rows * cols;
  const gridRefl = useRef(null);
  const gridRefR = useRef(null);

  useEffect(() => {
    const cells = gridRefl.current.children;
    const cells2 = gridRefR.current.children;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ImgEffectContL",
        start: "top 50%",
        toggleActions: "play none none reverse",
        //   markers: true,
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
    }, 'a1');
    tl.to(cells2, {
      opacity: 0,
      duration: 0.5,
      stagger: {
        each: 0.001,
        from: "random",
      },
      ease: "expo.out",
    }, 'a1');

    return () => {
      tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <div className=" about_hero_paren  w-full   padding">

      <div className="w-full aboutTitle flex py-44  ">
        <p className="text-8xl leading-none capitalize pfn text_blue">
          We believe a great user experience is not just intuitive it’s
          entertaining. Because clarity is good, but delight is better.
        </p>
      </div>

      <div className="w-full flex">
        <div className="w-1/2  space-y-10">
          <div className="w-[60%] ">
            <p className="pfn text_blue text-3xl">
              We make stuff look good. We make it work better. Creative.
              Scalable. Reliable. Fresh. Tech-first. Entertaining.
            </p>
          </div>

          <div className="w-full ImgEffectContL  aspect-5/6  overflow-hidden relative">
            <div
              ref={gridRefl}
              style={{
                gridTemplateColumns: "repeat(20,1fr)"
              }}
              className=" absolute pointer-events-none top-0 left-0 w-full h-full  z-40 grid"
            >
              {Array.from({ length: totalCells }).map((_, i) => (
                <div key={i} className="bg-white opacity-100" />
              ))}
            </div>

            <img src={'/images/about/AboutMainBg.jpg'} alt="l-Img" className="cover" />

          </div>

        </div>

        {/* Right */}
        <div className="w-1/2 flex flex-col text_blue items-end ">
          {/* cont*/}
          <div className="w-1/2 flex flex-col gap-3">
            {/* Text */}
            <p className=" uppercase text-lg  font-semibold">
              Why we exist
            </p>
            <div className="w-full flex flex-col gap-3">
              <p className=" font-medium leading-tight">
                We’re here to help you stand out—even in a crowded digital
                world. From turning napkin sketches into fully functional
                platforms to moving fast without breaking your brand, we focus
                on building experiences that scale smoothly and entertain, not
                just inform or convert.
              </p>
              <p className=" font-medium leading-tight">
                While most teams do either design or development, few truly
                understand both—and even fewer do it fast. We’re here to change
                that.
              </p>
            </div>

            {/* Img */}
            <div className="w-full aspect-5/6 mt-12 bg-[#002BBA] overflow-hidden relative">
              <div
                ref={gridRefR}
                style={{
                  gridTemplateColumns: "repeat(10,1fr)"
                }}
                className=" absolute pointer-events-none top-0 left-0 w-full h-full  z-40 grid"
              >
                {Array.from({ length: totalCells }).map((_, i) => (
                  <div key={i} className="bg-white w-full aspect-square opacity-100" />
                ))}
              </div>
              <img src={'/images/about/AboutMainBg.jpg'} alt="l-Img" className="cover" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default HeroSection;
