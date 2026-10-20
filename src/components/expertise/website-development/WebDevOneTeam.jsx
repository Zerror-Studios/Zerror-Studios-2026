"use client";
import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
gsap.registerPlugin(ScrollTrigger)

// Looping line icons, animated with SVG so they keep moving without JS
const MotionIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path id="one_team_curve" d="M4 36 C 16 36, 18 12, 30 12 S 44 12, 44 12" strokeDasharray="60" strokeDashoffset="60">
            <animate attributeName="stroke-dashoffset" values="60;0;0;60" keyTimes="0;0.45;0.8;1" dur="3s" repeatCount="indefinite" />
        </path>
        <circle cx="4" cy="36" r="2.5" fill="currentColor" />
        <circle r="3" fill="currentColor">
            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1;1;0" keyTimes="0;0.45;0.8;1" calcMode="linear">
                <mpath href="#one_team_curve" />
            </animateMotion>
        </circle>
    </svg>
);

const CodeIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="4" y="8" width="40" height="32" rx="2" />
        <path d="M4 16 H44" />
        <circle cx="8" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M18 24 L13 29 L18 34">
            <animateTransform attributeName="transform" type="translate" values="0 0;-2 0;0 0" dur="1.6s" repeatCount="indefinite" />
        </path>
        <path d="M30 24 L35 29 L30 34">
            <animateTransform attributeName="transform" type="translate" values="0 0;2 0;0 0" dur="1.6s" repeatCount="indefinite" />
        </path>
        <path d="M24 24 V34">
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1s" repeatCount="indefinite" />
        </path>
    </svg>
);

const TeamIcon = () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="14" cy="24" r="12">
            <animate attributeName="cx" values="14;20;20;14" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="34" cy="24" r="12">
            <animate attributeName="cx" values="34;28;28;34" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="24" cy="24" r="0" fill="currentColor">
            <animate attributeName="r" values="0;2.5;2.5;0" keyTimes="0;0.4;0.7;1" dur="3s" repeatCount="indefinite" />
        </circle>
    </svg>
);

const columns = [
    { title: "Motion, designed in.", line: "Planned with the page, never added later.", Icon: MotionIcon },
    { title: "Built from the design.", line: "The developer saw it being designed.", Icon: CodeIcon },
    { title: "One team to talk to.", line: "One group, one folder, one answer.", Icon: TeamIcon },
];

// Card fills with a white pixel grid on hover and flips its text to blue
const OneTeamCard = ({ item, i }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { Icon } = item;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="one_team_card group relative border rounded-2xl overflow-hidden border-white/30"
        >
            <PixelGridCanvas
                isActive={isHovered}
                boxSize={30}
                color="#ffffff"
                duration={1.2}
                className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none z-0"
            />
            <div className="relative z-10 p-8 space-y-24 transition-colors duration-500 md:group-hover:text-[#002bba]">
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

// Dark statement block: design and build by the same people
const WebDevOneTeam = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".one_team_card", {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".one_team_cards",
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });
    }, { scope: container });

    return (
        <div ref={container} className="noise-bg w-full bg_blue relative overflow-hidden text-white py-16 md:py-28">
            <div className="w-full padding relative z-10 space-y-16 md:space-y-28">

                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div className="col-span-2 md:pr-12">
                        <h2 data-para-effect className="primary-font text-5xl leading-none">
                            Designed and built <br className="max-sm:hidden" /> by the same people.
                        </h2>
                    </div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
                            No handover between a design team and a dev team. The motion and detail you approve are what goes live.
                        </h3>
                    </div>
                </div>

                <div className="one_team_cards w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                    {columns.map((item, i) => (
                        <OneTeamCard key={i} item={item} i={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WebDevOneTeam
