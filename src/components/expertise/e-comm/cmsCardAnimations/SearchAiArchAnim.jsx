"use client";
import React, { useState, useEffect } from 'react';
import { RiSearchLine } from '@remixicon/react';

// The TLDs in continuous upward loop order
const TLDS = [".com", ".net", ".info", ".site", ".biz"];
const STEP_HEIGHT = 3.5; // 2.25rem (36px) pill height + 0.625rem (10px) vertical step gap

function SearchAiArchAnim() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShifting, setIsShifting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // 1. Trigger the smooth upward shift
            setIsShifting(true);

            // 2. Settle the shift and update index seamlessly without flicker
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % TLDS.length);
                setIsShifting(false);
            }, 620);
        }, 3000); // Cycles every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const SLOTS = [-2, -1, 0, 1, 2, 3, 4];

    return (
        <div className="absolute p-8 md:p-10 inset-x-0 bottom-0 top-[40%] flex items-center justify-center pointer-events-none select-none">
            {/* Center Anchor & Search Bar Container */}
            <div className="relative flex items-center w-full h-14">
                <style>{`
                    @keyframes blinkCursor {
                        0%, 49% { opacity: 1; }
                        50%, 100% { opacity: 0; }
                    }
                    .anim-blinking-cursor {
                        animation: blinkCursor 0.9s steps(1) infinite;
                    }
                `}</style>
                {/* 1. White Search Bar Capsule (matching reference UI) */}
                <div className="w-full h-full bg-white rounded-full shadow-2xl shadow-black/40 flex items-center justify-between pl-4  pr-1.5 z-10 border border-white/80">
                    <div className="flex items-center gap-2 min-w-0">
                        <RiSearchLine className=" size-5 text-slate-800 shrink-0" />
                        <div className="flex items-center min-w-0">
                            <span className="font-sans font-medium text-lg text-slate-900 leading-none -translate-y-0.5 select-none">
                                www.zerrorstudios
                            </span>
                            <span className="w-[0.1rem] sm:w-[0.125rem] h-6 bg-slate-900 ml-0.5 anim-blinking-cursor rounded-full shrink-0" />
                        </div>
                    </div>
                </div>

                {/* 2. Vertical Column of TLD Pills (Aligned with the search bar right end) */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[4.625rem] sm:w-[4.875rem] h-[2.75rem] z-20 pointer-events-none">
                    <div
                        className="relative w-full h-full"
                        style={{
                            transform: isShifting ? `translateY(-${STEP_HEIGHT}rem)` : 'translateY(0rem)',
                            transition: isShifting ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none'
                        }}
                    >
                        {SLOTS.map((r) => {
                            const tldIndex = (currentIndex + r + TLDS.length * 10) % TLDS.length;
                            const tld = TLDS[tldIndex];

                            // Determine target position during shift animation
                            const targetSlot = isShifting ? r - 1 : r;
                            const isActive = targetSlot === 0;

                            // Opacity based on distance from the active slot
                            let opacity = 1;
                            if (targetSlot <= -2 || targetSlot >= 4) opacity = 0;
                            else if (targetSlot === -1) opacity = 1;
                            else if (targetSlot === 0) opacity = 1;
                            else if (targetSlot === 1) opacity = 1;
                            else if (targetSlot === 2) opacity = 0.75;
                            else if (targetSlot === 3) opacity = 0.45;

                            return (
                                <div
                                    key={`${r}-${tldIndex}`}
                                    className={`absolute inset-x-0 h-[2.75rem] rounded-full center font-sans  select-none transition-colors duration-500 ${
                                        isActive
                                            ? 'bg-[#E6E6E6] text-slate-900 font-bold shadow-xs'
                                            : 'bg-white/20 text-white/95 font-medium border border-white/10 backdrop-blur-xs'
                                    }`}
                                    style={{
                                        top: `${r * STEP_HEIGHT}rem`,
                                        opacity: opacity,
                                        transition: 'background-color 500ms, color 500ms, border-color 500ms, opacity 500ms'
                                    }}
                                >
                                    {tld}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SearchAiArchAnim);
