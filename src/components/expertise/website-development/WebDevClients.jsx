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
        author: "Elle",
        designation: "Head of Operations",
        desc: "“ The analytics help us understand what’s working and what’s not. We’re making smarter decisions and seeing real growth.”",
    },
    {
        id: "02",
        author: "Elle",
        designation: "Head of Operations",
        desc: "“ The analytics help us understand what’s working and what’s not. We’re making smarter decisions and seeing real growth.”",
    },
    {
        id: "03",
        author: "Elle",
        designation: "Head of Operations",
        desc: "“ The analytics help us understand what’s working and what’s not. We’re making smarter decisions and seeing real growth.”",
    },
    {
        id: "04",
        author: "Elle",
        designation: "Head of Operations",
        desc: "“ The analytics help us understand what’s working and what’s not. We’re making smarter decisions and seeing real growth.”",
    },
    {
        id: "05",
        author: "Elle",
        designation: "Head of Operations",
        desc: "“ The analytics help us understand what’s working and what’s not. We’re making smarter decisions and seeing real growth.”",
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
                            className="clien_crds w-[90vw]! md:w-[35vw]! "
                        >
                            <div className="w-full aspect-4/3 rounded-3xl flex flex-col justify-between p-10 bg-blue-50">
                                <div className="w-full flex justify-between items-center">
                                    <p className="border text_blue border-[#002bba] px-4 py-1 pb-0.5 rounded-full">{item.author}</p>
                                    <p className='opacity-60'>{item.designation}</p>
                                </div>

                                <h3 className='text-xl opacity-80'>{item.desc}</h3>
                                <h2 className='text-5xl primary-font opacity-80 '>{item.id}</h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default WebDevClients