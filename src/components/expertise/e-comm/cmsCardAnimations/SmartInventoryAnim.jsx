"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    RiSearchLine,
    RiHome4Line,
    RiStore2Line,
    RiArrowUpSLine,
    RiArrowDownSLine,
    RiBarChart2Line,
    RiContactsBook2Line,
    RiInboxLine,
    RiBookOpenLine,
    RiMegaphoneLine,
    RiSettings4Line,
    RiLogoutBoxRLine,
    RiCheckLine
} from '@remixicon/react';

// Product catalog matching reference image (img1.webp) - 9 products with optimized WebP images (<50KB)
const PRODUCT_CATALOG = [
    {
        name: "The Coastal Pearl Ring",
        variations: "22 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_pearl.webp",
        isChecked: false
    },
    {
        name: "The Aurora Gold Ring",
        variations: "18 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_aurora.webp",
        isChecked: true
    },
    {
        name: "The Classic Oval Ring",
        variations: "25 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_oval.webp",
        isChecked: false
    },
    {
        name: "The Bloom Signature Ring",
        variations: "16 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_bloom.webp",
        isChecked: false
    },
    {
        name: "The Solitaire Diamond Ring",
        variations: "12 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_solitaire.webp",
        isChecked: false
    },
    {
        name: "The Royal Emerald Ring",
        variations: "9 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_emerald.webp",
        isChecked: false
    },
    {
        name: "The Celestia Sapphire Ring",
        variations: "14 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_sapphire.webp",
        isChecked: false
    },
    {
        name: "The Eterno Baguette Band",
        variations: "20 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_baguette.webp",
        isChecked: false
    },
    {
        name: "The Vintage Cushion Ring",
        variations: "11 Variations | Rings",
        img: "/images/expertisePage/e-comm/cmsCards/products/ring_cushion.webp",
        isChecked: false
    }
];

