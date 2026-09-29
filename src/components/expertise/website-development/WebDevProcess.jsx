"use client";
import React, { useState, useEffect } from 'react';
import Calendar from './processSections/Calendar';
import MobileCalendar from './processSections/MobileCalendar';
import { useGSAP } from '@gsap/react';

const WebDevProcess = () => {
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1020);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div data-hide-header className="w-full relative">

            {/* Section Header */}
            <div className="w-full border-t mt-8 md:mt-16 padding pt-8! md:pt-16! text_blue">
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div>
                        <h2 data-para-effect className="capitalize primary-font text-5xl leading-none">
                            our <br /> Process
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className="font-thin">From wireframes to</p>
                        <p className="font-thin">high-performance code.</p>
                    </div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
                            Our process blends strategic design with robust engineering. We don't just write code — we build scalable, high-performing digital experiences that drive your business forward.
                        </h3>
                    </div>
                </div>
            </div>

            {/* Process Calendar */}
            {isMobile === true && <MobileCalendar />}
            {isMobile === false && <Calendar />}
        </div>
    );
};

export default WebDevProcess;