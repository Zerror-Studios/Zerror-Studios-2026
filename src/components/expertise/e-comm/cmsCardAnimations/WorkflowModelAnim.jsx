"use client";
import React, { useState, useEffect } from 'react';
import { RiCheckLine, RiArrowRightLine } from '@remixicon/react';

const TRACKING_TABS = [
    {
        label: "AWB",
        placeholder: "Enter your Airway Bill number (AWB)",
        sampleCode: "AWB-9842-DL",
        status: "Dispatched",
        statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
    },
    {
        label: "Order ID",
        placeholder: "Enter Order ID (#ORD-10842)",
        sampleCode: "#ORD-10842-VIP",
        status: "In Transit",
        statusColor: "text-amber-700 bg-amber-50 border-amber-200"
    },
    {
        label: "Mobile Number",
        placeholder: "Enter Mobile (+91 98721...)",
        sampleCode: "+91 98721 04918",
        status: "Out for Delivery",
        statusColor: "text-indigo-700 bg-indigo-50 border-indigo-200"
    }
];

function WorkflowModelAnim() {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [isTracked, setIsTracked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle tracking tabs when not interacting
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveTabIdx((prev) => (prev + 1) % TRACKING_TABS.length);
        }, 3200);

        return () => clearInterval(interval);
    }, [isHovered]);

    const activeTab = TRACKING_TABS[activeTabIdx];

    const handleTrackClick = (e) => {
        e.stopPropagation();
        setIsTracked(true);
        setTimeout(() => setIsTracked(false), 1800);
    };

    return (
        <div 
            className="absolute inset-x-0 top-0 bottom-[33%] sm:bottom-[35%] px-3 sm:px-6 flex flex-col justify-start select-none z-10 pointer-events-none scale-70"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes floatShiprocket {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes floatSphereAnim {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-2px, -3px) scale(1.02); }
                }
                @keyframes pulseOrangeZigzag {
                    0%, 100% { 
                        transform: rotate(20deg) scale(1);
                        filter: drop-shadow(0 0 3px rgba(249, 115, 22, 0.45));
                    }
                    50% { 
                        transform: rotate(23deg) scale(1.08);
                        filter: drop-shadow(0 0 10px rgba(249, 115, 22, 0.85));
                    }
                }
                @keyframes swayCalendarTile {
                    0%, 100% { transform: rotate(-14deg) translateY(0px); }
                    50% { transform: rotate(-9deg) translateY(-4px); }
                }
                @keyframes docWiggleFloat {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(1.5deg) translateY(-2px); }
                }
                @keyframes pulseIndicatorTag {
                    0%, 100% { opacity: 0.85; filter: brightness(1); }
                    50% { opacity: 1; filter: brightness(1.25); }
                }
                @keyframes tabValueFade {
                    0% { opacity: 0; transform: translateY(3px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes avatarFloat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.06); }
                }
                .anim-float-shiprocket {
                    animation: floatShiprocket 3.6s ease-in-out infinite;
                }
                .anim-float-sphere {
                    animation: floatSphereAnim 5s ease-in-out infinite;
                }
                .anim-pulse-zigzag {
                    animation: pulseOrangeZigzag 2.6s ease-in-out infinite;
                }
                .anim-sway-calendar {
                    animation: swayCalendarTile 4s ease-in-out infinite;
                }
                .anim-doc-wiggle {
                    animation: docWiggleFloat 3.8s ease-in-out infinite;
                }
                .anim-tag-pulse {
                    animation: pulseIndicatorTag 2s ease-in-out infinite;
                }
                .anim-tab-fade {
                    animation: tabValueFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .anim-avatar-gentle {
                    animation: avatarFloat 3s ease-in-out infinite;
                }
            `}</style>

            {/* Top Row: Metallic 3D Sphere, Floating Shiprocket Pill & Orange Zigzag */}
            <div className="relative w-full flex items-center justify-between mb-2 sm:mb-2.5 z-20">
             

                {/* Floating Shiprocket Brand Pill (Top Left) */}
                <div className="relative z-10 anim-float-shiprocket bg-white/95 backdrop-blur-xs px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-white/80 flex items-center gap-2">
                    <img 
                        src="/icons/shiprocket_logo.svg" 
                        alt="Shiprocket Logo" 
                        className="w-3.5 sm:w-4 h-auto shrink-0" 
                    />
                    <span className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight font-sans">
                        Shiprocket
                    </span>
                </div>

                {/* Floating Orange Zigzag (Top Right) */}
                <div className="relative z-10 anim-pulse-zigzag -mr-1 sm:mr-1 -mt-1">
                    <svg 
                        width="38" 
                        height="22" 
                        viewBox="0 0 38 22" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 sm:w-10 h-auto"
                    >
                        <path 
                            d="M3 18L10 4L18 18L26 4L34 14" 
                            stroke="#f97316" 
                            strokeWidth="3.6" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                    </svg>
                </div>
            </div>

            {/* Main Frosted Glass Kanban Board */}
            <div className="relative w-full bg-slate-900/40 backdrop-blur-xs border border-white/10 rounded-2xl  p-2.5 sm:p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                {/* Column Headers */}
                <div className="grid grid-cols-3 gap-2 text-[11px] sm:text-xs font-semibold text-white tracking-wide pb-2 border-b border-white/10 px-0.5">
                    <div>To Do</div>
                    <div>In Progress</div>
                    <div>Done</div>
                </div>

                {/* Kanban Columns Grid */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-2">
                    {/* Column 1: To Do */}
                    <div className="flex flex-col gap-2">
                        {/* Card 1: Lime green indicator + white line */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-sm">
                            <div className="w-5 sm:w-6 h-1 sm:h-1.5 bg-[#84cc16] rounded-full anim-tag-pulse" />
                            <div className="w-[82%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                        </div>

                        {/* Card 2: 3 White lines + bottom orange indicator */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex flex-col justify-between min-h-[56px] sm:min-h-[64px] shadow-sm">
                            <div className="space-y-1.5 pt-0.5">
                                <div className="w-[60%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                                <div className="w-[88%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                                <div className="w-[72%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                            </div>
                            <div className="w-5 sm:w-6 h-1 sm:h-1.5 bg-[#f97316] rounded-full mt-2 anim-tag-pulse" />
                        </div>
                    </div>

                    {/* Column 2: In Progress */}
                    <div className="flex flex-col gap-2">
                        {/* Card 1: 2 White lines + Avatar with green ring */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center justify-between gap-1 shadow-sm">
                            <div className="space-y-1.5 flex-1 min-w-0 pr-1">
                                <div className="w-[85%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                                <div className="w-[50%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                            </div>
                            {/* Avatar 1: Green ring border */}
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#22c55e] bg-[#fef08a] flex items-center justify-center shrink-0 overflow-hidden shadow-xs anim-avatar-gentle">
                                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#fed7aa" />
                                    <circle cx="12" cy="9" r="4.5" fill="#f97316" />
                                    <circle cx="12" cy="10" r="3.5" fill="#ffedd5" />
                                    <circle cx="10.5" cy="9.5" r="0.75" fill="#1e293b" />
                                    <circle cx="13.5" cy="9.5" r="0.75" fill="#1e293b" />
                                    <path d="M11 12C11.5 12.5 12.5 12.5 13 12" stroke="#1e293b" strokeWidth="0.7" strokeLinecap="round" />
                                    <path d="M5 21C5 17 8 15 12 15C16 15 19 17 19 21" fill="#22c55e" />
                                </svg>
                            </div>
                        </div>

                        {/* Card 2: Yellow pill tag + Avatar on left + White line */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-sm">
                            <div className="w-4 sm:w-5 h-1 sm:h-1.5 bg-[#eab308] rounded-full anim-tag-pulse" />
                            <div className="flex items-center gap-1.5">
                                {/* Avatar 2: Brown hair boy */}
                                <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-white/30 bg-[#fde047] flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                        <circle cx="12" cy="12" r="12" fill="#ffedd5" />
                                        <path d="M7 8C7 5 9 3 12 3C15 3 17 5 17 8C17 9 16 10 16 10H8C8 10 7 9 7 8Z" fill="#78350f" />
                                        <circle cx="12" cy="10" r="3" fill="#ffedd5" />
                                        <circle cx="10.5" cy="10" r="0.6" fill="#1e293b" />
                                        <circle cx="13.5" cy="10" r="0.6" fill="#1e293b" />
                                        <path d="M6 21C6 17.5 8.5 15.5 12 15.5C15.5 15.5 18 17.5 18 21" fill="#f59e0b" />
                                    </svg>
                                </div>
                                <div className="w-[60%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                            </div>
                        </div>

                        {/* Card 3: Blue pill tag + Avatar on left + White line */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-sm">
                            <div className="w-4 sm:w-5 h-1 sm:h-1.5 bg-[#38bdf8] rounded-full anim-tag-pulse" />
                            <div className="flex items-center gap-1.5">
                                {/* Avatar 3: Purple ring / avatar */}
                                <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border border-white/30 bg-[#c084fc] flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                                    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                        <circle cx="12" cy="12" r="12" fill="#f3e8ff" />
                                        <circle cx="12" cy="8.5" r="4" fill="#a855f7" />
                                        <circle cx="12" cy="9.5" r="3" fill="#fed7aa" />
                                        <circle cx="10.5" cy="9.5" r="0.6" fill="#1e293b" />
                                        <circle cx="13.5" cy="9.5" r="0.6" fill="#1e293b" />
                                        <path d="M6 21C6 17.5 8.5 15.5 12 15.5C15.5 15.5 18 17.5 18 21" fill="#6366f1" />
                                    </svg>
                                </div>
                                <div className="w-[55%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Done */}
                    <div className="flex flex-col gap-2">
                        {/* Card 1: Pink tags + 2 White lines + Pink Avatar */}
                        <div className="bg-[#414d5c]/85 hover:bg-[#485666]/90 transition-colors border border-white/10 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-sm">
                            <div className="flex items-center gap-1">
                                <div className="w-5 sm:w-6 h-1 sm:h-1.5 bg-[#f43f5e] rounded-full anim-tag-pulse" />
                                <div className="w-3.5 sm:w-4 h-1 sm:h-1.5 bg-[#f43f5e] rounded-full anim-tag-pulse" />
                            </div>
                            <div className="space-y-1.5 pt-0.5">
                                <div className="w-[65%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                                <div className="w-[45%] h-1 sm:h-1.5 bg-white/85 rounded-full" />
                            </div>
                            {/* Avatar 4: Pink border ring */}
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#f43f5e] bg-[#fbcfe8] flex items-center justify-center shrink-0 overflow-hidden shadow-xs ml-auto anim-avatar-gentle">
                                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                                    <circle cx="12" cy="12" r="12" fill="#ffe4e6" />
                                    <path d="M8 8C8 5.5 10 4 12 4C14 4 16 5.5 16 8C16 8.5 15.5 9 15 9H9C8.5 9 8 8.5 8 8Z" fill="#fb7185" />
                                    <circle cx="12" cy="10" r="3" fill="#ffedd5" />
                                    <circle cx="10.5" cy="10" r="0.6" fill="#1e293b" />
                                    <circle cx="13.5" cy="10" r="0.6" fill="#1e293b" />
                                    <path d="M6 21C6 17.5 8.5 15.5 12 15.5C15.5 15.5 18 17.5 18 21" fill="#f43f5e" />
                                </svg>
                            </div>
                        </div>

                        {/* Document Card with Folded Blue Corner & Paperclip */}
                        <div className="anim-doc-wiggle w-[52px] sm:w-[60px] h-[54px] sm:h-[62px] bg-[#eef2f7] rounded-lg p-1.5 sm:p-2 relative shadow-md border border-white/70 mx-auto mt-0.5">
                            {/* Folded Top-Left Dog-Ear Corner */}
                            <div 
                                className="absolute -top-[1px] -left-[1px] w-0 h-0 border-t-[9px] border-r-[9px] border-t-sky-400 border-r-transparent rounded-tl-sm"
                            />

                            {/* Paperclip on Top Right Edge */}
                            <div className="absolute -top-2.5 right-1 z-10">
                                <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M4.5 7V13.5C4.5 14.88 5.62 16 7 16C8.38 16 9.5 14.88 9.5 13.5V5C9.5 2.79 7.71 1 5.5 1C3.29 1 1.5 2.79 1.5 5V14.5C1.5 17.26 3.74 19.5 6.5 19.5C9.26 19.5 11.5 17.26 11.5 14.5V7" 
                                        stroke="#475569" 
                                        strokeWidth="1.6" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                    />
                                </svg>
                            </div>

                            {/* Document Content Lines */}
                            <div className="space-y-1.5 pt-2 px-0.5">
                                <div className="w-full h-1 bg-slate-300/80 rounded-full" />
                                <div className="w-[85%] h-1 bg-slate-300/80 rounded-full" />
                                <div className="w-[65%] h-1 bg-slate-300/80 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row Overlays: Lavender Question Calendar Tile & White Tracking Card */}
            <div className="relative w-full mt-2 z-30 pointer-events-auto">
                {/* Lavender Question Mark Calendar Tile (Bottom Left) */}
                <div 
                    className="absolute -top-6 sm:-top-7 -left-1 sm:left-1 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#a27e9e] border border-white/30 flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.45)] anim-sway-calendar cursor-pointer hover:scale-105 transition-transform"
                    title="Help & Order Inquiries"
                >
                    {/* Top Binder Loops */}
                    <div className="absolute -top-1 left-2.5 w-1.5 h-2.5 bg-white rounded-full shadow-xs" />
                    <div className="absolute -top-1 right-2.5 w-1.5 h-2.5 bg-white rounded-full shadow-xs" />

                    {/* Question Mark */}
                    <span className="text-white font-extrabold text-2xl sm:text-3xl font-sans select-none drop-shadow-sm">
                        ?
                    </span>
                </div>

                {/* White Tracking Search Card (Bottom Right) */}
                <div className="absolute -top-6 sm:-top-8 -right-1 sm:right-1 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-slate-100 w-[205px] sm:w-[240px] text-slate-800 transition-all duration-300">
                    {/* Tab Navigation */}
                    <div className="flex items-center justify-between text-[8.5px] sm:text-[9.5px] border-b border-slate-100 pb-1 px-1">
                        {TRACKING_TABS.map((tab, idx) => {
                            const isActive = activeTabIdx === idx;
                            return (
                                <button
                                    key={tab.label}
                                    type="button"
                                    onClick={() => setActiveTabIdx(idx)}
                                    className={`relative pb-0.5 cursor-pointer transition-colors duration-200 ${
                                        isActive ? 'text-[#5c3bf5] font-bold' : 'text-slate-400 hover:text-slate-600 font-medium'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    {/* Smooth sliding active underline indicator */}
                                    <span 
                                        className={`absolute -bottom-1 inset-x-0 h-[2px] bg-[#5c3bf5] rounded-full transition-all duration-300 ${
                                            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Input Field & Track Now Button */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                        {/* Dynamic Input / Placeholder */}
                        <div className="bg-[#f1f3f9] border border-slate-200/60 rounded-lg px-2 py-1 flex items-center justify-between text-[8px] sm:text-[9px] min-w-0 flex-1">
                            <span 
                                key={activeTabIdx} 
                                className="font-mono text-slate-600 truncate block anim-tab-fade"
                            >
                                {isTracked ? activeTab.sampleCode : activeTab.placeholder}
                            </span>
                        </div>

                        {/* Purple Track Now Button */}
                        <button
                            type="button"
                            onClick={handleTrackClick}
                            className={`bg-[#5c3bf5] hover:bg-[#4d30e5] active:scale-95 text-white text-[8px] sm:text-[9px] font-semibold px-2 sm:px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-0.5 shrink-0 cursor-pointer transition-all duration-200 ${
                                isTracked ? 'bg-emerald-600 hover:bg-emerald-700' : ''
                            }`}
                        >
                            {isTracked ? (
                                <>
                                    <RiCheckLine size={10} className="shrink-0" />
                                    <span>Tracked</span>
                                </>
                            ) : (
                                <>
                                    <span>Track Now</span>
                                    <RiArrowRightLine size={9} className="shrink-0" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(WorkflowModelAnim);
