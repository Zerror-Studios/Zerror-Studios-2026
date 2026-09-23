"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiArrowUpLine,
    RiShoppingBag3Line,
    RiFundsLine,
    RiCheckLine
} from '@remixicon/react';

// 5 default dataset presets cycling every 2 seconds
const PRESETS = [
    {
        visits: 852,
        growth: "16% mo/mo",
        orders: 206,
        ordersGrowth: "10%",
        revenue: 8850,
        revenueGrowth: "+10%",
        peak: "98%",
        peakPoint: { x: 190, y: 20 },
        splinePath: "M 0,80 C 40,70 70,85 130,75 C 160,50 180,20 190,20 C 215,20 240,65 300,60",
        fillPath: "M 0,80 C 40,70 70,85 130,75 C 160,50 180,20 190,20 C 215,20 240,65 300,60 L 300,100 L 0,100 Z"
    },
    {
        visits: 984,
        growth: "21% mo/mo",
        orders: 264,
        ordersGrowth: "14%",
        revenue: 11240,
        revenueGrowth: "+15%",
        peak: "99.2%",
        peakPoint: { x: 225, y: 15 },
        splinePath: "M 0,72 C 45,75 85,60 125,55 C 165,50 200,32 225,15 C 248,32 270,48 300,42",
        fillPath: "M 0,72 C 45,75 85,60 125,55 C 165,50 200,32 225,15 C 248,32 270,48 300,42 L 300,100 L 0,100 Z"
    },
    {
        visits: 1140,
        growth: "27% mo/mo",
        orders: 328,
        ordersGrowth: "18%",
        revenue: 14680,
        revenueGrowth: "+22%",
        peak: "99.8%",
        peakPoint: { x: 140, y: 18 },
        splinePath: "M 0,65 C 40,55 90,35 140,18 C 175,25 200,60 230,55 C 255,50 275,40 300,30",
        fillPath: "M 0,65 C 40,55 90,35 140,18 C 175,25 200,60 230,55 C 255,50 275,40 300,30 L 300,100 L 0,100 Z"
    },
    {
        visits: 1325,
        growth: "34% mo/mo",
        orders: 395,
        ordersGrowth: "24%",
        revenue: 17950,
        revenueGrowth: "+28%",
        peak: "100%",
        peakPoint: { x: 250, y: 12 },
        splinePath: "M 0,75 C 60,70 110,65 160,50 C 190,40 220,25 250,12 C 270,22 285,35 300,38",
        fillPath: "M 0,75 C 60,70 110,65 160,50 C 190,40 220,25 250,12 C 270,22 285,35 300,38 L 300,100 L 0,100 Z"
    },
    {
        visits: 1580,
        growth: "42% mo/mo",
        orders: 472,
        ordersGrowth: "31%",
        revenue: 21400,
        revenueGrowth: "+35%",
        peak: "99.9%",
        peakPoint: { x: 175, y: 14 },
        splinePath: "M 0,60 C 45,50 95,45 135,30 C 155,20 165,14 175,14 C 205,30 240,45 300,25",
        fillPath: "M 0,60 C 45,50 95,45 135,30 C 155,20 165,14 175,14 C 205,30 240,45 300,25 L 300,100 L 0,100 Z"
    }
];

// Hook for smooth numerical value transitions
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
            // Ease-out cubic curve for natural deceleration
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

function ProductionSyncAnim() {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % PRESETS.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const data = PRESETS[currentIdx];

    const animatedVisits = useAnimatedNumber(data.visits, 800);
    const animatedOrders = useAnimatedNumber(data.orders, 800);
    const animatedRevenue = useAnimatedNumber(data.revenue, 800);

    return (
        <div className="absolute inset-x-0 bottom-0 top-[30%] p-8 md:p-10 flex flex-col justify-end pointer-events-none select-none ">
            {/* Main Glass Analytics & Production Sync Card */}
            <div className="w-full bg-black/50 border border-white/20 rounded-2xl p-4 shadow-xl relative overflow-hidden flex backdrop-blur-xs flex-col gap-3">
                {/* Header info */}
                    <div className="  flex items-baseline gap-2 ">
                        <span className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                            {animatedVisits.toLocaleString()}+
                        </span>
                        <span className="text-[10px] text-emerald-300 flex items-center font-medium transition-all duration-500">
                            <RiArrowUpLine size={12} />
                            {data.growth}
                        </span>
                    </div>

                {/* Animated SVG Spline Chart */}
                <div className="w-full h-20 sm:h-22 relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradToned" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="lineGradToned" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                        <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                        {/* Area fill - smooth animated morphing */}
                        <path
                            d={data.fillPath}
                            fill="url(#chartGradToned)"
                            style={{ transition: 'd 800ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />

                        {/* Spline Stroke line - smooth animated morphing */}
                        <path
                            d={data.splinePath}
                            fill="none"
                            stroke="url(#lineGradToned)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            style={{ transition: 'd 800ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />

                        {/* Peak Point - smoothly glides to current peak */}
                        <circle
                            cx={data.peakPoint.x}
                            cy={data.peakPoint.y}
                            r="4"
                            fill="#ffffff"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            style={{ transition: 'cx 800ms cubic-bezier(0.4, 0, 0.2, 1), cy 800ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                        />
                    </svg>

                    {/* Chart Badge - smoothly glides following peak point */}
                    <div
                        className="absolute bg-black/85 text-amber-300 text-[9px] px-2 py-0.5 rounded-full border border-amber-400/30 font-mono shadow-md whitespace-nowrap pointer-events-none"
                        style={{
                            left: `${(data.peakPoint.x / 300) * 100}%`,
                            top: `${Math.max(data.peakPoint.y - 15, 2)}px`,
                            transform: 'translateX(-50%)',
                            transition: 'left 800ms cubic-bezier(0.4, 0, 0.2, 1), top 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        {data.peak}
                    </div>
                </div>

                {/* Metrics Pill Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                    {/* Orders Card */}
                    <div className="bg-rose-600/90 text-white rounded-xl p-2.5 shadow-md border border-rose-400/30 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] text-rose-100">
                            <span>Orders</span>
                            <RiShoppingBag3Line size={12} />
                        </div>
                        <div className="mt-1 flex items-baseline justify-between">
                            <span className="font-extrabold font-mono text-sm sm:text-base tabular-nums">
                                {animatedOrders.toLocaleString()}
                            </span>
                            <span className="text-[9px] bg-rose-800/60 px-1 py-0.5 rounded font-medium flex items-center transition-all duration-500">
                                <RiCheckLine size={10} /> {data.ordersGrowth}
                            </span>
                        </div>
                    </div>

                    {/* Revenue Card */}
                    <div className="bg-white/95 text-slate-900 rounded-xl p-2.5 shadow-md border border-white/80 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>Revenue</span>
                            <RiFundsLine size={12} className="text-emerald-600" />
                        </div>
                        <div className="mt-1 flex items-baseline justify-between">
                            <span className="font-extrabold font-mono text-sm sm:text-base text-slate-900 tabular-nums">
                                ${animatedRevenue.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200 transition-all duration-500">
                                {data.revenueGrowth}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ProductionSyncAnim);
