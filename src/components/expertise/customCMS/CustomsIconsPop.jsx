"use client";
import React, { useState } from 'react';

const data = [
    {
        id: 1,
        name: "Perplexity",
        bgImg: "https://www.todesktop.com/electron/images/wall/perplexity/background.png",
        iconsImg: "https://www.todesktop.com/electron/images/wall/perplexity/logo.png"
    },
    {
        id: 2,
        name: "Comfy",
        bgImg: "https://www.todesktop.com/electron/images/wall/comfy/background.png",
        iconsImg: "https://www.todesktop.com/electron/images/wall/comfy/logo.png"
    },
    {
        id: 3,
        name: "ClickUp",
        bgImg: "https://www.todesktop.com/electron/images/wall/click-up/background.png",
        iconsImg: "https://www.todesktop.com/electron/images/wall/click-up/logo.png"
    },
    {
        id: 4,
        name: "Moises",
        bgImg: "https://www.todesktop.com/electron/images/wall/morgen/background.png",
        iconsImg: "https://www.todesktop.com/electron/images/wall/moises/logo.png"
    },
    {
        id: 5,
        name: "Morgen",
        bgImg: "https://www.todesktop.com/electron/images/wall/letta/background.png",
        iconsImg: "https://www.todesktop.com/electron/images/wall/morgen/logo.png"
    },
];

const CustomsIconsPop = () => {
    const [activeBg, setActiveBg] = useState(data[0].bgImg);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="w-full bg-white pt-10 md:pt-20 text_blue">
            <div className="padding pb-12 md:pb-24">
                {/* Heading section styled like InfoSection */}
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>
                            Ecosystem.
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className='font-thin'>Integrated</p>
                        <p className='font-thin'>Platforms</p>
                    </div>
                    <div className="capitalize text-3xl md:pl-2">
                        <h3 data-para-effect className="leading-tight">
                            <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                            Seamlessly connect your digital world with industry-leading applications built for scale and speed.
                        </h3>
                    </div>
                </div>
            </div>

            <div className="">
                <div 
                    className="w-full  mx-auto h-[60vh] md:h-[80vh] relative  overflow-hidden flex items-end justify-center transition-all duration-700 ease-in-out bg-cover bg-center "
                    style={{ backgroundImage: `url(${activeBg})` }}
                >
                    <div className="absolute w-full h-full pointer-events-none bg-linear-to-b from-transparent from-40% to-[#002bba]  inset-0"></div>
                    {/* Dock Container */}
                    <div 
                        className="mb-6 md:mb-10 flex items-center gap-2  p-3  bg-[#002bba] backdrop-blur-2xl rounded-[1rem] border border-white/30 shadow-xl h-22"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {data.map((item, index) => {
                            // Calculate curve scale sizes
                            const baseSize = 60; // Default size (4rem)
                            let size = baseSize;
                            let translateY = 0;
                            
                            if (hoveredIndex !== null) {
                                const distance = Math.abs(hoveredIndex - index);
                                if (distance === 0) {
                                    size = 80; // Max size
                                    translateY = -16;
                                } else if (distance === 1) {
                                    size = 70; // Adjacent size
                                    translateY = -8;
                                } else if (distance === 2) {
                                    size = 60; // Next adjacent
                                    translateY = -4;
                                }
                            }

                            return (
                                <div 
                                    key={item.id}
                                    onClick={() => setActiveBg(item.bgImg)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className="relative group flex flex-col items-center z-10"
                                >
                                    {/* Tooltip */}
                                    <div className={`absolute bg-[#1a1a1a]/90 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap shadow-xl backdrop-blur-md border border-white/10 pointer-events-none z-20 ${hoveredIndex === index ? 'opacity-100 -top-16' : 'opacity-0 -top-10'}`}>
                                        {item.name}
                                    </div>
                                    
                                    {/* App Icon */}
                                    <div 
                                        className=" overflow-hidden flex items-center justify-center  transition-all duration-300 ease-out origin-bottom cursor-pointer"
                                        style={{
                                            width: `${size}px`,
                                            height: `${size}px`,
                                            transform: `translateY(${translateY}px)`
                                        }}
                                    >
                                        <img src={item.iconsImg} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    {/* Active Indicator */}
                                    <div className={`absolute -bottom-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeBg === item.bgImg ? 'bg-[#ffffff]' : 'bg-transparent'}`}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomsIconsPop;