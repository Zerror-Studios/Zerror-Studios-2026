"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSearchLine,
    RiCheckboxCircleFill,
    RiCheckboxBlankCircleLine,
    RiShoppingBag3Line,
    RiStore2Line,
    RiArrowUpSLine,
    RiRefreshLine,
    RiFlashlightLine,
    RiCheckLine
} from '@remixicon/react';

// Product list modeled directly after img1.webp
const PRODUCTS = [
    {
        id: 'pearl',
        name: "The Coastal Pearl Ring",
        category: "Rings",
        variations: 22,
        initialStock: 42,
        sku: "CPR-22-GLD",
        searchTag: "Coastal Pearl Ring"
    },
    {
        id: 'aurora',
        name: "The Aurora Gold Ring",
        category: "Rings",
        variations: 18,
        initialStock: 19,
        sku: "AGR-18-18K",
        searchTag: "Aurora Gold Ring"
    },
    {
        id: 'oval',
        name: "The Classic Oval Ring",
        category: "Rings",
        variations: 25,
        initialStock: 35,
        sku: "COR-25-DIA",
        searchTag: "Classic Oval Ring"
    },
    {
        id: 'bloom',
        name: "The Bloom Signature Ring",
        category: "Rings",
        variations: 16,
        initialStock: 65,
        sku: "BSR-16-RGD",
        searchTag: "Bloom Signature Ring"
    }
];

const SEARCH_QUERIES = [
    "Search anything here...",
    "Search: Coastal Pearl...",
    "Search: Aurora Gold...",
    "Search: Classic Oval...",
    "Search: Bloom Signature..."
];

