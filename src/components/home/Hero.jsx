"use client";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import HeroScene from "@/components/Scene/HeroScene.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  useGSAP(() => {

    const split_hero_title = SplitText.create(".split_hero_title", { type: "words, chars" });

    gsap.fromTo(
      ".site-background",
      { "--scene-mix": 0 },
      {
        "--scene-mix": 1,
        duration: 2,
        ease: "power2.out"
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
        transform: "translateX(-270vw) translateY(-50%)",
        top: "50%",
        ease: "linear",
      })
    } else {
      sliderTween.to(".hero_scroll_txt", {
        transform: "translateX(-2950px) translateY(-50%)",
        top: "50%",
        ease: "linear",
      })
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
  });


  return (
    <div className=" hero_paren w-full relative">

      <div className="site-background site-background-desktop hidden lg:block fixed bg_blue top-0 left-0   w-full h-screen z-[-1]">
        <HeroScene />
      </div>
      <div className="site-background site-background-mobile lg:hidden fixed bg_blue top-0 left-0   w-full h-screen z-[-1] bg_blue "></div>

      <div className=" txt_slider_paren w-full h-[400vh]  ">
        <div className="w-full h-screen top-0 sticky overflow-hidden">
          <div className=" z-[2] hero_scroll_txt w-full translate-x-[30vw] absolute top-[80%] -translate-y-1/2 text-white  whitespace-nowrap left-0  ">
            <p className=" split_hero_title text-9xl md:text-[12vw] font-bold origin-bottom-left tracking-tight">We design and build thoughtful digital experiences that go beyond visuals.</p>
          </div>
        </div>
      </div>


      <div className="w-full   padding text-white ">
        <div className="w-full  space-y-24 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
          <div className="">
            <p className='capitalize pfn  text-6xl   leading-none'>about us</p>
          </div>
          <div className="text-xs pt-4">
            <p className=''>Who</p>
            <p className=''>We Are?</p>
          </div>
          <div className="capitalize    text-4xl  pl-2">
            <p className=" max-sm:hidden font-medium leading-11"> <span className='opacity-0 pointer-events-none'>...............</span> We exist to end that trade-off.  At Zerror, design and technology move as one — from first thought to final build. Every decision is intentional. Every detail measured. Every release stable.</p>
          </div>
          <div className="capitalize    text-2xl">
            <p className=" md:hidden font-medium "> We exist to end that trade-off.  At Zerror, design and technology move as one — from first thought to final build. Every decision is intentional. Every detail measured. Every release stable.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
