"use client";
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
import { caseStudies } from '@/data/ProjectsData';
import Button from '@/components/common/Button';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';

gsap.registerPlugin(ScrollTrigger, SplitText)

// One heading + points block in the scrolling right column
const StoryBlock = ({ heading, children }) => (
    <div className="border-t border-[#002bba20] pt-6 md:pt-8 space-y-4 md:space-y-6">
        <h2 className="secondary-font text-3xl md:text-4xl leading-none">{heading}</h2>
        <div className="space-y-3 text-xl leading-tight md:max-w-[85%]">{children}</div>
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
                    <Image src={item.cover_img} alt={`${item.title} website`} className="cover group-hover:scale-105 transition-all duration-300" fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
           
            </div>
            <div className="w-full">
                <div className="flex justify-between gap-4">
                    <h4 className="text-xl primary-font uppercase">{item.title}</h4>
                    <h4 className="text-xl primary-font uppercase">{item.year}</h4>
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
    // Next three case studies, wrapping round to the start
    const moreProjects = index < 0 ? [] : [1, 2]
        .map((n) => caseStudies[(index + n) % caseStudies.length])
        .filter((p) => p.slug !== slug)

    const containerRef = useRef(null)

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
            <section className="wd_hero opacity-0 padding w-full min-h-[65vh] pt-36 md:pt-44 pb-10  flex flex-col justify-end">
                <div className="flex items-end justify-between">
                    <div className="">
                        <h1 className="wd_heading primary-font text-5xl md:text-8xl leading-none">{project.title}</h1>
                        <p className="wd_fade text-xl leading-tight md:max-w-[70%]">{project.tagline}</p>
                    </div>
                    {project.liveLink && (
                        <div className="wd_fade w-[15%] flex justify-end mt-6 md:mt-8">
                            <Button title="View live site" link={project.liveLink} />
                        </div>
                    )}
                </div>
            </section>

            {/* Cover: video when there is one, image otherwise */}
            <div data-hide-header className="wd_media w-full aspect-video border-t border-b border-[#002bba10] overflow-hidden bg-[#002bba10]">
                {project.cover_vid ? (
                    <video src={project.cover_vid} poster={project.cover_img} loop autoPlay muted playsInline className="cover" />
                ) : (
                    <img src={project.cover_img} alt={`${project.title} website`} className="cover" />
                )}
            </div>

            {/* Details: facts pinned left, story scrolls right */}
            <section className="padding py-12 md:py-24 ">
                <div className="w-full md:grid grid-cols-2 ">
                    <aside className="md:sticky md:top-28 self-start space-y-6 md:space-y-8 pb-12 md:pb-0 md:pr-44">
                        {project.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.keywords.map((k) => (
                                    <span key={k} className="text-xs uppercase px-4 py-2 border border-[#002bba15] bg-[#002bba10] leading-none rounded-sm">{k}</span>
                                ))}
                            </div>
                        )}

                        <div className="w-full">
                            {[
                                ["Industry", project.category],
                                ["Services", project.services?.join(", ")],
                                ["Year", project.year],
                            ].filter(([, v]) => v).map(([label, value]) => (
                                <div key={label} className="flex justify-between gap-6 py-3 border-b border-[#002bba20] first:border-t">
                                    <span className="text-xs uppercase font-thin pt-1">{label}</span>
                                    <span className="font-medium text-right">{value}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <div className="space-y-12 md:space-y-16 ">
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

            {/* More work: next three case studies, styled like the home page Our Work cards */}
            {moreProjects.length > 0 && (
                <section className="w-full py-8 md:py-16 space-y-8 md:space-y-16 border-t border-[#002bba20]">

                    <div className="padding w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                        {moreProjects.map((item) => (
                            <MoreCard key={item.slug} item={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default WorkDetail
