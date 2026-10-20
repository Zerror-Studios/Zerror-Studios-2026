"use client";
import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        image: "/images/expertisePage/bit-reloj.svg",
        desc: "What you stand for, then what to post.",
        title: "Brand first",
    },
    {
        image: "/images/expertisePage/bit-mano.svg",
        desc: "Every campaign tracked to results.",
        title: "Measured",
    },
    {
        image: "/images/expertisePage/bit-pocima.svg",
        desc: "Monthly SEO on the site we built.",
        title: "Search that keeps working",
    },
    {
        image: "/images/expertisePage/bit-trofeo.svg",
        desc: "Identity, content, ads and search.",
        title: "One place",
    }
]

const BrandingWhyUs = () => {

    useGSAP(() => {
        gsap.from(".why_us_img", {
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".wy_use_i_pren",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
    })


    return (
        <div className="w-full padding  py-8! md:py-16! border-t text_blue bg-white">
            {/* Heading */}
            <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className='primary-font text-5xl leading-none'>Why us</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                </div>
                <div className=" text-3xl  md:pl-2">
                    <h3 data-para-effect className="">
                        <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                        The team that built it runs it.
                    </h3>
                </div>
            </div>

            {/* Grid */}
            <div className=" wy_use_i_pren w-full mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 border-t border-b border-[#002bba]/10">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        className={`flex max-sm:gap-5 flex-row-reverse md:flex-col justify-between py-5 md:py-8 md:p-8 border-[#002bba]/10 ${i !== cards.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                            }`}
                    >
                        <div className=" space-y-4 md:space-y-8">
                            <div className="why_us_img w-32 h-32 md:w-44 md:h-44 relative">
                                <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
                            </div>
                            <p className=" hidden md:block font-medium text-black/60 leading-tight">
                                {card.desc}
                            </p>
                        </div>
                        <div className="">
                            <h4 data-para-effect className=" w-full md:w-[90%] text-3xl  primary-font mt-0 md:mt-4 leading-none text_blue">
                                {card.title}
                            </h4>
                            <p className=" mt-2 md:hidden font-medium text-black/60 leading-tight">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandingWhyUs