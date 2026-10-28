"use client";
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { caseStudies } from '@/data/ProjectsData';
import Button from '@/components/common/Button';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
import SectionHeader from '@/components/common/SectionHeader';
import SliderArrows from '@/components/common/SliderArrows';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger, SplitText)

// One heading + points block in the scrolling right column
const StoryBlock = ({ heading, children }) => (
    <div className="border-t border-[#002bba]/20 first:pt-0 first:border-none max-sm:pt-4 pt-block space-y-4">
        <h2 className="h4">{heading}</h2>
        <div className="para-lg space-y-3">{children}</div>
    </div>
);

// Card matching the home page Our Work grid: cover dims under a pixel grid on hover
const MoreCard = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={`/work/${item.slug}`}
            className="w-full relative group space-y-2"
        >
            <div className="w-full relative aspect-video bg_blue overflow-hidden">
                <div className="cover relative  transition-all duration-300">
                    <Image src={item.cover_img} alt={`${item.title} website`} className="cover group-hover:scale-105 transition-all duration-300" fill sizes="(max-width: 768px) 85vw, 50vw" />
                </div>
           
            </div>
            <div className="w-full">
                <div className="flex justify-between gap-4">
                    <h3 className="h6 uppercase">{item.title}</h3>
                    <p className="h6 uppercase">{item.year}</p>
                </div>
                <p className="leading-none">{item.category}</p>
            </div>
        </Link>
    );
};

