"use client";
import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const WorkDetailGallery = () => {


  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.to(".mob_1", {
        y: -300,
        ease: "linear",
        scrollTrigger: {
          trigger: ".mob_1",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".mob_2", {
        y: -300,
        ease: "linear",
        scrollTrigger: {
          trigger: ".mob_2",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".mob_3", {
        y: -300,
        ease: "linear",
        scrollTrigger: {
          trigger: ".mob_3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const clipImgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".clip_img_effect",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      clipImgTl.fromTo(
        ".clip_img_effect",
        { clipPath: "inset(50%)", opacity: 0 },
        {
          clipPath: "inset(0%)",
          opacity: 1,
          duration: 1,
          ease: "expo.out",
        }
      );

      clipImgTl.fromTo(
        ".clip_img_effect_img",
        { scale: 1.5 },
        {
          scale: 1,
          duration: 1,
          ease: "expo.out",
        },
        "<"
      );

    });

    return () => ctx.revert(); // 🔥 CLEANUP FIX
  });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);


  return (
    <>
      <div className="wrk_images_parent w-full">
        <div className="w-full center flex-col  relative">
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img1.png" alt="loading img" />
          <img className=' w-[90%]' src="/images/work/image_1.png" alt="loading img" />
          <img className=' w-[75%]' src="/images/work/image_2.png" alt="loading img" />
          <img className=' mob_1 max-sm:w-[30vw]  absolute right-20 top-[35%]' src="/images/work/image_3.png" alt="loading img" />
          <img className=' mob_2 max-sm:hidden  absolute right-20 bottom-0 md:bottom-[5%]' src="/images/work/image_4.png" alt="loading img" />
        </div>

        <div className="w-full center flex-col relative">
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img2.png" alt="loading img" />
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img3.png" alt="loading img" />
          <div className=" w-full flex flex-col md:flex-row">
            <div className=" w-full md:w-1/2 center p-10 md:p-32">
              <div style={{ clipPath: "inset(50%)" }} className=" clip_img_effect w-full md:w-[30vw] overflow-hidden opacity-0 ">
                <img className='scale-150 clip_img_effect_img' src="/images/work/bg_img1.png" alt="loading img" />
              </div>
            </div>
            <div className=" w-full md:w-1/2 center p-10 md:p-20">
              <div style={{ clipPath: "inset(50%)" }} className=" clip_img_effect w-full md:w-[35vw] overflow-hidden opacity-0 ">
                <img className='scale-150 clip_img_effect_img' src="/images/work/image_6.png" alt="loading img" />
              </div>
            </div>
          </div>

          <img className=' w-[75%]' src="/images/work/image_7.png" alt="loading img" />
          <img className=' w-[75%] mt-32' src="/images/work/image_8.png" alt="loading img" />
          <img className=' w-[75%] mt-32 mb-48' src="/images/work/image_10.png" alt="loading img" />

          <img className=' mob_3 max-sm:w-[30vw] absolute right-20 bottom-[5%]' src="/images/work/image_9.png" alt="loading img" />

        </div>
      </div>
    </>
  )
}

export default WorkDetailGallery