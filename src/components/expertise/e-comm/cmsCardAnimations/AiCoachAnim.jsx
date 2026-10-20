"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSparkling2Line,
    RiArrowRightLine,
    RiArrowRightDownLine
} from '@remixicon/react';

// Sample questions and answers cycling through the coach chat
const CONVERSATIONS = [
    {
        question: "Why did sales dip last week?",
        answer: "Fewer visits from Instagram. Repeat buyers held steady.",
        change: "-12% visits",
        nextStep: "Send a WhatsApp offer to last month's buyers."
    },
    {
        question: "Which product should I restock first?",
        answer: "The linen shirt in M. It sells out in about 6 days.",
        change: "6 days left",
        nextStep: "Reorder 40 units this week."
    },
    {
        question: "Why are carts being left?",
        answer: "Most drop-offs happen at shipping. Delivery feels slow.",
        change: "-18% at shipping",
        nextStep: "Show the delivery date on the cart page."
    }
];

function AiCoachAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance through the sample conversations every 4 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % CONVERSATIONS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const active = CONVERSATIONS[currentIdx];

    return (
        <div
            className="absolute inset-x-0 top-0 bottom-[33%] sm:bottom-[35%] px-3 sm:px-6 pt-3 sm:pt-4 flex flex-col justify-center pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes coachFloatCard {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-3px) rotate(-0.5deg); }
                }
                @keyframes coachFloatPill {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes coachMsgIn {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes coachDots {
                    0%, 80%, 100% { opacity: 0.25; }
                    40% { opacity: 1; }
                }
                .anim-coach-card {
                    animation: coachFloatCard 4.5s ease-in-out infinite;
                }
                .anim-coach-pill {
                    animation: coachFloatPill 3.6s ease-in-out infinite;
                }
                .anim-coach-msg {
                    opacity: 0;
                    animation: coachMsgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .anim-coach-dot {
                    animation: coachDots 1.2s ease-in-out infinite;
                }
            `}</style>

            {/* Container for Relative Overlapping Cards */}
            <div className="relative w-full max-w-[82%] scale-90 mx-auto">
                {/* 1. Main Coach Chat Card */}
                <div className="relative z-10 w-full bg-white/15 backdrop-blur-xs border border-white/10 rounded-2xl p-3 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] flex flex-col gap-2 anim-coach-card">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                                <RiSparkling2Line size={11} className="text-[#1d4ed8]" />
                            </div>
                            <span className="text-white text-[10px] sm:text-[11px] font-semibold">AI coach</span>
                        </div>
                        <span className="bg-white text-[#1d4ed8] text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.5 rounded-full shadow-xs shrink-0">
                            Live data
                        </span>
                    </div>

                    {/* Question Bubble (Right Aligned) */}
                    <div key={`q-${currentIdx}`} className="self-end max-w-[85%] bg-white text-slate-900 text-[9px] sm:text-[10.5px] font-medium rounded-xl rounded-br-sm px-2.5 py-1.5 shadow-md anim-coach-msg">
                        {active.question}
                    </div>

                    {/* Answer Bubble (Left Aligned) */}
                    <div
                        key={`a-${currentIdx}`}
                        className="self-start max-w-[90%] bg-white/20 border border-white/20 text-white text-[9px] sm:text-[10.5px] rounded-xl rounded-bl-sm px-2.5 py-1.5 anim-coach-msg"
                        style={{ animationDelay: "0.45s" }}
                    >
                        {active.answer}
                    </div>

                    {/* Typing Dots */}
                    <div className="flex items-center gap-1 pl-1 pt-0.5">
                        <span className="w-1 h-1 rounded-full bg-white anim-coach-dot" />
                        <span className="w-1 h-1 rounded-full bg-white anim-coach-dot" style={{ animationDelay: "0.2s" }} />
                        <span className="w-1 h-1 rounded-full bg-white anim-coach-dot" style={{ animationDelay: "0.4s" }} />
                    </div>
                </div>

                {/* 2. Floating Change Stat (Top-Right Overlapping) */}
                <div className="absolute max-sm:scale-75 -top-6 sm:-top-8 -right-6 sm:-right-10 z-20 bg-white rounded-lg px-2.5 py-1.5 shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-slate-100 flex items-center gap-1.5 anim-coach-pill">
                    <div className="w-4 h-4 rounded-full bg-[#ea580c] flex items-center justify-center shrink-0">
                        <RiArrowRightDownLine size={10} className="text-white" />
                    </div>
                    <span key={`c-${currentIdx}`} className="text-[9px] sm:text-[10px] font-bold text-slate-900 whitespace-nowrap anim-coach-msg">
                        {active.change}
                    </span>
                </div>

                {/* 3. Floating Next Step Card (Bottom-Left Overlapping) */}
                <div className="absolute max-sm:scale-75 -bottom-8 sm:-bottom-10 -left-6 sm:-left-10 z-30 w-44 sm:w-52 bg-[#ff6900] text-white rounded-xl p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] anim-coach-pill" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-semibold text-white/85">
                        <RiArrowRightLine size={10} className="shrink-0" />
                        <span>Next step</span>
                    </div>
                    <p key={`n-${currentIdx}`} className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight mt-1 anim-coach-msg" style={{ animationDelay: "0.8s" }}>
                        {active.nextStep}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default React.memo(AiCoachAnim);
