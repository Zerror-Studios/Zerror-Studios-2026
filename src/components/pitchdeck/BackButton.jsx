"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { RiCloseLine } from '@remixicon/react';

// Closes the deck by going back one page; falls back to home when the deck was opened directly
const BackButton = () => {
    const router = useRouter();

    const goBack = () => {
        if (window.history.length > 1) router.back();
        else router.push('/');
    };

    return (
        <button
            type="button"
            onClick={goBack}
            aria-label="Close"
            className="fixed top-4 left-4 md:left-1/2 md:-translate-x-1/2 z-[999] group size-10 md:size-12 rounded-md center bg-white/10 backdrop-blur-md border border-white/40 text-white shadow-sm hover:bg-white hover:text-[#002bba] max-sm:text-[#002bba] max-sm:border-[#002bba] transition-[background-color,transform] duration-300 active:scale-95 cursor-pointer"
        >
            <RiCloseLine size={22} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>
    );
};

export default BackButton;
