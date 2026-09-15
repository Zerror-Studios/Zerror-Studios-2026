"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { caseStudies } from '@/data/ProjectsData';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
import { Link } from 'next-view-transitions';

const CATEGORIES = [
    "All Work",
    "Brand & Identity",
    "Content & Marketing",
    "Film & Production",
    "Web & Digital"
];

const CATEGORY_MAP = {
    "All Work": () => true,
    "Brand & Identity": (item) =>
        ["Studio Akto", "I White Korea", "Deveshe Dreams", "JustNosh", "Shivdutt das art foundation"].includes(item.title) ||
        item.category?.toLowerCase().includes("brand") || item.category?.toLowerCase().includes("studio") || item.category?.toLowerCase().includes("fashion"),
    "Content & Marketing": (item) =>
        ["Disrptve", "WineeMedia", "Manifest", "Esquire India"].includes(item.title) ||
        item.category?.toLowerCase().includes("marketing") || item.category?.toLowerCase().includes("magazine"),
    "Film & Production": (item) =>
        ["25 Rupiya Production", "Salmaan Khan Films", "Shivdutt das art foundation"].includes(item.title) ||
        item.category?.toLowerCase().includes("production") || item.category?.toLowerCase().includes("movie") || item.category?.toLowerCase().includes("art"),
    "Web & Digital": (item) =>
        ["Disrptve", "Bro's Moving", "Esquire India", "Manifest", "WineeMedia"].includes(item.title) ||
        item.category?.toLowerCase().includes("web") || item.category?.toLowerCase().includes("digital") || item.category?.toLowerCase().includes("transport")
};

const WorkCard = ({ item, index, isGlobalPixelActive, triggerStagger }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [staggerActive, setStaggerActive] = useState(false);

    useEffect(() => {
        if (triggerStagger) {
            const delay = index * 120;
            const timerOn = setTimeout(() => {
                setStaggerActive(true);
            }, delay);

            const timerOff = setTimeout(() => {
                setStaggerActive(false);
            }, delay + 600);

            return () => {
                clearTimeout(timerOn);
                clearTimeout(timerOff);
            };
        }
    }, [triggerStagger, index]);

    return (
        <Link
            href={`/work/${item.slug}`}
            className="group relative flex flex-col gap-y-2 justify-between overflow-hidden transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <PixelGridCanvas
                isActive={isGlobalPixelActive || staggerActive}
                color="#ffffff"
                boxSize={30}
                duration={0.7}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
            />
            {/* Media Area */}
            <div className="relative aspect-video w-full overflow-hidden">

                {item.cover_img && (
                    <Image
                        src={item.cover_img}
                        alt={item.title}
                        fill
                        className={`object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-105" : "scale-100"}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            {/* Info Bar */}
            <div className="w-full text_blue">
                <div className="flex justify-between">
                    <h4 className="text-xl primary-font uppercase">{item.title}</h4>
                    <h4 className="text-xl primary-font uppercase">{item.year}</h4>
                </div>
                <p className="leading-none">{item.category}</p>
            </div>
        </Link>
    );
};

const WorksGrid = () => {
    const [activeCategory, setActiveCategory] = useState("All Work");
    const [isGlobalPixelActive, setIsGlobalPixelActive] = useState(false);
    const [triggerStagger, setTriggerStagger] = useState(0);
    const isTransitioningRef = useRef(false);
    const filterContainerRef = useRef(null);

    // Intro Y-axis Filter animation & Initial Card Stagger
    useEffect(() => {
        if (filterContainerRef.current) {
            const buttons = filterContainerRef.current.querySelectorAll('.filter-item-inner');
            gsap.fromTo(
                buttons,
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.1
                }
            );
        }

        // Initial white pixel grid stagger for work cards
        setTriggerStagger(Date.now());
    }, []);

    const handleCategoryChange = (category) => {
        if (category === activeCategory || isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        // 1. Activate white pixel grid stagger
        setIsGlobalPixelActive(true);
        setTriggerStagger(Date.now());

        // 2. Rearrange grid at peak pixel coverage
        setTimeout(() => {
            setActiveCategory(category);
        }, 400);

        // 3. Dissolve white pixel grid out
        setTimeout(() => {
            setIsGlobalPixelActive(false);
            isTransitioningRef.current = false;
        }, 800);
    };

    const filteredProjects = caseStudies.filter(
        CATEGORY_MAP[activeCategory] || (() => true)
    );

    return (
        <section className="w-full pt-[40vh] padding select-none">
            <div>
                {/* Header Filter Section with Y-Axis Intro Translate */}
                <div className="mb-8 md:mb-14 overflow-hidden" ref={filterContainerRef}>
                    <div className="text-3xl sm:text-5xl flex flex-wrap  gap-2">
                        {CATEGORIES.map((category, idx) => {
                            const isActive = activeCategory === category;
                            return (
                                <div key={category} className="inline-block overflow-hidden">
                                    <span className="filter-item-inner inline-block">
                                        <button
                                            onClick={() => handleCategoryChange(category)}
                                            className={`transition-all  primary-font duration-300 text_blue inline-block text-left cursor-pointer ${
                                                isActive
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-30 hover:opacity-80"
                                            }`}
                                        >
                                            {category}, 
                                        </button>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Projects Grid with Staggered White PixelGrid Canvas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                    {filteredProjects.map((item, index) => (
                        <WorkCard
                            key={item.id || index}
                            item={item}
                            index={index}
                            isGlobalPixelActive={isGlobalPixelActive}
                            triggerStagger={triggerStagger}
                        />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="py-24 text-center text-zinc-500 font-mono text-sm uppercase tracking-wider">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </section>
    );
};

export default WorksGrid;