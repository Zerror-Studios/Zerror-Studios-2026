"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSearchLine,
    RiEqualizerLine,
    RiPaletteLine,
    RiKeyLine,
    RiCompass3Line,
    RiGlobalLine
} from '@remixicon/react';

const ENGINES = [
    { name: "Yahoo!", id: "yahoo" },
    { name: "Google", id: "google" },
    { name: "DuckDuckGo", id: "duckduckgo" }
];

function AnalyticsAnswerAnim() {
    const [activeEngine, setActiveEngine] = useState("google");
    const [isToggleOn, setIsToggleOn] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle active search engine pill every 3.2 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveEngine((prev) => {
                if (prev === "google") return "duckduckgo";
                if (prev === "duckduckgo") return "yahoo";
                return "google";
            });
        }, 3200);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div 
            className="absolute inset-x-0 top-0 bottom-[33%] sm:bottom-[35%] px-3 sm:px-6 pt-3 sm:pt-4 flex flex-col justify-center pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes floatPillSubtle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes floatCardGentle {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-3px) rotate(-0.5deg); }
                }
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes popPill {
                    0% { transform: scale(0.96); }
                    50% { transform: scale(1.04); }
                    100% { transform: scale(1); }
                }
                .anim-float-pill {
                    animation: floatPillSubtle 3.4s ease-in-out infinite;
                }
                .anim-float-card {
                    animation: floatCardGentle 4.5s ease-in-out infinite;
                }
                .anim-cursor {
                    animation: cursorBlink 1s step-start infinite;
                }
                .anim-pill-pop {
                    animation: popPill 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Container for Relative Overlapping Cards */}
            <div className="relative w-full max-w-[85%] scale-90 mx-auto">
                {/* 1. Top-Left Floating Glassmorphism Toggle Card */}
                <div 
                    className="absolute -top-3.5 sm:-top-10 -left-2 sm:-left-10 z-10 w-44 sm:w-52 bg-white/15 backdrop-blur-xs border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-[0_12px_24px_rgba(0,0,0,0.25)] anim-float-card pointer-events-auto cursor-pointer"
                    onClick={() => setIsToggleOn(!isToggleOn)}
                    title="Toggle Search Engine Indexing"
                >
                    {/* Header Row: Title & Indexed Pill */}
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-white  text-[9.5px] sm:text-[10.5px] leading-tight">
                            Search Engine Visibility
                        </span>
                        <span className="bg-white text-[#1d4ed8] text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shadow-xs shrink-0">
                            Indexed
                        </span>
                    </div>

                    {/* Subtext */}
                    <p className="text-white/85 text-[7.5px] sm:text-[8.5px] leading-tight mt-1 line-clamp-2">
                        Allow search engines like Google to index this page.
                    </p>

                    {/* Toggle Switch */}
                    <div className="mt-2 flex items-center">
                        <div 
                            className={`w-8 sm:w-9 h-4 sm:h-4.5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
                                isToggleOn ? 'bg-white' : 'bg-white/40'
                            }`}
                        >
                            <div 
                                className={`w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#1d4ed8] shadow-sm transition-transform duration-300 ${
                                    isToggleOn ? 'translate-x-4 sm:translate-x-4.5' : 'translate-x-0'
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Main SEO Settings Modal (Foreground, Centered / Right-Shifted) */}
                <div className="relative z-20 w-[84%] sm:w-[86%] ml-auto bg-white rounded-xl translate-y-5 p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-slate-100 text-slate-800">
                    {/* Modal Title */}
                    <h4 className="text-center font-bold text-slate-900 text-xs sm:text-sm tracking-tight mb-2.5 font-sans">
                        SEO Settings
                    </h4>

                    {/* Search Setting Input Bar */}
                    <div className="bg-[#f4f6fa] rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 border border-slate-200/60 mb-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <RiSearchLine size={12} className="text-slate-400 shrink-0" />
                            <span className="truncate">Search setting</span>
                            <span className="w-[1px] h-2.5 bg-[#3b82f6] anim-cursor shrink-0" />
                        </div>
                        <RiEqualizerLine size={12} className="text-slate-400 shrink-0" />
                    </div>

                    {/* Navigation Menu List */}
                    <div className="space-y-1 text-[9.5px] sm:text-[10.5px]">
                        {/* 1. Appearance */}
                        <div className="flex items-center gap-2 py-0.5 px-1 text-slate-500 font-medium">
                            <RiPaletteLine size={12} className="text-slate-400 shrink-0" />
                            <span>Appearance</span>
                        </div>

                        {/* 2. Search engine (Active Highlighted Row) */}
                        <div className="flex items-center gap-2 py-1 px-2 bg-[#e8edfc] text-[#1d4ed8] rounded-lg -mx-1 font-semibold transition-colors duration-200">
                            <RiSearchLine size={12} className="text-[#2563eb] shrink-0" />
                            <span>Search engine</span>
                        </div>

                        {/* 3. Auto fill */}
                        <div className="flex items-center gap-2 py-0.5 px-1 text-slate-500 font-medium">
                            <RiKeyLine size={12} className="text-slate-400 shrink-0" />
                            <span>Auto fill</span>
                        </div>

                        {/* 4. Default browser */}
                        <div className="flex items-center gap-2 py-0.5 px-1 text-slate-500 font-medium">
                            <RiCompass3Line size={12} className="text-slate-400 shrink-0" />
                            <span>Default browser</span>
                        </div>
                    </div>
                </div>

                {/* 3. Floating Search Engine Pills (Staggered Bottom-Right Overlapping) */}
                <div className="absolute -bottom-4 sm:-bottom-10 -right-2 sm:-right-10 z-30 flex flex-col gap-1 items-end pointer-events-auto">
                    {/* Yahoo! Pill */}
                    <button
                        type="button"
                        onClick={() => setActiveEngine("yahoo")}
                        className={`transition-all duration-300 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg cursor-pointer ${
                            activeEngine === "yahoo"
                                ? 'bg-[#ff6900] text-white z-30 anim-pill-pop'
                                : 'bg-white/95 text-slate-800  hover:bg-white'
                        }`}
                    >
                        <RiGlobalLine 
                            size={11} 
                            className={activeEngine === "yahoo" ? "text-white" : "text-slate-500"} 
                        />
                        <span className="font-bold text-[9px] sm:text-[10px] tracking-tight">Yahoo!</span>
                    </button>

                    {/* Google Pill (Highlighted in Orange matching reference) */}
                    <button
                        type="button"
                        onClick={() => setActiveEngine("google")}
                        className={`transition-all duration-300 rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shadow-xl cursor-pointer ${
                            activeEngine === "google"
                                ? 'bg-[#ff6900] text-white  z-30 anim-pill-pop'
                                : 'bg-white/95 text-slate-800 hover:bg-white'
                        }`}
                    >
                        <RiGlobalLine 
                            size={12} 
                            className={activeEngine === "google" ? "text-white" : "text-slate-500"} 
                        />
                        <span className="font-bold text-[10px] sm:text-[11px] tracking-tight">Google</span>
                    </button>

                    {/* DuckDuckGo Pill */}
                    <button
                        type="button"
                        onClick={() => setActiveEngine("duckduckgo")}
                        className={`transition-all duration-300 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg cursor-pointer ${
                            activeEngine === "duckduckgo"
                                ? 'bg-[#ff6900] text-white z-30 anim-pill-pop'
                                : 'bg-white/95 text-slate-800  hover:bg-white '
                        }`}
                    >
                        <RiGlobalLine 
                            size={11} 
                            className={activeEngine === "duckduckgo" ? "text-white" : "text-slate-500"} 
                        />
                        <span className="font-bold text-[9px] sm:text-[10px] tracking-tight">DuckDuckGo</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(AnalyticsAnswerAnim);
