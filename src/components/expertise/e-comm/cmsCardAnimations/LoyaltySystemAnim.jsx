"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    RiTimeLine,
    RiCheckLine
} from '@remixicon/react';

const COURSES = [
    {
        title: "Glassmorphism 3D Art",
        subtitle: "Master Class.",
        duration: "12 hours",
        level: "Beginner",
        opened: 85,
        clicked: 26,
    },
    {
        title: "Advanced 3D Web Motion",
        subtitle: "Master Class.",
        duration: "16 hours",
        level: "Intermediate",
        opened: 91,
        clicked: 34,
    },
    {
        title: "Interactive WebGL Shaders",
        subtitle: "Master Class.",
        duration: "18 hours",
        level: "Mastery",
        opened: 95,
        clicked: 42,
    }
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

function LoyaltySystemAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Smoothly cycle presets every 3.4 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % COURSES.length);
        }, 3400);

        return () => clearInterval(interval);
    }, [isHovered]);

    const activeCourse = COURSES[currentIdx];
    const animatedOpened = useSmoothNumber(activeCourse.opened, 750);
    const animatedClicked = useSmoothNumber(activeCourse.clicked, 750);

    const handleSubscribe = (e) => {
        e.stopPropagation();
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 2000);
    };

    return (
        <div 
            className="absolute inset-x-0 bottom-0 px-3 sm:px-6 pb-4 sm:pb-6 flex flex-col justify-center pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes floatPillBob {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes floatStatTop {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(-1deg); }
                }
                @keyframes floatStatBottom {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes livePulseBeacon {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.3); }
                }
                @keyframes textSlideFade {
                    0% { opacity: 0; transform: translateY(3px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-float-pill {
                    animation: floatPillBob 3.6s ease-in-out infinite;
                }
                .anim-float-stat1 {
                    animation: floatStatTop 4.2s ease-in-out infinite;
                }
                .anim-float-stat2 {
                    animation: floatStatBottom 3.8s ease-in-out infinite;
                }
                .anim-live-pulse {
                    animation: livePulseBeacon 1.8s ease-in-out infinite;
                }
                .anim-text-fade {
                    animation: textSlideFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Relative Overlapping Cards Container */}
            <div className="relative w-full max-w-[78%] sm:max-w-[74%] scale-90 sm:scale-95 mx-auto">
                {/* 1. Main Course / Polaroid Card */}
                <div className="w-[80%] sm:w-[82%] bg-[#fbf9f4] rounded-xl p-2.5 sm:p-3 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-white/70 relative z-10 text-slate-900">
                    {/* Artwork Container */}
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-inner bg-slate-900">
                        <Image 
                            src="/images/expertisePage/e-comm/cmsCards/masterclass_art.jpg" 
                            alt="Glassmorphism 3D Art" 
                            fill 
                            className="object-cover"
                            sizes="(max-width: 768px) 60vw, 30vw"
                            priority
                        />

                        {/* Top-Left Live Badge */}
                        <div className="absolute top-2 left-2 z-10 bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1.5 border border-white/20 text-white text-[8px] sm:text-[9px] font-semibold shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 anim-live-pulse shrink-0" />
                            <span className="font-thin">Live</span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-2.5 mb-2 px-0.5">
                        <h4 
                            key={`title-${currentIdx}`} 
                            className=" text-black text-xs sm:text-sm leading-none  font-sans anim-text-fade"
                        >
                            {activeCourse.title}
                            <br />
                            {activeCourse.subtitle}
                        </h4>
                    </div>

                    {/* Divider & Metadata (Hours + Beginner level) */}
                    <div className="border-t border-slate-200/80 pt-2 px-0.5 flex items-center justify-between text-[8px] sm:text-[9.5px] text-slate-600 font-medium">
                        {/* Duration */}
                        <div className="flex items-center gap-1">
                            <RiTimeLine size={12} className="text-slate-600 shrink-0" />
                            <span key={`dur-${currentIdx}`} className="anim-text-fade translate-y-0.5">
                                {activeCourse.duration}
                            </span>
                        </div>

                        {/* Difficulty Level */}
                        <div className="flex items-center gap-1">
                            {/* 3-bar signal icon */}
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-slate-600">
                                <line x1="3" y1="13" x2="3" y2="10" />
                                <line x1="8" y1="13" x2="8" y2="7" />
                                <line x1="13" y1="13" x2="13" y2="4" />
                            </svg>
                            <span key={`lvl-${currentIdx}`} className="anim-text-fade translate-y-0.5">
                                {activeCourse.level}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Floating "Subscribe Now" Pill (Left Side Overlapping) */}
                <div 
                    onClick={handleSubscribe}
                    className={`absolute top-[40%] sm:top-[38%] -left-3 sm:-left-6 z-30 bg-white rounded-full px-3 sm:px-3.5 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.25)] border border-slate-100 flex items-center gap-1.5 pointer-events-auto cursor-pointer anim-float-pill transition-all duration-300 hover:scale-105 active:scale-95 ${
                        isSubscribed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'text-slate-800'
                    }`}
                    title="Subscribe to Masterclass"
                >
                    {isSubscribed ? (
                        <>
                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <RiCheckLine size={10} />
                            </div>
                            <span className="font-bold text-[9px] sm:text-[10px] text-emerald-700 tracking-tight">
                                Subscribed!
                            </span>
                        </>
                    ) : (
                        <>
                            {/* Orange RSS / Feed Icon */}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <path d="M4 11C7.86599 11 11 14.134 11 18" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round"/>
                                <path d="M4 4C11.732 4 18 10.268 18 18" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round"/>
                                <circle cx="5" cy="19" r="2" fill="#f97316"/>
                            </svg>
                            <span className="font-bold text-[9px] sm:text-[10px] text-slate-800 tracking-tight">
                                Subscribe Now
                            </span>
                        </>
                    )}
                </div>

                {/* 3. Floating Stat Card 1 ("OPENED 85%") (Top-Right Overlapping) */}
                <div 
                    className="absolute -top-3 sm:-top-5 -right-3 sm:-right-6 z-20 w-24 sm:w-28 bg-slate-900/40 backdrop-blur-xs border border-white/20 rounded-lg p-2 sm:p-2.5 shadow-2xl text-center anim-float-stat1"
                >
                    <span className="uppercase text-[7.5px] sm:text-[8.5px] tracking-wider text-white/70 font-semibold block">
                        OPENED
                    </span>
                    <span className="text-lg sm:text-xl  text-[#55FF8D] tracking-tight font-sans block leading-none mt-1 drop-shadow-sm tabular-nums">
                        {animatedOpened}%
                    </span>
                </div>

                {/* 4. Floating Stat Card 2 ("CLICKED 26%") (Middle-Right Overlapping) */}
                <div 
                    className="absolute top-[28%] sm:top-[26%] -right-4 sm:-right-8 z-20 w-24 sm:w-28 bg-white z-[-1] rounded-lg text-center p-2 sm:p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-slate-100  pl-2.5 sm:pl-3 anim-float-stat2"
                >
                    <span className="uppercase text-[7.5px] sm:text-[8.5px] tracking-wider text-slate-400 font-semibold block">
                        CLICKED
                    </span>
                    <span className="text-lg sm:text-xl font-medium text-slate-900 tracking-tight font-sans block leading-none mt-1 tabular-nums">
                        {animatedClicked}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(LoyaltySystemAnim);
