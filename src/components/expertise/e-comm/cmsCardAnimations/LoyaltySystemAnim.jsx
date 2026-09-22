"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiBroadcastLine,
    RiTimeLine,
    RiSparklingLine,
    RiGiftLine,
    RiCheckLine
} from '@remixicon/react';

// 4 loyalty & reward cycle states
const LOYALTY_PRESETS = [
    {
        tier: "Gold VIP Member",
        points: 750,
        maxPoints: 1000,
        progress: 75,
        headline: "Built-In Tier 1: Free Express Shipping",
        desc: "Automated checkout loyalty perks with zero SaaS plugin fees.",
        opened: 85,
        clicked: 26,
        pillIcon: RiBroadcastLine,
        pillText: "Subscribe Now",
        pillBadge: "+150 Pts",
        pillBadgeColor: "bg-amber-100 text-amber-800"
    },
    {
        tier: "Gold VIP Member",
        points: 880,
        maxPoints: 1000,
        progress: 88,
        headline: "VIP Reward: 15% Off Next Collection Drop",
        desc: "Native rewards trigger instantly based on repeat purchase frequency.",
        opened: 89,
        clicked: 31,
        pillIcon: RiGiftLine,
        pillText: "Reward Unlocked",
        pillBadge: "+250 Pts",
        pillBadgeColor: "bg-emerald-100 text-emerald-800"
    },
    {
        tier: "Platinum VIP Unlocked",
        points: 1000,
        maxPoints: 1000,
        progress: 100,
        headline: "Tier 3: Early Access & Private Masterclasses",
        desc: "Exclusive VIP drop invitations delivered direct via SMS & WhatsApp.",
        opened: 94,
        clicked: 38,
        pillIcon: RiSparklingLine,
        pillText: "Platinum Active",
        pillBadge: "VIP Elite",
        pillBadgeColor: "bg-indigo-100 text-indigo-800"
    },
    {
        tier: "Black Elite Member",
        points: 1250,
        maxPoints: 1500,
        progress: 83,
        headline: "Tier 4: Dedicated Stylist & Concierge Checkout",
        desc: "Turn high-value customers into lifelong brand advocates effortlessly.",
        opened: 96,
        clicked: 42,
        pillIcon: RiGiftLine,
        pillText: "Concierge Live",
        pillBadge: "Top 1%",
        pillBadgeColor: "bg-purple-100 text-purple-800"
    }
];

// Reusable smooth number animator
function useAnimatedNumber(targetValue, duration = 800) {
    const [displayValue, setDisplayValue] = useState(targetValue);
    const startValueRef = useRef(targetValue);
    const targetRef = useRef(targetValue);
    const startTimeRef = useRef(null);

    useEffect(() => {
        startValueRef.current = displayValue;
        targetRef.current = targetValue;
        startTimeRef.current = performance.now();

        let animId;
        const update = (now) => {
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValueRef.current + (targetRef.current - startValueRef.current) * ease);
            setDisplayValue(current);

            if (progress < 1) {
                animId = requestAnimationFrame(update);
            }
        };

        animId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animId);
    }, [targetValue, duration]);

    return displayValue;
}

function LoyaltySystemAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % LOYALTY_PRESETS.length);
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    const data = LOYALTY_PRESETS[currentIdx];
    const animatedPoints = useAnimatedNumber(data.points, 800);
    const animatedOpened = useAnimatedNumber(data.opened, 800);
    const animatedClicked = useAnimatedNumber(data.clicked, 800);

    const PillIcon = data.pillIcon;

    return (
        <div className="absolute inset-x-0 bottom-0 top-[36%] px-5 pb-5 flex flex-col justify-end pointer-events-none select-none">
            {/* Embedded Smooth Transition Keyframes */}
            <style>{`
                @keyframes loyaltySlideFade {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-loyalty-fade {
                    animation: loyaltySlideFade 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Top Row: Floating Subscribe Pill & Stat Badges (matching img5.webp) */}
            <div className="flex items-end justify-between mb-2">
                {/* Subscribe / Claim Pill */}
                <div className="bg-white/95 px-3 py-1.5 rounded-full border border-white/80 shadow-md flex items-center gap-1.5 transition-all duration-500">
                    <div className="w-5 h-5 rounded-full bg-amber-500 center text-white shadow-xs">
                        <PillIcon size={12} />
                    </div>
                    <span
                        key={`pillText-${currentIdx}`}
                        className="text-[11px] font-bold text-slate-800 anim-loyalty-fade"
                    >
                        {data.pillText}
                    </span>
                    <span
                        key={`pillBadge-${currentIdx}`}
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-black/5 anim-loyalty-fade ${data.pillBadgeColor}`}
                    >
                        {data.pillBadge}
                    </span>
                </div>

                {/* Floating Metric Badges (OPENED & CLICKED from img5.webp) */}
                <div className="flex  gap-1.5">
                    {/* Opened Rate */}
                    <div className="bg-black/60 border border-white/20 px-3 py-1 rounded-xl shadow-md ">
                        <span className="text-[8px] tracking-wider text-white/70 block uppercase font-mono">OPENED</span>
                        <span className="text-sm font-extrabold text-emerald-400 font-mono leading-none tabular-nums">
                            {animatedOpened}%
                        </span>
                    </div>

                    {/* Clicked Rate */}
                    <div className="bg-white/95 border border-white/70 px-3 py-1 rounded-xl shadow-md ">
                        <span className="text-[8px] tracking-wider text-slate-500 block uppercase font-mono">CLICKED</span>
                        <span className="text-sm font-extrabold text-slate-900 font-mono leading-none tabular-nums">
                            {animatedClicked}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Masterclass / Loyalty Program Card */}
            <div className="w-full bg-[#f8f6f0]/95 border border-white/80 rounded-2xl p-3.5 sm:p-4 shadow-xl flex flex-col gap-2 text-slate-900">
                {/* Top Live Banner */}
                <div className="flex items-center justify-between">
                    <div className="bg-[#002bba] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Loyalty Engine</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                        <RiTimeLine size={12} />
                        <span>Automated Triggers</span>
                    </div>
                </div>

                {/* Reward Banner Title & Desc with smooth text transition */}
                <div className="min-h-[38px] flex flex-col justify-center">
                    <h5
                        key={`title-${currentIdx}`}
                        className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 leading-tight block anim-loyalty-fade"
                    >
                        {data.headline}
                    </h5>
                    <p
                        key={`desc-${currentIdx}`}
                        className="text-[10px] text-slate-500 mt-0.5 leading-tight anim-loyalty-fade"
                    >
                        {data.desc}
                    </p>
                </div>

                {/* Dynamic Tier Progress Bar */}
                <div className="pt-1">
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-600 mb-1">
                        <span
                            key={`tier-${currentIdx}`}
                            className="font-semibold text-slate-700 anim-loyalty-fade"
                        >
                            {data.tier}
                        </span>
                        <span className="font-bold text-[#002bba] tabular-nums">
                            {animatedPoints} / {data.maxPoints} Pts
                        </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#002bba] via-indigo-500 to-emerald-500 rounded-full"
                            style={{
                                width: `${data.progress}%`,
                                transition: 'width 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(LoyaltySystemAnim);
