"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSearchLine,
    RiGlobalLine,
    RiEqualizerLine,
    RiCompass3Line,
    RiTrophyLine,
    RiSparklingLine,
    RiCheckLine
} from '@remixicon/react';

const SEARCH_STATES = [
    {
        query: "luxury apparel direct-to-consumer",
        engine: "Google",
        rank: "#1",
        metric: "Top 0.1% Organic",
        score: "99.8%",
        traffic: "+340% mo/mo",
        activeEngineIdx: 0
    },
    {
        query: "sustainable jewelry direct store",
        engine: "DuckDuckGo",
        rank: "#1",
        metric: "Rank #1 Verified",
        score: "100%",
        traffic: "+280% mo/mo",
        activeEngineIdx: 1
    },
    {
        query: "bespoke leather goods ecommerce",
        engine: "Yahoo!",
        rank: "#1",
        metric: "Top 0.2% Global",
        score: "99.2%",
        traffic: "+195% mo/mo",
        activeEngineIdx: 2
    },
    {
        query: "high-growth brand architecture",
        engine: "Google",
        rank: "#1",
        metric: "Indexed 100%",
        score: "100%",
        traffic: "+420% mo/mo",
        activeEngineIdx: 0
    }
];

const ENGINES = [
    { name: "Google", rank: "#1", icon: "G" },
    { name: "DuckDuckGo", rank: "#1", icon: "D" },
    { name: "Yahoo!", rank: "#1", icon: "Y!" },
];

function AnalyticsAnswerAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isToggleOn, setIsToggleOn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % SEARCH_STATES.length);
            // Gentle toggle micro-animation every cycle
            setIsToggleOn((prev) => !prev);
            setTimeout(() => setIsToggleOn(true), 300);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const state = SEARCH_STATES[currentIdx];

    return (
        <div className="absolute inset-x-0 top-0 bottom-[36%] px-5 pt-5 flex flex-col justify-start pointer-events-none select-none">
            {/* Embedded Keyframes for Smooth Transitions */}
            <style>{`
                @keyframes querySlideFade {
                    0% { opacity: 0; transform: translateY(5px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-query-slide {
                    animation: querySlideFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Top Row: Mini Visibility Pill & Rank Trophy Pill */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
                {/* Search Engine Visibility Pill Card (matching img4.webp) */}
                <div className="bg-black/50 border border-white/20 rounded-xl p-2 px-3 shadow-md flex items-center justify-between gap-3 text-white">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-semibold tracking-tight">Search Engine Visibility</span>
                        <span className="text-[8px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono border border-emerald-400/30">
                            Indexed
                        </span>
                    </div>

                    {/* Animated Toggle Switch */}
                    <div
                        className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-400 flex items-center ${
                            isToggleOn ? 'bg-[#002bba] justify-end' : 'bg-slate-500 justify-start'
                        }`}
                    >
                        <div className="w-3 h-3 rounded-full bg-white shadow-xs transition-transform duration-300" />
                    </div>
                </div>

                {/* Floating #1 Rank Trophy Badge */}
                <div className="bg-amber-400 text-black text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-amber-300 shadow-md flex items-center gap-1">
                    <RiTrophyLine size={12} className="text-black" />
                    <span className="font-mono">{state.rank} Active</span>
                </div>
            </div>

            {/* Main Modal: SEO Settings & Analytics (matching img4.webp) */}
            <div className="w-full bg-white/95 border border-white/80 rounded-2xl p-3 sm:p-3.5 shadow-xl flex flex-col gap-2 text-slate-800 relative">
                {/* Modal Title Bar */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                    <div className="flex items-center gap-1.5">
                        <RiCompass3Line size={14} className="text-[#002bba]" />
                        <span className="text-xs font-bold text-slate-900 tracking-tight">SEO Settings & Queries</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono font-bold">
                        <RiCheckLine size={11} className="text-emerald-600" />
                        <span>Score {state.score}</span>
                    </div>
                </div>

                {/* Search Input Box with Smooth Query Transition */}
                <div className="bg-slate-100/90 border border-slate-200/80 rounded-xl p-2 px-3 flex items-center justify-between text-xs text-slate-700">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <RiSearchLine size={13} className="text-[#002bba] shrink-0" />
                        <div className="relative h-4 flex items-center overflow-hidden flex-1">
                            <span
                                key={currentIdx}
                                className="font-mono text-[11px] truncate text-slate-900 font-semibold anim-query-slide block"
                            >
                                {state.query}
                            </span>
                        </div>
                    </div>
                    <RiEqualizerLine size={13} className="text-slate-400 shrink-0" />
                </div>

                {/* Active Ranking Highlight Bar */}
                <div className="bg-blue-50/90 text-[#002bba] border border-blue-200/80 rounded-lg px-2.5 py-1.5 text-[11px] flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-1.5">
                        <RiSparklingLine size={13} className="text-[#002bba]" />
                        <span>Organic Search Position</span>
                    </div>
                    <span
                        key={`metric-${currentIdx}`}
                        className="text-[10px] font-mono bg-[#002bba] text-white px-2 py-0.5 rounded-md anim-query-slide font-bold"
                    >
                        {state.metric}
                    </span>
                </div>

                {/* 3 Floating Search Engine Pills (Google, DuckDuckGo, Yahoo! - matching img4.webp) */}
                <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-slate-200/60">
                    {ENGINES.map((engine, idx) => {
                        const isActive = state.activeEngineIdx === idx;
                        return (
                            <div
                                key={engine.name}
                                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border flex items-center justify-center gap-1.5 transition-all duration-500 select-none ${
                                    isActive
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400 shadow-md scale-[1.03]'
                                        : 'bg-slate-100/90 text-slate-600 border-slate-200'
                                }`}
                            >
                                <RiGlobalLine size={11} className={isActive ? 'text-white' : 'text-slate-400'} />
                                <span>{engine.name}</span>
                                <span className={`font-mono text-[9px] ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                                    ({engine.rank})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default React.memo(AnalyticsAnswerAnim);
