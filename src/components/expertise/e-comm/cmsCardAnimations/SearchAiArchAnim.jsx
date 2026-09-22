"use client";
import React, { useState, useEffect } from 'react';
import { RiSearchLine } from '@remixicon/react';

// The TLDs in continuous upward loop order
const TLDS = [".com", ".net", ".info", ".site", ".biz"];
const STEP_HEIGHT = 46; // 36px pill height + 10px vertical step gap

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

    // Visible relative slot positions around the active search bar (slot 0):
    // -2: exiting above (fading out)
    // -1: above the search bar (.biz initially)
    //  0: inside the search bar (.com initially)
    //  1: below the search bar (.net initially)
    //  2: below (.info initially)
    //  3: below (.site initially)
    //  4: entering from below (fading in)
    const SLOTS = [-2, -1, 0, 1, 2, 3, 4];

    return (
        <div className="absolute inset-x-0 bottom-4 top-[40%] px-5 flex items-center justify-center pointer-events-none select-none">
            {/* Center Anchor & Search Bar Container */}
            <div className="relative flex items-center w-full max-w-[310px] sm:max-w-[345px] h-[50px]">
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
                <div className="w-full h-full bg-white rounded-full shadow-2xl shadow-black/40 flex items-center justify-between pl-4 sm:pl-5 pr-1.5 z-10 border border-white/80">
                    <div className="flex items-center gap-2 min-w-0">
                        <RiSearchLine size={18} className="text-slate-800 shrink-0 stroke-[2.5]" />
                        <div className="flex items-center min-w-0">
                            <span className="font-sans font-medium text-sm sm:text-base text-slate-900 tracking-tight select-none">
                                zerrorstudios
                            </span>
                            <span className="w-[1.5px] sm:w-[2px] h-4 bg-slate-900 ml-0.5 anim-blinking-cursor rounded-full shrink-0" />
                        </div>
                    </div>
                    {/* Invisible spacer to reserve exact space for the active TLD badge */}
                    <div className="w-[74px] sm:w-[78px] h-[36px] shrink-0" />
                </div>

                {/* 2. Vertical Column of TLD Pills (Aligned with the search bar right end) */}
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-[74px] sm:w-[78px] h-[36px] z-20 pointer-events-none">
                    <div
                        className="relative w-full h-full"
                        style={{
                            transform: isShifting ? `translateY(-${STEP_HEIGHT}px)` : 'translateY(0px)',
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
                                    className={`absolute inset-x-0 h-[36px] rounded-full center font-sans text-xs sm:text-sm tracking-tight select-none transition-colors duration-500 ${
                                        isActive
                                            ? 'bg-[#e2e8f0] text-slate-900 font-bold shadow-xs'
                                            : 'bg-white/20 text-white/95 font-medium border border-white/10 backdrop-blur-xs'
                                    }`}
                                    style={{
                                        top: `${r * STEP_HEIGHT}px`,
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
