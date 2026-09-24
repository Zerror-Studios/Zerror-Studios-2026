"use client";
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const defaultImages = [
    { img: "/images/expertisePage/website-development/webdev_swiper/img1.svg" },
    { img: "/images/expertisePage/website-development/webdev_swiper/img2.svg" },
    { img: "/images/expertisePage/website-development/webdev_swiper/img3.svg" },
    { img: "/images/expertisePage/website-development/webdev_swiper/img4.svg" },
];

const WebDevProjectsSwiper = ({
    images = defaultImages,
    heading = <>Design Your <br /> Business Now</>
}) => {
    const containerRef = useRef(null);
    const marqueeTrackRef = useRef(null);
    const dragBtnRef = useRef(null);
    const slidesRef = useRef([]);

    const imageList = images && images.length > 0 ? images : defaultImages;

    const repeatCount = Math.max(5, Math.ceil(15 / imageList.length));
    const displaySlides = Array.from({ length: repeatCount }).flatMap(() => imageList);

    useEffect(() => {
        const container = containerRef.current;
        const track = marqueeTrackRef.current;
        const dragBtn = dragBtnRef.current;
        if (!container || !track) return;

        let scrollX = 0;
        let targetScrollX = 0;
        let isDragging = false;
        let startX = 0;
        let dragStartScroll = 0;
        let velocity = 0;
        let lastX = 0;
        let animationFrameId;

        const baseMarqueeSpeed = 1.2; // Speed of continuous marquee autoscroll

        // Floating DRAG Cursor follower - smoothly hides when outside container bounds
        const handleMouseMove = (e) => {
            if (!dragBtn || !container) return;

            const rect = container.getBoundingClientRect();
            const isInside = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );

            if (!isInside) {
                gsap.to(dragBtn, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.out" });
                return;
            }

            gsap.to(dragBtn, {
                x: e.clientX - 45,
                y: e.clientY - 35,
                opacity: 1,
                scale: isDragging ? 1.25 : 1,
                duration: 1,
                ease: "power3.out",
            });
        };

        const handleMouseLeave = () => {
            if (!dragBtn) return;
            gsap.to(dragBtn, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.out" });
        };

        // Pointer Drag Handlers with setPointerCapture to guarantee fluid dragging
        const handlePointerDown = (e) => {
            // Prevent native browser image drag / text selection
            e.preventDefault();

            isDragging = true;
            startX = e.clientX;
            dragStartScroll = scrollX;
            lastX = startX;
            velocity = 0;

            try {
                track.setPointerCapture(e.pointerId);
            } catch (err) { }

            if (dragBtn) {
                gsap.to(dragBtn, {
                    scale: 1.25,
                    duration: 0.3,
                    ease: "back.out(1.8)"
                });
            }
        };

        const handlePointerMove = (e) => {
            handleMouseMove(e);

            if (!isDragging) return;

            const currentX = e.clientX;
            const delta = currentX - startX;
            scrollX = dragStartScroll - delta * 1.2;
            velocity = (lastX - currentX) * 0.8;
            lastX = currentX;
        };

        const handlePointerUp = (e) => {
            if (!isDragging) return;
            isDragging = false;

            try {
                if (track.hasPointerCapture(e.pointerId)) {
                    track.releasePointerCapture(e.pointerId);
                }
            } catch (err) { }

            if (dragBtn) {
                gsap.to(dragBtn, {
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out"
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        track.addEventListener("pointerdown", handlePointerDown);
        track.addEventListener("pointermove", handlePointerMove);
        track.addEventListener("pointerup", handlePointerUp);
        track.addEventListener("pointercancel", handlePointerUp);

        // Frame Render Engine
        const render = () => {
            const containerWidth = container.clientWidth;
            const firstSlide = slidesRef.current[0];
            const slideWidth = firstSlide ? firstSlide.offsetWidth : containerWidth * 0.5;
            const singleSetWidth = slideWidth * imageList.length;

            if (!isDragging) {
                // Apply momentum friction decay or base marquee movement
                if (Math.abs(velocity) > 0.1) {
                    scrollX += velocity;
                    velocity *= 0.92;
                } else {
                    velocity = 0;
                    scrollX += baseMarqueeSpeed;
                }
            }

            // Safe modulo wrap math (prevents infinite loop thread locks)
            const wrappedX = singleSetWidth > 0 ? ((scrollX % singleSetWidth) + singleSetWidth) % singleSetWidth : 0;

            // Apply horizontal transform to marquee track
            gsap.set(track, { x: -wrappedX });

            // Calculate dynamic scale, brightness, translateY, and z-index for each slide
            const containerCenter = containerWidth / 2;

            slidesRef.current.forEach((slideEl) => {
                if (!slideEl) return;
                const rect = slideEl.getBoundingClientRect();
                const slideCenter = rect.left + rect.width / 2;
                const distFromCenter = Math.abs(slideCenter - containerCenter);
                const maxDist = containerWidth * 0.45;

                const normDist = Math.min(1, distFromCenter / maxDist);
                const scale = 1 - normDist * 0.18; // 1.0 down to 0.82
                const brightness = 100 - normDist * 52; // 100% down to 48%
                const translateY = normDist * 5; // 0% down to 5%
                const zIndex = Math.round((1 - normDist) * 10);

                gsap.set(slideEl, {
                    scale: scale,
                    yPercent: translateY,
                    filter: `brightness(${brightness}%)`,
                    zIndex: zIndex,
                    transformOrigin: "center center",
                });
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            track.removeEventListener("pointerdown", handlePointerDown);
            track.removeEventListener("pointermove", handlePointerMove);
            track.removeEventListener("pointerup", handlePointerUp);
            track.removeEventListener("pointercancel", handlePointerUp);
            cancelAnimationFrame(animationFrameId);
        };
    }, [imageList.length]);

    const handleMouseLeaveContainer = () => {
        if (!dragBtnRef.current) return;
        gsap.to(dragBtnRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
        });
    };

    return (
        <div
            onMouseLeave={handleMouseLeaveContainer}
            ref={containerRef} className="w-full  py-8 md:py-16 space-y-16 relative overflow-hidden select-none">
            {/* Background Graphic */}
            <div className="absolute w-full h-full inset-0 pointer-events-none">
                <Image src="/images/expertisePage/website-development/swiper_bg.png" alt="Swiper bg Graphic" fill className="cover" />
            </div>

            {/* Section Heading */}
            <div>
                <h2 data-para-effect className="text-3xl md:text-5xl text-center text-white primary-font leading-tight relative z-10">
                    {heading}
                </h2>
            </div>

            {/* Floating DRAG Cursor & Marquee Container */}
            <div className="py-0 relative">
                <div
                    ref={dragBtnRef}
                    className="drag_btn fixed top-0 left-0 pointer-events-none text-sm rounded-lg z-50  opacity-0 text-white overflow-hidden bg-white-20 backdrop-blur-xs"
                >
                    <div className="px-3.5 py-1.5 ">
                        DRAG
                    </div>
                </div>

                {/* Infinite Draggable Marquee Track */}
                <div
                    ref={marqueeTrackRef}
                    className="flex cursor-grab active:cursor-grabbing touch-pan-y"
                    style={{ willChange: "transform" }}
                >
                    {displaySlides.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => (slidesRef.current[i] = el)}
                            className="shrink-0 w-[90vw] md:w-[50vw] aspect-video"
                        >
                            <div className="w-full h-full relative rounded-xl overflow-hidden ">
                                <Image
                                    fill
                                    src={typeof item === 'string' ? item : item.img || item.src}
                                    alt={`Slide ${i + 1}`}
                                    className="cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebDevProjectsSwiper;