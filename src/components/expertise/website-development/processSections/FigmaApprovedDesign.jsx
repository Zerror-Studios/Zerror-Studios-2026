"use client";
import React, { useState, useEffect } from 'react';
import {
    RiCursorLine, RiLayoutMasonryLine, RiSquareLine, RiPenNibLine,
    RiText, RiChat1Line, RiPlayFill, RiLayoutGridLine, RiMenuLine,
    RiSearchLine, RiArrowDownSLine, RiAddLine, RiSubtractLine, RiEyeLine,
    RiFigmaLine, RiCheckDoubleLine
} from '@remixicon/react';

const FigmaApprovedDesign = () => {
    const [heroIndex, setHeroIndex] = useState(0);
    
    // Curated Unsplash images for a premium fashion aesthetic
    const heroImages = [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop", // Editorial fashion model
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop", // Winter coat
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"  // Fashion poses
    ];

    const products = [
        {
            title: "Linen Relaxed Shirt",
            price: "₹ 4,500",
            imgMain: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
            imgHover: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Pleated Trousers",
            price: "₹ 5,200",
            imgMain: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
            imgHover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Cotton Minimal Dress",
            price: "₹ 8,900",
            imgMain: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
            imgHover: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop",
            soldOut: true
        },
        {
            title: "Classic Blazer",
            price: "₹ 12,500",
            imgMain: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600&auto=format&fit=crop",
            imgHover: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop"
        }
    ];

    // Autonomous Loop for Hero Slider
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const activeColor = '#000000'; // Static color for approved design

    return (
        <section className="w-full h-full flex flex-col overflow-hidden">
            {/* Main Figma UI Container */}
            <div className="w-full h-full overflow-hidden border text-white border-black/10 bg-black font-sans flex flex-col">
                
                {/* Top Toolbar */}
                <div className="h-12 bg-[#2C2C2C] border-b border-[#3E3E3E] flex items-center justify-between px-4 text-xs select-none">
                    {/* Left tools */}
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1 text-white cursor-pointer hover:bg-[#3E3E3E] p-1 rounded"><RiFigmaLine size={16} /> <RiArrowDownSLine size={16} /></div>
                        <RiCursorLine size={16} className="cursor-pointer hover:text-white" />
                        <RiLayoutMasonryLine size={16} className="cursor-pointer hover:text-white" />
                        <RiSquareLine size={16} className="cursor-pointer hover:text-white" />
                        <RiPenNibLine size={16} className="cursor-pointer hover:text-white" />
                        <RiText size={16} className="cursor-pointer hover:text-white" />
                        <RiChat1Line size={16} className="cursor-pointer hover:text-white" />
                    </div>
                    {/* Center title */}
                    <div className="text-center font-medium flex items-center gap-2 cursor-pointer hover:text-white">
                        Approved UI Design <RiCheckDoubleLine size={14} className="text-[#0ACF83]"/>
                    </div>
                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[#0ACF83] text-white px-3 py-1.5 rounded-md font-medium flex items-center gap-1 cursor-pointer hover:bg-[#09b874]">Share</div>
                        <RiPlayFill size={16} className="cursor-pointer text-[#0ACF83]" />
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
                            <div className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-[#3E3E3E] rounded"><RiLayoutGridLine size={14} className="text-[#0ACF83]" /> Wireframe</div>
                            <div className="flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-[#3E3E3E] rounded"><RiPenNibLine size={14} className="text-[#F59E0B]" /> Design workspace</div>
                            <div className="flex items-center gap-2 py-1.5 bg-[#3E3E3E] rounded px-2 cursor-pointer text-white"><RiCheckDoubleLine size={14} className="text-[#0ACF83]" /> Approved design</div>
                        </div>
                        <div className="border-t border-[#3E3E3E] p-3 flex-1 overflow-y-auto">
                            <div className="flex items-center gap-2 py-1.5 font-semibold text-white cursor-pointer"><RiLayoutMasonryLine size={14} /> MacBook Air - High-Fi</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Header</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Hero Section (Slider)</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Categories</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Products Grid</div>
                            <div className="flex items-center gap-2 py-1.5 pl-6 cursor-pointer hover:text-white"><RiLayoutMasonryLine size={14} /> Footer</div>
                        </div>
                    </div>

                    {/* Canvas / Editor Area */}
                    <div className="flex-1 bg-[#1E1E1E] relative overflow-hidden flex justify-center items-start ">
                        
                        {/* Scaled Wrapper to fit both artboards */}
                        <div className="flex items-start scale-40 gap-12 origin-top mt-10">
                            
                            {/* Desktop Artboard */}
                            <div className="flex flex-col gap-3">
                                <span className="text-white text-lg font-medium">Desktop Home (High-Fi)</span>
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
                                            <span className="cursor-pointer hover:text-black transition-colors">Shop</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Collections</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Celebrity Closet</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Our World</span>
                                        </div>
                                        <div className="flex gap-5 text-gray-800">
                                            <RiSearchLine size={20} className="cursor-pointer hover:text-black transition-colors" />
                                            <RiCursorLine size={20} className="cursor-pointer hover:text-black transition-colors" />
                                            <RiLayoutGridLine size={20} className="cursor-pointer hover:text-black transition-colors" />
                                        </div>
                                    </div>

                                    {/* Hero */}
                                    <div className="flex w-full min-h-[500px]">
                                        {/* Left Side: Content */}
                                        <div className="w-1/2 flex flex-col justify-center px-16 py-12">
                                            <div className="relative p-6 -ml-6">
                                                <h1 
                                                    className="text-7xl font-serif leading-[1.1] mb-6 text-black"
                                                >
                                                    The New <br /> Standard.
                                                </h1>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                                                    Elevate your everyday wardrobe with our latest collection of premium, sustainably sourced essentials.
                                                </p>
                                                <button 
                                                    className="px-8 py-4 text-white text-xs font-semibold uppercase tracking-widest hover:bg-gray-900 transition-colors duration-300 shadow-lg"
                                                    style={{ backgroundColor: activeColor }}
                                                >
                                                    Shop Now
                                                </button>
                                            </div>
                                        </div>
                                        {/* Right Side: Image Slider */}
                                        <div className="w-1/2 bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center">
                                            {heroImages.map((img, i) => (
                                                <img 
                                                    key={i}
                                                    src={img} 
                                                    alt="Hero Slider" 
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                                                    style={{ opacity: i === heroIndex ? 1 : 0 }}
                                                />
                                            ))}
                                            {/* Slider Indicators */}
                                            <div className="absolute bottom-6 flex gap-2 z-10">
                                                {heroImages.map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-black w-6' : 'bg-black/30'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products Section */}
                                    <div className="px-12 pt-20 flex flex-col items-center text-black">
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
                                        <div className="grid grid-cols-4 gap-6 w-full">
                                            {products.map((product, i) => (
                                                <div key={i} className="flex flex-col group cursor-pointer">
                                                    <div className="aspect-[3/4] w-full bg-[#F5F5F5] relative mb-4 overflow-hidden">
                                                        {/* Main Image */}
                                                        <img 
                                                            src={product.imgMain} 
                                                            alt={product.title} 
                                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                                        />
                                                        {/* Hover Image */}
                                                        <img 
                                                            src={product.imgHover} 
                                                            alt={product.title} 
                                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
                                                        />
                                                        
                                                        {product.soldOut && (
                                                            <div 
                                                                className="absolute top-4 left-4 text-white text-[10px] px-2 py-1 font-semibold uppercase transition-colors duration-300 z-10 shadow-sm"
                                                                style={{ backgroundColor: activeColor }}
                                                            >Sold Out</div>
                                                        )}
                                                        <div 
                                                            className="absolute bottom-0 left-0 w-full text-white text-xs font-semibold uppercase py-3 text-center transition-all duration-300 translate-y-full group-hover:translate-y-0 z-10"
                                                            style={{ backgroundColor: activeColor }}
                                                        >Add To Bag</div>
                                                    </div>
                                                    <h4 className="text-xs font-semibold mb-1 group-hover:underline">{product.title}</h4>
                                                    <p className="text-[10px] text-gray-500 mb-2">2 colors</p>
                                                    <p className="text-xs font-semibold">{product.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Artboard */}
                            <div className="flex flex-col gap-3">
                                <span className="text-white text-lg font-medium">Mobile Home (High-Fi)</span>
                                <div className="w-[375px] bg-white shadow-xl flex flex-col pb-20 text-black">
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
                                        <div className="font-serif font-bold text-2xl tracking-tighter">nobo.</div>
                                        <div className="flex gap-4 text-gray-800">
                                            <RiSearchLine size={20} className="cursor-pointer" />
                                            <RiLayoutGridLine size={20} className="cursor-pointer" />
                                        </div>
                                    </div>
                                    
                                    {/* Mobile Hero (Vertical Split) */}
                                    <div className="flex flex-col w-full">
                                        {/* Top Content */}
                                        <div className="w-full flex flex-col justify-center px-6 py-8 text-center">
                                            <div className="relative p-4">
                                                <h1 
                                                    className="text-5xl font-serif leading-[1.1] mb-4 text-black"
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
                                        {/* Bottom Image Slider */}
                                        <div className="w-full aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden">
                                            {heroImages.map((img, i) => (
                                                <img 
                                                    key={i}
                                                    src={img} 
                                                    alt="Hero Slider Mobile" 
                                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                                                    style={{ opacity: i === heroIndex ? 1 : 0 }}
                                                />
                                            ))}
                                            {/* Slider Indicators */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                                {heroImages.map((_, i) => (
                                                    <div 
                                                        key={i} 
                                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                                    />
                                                ))}
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
                                            {products.slice(0,2).map((product, i) => (
                                                <div key={i} className="flex flex-col group cursor-pointer">
                                                    <div className="bg-[#F5F5F5] aspect-[3/4] w-full relative mb-3 overflow-hidden">
                                                        {/* Main Image */}
                                                        <img 
                                                            src={product.imgMain} 
                                                            alt={product.title} 
                                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                                        />
                                                        {/* Hover Image */}
                                                        <img 
                                                            src={product.imgHover} 
                                                            alt={product.title} 
                                                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
                                                        />
                                                        <div 
                                                            className="absolute bottom-0 left-0 w-full text-white text-[10px] font-semibold uppercase py-2 text-center transition-colors duration-300 translate-y-full group-hover:translate-y-0"
                                                            style={{ backgroundColor: activeColor }}
                                                        >Add To Bag</div>
                                                    </div>
                                                    <h4 className="text-[10px] font-semibold mb-1 truncate">{product.title}</h4>
                                                    <p className="text-[10px] font-semibold">{product.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FigmaApprovedDesign;
