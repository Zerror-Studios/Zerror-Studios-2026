"use client";
import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const cards = [
    {
        image: "/images/expertisePage/bit-reloj.svg",
        desc: "We don't just design — we build brands that connect and stand out from the competition.",
        title: "Strategic Brand\nThinking",
    },
    {
        image: "/images/expertisePage/bit-mano.svg",
        desc: "Every campaign is optimized for reach, engagement, and measurable conversions.",
        title: "Performance-\nDriven Marketing",
    },
    {
        image: "/images/expertisePage/bit-pocima.svg",
        desc: "Proven SEO strategies that improve visibility and drive real organic traffic to your site.",
        title: "SEO That Actually\nRanks",
    },
    {
        image: "/images/expertisePage/bit-trofeo.svg",
        desc: "From brand identity to marketing campaigns everything done in one place, seamlessly.",
        title: "End-To-End\nExecution",
    }
]

const BrandingWhyUs = () => {

 useGSAP(()=>{
        gsap.from(".why_us_img",{
            opacity:0,
            stagger:0.15,
            scrollTrigger:{
                trigger:".wy_use_i_pren",
                start:"top center",
                toggleActions:"play none none reverse"
            }
        })
    })


    return (
        <div className="w-full padding py-10! md:py-32! text_blue bg-white">
            {/* Heading */}
            <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>Why Us</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className='font-thin'>What We</p>
                    <p className='font-thin'>Build</p>
                </div>
                <div className="capitalize text-3xl  md:pl-2">
          <h3 data-para-effect className="">
            <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
            We Combine Sharp Strategic Thinking With Hands-On Execution. Every Brand We Build, Every Campaign We Run — It's Designed To Perform, Not Just Look Good.
          </h3>
        </div>
            </div>

            {/* Grid */}
            <div className=" wy_use_i_pren w-full mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-4 border-t border-b border-[#002bba]/10">
                {cards.map((card, i) => (
                    <div 
                        key={i} 
                        className={`flex flex-col justify-between py-10 md:p-10 border-[#002bba]/10 ${
                            i !== cards.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''
                        }`}
                    >
                        <div className="space-y-12">
                            <div className="why_us_img w-32 h-32 md:w-44 md:h-44 relative">
                                <img src={card.image} alt={card.title} className="w-full h-full object-contain" />
                            </div>
                            <p className=" font-medium text-black/60 leading-tight">
                                {card.desc}
                            </p>
                        </div>
                        <h4 data-para-effect className="text-3xl  primary-font mt-12 leading-none text_blue">
                            {card.title}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandingWhyUs