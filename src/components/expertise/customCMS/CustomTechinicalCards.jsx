"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

// Looping line icons, animated with SVG; stroke follows the card's text colour
const iconProps = (size) => ({
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
});

const HeadlessIcon = ({ size = 44 }) => (
    <svg {...iconProps(size)}>
        {/* One content source flowing down to three screens */}
        <rect x="18" y="3" width="12" height="10" rx="1.5" />
        <path d="M21 7 H27 M21 10 H25" opacity="0.5" />
        <path d="M24 13 V20 M24 20 H10 V28 M24 20 V28 M24 20 H38 V28" strokeDasharray="2 3">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
        </path>
        {/* Desktop */}
        <g>
            <rect x="4" y="29" width="12" height="9" rx="1" />
            <path d="M8 42 H12 M10 38 V42" />
            <animate attributeName="opacity" values="0.4;1;1;0.4" keyTimes="0;0.15;0.6;1" dur="2.4s" begin="0s" repeatCount="indefinite" />
        </g>
        {/* Phone */}
        <g>
            <rect x="21" y="29" width="6" height="13" rx="1" />
            <animate attributeName="opacity" values="0.4;1;1;0.4" keyTimes="0;0.15;0.6;1" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
        </g>
        {/* Email */}
        <g>
            <rect x="32" y="30" width="12" height="9" rx="1" />
            <path d="M32 30 L38 35 L44 30" />
            <animate attributeName="opacity" values="0.4;1;1;0.4" keyTimes="0;0.15;0.6;1" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
        </g>
    </svg>
);

const AccessIcon = ({ size = 44 }) => (
    <svg {...iconProps(size)}>
        {/* Shield with a padlock that opens and clicks shut */}
        <path d="M24 4 L40 10 V22 C40 32 33 40 24 44 C15 40 8 32 8 22 V10 Z" />
        <path d="M20 23 V19 A4 4 0 0 1 28 19 V23">
            <animateTransform attributeName="transform" type="translate" values="0 -3;0 -3;0 0;0 0;0 -3" keyTimes="0;0.3;0.4;0.85;1" dur="2.6s" repeatCount="indefinite" />
        </path>
        <rect x="18" y="23" width="12" height="9" rx="1.5" />
        <circle cx="24" cy="27.5" r="1.3" fill="currentColor">
            <animate attributeName="opacity" values="0.3;0.3;1;1;0.3" keyTimes="0;0.4;0.45;0.85;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
    </svg>
);

const ConnectedIcon = ({ size = 44 }) => {
    const nodes = [[8, 8], [40, 8], [40, 40], [8, 40]];
    return (
        <svg {...iconProps(size)}>
            {/* Tools around a hub, with data moving in from each one */}
            {nodes.map(([x, y]) => (
                <path key={`l${x}${y}`} d={`M${x} ${y} L24 24`} opacity="0.35" />
            ))}
            {nodes.map(([x, y]) => (
                <circle key={`n${x}${y}`} cx={x} cy={y} r="3.5" />
            ))}
            <circle cx="24" cy="24" r="6">
                <animate attributeName="r" values="6;6.8;6" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <circle cx="24" cy="24" r="2" fill="currentColor" />
            {nodes.map(([x, y], i) => (
                <circle key={`p${x}${y}`} r="1.5" fill="currentColor" opacity="0">
                    <animateMotion path={`M${x} ${y} L24 24`} dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.75;1" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
    );
};

const TrafficIcon = ({ size = 44 }) => (
    <svg {...iconProps(size)}>
        {/* Gauge whose needle surges to the top and holds steady */}
        <path d="M6 32 A18 18 0 0 1 42 32" />
        <path d="M10.5 20 L13 21.5 M24 14 V17 M37.5 20 L35 21.5" opacity="0.5" />
        <path d="M24 32 L24 19">
            <animateTransform attributeName="transform" type="rotate" values="-65 24 32;58 24 32;48 24 32;55 24 32;55 24 32;-65 24 32" keyTimes="0;0.25;0.35;0.45;0.85;1" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="24" cy="32" r="2" fill="currentColor" />
        {/* Traffic bars rising underneath */}
        {[10, 18, 26, 34].map((x, i) => (
            <path key={x} d={`M${x + 2} 43 V39`} strokeWidth="3">
                <animate attributeName="d" values={`M${x + 2} 43 V42;M${x + 2} 43 V${38 - i};M${x + 2} 43 V${38 - i};M${x + 2} 43 V42`} keyTimes="0;0.25;0.85;1" dur="3s" repeatCount="indefinite" />
            </path>
        ))}
    </svg>
);

const technicalCards = [
    {
        num: "01",
        mobileOrder: "max-md:order-1",
        title: "Headless",
        desc: "Write it once, publish it everywhere. Your website, app and newsletter all pull from the same content.",
        textColor: "text-white",
        icon: HeadlessIcon
    },
    {
        num: "02",
        mobileOrder: "max-md:order-2",
        title: "Access by role",
        desc: "Writers, editors and admins each get the screens they need. Nothing more, nothing less.",
        textColor: "text-black",
        icon: AccessIcon
    },
    {
        num: "03",
        mobileOrder: "max-md:order-3",
        title: "Connected",
        desc: "Plugged into your CRM, payments, email and the tools you already use. No copying data by hand.",
        textColor: "text-black",
        icon: ConnectedIcon
    },
    {
        num: "04",
        mobileOrder: "max-md:order-4",
        title: "Built for traffic",
        desc: "Stays fast on your busiest day, whether it's a launch, a sale or breaking news.",
        textColor: "text-black",
        icon: TrafficIcon
    }
];

const TechCard = ({ card, className }) => {
    const Icon = card.icon;

    return (
        <div
            className={`${className} relative group rounded-2xl border border-[#002bba]/15 overflow-hidden`}
        >
            <div className="w-full h-full p-8 md:p-10 flex flex-col justify-between rounded-2xl min-h-[20rem] md:min-h-[450px] bg-[#002bba10] group-hover:bg-[#002bba] transition-colors duration-500 ease-out text-[#002bba] group-hover:text-white relative z-10">
                <div className="flex justify-between items-start gap-4 relative z-10">
                    <h4 data-para-effect className="text-5xl font-bold max-w-[80%] uppercase leading-tight tracking-tight text-[#002bba] group-hover:text-white transition-colors duration-500 ease-out">
                        {card.num}
                    </h4>
                    <div className="shrink-0 text-[#002bba] group-hover:text-white transition-colors duration-500 ease-out">
                        <Icon size={44} />
                    </div>
                </div>
                <div className="mt-16 relative z-10 text-[#002bba] group-hover:text-white transition-colors duration-500 ease-out">
                    <p className="text-3xl font-bold mb-3">{card.title}</p>
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
                    <div className="text-xs max-sm:hidden">
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