"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';
import { useProjectForm } from "@/context/ProjectFormContext";

if (typeof window !== "undefined") {
    gsap.registerPlugin(MorphSVGPlugin);
}

const PATHS = {
    first: "M110 217.293L2.70703 110L110 2.70703L217.293 110L110 217.293Z",
    second: "M110 10L196.603 60V160L110 210L23.3975 160V60L110 10Z",
    third: "M110.141 10.1367L180.851 39.426L210.141 110.137L180.851 180.847L110.141 210.137L39.4299 180.847L10.1406 110.137L39.4299 39.426L110.141 10.1367Z",
    fourth: "M110 10L160 23.3975L196.603 60L210 110L196.603 160L160 196.603L110 210L60 196.603L23.3975 160L10 110L23.3975 60L60 23.3975L110 10Z",
    fifth: "M110 10L148.268 17.612L180.711 39.2893L202.388 71.7317L210 110L202.388 148.268L180.711 180.711L148.268 202.388L110 210L71.7317 202.388L39.2893 180.711L17.612 148.268L10 110L17.612 71.7317L39.2893 39.2893L71.7317 17.612L110 10Z",
    sixth: "M97.059 11.7037C105.649 10.5728 114.351 10.5728 122.941 11.7037V11.7037C131.531 12.8346 139.936 15.0867 147.941 18.4024V18.4024C155.946 21.7181 163.481 26.0689 170.355 31.3434V31.3434C177.229 36.6179 183.382 42.7708 188.657 49.6447V49.6447C193.931 56.5186 198.282 64.0542 201.598 72.059V72.059C204.913 80.0639 207.165 88.4688 208.296 97.0591V97.0591C209.427 105.649 209.427 114.351 208.296 122.941V122.941C207.165 131.531 204.913 139.936 201.598 147.941V147.941C198.282 155.946 193.931 163.481 188.657 170.355V170.355C183.382 177.229 177.229 183.382 170.355 188.657V188.657C163.481 193.931 155.946 198.282 147.941 201.598V201.598C139.936 204.913 131.531 207.165 122.941 208.296V208.296C114.351 209.427 105.649 209.427 97.0591 208.296V208.296C88.4688 207.165 80.0639 204.913 72.059 201.598V201.598C64.0542 198.282 56.5186 193.931 49.6447 188.657V188.657C42.7708 183.382 36.6179 177.229 31.3434 170.355V170.355C26.0689 163.481 21.7181 155.946 18.4024 147.941V147.941C15.0867 139.936 12.8346 131.531 11.7037 122.941V122.941C10.5728 114.351 10.5728 105.649 11.7037 97.059V97.059C12.8346 88.4688 15.0867 80.0639 18.4024 72.059V72.059C21.7181 64.0542 26.0689 56.5186 31.3434 49.6447V49.6447C36.6179 42.7708 42.7708 36.6179 49.6447 31.3434V31.3434C56.5186 26.0689 64.0542 21.7181 72.059 18.4024V18.4024C80.0639 15.0867 88.4688 12.8346 97.059 11.7037V11.7037Z"
};

const CHECKPOINTS = [
    { progress: 0, shapeId: '#morph-path-first', pathD: PATHS.first, rotation: 0 },
    { progress: 0.2, shapeId: '#morph-path-second', pathD: PATHS.second, rotation: 90 },
    { progress: 0.4, shapeId: '#morph-path-third', pathD: PATHS.third, rotation: 180 },
    { progress: 0.6, shapeId: '#morph-path-fourth', pathD: PATHS.fourth, rotation: 270 },
    { progress: 0.8, shapeId: '#morph-path-fifth', pathD: PATHS.fifth, rotation: 360 },
    { progress: 1.0, shapeId: '#morph-path-sixth', pathD: PATHS.sixth, rotation: 450 }
];

