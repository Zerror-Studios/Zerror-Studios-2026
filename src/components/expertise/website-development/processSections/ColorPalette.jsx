"use client";
import { RiArrowRightLine } from '@remixicon/react';
import React, { useState, useEffect } from 'react';

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
    { hex: '#0A0A0A', name: 'Dark Slate' },
    { hex: '#2563EB', name: 'Royal Blue' },
    { hex: '#F59E0B', name: 'Amber' },
    { hex: '#10B981', name: 'Emerald' },
    { hex: '#8B5CF6', name: 'Violet' },
];

const fontFamilies = [
    { name: 'Inter', category: 'Sans-Serif', family: "'Inter', sans-serif", preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Playfair Display', category: 'Serif', family: "'Playfair Display', serif", preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Fira Code', category: 'Monospace', family: "'Fira Code', monospace", preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Outfit', category: 'Geometric', family: "'Outfit', sans-serif", preview: 'The quick brown fox jumps over the lazy dog' },
    { name: 'Space Grotesk', category: 'Tech Display', family: "'Space Grotesk', sans-serif", preview: 'The quick brown fox jumps over the lazy dog' },
];

const ColorPalette = () => {
    const [activeColor, setActiveColor] = useState(paletteColors[1].hex);
    const [activeFont, setActiveFont] = useState(fontFamilies[0]);
    const [borderRadius, setBorderRadius] = useState(0); // range in % (0% to 50%)

    // Helper to calculate exact border radius (perfect 9999px pill at 50% max range)
    const getRadiusValue = (heightInPx) => {
        if (borderRadius === 50) return '9999px';
        const maxRadius = heightInPx / 2;
        return `${((borderRadius / 50) * maxRadius).toFixed(1)}px`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveColor((current) => {
                const currentIndex = paletteColors.findIndex(c => c.hex === current);
                const nextIndex = (currentIndex + 1) % paletteColors.length;
                return paletteColors[nextIndex].hex;
            });
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full h-full flex flex-col overflow-hidden bg-white select-none" style={{ fontFamily: activeFont.family }}>
            {/* Google Fonts Import & Custom Slider Styling */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
                
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: ${activeColor};
                    cursor: pointer;
                    box-shadow: 0 0 8px ${activeColor}50;
                    transition: transform 0.15s ease;
                }
                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            `}</style>

            <div className="w-full h-full border border-black/10 p-5 lg:p-7 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 overflow-hidden">

                {/* Column 1: Color Palette & Typography Hierarchy */}
                <div className="flex flex-col justify-between h-full overflow-hidden">
                    {/* Header & Colors */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 style={{ color: activeColor }} className="text-2xl font-bold tracking-tight">
                                Color Palette
                            </h3>
                            <span className="text-xs px-2.5 py-1 rounded border border-gray-200 uppercase font-mono text-gray-500">
                                {activeColor}
                            </span>
                        </div>

                        {/* Color Selector Dots */}
                        <div className="flex items-center  pt-1">
                            {paletteColors.map((color, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Select color ${color.name}`}
                                    onClick={() => setActiveColor(color.hex)}
                                    className="flex pl-2 flex-col items-center gap-1.5 cursor-pointer group transition-all duration-200"
                                >
                                    <div
                                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-200 relative ${activeColor === color.hex
                                                ? '-translate-y-1 shadow-md  scale-105'
                                                : 'hover:-translate-y-0.5 opacity-80 hover:opacity-100'
                                            }`}
                                        style={{
                                            backgroundColor: color.hex,
                                            borderColor: color.hex
                                        }}
                                    />
                                    <span
                                        className="text-[9px] uppercase font-mono transition-colors duration-200"
                                        style={{ color: activeColor === color.hex ? activeColor : '#9ca3af' }}
                                    >
                                        {color.hex}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Typography Hierarchy (H1 to H6) */}
                    <div className="flex flex-col gap-2 pt-3 flex-1 justify-center">
                        <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400">
                            Typography Hierarchy (H1 - H6)
                        </h4>
                        <div className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between flex-1">
                            {[
                                { tag: 'H1', label: 'Heading H1', size: 'text-3xl md:text-4xl' },
                                { tag: 'H2', label: 'Heading H2', size: 'text-2xl md:text-3xl' },
                                { tag: 'H3', label: 'Heading H3', size: 'text-xl md:text-2xl' },
                                { tag: 'H4', label: 'Heading H4', size: 'text-lg md:text-xl' },
                                { tag: 'H5', label: 'Heading H5', size: 'text-base md:text-lg' },
                                { tag: 'H6', label: 'Heading H6', size: 'text-sm md:text-base' },
                            ].map((typo, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-gray-200/50 pb-1.5 last:border-b-0 last:pb-0">
                                    <div
                                        className={`${typo.size} font-bold tracking-tight transition-colors duration-200 truncate`}
                                        style={{ color: activeColor, fontFamily: activeFont.family }}
                                    >
                                        {typo.label}
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200 shrink-0">
                                        {typo.tag}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 2: Font Family Selector Section */}
                <div className="flex flex-col justify-between h-full overflow-hidden border-t lg:border-t-0 lg:border-l lg:border-r border-gray-100 lg:px-6 py-2 lg:py-0">
                    <div className="flex flex-col  pb-5 gap-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900">
                                Font Family Options
                            </h3>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100" style={{ color: activeColor }}>
                                {activeFont.name}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Click any font family to change the typography across all headings & components.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 my-auto flex-1 justify-center py-1">
                        {fontFamilies.map((font) => {
                            const isSelected = activeFont.name === font.name;
                            return (
                                <button
                                    key={font.name}
                                    type="button"
                                    onClick={() => setActiveFont(font)}
                                    className={`p-2.5 md:p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1 cursor-pointer ${isSelected
                                            ? 'border-2 shadow-sm bg-gray-50/80 scale-[1.01]'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/40'
                                        }`}
                                    style={{
                                        borderColor: isSelected ? activeColor : undefined,
                                        fontFamily: font.family
                                    }}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xl font-bold text-gray-900">
                                            {font.name}
                                        </span>
                                        <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-600 font-medium">
                                            {font.category}
                                        </span>
                                    </div>
                                    <p
                                        className=" line-clamp-1 pt-0.5"
                                        style={{ color: isSelected ? activeColor : '#4b5563' }}
                                    >
                                        {font.preview}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Column 3: Border Radius Selector, Buttons & Icons */}
                <div className="flex flex-col justify-between h-full overflow-hidden">

                    {/* 1. Border Radius Drag Selector */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs uppercase  text-gray-400 flex items-center gap-2">
                                Button Border Radius
                            </h4>
                            <span
                                className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white border border-gray-200 shadow-2xs"
                                style={{ color: activeColor }}
                            >
                                {borderRadius}%
                            </span>
                        </div>

                        {/* Drag Slider */}
                        <div className="flex items-center gap-3 pt-0.5">
                            <span className="text-[10px] font-mono text-gray-400">0%</span>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="1"
                                value={borderRadius}
                                onChange={(e) => setBorderRadius(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                style={{ accentColor: activeColor }}
                            />
                            <span className="text-[10px] font-mono text-gray-400">50%</span>
                        </div>

                        {/* Presets */}
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                            {[
                                { label: 'Square (0%)', val: 0 },
                                { label: 'Rounded (15%)', val: 15 },
                                { label: 'Curved (30%)', val: 30 },
                                { label: 'Pill (50%)', val: 50 },
                            ].map((preset) => {
                                const isSelected = borderRadius === preset.val;
                                const btnRadius = preset.val === 50 ? '9999px' : `${((preset.val / 50) * 14).toFixed(1)}px`;
                                return (
                                    <button
                                        key={preset.val}
                                        type="button"
                                        onClick={() => setBorderRadius(preset.val)}
                                        className={`text-[10px] font-mono px-2.5 py-1.5 transition-all cursor-pointer text-center border ${isSelected
                                                ? 'bg-black text-white font-semibold border-black shadow-2xs scale-[1.02]'
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                            }`}
                                        style={{
                                            borderRadius: btnRadius
                                        }}
                                    >
                                        {preset.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Buttons System (Primary & Secondary Variants) */}
                    <div className="flex flex-col gap-3 pt-2 flex-1 justify-center">
                        <h4 className="text-xs uppercase  text-gray-400 flex items-center gap-2">
                            Button Style System
                            <div className="h-px bg-gray-100 flex-1"></div>
                        </h4>

                        <div className="space-y-4 ">
                            {/* Primary Buttons */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-xs font-semibold" style={{ color: activeColor }}>
                                        Primary Button Variants
                                    </h5>
                                    <span className="text-[10px] font-mono text-gray-400">50 PX</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Variant 1: Solid Fill with Arrow Glow */}
                                    <button
                                        className=" py-2 px-4 pr-2 w-full flex items-center justify-between font-semibold text-xs md:text-sm cursor-pointer transition-all duration-300 transform  relative overflow-hidden group"
                                        style={{
                                            backgroundColor: activeColor,
                                            color: getContrastColor(activeColor),
                                            borderRadius: getRadiusValue(50),
                                            boxShadow: `0 4px 14px 0 ${activeColor}40`
                                        }}
                                    >
                                        <span>Solid Fill</span>
                                        <span style={{
                                            borderRadius: getRadiusValue(50),
                                        }}
                                            className="w-6 h-6  bg-white flex items-center justify-center transition-transform duration-300  text-xs shrink-0">
                                            <RiArrowRightLine className={`size-3`} />
                                        </span>
                                    </button>

                                    {/* Variant 2: Outline with Color Invert */}
                                    <button
                                        className=" py-2 px-4 pr-2 w-full flex items-center justify-between font-semibold text-xs md:text-sm cursor-pointer transition-all duration-300 transform  border-2 group"
                                        style={{
                                            borderColor: activeColor,
                                            color: activeColor,
                                            backgroundColor: 'transparent',
                                            borderRadius: getRadiusValue(50),
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = activeColor;
                                            e.currentTarget.style.color = getContrastColor(activeColor);
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = activeColor;
                                        }}
                                    >
                                        <span>Outline Invert</span>
                                        <span className="text-xs transition-transform duration-300 group-hover:rotate-45 shrink-0">
                                            ↗
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Secondary Buttons */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h5 className="text-xs font-semibold" style={{ color: activeColor }}>
                                        Secondary Button Variants
                                    </h5>
                                    <span className="text-[10px] font-mono text-gray-400">38 PX</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Variant 1: Soft Tint Fill */}
                                    <button
                                        className="h-[38px] px-3.5 w-full flex items-center justify-between font-medium text-xs cursor-pointer transition-all duration-300 transform hover:scale-[1.02] group"
                                        style={{
                                            backgroundColor: `${activeColor}18`,
                                            color: activeColor,
                                            borderRadius: getRadiusValue(38),
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = `${activeColor}30`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = `${activeColor}18`;
                                        }}
                                    >
                                        <span>Soft Tint</span>
                                        <span className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-150 shrink-0" style={{ backgroundColor: activeColor }} />
                                    </button>

                                    {/* Variant 2: Ghost Border */}
                                    <button
                                        className="h-[38px] px-3.5 w-full flex items-center justify-between font-medium text-xs cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 border group"
                                        style={{
                                            borderColor: `${activeColor}40`,
                                            color: activeColor,
                                            backgroundColor: 'white',
                                            borderRadius: getRadiusValue(38),
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = activeColor;
                                            e.currentTarget.style.boxShadow = `0 4px 12px ${activeColor}25`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = `${activeColor}40`;
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span>Ghost Border</span>
                                        <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                                            ▸
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Icon Style System */}
                    <div className="flex flex-col gap-2 pt-2 ">
                        <h4 className="text-xs uppercase  text-gray-400 flex items-center gap-2">
                            Icon Style System
                            <div className="h-px bg-gray-100 flex-1"></div>
                        </h4>

                        <div className="grid grid-cols-2 gap-2">
                            {/* Line */}
                            <div className="aspect-video border border-gray-100 rounded-sm flex flex-col items-center justify-center gap-1 relative group hover:shadow-xs transition-all duration-200 bg-gray-50/30">
                                <span className="absolute top-1.5 left-2.5 text-xs uppercase font-mono tracking-wider" style={{ color: activeColor }}>Line</span>
                                <div
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-200"
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
                            <div className="aspect-video border border-gray-100 rounded-sm flex flex-col items-center justify-center gap-1 relative group hover:shadow-xs transition-all duration-200 bg-gray-50/30">
                                <span className="absolute top-1.5 left-2.5 text-xs uppercase font-mono tracking-wider" style={{ color: activeColor }}>Fill</span>
                                <div
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-200"
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
                            <div className="aspect-video border border-gray-100 rounded-sm flex flex-col items-center justify-center gap-1 relative group hover:shadow-xs transition-all duration-200 bg-gray-50/30">
                                <span className="absolute top-1.5 left-2.5 text-xs uppercase font-mono tracking-wider" style={{ color: activeColor }}>Hand drawn</span>
                                <div
                                    className="w-8 h-8 group-hover:scale-110 transition-all duration-200"
                                    style={{
                                        WebkitMaskImage: `url(/images/expertisePage/website-development/process_scroller/color_palette/bulb.svg)`,
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center',
                                        backgroundColor: activeColor
                                    }}
                                />
                            </div>
                            {/* Duotone */}
                            <div className="aspect-video border border-gray-100 rounded-sm flex flex-col items-center justify-center gap-1 relative group hover:shadow-xs transition-all duration-200 bg-gray-50/30">
                                <span className="absolute top-1.5 left-2.5 text-xs uppercase font-mono tracking-wider" style={{ color: activeColor }}>Duotone</span>
                                <div className="w-8 h-8 relative group-hover:scale-110 transition-all duration-200 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="w-8 h-8">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" style={{ fill: activeColor, opacity: 0.35 }} />
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" style={{ stroke: activeColor, strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }} />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ColorPalette;

