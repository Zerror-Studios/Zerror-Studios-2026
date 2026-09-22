"use client";
import React, { useState, useEffect } from 'react';
import {
    RiTruckLine,
    RiCalendarLine,
    RiArrowRightLine,
    RiPlayCircleFill,
    RiCheckLine
} from '@remixicon/react';

const TRACKING_TABS = [
    {
        label: "AWB",
        placeholder: "Airway Bill number",
        value: "AWB-9842-DL",
        badge: "Dispatched",
        badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        btnText: "Track Now",
        btnBg: "bg-[#5c3bf5]"
    },
    {
        label: "Order ID",
        placeholder: "Order ID number",
        value: "#ORD-10842-VIP",
        badge: "Processing",
        badgeColor: "text-amber-700 bg-amber-50 border-amber-200",
        btnText: "Live Status",
        btnBg: "bg-[#002bba]"
    },
    {
        label: "Mobile Number",
        placeholder: "Registered phone",
        value: "+91 98721 04918",
        badge: "Out for Delivery",
        badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
        btnText: "View Route",
        btnBg: "bg-emerald-600"
    }
];

function WorkflowModelAnim() {
    const [taskStage, setTaskStage] = useState(0);

    useEffect(() => {
        const loopTimer = setInterval(() => {
            setTaskStage((prev) => (prev + 1) % 3);
        }, 2500);

        return () => clearInterval(loopTimer);
    }, []);

    const activeTab = TRACKING_TABS[taskStage];

    return (
        <div className="absolute inset-x-0 top-0 bottom-[36%] px-5 pt-6 flex flex-col justify-start pointer-events-none select-none">
            {/* Embedded Keyframe for Smooth Slide-Fade Transition */}
            <style>{`
                @keyframes smoothTabFade {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-smooth-fade {
                    animation: smoothTabFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* Top Bar: Shiprocket Badge & Drop Calendar Tag */}
            <div className="flex items-center justify-between mb-2.5">
                {/* Shiprocket Brand Pill */}
                <div className="bg-white/95 px-3 py-1 rounded-full border border-white/60 shadow-md flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 center text-white shadow-xs">
                        <RiPlayCircleFill size={13} />
                    </div>
                    <span className="text-xs font-bold text-slate-800 tracking-tight font-sans">Shiprocket</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-purple-700 font-mono font-medium hidden sm:inline">Connected</span>
                </div>

                {/* Calendar Drop Badge */}
                <div className="bg-purple-900/90 text-purple-200 border border-purple-500/30 px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1.5 shadow-sm">
                    <RiCalendarLine size={12} className="text-purple-300" />
                    <span className="font-medium">VIP Drop: Live</span>
                </div>
            </div>

            {/* Kanban Board Container */}
            <div className="w-full bg-black/40 border border-white/15 rounded-2xl p-3 sm:p-3.5 shadow-xl flex flex-col gap-2.5">
                {/* Kanban Column Headers */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-semibold tracking-wider uppercase text-white/70 border-b border-white/10 pb-1.5">
                    <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${taskStage === 0 ? 'bg-blue-400' : 'bg-slate-500'}`} />
                        <span>To Do</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${taskStage === 1 ? 'bg-amber-400' : 'bg-slate-500'}`} />
                        <span>In Progress</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${taskStage === 2 ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                        <span>Done</span>
                    </div>
                </div>

                {/* Kanban Columns Grid */}
                <div className="grid grid-cols-3 gap-2 min-h-[75px]">
                    {/* Column 1: To Do */}
                    <div className="bg-black/30 rounded-xl p-1.5 flex flex-col gap-1.5 border border-white/5 transition-all duration-500">
                        {taskStage === 0 ? (
                            <div className="bg-white/95 text-slate-900 rounded-lg p-2 shadow-md border border-blue-300 transition-all duration-500 scale-[1.02]">
                                <span className="text-[9px] font-bold uppercase text-purple-600 bg-purple-50 px-1 rounded block mb-0.5">
                                    Drop #12
                                </span>
                                <p className="text-[10px] font-semibold text-slate-800 leading-tight">Pre-Order Queue</p>
                            </div>
                        ) : (
                            <div className="bg-white/5 text-white/40 rounded-lg p-2 transition-all duration-500">
                                <span className="text-[9px] block">Batch #13</span>
                                <span className="text-[9px] text-white/30">12 items</span>
                            </div>
                        )}
                    </div>

                    {/* Column 2: In Progress */}
                    <div className="bg-black/30 rounded-xl p-1.5 flex flex-col gap-1.5 border border-white/5 transition-all duration-500">
                        {taskStage === 1 ? (
                            <div className="bg-white/95 text-slate-900 rounded-lg p-2 shadow-md border border-amber-300 transition-all duration-500 scale-[1.02]">
                                <span className="text-[9px] font-bold uppercase text-amber-600 bg-amber-50 px-1 rounded block mb-0.5">
                                    Packing
                                </span>
                                <p className="text-[10px] font-semibold text-slate-800 leading-tight">Drop #12 Orders</p>
                                <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-3/4 transition-all duration-700" />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/5 text-white/40 rounded-lg p-2 transition-all duration-500">
                                <span className="text-[9px] block">Packaging</span>
                                <span className="text-[9px] text-white/30">24 active</span>
                            </div>
                        )}
                    </div>

                    {/* Column 3: Done */}
                    <div className="bg-black/30 rounded-xl p-1.5 flex flex-col gap-1.5 border border-white/5 transition-all duration-500">
                        {taskStage === 2 ? (
                            <div className="bg-white/95 text-slate-900 rounded-lg p-2 shadow-md border border-emerald-300 transition-all duration-500 scale-[1.02]">
                                <span className="text-[9px] font-bold uppercase text-emerald-700 bg-emerald-50 px-1 rounded block mb-0.5">
                                    Dispatched
                                </span>
                                <p className="text-[10px] font-semibold text-slate-800 leading-tight">Drop #12 Shipped</p>
                                <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full transition-all duration-700" />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/5 text-white/40 rounded-lg p-2 transition-all duration-500">
                                <span className="text-[9px] block">Complete</span>
                                <span className="text-[9px] text-white/30">142 shipped</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Accurate Shiprocket Tracking Card (Matching img2.webp UI) */}
                <div className="bg-white/95 rounded-xl p-2 sm:p-2.5 flex flex-col gap-1.5 text-slate-800 shadow-lg border border-white/70">
                    {/* Top Tab Bar with smooth underline indicator */}
                    <div className="flex items-center gap-3 text-[10px] font-medium border-b border-slate-200/60 pb-1">
                        {TRACKING_TABS.map((tab, idx) => {
                            const isActive = taskStage === idx;
                            return (
                                <div
                                    key={tab.label}
                                    className={`relative pb-0.5 transition-colors duration-300 ${
                                        isActive ? 'text-[#4f46e5] font-bold' : 'text-slate-400'
                                    }`}
                                >
                                    <span>{tab.label}</span>
                                    {/* Smooth animated underline */}
                                    <span
                                        className={`absolute -bottom-1.5 inset-x-0 h-[2px] bg-[#4f46e5] rounded-full transition-all duration-400 ${
                                            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                        }`}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Input and Action Button Row */}
                    <div className="flex items-center gap-1.5">
                        {/* Simulated Input Field with Smooth Value Transition */}
                        <div className="flex-1 bg-slate-100/90 border border-slate-200/80 rounded-lg px-2 py-1 flex items-center justify-between text-[10px] min-w-0">
                            <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                <RiTruckLine size={12} className="text-slate-400 shrink-0" />
                                <div className="truncate">
                                    <span
                                        key={taskStage}
                                        className="font-mono text-slate-800 font-semibold truncate block anim-smooth-fade"
                                    >
                                        {activeTab.value}
                                    </span>
                                </div>
                            </div>
                            <span
                                key={`badge-${taskStage}`}
                                className={`text-[8px] font-mono px-1.5 py-0.2 rounded border shrink-0 font-medium anim-smooth-fade ${activeTab.badgeColor}`}
                            >
                                {activeTab.badge}
                            </span>
                        </div>

                        {/* Track Now / Status Action Button with Smooth Transition */}
                        <div
                            className={`text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs shrink-0 transition-colors duration-500 ${activeTab.btnBg}`}
                        >
                            <span key={`btn-${taskStage}`} className="anim-smooth-fade whitespace-nowrap">
                                {activeTab.btnText}
                            </span>
                            <RiArrowRightLine size={10} className="shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(WorkflowModelAnim);
