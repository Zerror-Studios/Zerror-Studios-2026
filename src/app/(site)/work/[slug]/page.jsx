"use client";
import TicketEffect from '@/components/home/TicketEffect'
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import WorkDetailGallery from '@/components/work/workDetail/WorkDetailGallery';
import WorkDetailDesc from '@/components/work/workDetail/WorkDetailDesc';
import MoreProjects from '@/components/work/workDetail/MoreProjects';
import { useParams } from 'next/navigation';
import { caseStudies } from '@/data/ProjectsData';
import Button from '@/components/common/Button';

gsap.registerPlugin(ScrollTrigger)


const WorkDetail = () => {

  const { slug } = useParams()
  const project = caseStudies.find((p) => p.slug === slug)

  const containerRef = useRef(null)

  // useGSAP(
  //   () => {
  //     ScrollTrigger.refresh()
  //     if (window.innerWidth < 750) return
  //     gsap.to(".wrk_hero_img", {
  //       y: 400,
  //       filter: "brightness(0.3)",
  //       ease: "linear",
  //       scrollTrigger: {
  //         trigger: ".wrk_hero",
  //         start: "top top",
  //         end: "bottom top",
  //         scrub: true,
  //         // markers:true
  //       }
  //     })
  //   },
  //   { scope: containerRef }
  // )

  return (
    <div ref={containerRef}>

      <div className="w-full h-screen relative center text-center">
        {project.cover_vid ? (
          <video src={project.cover_vid} loop autoPlay muted playsInline className='cover blur-[2px]'></video>
        ) : (
          <img src={project.cover_img} className='cover blur-[2px]' alt="" />
        )}
        <div className="absolute bottom-14 bg-white/60 p-10 space-y-5 backdrop-blur-2xl text-center flex flex-col justify-center items-center rounded-sm">
          <h1 className='  text-5xl leading-none uppercase primary-font text_blue'>This Page is under development</h1>
          <Button title="View Live Site" link={project.liveLink} />
        </div>

      </div>
      {/* <div className="w-full wrk_hero overflow-hidden h-screen relative">
        <img
          className="cover wrk_hero_img brightness-100"
          src="https://www.disrptve.com/images/projects/superYou/heroImg.webp"
        />
      </div> */}

      {/* <WorkDetailDesc />

      <WorkDetailGallery />

      <MoreProjects />

      <TicketEffect /> */}

    </div>
  )
}

export default WorkDetail