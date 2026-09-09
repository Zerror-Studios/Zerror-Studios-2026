"use client";
import React, { useState, useEffect } from 'react';
import { RiMailLine, RiEarthFill, RiLightbulbFlashLine } from '@remixicon/react';
import Image from 'next/image';

const getContrastColor = (hexcolor) => {
    if (!hexcolor) return '#ffffff';
    hexcolor = hexcolor.replace("#", "");
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
};

const paletteColors = [
    { hex: '#0A0A0A' },
    { hex: '#2563EB' },
    { hex: '#F59E0B' },
    { hex: '#10B981' },
    { hex: '#8B5CF6' },
];

const ColorPalette = () => {
    const [activeColor, setActiveColor] = useState(paletteColors[1].hex);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveColor((current) => {
                const currentIndex = paletteColors.findIndex(c => c.hex === current);
                const nextIndex = (currentIndex + 1) % paletteColors.length;
                return paletteColors[nextIndex].hex;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative py-16 w-full padding overflow-hidden flex justify-center">
            <div className="w-[85%] border border-black/10  bg-white rounded-md p-10 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">

                {/* Style Block for Animations */}
                <style>{`
          @keyframes float-1 {
              0%, 100% { transform: translateY(0px) rotate(-2deg); }
              50% { transform: translateY(-20px) rotate(1deg); }
          }
          @keyframes float-2 {
              0%, 100% { transform: translateY(0px) rotate(3deg) scale(0.95); }
              50% { transform: translateY(-15px) rotate(-1deg) scale(0.98); }
          }
          @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 25px 50px -12px rgba(1, 43, 186, 0.15); }
              50% { box-shadow: 0 25px 50px -12px rgba(1, 43, 186, 0.3); }
          }
        `}</style>

                {/* Left Column: Colors & Typography */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-20 relative z-10">
                    <div className="text-3xl">
                        <h3>Color Palette</h3>
                    </div>

                    {/* Color Palette */}
                    <div className="flex items-center">
                        <div className="flex -space-x-3 ">
                            {paletteColors.map((color, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center gap-3 md:gap-4 cursor-pointer group"
                                    onClick={() => setActiveColor(color.hex)}
                                >
                                    <div
                                        className={`w-18 h-18 rounded-full transition-all duration-300 relative z-10 ${color.border ? 'border border-gray-200' : ''} ${activeColor === color.hex ? '-translate-y-2 shadow-lg scale-110' : ' group-hover:-translate-y-1 group-hover: '}`}
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span
                                        className="text-[8px] font-medium tracking-wider uppercase transition-colors duration-300"
                                        style={{ color: activeColor === color.hex ? activeColor : '#9ca3af' }}
                                    >
                                        {color.hex}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Typography */}
                    <div>
                        <div className="space-y-5">
                            {[
                                { label: 'Heading H1', size: 'text-4xl md:text-5xl leading-tight', weight: 'font-bold' },
                                { label: 'Heading H2', size: 'text-3xl md:text-4xl leading-tight', weight: 'font-bold' },
                                { label: 'Heading H3', size: 'text-2xl md:text-3xl leading-tight', weight: 'font-semibold' },
                                { label: 'Heading H4', size: 'text-xl md:text-2xl leading-tight', weight: 'font-semibold' },
                                { label: 'Heading H5', size: 'text-lg md:text-xl leading-tight', weight: 'font-medium' },
                                { label: 'Heading H6', size: 'text-base md:text-lg leading-tight', weight: 'font-medium' },
                            ].map((typo, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-gray-100 pb-4 group hover:border-gray-300 transition-colors cursor-default">
                                    <div
                                        className={`${typo.size} ${typo.weight} tracking-tight transition-colors duration-300`}
                                        style={{ color: activeColor }}
                                    >
                                        {typo.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Column: Design Direction Scroll Layout */}
                <div className="lg:col-span-4 flex flex-col items-center justify-between relative z-20 w-full mt-12 lg:mt-0 bg-white border border-gray-100 p-3 overflow-hidden">

                    {/* Pill Badge */}
                    <div
                        className="w-[85%] mx-auto rounded-full py-3 flex items-center justify-center mb-6 mt-3 transition-colors duration-300"
                        style={{ backgroundColor: activeColor }}
                    >
                        <span
                            className="text-sm font-semibold tracking-wider transition-colors duration-300"
                            style={{ color: getContrastColor(activeColor) }}
                        >
                            Design Direction
                        </span>
                    </div>

                    {/* Stacked Images container */}
                    <div className="flex flex-col gap-3 w-full  ">
                        {/* img1 - Dark UI */}
                        <div className="w-full relative rounded-lg overflow-hidden  flex-shrink-0">
                            <Image src="/images/expertisePage/website-development/webdev_swiper/img1.svg" alt="Design Direction 1" width={600} height={400} className="w-full h-auto object-cover" />
                        </div>

                        {/* img2 - Canvas & Creation */}
                        <div className="w-full relative rounded-lg overflow-hidden  flex-shrink-0">
                            <Image src="/images/expertisePage/website-development/webdev_swiper/img2.svg" alt="Design Direction 2" width={600} height={400} className="w-full h-auto object-cover" />
                        </div>

                        {/* img3 - Shaping strategy... */}
                        <div className="w-full relative rounded-lg overflow-hidden  flex-shrink-0">
                            <Image src="/images/expertisePage/website-development/webdev_swiper/img3.svg" alt="Design Direction 3" width={600} height={400} className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>

                {/* Right Column: Buttons & Icons */}
                <div className="lg:col-span-4 flex flex-col justify-between  relative z-10 mt-12 lg:mt-0">
                    {/* Buttons */}
                    <div>
                        <h3 className="text-[11px] font-bold text-gray-400 mb-10 uppercase tracking-[0.2em] flex items-center gap-4">
                            Button Style
                            <div className="h-px bg-gray-100 flex-1"></div>
                        </h3>

                        <div className="space-y-12">
                            {/* Primary */}
                            <div className="group">
                                <div className="flex justify-between items-center mb-5">
                                    <h4
                                        className="text-xl font-semibold transition-colors duration-300"
                                        style={{ color: activeColor }}
                                    >Primary</h4>
                                    <span className="text-xs text-gray-400 tracking-wider">60 PX</span>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <button
                                        className="h-[60px] flex items-center justify-center border-2 bg-white transition-all text-sm font-semibold rounded-none"
                                        style={{ borderColor: activeColor, color: activeColor }}
                                    >
                                        Square Outline
                                    </button>
                                    <button
                                        className="h-[60px] flex items-center justify-center transition-all text-sm font-semibold shadow-lg rounded-none"
                                        style={{ backgroundColor: activeColor, color: getContrastColor(activeColor), boxShadow: `0 10px 15px -3px ${activeColor}40` }}
                                    >
                                        Square Fill
                                    </button>
                                </div>
                            </div>

                            {/* Secondary */}
                            <div className="group">
                                <div className="flex justify-between items-center mb-5">
                                    <h4
                                        className="text-xl font-semibold transition-colors duration-300"
                                        style={{ color: activeColor }}
                                    >Secondary</h4>
                                    <span className="text-xs text-gray-400 tracking-wider">40 PX</span>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <button
                                        className="h-[40px] flex items-center justify-center border bg-white transition-all text-sm font-medium rounded-none opacity-80"
                                        style={{ borderColor: activeColor, color: activeColor }}
                                    >
                                        Square Outline
                                    </button>
                                    <button
                                        className="h-[40px] flex items-center justify-center transition-all text-sm font-medium   hover:shadow-xl rounded-none opacity-90"
                                        style={{ backgroundColor: activeColor, color: getContrastColor(activeColor) }}
                                    >
                                        Square Fill
                                    </button>
                                </div>
                            </div>

                            {/* Tab */}
                            <div className="group">
                                <div className="flex justify-between items-center mb-5">
                                    <h4
                                        className="text-xl font-semibold transition-colors duration-300"
                                        style={{ color: activeColor }}
                                    >Tab</h4>
                                    <span className="text-xs text-gray-400 tracking-wider">32 PX</span>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <button
                                        className="h-[32px] flex items-center justify-center border bg-white transition-all text-xs font-medium rounded-none opacity-70"
                                        style={{ borderColor: activeColor, color: activeColor }}
                                    >
                                        Square Outline
                                    </button>
                                    <button
                                        className="h-[32px] flex items-center justify-center transition-all text-xs font-medium rounded-none opacity-80"
                                        style={{ backgroundColor: activeColor, color: getContrastColor(activeColor) }}
                                    >
                                        Square Fill
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Icons */}
                    <div>
                        <h3 className="text-[11px] font-bold text-gray-400 mb-8 uppercase tracking-[0.2em] flex items-center gap-4">
                            Icon Style
                            <div className="h-px bg-gray-100 flex-1"></div>
                        </h3>
                        <div className="grid grid-cols-3 gap-3 relative">
                            {/* Line */}
                            <div className="aspect-square border border-gray-100 flex flex-col items-center justify-center gap-2 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <span className="absolute transition-all duration-300 top-3 left-3 text-[9px] uppercase tracking-wider font-semibold" style={{ color: activeColor }}>Line</span>
                                <div
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-300"
                                    style={{
                                        WebkitMaskImage: `url(/images/expertisePage/website-development/process_scroller/color_palette/mail.svg)`,
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center',
                                        backgroundColor: activeColor
                                    }}
                                />
                            </div>
                            {/* Fill */}
                            <div className="aspect-square border border-gray-100 flex flex-col items-center justify-center gap-2 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <span className="absolute transition-all duration-300 top-3 left-3 text-[9px] uppercase tracking-wider font-semibold" style={{ color: activeColor }}>Fill</span>
                                <div
                                    className="w-11 h-11 group-hover:scale-110 transition-all duration-300"
                                    style={{
                                        WebkitMaskImage: `url(/images/expertisePage/website-development/process_scroller/color_palette/globe.svg)`,
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center',
                                        backgroundColor: activeColor
                                    }}
                                />
                            </div>
                            {/* Hand drawn */}
                            <div className="aspect-square border border-gray-100 flex flex-col items-center justify-center gap-2 relative group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <span className="absolute transition-all duration-300 top-3 left-3 text-[9px] uppercase tracking-wider font-semibold" style={{ color: activeColor }}>Hand drawn</span>
                                <div
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-300"
                                    style={{
                                        WebkitMaskImage: `url(/images/expertisePage/website-development/process_scroller/color_palette/bulb.svg)`,
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center',
                                        backgroundColor: activeColor
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default ColorPalette;