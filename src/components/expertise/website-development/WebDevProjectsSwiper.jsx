"use client";
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const imgData = [
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img1.svg",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img2.svg",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img3.svg",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img4.svg",
    },
    {
        img: "/images/expertisePage/website-development/webdev_swiper/img5.svg",
    },
]
const WebDevProjectsSwiper = () => {

    const containerRef = useRef()

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
            <div ref={containerRef} className="w-full mt-24 py-24  space-y-16 relative">
                <div className="absolute w-full h-full inset-0">
                    <Image src="/images/expertisePage/website-development/swiper_bg.png" alt="Swiper bg Graphic" fill className='cover' />
                </div>

                <div className="">
                    <h3 data-para-effect className=" text-3xl md:text-5xl  text-center text-white primary-font leading-tight relative z-10">
                        Design Your <br /> Business Now
                    </h3>
                </div>
                <div className=" py-0! relative ">

                    <div
                        className="drag_btn fixed top-0 left-0 pointer-events-none text-sm bg-white/15 backdrop-blur-[1.25rem] rounded-lg z-[10] px-3 py-1.5 opacity-0 scale-100">
                        <p className="font-medium">DRAG</p>
                    </div>

                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={0}
                        centeredSlides={true}
                        loop={true}
                        speed={800}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper relative cursor-grab active:cursor-grabbing"
                    >

                        {imgData?.map((item, i) => (
                            <SwiperSlide key={i} className=' inner_slides overflow-hidden w-[90vw]! aspect-video md:w-[50vw]!'>
                                <div className=" w-full h-full relative rounded-lg overflow-hidden ">
                                    <Image fill src={item.img} alt={`Slide ${i + 1}`} className="cover" />
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    <style>{`
                        .mySwiper .swiper-slide {
                            transition: transform 0.8s ease, filter 0.8s ease;
                            transform-origin: center;
                            transform: scale(0.8) rotate(0deg) !important;
                            filter: brightness(50%);
                        }
                        .mySwiper .swiper-slide-active {
                            transform: scale(1) rotate(0deg) !important;
                            filter: brightness(100%);
                            z-index: 10;
                        }
                        .mySwiper .swiper-slide-next {
                            transform: translateY(5%) scale(0.88) rotate(2deg) !important;
                            filter: brightness(50%);
                            z-index: 5;
                        }
                        .mySwiper .swiper-slide-prev {
                            transform: translateY(5%) scale(0.88) rotate(-2deg) !important;
                            filter: brightness(50%);
                            z-index: 5;
                        }
                    `}</style>
                </div>
            </div>
        </>
    )
}

export default WebDevProjectsSwiper