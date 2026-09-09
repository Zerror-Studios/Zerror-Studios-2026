"use client";
import React, { useState, useEffect } from 'react';
import {
    RiFolder3Fill, RiReactjsLine, RiCss3Line, RiFileList3Line,
    RiArrowRightSLine, RiArrowDownSLine, RiPlayFill, RiSettings4Line,
    RiSearchLine, RiBugLine, RiGitMergeLine, RiCloseLine,
    RiInstanceLine,
    RiMacLine
} from '@remixicon/react';

const codeSnippets = {
    jsx: `import React from 'react';\nimport './Hero.css';\n\nexport const Hero = () => {\n  return (\n    <div className="hero-container">\n      <h1 className="hero-title">\n        The New <br /> Standard.\n      </h1>\n      <p className="hero-subtitle">\n        Elevate your everyday wardrobe.\n      </p>\n      <button className="shop-btn">Shop Now</button>\n      <div className="slider-wrapper">\n         <img src="hero_1.jpg" alt="Hero" />\n      </div>\n    </div>\n  );\n};\n`,
    css: `.hero-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 4rem 2rem;\n}\n\n.hero-title {\n  font-size: 3rem;\n  font-family: serif;\n  color: #000;\n}\n\n.shop-btn {\n  background: #000;\n  color: #fff;\n  padding: 1rem 2rem;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  transition: all 0.3s;\n}\n`
};

