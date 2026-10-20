"use client";
import React, { useState, useEffect } from 'react';
import {
    RiCheckLine,
    RiSendPlane2Line,
    RiShoppingBag3Line
} from '@remixicon/react';

const ASSISTANTS = ["Claude", "ChatGPT"];

// Sample chat commands cycling through the chat window
const COMMANDS = [
    {
        assistant: 0,
        prompt: "Add the linen shirt in S, M and L at ₹2,499.",
        reply: "Done. The linen shirt is live in 3 sizes.",
        result: { label: "Product added", value: "₹2,499" }
    },
    {
        assistant: 1,
        prompt: "Start a 20% sale on summer dresses this weekend.",
        reply: "The sale is set for Saturday and Sunday. 18 products updated.",
        result: { label: "Sale launched", value: "20% off" }
    },
    {
        assistant: 0,
        prompt: "How did today go?",
        reply: "42 orders so far, and sales are up on yesterday.",
        result: { label: "Sales today", value: "₹68,450" }
    }
];

function ChatControlAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance through the sample commands every 4 seconds
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % COMMANDS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isHovered]);

    const active = COMMANDS[currentIdx];

    return (
        <div
            className="absolute inset-x-0 bottom-0 top-[36%] p-6 md:p-10 flex flex-col justify-end pointer-events-none select-none z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Embedded Micro-Animation Keyframes */}
            <style>{`
                @keyframes chatFloatCard {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes chatMsgIn {
                    0% { opacity: 0; transform: translateY(4px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes chatCursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .anim-chat-float {
                    animation: chatFloatCard 4.2s ease-in-out infinite;
                }
                .anim-chat-msg {
                    opacity: 0;
                    animation: chatMsgIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .anim-chat-cursor {
                    animation: chatCursorBlink 1s step-start infinite;
                }
            `}</style>

            {/* Container for Relative Overlapping Cards */}
            <div className="relative md:w-[85%] mx-auto w-full">
                {/* Assistant Switch Pills (Top-Left) */}
                <div className="flex items-center gap-1.5 mb-2">
                    {ASSISTANTS.map((name, idx) => {
                        const isActive = active.assistant === idx;
                        return (
                            <span
                                key={name}
                                className={`transition-all duration-300 rounded-full px-3 py-1 text-[9px] sm:text-[10px] font-bold tracking-tight shadow-lg ${isActive
                                    ? 'bg-[#ff6900] text-white scale-105'
                                    : 'bg-white/20 text-white/90 border border-white/20 backdrop-blur-xs'
                                    }`}
                            >
                                {name}
                            </span>
                        );
                    })}
                </div>

                {/* 1. Main Chat Window */}
                <div className="relative z-10 w-full bg-white rounded-xl p-3 sm:p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] border border-slate-100 text-slate-800 flex flex-col gap-2">
                    {/* Prompt Bubble */}
                    <div key={`p-${currentIdx}`} className="self-end max-w-[88%] bg-[#e8edfc] text-[#1d4ed8] text-[9px] sm:text-[10.5px] font-semibold rounded-xl rounded-br-sm px-2.5 py-1.5 anim-chat-msg">
                        {active.prompt}
                    </div>

                    {/* Reply Bubble */}
                    <div
                        key={`r-${currentIdx}`}
                        className="self-start max-w-[88%] bg-[#f4f6fa] text-slate-700 text-[9px] sm:text-[10.5px] rounded-xl rounded-bl-sm px-2.5 py-1.5 border border-slate-200/60 anim-chat-msg"
                        style={{ animationDelay: "0.5s" }}
                    >
                        {active.reply}
                    </div>

                    {/* Input Bar */}
                    <div className="bg-[#f4f6fa] rounded-full px-2.5 py-1 flex items-center justify-between text-[8.5px] sm:text-[9.5px] text-slate-400 border border-slate-200/60">
                        <div className="flex items-center gap-1 min-w-0">
                            <span className="truncate">Message your store</span>
                            <span className="w-[1px] h-2.5 bg-[#3b82f6] anim-chat-cursor shrink-0" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-[#1d4ed8] flex items-center justify-center shrink-0">
                            <RiSendPlane2Line size={9} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* 2. Floating Result Card (Top-Right Overlapping) */}
                <div className="absolute max-sm:scale-75 -top-3 sm:-top-5 -right-3 sm:-right-6 z-20 bg-slate-900/40 backdrop-blur-xs border border-white/20 rounded-lg p-2 sm:p-2.5 shadow-2xl anim-chat-float">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#55FF8D] flex items-center justify-center shrink-0">
                            {currentIdx === 0
                                ? <RiShoppingBag3Line size={9} className="text-slate-900" />
                                : <RiCheckLine size={10} className="text-slate-900" />
                            }
                        </div>
                        <span key={`l-${currentIdx}`} className="text-[8px] sm:text-[9px] text-white/80 font-semibold whitespace-nowrap anim-chat-msg">
                            {active.result.label}
                        </span>
                    </div>
                    <span key={`v-${currentIdx}`} className="text-base sm:text-lg text-[#55FF8D] tracking-tight font-sans block leading-none mt-1 tabular-nums anim-chat-msg" style={{ animationDelay: "0.7s" }}>
                        {active.result.value}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ChatControlAnim);
