"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { useGSAP } from '@gsap/react'
import ClientsMarquee from './ClientsMarquee';

const DetailedExpertiseHero = ({
    expertiseName,
    expertiseHeading,
    btnsLabels = [],
    introHeading,
    introText,
    videoSrc,
    supportingText,
    features = [],
    heroIcons = {},
}) => {
    const [activeHoverLabel, setActiveHoverLabel] = useState(null);

    useGSAP(() => {
        const heading_split = SplitText.create(".heading_split", {
            type: "lines",
            linesClass: "split-line"
        });
        const paragraph_split = SplitText.create(".paragraph_split", {
            type: "lines",
            linesClass: "split-line"
        });

        [...heading_split.lines, ...paragraph_split.lines].forEach((line) => {
            const wrapper = document.createElement("div");

            wrapper.classList.add("line-wrapper");

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set([heading_split.lines, paragraph_split.lines], { yPercent: 100, x: 10 });

        const tl = gsap.timeline({
            delay: 0.5
        })
        tl.to(".content_box", {
            opacity: 1,
            duration: 0.01
        })
        tl.to(heading_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<");
        tl.to(paragraph_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<+0.2");
        tl.to([".blink_btn",], {
            opacity: 1,
            stagger: 0.15
        }, "<");

    });

    return (
        <div className=' content_box opacity-0 padding'>
            <div className="w-full h-screen flex flex-col justify-between relative overflow-hidden">
                {/* Background Pop-up Icons on Button Hover */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {Object.entries(heroIcons).map(([label, icons]) => {
                        const isHovered = activeHoverLabel === label;
                        return icons.map((icon, idx) => (
                            <div
                                key={`${label}-${idx}`}
                                className={`absolute transition-all duration-500 ease-out transform ${icon.size}`}
                                style={{
                                    top: icon.top,
                                    bottom: icon.bottom,
                                    left: icon.left,
                                    right: icon.right,
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered
                                        ? `translateY(0px) scale(1) rotate(${icon.rotate})`
                                        : `translateY(20px) scale(0.5) rotate(0deg)`,
                                    transitionDelay: isHovered ? `${idx * 60}ms` : '0ms',
                                }}
                            >
                                <img
                                    src={icon.src}
                                    alt="Expertise icon"
                                    className="w-20 h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,43,186,0.25)]"
                                />
                            </div>
                        ));
                    })}
                </div>

                <div className=" flex-1 w-full flex flex-col items-center justify-center text_blue gap-y-5 text-center relative z-10">
                    <p className='paragraph_split uppercase text-xs'>[ {expertiseName} ] </p>
                    <h1 className='heading_split text-5xl md:text-8xl primary-font '>{expertiseHeading}</h1>
                    <div className="flex flex-wrap gap-x-2 justify-center">
                        {btnsLabels.map((item, i) => (
                            <button
                                key={i}
                                onMouseEnter={() => setActiveHoverLabel(item)}
                                onMouseLeave={() => setActiveHoverLabel(null)}
                                className={`blink_btn text-xs uppercase px-4 py-2 leading-none transition-all duration-300 rounded-md cursor-pointer ${activeHoverLabel === item
                                    ? 'bg-[#002bba] text-white shadow-lg scale-105'
                                    : 'bg-[#002bba20] text_blue hover:bg-[#002bba35]'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full absolute border-t border-[#002bba] bottom-0 left-0 z-10">
                    <ClientsMarquee />
                </div>
            </div>

            <div className="w-full pb-8 md:pb-16 flex max-sm:flex-col-reverse max-sm:gap-y-5">
                <div className="md:w-1/2 md:pr-32 space-y-5 md:space-y-10 text_blue">
                    <h3 className=' paragraph_split text-3xl md:text-5xl'>{introHeading}</h3>

                    <p className='text-xl leading-tight'>{introText}</p>
                </div>
                <div className="md:w-1/2 flex flex-col gap-10">
                    <div className="w-full aspect-video overflow-hidden">
                        <video className=' blink_btn cover' loop autoPlay muted playsInline src={videoSrc}></video>
                    </div>
                </div>
            </div>

            <div className="w-full  flex flex-col-reverse max-sm:gap-y-5 md:flex-row">
                <div className="w-full md:w-1/2 flex items-end">
                    <p className='md:w-[50%] leading-tight text-xl text_blue'>
                        {supportingText}
                    </p>
                </div>

                <div className="w-full md:w-1/2 text_blue">
                    <div className="flex flex-col w-full">
                        {features.map((stat, i) => (
                            <div key={i} className="flex justify-between items-center py-4 border-b border-[#002bba20] last:border-b-0">
                                <span data-para-effect className="text-xl font-medium">{stat.label}</span>
                                <span className=" font-semibold ">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedExpertiseHero
