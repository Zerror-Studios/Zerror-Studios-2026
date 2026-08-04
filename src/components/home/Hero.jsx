"use client";
import React from "react";
import HeroScene from "@/components/Scene/HeroScene.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import { useGSAP } from "@gsap/react";
import useDevice from "../hooks/useDevice";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  const { isMobile, isDesktop } = useDevice();

  useGSAP(() => {

    if (window.innerWidth > 1020) return

    gsap.to(
      ".mob_split_hero_title",
      {
        opacity: 1,
        ease: "power2.out"
      }
    );

    const Mob_split_lines = SplitText.create(".mob_split_hero_title", {
      type: "lines",
    });

    gsap.from(Mob_split_lines.lines, {
      yPercent: 50,
      opacity: 0,
      delay: 0.5,
      stagger: 0.03,
      ease: "expo.out",
    })

    gsap.to(
      [".abt_paren", ".site-background"],
      {
        opacity: 1,
        delay: 1,
        ease: "power2.out"
      }
    );
    gsap.to(
      ".hero_paren",
      {
        backgroundColor: "transparent",
        delay: 2,
      }
    );

  }, [isMobile]);

  useGSAP(() => {
    if (window.innerWidth < 1020) return

    const split_hero_title = SplitText.create(".split_hero_title", { type: "words, chars" });

    gsap.to(
      ".split_hero_title",
      {
        opacity: 1,
        ease: "power2.out"
      }
    );
    gsap.to(
      [".abt_paren", ".site-background"],
      {
        opacity: 1,
        delay: 1,
        ease: "power2.out"
      }
    );
    gsap.to(
      ".hero_paren",
      {
        backgroundColor: "transparent",
        delay: 2,
      }
    );

    const firstChars = split_hero_title.chars.slice(0, 11);
    gsap.fromTo(
      firstChars,
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: .8,
        ease: "expo.out",
        stagger: 0.03,
        delay: .5,
      }
    );

    var sliderTween = gsap.timeline({
      scrollTrigger: {
        trigger: '.txt_slider_paren',
        start: 'top top',
        end: "bottom bottom",
        scrub: true,
        // markers: true,
      }
    })
    if (window.innerWidth > 750) {
      sliderTween.to(".hero_scroll_txt", {
        transform: "translateX(-320vw) translateY(-50%)",
        top: "50%",
        ease: "linear",
      })
    } else {
      // sliderTween.to(".hero_scroll_txt", {
      //   transform: "translateX(-3350px) translateY(-50%)",
      //   top: "50%",
      //   ease: "linear",
      // })
    }
    const text_chars = split_hero_title.chars.slice(11);
    text_chars.forEach((char) => {
      gsap.fromTo(
        char,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "expo.out",
          duration: 0.6,
          scrollTrigger: {
            trigger: char,
            containerAnimation: sliderTween,
            start: "left right",
            toggleActions: "play none none reverse",
          },
        });
    });


    gsap.to([".site-background", ".drop_ltr_z", ".works_paren_header"], {
      scrollTrigger: {
        trigger: ".work_paren",
        start: "bottom bottom",
        end: "bottom bottom",
        scrub: true
      },
      display: "none"
    })
  }, [isDesktop]);


  return (
    <div className=" hero_paren bg-[#002bba] w-full relative min-h-screen">

      <div className="site-background opacity-0 site-background-desktop  fixed bg_blue top-0 left-0   w-full h-screen z-[1]">
        <HeroScene />
      </div>

      {isDesktop && (
        <div className=" max-sm:hidden txt_slider_paren relative z-10 w-full h-[400vh]  ">
          <div className="w-full h-screen top-0 sticky overflow-hidden">
            <div className=" z-[2] hero_scroll_txt w-full translate-x-[30vw] absolute top-[80%] -translate-y-1/2 text-white  md:whitespace-nowrap left-0  ">
              <p className=" split_hero_title opacity-0 text-8xl md:text-[12vw] font-bold origin-bottom-left tracking-tight">We design and build thoughtful digital experiences that go beyond visuals.</p>
            </div>
          </div>
        </div>
      )}

      {isMobile && (
        <div className=" hero_mob_txt  w-full relative z-10 overflow-hidden  md:hidden! pt-[calc(50svh)]! padding pb-[33vh]! text-white  ">
          <p className=" mob_split_hero_title opacity-0  text-[15.5vw] leading-[15vw]   md:text-[12vw] font-bold origin-bottom-left ">We design and build thoughtful digital experiences that go beyond visuals.</p>
        </div>
      )}


      <div className=" abt_paren opacity-0 relative z-10  w-full   padding py-0! text-white ">
        <div className="w-full  space-y-16 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
          <div className="">
            <h2 data-para-effect className='capitalize primary-font  text-5xl  leading-none'>about us</h2>
          </div>
 
            <div className=" max-sm:hidden text-xs pt-4">
              <p className='font-thin'>Systems. Structure.</p>
              <p className='font-thin'>Precision. Intent.</p>
            </div>
          <div className=" text-3xl  md:pl-2">
            <h3 data-para-effect className="secondary-font">
              <span className='opacity-0  max-sm:hidden pointer-events-none'>...............</span>
              Zerror is a design-led studio operating where design, technology and scalability meet. Great ideas
              often get lost between the two disciplines — few teams can do both, fewer still do it fast. We built
              Zerror to erase that gap, so ideas don't just survive. They shine.
            </h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
