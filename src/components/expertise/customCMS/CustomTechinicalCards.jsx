"use client";
import React from 'react';
import { RiStackLine, RiShieldKeyholeLine, RiLinkM, RiFlashlightLine } from '@remixicon/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const technicalCards = [
    {
        num: "01",
        title: "MODULAR ARCHITECTURE",
        desc: "Built on headless principles, decoupling the frontend from the backend. This gives your content the freedom to live anywhere and your developers the tools to build without boundaries.",
        textColor: "text-white",
        icon: RiStackLine
    },
    {
        num: "02",
        title: "ENTERPRISE SECURITY",
        desc: "We implement robust role-based access control, secure API endpoints, and end-to-end encryption. Your data stays protected while maintaining high accessibility for your team.",
        textColor: "text-black",
        icon: RiShieldKeyholeLine
    },
    {
        num: "03",
        title: "API-FIRST DESIGN",
        desc: "Seamlessly integrate with CRMs, payment gateways, and third-party tools. Our custom CMS solutions are designed to be the central hub of your digital ecosystem.",
        textColor: "text-black",
        icon: RiLinkM
    },
    {
        num: "04",
        title: "LIGHTNING PERFORMANCE",
        desc: "Optimized for speed through edge caching, static generation, and efficient asset delivery. We build systems that perform exceptionally under high traffic.",
        textColor: "text-black",
        icon: RiFlashlightLine
    }
];

const CustomTechinicalCards = () => {


    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".tech_crd_paren",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
        tl.from(".tech_card_1", {
            opacity: 0,
            y: 100
        })
        tl.from(".tech_card_2", {
            opacity: 0,
            y: 100
        }, "<+=0.2")
    })


    return (
        <div className="w-full border-t border-[#002bba] ">
            <div className="padding py-12! md:py-24! text_blue">
                {/* Heading section styled like InfoSection */}
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>
                            Technical <br /> Core.
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className='font-thin'>What We</p>
                        <p className='font-thin'>Build</p>
                    </div>
                    <div className=" text-3xl md:pl-2">
                        <h3 data-para-effect className="leading-tight">
                            <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                            We select technologies not by trend, but by structural integrity. Our stack is a cohesive ecosystem of high-performance components.
                        </h3>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className=" tech_crd_paren w-full mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        {[technicalCards[0], technicalCards[2]].map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div key={`left-${index}`} className={` tech_card_1 p-8 md:p-12 flex flex-col justify-between rounded-2xl min-h-[400px] md:min-h-[450px] bg-[#f4f4f4] hover:bg-[#002bba]! transition-colors duration-300 hover:text-white`}>
                                    <div className="flex justify-between items-start gap-4">
                                        <h4 data-para-effect className="text-3xl font-bold max-w-[80%] uppercase leading-tight tracking-tight">
                                            {card.title}
                                        </h4>
                                        <div className="shrink-0 ">
                                            <Icon size={44} />
                                        </div>
                                    </div>
                                    <div className="mt-16">
                                        <p className="text-3xl font-bold mb-3">{card.num}</p>
                                        <div className="w-full h-px bg-current opacity-20 mb-5"></div>
                                        <p className="text-xl font-medium leading-tight">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 pt-44 md:gap-6">
                        {[technicalCards[1], technicalCards[3]].map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div key={`right-${index}`} className={` tech_card_2 p-8 md:p-12 flex flex-col justify-between rounded-2xl min-h-[400px] md:min-h-[450px] bg-[#f4f4f4] hover:bg-[#002bba]! transition-colors duration-300 hover:text-white`}>
                                    <div className="flex justify-between items-start gap-4">
                                        <h4 className="text-3xl font-bold max-w-[80%] uppercase leading-tight tracking-tight">
                                            {card.title}
                                        </h4>
                                        <div className="shrink-0 ">
                                            <Icon size={44} />
                                        </div>
                                    </div>
                                    <div className="mt-16">
                                        <p className="text-3xl font-bold mb-3">{card.num}</p>
                                        <div className="w-full h-px bg-current opacity-20 mb-5"></div>
                                        <p className="text-xl font-medium leading-tight">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTechinicalCards;