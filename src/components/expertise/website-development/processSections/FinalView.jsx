"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSearchLine, RiShoppingBagLine, RiShoppingBagFill,
    RiHeartLine, RiHeartFill, RiCloseLine, RiAddLine,
    RiSubtractLine, RiArrowRightLine,
    RiLockLine, RiComputerLine, RiSmartphoneLine,
    RiCheckLine, RiMenuLine, RiCheckDoubleLine, RiDeleteBin6Line,
    RiSparklingLine
} from '@remixicon/react';

const heroImages = [
    {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        title: "The New Standard.",
        subtitle: "Elevate your everyday wardrobe with our latest collection of premium, sustainably sourced essentials."
    },
    {
        url: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
        title: "Winter Minimal.",
        subtitle: "Architectural tailoring crafted with Italian wool blends and uncompromised precision."
    },
    {
        url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
        title: "Resort '26 Motion.",
        subtitle: "Fluid silhouettes designed for seamless transition from day to evening."
    }
];

const allProducts = [
    {
        id: 1,
        title: "Linen Relaxed Shirt",
        category: "Tops",
        price: 4500,
        priceFormatted: "₹ 4,500",
        imgMain: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
        imgHover: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
        colors: ['#FFFFFF', '#1A1A1A', '#C2B280']
    },
    {
        id: 2,
        title: "Pleated Trousers",
        category: "Bottoms",
        price: 5200,
        priceFormatted: "₹ 5,200",
        imgMain: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
        imgHover: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop",
        colors: ['#1A1A1A', '#4A5568', '#D4AF37']
    },
    {
        id: 3,
        title: "Cotton Minimal Dress",
        category: "Dresses",
        price: 8900,
        priceFormatted: "₹ 8,900",
        imgMain: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
        imgHover: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?q=80&w=600&auto=format&fit=crop",
        colors: ['#FFFFFF', '#E5E7EB'],
        soldOut: true
    },
    {
        id: 4,
        title: "Classic Blazer",
        category: "Tops",
        price: 12500,
        priceFormatted: "₹ 12,500",
        imgMain: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600&auto=format&fit=crop",
        imgHover: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
        colors: ['#1A1A1A', '#2563EB', '#8B5CF6']
    }
];

const FinalView = () => {
    const [heroIndex, setHeroIndex] = useState(0);
    const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
    const [activeCategory, setActiveCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [toastMessage, setToastMessage] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    // Auto Hero Slider Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Filter products
    const filteredProducts = allProducts.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = searchQuery === '' || product.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Cart actions
    const addToCart = (product) => {
        if (product.soldOut) return;
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        showToast(`Added "${product.title}" to Bag!`);
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const toggleWishlist = (id) => {
        setWishlist(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                showToast("Added to Wishlist!");
                return [...prev, id];
            }
        });
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const isMobileMode = viewMode === 'mobile';

    return (
        <section className="w-full h-full flex flex-col overflow-hidden">
            {/* Main Interactive Outer Container */}
            <div className="w-full h-full bg-white border border-black/10 flex flex-col font-sans overflow-hidden relative">

                {/* Top Browser Bar Controls */}
                <div className="bg-[#1A1A1A] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-white/10 shrink-0 select-none text-xs z-30">
                    {/* Window Controls */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5 mr-1">
                            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FF5F56]"></div>
                            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
                            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <span className="hidden md:inline-block text-[#888] font-mono text-[11px]">Final Interactive Web UI</span>
                    </div>

                    {/* Address Bar */}
                    <div className="flex items-center gap-2 bg-[#2C2C2C] px-3 py-1 rounded-full border border-white/10 w-full max-w-[200px] sm:max-w-md mx-2 sm:mx-4">
                        <RiLockLine size={12} className="text-[#0ACF83] shrink-0" />
                        <span className="text-gray-200 font-mono text-[10px] sm:text-[11px] truncate">https://nobo-official.com</span>
                        <div className="ml-auto hidden sm:flex items-center gap-1 shrink-0">
                            <span className="w-2 h-2 rounded-full bg-[#0ACF83] animate-pulse"></span>
                            <span className="text-[10px] text-[#0ACF83] uppercase tracking-wider font-semibold">Live Production</span>
                        </div>
                    </div>

                    {/* Viewport Mode Switcher Buttons */}
                    <div className="flex items-center gap-1 bg-[#2C2C2C] p-1 rounded-md border border-white/10 shrink-0">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${viewMode === 'desktop' ? 'bg-[#002bba] text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                            title="Desktop View"
                        >
                            <RiComputerLine size={14} /> <span className="hidden sm:inline">Desktop</span>
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${viewMode === 'mobile' ? 'bg-[#002bba] text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                            title="Mobile View"
                        >
                            <RiSmartphoneLine size={14} /> <span className="hidden sm:inline">Mobile</span>
                        </button>
                    </div>
                </div>

                {/* Floating Toast Notification Banner */}
                {toastMessage && (
                    <div className="absolute top-14 sm:top-16 right-4 sm:right-6 bg_blue text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg shadow-xl text-xs font-semibold z-50 flex items-center gap-2 animate-bounce">
                        <RiCheckDoubleLine size={16} />
                        {toastMessage}
                    </div>
                )}

                {/* Main Viewport Workspace Background */}
                <div className={`flex-1 bg-gray-100 overflow-hidden relative flex justify-center items-center transition-all duration-700 ease-in-out ${isMobileMode ? 'p-3 sm:p-6' : 'p-0'}`}>

                    {/* Web Canvas Outer Frame (Desktop Full Size or Mobile iPhone Shell) */}
                    <div
                        className={`bg-white shadow-2xl flex flex-col relative overflow-hidden w-full h-full transition-[max-width,max-height,border-radius,border-width,box-shadow,margin,padding] duration-700 ease-in-out ${isMobileMode
                                ? 'max-w-[375px] max-h-[667px] sm:max-h-[720px] rounded-[36px] border-[6px] sm:border-[8px] border-gray-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]'
                                : 'max-w-full max-h-full rounded-none border-0 border-transparent'
                            }`}
                    >
                        {/* Mobile iPhone Dynamic Island Pill Header Notch */}
                        <div className={`w-24 h-4 bg-gray-900 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-80 flex items-center justify-center pointer-events-none transition-opacity duration-500 ease-in-out ${isMobileMode ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="w-2 h-2 rounded-full bg-black/80"></div>
                        </div>

                        {/* Scrollable Web Page Body */}
                        <div className="flex-1 overflow-y-auto  relative flex flex-col">

                            {/* Top Announcement Bar */}
                            <div className={`bg_blue text-white text-[9px] sm:text-xs py-1.5 px-3 text-center uppercase tracking-widest font-semibold flex justify-center items-center gap-2 sm:gap-4 shrink-0 ${isMobileMode ? 'pt-5' : ''}`}>
                                <span>Free Shipping on all orders</span>
                                {!isMobileMode && (
                                    <>
                                        <span>•</span>
                                        <span>10% OFF CODE: NOBO10</span>
                                        <span>•</span>
                                        <span>30-Day Free Returns</span>
                                    </>
                                )}
                            </div>

                            {/* Navigation Header */}
                            <header className={`px-3.5 sm:px-6 py-2.5 sm:py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30 ${isMobileMode ? "rounded-t-4xl" : ""} shrink-0`}>
                                <div className="flex items-center gap-2 sm:gap-6">
                                    {(isMobileMode || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                                        <button
                                            onClick={() => setIsMobileMenuOpen(true)}
                                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                        >
                                            <RiMenuLine size={18} className="text-black" />
                                        </button>
                                    )}
                                    <div className="font-serif font-bold text-lg sm:text-4 tracking-tighter text-black cursor-pointer">
                                        nobo.
                                    </div>
                                    {!isMobileMode && (
                                        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-widest text-gray-700 ml-4 lg:ml-6">
                                            <span className="cursor-pointer hover:text-black transition-colors border-b-2 border-black pb-0.5">Shop</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Collections</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Celebrity Closet</span>
                                            <span className="cursor-pointer hover:text-black transition-colors">Our World</span>
                                        </nav>
                                    )}
                                </div>

                                {/* Navbar Actions */}
                                <div className="flex items-center gap-1.5 sm:gap-4 text-gray-800">
                                    <button
                                        onClick={() => setIsSearchOpen(true)}
                                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                                        title="Search"
                                    >
                                        <RiSearchLine size={18} />
                                    </button>
                                    <button
                                        onClick={() => showToast(`Wishlist contains ${wishlist.length} item(s)`)}
                                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                                        title="Wishlist"
                                    >
                                        {wishlist.length > 0 ? (
                                            <RiHeartFill size={18} className="text-red-500" />
                                        ) : (
                                            <RiHeartLine size={18} />
                                        )}
                                        {wishlist.length > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                                {wishlist.length}
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setIsCartOpen(true)}
                                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                                        title="Shopping Bag"
                                    >
                                        {totalCartCount > 0 ? (
                                            <RiShoppingBagFill size={18} className="text_blue" />
                                        ) : (
                                            <RiShoppingBagLine size={18} />
                                        )}
                                        {totalCartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg_blue text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                                {totalCartCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </header>

                            {/* Hero Slider Section */}
                            <div className={`relative w-full ${isMobileMode ? 'min-h-[240px]' : 'min-h-[360px] sm:min-h-[460px]'} bg-gray-100 flex items-center overflow-hidden shrink-0 transition-all duration-700 ease-in-out`}>
                                {heroImages.map((hero, i) => (
                                    <div
                                        key={i}
                                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex flex-col justify-end ${isMobileMode ? 'p-4' : 'p-6 sm:p-14'
                                            } ${i === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                    >
                                        <img
                                            src={hero.url}
                                            alt={hero.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

                                        <div className="relative z-20 max-w-xl text-white">
                                            <h1 className={`${isMobileMode ? 'text-xl font-serif' : 'text-3xl sm:text-6xl font-serif'} leading-tight mb-1.5 sm:mb-4 drop-shadow-md`}>
                                                {hero.title}
                                            </h1>
                                            <p className={`${isMobileMode ? 'text-[10px] line-clamp-2' : 'text-xs sm:text-sm'} text-gray-200 leading-relaxed mb-3 sm:mb-6 max-w-md drop-shadow`}>
                                                {hero.subtitle}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    const el = document.getElementById('products-section');
                                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className={`${isMobileMode ? 'px-3 py-1.5 text-[9px]' : 'px-6 sm:px-8 py-3 sm:py-4 text-xs'} bg-white text-black font-semibold uppercase tracking-widest hover:bg_blue hover:text-white transition-colors duration-300 shadow-xl flex items-center gap-1.5 group rounded-sm`}
                                            >
                                                Shop Collection <RiArrowRightLine size={12} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Hero Slider Dot Buttons */}
                                <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-14 flex gap-1.5 z-20">
                                    {heroImages.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setHeroIndex(i)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white w-5 sm:w-6' : 'bg-white/50 w-1.5'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Interactive Products Section */}
                            <div id="products-section" className={`${isMobileMode ? 'p-3' : 'p-6 sm:p-12'} flex flex-col items-center text-black`}>
                                <div className="text-center mb-3 sm:mb-8">
                                    <p className="text-[9px] sm:text-xs font-semibold tracking-widest uppercase mb-1 text_blue">Curated Selection</p>
                                    <h2 className={`${isMobileMode ? 'text-lg font-serif' : 'text-2xl sm:text-3xl font-serif'} mb-1 sm:mb-3`}>Featured Collections</h2>
                                    <p className="text-[10px] sm:text-sm text-gray-500 max-w-lg leading-relaxed">
                                        Every piece begins with a single tension — precision against ease, structure against movement.
                                    </p>
                                </div>

                                {/* Category Filter Pills */}
                                <div className="w-full flex justify-between items-center mb-3 sm:mb-6 border-b border-gray-100 pb-2 sm:pb-3">
                                    <div className="flex gap-1.5 sm:gap-4 items-center overflow-x-auto scroller_none w-full">
                                        {['All', 'Tops', 'Dresses', 'Bottoms'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setActiveCategory(cat)}
                                                className={`text-[9px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 sm:px-4 py-1 sm:py-2 rounded-full transition-all shrink-0 ${activeCategory === cat ? 'bg_blue text-white shadow-md' : 'text-gray-500 hover:text-black hover:bg-gray-100'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    {!isMobileMode && (
                                        <span className="text-xs text-gray-400 font-medium hidden sm:inline shrink-0">
                                            {filteredProducts.length} Item(s)
                                        </span>
                                    )}
                                </div>

                                {/* Product Cards Grid */}
                                <div className={`grid w-full ${isMobileMode ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
                                    {filteredProducts.map((product) => {
                                        const isLiked = wishlist.includes(product.id);
                                        return (
                                            <div
                                                key={product.id}
                                                className="flex flex-col group cursor-pointer bg-white rounded-lg border border-gray-100 p-1.5 sm:p-3 hover:shadow-xl transition-all duration-300 relative"
                                            >
                                                {/* Wishlist Heart Button */}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                                                    className="absolute top-2.5 right-2.5 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                                                >
                                                    {isLiked ? (
                                                        <RiHeartFill size={14} className="text-red-500" />
                                                    ) : (
                                                        <RiHeartLine size={14} className="text-gray-600 hover:text-red-500" />
                                                    )}
                                                </button>

                                                {/* Product Image Swap Frame */}
                                                <div className="aspect-[3/4] w-full bg-gray-100 rounded-md relative mb-1.5 sm:mb-4 overflow-hidden">
                                                    <img
                                                        src={product.imgMain}
                                                        alt={product.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                                    />
                                                    <img
                                                        src={product.imgHover}
                                                        alt={product.title}
                                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
                                                    />

                                                    {product.soldOut && (
                                                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] sm:text-[9px] px-1.5 py-0.5 font-semibold uppercase tracking-wider rounded-sm z-10 shadow-sm">
                                                            Sold Out
                                                        </div>
                                                    )}

                                                    {/* Desktop Hover / Mobile Bottom Add to Bag */}
                                                    {!product.soldOut && (
                                                        <button
                                                            onClick={() => addToCart(product)}
                                                            className={`absolute bottom-0 left-0 w-full bg_blue text-white ${isMobileMode ? 'py-1.5 text-[9px]' : 'py-3 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full'
                                                                } font-semibold uppercase text-center transition-all duration-300 z-10 hover:bg-blue-900 flex items-center justify-center gap-1`}
                                                        >
                                                            <RiShoppingBagLine size={12} /> Add To Bag
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-0.5 gap-0.5">
                                                    <h4 className="text-[10px] sm:text-xs font-semibold text-gray-900 group-hover:text_blue transition-colors line-clamp-1">
                                                        {product.title}
                                                    </h4>
                                                    <span className="text-[10px] sm:text-xs font-bold text-gray-900">{product.priceFormatted}</span>
                                                </div>

                                                {/* Color Swatches */}
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    {product.colors.map((c, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-gray-300 shadow-inner"
                                                            style={{ backgroundColor: c }}
                                                        />
                                                    ))}
                                                    <span className="text-[8px] sm:text-[10px] text-gray-400 ml-0.5">{product.colors.length} colors</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Interactive Web Footer */}
                            <footer className={`bg-[#1A1A1A] text-white ${isMobileMode ? 'p-4' : 'p-6 sm:p-12'} mt-auto shrink-0`}>
                                <div className={`grid ${isMobileMode ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-4 gap-8'} mb-4 border-b border-white/10 pb-4 text-xs`}>
                                    <div>
                                        <div className="font-serif font-bold text-lg sm:text-2xl tracking-tighter mb-1.5">nobo.</div>
                                        <p className="text-gray-400 text-[10px] leading-relaxed">
                                            Designed & developed with precision. High performance e-commerce digital experience.
                                        </p>
                                    </div>
                                    {!isMobileMode && (
                                        <>
                                            <div>
                                                <h4 className="font-semibold uppercase tracking-widest text-[11px] mb-3 text-gray-300">Shop</h4>
                                                <ul className="space-y-1.5 text-gray-400 text-[11px]">
                                                    <li className="hover:text-white cursor-pointer">New Arrivals</li>
                                                    <li className="hover:text-white cursor-pointer">Best Sellers</li>
                                                    <li className="hover:text-white cursor-pointer">Essential Tops</li>
                                                    <li className="hover:text-white cursor-pointer">Tailored Outerwear</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold uppercase tracking-widest text-[11px] mb-3 text-gray-300">Client Care</h4>
                                                <ul className="space-y-1.5 text-gray-400 text-[11px]">
                                                    <li className="hover:text-white cursor-pointer">Shipping & Delivery</li>
                                                    <li className="hover:text-white cursor-pointer">Returns & Exchanges</li>
                                                    <li className="hover:text-white cursor-pointer">Size Guide</li>
                                                    <li className="hover:text-white cursor-pointer">Contact Us</li>
                                                </ul>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <h4 className="font-semibold uppercase tracking-widest text-[10px] mb-1.5 text-gray-300">Newsletter</h4>
                                        <div className="flex gap-1.5">
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="bg-[#2C2C2C] px-2.5 py-1 text-[10px] rounded border border-white/10 text-white outline-none flex-1"
                                            />
                                            <button className="bg_blue px-2.5 py-1 text-[9px] font-semibold uppercase rounded hover:bg-blue-800 transition-colors">
                                                Join
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[11px] text-gray-400 gap-0.5 text-center sm:text-left">
                                    <p>© 2026 nobo. All Rights Reserved. Built by Zerror Studios.</p>
                                    <p>Figma Approved Design Interface Implementation</p>
                                </div>
                            </footer>

                        </div>

                        {/* OVERLAYS WITH SMOOTH OPEN & CLOSE CSS TRANSITIONS */}

                        {/* Mobile Navigation Drawer (Slide from Left) */}
                        <div
                            className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-start transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                } ${isMobileMode ? "rounded-[30px] sm:rounded-[36px]" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <div
                                className={`w-[80%] bg-white h-full flex flex-col p-5 shadow-2xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <div className="font-serif font-bold text-xl tracking-tighter text-black">nobo.</div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        <RiCloseLine size={18} />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-3.5 py-5 text-xs font-semibold uppercase tracking-widest text-gray-800">
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer hover:text_blue transition-colors">Shop All</span>
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer hover:text_blue transition-colors">Collections</span>
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer hover:text_blue transition-colors">Celebrity Closet</span>
                                    <span onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer hover:text_blue transition-colors">Our World</span>
                                </nav>

                                <div className="mt-auto pt-4 border-t border-gray-100 space-y-2 text-[10px] text-gray-500">
                                    <p className="flex items-center gap-1.5"><RiSparklingLine size={12} className="text_blue" /> Premium Quality Essentials</p>
                                    <p>© 2026 nobo. Zerror Studios</p>
                                </div>
                            </div>
                        </div>

                        {/* Slide-over Interactive Cart Drawer (Smooth Open & Close Slide Transition) */}
                        <div
                            className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                } ${isMobileMode ? "rounded-[30px] sm:rounded-[36px]" : ""}`}
                            onClick={() => setIsCartOpen(false)}
                        >
                            <div
                                className={`w-[85%] sm:w-full sm:max-w-md bg-white h-full flex flex-col p-4 sm:p-6 shadow-2xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                    <div className="flex items-center gap-1.5">
                                        <RiShoppingBagLine size={16} className="text_blue" />
                                        <h3 className="font-semibold text-xs sm:text-base">Shopping Bag ({totalCartCount})</h3>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="p-1 hover:bg-gray-100 text-white bg_blue rounded-full"
                                    >
                                        <RiCloseLine size={16} />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto py-3 space-y-2.5 scroller_none">
                                    {cart.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <RiShoppingBagLine size={36} className="opacity-30" />
                                            <p className="text-xs">Your shopping bag is empty.</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="flex gap-2.5 p-2 bg-gray-50 rounded-lg border border-gray-100">
                                                <img src={item.imgMain} alt={item.title} className="w-12 h-16 object-cover rounded-md" />
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="text-[10px] sm:text-xs font-semibold text-gray-900">{item.title}</h4>
                                                        <button onClick={() => updateQty(item.id, -item.qty)} className="text-gray-400 hover:text-red-500">
                                                            <RiDeleteBin6Line size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="text-[10px] sm:text-xs font-bold text_blue">{item.priceFormatted}</p>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQty(item.id, -1)}
                                                            className="w-4 h-4 border rounded flex items-center justify-center text-[10px] hover:bg-gray-200"
                                                        >
                                                            <RiSubtractLine size={10} />
                                                        </button>
                                                        <span className="text-[10px] font-semibold">{item.qty}</span>
                                                        <button
                                                            onClick={() => updateQty(item.id, 1)}
                                                            className="w-4 h-4 border rounded flex items-center justify-center text-[10px] hover:bg-gray-200"
                                                        >
                                                            <RiAddLine size={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {cart.length > 0 && (
                                    <div className="pt-2.5 border-t border-gray-100 space-y-2">
                                        <div className="flex justify-between items-center text-xs font-semibold">
                                            <span>Subtotal</span>
                                            <span className="text-sm sm:text-lg text_blue">₹ {cartSubtotal.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[9px] text-gray-400">Taxes & shipping calculated at checkout.</p>
                                        <button
                                            onClick={() => {
                                                setCart([]);
                                                setCheckoutSuccess(true);
                                                setIsCartOpen(false);
                                                setTimeout(() => setCheckoutSuccess(false), 4000);
                                            }}
                                            className="w-full py-2 sm:py-3 bg_blue text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded hover:bg-blue-900 transition-colors shadow-lg"
                                        >
                                            Proceed To Checkout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Checkout Success Modal (Smooth Scale & Fade Transition) */}
                        <div
                            className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${checkoutSuccess ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                } ${isMobileMode ? "rounded-[30px] sm:rounded-[36px]" : ""}`}
                            onClick={() => setCheckoutSuccess(false)}
                        >
                            <div
                                className={`bg-white rounded-2xl p-5 sm:p-8 max-w-xs w-full text-center flex flex-col items-center gap-2.5 transition-all duration-300 ease-in-out ${checkoutSuccess ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl font-bold">
                                    <RiCheckLine size={28} />
                                </div>
                                <h3 className="text-base sm:text-xl font-bold text-gray-900">Order Placed! 🎉</h3>
                                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                                    Thank you for exploring the final interactive design interface of nobo.
                                </p>
                                <button
                                    onClick={() => setCheckoutSuccess(false)}
                                    className="px-4 py-2 bg_blue text-white text-[10px] font-semibold uppercase tracking-widest rounded-full hover:bg-blue-900 transition-colors"
                                >
                                    Back To Interface
                                </button>
                            </div>
                        </div>

                        {/* Interactive Search Overlay Modal (Smooth Scale & Fade Transition) */}
                        <div
                            className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 transition-opacity duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                                } ${isMobileMode ? "rounded-[30px] sm:rounded-[36px]" : ""}`}
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <div
                                className={`bg-white rounded-xl max-w-xs sm:max-w-md w-full p-4 shadow-2xl mt-6 sm:mt-12 transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-2.5">
                                    <h3 className="font-semibold text-xs">Search Catalog</h3>
                                    <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                                        <RiCloseLine size={16} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 focus-within:border_blue">
                                    <RiSearchLine size={14} className="text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search (e.g. Shirt, Blazer...)"
                                        className="w-full text-[11px] outline-none text-black"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <p className="text-[9px] text-gray-400 mt-2">
                                    Showing {filteredProducts.length} result(s) for "{searchQuery}"
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default FinalView;