const TicketEffect = () => {
    const { openProjectForm } = useProjectForm();
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const svgRef = useRef(null);
    const activePathRef = useRef(null);
    const labelRef = useRef(null);
    const timelineRef = useRef(null);
    const prevProgressRef = useRef(0);
    const animStateRef = useRef({ progress: 0, x: 0 });
    const tweenRef = useRef(null);

    useEffect(() => {
        if (!activePathRef.current) return;

        // Build GSAP Morph Timeline
        const tl = gsap.timeline({ paused: true });
        tl.set(activePathRef.current, { rotation: 0 }, 0);

        for (let i = 1; i < CHECKPOINTS.length; i++) {
            const prev = CHECKPOINTS[i - 1];
            const curr = CHECKPOINTS[i];
            tl.to(activePathRef.current, {
                morphSVG: {
                    shape: curr.shapeId,
                    type: "rotational",
                    origin: "50% 50%"
                },
                rotation: curr.rotation,
                transformOrigin: "50% 50%",
                svgOrigin: "110 110",
                duration: curr.progress - prev.progress,
                ease: "linear"
            }, prev.progress);
        }

        timelineRef.current = tl;

        // Spawn trail clone
        const spawnTrail = (checkpointIdx) => {
            const cp = CHECKPOINTS[checkpointIdx];
            if (!cp || !trackRef.current) return;

            const trackWidth = trackRef.current.getBoundingClientRect().width;
            const shapeSize = 240;
            const posX = cp.progress * (trackWidth - shapeSize);

            const cloneSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            cloneSvg.setAttribute("width", "240");
            cloneSvg.setAttribute("height", "240");
            cloneSvg.setAttribute("viewBox", "0 0 220 220");
            cloneSvg.setAttribute("class", "pointer-events-none absolute top-0 z-0");
            cloneSvg.style.left = `${posX}px`;
            cloneSvg.style.transformOrigin = "50% 50%";
            cloneSvg.style.transform = `rotate(${cp.rotation}deg)`;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", cp.pathD);
            path.setAttribute("fill", "#002bba");
            path.setAttribute("fill-opacity", "0");
            path.setAttribute("stroke", "#002bba");
            path.setAttribute("stroke-width", "1");

            cloneSvg.appendChild(path);
            trackRef.current.appendChild(cloneSvg);

            gsap.to(cloneSvg, {
                opacity: 0,
                duration: 2,
                ease: "power2.out",
                onComplete: () => {
                    if (cloneSvg.parentNode) {
                        cloneSvg.parentNode.removeChild(cloneSvg);
                    }
                }
            });
        };

        const checkTrailSpawns = (prevP, currP) => {
            const isForward = currP > prevP;
            const threshold = 0.001;

            CHECKPOINTS.forEach((cp, idx) => {
                const s = cp.progress;
                if ((isForward && prevP < s + threshold && currP >= s + threshold) ||
                    (!isForward && prevP > s - threshold && currP <= s - threshold)) {
                    spawnTrail(idx);
                }
            });
        };

        const updatePosition = (progress, immediate = false) => {
            if (!trackRef.current || !svgRef.current || !labelRef.current) return;
            const trackWidth = trackRef.current.getBoundingClientRect().width;
            const shapeSize = 240;
            const targetLeftX = progress * (trackWidth - shapeSize);

            if (immediate) {
                animStateRef.current = { progress, x: targetLeftX };
                timelineRef.current?.progress(progress);
                gsap.set(svgRef.current, { x: targetLeftX });
                const labelWidth = labelRef.current.getBoundingClientRect().width || 120;
                const labelX = targetLeftX + (shapeSize / 2) - (labelWidth / 2);
                gsap.set(labelRef.current, { x: labelX });
                prevProgressRef.current = progress;
                return;
            }

            tweenRef.current?.kill();

            tweenRef.current = gsap.to(animStateRef.current, {
                progress: progress,
                x: targetLeftX,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
                onUpdate: () => {
                    const curP = animStateRef.current.progress;
                    const curX = animStateRef.current.x;

                    timelineRef.current?.progress(curP);
                    gsap.set(svgRef.current, { x: curX });

                    const labelWidth = labelRef.current ? (labelRef.current.getBoundingClientRect().width || 120) : 120;
                    const labelX = curX + (shapeSize / 2) - (labelWidth / 2);
                    gsap.set(labelRef.current, { x: labelX });

                    checkTrailSpawns(prevProgressRef.current, curP);
                    prevProgressRef.current = curP;
                }
            });
        };

        const handlePointerMove = (e) => {
            if (!trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const shapeSize = 240;
            const halfShape = shapeSize / 2;

            let clientX = e.clientX;
            if (e.touches && e.touches[0]) {
                clientX = e.touches[0].clientX;
            }

            let mouseX = clientX - rect.left;
            mouseX = Math.max(halfShape, Math.min(rect.width - halfShape, mouseX));

            const availableWidth = rect.width - shapeSize;
            const progress = availableWidth > 0 ? (mouseX - halfShape) / availableWidth : 0;
            const clampedP = Math.max(0, Math.min(1, progress));

            updatePosition(clampedP);
        };

        // Initial setup position at progress = 0 (far left)
        updatePosition(0, true);

        const containerEl = containerRef.current;
        if (containerEl) {
            containerEl.addEventListener("mousemove", handlePointerMove);
            containerEl.addEventListener("touchmove", handlePointerMove, { passive: true });
        }

        return () => {
            if (containerEl) {
                containerEl.removeEventListener("mousemove", handlePointerMove);
                containerEl.removeEventListener("touchmove", handlePointerMove);
            }
            tweenRef.current?.kill();
            timelineRef.current?.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full relative overflow-hidden bg-white py-20 md:py-28 select-none">
            {/* Hidden Target Paths for MorphSVG */}
            <svg style={{ display: 'none', position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <path id="morph-path-first" d={PATHS.first} />
                    <path id="morph-path-second" d={PATHS.second} />
                    <path id="morph-path-third" d={PATHS.third} />
                    <path id="morph-path-fourth" d={PATHS.fourth} />
                    <path id="morph-path-fifth" d={PATHS.fifth} />
                    <path id="morph-path-sixth" d={PATHS.sixth} />
                </defs>
            </svg>

            {/* Text Header */}
            <div className="w-full center text_blue text-center space-y-6 pointer-events-none relative z-10 flex-col px-4">
                <p data-para-effect className='text-4xl md:text-8xl primary-font leading-none'>
                    Ready to build <br />
                    something with<br /> <span className='primary-font_italic'> zero errors? </span>
                </p>

                <p className='leading-tight max-w-md text-sm md:text-base'>
                    Treat it like a first date. We’ll get to know each other better, with no obligations. No worries, the check is on us
                </p>
            </div>

            {/* Track & Morph SVG Interactive Section */}
            <div className="w-full relative mt-16 h-64 padding">
                {/* Horizontal Dashed Line */}
                <div className="absolute w-screen inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 border-t-2  border-dashed border-[#002bba70]">
                </div>
                <div ref={trackRef} className="track relative h-64 w-full flex items-center cursor-pointer" onClick={openProjectForm}>

                    {/* Active Morphing SVG */}
                    <svg
                        ref={svgRef}
                        className="absolute top-0 left-0 w-64 h-64 pointer-events-none z-10"
                        viewBox="0 0 220 220"
                    >
                        <path
                            ref={activePathRef}
                            d={PATHS.first}
                            fill="#002bba"
                            fillOpacity="1"
                            stroke="#002bba"
                            strokeWidth="0"
                        />
                    </svg>

                    {/* Floating Tracking Label */}
                    <div
                        ref={labelRef}
                        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer flex items-center justify-center text-white  whitespace-nowrap"
                        onClick={openProjectForm}
                    >
                        [ Start a project]
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TicketEffect;