const VsCode = () => {
    const [activeTab, setActiveTab] = useState('jsx');
    const [displayedCode, setDisplayedCode] = useState('');
    const [animationPhase, setAnimationPhase] = useState('typing_jsx'); // typing_jsx -> typing_css -> building -> preview -> reset
    const [heroIndex, setHeroIndex] = useState(0);

    const heroImages = [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
    ];

    // Animation Loop Controller
    useEffect(() => {
        let timer;
        let charIndex = 0;
        
        const typeCode = (code, nextPhase, speed = 20) => {
            setDisplayedCode('');
            charIndex = 0;
            
            timer = setInterval(() => {
                if (charIndex <= code.length) {
                    setDisplayedCode(code.slice(0, charIndex));
                    charIndex++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => setAnimationPhase(nextPhase), 1000);
                }
            }, speed);
        };

        if (animationPhase === 'typing_jsx') {
            setActiveTab('jsx');
            typeCode(codeSnippets.jsx, 'typing_css', 30);
        } 
        else if (animationPhase === 'typing_css') {
            setActiveTab('css');
            typeCode(codeSnippets.css, 'building', 30);
        }
        else if (animationPhase === 'building') {
            // Fake build time
            timer = setTimeout(() => {
                setAnimationPhase('preview');
            }, 1500);
        }
        else if (animationPhase === 'preview') {
            // Stay on preview for a while, then reset
            timer = setTimeout(() => {
                setAnimationPhase('resetting');
                setTimeout(() => setAnimationPhase('typing_jsx'), 500);
            }, 6000);
        }

        return () => {
            clearInterval(timer);
            clearTimeout(timer);
        };
    }, [animationPhase]);

    // Independent Hero Slider for Preview
    useEffect(() => {
        let sliderTimer;
        if (animationPhase === 'preview') {
            sliderTimer = setInterval(() => {
                setHeroIndex(prev => (prev + 1) % heroImages.length);
            }, 2500);
        } else {
            setHeroIndex(0);
        }
        return () => clearInterval(sliderTimer);
    }, [animationPhase]);

    const renderSyntaxHighlighted = (code) => {
        // Very basic syntax highlighting for demo purposes
        const lines = code.split('\n');
        return lines.map((line, i) => {
            // 1. Escape HTML entities
            let formattedLine = line
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            
            // 2. Highlight Strings first so they don't mess up later span tags
            formattedLine = formattedLine.replace(/('.*?'|".*?")/g, match => `<span class="text-[#98C379]">${match}</span>`);
            
            // 3. Highlight Keywords (using word boundaries to prevent partial matches)
            formattedLine = formattedLine
                .replace(/\b(import|from|export|const|return|let|var)\b/g, match => `<span class="text-[#C678DD]">${match}</span>`)
                .replace(/\b(className|src|alt|display|flex|flex-direction|align-items|text-align|padding|font-size|font-family|color|background|transition)\b/g, match => `<span class="text-[#D19A66]">${match}</span>`)
                .replace(/\b(React|Hero)\b/g, match => `<span class="text-[#E5C07B]">${match}</span>`);
            
            const isLastLine = i === lines.length - 1;
            
            return (
                <div key={i} className="flex font-mono text-[11px] md:text-sm leading-relaxed whitespace-pre text-[#ABB2BF]">
                    <span className="w-8 text-right pr-4 text-[#4B5263] select-none">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: formattedLine || '' }} />
                    {isLastLine && animationPhase.startsWith('typing') && (
                        <span className="inline-block w-1 h-4 bg-[#528BFF] animate-pulse ml-[1px] align-middle translate-y-0.5"></span>
                    )}
                </div>
            );
        });
    };

    return (
        <section className="w-full padding py-12 md:py-24 flex justify-center">
            {/* Main IDE Container */}
            <div className="w-[95%] xl:w-[85%] rounded-md overflow-hidden border border-black/20  bg-[#1E1E1E] text-[#ABB2BF] font-sans flex flex-col h-[700px]">
                
                {/* Window Controls (Mac style) */}
                <div className="h-10 bg-[#21252B] flex items-center justify-between px-4 border-b border-[#181A1F]">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="text-xs text-[#858b98] font-medium tracking-wide">
                        {animationPhase === 'building' ? 'Compiling...' : 'nobo-project — App'}
                    </div>
                    <div className="flex gap-4 text-[#858b98]">
                        <RiPlayFill size={16} className={animationPhase === 'building' ? 'text-[#98C379] animate-pulse' : ''}/>
                        <RiSettings4Line size={16} />
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Activity Bar */}
                    <div className="w-12 bg-[#282C34] flex flex-col items-center py-4 gap-6 border-r border-[#181A1F]">
                        <RiFileList3Line size={24} className="text-white cursor-pointer" />
                        <RiSearchLine size={24} className="text-[#4B5263] cursor-pointer hover:text-white transition-colors" />
                        <RiGitMergeLine size={24} className="text-[#4B5263] cursor-pointer hover:text-white transition-colors" />
                        <RiBugLine size={24} className="text-[#4B5263] cursor-pointer hover:text-white transition-colors" />
                        <RiMacLine size={24} className="text-[#4B5263] cursor-pointer hover:text-white transition-colors" />
                        <RiInstanceLine size={24} className="text-[#4B5263] cursor-pointer hover:text-white transition-colors" />
                    </div>

                    {/* Sidebar / Explorer */}
                    <div className="w-56 bg-[#21252B] border-r border-[#181A1F] flex flex-col select-none hidden lg:flex">
                        <div className="px-4 py-3 text-xs font-bold tracking-widest text-[#858b98]">EXPLORER</div>
                        <div className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
                            <div className="flex flex-col text-[13px] text-[#858b98]">
                                {/* Root Folders */}
                                <div className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded">
                                    <RiArrowRightSLine size={14}/> <RiFolder3Fill size={14} className="text-[#858b98]"/> .next
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded">
                                    <RiArrowRightSLine size={14}/> <RiFolder3Fill size={14} className="text-[#858b98]"/> node_modules
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded">
                                    <RiArrowRightSLine size={14}/> <RiFolder3Fill size={14} className="text-[#98C379]"/> public
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded text-white">
                                    <RiArrowDownSLine size={14}/> <RiFolder3Fill size={14} className="text-[#E5C07B]"/> src
                                </div>
                                
                                {/* Inside src */}
                                <div className="flex flex-col ml-6 border-l border-[#2C313C] pl-1 relative">
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded text-white">
                                        <RiArrowDownSLine size={14} className="absolute -left-[9px] bg-[#21252B]"/> <RiFolder3Fill size={14} className="text-[#61AFEF]"/> components
                                    </div>
                                    <div className="flex flex-col ml-6 border-l border-[#2C313C] pl-1 relative">
                                        <div className={`flex items-center gap-2 px-2 py-0.5 cursor-pointer rounded ${activeTab === 'jsx' ? 'bg-[#2C313C] text-white' : 'hover:bg-[#2C313C]'}`}>
                                            <RiReactjsLine size={14} className="text-[#61DAFB]"/> Hero.jsx
                                        </div>
                                        <div className={`flex items-center gap-2 px-2 py-0.5 cursor-pointer rounded ${activeTab === 'css' ? 'bg-[#2C313C] text-white' : 'hover:bg-[#2C313C]'}`}>
                                            <RiCss3Line size={14} className="text-[#56B6C2]"/> Hero.css
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Root Files */}
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#ABB2BF]"/> .env.local
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiGitMergeLine size={14} className="text-[#F14E32]"/> .gitignore
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#CB3837]"/> .npmrc
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#4B32C3]"/> eslint.config.mjs
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <span className="text-[#F5A623] font-bold text-[10px] w-3.5 text-center">{`{}`}</span> jsconfig.json
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <span className="text-[#3178C6] font-bold text-[10px] w-3.5 text-center">TS</span> next-env.d.ts
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#ABB2BF]"/> next.config.mjs
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#27C93F]"/> package-lock.json
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#27C93F]"/> package.json
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#FF5F56]"/> postcss.config.mjs
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiFileList3Line size={14} className="text-[#61AFEF]"/> README.md
                                </div>
                                <div className="flex items-center gap-2 px-2 py-0.5 cursor-pointer hover:bg-[#2C313C] rounded ml-[22px]">
                                    <RiSettings4Line size={14} className="text-[#38B2AC]"/> tailwind.config.js
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="flex-1 flex flex-col bg-[#282C34] relative">
                        {/* Editor Tabs */}
                        <div className="flex bg-[#21252B] overflow-x-auto custom-scrollbar">
                            <div className={`flex items-center gap-2 px-4 py-2 border-r border-[#181A1F] cursor-pointer min-w-max ${activeTab === 'jsx' ? 'bg-[#282C34] border-t-2 border-t-[#61AFEF]' : 'bg-[#21252B] text-[#858b98]'}`}>
                                <RiReactjsLine size={14} className="text-[#61DAFB]"/> Hero.jsx <RiCloseLine size={14} className="ml-2 hover:bg-[#3E4451] rounded"/>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 border-r border-[#181A1F] cursor-pointer min-w-max ${activeTab === 'css' ? 'bg-[#282C34] border-t-2 border-t-[#56B6C2]' : 'bg-[#21252B] text-[#858b98]'}`}>
                                <RiCss3Line size={14} className="text-[#56B6C2]"/> Hero.css <RiCloseLine size={14} className="ml-2 hover:bg-[#3E4451] rounded"/>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                            {renderSyntaxHighlighted(displayedCode)}
                        </div>

                        {/* Build Overlay */}
                        {(animationPhase === 'building' || animationPhase === 'resetting') && (
                            <div className="absolute inset-0 bg-[#282C34]/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                                <RiPlayFill size={48} className="text-[#98C379] animate-bounce" />
                                <p className="mt-4 text-[#98C379] font-mono tracking-widest uppercase">Building...</p>
                            </div>
                        )}
                    </div>

                    {/* Live Preview Area (Right Side) */}
                    <div className="w-96 bg-[#181A1F] border-l border-[#181A1F] flex flex-col items-center justify-center p-6 relative hidden md:flex">
                        <div className="text-xs font-mono text-[#4B5263] absolute top-4 right-4">
                            Live Preview : 3000
                        </div>
                        
                        {/* iPhone Mockup */}
                        <div className="w-[280px] h-[580px] bg-black rounded-[40px] shadow-2xl border-4 border-[#3E4451] relative overflow-hidden flex flex-col">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                            
                            {/* Inner Screen Content */}
                            <div className="flex-1 bg-black relative w-full h-full">
                                {animationPhase === 'preview' ? (
                                    <div className="w-full h-full flex flex-col pt-5 animate-[fadeIn_0.5s_ease-out]">
                                        {/* Status Bar Fake */}
                                        <div className="h-10 bg-black text-white text-[8px] flex items-center justify-center font-semibold tracking-widest uppercase relative z-10">
                                            Free Shipping on all orders
                                        </div>
                                        
                                        {/* Mobile Hero (Vertical Split) matching FigmaApprovedDesign */}
                                        <div className="flex flex-col w-full h-full">
                                            {/* Top Content */}
                                            <div className="w-full flex flex-col justify-center px-6 py-6 text-center bg-white z-10">
                                                <h1 className="text-4xl font-serif leading-[1.1] mb-3 text-black">
                                                    The New <br /> Standard.
                                                </h1>
                                                <p className="text-gray-500 text-[10px] leading-relaxed mb-4 px-2">
                                                    Elevate your everyday wardrobe with our latest collection of premium essentials.
                                                </p>
                                                <button className="w-full py-2.5 bg-black text-white text-[10px] font-semibold uppercase tracking-widest">
                                                    Shop Now
                                                </button>
                                            </div>
                                            {/* Bottom Image Slider */}
                                            <div className="flex-1 bg-[#F5F5F5] relative overflow-hidden">
                                                {heroImages.map((img, i) => (
                                                    <img 
                                                        key={i}
                                                        src={img} 
                                                        alt="Preview Slider" 
                                                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                                                        style={{ opacity: i === heroIndex ? 1 : 0 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E]">
                                        <RiReactjsLine size={48} className="text-[#4B5263] animate-spin-slow" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Status Bar */}
                <div className="h-6 bg-[#21252B] border-t border-[#181A1F] flex items-center justify-between px-4 text-[10px] text-[#858b98] font-mono">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:bg-[#2C313C] px-1 rounded cursor-pointer"><RiGitMergeLine size={12}/> main*</span>
                        <span className="flex items-center gap-1 hover:bg-[#2C313C] px-1 rounded cursor-pointer"><RiCloseLine size={12}/> 0 <RiBugLine size={12} className="ml-1"/> 0</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Ln {displayedCode.split('\\n').length}, Col {displayedCode.length - displayedCode.lastIndexOf('\\n')}</span>
                        <span>Spaces: 2</span>
                        <span>UTF-8</span>
                        <span>{activeTab === 'jsx' ? 'JavaScript React' : 'CSS'}</span>
                        <span className="flex items-center gap-1 text-[#0ACF83] animate-pulse"><RiPlayFill size={12}/> Prettier</span>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default VsCode;