function SmartInventoryAnim() {
    // Start with the initial 4 products
    const [items, setItems] = useState(() =>
        PRODUCT_CATALOG.slice(0, 5).map((prod, idx) => ({
            ...prod,
            instanceId: `initial-${idx}`
        }))
    );
    const counterRef = React.useRef(0);

    // Infinite simple loop: prepends a new dummy product at the top every 2.6s
    useEffect(() => {
        const interval = setInterval(() => {
            counterRef.current += 1;
            const currentCounter = counterRef.current;
            const template = PRODUCT_CATALOG[currentCounter % PRODUCT_CATALOG.length];

            const newItem = {
                ...template,
                instanceId: `prod-item-${currentCounter}`
            };

            // Prepend to top and retain up to 5 items so the bottom item exits smoothly
            setItems((current) => [newItem, ...current.slice(0, 5)]);
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute p-8 md:p-10 inset-x-0 bottom-0 top-[32%] sm:top-[34%] flex flex-col justify-end pointer-events-none select-none z-10">
            {/* Custom Embedded Keyframes for Scale Animation and Smooth Downward Shift */}
            <style>{`
                @keyframes productPopScaleIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.65) translateY(-8px);
                        max-height: 0px;
                        padding-top: 0px;
                        padding-bottom: 0px;
                        margin-bottom: 0px;
                    }
                    45% {
                        opacity: 0.9;
                        max-height: 52px;
                        transform: scale(1.03) translateY(0px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0px);
                        max-height: 52px;
                        padding-top: 4px;
                        padding-bottom: 4px;
                        margin-bottom: 4px;
                    }
                }
                .anim-product-scale-enter {
                    animation: productPopScaleIn 0.52s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    overflow: hidden;
                }
                .product-row-shift {
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
                }
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .anim-blink-cursor {
                    animation: cursorBlink 0.9s step-start infinite;
                }
            `}</style>

            {/* Main SaaS Dashboard Container */}
            <div className="w-full h-full bg-white rounded-lg shadow-2xl border border-white/80 border-b-0 overflow-hidden flex flex-col text-slate-800">
                {/* Top Header Bar */}
                <div className="flex items-center justify-between gap-x-6 px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 border-b border-slate-100 shrink-0 bg-white/60">
                    <span className="text-[10px] xs:text-[11px] sm:text-xs font-black tracking-wider whitespace-nowrap text-slate-900 font-sans">
                        Z-COMMERCE
                    </span>

                    {/* Header Search Bar */}
                    <div className="flex items-center relative gap-1.5 bg-slate-100/90 px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] text-slate-400 border border-slate-200/50 w-full">
                        <RiSearchLine size={10} className="text-slate-400 shrink-0 relative" />
                        <span className="w-[1px] h-2.5 sm:h-3 bg-[#3b82f6] anim-blink-cursor left-6 absolute shrink-0" />
                        <span className="  leading-none">Search here...</span>
                    </div>
                </div>

                {/* Dashboard Body: Left Sidebar + Right Product List */}
                <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Left Sidebar */}
                    <div className="w-[78px] xs:w-24 sm:w-28 md:w-32 bg-[#f8fafc]/90 border-r border-slate-100 p-1.5 xs:p-2 sm:p-2.5 flex flex-col justify-between shrink-0 overflow-hidden">
                        <div className="space-y-1">
                            {/* Home */}
                            <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px]  text-slate-600 px-1 py-0.5">
                                <RiHome4Line size={11} className="text-slate-400 shrink-0" />
                                <span className="truncate">Home</span>
                            </div>

                            {/* Elevated Floating Store Card */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-sm border border-slate-100 space-y-1">
                                <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-bold text-slate-800 px-0.5">
                                    <span className="flex items-center gap-1 truncate">
                                        <RiStore2Line size={10} className="text-[#3b82f6] shrink-0" />
                                        Store
                                    </span>
                                    <RiArrowUpSLine size={10} className="text-slate-400 shrink-0" />
                                </div>

                                {/* Active Products Pill */}
                                <div className="bg-[#3b82f6] text-white text-[8px] sm:text-[9px]  px-1.5 py-0.5 sm:py-1 rounded-md flex items-center gap-1 shadow-2xs">
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white shrink-0" />
                                    <span className="">Products</span>
                                </div>

                                {/* Sub-items */}
                                <div className="space-y-0.5 px-1 text-[7px] sm:text-[8px] text-slate-500 font-medium">
                                    <div className="flex items-center gap-1 py-0.5">
                                        <span className="w-1 h-1 rounded-full border border-slate-300 shrink-0" />
                                        <span className="truncate">Inventory</span>
                                    </div>
                                    <div className="flex items-center gap-1 py-0.5">
                                        <span className="w-1 h-1 rounded-full border border-slate-300 shrink-0" />
                                        <span className="truncate">Collections</span>
                                    </div>
                                    <div className="flex items-center gap-1 py-0.5">
                                        <span className="w-1 h-1 rounded-full border border-slate-300 shrink-0" />
                                        <span className="truncate">LookBooks</span>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Menu Links */}
                            <div className="space-y-0.5 text-[7px] sm:text-[8px] text-slate-600 px-0.5">
                                <div className="flex items-center justify-between py-0.5">
                                    <span className="flex items-center gap-1 truncate">
                                        <RiBarChart2Line size={9} className="text-slate-400 shrink-0" />
                                        Payments
                                    </span>
                                    <span className="text-[6px] sm:text-[7px] bg-slate-200/80 text-slate-600 px-0.5 sm:px-1 rounded  shrink-0">
                                        +New
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-0.5">
                                    <span className="flex items-center gap-1 truncate">
                                        <RiContactsBook2Line size={9} className="text-slate-400 shrink-0" />
                                        Contact Book
                                    </span>
                                    <RiArrowDownSLine size={8} className="text-slate-400 shrink-0" />
                                </div>

                                <div className="flex items-center justify-between py-0.5">
                                    <span className="flex items-center gap-1 truncate">
                                        <RiBookOpenLine size={9} className="text-slate-400 shrink-0" />
                                        Blogs
                                    </span>
                                    <span className="text-[6px] sm:text-[7px] bg-amber-100 text-amber-700 px-0.5 sm:px-1 rounded  shrink-0">
                                        +Update
                                    </span>
                                </div>
                                <div className="flex items-center justify-between py-0.5">
                                    <span className="flex items-center gap-1 truncate">
                                        <RiMegaphoneLine size={9} className="text-slate-400 shrink-0" />
                                        Marketing
                                    </span>
                                    <RiArrowDownSLine size={8} className="text-slate-400 shrink-0" />
                                </div>
                            </div>
                        </div>

                        {/* Settings & Log Out at Bottom */}
                        <div className="pt-1 border-t border-slate-200/60 text-[7px] sm:text-[8px] text-slate-500 space-y-0.5 px-0.5">
                            <div className="flex items-center gap-1 py-0.5">
                                <RiSettings4Line size={9} className="text-slate-400 shrink-0" />
                                <span className="truncate">Settings</span>
                            </div>
                            <div className="flex items-center gap-1 py-0.5">
                                <RiLogoutBoxRLine size={9} className="text-slate-400 shrink-0" />
                                <span className="truncate">Log Out</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content Area */}
                    <div className="flex-1 flex flex-col p-2 sm:p-2.5 overflow-hidden min-w-0">
                        {/* Title & Description */}
                        <div className="mb-1.5 shrink-0">
                            <div className="flex items-center justify-between">
                            <h2 className="text-[11px] sm:text-xs md:text-sm font-bold text-[#170b3b] leading-tight truncate">
                                Products (50)
                            </h2>
                            <button className='bg-[#3b82f6] text-white text-[8px] px-1 py-1 rounded-sm leading-none'>+ Add</button>
                            </div>
                            <p className="text-[7px] sm:text-[8px] text-slate-400 leading-tight truncate">
                                Create, manage, and organize your product listing
                            </p>
                        </div>

                        {/* Product Rows List with Animated New Item Scaling In and Shifting Down */}
                        <div className="flex-1 overflow-hidden relative">
                            {items.map((prod, index) => {
                                const isTop = index === 0;

                                return (
                                    <div
                                        key={prod.instanceId}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg border border-slate-100/90 bg-white/95 shadow-2xs ${
                                            isTop ? 'anim-product-scale-enter' : 'product-row-shift mb-1'
                                        }`}
                                    >

                                        {/* Ring Thumbnail Image */}
                                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded sm:rounded-md overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                                            <Image
                                                src={prod.img}
                                                alt={prod.name}
                                                width={28}
                                                height={28}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Title and Category/Variations */}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] sm:text-[10px]  text-slate-800 truncate leading-tight">
                                                {prod.name}
                                            </p>
                                            <p className="text-[7px] sm:text-[8px] text-slate-400 truncate leading-tight">
                                                {prod.variations}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SmartInventoryAnim);
