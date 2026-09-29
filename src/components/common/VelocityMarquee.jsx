"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function VelocityMarquee({ children, baseSpeed = 20 }) {
    const marqueeRef = useRef(null);

    useGSAP(() => {
        let direction = -1; // Default direction
        const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
        
        tl.fromTo(marqueeRef.current, 
            { xPercent: 0 }, 
            { xPercent: -50, duration: baseSpeed, force3D: true }
        );

        let timeoutId;

        ScrollTrigger.create({
            trigger: document.documentElement,
            start: 0,
            end: "max",
            onUpdate: (self) => {
                direction = self.direction === 1 ? 1 : -1;
                
                const velocity = Math.abs(self.getVelocity());
                const speedMultiplier = 1 + (velocity / 200); 
                
                gsap.to(tl, {
                    timeScale: direction * speedMultiplier,
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: true
                });

                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    gsap.to(tl, {
                        timeScale: direction,
                        duration: 0.7,
                        ease: "power2.out",
                        overwrite: true
                    });
                }, 50);
            }
        });

    }, { dependencies: [baseSpeed] });

    return (
        <div className="w-full overflow-hidden flex">
            <div ref={marqueeRef} className="flex shrink-0 w-max items-center will-change-transform">
                {/* First Set */}
                <div className="flex shrink-0 w-max items-center">
                    {children}
                </div>
                {/* Second Set (Duplicate for seamless loop) */}
                <div className="flex shrink-0 w-max items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
