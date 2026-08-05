"use client";
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


const imgData = [
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img1.png",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img2.png",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img3.png",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img4.png",
    },
]
const WebDevProjectsSwiper = () => {

    const containerRef = useRef()


    useGSAP(() => {
        gsap.from(".inner_slides", {
            xPercent: 100,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
    })

    useEffect(() => {

        const swiper = document.querySelector(".mySwiper");
        const dragBtn = document.querySelector(".drag_btn");

        swiper.addEventListener("mousemove", (e) => {
            gsap.to(dragBtn, {
                x: e.clientX - 50,
                y: e.clientY - 40,
                opacity: 1,
                duration: 0.2,
                ease: "power3.out",
            });
        });

        swiper.addEventListener("mouseleave", () => {
            gsap.to(dragBtn, {
                opacity: 0,
                duration: 0.3,
            });
        });
    }, []);

    return (
        <>
            <div ref={containerRef} className="w-full mt-24 h-screen flex flex-col justify-center items-center space-y-16 relative">
                <div className="absolute w-full h-full inset-0">
                    <Image src="/images/expertisePage/website-development/swiper_bg.png" alt="Swiper bg Graphic" fill className='cover' />
                </div>

                <div className="">
                    <h3 data-para-effect className=" text-3xl md:text-5xl  text-center text-white primary-font leading-tight relative z-10">
                        Design Your <br /> Business Now
                    </h3>
                </div>
                <div className="padding py-0! relative ">

                    <div
                        className="drag_btn fixed top-0 left-0 pointer-events-none text-sm bg-white/15 backdrop-blur-[1.25rem] rounded-lg z-[10] px-3 py-1.5 opacity-0 scale-100">
                        <p className="font-medium">DRAG</p>
                    </div>

                    <Swiper
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        spaceBetween={10}
                        speed={800}
                        breakpoints={{
                            768: {
                                spaceBetween: 20,
                            },
                        }}
                        className="mySwiper  relative cursor-grab active:cursor-grabbing">

                        {imgData.map((item, i) => (
                            <SwiperSlide key={i} className=' inner_slides rounded-xl overflow-hidden w-[90vw]! aspect-video md:w-[55vw]!'>
                                <div
                                    className=" w-full h-full "
                                >
                                    <div className=" w-full h-full">
                                        <Image fill src={item.img} alt={`Slide ${i + 1}`} className="cover" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default WebDevProjectsSwiper