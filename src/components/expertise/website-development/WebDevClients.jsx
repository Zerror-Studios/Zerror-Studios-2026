"use client";
import { RiArrowLeftLine, RiArrowRightLine, RiDoubleQuotesR } from '@remixicon/react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const data = [
    {
        id: "01",
        author: "Elle Morgan",
        company: "Northline Studio",
        designation: "Head of Operations",
        metric: "+42%",
        metricLabel: "lead quality",
        desc: "Zerror turned a scattered website into a clear, fast experience. The new flow helped our team explain the product better and convert stronger leads.",
    },
    {
        id: "02",
        author: "Rhea Kapoor",
        company: "Maven Retail",
        designation: "Founder",
        metric: "-31%",
        metricLabel: "drop-offs",
        desc: "The site finally feels like our brand. It is smooth, confident, and much easier for customers to understand what makes us different.",
    },
    {
        id: "03",
        author: "Arjun Mehta",
        company: "LayerOps",
        designation: "Product Lead",
        metric: "1.4s",
        metricLabel: "load time",
        desc: "They handled the design and front-end with real care. The animations feel premium without slowing anything down.",
    },
    {
        id: "04",
        author: "Maya Shah",
        company: "Bloom & Co.",
        designation: "Marketing Director",
        metric: "+58%",
        metricLabel: "engagement",
        desc: "The new pages gave our campaigns a stronger home. People stayed longer, clicked deeper, and the whole brand felt sharper.",
    },
    {
        id: "05",
        author: "Noah Wells",
        company: "Atlas Finance",
        designation: "Growth Manager",
        metric: "+27%",
        metricLabel: "demo requests",
        desc: "The process was clear from day one. We got a website that looks polished, feels responsive, and actually supports our sales team.",
    },
]
const WebDevClients = () => {

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);
        const containerRef = useRef()

    useGSAP(()=>{
        gsap.from(".clien_crds",{
            xPercent:100,
            opacity:0,
            stagger:0.15,
            scrollTrigger:{
                trigger:containerRef.current,
                start:"top center",
                toggleActions:"play none none reverse"
            }
        })
    })

    return (
        <>
            <div  className="w-full   padding   text_blue ">
                <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>what our clients  <br /> say about us </h2>
                    </div>
                    <div className="text-xs max-sm:hidden capitalize pt-4">
                        <p className='font-thin'>testimonial</p>
                    </div>
                    <div className="capitalize text-3xl  md:pl-2">
                        <h3 data-para-effect className="">
                            <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                            Your business is unique your CMS should be too.
                        </h3>
                    </div>
                </div>
            </div>
            <div className=" padding  flex justify-end gap-x-1 md:gap-x-4 ">
                <button
                    aria-label="Previous slide"
                    disabled={isBeginning}
                    onClick={() => swiperRef.current?.slidePrev()}
                    className={`prev_button shrink-0 px-8 py-3 border-[#002bba] text-[#002bba]  center rounded-full border transition-all duration-300
                            ${isBeginning
                            ? "opacity-40 cursor-not-allowed!"
                            : "group hover:bg-[#002bba] hover:text-white! hover:border-[#002bba]"
                        }`}
                >
                    <RiArrowLeftLine size={20} />
                </button>

                <button
                    aria-label="Next slide"
                    disabled={isEnd}
                    onClick={() => swiperRef.current?.slideNext()}
                    className={`next_button shrink-0 px-8 py-3 border-[#002bba] text-[#002bba]  center rounded-full border transition-all duration-300
                                ${isEnd
                            ? "opacity-40 cursor-not-allowed!"
                            : "group hover:bg-[#002bba] hover:text-white! hover:border-[#002bba]"
                        }`}
                >
                    <RiArrowRightLine size={20} />
                </button>
            </div>
            <div ref={containerRef} className="padding ">
                <Swiper
                    onReachEnd={() => setIsEnd(true)}
                    onReachBeginning={() => setIsBeginning(true)}
                    onFromEdge={() => {
                        setIsBeginning(swiperRef.current?.isBeginning);
                        setIsEnd(swiperRef.current?.isEnd);
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setTimeout(() => {
                            swiper.update();
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }, 0);
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    spaceBetween={30}
                    slidesPerView={"auto"}
                    grabCursor
                    className="cursor-grab active:cursor-grabbing"
                    breakpoints={{
                        0: { spaceBetween: 10 },
                        640: { spaceBetween: 20 },
                    }}
                >
                    {data.map((item) => (
                        <SwiperSlide
                            key={item.id}
                            className="clien_crds group w-[90vw]! md:w-[35vw]! "
                        >
                            <div className="relative w-full items-stretch md:aspect-[4/3] overflow-hidden rounded-[1rem] border border-[#002bba]/15 bg-[#f6f8ff] hover:bg-[#002bba] hover:text-white! group p-6 md:p-8 text_blue transition-all duration-300  group-hover:border-[#002bba]">

                                <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="center h-12 w-12 shrink-0 rounded-full bg-[#002bba]  uppercase text-white border border-transparent group-hover:border-white transition-all duration-300">
                                                <p className='translate-y-0.5'>
                                                {item.author.split(" ").map((name) => name[0]).join("")}
                                                </p>
                                            </div>
                                            <div>
                                                <p className=" font-semibold leading-none">{item.author}</p>
                                                <p className="mt-1 text-xs uppercase opacity-60">{item.designation}</p>
                                            </div>
                                        </div>

                                        <div className="center h-11 w-11 shrink-0 rounded-full border border-[#002bba]/20 bg-white text-[#002bba]">
                                            <RiDoubleQuotesR size={22} />
                                        </div>
                                    </div>

                                    <h3 className='max-w-[92%] text-2xl leading-none md:text-3xl '>
                                        {item.desc}
                                    </h3>

                                    <div className="flex items-end justify-between gap-4 border-t border-[#002bba]/15 group-hover:border-white/30 transition-all duration-300 pt-5">
                                        <div>
                                            <p className=" uppercase">{item.company}</p>
                                            <p className="mt-1 text-sm font-medium capitalize  opacity-60">{item.metricLabel}</p>
                                        </div>

                                        <div className="text-right">
                                            <p className="primary-font text-5xl leading-none">{item.metric}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default WebDevClients
