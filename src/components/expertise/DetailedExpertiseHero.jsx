"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image'
import gsap from 'gsap'
import SplitText from 'gsap/dist/SplitText'
import Flip from 'gsap/dist/Flip'
import { useGSAP } from '@gsap/react'
import Matter from 'matter-js';
import { clientsData } from './ClientsMarquee';
import VelocityMarquee from '../common/VelocityMarquee';
import BackgroundSnake from '../animation/BackgroundSnake';
import PixelGridCanvas from '../common/PixelGridCanvas';

const DetailedExpertiseHero = ({
    expertiseName,
    expertiseHeading,
    btnsLabels = [],
    introHeading,
    introText,
    videoSrc,
    supportingText,
    features = [],
    heroIcons = {},
}) => {
    const [activeHoverLabel, setActiveHoverLabel] = useState(null);
    const heroContainerRef = useRef(null);
    const buttonRefs = useRef({});
    const iconRefs = useRef({});

    const engineRef = useRef(null);
    const activeBodiesRef = useRef([]);
    const marqueeContainerRef = useRef(null);
    const floorRef = useRef(null);

    // Initialize GSAP typography split text
    useGSAP(() => {
        const heading_split = SplitText.create(".heading_split", {
            type: "lines",
            linesClass: "split-line"
        });
        const paragraph_split = SplitText.create(".paragraph_split", {
            type: "lines",
            linesClass: "split-line"
        });

        [...heading_split.lines, ...paragraph_split.lines].forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("line-wrapper");
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set([heading_split.lines, paragraph_split.lines], { yPercent: 100, x: 10 });

        const tl = gsap.timeline({ delay: 0.5 });
        tl.to(".content_box", { opacity: 1, duration: 0.01 });
        tl.to(heading_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<");
        tl.to(paragraph_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<+0.2");
        tl.to([".blink_btn"], {
            opacity: 1,
            stagger: 0.15
        }, "<");
    });

    // Setup Matter.js Physics Engine and Floor / Wall boundaries
    useEffect(() => {
        if (!heroContainerRef.current) return;

        const container = heroContainerRef.current;
        let containerRect = container.getBoundingClientRect();
        let width = containerRect.width;
        let height = containerRect.height;

        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1.4, scale: 0.001 }
        });
        engineRef.current = engine;

        // Create static floor centered at (height + 25) so its top surface sits precisely at heroContainerRef bottom edge
        let floor = Matter.Bodies.rectangle(width / 2, height + 25, width * 3, 50, {
            isStatic: true,
            friction: 0.7,
            restitution: 0.55
        });
        floorRef.current = floor;

        let leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height * 3, { isStatic: true });
        let rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height * 3, { isStatic: true });

        Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

        let animationFrameId;
        let lastTime = performance.now();

        const updatePhysics = (now) => {
            const delta = Math.min(now - lastTime, 33);
            lastTime = now;

            Matter.Engine.update(engine, delta);

            const activeList = activeBodiesRef.current;
            for (let i = activeList.length - 1; i >= 0; i--) {
                const item = activeList[i];
                const age = (now - item.spawnTime) / 1000;

                if (age > 2.5) {
                    Matter.Composite.remove(engine.world, item.body);
                    gsap.set(item.iconEl, { opacity: 0 });
                    activeList.splice(i, 1);
                } else {
                    let opacity = 1;
                    if (age > 1.7) {
                        opacity = Math.max(0, 1 - (age - 1.7) / 0.8);
                    }

                    const { x, y } = item.body.position;
                    const angle = item.body.angle;

                    const offsetX = x - item.baseX;
                    const offsetY = y - item.baseY;

                    gsap.set(item.iconEl, {
                        x: offsetX,
                        y: offsetY,
                        rotation: angle * (180 / Math.PI),
                        opacity: opacity,
                        scale: Math.min(1, age * 4) // fast scale-in on pop
                    });
                }
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        animationFrameId = requestAnimationFrame(updatePhysics);

        const handleResize = () => {
            if (!container) return;
            containerRect = container.getBoundingClientRect();
            width = containerRect.width;
            height = containerRect.height;

            Matter.Body.setPosition(floor, { x: width / 2, y: height + 25 });
            Matter.Body.setPosition(rightWall, { x: width + 25, y: height / 2 });
            Matter.Body.setPosition(leftWall, { x: -25, y: height / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            Matter.Engine.clear(engine);
        };
    }, []);

    // Handle button hover: pop icons out with Matter.js impulse
    const handleButtonHover = (item) => {
        setActiveHoverLabel(item);

        if (!item || !heroIcons[item] || !heroContainerRef.current || !engineRef.current) return;

        const btnEl = buttonRefs.current[item];
        if (!btnEl) return;

        const containerRect = heroContainerRef.current.getBoundingClientRect();
        const btnRect = btnEl.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2 - containerRect.left;
        const btnCenterY = btnRect.top + btnRect.height / 2 - containerRect.top;

        const icons = heroIcons[item];

        icons.forEach((icon, idx) => {
            const iconKey = `${item}-${idx}`;
            const iconEl = iconRefs.current[iconKey];
            if (!iconEl) return;

            // Reset any previous GSAP transforms
            gsap.killTweensOf(iconEl);
            gsap.set(iconEl, { x: 0, y: 0, opacity: 0, scale: 0 });

            const iconRect = iconEl.getBoundingClientRect();
            const baseX = iconRect.left + iconRect.width / 2 - containerRect.left;
            const baseY = iconRect.top + iconRect.height / 2 - containerRect.top;

            const radius = Math.max(20, Math.min(iconRect.width, iconRect.height) / 2 || 35);

            // Create Matter dynamic body at button center
            const body = Matter.Bodies.circle(btnCenterX, btnCenterY, radius, {
                restitution: 0.65, // bounce on floor
                friction: 0.15,
                frictionAir: 0.015,
                density: 0.002
            });

            // Calculate pop direction: upward velocity + horizontal spread
            const spread = (idx - (icons.length - 1) / 2) * 5;
            const vx = (Math.random() - 0.5) * 6 + spread;
            const vy = -(9 + Math.random() * 5);
            const vSpin = (Math.random() - 0.5) * 0.25;

            Matter.Body.setVelocity(body, { x: vx, y: vy });
            Matter.Body.setAngularVelocity(body, vSpin);

            Matter.Composite.add(engineRef.current.world, body);

            activeBodiesRef.current.push({
                body,
                iconEl,
                baseX,
                baseY,
                spawnTime: performance.now()
            });
        });
    };

    useGSAP(() => {
        if (window.innerWidth < 750) return;

        gsap.registerPlugin(Flip);

        Flip.fit(".det_vid", ".det_vid_target", {
            scale: false,
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: ".cont_pren_s",
                start: "top top",
                end: () => `bottom ${document.querySelector('.det_vid_sticky')?.offsetHeight || 0}px`,
                scrub: true,
                invalidateOnRefresh: true
            }
        });
    })

    return (
        <div className=' content_box opacity-0 relative '>

            <div ref={heroContainerRef} className=" padding w-full h-[65vh] md:h-[80vh] flex flex-col justify-between relative overflow-hidden">
                <BackgroundSnake />
                {/* Background Pop-up Icons on Button Hover */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {Object.entries(heroIcons).map(([label, icons]) => {
                        return icons.map((icon, idx) => {
                            const iconKey = `${label}-${idx}`;
                            return (
                                <div
                                    key={iconKey}
                                    ref={(el) => (iconRefs.current[iconKey] = el)}
                                    className={`absolute opacity-0 pointer-events-none w-12 md:w-20`}
                                    style={{
                                        top: icon.top,
                                        bottom: icon.bottom,
                                        left: icon.left,
                                        right: icon.right,
                                    }}
                                >
                                    <img
                                        src={icon.src}
                                        alt="Expertise icon"
                                        className=""
                                    />
                                </div>
                            );
                        });
                    })}
                </div>

                <div className=" w-full h-full flex flex-col items-center justify-center text_blue gap-y-5 text-center relative z-10">
                    <p className='paragraph_split uppercase text-xs'>[ {expertiseName} ] </p>
                    <h1 className='heading_split text-5xl md:text-8xl primary-font '>{expertiseHeading}</h1>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {btnsLabels.map((item, i) => (
                            <button
                                key={i}
                                ref={(el) => (buttonRefs.current[item] = el)}
                                onMouseEnter={() => handleButtonHover(item)}
                                onMouseLeave={() => setActiveHoverLabel(null)}
                                className="blink_btn group relative overflow-hidden text-xs uppercase px-4 py-2 border-[#002bba15] border bg-[#002bba10] leading-none transition-colors duration-300 rounded-sm cursor-pointer text-[#002bba] hover:text-white"
                            >
                                <PixelGridCanvas
                                    isActive={activeHoverLabel === item}
                                    boxSize={12}
                                    color="#002bba"
                                    duration={0.6}
                                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                                />
                                <span className="relative z-10 transition-colors duration-300">{item}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div data-hide-header className="w-full cont_pren_s  md:h-[200vh] blink_btn opacity-0 relative mb-8   flex items-start max-sm:flex-col-reverse max-sm:gap-y-5">
                <div className="det_vid_sticky w-full padding  h-fit flex flex-col-reverse md:flex-row md:sticky top-0">
                    <div className="md:w-1/2 md:pr-32 space-y-5 md:space-y-10 pt-6 md:pt-12 text_blue">
                        <h3 data-para-effect className='  text-3xl md:text-5xl'>{introHeading}</h3>
                        <p className='text-xl leading-tight'>{introText}</p>
                    </div>
                    <div className="det_vid md:absolute bg_blue w-full max-sm:aspect-video md:h-screen top-0 right-0">
                        <div className="w-full h-full overflow-hidden">
                            <video className='cover' loop autoPlay muted playsInline src={videoSrc}></video>
                        </div>
                    </div>
                    <div className=" hidden md:block w-full md:w-1/2 pt-6 md:pt-12">
                        <div className="det_vid_target w-full aspect-video overflow-hidden">
                        </div>
                    </div>
                </div>
            </div>
            <div className="padding">

                <div className="w-full  flex flex-col-reverse max-sm:gap-y-5 md:flex-row">
                    <div className="w-full md:w-1/2 flex items-end">
                        <p className='md:w-[50%] leading-tight text-xl text_blue'>
                            {supportingText}
                        </p>
                    </div>

                    <div className="w-full md:w-1/2 text_blue">
                        <div className="flex flex-col w-full">
                            {features.map((stat, i) => (
                                <div key={i} className="flex justify-between items-center py-4 border-b border-[#002bba20] last:border-b-0">
                                    <span data-para-effect className="text-xl font-medium">{stat.label}</span>
                                    <span className=" font-semibold ">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div ref={marqueeContainerRef} className="w-full md:py-8 mt-6 md:mt-12 border-t border-[#002bba] z-10 overflow-hidden">
                <VelocityMarquee baseSpeed={25}>
                    <div className="flex items-center gap-10 md:gap-20 px-5 md:px-10 h-24 md:h-32">
                        {clientsData.map((item, i) => (
                            <div key={i} className="w-32 md:w-70 shrink-0">
                                <Image src={item.icon} width={128} height={128} className="w-full h-auto object-contain" style={{ filter: "brightness(0) saturate(100%) invert(11%) sepia(96%) saturate(5885%) hue-rotate(228deg) brightness(80%)" }} alt={item.title} />
                            </div>
                        ))}
                    </div>
                </VelocityMarquee>
            </div>
        </div>
    )
}

export default DetailedExpertiseHero
