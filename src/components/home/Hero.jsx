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

    const split = SplitText.create(".mob_split_hero_title", {
      type: "words",
    });

    const first_text_words = split.words.slice(0, 5);
    const text_words = split.words.slice(5);

    gsap.from(first_text_words, {
      yPercent: 100,
      opacity: 0,
      delay:0.5,
      stagger: 0.03,
      ease: "expo.out",
    })

    gsap.from(text_words, {
      yPercent: 100,
      opacity: 0,
      stagger: 0.03,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".hero_mob_txt",
        start: "10% top",
        end: "bottom 0%",
        scrub: true,
        // markers: true,
      },
    });
  });


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
        transform: "translateX(-300vw) translateY(-50%)",
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
  });


  return (
    <div className=" hero_paren w-full relative">

      <div className="site-background site-background-desktop hidden lg:block fixed bg_blue top-0 left-0   w-full h-screen z-[-1]">
        <HeroScene />
      </div>
      <div className="site-background site-background-mobile lg:hidden fixed bg_blue top-0 left-0   w-full h-screen z-[-1] bg_blue "></div>

      <div className=" max-sm:hidden txt_slider_paren w-full h-[400vh]  ">
        <div className="w-full h-screen top-0 sticky overflow-hidden">
          <div className=" z-[2] hero_scroll_txt w-full translate-x-[30vw] absolute top-[80%] -translate-y-1/2 text-white  md:whitespace-nowrap left-0  ">
            <p className=" split_hero_title text-8xl md:text-[12vw] font-bold origin-bottom-left tracking-tight">We design and build thoughtful digital experiences that go beyond visuals.</p>
          </div>
        </div>
      </div>

      <div className=" hero_mob_txt  w-full overflow-hidden  md:hidden! pt-[60vh]! padding pb-32! text-white  ">
        <p className=" mob_split_hero_title  text-[18vw] leading-[20vw] md:text-[12vw] font-bold origin-bottom-left tracking-tight">We design and build thoughtful digital experiences that go beyond visuals.</p>
      </div>


      <div className="w-full   padding text-white ">
        <div className="w-full  space-y-16 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
          <div className="">
            <p className='capitalize pfn  text-5xl md:text-6xl    leading-none'>about us</p>
          </div>
          <div className=" max-sm:hidden text-xs pt-4">
            <p className='font-thin'>Who</p>
            <p className='font-thin'>We Are?</p>
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