// High-end jewelry vector thumbnails matching img1.webp luxury aesthetics
function RingThumbnail({ type, isActive }) {
    if (type === 'pearl') {
        return (
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0 transition-all duration-300 border ${
                isActive ? 'border-blue-400 shadow-sm ring-2 ring-blue-400/30' : 'border-slate-200'
            }`}>
                <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                    <rect width="36" height="36" rx="6" fill="url(#pearl-bg)" />
                    <ellipse cx="18" cy="23" rx="9" ry="5" stroke="url(#gold-band)" strokeWidth="2.2" fill="none" />
                    <path d="M15 18 L18 20 L21 18" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="18" cy="14" r="5" fill="url(#pearl-sphere)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.18))" />
                    <circle cx="16.5" cy="12.5" r="1.3" fill="#ffffff" opacity="0.9" />
                    <defs>
                        <linearGradient id="pearl-bg" x1="0" y1="0" x2="36" y2="36">
                            <stop offset="0%" stopColor="#fdfbf7" />
                            <stop offset="100%" stopColor="#e2e8f0" />
                        </linearGradient>
                        <linearGradient id="gold-band" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#ca8a04" />
                        </linearGradient>
                        <radialGradient id="pearl-sphere" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="60%" stopColor="#f1f5f9" />
                            <stop offset="85%" stopColor="#cbd5e1" />
                            <stop offset="100%" stopColor="#94a3b8" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (type === 'aurora') {
        return (
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0 transition-all duration-300 border ${
                isActive ? 'border-blue-400 shadow-sm ring-2 ring-blue-400/30' : 'border-slate-200'
            }`}>
                <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                    <rect width="36" height="36" rx="6" fill="url(#aurora-bg)" />
                    <ellipse cx="18" cy="18" rx="10" ry="7.5" stroke="url(#aurora-gold)" strokeWidth="3" fill="none" />
                    <ellipse cx="18" cy="18" rx="7.2" ry="5.2" stroke="#fef9c3" strokeWidth="1" fill="none" opacity="0.85" />
                    <path d="M12 14.5 Q18 11.5 24 14.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
                    <defs>
                        <linearGradient id="aurora-bg" x1="0" y1="0" x2="36" y2="36">
                            <stop offset="0%" stopColor="#fffbeb" />
                            <stop offset="100%" stopColor="#fef3c7" />
                        </linearGradient>
                        <linearGradient id="aurora-gold" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#fde047" />
                            <stop offset="40%" stopColor="#eab308" />
                            <stop offset="75%" stopColor="#ca8a04" />
                            <stop offset="100%" stopColor="#854d0e" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (type === 'oval') {
        return (
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0 transition-all duration-300 border ${
                isActive ? 'border-blue-400 shadow-sm ring-2 ring-blue-400/30' : 'border-slate-200'
            }`}>
                <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                    <rect width="36" height="36" rx="6" fill="url(#oval-bg)" />
                    <ellipse cx="18" cy="23" rx="9" ry="5.5" stroke="url(#plat-band)" strokeWidth="2" fill="none" />
                    <ellipse cx="18" cy="14" rx="6" ry="4.5" fill="url(#diamond-facet)" stroke="#93c5fd" strokeWidth="0.8" />
                    <polygon points="18,10.5 22,14 18,17.5 14,14" fill="#ffffff" opacity="0.6" />
                    <path d="M22 11 L23 13 L25 14 L23 15 L22 17 L21 15 L19 14 L21 13 Z" fill="#ffffff" opacity="0.95" />
                    <defs>
                        <linearGradient id="oval-bg" x1="0" y1="0" x2="36" y2="36">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#1e293b" />
                        </linearGradient>
                        <linearGradient id="plat-band" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#e2e8f0" />
                            <stop offset="50%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#64748b" />
                        </linearGradient>
                        <linearGradient id="diamond-facet" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#dbeafe" />
                            <stop offset="100%" stopColor="#93c5fd" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    return (
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden shrink-0 transition-all duration-300 border ${
            isActive ? 'border-blue-400 shadow-sm ring-2 ring-blue-400/30' : 'border-slate-200'
        }`}>
            <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
                <rect width="36" height="36" rx="6" fill="url(#bloom-bg)" />
                <ellipse cx="18" cy="23" rx="9" ry="5.5" stroke="url(#rose-gold)" strokeWidth="2" fill="none" />
                <circle cx="18" cy="11.5" r="3" fill="#fecdd3" opacity="0.95" />
                <circle cx="14.5" cy="14" r="3" fill="#fecdd3" opacity="0.95" />
                <circle cx="21.5" cy="14" r="3" fill="#fecdd3" opacity="0.95" />
                <circle cx="18" cy="16.5" r="3" fill="#fecdd3" opacity="0.95" />
                <circle cx="18" cy="14" r="2.2" fill="#ffffff" stroke="#fb7185" strokeWidth="0.8" />
                <circle cx="17.3" cy="13.3" r="0.7" fill="#ffffff" />
                <defs>
                    <linearGradient id="bloom-bg" x1="0" y1="0" x2="36" y2="36">
                        <stop offset="0%" stopColor="#fff1f2" />
                        <stop offset="100%" stopColor="#ffe4e6" />
                    </linearGradient>
                    <linearGradient id="rose-gold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fecdd3" />
                        <stop offset="50%" stopColor="#fb7185" />
                        <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

function SmartInventoryAnim() {
    const [activeRow, setActiveRow] = useState(0);
    const [cycleCount, setCycleCount] = useState(0);
    const [stockDeltas, setStockDeltas] = useState([0, 0, 0, 0]);
    const [lastAction, setLastAction] = useState({ type: 'order', label: 'Order #1084 synced' });
    const [latency, setLatency] = useState('0.18s');

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveRow((prev) => {
                const nextRow = (prev + 1) % PRODUCTS.length;
                setCycleCount((c) => c + 1);

                // Simulate realistic order sync decrement or periodic restock
                setStockDeltas((deltas) => {
                    const next = [...deltas];
                    // Decrement stock for current active item
                    if (next[nextRow] > -3) {
                        next[nextRow] -= 1;
                        setLastAction({
                            type: 'order',
                            label: `Order #${1080 + Math.floor(Math.random() * 80)} synced`
                        });
                    } else {
                        // Trigger automated restock
                        next[nextRow] = 0;
                        setLastAction({
                            type: 'restock',
                            label: `Auto-restocked +12 units`
                        });
                    }
                    return next;
                });

                // Subtle dynamic latency fluctuation
                const latencies = ['0.16s', '0.18s', '0.14s', '0.21s', '0.19s'];
                setLatency(latencies[Math.floor(Math.random() * latencies.length)]);

                return nextRow;
            });
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    const currentSearch = SEARCH_QUERIES[(activeRow + 1) % SEARCH_QUERIES.length];

    return (
        <div className="absolute inset-x-0 bottom-0 top-[35%] px-3 sm:px-5 pb-3 sm:pb-5 flex flex-col justify-end pointer-events-none select-none">
            {/* Main Glass/Solid Dashboard Container */}
            <div className="w-full bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl shadow-2xl p-3 sm:p-4 flex flex-col gap-2.5 text-slate-800">
                {/* Dashboard Top Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-xs">
                            <RiShoppingBag3Line size={13} />
                        </div>
                        <span className="text-xs font-black tracking-tight text-slate-900 font-mono">
                            Z-COM
                        </span>
                        <span className="text-[10px] bg-blue-50 text-[#2563eb] font-semibold px-2 py-0.5 rounded-full border border-blue-200/80 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
                            Products (81)
                        </span>
                    </div>

                    {/* Animated Search Box */}
                    <div className="flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-1 rounded-md text-[10px] text-slate-600 border border-slate-200/80 font-mono">
                        <RiSearchLine size={11} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[90px] xs:max-w-[130px] sm:max-w-[160px] text-slate-700">
                            {currentSearch}
                        </span>
                        <span className="w-0.5 h-3 bg-[#2563eb] animate-pulse" />
                    </div>
                </div>

                {/* Dashboard Body: Left Store Sidebar (from img1.webp) + Right Table */}
                <div className="flex gap-2.5 items-stretch">
                    {/* Left Store Navigation Sidebar (Matching img1.webp Store overlay) */}
                    <div className="hidden sm:flex flex-col justify-between w-24 shrink-0 border-r border-slate-100 pr-2">
                        <div className="space-y-1.5">
                            {/* Store Header */}
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 px-1">
                                <span className="flex items-center gap-1">
                                    <RiStore2Line size={12} className="text-[#2563eb]" />
                                    Store
                                </span>
                                <RiArrowUpSLine size={12} className="text-slate-400" />
                            </div>

                            {/* Products Active Button */}
                            <div className="bg-[#2563eb] text-white text-[10px] font-semibold px-2 py-1 rounded-lg flex items-center justify-between shadow-xs transition-transform duration-300">
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    Products
                                </span>
                                <span className="text-[8px] bg-white/20 px-1 rounded font-mono">
                                    81
                                </span>
                            </div>

                            {/* Inventory */}
                            <div className="text-slate-500 text-[10px] px-2 py-0.5 rounded-lg flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full border border-slate-300" />
                                    Inventory
                                </span>
                                <span className="text-[8px] font-mono text-emerald-600 font-bold">
                                    162
                                </span>
                            </div>

                            {/* Collections */}
                            <div className="text-slate-400 text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full border border-slate-300" />
                                Collections
                            </div>

                            {/* LookBooks */}
                            <div className="text-slate-400 text-[10px] px-2 py-0.5 rounded-lg flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full border border-slate-300" />
                                LookBooks
                            </div>
                        </div>

                        {/* Live Sync Status Mini Badge */}
                        <div className="pt-1.5 border-t border-slate-100 text-[8px] text-slate-400 leading-tight">
                            <span className="text-emerald-600 font-bold block flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                Multi-store
                            </span>
                            <span>Shopify · Zcom</span>
                        </div>
                    </div>

                    {/* Right Table Section */}
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {/* Table Header Row (Soft Blue Tinted Banner like img1.webp) */}
                        <div className="grid grid-cols-[20px_1fr_45px_55px] items-center bg-[#edf3ff] text-[#2563eb] px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold tracking-wide">
                            <div className="flex items-center justify-center">
                                <div className="w-3 h-3 rounded-sm border border-[#2563eb]/60 bg-[#2563eb]/10 flex items-center justify-center">
                                    <RiCheckLine size={8} className="text-[#2563eb]" />
                                </div>
                            </div>
                            <span>Product Details</span>
                            <span className="text-center">Variations</span>
                            <span className="text-right">Live Stock</span>
                        </div>

                        {/* 4 Product Rows */}
                        <div className="space-y-1">
                            {PRODUCTS.map((prod, idx) => {
                                const isActive = activeRow === idx;
                                const currentStock = prod.initialStock + stockDeltas[idx];

                                return (
                                    <div
                                        key={prod.id}
                                        className={`grid grid-cols-[20px_1fr_45px_55px] items-center px-2 py-1 sm:py-1.5 rounded-xl text-xs transition-all duration-300 border ${
                                            isActive
                                                ? 'bg-blue-50/95 border-blue-200 shadow-xs translate-x-0.5'
                                                : 'bg-white/80 border-slate-100 hover:bg-slate-50'
                                        }`}
                                    >
                                        {/* Checkbox (Animated blue on active) */}
                                        <div className="flex items-center">
                                            {isActive ? (
                                                <RiCheckboxCircleFill
                                                    size={15}
                                                    className="text-[#2563eb] transition-transform duration-300 scale-110"
                                                />
                                            ) : (
                                                <RiCheckboxBlankCircleLine
                                                    size={15}
                                                    className="text-slate-300 transition-colors duration-200"
                                                />
                                            )}
                                        </div>

                                        {/* Product Thumbnail + Title + Specs */}
                                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
                                            <RingThumbnail type={prod.id} isActive={isActive} />
                                            <div className="truncate min-w-0">
                                                <p className={`font-semibold truncate text-[11px] sm:text-xs leading-tight transition-colors ${
                                                    isActive ? 'text-blue-950 font-bold' : 'text-slate-800'
                                                }`}>
                                                    {prod.name}
                                                </p>
                                                <p className="text-[8px] sm:text-[9px] text-slate-400 leading-none truncate">
                                                    {prod.variations} Variations · {prod.category}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Variations Count */}
                                        <div className="text-center text-[10px] text-slate-500 font-mono font-medium">
                                            {prod.variations}
                                        </div>

                                        {/* Live Stock Badge with Pulse */}
                                        <div className="text-right flex items-center justify-end gap-1">
                                            <span
                                                className={`font-mono font-bold text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md transition-all duration-300 tabular-nums flex items-center gap-0.5 ${
                                                    isActive
                                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs scale-105'
                                                        : 'text-slate-700 bg-slate-100/80 border border-slate-200/50'
                                                }`}
                                            >
                                                {isActive && (
                                                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                                                )}
                                                {currentStock}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Live Feed & Latency Bar */}
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="font-semibold text-emerald-700">
                            ⚡ {lastAction.label}
                        </span>
                        <span className="text-slate-400 hidden xs:inline">
                            • {PRODUCTS[activeRow].name}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 font-mono text-slate-400 text-[9px] shrink-0">
                        <RiRefreshLine
                            size={10}
                            className="text-slate-400 animate-spin"
                            style={{ animationDuration: '4s' }}
                        />
                        <span>Sync: {latency}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SmartInventoryAnim);
