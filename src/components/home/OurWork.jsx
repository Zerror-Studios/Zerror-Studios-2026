"use client"
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import { Link } from "next-view-transitions";
import React, { useEffect, useRef } from 'react'
import Button from "../common/Button";
import { caseStudies } from "@/data/ProjectsData";
import useDevice from "../hooks/useDevice";
import Image from "next/image";

const INNER_PADDING = 60;
gsap.registerPlugin(CustomEase);

CustomEase.create(
    "revealEase",
    "0.19, 1, 0.22, 1"
)
const OurWork = () => {
    const { isMobile, isDesktop } = useDevice();
    const mousePos = useRef({ x: 0, y: 0 });
    const activeIndex = useRef(null);
    const cardRefs = useRef([]);
    const posRefs = useRef([]);

    useEffect(() => {
        if (!isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const card = entry.target;
                    const hoverVid = card.querySelector(".hover_vid");

                    if (!hoverVid) return;

                    if (entry.isIntersecting) {
                        gsap.to(hoverVid, {
                            opacity: 1,
                            clipPath: "inset(0%)",
                            duration: 1,
                            ease: "revealEase",
                        });

                        // center video on mobile
                        gsap.set(hoverVid, {
                            x: (card.offsetWidth - hoverVid.offsetWidth) / 2,
                            y: (card.offsetHeight - hoverVid.offsetHeight) / 2,
                        });
                    } else {
                        gsap.to(hoverVid, {
                            opacity: 0,
                            clipPath: "inset(40%)",
                            duration: 0.8,
                            ease: "revealEase",
                        });
                    }
                });
            },
            {
                threshold: 0.55, // tweak for when it should trigger
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    const handleMouseEnter = (index) => {
        if (isMobile) return;
        activeIndex.current = index;

        const card = cardRefs.current[index];
        const hoverVid = card.querySelector(".hover_vid");

        if (!posRefs.current[index]) {
            posRefs.current[index] = {
                xTo: gsap.quickTo(hoverVid, "x", {
                    duration: 0.6,
                    ease: "power3.out",
                }),
                yTo: gsap.quickTo(hoverVid, "y", {
                    duration: 0.6,
                    ease: "power3.out",
                }),
            };
        }

        gsap.to(hoverVid, {
            opacity: 1,
            clipPath: "inset(0%)",
            duration: 1.2,
            ease: "revealEase",
        });
    };

    const handleMouseMove = (e, index) => {
        if (isMobile) return;
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;

        updatePosition(index);
    };

    const updatePosition = (index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const hoverVid = card.querySelector(".hover_vid");
        const rect = card.getBoundingClientRect();

        const mouseX = mousePos.current.x - rect.left;
        const mouseY = mousePos.current.y - rect.top;

        const maxX =
            rect.width - hoverVid.offsetWidth - INNER_PADDING;
        const maxY =
            rect.height - hoverVid.offsetHeight - INNER_PADDING;

        const clampedX = gsap.utils.clamp(
            INNER_PADDING,
            maxX,
            mouseX - hoverVid.offsetWidth / 2
        );

        const clampedY = gsap.utils.clamp(
            INNER_PADDING,
            maxY,
            mouseY - hoverVid.offsetHeight / 2
        );

        posRefs.current[index].xTo(clampedX);
        posRefs.current[index].yTo(clampedY);
    };

    useEffect(() => {
        const onScroll = () => {
            if (activeIndex.current !== null) {
                updatePosition(activeIndex.current);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleMouseLeave = (index) => {
        if (isMobile) return;
        activeIndex.current = null;

        const hoverVid =
            cardRefs.current[index].querySelector(".hover_vid");

        gsap.to(hoverVid, {
            opacity: 0,
            clipPath: "inset(40%)",
            duration: 1.2,
            ease: "revealEase",
        });
    };

    return (
        <div className="work_paren w-full pt-6 md:pt-12 relative z-10 bg-white">

            <div className="w-full  padding text_blue space-y-16 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className='   primary-font   text-5xl  leading-none'>Selected  <br />Works</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className=' font-thin '>Thoughtful Design.</p>
                    <p className=' font-thin '>Technology that holds.</p>
                </div>
                <div className=" max-sm:hidden text-3xl pl-2">
                    <h3 data-para-effect className="  secondary-font"> <span className='opacity-0 pointer-events-none'>..............</span> Work where design and technology move as one. No handoffs, no compromises, nothing lost in
translation — every project built with structure, precision, and the patience to sweat details most
people never notice. Built to perform. Built to last.
</h3>
                </div>
                <div className=" md:hidden text-3xl ">
                    <h3 className="  secondary-font"> Work where design and technology move as one. No handoffs, no compromises, nothing lost in
translation — every project built with structure, precision, and the patience to sweat details most
people never notice. Built to perform. Built to last.
</h3>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 padding gap-x-5 gap-y-10">
                {caseStudies.slice(0, 4).map((item, i) => (
                    <Link
                        href={`/work/${item.slug}`}
                        key={i}
                        className="w-full relative group space-y-2"
                    >
                        <div
                            ref={(el) => (cardRefs.current[i] = el)}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseMove={(e) => handleMouseMove(e, i)}
                            onMouseLeave={() => handleMouseLeave(i)}
                            className="w-full relative aspect-3/4 md:aspect-square bg_blue overflow-hidden"
                        >
                            {isDesktop && (
                                <div style={{
                                    clipPath: "inset(40%)",
                                    willChange: "transform, clip-path, opacity"

                                }} className="hover_vid absolute z-10 top-0 opacity-0 left-0 pointer-events-none aspect-[303/389] w-[18rem] ">
                                    <video loop muted autoPlay playsInline className="cover" src={item.cover_vid} alt="loading img" />
                                </div>
                            )}

                            <div className="cover group-hover:brightness-[.3] transition-all duration-300 brightness-100  ease-[cubic-bezier(0.4, 0, 0.2, 1]  ">
                                <Image src={item.cover_img} alt="loading img" className="cover" fill />
                            </div>
                        </div>

                        <div className="w-full text_blue">
                            <div className="flex  justify-between">
                                <h4 className="text-xl  primary-font  uppercase">{item.title}</h4>
                                <h4 className="text-xl primary-font  uppercase">{item.year}</h4>
                            </div>
                            <p className="leading-none">{item.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="w-full center py-10">
                <Button link="/work" title="View All" />
            </div>
        </div>
    );
};

export default OurWork;