const WorkDetail = () => {
    const { slug } = useParams()
    const index = caseStudies.findIndex((p) => p.slug === slug)
    const project = caseStudies[index]
    // The next 5 case studies, wrapping round to the start
    const moreProjects = index < 0 ? [] : caseStudies
        .map((_, n) => caseStudies[(index + 1 + n) % caseStudies.length])
        .filter((p) => p.slug !== slug)
        .slice(0, 5)

    const containerRef = useRef(null)

    // More work carousel
    const swiperRef = useRef(null)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const [activeSlide, setActiveSlide] = useState(0)
    const updateEdges = (swiper) => {
        setIsBeginning(swiper.isBeginning)
        setIsEnd(swiper.isEnd)
        setActiveSlide(swiper.activeIndex)
    }
    // Fill of the active pagination pill, driven by the autoplay timer (set directly, no re-render)
    const dotFillRefs = useRef([])
    const updateDotFill = (swiper, _time, progress) => {
        dotFillRefs.current.forEach((el, i) => {
            if (el) el.style.transform = `scaleX(${i === swiper.activeIndex ? 1 - progress : 0})`
        })
    }

    useGSAP(() => {
        if (!project) return;

        const heading_split = SplitText.create(".wd_heading", { type: "lines", linesClass: "split-line" });
        heading_split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("line-wrapper");
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
        gsap.set(heading_split.lines, { yPercent: 100 });

        const tl = gsap.timeline({ delay: 0.4 });
        tl.to(".wd_hero", { opacity: 1, duration: 0.01 });
        tl.to(heading_split.lines, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, "<");
        tl.from(".wd_fade", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 }, "<+0.2");
        tl.from(".wd_media", { opacity: 0, duration: 1, ease: "power2.out" }, "<+0.1");
    }, { scope: containerRef, dependencies: [slug] })

    if (!project) notFound();

    return (
        <div ref={containerRef} className="text_blue">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "name": `${project.title} Case Study — Zerror Studios`,
                        "about": project.title,
                        "description": project.tagline,
                        "keywords": project.keywords?.join(", "),
                        "creator": { "@id": "https://www.zerrorstudios.com/#org" }
                    })
                }}
            />

            {/* Hero: name, tagline and live link */}
            <section className="wd_hero opacity-0 padding w-full h-[65vh] md:h-[80vh]  pt-hero pb-section  flex flex-col justify-end">
                <div className="md:flex items-end justify-between">
                    <div>
                        <h1 className="wd_heading">{project.title}</h1>
                        <p className="wd_fade para-lg md:max-w-[70%]">{project.tagline}</p>
                    </div>
                    {project.liveLink && (
                        <div className="wd_fade md:w-[15%] md:flex justify-end mt-block">
                            <Button title="View live site" link={project.liveLink} />
                        </div>
                    )}
                </div>
            </section>

            {/* Cover: video when there is one, image otherwise */}
            <div data-hide-header className="wd_media w-full aspect-video border-t border-b border-[#002bba]/10 overflow-hidden bg-[#002bba]/10">
                {project.cover_vid ? (
                    <video src={project.cover_vid} poster={project.cover_img} loop autoPlay muted playsInline className="cover" />
                ) : (
                    <img src={project.cover_img} alt={`${project.title} website`} className="cover" />
                )}
            </div>

            {/* Details: facts pinned left, story scrolls right */}
            {/* Same 28 / 30 / 42 grid as the section headers: facts in the first column, story in the intro column */}
            <section className="padding py-section">
                <div className="w-full space-y-block md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <aside className="md:sticky md:top-28 self-start space-y-block">
                        {project.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.keywords.map((k) => (
                                    <span key={k} className="label uppercase px-4 py-2  border-[#002bba15] border bg-[#002bba10] rounded-sm">{k}</span>
                                ))}
                            </div>
                        )}

                        <div className="w-full">
                            {[
                                ["Industry", project.category],
                                ["Services", project.services?.join(", ")],
                                ["Year", project.year],
                            ].filter(([, v]) => v).map(([label, value]) => (
                                <div key={label} className="flex justify-between gap-6 py-3 border-b border-[#002bba]/20 first:border-t">
                                    <span className="label uppercase font-thin pt-1">{label}</span>
                                    <span className="para text-right">{value}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="md:col-start-3 md:pl-2 space-y-block">
                        <StoryBlock heading="About the client">
                            <p>{project.about}</p>
                            <p>{project.whatTheyDo}</p>
                        </StoryBlock>

                        <StoryBlock heading="Scope of work">
                            <ul className="list-disc pl-5 space-y-2">
                                {project.whatWeDid?.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </StoryBlock>

                        <StoryBlock heading="The outcome">
                            <p>{project.impact}</p>
                        </StoryBlock>
                    </div>
                </div>
            </section>

            {/* More work: every other case study in a carousel, styled like the home page Our Work cards */}
            {moreProjects.length > 0 && (
                <section className="w-full py-section space-y-block border-t border-[#002bba]/20">
                    <div className="padding">
                        <SectionHeader
                            title="More Work"
                            lines={["Other brands", "we've built."]}
                            aside={
                                // Phones use the dots under the slider instead
                                <div className="max-md:hidden">
                                    <SliderArrows
                                        onPrev={() => swiperRef.current?.slidePrev()}
                                        onNext={() => swiperRef.current?.slideNext()}
                                        isBeginning={isBeginning}
                                        isEnd={isEnd}
                                    />
                                </div>
                            }
                        />
                    </div>

                    <div className="padding">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper
                                updateEdges(swiper)
                            }}
                            onSlideChange={updateEdges}
                            onResize={updateEdges}
                            onAutoplayTimeLeft={updateDotFill}
                            modules={[Autoplay]}
                            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            rewind
                            slidesPerView="auto"
                            spaceBetween={10}
                            breakpoints={{ 768: { spaceBetween: 20 } }}
                            grabCursor
                        >
                            {moreProjects.map((item) => (
                                <SwiperSlide key={item.slug} className="w-[100%]! md:w-[calc(50%-10px)]!">
                                    <MoreCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Pagination: phones only, one per card. The active one is a pill that fills with the autoplay timer */}
                        <div className="md:hidden flex justify-center items-center gap-2 pt-6">
                            {moreProjects.map((item, i) => {
                                const isActive = i === activeSlide
                                return (
                                    <button
                                        key={item.slug}
                                        type="button"
                                        aria-label={`Go to slide ${i + 1}`}
                                        aria-current={isActive}
                                        onClick={() => swiperRef.current?.slideTo(i)}
                                        className={`relative h-2 rounded-full overflow-hidden transition-[width,background-color] duration-300 ${isActive ? "w-8 bg-[#002bba]/25" : "w-2 bg-[#002bba]/25"}`}
                                    >
                                        <span
                                            ref={(el) => { dotFillRefs.current[i] = el }}
                                            className="absolute inset-0 bg-[#002bba] origin-left"
                                            style={{ transform: "scaleX(0)" }}
                                        />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default WorkDetail
