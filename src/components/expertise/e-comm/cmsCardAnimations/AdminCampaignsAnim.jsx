"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiWhatsappLine,
    RiMailLine,
    RiMessage3Line,
    RiCheckDoubleLine
} from '@remixicon/react';

const CAMPAIGN_STATES = [
    {
        name: "WhatsApp Broadcast",
        subtitle: "VIP DROP",
        subtitleColor: "text-emerald-400",
        status: "99.4% Delivered",
        whatsapp: 840,
        email: 1589,
        sms: 380,
        arcAngle: 0, // Points toward top (WhatsApp)
        activeChannel: "whatsapp",
        check1: "9/12",
        check2: "4/5"
    },
    {
        name: "Cart Recovery Email",
        subtitle: "RECOVERY",
        subtitleColor: "text-amber-400",
        status: "42% Click Rate",
        whatsapp: 840,
        email: 1740,
        sms: 380,
        arcAngle: 120, // Points toward bottom-right (Email)
        activeChannel: "email",
        check1: "11/12",
        check2: "5/5"
    },
    {
        name: "SMS Flash Notification",
        subtitle: "INSTANT SMS",
        subtitleColor: "text-purple-400",
        status: "1-Tap Checkout",
        whatsapp: 840,
        email: 1740,
        sms: 495,
        arcAngle: 240, // Points toward left (SMS)
        activeChannel: "sms",
        check1: "12/12",
        check2: "5/5"
    },
    {
        name: "Omnichannel Sync",
        subtitle: "UNIFIED",
        subtitleColor: "text-rose-400",
        status: "3 Channels Active",
        whatsapp: 1020,
        email: 1980,
        sms: 610,
        arcAngle: 360, // Full sweep
        activeChannel: "all",
        check1: "12/12",
        check2: "5/5"
    }
];

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

function AdminCampaignsAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % CAMPAIGN_STATES.length);
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    const state = CAMPAIGN_STATES[currentIdx];

    const animatedWhatsapp = useAnimatedNumber(state.whatsapp, 800);
    const animatedEmail = useAnimatedNumber(state.email, 800);

    return (
        <div className="absolute inset-x-0 top-0 bottom-[36%] px-5 pt-5 flex flex-col justify-start pointer-events-none select-none">
            {/* Embedded Smooth Animation Keyframes */}
            <style>{`
                @keyframes hubTextFade {
                    0% { opacity: 0; transform: translateY(3px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .anim-hub-fade {
                    animation: hubTextFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>


            {/* Orbit & Central Hub Container */}
            <div className="relative w-full h-[142px] sm:h-[155px] center">
                {/* Orbital Track SVG Ring */}
                <svg className="absolute w-[150px] h-[150px] sm:w-[165px] sm:h-[165px] overflow-visible" viewBox="0 0 160 160">
                    {/* Background Track */}
                    <circle
                        cx="80"
                        cy="80"
                        r="66"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                    />

                    {/* Smooth Guided Crimson Laser Arc */}
                    <circle
                        cx="80"
                        cy="80"
                        r="66"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2.5"
                        strokeDasharray="75 340"
                        strokeLinecap="round"
                        style={{
                            transformOrigin: '80px 80px',
                            transform: `rotate(${state.arcAngle}deg)`,
                            transition: 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                    />
                </svg>

                {/* Central Hub Disc (Matching img6.webp) */}
                <div className="relative z-10 w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-black/75 border border-white/25 center flex-col text-center shadow-xl p-2 transition-all duration-500">
                    <span
                        key={`sub-${currentIdx}`}
                        className={`text-[8px] font-mono tracking-widest uppercase font-bold anim-hub-fade ${state.subtitleColor}`}
                    >
                        {state.subtitle}
                    </span>
                    <h6 className="text-white text-xs sm:text-sm font-extrabold tracking-tight leading-tight mt-0.5">
                        LET'S DISCUSS
                    </h6>
                    <span
                        key={`stat-${currentIdx}`}
                        className="text-[8px] text-slate-300 mt-0.5 font-medium anim-hub-fade leading-tight"
                    >
                        {state.status}
                    </span>
                </div>

                {/* Badges on the Orbit (Matching img6.webp) */}
                {/* 1. Top: WhatsApp */}
                <div
                    className={`absolute top-0.5 z-20 transition-all duration-500 ${
                        state.activeChannel === 'whatsapp' || state.activeChannel === 'all'
                            ? 'scale-[1.08]'
                            : 'opacity-85'
                    }`}
                >
                    <div
                        className={`bg-black/95 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-md flex items-center gap-1.5 transition-all duration-500 ${
                            state.activeChannel === 'whatsapp' || state.activeChannel === 'all'
                                ? 'border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                                : 'border-white/20'
                        }`}
                    >
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 center text-white">
                            <RiWhatsappLine size={9} />
                        </div>
                        <span className="font-mono tabular-nums">{animatedWhatsapp.toLocaleString()}+</span>
                    </div>
                </div>

                {/* 2. Bottom Right: Email */}
                <div
                    className={`absolute bottom-2 right-4 z-20 transition-all duration-500 ${
                        state.activeChannel === 'email' || state.activeChannel === 'all'
                            ? 'scale-[1.08]'
                            : 'opacity-85'
                    }`}
                >
                    <div
                        className={`bg-black/95 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-md flex items-center gap-1.5 transition-all duration-500 ${
                            state.activeChannel === 'email' || state.activeChannel === 'all'
                                ? 'border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                                : 'border-white/20'
                        }`}
                    >
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-500 center text-white">
                            <RiMailLine size={9} />
                        </div>
                        <span className="font-mono tabular-nums">{animatedEmail.toLocaleString()}+</span>
                    </div>
                </div>

                {/* 3. Left: Message Bubble */}
                <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                        state.activeChannel === 'sms' || state.activeChannel === 'all'
                            ? 'scale-[1.12]'
                            : 'opacity-85'
                    }`}
                >
                    <div
                        className={`w-6 h-6 rounded-full center shadow-md border transition-all duration-500 ${
                            state.activeChannel === 'sms' || state.activeChannel === 'all'
                                ? 'bg-emerald-500 text-white border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
                                : 'bg-emerald-600 text-white border-white/40'
                        }`}
                    >
                        <RiMessage3Line size={12} />
                    </div>
                </div>
            </div>

            {/* Bottom Status Checklist Badges (Matching img6.webp) */}
            <div className="flex items-center justify-between gap-2 mt-1">
                <div className="bg-white/95 text-slate-800 text-[9px] font-medium px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-slate-200 flex-1 justify-between">
                    <div className="flex items-center gap-1 truncate">
                        <span key={`c1-${currentIdx}`} className="font-bold text-[#002bba] font-mono anim-hub-fade">
                            {state.check1}
                        </span>
                        <span className="truncate">Images with alt text</span>
                    </div>
                    <RiCheckDoubleLine size={11} className="text-emerald-600 shrink-0" />
                </div>

                <div className="bg-white/95 text-slate-800 text-[9px] font-medium px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-slate-200 flex-1 justify-between">
                    <div className="flex items-center gap-1 truncate">
                        <span key={`c2-${currentIdx}`} className="font-bold text-[#002bba] font-mono anim-hub-fade">
                            {state.check2}
                        </span>
                        <span className="truncate">Page metadata</span>
                    </div>
                    <RiCheckDoubleLine size={11} className="text-emerald-600 shrink-0" />
                </div>
            </div>
        </div>
    );
}

export default React.memo(AdminCampaignsAnim);
