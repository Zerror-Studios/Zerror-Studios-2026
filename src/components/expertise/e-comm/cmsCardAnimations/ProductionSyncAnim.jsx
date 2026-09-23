"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiArrowRightUpLine,
    RiCheckLine
} from '@remixicon/react';

// 4 distinct dataset options cycling smoothly every 3 seconds
const OPTIONS = [
    {
        id: 0,
        visits: 852,
        visitsGrowth: "16% mo/mo",
        orders: 206,
        ordersGrowth: "10% mo/mo",
        revenue: 8850,
        revenueGrowth: "10% mo/mo",
        peak: { x: 178, y: 16 },
        // Exact reference ECG baseline (peak at x:178, y:16)
        path: "M 0,84 L 64,84 L 73,98 L 78,68 L 84,92 L 89,84 L 122,84 L 130,95 L 137,68 L 143,84 L 160,84 L 178,16 L 190,110 L 198,66 L 205,94 L 212,72 L 218,84 L 320,84"
    },
    {
        id: 1,
        visits: 1140,
        visitsGrowth: "24% mo/mo",
        orders: 312,
        ordersGrowth: "18% mo/mo",
        revenue: 13420,
        revenueGrowth: "15% mo/mo",
        peak: { x: 215, y: 12 },
        // Mid-peak surge shifted right (peak at x:215, y:12)
        path: "M 0,84 L 50,84 L 58,72 L 66,96 L 74,65 L 82,84 L 110,84 L 120,70 L 130,98 L 140,84 L 195,84 L 215,12 L 228,105 L 236,70 L 244,92 L 252,78 L 260,84 L 320,84"
    },
    {
        id: 2,
        visits: 980,
        visitsGrowth: "19% mo/mo",
        orders: 254,
        ordersGrowth: "14% mo/mo",
        revenue: 10890,
        revenueGrowth: "12% mo/mo",
        peak: { x: 135, y: 22 },
        // Early cycle spike (peak at x:135, y:22)
        path: "M 0,84 L 45,84 L 55,95 L 62,70 L 70,90 L 78,84 L 115,84 L 135,22 L 148,108 L 158,68 L 168,92 L 178,84 L 210,84 L 222,65 L 232,96 L 242,75 L 250,84 L 320,84"
    },
    {
        id: 3,
        visits: 1420,
        visitsGrowth: "32% mo/mo",
        orders: 418,
        ordersGrowth: "26% mo/mo",
        revenue: 18250,
        revenueGrowth: "22% mo/mo",
        peak: { x: 245, y: 14 },
        // High volume record surge (peak at x:245, y:14)
        path: "M 0,84 L 60,84 L 70,74 L 78,96 L 86,68 L 94,84 L 140,84 L 150,92 L 160,65 L 170,84 L 225,84 L 245,14 L 258,112 L 266,64 L 274,90 L 282,76 L 290,84 L 320,84"
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
            // Ease-out cubic curve for natural deceleration
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

function ProductionSyncAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance through the 4 options every 3 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % OPTIONS.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const activeOption = OPTIONS[currentIdx];

    // Smooth counting numbers
    const animatedVisits = useSmoothNumber(activeOption.visits, 750);
    const animatedOrders = useSmoothNumber(activeOption.orders, 750);
    const animatedRevenue = useSmoothNumber(activeOption.revenue, 750);

    return (
        <div 
            className="absolute inset-x-0 bottom-0 top-[28%] sm:top-[20%] px-3 sm:px-6 pb-4 sm:pb-6 flex flex-col justify-center pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes beaconPulse {
                    0%, 100% {
                        r: 10px;
                        opacity: 0.3;
                    }
                    50% {
                        r: 16px;
                        opacity: 0.65;
                    }
                }
                @keyframes beaconWave {
                    0% {
                        r: 4px;
                        opacity: 0.9;
                    }
                    100% {
                        r: 24px;
                        opacity: 0;
                    }
                }
                @keyframes floatOrdersCard {
                    0%, 100% {
                        transform: translateY(0px) rotate(-1deg);
                    }
                    50% {
                        transform: translateY(-4px) rotate(0.5deg);
                    }
                }
                @keyframes floatRevenueCard {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }
                @keyframes lineGlowPulse {
                    0%, 100% {
                        filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4));
                    }
                    50% {
                        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.9));
                    }
                }
                @keyframes checkmarkPop {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                @keyframes tagFade {
                    0% { opacity: 0; transform: translateY(2px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-beacon-glow {
                    animation: beaconPulse 2.4s ease-in-out infinite;
                }
                .anim-beacon-wave {
                    animation: beaconWave 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
                }
                .anim-float-orders {
                    animation: floatOrdersCard 4.2s ease-in-out infinite;
                }
                .anim-float-revenue {
                    animation: floatRevenueCard 3.6s ease-in-out infinite;
                }
                .anim-line-glow {
                    animation: lineGlowPulse 3s ease-in-out infinite;
                }
                .anim-check-pop {
                    animation: checkmarkPop 2.8s ease-in-out infinite;
                }
                .anim-tag-fade {
                    animation: tagFade 0.35s ease-out forwards;
                }
            `}</style>

            {/* Container for the 3 Overlapping Cards */}
            <div className="relative w-full max-w-[70%] scale-90 mx-auto">
                {/* 1. Main Background Glassmorphism Analytics Card */}
                <div className="relative w-full bg-white/[0.08] backdrop-blur-xs border border-white/10 rounded-2xl  p-3.5 sm:p-4.5 shadow-[0_16px_36px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col gap-2">
                    {/* Top Row: Site Visits Header & View All Details Button */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] sm:text-xs text-white/70 font-medium block">
                                Site Visits
                            </span>
                            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans leading-none pt-0.5 tabular-nums">
                                {animatedVisits.toLocaleString()}+
                            </div>
                            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-white/80 whitespace-nowrap pt-1">
                                <RiArrowRightUpLine size={12} className="text-white shrink-0" />
                                <span key={`growth-${currentIdx}`} className="font-medium anim-tag-fade">
                                    {activeOption.visitsGrowth}
                                </span>
                                <span className="text-white/40 ml-1 hover:text-white/70 transition-colors cursor-pointer underline pointer-events-auto">
                                    View all
                                </span>
                            </div>
                        </div>

                        {/* View All Details Pill Button with 4-Option Dots */}
                        <div className="flex items-center gap-1.5 pointer-events-auto">
                            
                            <div className="border border-white/30 text-white/90 text-[8.5px] sm:text-[9.5px] font-medium px-2.5 py-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shadow-xs whitespace-nowrap">
                                View All Details
                            </div>
                        </div>
                    </div>

                    {/* Chart Container with Horizontal Gridlines & Animated Morphing ECG Spike Line */}
                    <div className="relative w-full h-24 sm:h-28 mt-1">
                        {/* SVG ECG Pulse / Spike Chart */}
                        <svg 
                            className="w-full h-full overflow-visible" 
                            viewBox="0 0 320 120" 
                            preserveAspectRatio="none"
                        >
                            {/* Horizontal Gridlines */}
                            {/* Level 300 */}
                            <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            {/* Level 200 */}
                            <line x1="0" y1="52" x2="320" y2="52" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                            {/* Level 100 */}
                            <line x1="0" y1="84" x2="320" y2="84" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                            {/* Level 0 */}
                            <line x1="0" y1="114" x2="320" y2="114" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                            {/* Y-Axis Value Labels matching reference image */}
                            <text x="4" y="24" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">300</text>
                            <text x="300" y="24" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace" textAnchor="end">300</text>

                            <text x="4" y="56" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">200</text>
                            <text x="300" y="56" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace" textAnchor="end">200</text>

                            <text x="300" y="88" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" textAnchor="end">100</text>
                            <text x="300" y="116" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" textAnchor="end">0</text>

                            {/* ECG Pulse Line - Smoothly morphs d path across 4 options */}
                            <path
                                d={activeOption.path}
                                fill="none"
                                stroke="rgba(255,255,255,0.92)"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="anim-line-glow"
                                style={{
                                    transition: 'd 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />

                            {/* Yellow Peak Beacon - Smoothly glides (cx, cy) to active peak */}
                            {/* 1. Expanding wave ripple */}
                            <circle
                                cx={activeOption.peak.x}
                                cy={activeOption.peak.y}
                                r="4"
                                fill="none"
                                stroke="#facc15"
                                strokeWidth="1.5"
                                className="anim-beacon-wave"
                                style={{
                                    transition: 'cx 800ms cubic-bezier(0.4, 0, 0.2, 1), cy 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                            {/* 2. Translucent glow halo */}
                            <circle
                                cx={activeOption.peak.x}
                                cy={activeOption.peak.y}
                                r="11"
                                fill="#facc15"
                                className="anim-beacon-glow"
                                style={{
                                    transition: 'cx 800ms cubic-bezier(0.4, 0, 0.2, 1), cy 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                            {/* 3. Core bright yellow dot */}
                            <circle
                                cx={activeOption.peak.x}
                                cy={activeOption.peak.y}
                                r="4"
                                fill="#fef08a"
                                stroke="#eab308"
                                strokeWidth="1.5"
                                style={{
                                    transition: 'cx 800ms cubic-bezier(0.4, 0, 0.2, 1), cy 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            />
                        </svg>
                    </div>
                </div>

                {/* 2. Floating Coral / Pink Orders Card (Middle Layer, Lower-Left) */}
                <div 
                    className="absolute -bottom-3 sm:-bottom-14 left-1 sm:-left-20 z-20 w-28 sm:w-34 aspect-square bg-[#F6ACAE] rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-white/40 flex flex-col justify-between "
                >
                    <div className="space-y-0.5">
                        <span className="text-white text-[11px] sm:text-xs font-semibold leading-tight block">
                            Orders
                        </span>
                        <span className="text-white/80 text-[8.5px] sm:text-[9.5px] block">
                            Past 30 days
                        </span>
                    </div>

                    <div className="text-white text-2xl sm:text-3xl font-bold tracking-tight font-sans my-auto pt-1 tabular-nums">
                        {animatedOrders.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-1 text-white text-[8.5px] sm:text-[9.5px] font-medium pt-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                            <RiCheckLine size={10} className="text-white" />
                        </div>
                        <span key={`ord-growth-${currentIdx}`} className="anim-tag-fade">
                            {activeOption.ordersGrowth}
                        </span>
                    </div>
                </div>

                {/* 3. Floating White Revenue Card (Foreground Layer, Bottom-Left Overlapping) */}
                <div 
                    className="absolute -bottom-5 sm:-bottom-22 left-14 sm:left-5 z-30 w-36 sm:w-44 bg-white rounded-2xl p-3 sm:p-4 shadow-[0_20px_45px_rgba(0,0,0,0.4)] border border-slate-100 text-slate-800"
                >
                    <div className="space-y-0.5">
                        <span className="text-[#1e1333] text-[11.5px] sm:text-[13px] font-bold block leading-tight">
                            Revenue
                        </span>
                        <span className="text-slate-400 text-[8.5px] sm:text-[9.5px] block">
                            Past 30 days
                        </span>
                    </div>

                    <div className="text-[#1e1333] text-2xl sm:text-3xl font-bold tracking-tight font-sans my-1 sm:my-1.5 tabular-nums">
                        ${animatedRevenue.toLocaleString()}
                    </div>

                    <div className="flex items-center gap-1.5 text-[#ea580c] font-bold text-[9.5px] sm:text-[10.5px]">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#ea580c] flex items-center justify-center shrink-0 shadow-xs anim-check-pop">
                            <RiCheckLine size={10} className="text-white" />
                        </div>
                        <span key={`rev-growth-${currentIdx}`} className="anim-tag-fade">
                            {activeOption.revenueGrowth}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProductionSyncAnim);
