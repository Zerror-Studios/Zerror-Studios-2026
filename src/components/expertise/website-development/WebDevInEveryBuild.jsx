"use client";
import React, { useRef, useState } from 'react'
import Br from '@/components/common/Br';
import Link from 'next/link'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
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
        label: "No handover",
        heading: ["No handover.", "No lost detail."],
        statement: "Design and development sit in one team, on one project, from the first sketch. The motion and detail you sign off are exactly what goes live.",
        rows: oneTeamItems.map(({ title, line, Icon }) => ({ title, line, Icon })),
    },
    {
        label: "Every site",
        heading: ["Six things.", "Every site."],
        statement: "Not add-ons, not upsells. Whether it's five pages or fifty, these come as part of the build.",
        rows: services.map(({ title, description }, i) => ({ title, line: description, Icon: siteIcons[i] })),
    },
    {
        label: "Search",
        heading: ["Found on Google.", "Quoted by AI."],
        statement: "Search isn't a phase after launch. Every page is set up for search engines and AI assistants before it goes live.",
        rows: searchItems.map(({ title, line, Icon }) => ({ title, line, Icon })),
        footer: (
            <p>
                Ongoing SEO? <Link href="/expertise/branding-marketing-and-seo" className="underline underline-offset-2 hover:opacity-70 transition-opacity duration-300">See Branding, marketing and SEO.</Link>
            </p>
        ),
    },
];

// Clean grid cell: icon, title and line. On mobile it is a square card in a snap scroller.
const SpecCell = ({ row }) => {
    const { Icon } = row;

    return (
        <div className="spec_row group md:odd:last:col-span-2 flex rounded-xl flex-col justify-between gap-6 md:gap-20 p-6 bg-[#002bba10] border border-[#002bba]/15 max-md:w-[85vw] max-md:max-w-80 max-md:aspect-square max-md:shrink-0 max-md:snap-start">
            <div className="w-24 h-24 md:w-14 md:h-14">
                <Icon />
            </div>
            <div className="space-y-2">
                <h3 className="secondary-font font-semibold h5">{row.title}</h3>
                <p className="leading-tight max-w-sm">{row.line}</p>
            </div>
        </div>
    );
};

// Desktop: two-column grid. Mobile: horizontal snap scroller with a counter and progress bar.
const SpecRows = ({ rows }) => {
    const scrollerRef = useRef(null);
    const [active, setActive] = useState(0);

    const onScroll = () => {
        const el = scrollerRef.current;
        const card = el?.firstElementChild;
        if (!card) return;
        const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0);
        // At the far end the last card can't snap to the start, so count it as reached
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
        setActive(atEnd ? rows.length - 1 : Math.round(el.scrollLeft / step));
    };

    return (
        <>
            <div
                ref={scrollerRef}
                onScroll={onScroll}
                className="max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4 max-md:scroll-px-4 scroller_none [scrollbar-width:none] md:grid md:grid-cols-2 gap-3 md:gap-5"
            >
                {rows.map((row, ri) => (
                    <SpecCell key={ri} row={row} />
                ))}
            </div>

            {/* Mobile position indicator */}
            <div className="md:hidden flex items-center gap-4 pt-5">
                <span className="text-xs tabular-nums shrink-0">
                    {String(active + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
                </span>
                <div className="relative h-px flex-1 bg-[#002bba]/15">
                    <div
                        className="absolute inset-y-0 left-0 bg_blue transition-[width] duration-300 ease-out"
                        style={{ width: `${((active + 1) / rows.length) * 100}%` }}
                    />
                </div>
            </div>
        </>
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
        <div ref={container} className="w-full relative text_blue py-section border-b">
            {chapters.map((chapter, ci) => (
                <div key={ci} className="spec_chapter padding w-full md:grid grid-cols-2 first:pt-0 last:pb-0 py-section">
                    {/* Pinned while this chapter's rows scroll past */}
                    <div className="md:sticky md:top-28 self-start space-y-4 md:space-y-6 pb-block md:pb-0 md:pr-12">
                        <h2 data-para-effect>
                            {chapter.heading[0]} <Br />{chapter.heading[1]}
                        </h2>
                        <p className="para-lg  md:max-w-[70%]">{chapter.statement}</p>
                    </div>

                    <div className="w-full">
                        <SpecRows rows={chapter.rows} />
                        {chapter.footer && (
                            <div className="pt-5">
                                {chapter.footer}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default WebDevInEveryBuild
