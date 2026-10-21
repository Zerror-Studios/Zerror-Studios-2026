"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';

// Goes back one page; falls back to home when the deck was opened directly
const BackButton = () => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const goBack = () => {
        if (window.history.length > 1) router.back();
        else router.push('/');
    };

    return (
        <button
            type="button"
            onClick={goBack}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Go back"
            className="fixed top-4 left-4 md:top-10 md:left-12 z-[999] group overflow-hidden flex items-center gap-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md border-2 border-[#002bba] bg-white text-[#002bba] hover:text-white transition-colors duration-500 secondary-font uppercase text-xs md:text-sm cursor-pointer"
        >
            <PixelGridCanvas
                isActive={isHovered}
                boxSize={12}
                color="#002bba"
                duration={0.6}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />
            <RiArrowLeftLine size={18} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span className="relative z-10 translate-y-[.05rem]">Back</span>
        </button>
    );
};

export default BackButton;
