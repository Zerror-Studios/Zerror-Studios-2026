"use client";
import React, { useState, useEffect } from 'react';
import {
    RiCursorLine, RiLayoutMasonryLine, RiSquareLine, RiPenNibLine,
    RiText, RiChat1Line, RiPlayFill, RiLayoutGridLine, RiMenuLine,
    RiSearchLine, RiArrowDownSLine, RiAddLine, RiSubtractLine, RiEyeLine,
    RiFigmaLine
} from '@remixicon/react';

const FigmaWireframe = () => {
    // Default active color is a dark slate/black
    const [activeColor, setActiveColor] = useState('#000000');
    const [hexInput, setHexInput] = useState('000000');

    useEffect(() => {
        setHexInput(activeColor.replace('#', ''));
    }, [activeColor]);

    const handleHexChange = (e) => {
        let val = e.target.value.replace('#', '').slice(0, 6);
        // Allow only valid hex characters
        val = val.replace(/[^0-9A-Fa-f]/g, '');
        setHexInput(val);
        if (val.length === 6) {
            setActiveColor('#' + val);
        }
    };

    // Some sample document colors to pick from
    const documentColors = [
        '#000000', '#4F46E5', '#2563EB', '#0EA5E9', '#10B981', '#84CC16',
        '#EAB308', '#F97316', '#EF4444', '#EC4899', '#D946EF', '#8B5CF6'
    ];

    return (
        <section className="w-full h-full flex flex-col overflow-hidden">
            {/* Main Figma UI Container */}
            <div className="w-full h-full overflow-hidden border text-white border-black/10 bg-black font-sans flex flex-col">

                {/* Top Toolbar */}
                <div className="h-12 bg-[#2C2C2C] border-b border-[#3E3E3E] flex items-center justify-between px-4 text-xs select-none">
                    {/* Left tools */}
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1 text-white cursor-pointer hover:bg-[#3E3E3E] p-1 rounded"><RiFigmaLine size={16} /> <RiArrowDownSLine size={16} /></div>
                        <RiCursorLine size={16} className="text-[#0ACF83] cursor-pointer" />
                        <RiLayoutMasonryLine size={16} className="cursor-pointer hover:text-white" />
                        <RiSquareLine size={16} className="cursor-pointer hover:text-white" />
                        <RiPenNibLine size={16} className="cursor-pointer hover:text-white" />
                        <RiText size={16} className="cursor-pointer hover:text-white" />
                        <RiChat1Line size={16} className="cursor-pointer hover:text-white" />
                    </div>
                    {/* Center title */}
                    <div className="text-center font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                        Desktop Home <RiArrowDownSLine size={14} />
                    </div>
                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0ACF83] text-white px-3 py-1.5 rounded-md font-medium flex items-center gap-1 cursor-pointer hover:bg-[#09b874]">Share</div>
                        <RiPlayFill size={16} className="cursor-pointer hover:text-white" />
                        <span className="cursor-pointer hover:text-white flex items-center gap-1">16% <RiArrowDownSLine size={14} /></span>
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 flex overflow-hidden">

                    {/* Left Sidebar (Layers/Pages) */}
                    <div className="w-60 bg-[#2C2C2C] border-r border-[#3E3E3E] flex flex-col text-[11px] hidden md:flex select-none">
                        <div className="flex items-center gap-2 p-3 border-b border-[#3E3E3E] text-[#888]">
                            <RiSearchLine size={14} /> Layers, Assets, Pages
                        </div>
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-2 font-semibold text-white">Pages <RiAddLine size={14} className="cursor-pointer" /></div>
                            <div className="flex items-center gap-2 py-1.5 bg-[#3E3E3E] rounded px-2 cursor-pointer text-white"><RiLayoutGridLine size={14} className="text-[#0ACF83]" /> Wireframe</div>
                            <div className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-[#3E3E3E] rounded"><RiPenNibLine size={14} className="text-[#F59E0B]" /> Design workspace</div>
                            <div className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-[#3E3E3E] rounded"><RiLayoutMasonryLine size={14} className="text-[#10B981]" /> Approved design</div>
                        </div>
                        <div className="border-t border-[#3E3E3E] p-3 flex-1 overflow-y-auto">
                            <div className="flex items-center gap-2 py-1.5 font-semibold text-white cursor-pointer"><RiLayoutMasonryLine size={14} /> MacBook Air - 1</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Header</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Hero Section</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Products Grid</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Footer</div>
                        </div>
                    </div>

                    {/* Canvas / Editor Area */}
                    <div className="flex-1 bg-[#1E1E1E] relative overflow-hidden flex justify-center items-start  ">

                        {/* Scaled Wrapper to fit both artboards */}
                        <div className="flex items-center scale-40 gap-12 origin-top mt-10 ">

                            {/* Desktop Artboard */}
                            <div className="flex flex-col gap-3">
                                <span className="text-white text-lg font-medium">Desktop Home</span>
                                <div className="w-[1000px] bg-white shadow-xl flex flex-col pb-20">
                                    {/* Top Black Bar */}
                                    <div
                                        className="text-white text-[10px] py-1.5 px-6 flex justify-between uppercase tracking-widest font-semibold transition-colors duration-300"
                                        style={{ backgroundColor: activeColor }}
                                    >
                                        <span>Free Shipping on all orders</span>
                                        <span>10% off your first order with code: DESIGN</span>
                                        <span>Free returns within 30 days</span>
                                    </div>

                                    {/* Header */}
                                    <div className="flex justify-between items-center px-10 py-6 border-b border-gray-100">
                                        <div className="font-serif font-bold text-3xl tracking-tighter text-black">nobo.</div>
                                        <div className="flex gap-8 text-xs font-semibold text-gray-800 uppercase tracking-widest">
                                            <span className="cursor-pointer hover:text-black">Shop</span>
                                            <span className="cursor-pointer hover:text-black">Collections</span>
                                            <span className="cursor-pointer hover:text-black">Celebrity Closet</span>
                                            <span className="cursor-pointer hover:text-black">Our World</span>
                                        </div>
                                        <div className="flex gap-5 text-gray-800">
                                            <RiSearchLine size={20} className="cursor-pointer hover:text-black" />
                                            <RiCursorLine size={20} className="cursor-pointer hover:text-black" />
                                            <RiLayoutGridLine size={20} className="cursor-pointer hover:text-black" />
                                        </div>
                                    </div>

                                    {/* Hero */}
                                    <div className="flex w-full min-h-[500px]">
                                        {/* Left Side: Content */}
                                        <div className="w-1/2 flex flex-col justify-center px-16 py-12">
                                            {/* Figma Selection Bounding Box around text */}
                                            <div className="relative border border-transparent hover:border-[#0EA5E9] p-6 -ml-6 cursor-move group transition-colors">
                                                {/* Selection Corners */}
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -top-1 -left-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100"></div>

                                                <h1
                                                    className="text-7xl font-serif leading-[1.1] mb-6 transition-colors duration-300"
                                                    style={{ color: activeColor }}
                                                >
                                                    The New <br /> Standard.
                                                </h1>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                                                    Elevate your everyday wardrobe with our latest collection of premium, sustainably sourced essentials.
                                                </p>
                                                <button
                                                    className="px-8 py-4 text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-300 shadow-lg"
                                                    style={{ backgroundColor: activeColor }}
                                                >
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                        {/* Right Side: Image Placeholder */}
                                        <div className="w-1/2 bg-[#F5F5F5] relative group cursor-pointer overflow-hidden flex items-center justify-center">
                                            <RiLayoutMasonryLine size={48} className="text-gray-300" />
                                            <div
                                                className="absolute inset-0 opacity-5 mix-blend-multiply transition-colors duration-300"
                                                style={{ backgroundColor: activeColor }}
                                            ></div>
                                            <div className="absolute top-6 right-6 bg-white px-3 py-1.5 text-[10px] font-mono text-gray-400  rounded-sm">
                                                Hero_Image.jpg
                                            </div>
                                        </div>
                                    </div>


                                    {/* Products Section */}
                                    <div className="px-12 pt-20 flex flex-col items-center">
                                        <div className="text-center mb-16">
                                            <p className="text-xs font-semibold tracking-widest uppercase mb-4">Featured collections</p>
                                            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                                                Every piece begins with a single tension, precision against ease, structure against movement. Clothing designed for the day as it actually unfolds.
                                            </p>
                                        </div>

                                        {/* Filters */}
                                        <div className="w-full flex justify-between items-center mb-10 text-xs font-semibold uppercase">
                                            <div className="flex gap-8 items-center">
                                                <span
                                                    className="text-white px-4 py-2 rounded transition-colors duration-300 shadow-sm"
                                                    style={{ backgroundColor: activeColor }}
                                                >All</span>
                                                <span className="text-gray-400 cursor-pointer hover:text-black transition-colors">Tops</span>
                                                <span className="text-gray-400 cursor-pointer hover:text-black transition-colors">Dresses</span>
                                                <span className="text-gray-400 cursor-pointer hover:text-black transition-colors">Bottoms</span>
                                            </div>
                                            <div className="flex gap-6 text-gray-400 items-center">
                                                <span className="cursor-pointer hover:text-black transition-colors">View All</span>
                                                <span className="cursor-pointer hover:text-black transition-colors border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center">&lt;</span>
                                                <span className="cursor-pointer hover:text-black transition-colors border border-gray-200 rounded-full w-6 h-6 flex items-center justify-center">&gt;</span>
                                            </div>
                                        </div>

                                        {/* Products Grid */}
                                        <div className="grid grid-cols-4 gap-3 w-full">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="flex flex-col group cursor-pointer">
                                                    <div className="bg-[#F5F5F5] aspect-[3/4] w-full flex items-center justify-center text-gray-300 relative mb-4 overflow-hidden">
                                                        <div className="w-16 h-16 border-2 border-gray-300 flex items-center justify-center">
                                                            <RiLayoutMasonryLine size={24} />
                                                        </div>
                                                        {i === 3 && (
                                                            <div
                                                                className="absolute top-4 left-4 text-white text-[10px] px-2 py-1 font-semibold uppercase transition-colors duration-300"
                                                                style={{ backgroundColor: activeColor }}
                                                            >Sold Out</div>
                                                        )}
                                                        <div
                                                            className="absolute bottom-0 left-0 w-full text-white text-xs font-semibold uppercase py-3 text-center transition-colors duration-300"
                                                            style={{ backgroundColor: activeColor }}
                                                        >Add To Bag</div>

                                                        <div
                                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 mix-blend-multiply transition-opacity duration-300 pointer-events-none"
                                                            style={{ backgroundColor: activeColor }}
                                                        ></div>
                                                    </div>
                                                    <h4 className="text-xs font-semibold mb-1 group-hover:underline">Product Title {i}</h4>
                                                    <p className="text-[10px] text-gray-500 mb-2">2 colors</p>
                                                    <p className="text-xs font-semibold">₹ 12,500.00</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Artboard */}
                            <div className="flex flex-col gap-3">
                                <span className="text-white text-lg font-medium">Mobile Home</span>
                                <div className="w-[375px] bg-white shadow-xl flex flex-col pb-20">
                                    {/* Top Black Bar */}
                                    <div
                                        className="text-white text-[8px] py-2 px-4 text-center uppercase tracking-widest font-semibold transition-colors duration-300"
                                        style={{ backgroundColor: activeColor }}
                                    >
                                        Free Shipping on all orders
                                    </div>
                                    {/* Header */}
                                    <div className="flex justify-between items-center px-5 py-5 border-b border-gray-100">
                                        <RiMenuLine size={20} className="cursor-pointer" />
                                        <div className="font-serif font-bold text-2xl tracking-tighter text-black">nobo.</div>
                                        <div className="flex gap-4 text-gray-800">
                                            <RiSearchLine size={20} className="cursor-pointer" />
                                            <RiLayoutGridLine size={20} className="cursor-pointer" />
                                        </div>
                                    </div>
                                    {/* Mobile Hero (Vertical Split) */}
                                    <div className="flex flex-col w-full">
                                        {/* Top Content */}
                                        <div className="w-full flex flex-col justify-center px-6 py-8">
                                            <div className="relative border border-transparent hover:border-[#0EA5E9] p-4 -ml-4 cursor-move group transition-colors">
                                                {/* Selection Corners */}
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -top-1 -left-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100"></div>
                                                <div className="w-2 h-2 bg-white border border-[#0EA5E9] absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100"></div>

                                                <h1
                                                    className="text-5xl font-serif leading-[1.1] mb-4 transition-colors duration-300"
                                                    style={{ color: activeColor }}
                                                >
                                                    The New <br /> Standard.
                                                </h1>
                                                <p className="text-gray-500 text-xs leading-relaxed mb-6">
                                                    Elevate your everyday wardrobe with our latest collection of premium essentials.
                                                </p>
                                                <button
                                                    className="w-full py-3 text-white text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 shadow-sm"
                                                    style={{ backgroundColor: activeColor }}
                                                >
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                        {/* Bottom Image Placeholder */}
                                        <div className="w-full aspect-square bg-[#F5F5F5] relative group cursor-pointer overflow-hidden flex items-center justify-center">
                                            <RiLayoutMasonryLine size={32} className="text-gray-300" />
                                            <div
                                                className="absolute inset-0 opacity-5 mix-blend-multiply transition-colors duration-300"
                                                style={{ backgroundColor: activeColor }}
                                            ></div>
                                            <div className="absolute top-4 right-4 bg-white px-2 py-1 text-[8px] font-mono text-gray-400  rounded-sm">
                                                Hero_Image.jpg
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Products */}
                                    <div className="px-6 py-12 pb-0 flex flex-col items-center">
                                        <div className="text-center mb-8">
                                            <p className="text-[10px] font-semibold tracking-widest uppercase mb-3">Featured collections</p>
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                Every piece begins with a single tension.
                                            </p>
                                        </div>
                                        <div className="w-full flex justify-between items-center mb-6 text-[10px] font-semibold uppercase">
                                            <div className="flex gap-4 items-center">
                                                <span
                                                    className="text-white px-3 py-1.5 rounded transition-colors duration-300 shadow-sm"
                                                    style={{ backgroundColor: activeColor }}
                                                >All</span>
                                                <span className="text-gray-400">Tops</span>
                                                <span className="text-gray-400">Dresses</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 w-full">
                                            {[1, 2].map(i => (
                                                <div key={i} className="flex flex-col group cursor-pointer">
                                                    <div className="bg-[#F5F5F5] aspect-[3/4] w-full flex items-center justify-center text-gray-300 relative mb-3 overflow-hidden">
                                                        <div className="w-10 h-10 border-2 border-gray-300 flex items-center justify-center">
                                                            <RiLayoutMasonryLine size={16} />
                                                        </div>
                                                        <div
                                                            className="absolute bottom-0 left-0 w-full text-white text-[10px] font-semibold uppercase py-2 text-center "
                                                            style={{ backgroundColor: activeColor }}
                                                        >Add To Bag</div>
                                                        <div
                                                            className="absolute inset-0 opacity-0 group-hover:opacity-10 mix-blend-multiply transition-opacity duration-300 pointer-events-none"
                                                            style={{ backgroundColor: activeColor }}
                                                        ></div>
                                                    </div>
                                                    <h4 className="text-[10px] font-semibold mb-1">Product {i}</h4>
                                                    <p className="text-[10px] font-semibold">₹ 12,500</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Floating Color Picker Modal */}
                        <div className="absolute scale-80 origin-top-right right-2 top-2 w-64 bg-[#2C2C2C] border border-[#3E3E3E] rounded-lg shadow-2xl flex flex-col text-xs z-10 select-none">
                            <div className="flex justify-between items-center p-3 border-b border-[#3E3E3E]">
                                <span className="font-semibold text-white">Color</span>
                                <div className="flex gap-3 text-[#888]">
                                    <span className="cursor-pointer hover:text-white">Custom</span>
                                    <span className="cursor-pointer hover:text-white">Libraries</span>
                                </div>
                            </div>


                            <div className="p-4 flex flex-col gap-5">
                                {/* Sliders (Interactive via native picker overlay) */}
                                <div className="flex items-center gap-3 relative group">
                                    <input
                                        type="color"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        value={activeColor}
                                        onChange={(e) => setActiveColor(e.target.value)}
                                        title="Click to pick color"
                                    />
                                    <div className="w-6 h-6 rounded border border-[#444] transition-colors duration-300 shadow-inner z-10" style={{ backgroundColor: activeColor }}></div>
                                    <div className="flex-1 space-y-2.5 z-10 pointer-events-none">
                                        <div className="h-2 w-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full group-hover:opacity-80"></div>
                                        <div className="h-2 w-full bg-gradient-to-r from-transparent to-white rounded-full opacity-50"></div>
                                    </div>
                                </div>

                                {/* Hex Input (Editable) */}
                                <div className="flex gap-2">
                                    <div className="bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2 py-1 text-[#888] flex items-center">HEX</div>
                                    <div className="bg-[#1E1E1E] border border-[#3E3E3E] rounded px-2 py-1 flex-1 text-white flex justify-between items-center focus-within:border-[#0ACF83] transition-colors">
                                        <input
                                            type="text"
                                            className="bg-transparent outline-none w-full uppercase font-mono"
                                            value={hexInput}
                                            onChange={handleHexChange}
                                            spellCheck="false"
                                        />
                                        <span className="text-[#888]">100%</span>
                                    </div>
                                </div>

                                {/* Document Colors */}
                                <div>
                                    <div className="text-[#888] mb-3 flex justify-between font-medium">Document colors <RiArrowDownSLine size={14} /></div>
                                    <div className="grid grid-cols-6 gap-2">
                                        {documentColors.map((c, i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded cursor-pointer border hover:scale-110 transition-transform ${activeColor === c ? 'border-white shadow-[0_0_0_1px_rgba(255,255,255,0.5)]' : 'border-[#444]'}`}
                                                style={{ backgroundColor: c }}
                                                onClick={() => setActiveColor(c)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar (Properties) */}
                    <div className="w-60 bg-[#2C2C2C] border-l border-[#3E3E3E] flex flex-col text-[11px] overflow-y-auto hidden lg:flex select-none">
                        <div className="flex border-b border-[#3E3E3E]">
                            <div className="flex-1 p-3 text-center border-b-2 border-white font-semibold text-white cursor-pointer">Design</div>
                            <div className="flex-1 p-3 text-center text-[#888] cursor-pointer hover:text-white transition-colors">Prototype</div>
                        </div>

                        <div className="p-4 border-b border-[#3E3E3E]">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold text-white">Text</span>
                                <RiAddLine size={14} className="cursor-pointer text-[#888] hover:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-[#888]">
                                <div className="flex items-center gap-2 bg-[#1E1E1E] px-2 py-1 rounded"><span className="w-4 text-[#555]">X</span> 1258</div>
                                <div className="flex items-center gap-2 bg-[#1E1E1E] px-2 py-1 rounded"><span className="w-4 text-[#555]">Y</span> 432</div>
                                <div className="flex items-center gap-2 bg-[#1E1E1E] px-2 py-1 rounded"><span className="w-4 text-[#555]">W</span> 480</div>
                                <div className="flex items-center gap-2 bg-[#1E1E1E] px-2 py-1 rounded"><span className="w-4 text-[#555]">H</span> 120</div>
                            </div>
                        </div>

                        <div className="p-4 border-b border-[#3E3E3E]">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Fill</span>
                                <div className="flex gap-2 text-[#888]">
                                    <RiSubtractLine size={14} className="cursor-pointer hover:text-white" />
                                    <RiAddLine size={14} className="cursor-pointer hover:text-white" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4 bg-[#1E1E1E] p-1.5 rounded">
                                <div className="w-4 h-4 rounded border border-[#444] transition-colors duration-300" style={{ backgroundColor: activeColor }}></div>
                                <span className="flex-1 text-white uppercase px-1">{activeColor.replace('#', '')}</span>
                                <span className="text-[#888] px-1">100%</span>
                                <RiEyeLine size={14} className="text-[#888] cursor-pointer hover:text-white" />
                            </div>
                        </div>

                        <div className="p-4 border-b border-[#3E3E3E] text-[#888]">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Stroke</span>
                                <RiAddLine size={14} className="cursor-pointer hover:text-white" />
                            </div>
                        </div>

                        <div className="p-4 border-b border-[#3E3E3E] text-[#888]">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Effects</span>
                                <RiAddLine size={14} className="cursor-pointer hover:text-white" />
                            </div>
                        </div>

                        <div className="p-4 text-[#888]">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-white">Export</span>
                                <RiAddLine size={14} className="cursor-pointer hover:text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FigmaWireframe;