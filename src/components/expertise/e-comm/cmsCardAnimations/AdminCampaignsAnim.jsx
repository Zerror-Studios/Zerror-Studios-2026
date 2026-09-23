"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiWhatsappLine,
    RiMailLine,
    RiMessage3Line,
    RiCheckDoubleLine
} from '@remixicon/react';

// Live simulated campaign increments
const CAMPAIGN_METRICS = [
    { whatsapp: 823, email: 1589, check1: "8/12", check2: "4/5" },
    { whatsapp: 847, email: 1640, check1: "9/12", check2: "4/5" },
    { whatsapp: 885, email: 1720, check1: "11/12", check2: "5/5" },
    { whatsapp: 920, email: 1810, check1: "12/12", check2: "5/5" }
];

// Hook for smooth numerical interpolation
function useSmoothNumber(targetValue, duration = 800) {
    const [current, setCurrent] = useState(targetValue);
    const startRef = useRef(targetValue);
    const targetRef = useRef(targetValue);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startRef.current = current;
        targetRef.current = targetValue;
        startTimeRef.current = performance.now();

        let animId;
        const step = (now) => {
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(startRef.current + (targetRef.current - startRef.current) * ease);
            setCurrent(val);

            if (progress < 1) {
                animId = requestAnimationFrame(step);
            }
        };

        animId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animId);
    }, [targetValue, duration]);

    return current;
}

function AdminCampaignsAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance metrics every 3.2 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_METRICS.length);
        }, 3200);

        return () => clearInterval(interval);
    }, [isHovered]);

    const metrics = CAMPAIGN_METRICS[currentIdx];
    const animatedWhatsapp = useSmoothNumber(metrics.whatsapp, 750);
    const animatedEmail = useSmoothNumber(metrics.email, 750);

    return (
        <div
            className="absolute inset-x-0 top-0 bottom-[33%] sm:bottom-[35%] px-3 sm:px-6 flex flex-col justify-center pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes floatWhatsappPill {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes floatEmailPill {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes pulseChatHalo {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.4)); }
                    50% { transform: scale(1.06); filter: drop-shadow(0 0 14px rgba(34, 197, 94, 0.8)); }
                }
                @keyframes spinRedOrbitArc {
                    0% {
                        transform: rotate(0deg);
                        filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));
                    }
                    50% {
                        filter: drop-shadow(0 0 9px rgba(239, 68, 68, 0.9));
                    }
                    100% {
                        transform: rotate(360deg);
                        filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));
                    }
                }
                @keyframes floatChecklist {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes textPopFade {
                    0% { opacity: 0; transform: translateY(2px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-float-wa {
                    animation: floatWhatsappPill 3.6s ease-in-out infinite;
                }
                .anim-float-mail {
                    animation: floatEmailPill 4s ease-in-out infinite;
                }
                .anim-pulse-chat {
                    animation: pulseChatHalo 2.8s ease-in-out infinite;
                }
                .anim-spin-red-arc {
                    animation: spinRedOrbitArc 6s linear infinite;
                    transform-origin: center center;
                }
                .anim-float-checks {
                    animation: floatChecklist 4.4s ease-in-out infinite;
                }
                .anim-pop-text {
                    animation: textPopFade 0.35s ease-out forwards;
                }
            `}</style>

            {/* Central Orbit & Badges Composition */}
            <div className="relative w-full max-w-[85%] scale-90 -translate-y-5 mx-auto flex items-center justify-center">
                {/* Orbit Circle Container */}
                <div className="relative w-[65%] aspect-square flex items-center justify-center">
                    {/* 1. Static SVG Orbit Track */}
                    <svg 
                        className="absolute inset-0 w-full h-full overflow-visible" 
                        viewBox="0 0 200 200"
                    >
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.22)"
                            strokeWidth="1.5"
                        />
                    </svg>

                    {/* 2. Rotating SVG Orbit Arc - 360 Degree Continuous Rotation */}
                    <svg 
                        className="absolute inset-0 w-full h-full overflow-visible anim-spin-red-arc pointer-events-none" 
                        viewBox="0 0 200 200"
                    >
                        <path
                            d="M 100,20 A 80 80 0 0 0 60,169"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3.8"
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Central Headline: "LET'S DISCUSS" */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center select-none">
                        <span className="text-white leading-none text-xl sm:text-2xl font-sans drop-shadow-md">
                            LET&apos;S
                        </span>
                        <span className="text-white leading-none text-xl sm:text-2xl font-sans mt-1.5 drop-shadow-md">
                            DISCUSS
                        </span>
                    </div>

                    {/* Node 1: Top WhatsApp Badge (Black Pill) */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20  pointer-events-auto cursor-pointer">
                        <div className="bg-black/95 text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 pl-1! py-1 rounded-full  shadow-2xl flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center text-white shrink-0 shadow-sm">
                                <RiWhatsappLine size={13} />
                            </div>
                            <span className="font-sans tabular-nums">{animatedWhatsapp.toLocaleString()}+</span>
                        </div>
                    </div>

                    {/* Node 2: Left iOS Message Bubble (Overlapping Red Arc) */}
                    <div className="absolute top-[48%] left-0 -translate-y-1/2 z-20  pointer-events-auto cursor-pointer">
                        <div className="w-12 h-12  rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl">
                            {/* Inner Green App Icon */}
                            <div className="w-7 h-7 rounded-xl bg-gradient-to-b from-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-md">
                                <RiMessage3Line size={12} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Node 3: Bottom-Right Email Badge (Frosted Smokey Glass Pill) */}
                    <div className="absolute bottom-4 sm:bottom-10 right-0 z-20  pointer-events-auto cursor-pointer">
                        <div className="bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold px-2.5 pl-1! sm:px-3 py-1 rounded-full border border-white/25 shadow-2xl flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-[#ea580c] flex items-center justify-center text-white shrink-0 shadow-sm">
                                <RiMailLine size={12} />
                            </div>
                            <span className="font-sans tabular-nums">{animatedEmail.toLocaleString()}+</span>
                        </div>
                    </div>
                </div>

                {/* Bottom-Left Floating Checklist Pills */}
                <div className="absolute -bottom-6 sm:-bottom-5 -left-5 flex flex-col gap-1.5 z-30 anim-float-checks pointer-events-auto">
                    {/* Pill 1: Images with all text */}
                    <div className="bg-white w-fit text-slate-800 px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center gap-2.5 sm:gap-3 border border-slate-100">
                        <span key={`chk1-${currentIdx}`} className="font-bold text-slate-900 text-[11px] sm:text-xs font-sans tabular-nums anim-pop-text">
                            {metrics.check1}
                        </span>
                        <span className="text-slate-500 font-medium text-[9.5px] sm:text-[10.5px] whitespace-nowrap">
                            Images with all text
                        </span>
                        <RiCheckDoubleLine size={13} className="text-slate-400 shrink-0 ml-auto" />
                    </div>

                    {/* Pill 2: Page metadata */}
                    <div className="bg-white w-fit text-slate-800 px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center gap-2.5 sm:gap-3 border border-slate-100">
                        <span key={`chk2-${currentIdx}`} className="font-bold text-slate-900 text-[11px] sm:text-xs font-sans tabular-nums anim-pop-text">
                            {metrics.check2}
                        </span>
                        <span className="text-slate-500 font-medium text-[9.5px] sm:text-[10.5px] whitespace-nowrap">
                            Page metadata
                        </span>
                        <RiCheckDoubleLine size={13} className="text-slate-400 shrink-0 ml-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(AdminCampaignsAnim);
