"use client";
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
import { columns as oneTeamItems } from './WebDevOneTeam';
import { services } from './WebDevExperiencesCards';
import { items as searchItems } from './WebDevSearch';
gsap.registerPlugin(ScrollTrigger)

// Looping line icons for "In every site", animated with SVG to match the other chapters
const DesignIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        {/* Bezier curve whose handles swing, like a pen tool */}
        <path d="M8 36 C 14 14, 34 14, 40 36">
            <animate attributeName="d" values="M8 36 C 14 14, 34 14, 40 36;M8 36 C 20 8, 28 24, 40 36;M8 36 C 14 14, 34 14, 40 36" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M8 36 L14 14" opacity="0.5">
            <animate attributeName="d" values="M8 36 L14 14;M8 36 L20 8;M8 36 L14 14" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M40 36 L34 14" opacity="0.5">
            <animate attributeName="d" values="M40 36 L34 14;M40 36 L28 24;M40 36 L34 14" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="14" cy="14" r="2" fill="currentColor">
            <animate attributeName="cx" values="14;20;14" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="14;8;14" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="34" cy="14" r="2" fill="currentColor">
            <animate attributeName="cx" values="34;28;34" dur="3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="14;24;14" dur="3s" repeatCount="indefinite" />
        </circle>
        <rect x="5.5" y="33.5" width="5" height="5" />
        <rect x="37.5" y="33.5" width="5" height="5" />
    </svg>
);

const DevelopmentIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        {/* Editor window; content lines type in one after another */}
        <rect x="4" y="6" width="40" height="36" rx="2" />
        <path d="M14 6 V42" opacity="0.4" />
        {[[14, 22], [20, 16], [26, 20], [32, 12]].map(([y, len], i) => (
            <path key={y} d={`M19 ${y} H${19 + len}`} strokeDasharray={len} strokeDashoffset={len}>
                <animate attributeName="stroke-dashoffset" values={`${len};0;0;${len}`} keyTimes="0;0.25;0.85;1" dur="3.2s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            </path>
        ))}
        {[14, 20, 26].map((y) => (
            <path key={y} d={`M8 ${y} H10`} opacity="0.5" />
        ))}
    </svg>
);

const ScrollIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        {/* Mouse with a scrolling wheel and chevrons cascading down */}
        <rect x="15" y="4" width="18" height="28" rx="9" />
        <path d="M24 10 V15">
            <animateTransform attributeName="transform" type="translate" values="0 0;0 6;0 6" keyTimes="0;0.6;1" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;0" keyTimes="0;0.6;1" dur="1.6s" repeatCount="indefinite" />
        </path>
        {[37, 42].map((y, i) => (
            <path key={y} d={`M19 ${y} L24 ${y + 3} L29 ${y}`}>
                <animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </path>
        ))}
    </svg>
);

const SearchAiIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        {/* Magnifier sweeping, with a spark pulsing inside the lens */}
        <g>
            <animateTransform attributeName="transform" type="translate" values="0 0;3 -2;0 0;-2 1;0 0" dur="4s" repeatCount="indefinite" />
            <circle cx="20" cy="20" r="13" />
            <path d="M29.5 29.5 L42 42" strokeWidth="3" />
            <path d="M20 12 C 20.6 17.5, 22.5 19.4, 28 20 C 22.5 20.6, 20.6 22.5, 20 28 C 19.4 22.5, 17.5 20.6, 12 20 C 17.5 19.4, 19.4 17.5, 20 12 Z" style={{ transformOrigin: "20px 20px" }}>
                <animateTransform attributeName="transform" type="scale" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
            </path>
        </g>
    </svg>
);

const TestingIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        {/* Phone that gets checked off, again and again */}
        <rect x="13" y="4" width="22" height="40" rx="3" />
        <path d="M21 8 H27" opacity="0.5" />
        <path d="M22 40 H26" opacity="0.5" />
        <path d="M18 24 L22.5 28.5 L30 20" strokeWidth="2" strokeDasharray="20" strokeDashoffset="20">
            <animate attributeName="stroke-dashoffset" values="20;0;0;20" keyTimes="0;0.3;0.85;1" dur="2.4s" repeatCount="indefinite" />
        </path>
    </svg>
);

const HostingIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full">
        {/* Server stack with status lights and a steady heartbeat */}
        {[6, 20].map((y, i) => (
            <g key={y}>
                <rect x="6" y={y} width="36" height="10" rx="2" />
                <path d={`M12 ${y + 5} H24`} opacity="0.5" />
                <circle cx="36" cy={y + 5} r="1.5" fill="currentColor">
                    <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                </circle>
            </g>
        ))}
        <path d="M4 40 H16 L19 34 L23 44 L27 37 L29 40 H44" strokeLinejoin="round" strokeDasharray="56" strokeDashoffset="56">
            <animate attributeName="stroke-dashoffset" values="56;0;-56" dur="2.4s" repeatCount="indefinite" />
        </path>
    </svg>
);

// Same order as `services`
const siteIcons = [DesignIcon, DevelopmentIcon, ScrollIcon, SearchAiIcon, TestingIcon, HostingIcon];

// One team, in every site, and search: one spec sheet instead of three card grids
const chapters = [
    {
        label: "One team",
        heading: <>One team, <br className="max-sm:hidden" /> end to end.</>,
        statement: "No handover between a design team and a dev team. The motion and detail you approve are what goes live.",
        rows: oneTeamItems.map(({ title, line, Icon }) => ({ title, line, Icon })),
    },
    {
        label: "In every site",
        heading: <>In every <br className="max-sm:hidden" /> site.</>,
        statement: "Not add-ons. Part of the build. Six things every site gets, whatever its size.",
        rows: services.map(({ title, description }, i) => ({ title, line: description, Icon: siteIcons[i] })),
    },
    {
        label: "Search",
        heading: <>Search, <br className="max-sm:hidden" /> built in.</>,
        statement: "Found on Google. Quoted by AI. Every site is set up for search engines and AI assistants from day one.",
        rows: searchItems.map(({ title, line, Icon }) => ({ title, line, Icon })),
        footer: (
            <p>
                Ongoing SEO? <Link href="/expertise/branding-and-marketing" className="underline underline-offset-2 hover:opacity-70 transition-opacity duration-300">See Branding and marketing.</Link>
            </p>
        ),
    },
];

// Hairline row; fills with a blue pixel grid on hover and flips to white
const SpecRow = ({ row }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = row;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="spec_row group relative overflow-hidden border-t border-[#002bba20]"
        >
            <PixelGridCanvas
                isActive={isHovered}
                boxSize={24}
                color="#002bba"
                duration={0.9}
                className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none z-0"
            />
            <div className="relative z-10 grid grid-cols-[1fr_2.5rem] md:grid-cols-[1fr_1fr_3rem] items-center gap-x-4 gap-y-2 py-5 md:py-7 md:px-4 transition-colors duration-300 md:group-hover:text-white">
                <h4 className="secondary-font text-2xl md:text-4xl leading-none">{row.title}</h4>
                <div className="w-8 h-8 md:w-10 md:h-10 justify-self-end md:order-last opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon />
                </div>
                <p className="col-span-2 md:col-span-1 leading-tight opacity-70 md:opacity-80 md:max-w-[85%]">{row.line}</p>
            </div>
        </div>
    );
};

const WebDevInEveryBuild = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray(".spec_chapter").forEach((chapter) => {
            gsap.from(chapter.querySelectorAll(".spec_row"), {
                y: 30,
                opacity: 0,
                stagger: 0.08,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: chapter,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });
        });
    }, { scope: container });

    return (
        <div ref={container} className="w-full relative text_blue py-8 md:py-16 border-b">
            {chapters.map((chapter, ci) => (
                <div key={ci} className="spec_chapter padding w-full md:grid grid-cols-[28%_72%] first:pt-0 last:pb-0 py-8 md:py-16">
                    {/* Pinned while this chapter's rows scroll past */}
                    <div className="md:sticky md:top-28 self-start space-y-4 md:space-y-6 pb-8 md:pb-0 md:pr-12">
                        <h2 data-para-effect className="primary-font text-5xl leading-none">{chapter.heading}</h2>
                        <p className="leading-tight opacity-80 md:max-w-[90%]">{chapter.statement}</p>
                    </div>

                    <div className="w-full">
                        {chapter.rows.map((row, ri) => (
                            <SpecRow key={ri} row={row} />
                        ))}
                        <div className="border-t border-[#002bba20] pt-5">
                            {chapter.footer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WebDevInEveryBuild
