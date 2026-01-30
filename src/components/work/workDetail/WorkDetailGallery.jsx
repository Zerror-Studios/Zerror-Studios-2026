"use client";
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger)

const WorkDetailGallery = () => {

  useGSAP(() => {
    gsap.to(".mob_1", {
      y: -300,
      ease: "linear",
      scrollTrigger: {
        trigger: ".mob_1",
        start: "top bottom",
        end: "bottom top",
        // toggleActions: "play none none reverse",
        scrub: true,
        // markers: true
      }
    })
    gsap.to(".mob_2", {
      y: -300,
      ease: "linear",
      scrollTrigger: {
        trigger: ".mob_2",
        start: "top bottom",
        end: "bottom top",
        // toggleActions: "play none none reverse",
        scrub: true,
        // markers: true
      }
    })
    gsap.to(".mob_3", {
      y: -300,
      ease: "linear",
      scrollTrigger: {
        trigger: ".mob_3",
        start: "top bottom",
        end: "bottom top",
        // toggleActions: "play none none reverse",
        scrub: true,
        // markers: true
      }
    })
    const clip_img_tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".clip_img_effect",
        start: "top 60%",
        toggleActions: "play none none reverse",
        // scrub: true,
        // markers: true
      }
    })
    clip_img_tl.to(".clip_img_effect", {
      opacity: 1,
      clipPath: "inset(0%)",
      stagger: 0.03,
      duration: 1,
      ease: "expo.out",
    })
    clip_img_tl.to(".clip_img_effect_img", {
      scale: 1,
      stagger: 0.03,
      duration: 1,
      ease: "expo.out",
    }, "<")
  })

  return (
    <>
      <div className="wrk_images_parent w-full">
        <div className="w-full center flex-col relative">
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img1.png" alt="" />
          <img className=' w-[90%]' src="/images/work/image_1.png" alt="" />
          <img className=' w-[75%]' src="/images/work/image_2.png" alt="" />
          <img className=' mob_1  absolute right-20 top-[35%]' src="/images/work/image_3.png" alt="" />
          <img className=' mob_2  absolute right-20 bottom-[5%]' src="/images/work/image_4.png" alt="" />
        </div>

        <div className="w-full center flex-col relative">
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img2.png" alt="" />
          <img className='w-full h-full absolute z-[-1] ' src="/images/work/bg_img3.png" alt="" />
          <div className="flex">
            <div className="w-1/2 center p-32">
              <div style={{ clipPath: "inset(50%)" }} className=" clip_img_effect w-[30vw] overflow-hidden opacity-0 ">
                <img className='scale-150 clip_img_effect_img' src="/images/work/bg_img1.png" alt="" />
              </div>
            </div>
            <div className="w-1/2 center p-20">
              <div style={{ clipPath: "inset(50%)" }} className=" clip_img_effect w-[35vw] overflow-hidden opacity-0 ">
                <img className='scale-150 clip_img_effect_img' src="/images/work/image_6.png" alt="" />
              </div>
            </div>
          </div>

          <img className=' w-[75%]' src="/images/work/image_7.png" alt="" />
          <img className=' w-[75%] mt-32' src="/images/work/image_8.png" alt="" />
          <img className=' w-[75%] mt-32 mb-48' src="/images/work/image_10.png" alt="" />

          <img className=' mob_3 absolute right-20 bottom-[5%]' src="/images/work/image_9.png" alt="" />

        </div>
      </div>
    </>
  )
}

export default WorkDetailGallery