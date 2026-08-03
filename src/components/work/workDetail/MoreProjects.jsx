"use client";
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import Image from 'next/image';

const projectsData = [
    {
        title: "Disrptve",
        img: "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?q=80&w=1204&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Website Design"
    },
    {
        title: "Disrptve",
        img: "https://images.unsplash.com/photo-1759978244716-ed4b77300a47?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Website Design"
    },
    {
        title: "Disrptve",
        img: "https://images.unsplash.com/photo-1583306346437-f2143c0f11fc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Website Design"
    },
    {
        title: "Disrptve",
        img: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Website Design"
    },
    {
        title: "Disrptve",
        img: "https://images.unsplash.com/photo-1531384370597-8590413be50a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "Website Design"
    },
]

const MoreProjects = () => {

    useGSAP(() => {


        const more_project_header_split_wrd = SplitText.create(
            ".more_project_header_split_wrd",
            {
                type: "lines",
                linesClass: "wrk-line",
            }
        );

        gsap.fromTo(more_project_header_split_wrd.lines, {
            yPercent: 100,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
                trigger: ".more_project_header",
                start: "top 50%",
                toggleActions: "play none none reverse",
                // scrub: true,
                // markers: true
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
        <div>
            <div className=" more_project_header w-screen space-y-16 md:space-y-0  py-10! md:py-32!  padding text_blue md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <p className=' more_project_header_split_wrd text-5xl md:text-6xl  capitalize primary-font leading-none'>selected <br /> works</p>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className='more_project_header_split_wrd font-thin'>Brands we’ve </p>
                    <p className='more_project_header_split_wrd font-thin'>worked with.</p>
                </div>
                <div className=" text-2xl md:text-4xl  md:pl-2">
                    <p className=" more_project_header_split_wrd font-medium   "> <span className='opacity-0 max-sm:hidden pointer-events-none'>.........................</span> We work with startups, studios, and growing brands to design and build digital products that are clear, scalable, and impactful.</p>
                </div>
            </div>

            <div className="padding py-0! relative ">

                <div
                    className="drag_btn fixed top-0 left-0 pointer-events-none text-sm bg-white/15 backdrop-blur-[1.25rem] rounded-lg z-[10] px-3 py-1.5 opacity-0 scale-100">
                    <p className="font-medium">DRAG</p>
                </div>

                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    breakpoints={{
                        768: {
                            spaceBetween: 20,
                        },
                    }}
                    className="mySwiper relative cursor-grab active:cursor-grabbing  text_blue">

                    {projectsData.map((item, i) => (
                        <SwiperSlide key={i} className='  w-[90vw]! md:w-[35vw]!'>
                            <div
                                className=" w-full"
                            >
                                <div className=" w-full relative aspect-[5/6]">
                                    <Image fill src={item.img} alt="loading img" className="cover" />
                                </div>
                                <div className="mt-2">
                                    <div className="w-full flex items-center justify-between">
                                        <p className="text-xl font-semibold  uppercase">{item.title}</p>
                                        <p className="text-xl font-semibold  uppercase">2025</p>
                                    </div>
                                    <p className="text-sm">{item.category}</p>

                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}

export default MoreProjects