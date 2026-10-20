"use client";
import React, { useRef, useState } from 'react';
import { RiStackLine, RiShieldKeyholeLine, RiLinkM, RiFlashlightLine } from '@remixicon/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
gsap.registerPlugin(ScrollTrigger)

const technicalCards = [
    {
        num: "01",
        mobileOrder: "max-md:order-1",
        title: "Headless",
        desc: "One source of content, for every screen.",
        textColor: "text-white",
        icon: RiStackLine
    },
    {
        num: "02",
        mobileOrder: "max-md:order-2",
        title: "Access by role",
        desc: "Everyone sees only what they should.",
        textColor: "text-black",
        icon: RiShieldKeyholeLine
    },
    {
        num: "03",
        mobileOrder: "max-md:order-3",
        title: "Connected",
        desc: "Your CRM, payments, email and more.",
        textColor: "text-black",
        icon: RiLinkM
    },
    {
        num: "04",
        mobileOrder: "max-md:order-4",
        title: "Built for traffic",
        desc: "Fast on your busiest day.",
        textColor: "text-black",
        icon: RiFlashlightLine
    }
];

const TechCard = ({ card, className }) => {
    const Icon = card.icon;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${className} relative group rounded-2xl overflow-hidden`}
        >
            {/* Custom Pixel Canvas Animation Overlay */}
            <PixelGridCanvas
                isActive={isHovered}
                boxSize={30}
                color="#002bba"
                duration={1.5}
                className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none rounded-2xl z-0"
            />

            <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between rounded-2xl min-h-[20rem] md:min-h-[450px] bg-[#002bba10] group-hover:bg-transparent transition-colors duration-300 text-[#002bba] group-hover:text-white relative z-10">
                <div className="flex justify-between items-start gap-4 relative z-10">
                    <h4 data-para-effect className="text-3xl font-bold max-w-[80%] uppercase leading-tight tracking-tight text-[#002bba] group-hover:text-white transition-colors duration-300">
                        {card.title}
                    </h4>
                    <div className="shrink-0 text-[#002bba] group-hover:text-white transition-colors duration-300">
                        <Icon size={44} />
                    </div>
                </div>
                <div className="mt-16 relative z-10 text-[#002bba] group-hover:text-white transition-colors duration-300">
                    <p className="text-3xl font-bold mb-3">{card.num}</p>
                    <div className="w-full h-px bg-current opacity-20 mb-5"></div>
                    <p className="text-xl font-medium leading-tight opacity-90">
                        {card.desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

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
            <div className="padding py-8! md:py-16! text_blue">
                {/* Heading section styled like InfoSection */}
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className='primary-font text-5xl leading-none'>
                            How it is built
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p data-para-effect className="font-thin">Chosen to last.</p>
                        <p data-para-effect className="font-thin">Not to impress.</p>
                    </div>
                    <div className=" text-3xl md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className='opacity-0 max-sm:hidden pointer-events-none' aria-hidden="true">...............</span>
                            Your content lives in one place and reaches every screen. Your team logs in to what they need, and it keeps up on your busiest day.
                        </h3>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className=" tech_crd_paren w-full mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Left Column (display: contents below md, so cards stack 01, 02, 03, 04 on mobile via order) */}
                    <div className="max-md:contents flex flex-col gap-4 md:gap-6">
                        {[technicalCards[0], technicalCards[2]].map((card, index) => (
                            <TechCard key={`left-${index}`} card={card} className={`tech_card_1 ${card.mobileOrder}`} />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="max-md:contents flex flex-col gap-4  md:pt-44 md:gap-6">
                        {[technicalCards[1], technicalCards[3]].map((card, index) => (
                            <TechCard key={`right-${index}`} card={card} className={`tech_card_2 ${card.mobileOrder}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomTechinicalCards;