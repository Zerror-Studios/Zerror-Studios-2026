"use client";
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';

gsap.registerPlugin(ScrollTrigger)

const WorkDetailDesc = () => {

    useGSAP(() => {
        const wrk_anim_txt = SplitText.create(".wrk_anim_txt", {
            type: "lines",
            linesClass: "wrk-line",
        });
        gsap.fromTo(wrk_anim_txt.lines, {
            yPercent: 100,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
                trigger: ".wrk_hero",
                start: "bottom 30%",
                toggleActions: "play none none reverse",
                // scrub: true,
                // markers: true
            }
        })
    })

    return (
        <div className="w-full py-16! md:py-32! text_blue  padding md:grid grid-cols-[80%_20%]">
            <div className=" md:w-[60%]  space-y-10">
                <p className='wrk_anim_txt primary-font text-5xl md:text-8xl '>
                    Disrupting the Norm
                </p>
                <div className="  space-y-5  capitalize leading-tight text-lg">
                    <div className="">
                        <p className='wrk_anim_txt font-medium'>This project reimagines how digital products should feel and function. By blending clear strategy, thoughtful design, and robust engineering, we created an experience that removes friction and elevates interaction.</p>
                    </div>
                    <div className="">
                        <p className='wrk_anim_txt font-medium'>This project reimagines how digital products should feel and function. By blending clear strategy, thoughtful design, and robust engineering, we created an experience that removes friction and elevates interaction.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-10 pt-20 grid grid-cols-2 md:grid-cols-1">
                <div className="space-y-5 md:space-y-0">
                    <div className="space-y-1">
                        <p className='wrk_anim_txt font-semibold text-xl uppercase'>CLIENT</p>
                        <p className='wrk_anim_txt'>Disrptve</p>
                    </div>
                    <div className="space-y-1 md:hidden">
                        <p className='wrk_anim_txt  font-semibold text-xl uppercase'>team</p>
                        <div className="">
                            <p className='wrk_anim_txt'>Product Design </p>
                            <p className='wrk_anim_txt'> Development</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className='wrk_anim_txt font-semibold text-xl uppercase'>Project type</p>
                    <div className="">
                        <p className='wrk_anim_txt'>Product Build</p>
                        <p className='wrk_anim_txt'>Full-Stack App</p>
                        <p className='wrk_anim_txt'>Scalable Platform</p>
                        <p className='wrk_anim_txt'>Custom Build</p>
                        <p className='wrk_anim_txt'>End-to-End Build</p>
                    </div>
                </div>
                <div className="space-y-2 max-sm:hidden">
                    <p className='wrk_anim_txt  font-semibold text-xl uppercase'>team</p>
                    <div className="">
                        <p className='wrk_anim_txt'>Product Design </p>
                        <p className='wrk_anim_txt'> Development</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WorkDetailDesc