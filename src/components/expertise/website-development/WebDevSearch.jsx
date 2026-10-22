"use client";
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
gsap.registerPlugin(ScrollTrigger)

// Looping line icons, animated with SVG so they keep moving without JS
export const BasicsIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <rect x="18" y="4" width="12" height="8" rx="1" />
        <path d="M24 12 V18 M10 18 H38 M10 18 V24 M24 18 V24 M38 18 V24" />
        {[10, 24, 38].map((x, i) => (
            <rect key={x} x={x - 5} y="24" width="10" height="8" rx="1">
                <animate attributeName="opacity" values="0.2;1;1;0.2" keyTimes="0;0.3;0.8;1" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </rect>
        ))}
        <path d="M6 40 H42" strokeDasharray="36" strokeDashoffset="36">
            <animate attributeName="stroke-dashoffset" values="36;0;0;36" keyTimes="0;0.5;0.85;1" dur="2.4s" repeatCount="indefinite" />
        </path>
    </svg>
);

export const SpeedIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <path d="M6 34 A18 18 0 0 1 42 34" />
        <path d="M10 26 L12.5 27.5 M24 16 V19 M38 26 L35.5 27.5" />
        <path d="M24 34 L24 20">
            <animateTransform attributeName="transform" type="rotate" values="-70 24 34;60 24 34;45 24 34;60 24 34;-70 24 34" keyTimes="0;0.4;0.5;0.6;1" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="24" cy="34" r="2.5" fill="currentColor" />
        <path d="M14 42 H34" />
    </svg>
);

export const SchemaIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        <path d="M14 8 C 8 8, 10 18, 5 24 C 10 30, 8 40, 14 40" />
        <path d="M34 8 C 40 8, 38 18, 43 24 C 38 30, 40 40, 34 40" />
        <path d="M18 18 L30 30 M30 18 L18 30" opacity="0.4" />
        {[[18, 18], [30, 18], [24, 24], [18, 30], [30, 30]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2" fill="currentColor">
                <animate attributeName="r" values="1;2.5;1" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
        ))}
    </svg>
);

export const AiIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="w-full h-full">
        <path d="M20 8 C 21 18, 24 21, 34 22 C 24 23, 21 26, 20 36 C 19 26, 16 23, 6 22 C 16 21, 19 18, 20 8 Z" style={{ transformOrigin: "20px 22px" }}>
            <animateTransform attributeName="transform" type="scale" values="1;0.85;1" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M37 30 C 37.5 34, 38.5 35, 42 35.5 C 38.5 36, 37.5 37, 37 41 C 36.5 37, 35.5 36, 32 35.5 C 35.5 35, 36.5 34, 37 30 Z" fill="currentColor">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </path>
        <path d="M38 6 V12 M35 9 H41">
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
        </path>
    </svg>
);

export const items = [
    { title: "The basics.", line: "Clean headings, titles, sitemap and URLs.", Icon: BasicsIcon },
    { title: "Speed.", line: "Checked with Google Lighthouse before go-live.", Icon: SpeedIcon },
    { title: "Schema.", line: "So search engines know who you are.", Icon: SchemaIcon },
    { title: "AI ready.", line: "An llms.txt file and clear, quotable pages.", Icon: AiIcon },
];

// Card fills with a blue pixel grid on hover and flips its text to white
const SearchCard = ({ item, i }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = item;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="search_card group relative  rounded-2xl overflow-hidden  bg-[#002bba10]"
        >
            <PixelGridCanvas
                isActive={isHovered}
                boxSize={30}
                color="#002bba"
                duration={1.2}
                className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none z-0"
            />
            <div className="relative z-10 p-6 md:p-8 space-y-16 md:space-y-24 transition-colors duration-500 md:group-hover:text-white">
                <div className="flex items-start justify-between">
                    <p className="text-3xl">0{i + 1}</p>
                    <div className="w-10 h-10 md:w-12 md:h-12 opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                        <Icon />
                    </div>
                </div>
                <div className="space-y-2">
                    <h4 className="text-xl md:text-2xl font-semibold">{item.title}</h4>
                    <p className="font-medium leading-tight opacity-70 w-[85%]">{item.line}</p>
                </div>
            </div>
        </div>
    );
};

// Search and AI search, set up in every build
const WebDevSearch = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".search_card", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".search_cards",
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="w-full relative border-b text_blue py-8 md:py-16 space-y-8 md:space-y-16">

            <div className="w-full padding">
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div>
                        <h2 data-para-effect className="primary-font text-5xl leading-none">
                            Search, <br /> built in
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className="font-thin">Found on Google.</p>
                        <p className="font-thin">Quoted by AI.</p>
                    </div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
                            Every site is set up for search engines and AI assistants from day one.
                        </h3>
                    </div>
                </div>
            </div>

            <div className="w-full padding space-y-8">
                <div className="search_cards w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {items.map((item, i) => (
                        <SearchCard key={i} item={item} i={i} />
                    ))}
                </div>

                <p className="">
                    Ongoing SEO? <Link href="/expertise/branding-marketing-and-seo" className="underline underline-offset-2 hover:opacity-70 transition-opacity duration-300">See Branding, marketing and SEO.</Link>
                </p>
            </div>
        </div>
    )
}

export default WebDevSearch
