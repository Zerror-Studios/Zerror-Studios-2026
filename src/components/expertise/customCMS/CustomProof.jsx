"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Four publishers running on a custom CMS we designed and built: frontend, backend and editorial tools.
// TODO: every stat marked "confirm" is a placeholder — replace with the client's real numbers before launch.
const proofItems = [
    {
        name: "The Hollywood Reporter India",
        group: "RPSG Lifestyle Media",
        line: "The flagship title on one custom platform we built for RPSG Lifestyle Media, shared with Esquire India and Robb Report India.",
        built: ["Custom CMS", "Frontend", "Backend", "Digital magazine issues"],
        points: [
            "Editors publish news, reviews, galleries and video from one dashboard.",
            "Monthly print issues go live as digital editions in minutes.",
            "Built to stay fast on box-office Fridays and awards nights.",
        ],
        stats: [
            { value: "3M+", label: "Readers a month" },
            { value: "500+", label: "Editors on the platform" },
            { value: "+45%", label: "Reader retention" }, // TODO: confirm
        ],
        img: "/images/expertisePage/custom-cms/proof_cms/thr.jpg",
        alt: "The Hollywood Reporter India magazine cover",
    },
    {
        name: "Manifest Life",
        group: "RPSG Lifestyle Media",
        line: "Five years of content moved off WordPress onto a custom CMS, with zero downtime.",
        built: ["Custom CMS", "Frontend", "Backend", "WordPress migration"],
        points: [
            "Every article, image and URL carried over, so no search ranking was lost.",
            "Wedding, travel and culture stories published from one editorial workflow.",
            "Issues, black books and guides uploaded without a developer.",
        ],
        stats: [
            { value: "200%", label: "More traffic after launch" },
            { value: "0", label: "Minutes of downtime" },
            { value: "+38%", label: "Returning readers" }, // TODO: confirm
        ],
        img: "/images/expertisePage/custom-cms/proof_cms/manifest.jpg",
        alt: "Manifest Life magazine cover",
    },
    {
        name: "Robb Report India",
        group: "RPSG Lifestyle Media",
        line: "Luxury, travel and watches, published on the RPSG Lifestyle Media platform with a frontend made to feel premium.",
        built: ["Custom CMS", "Frontend", "Backend", "Digital covers"],
        points: [
            "Long-form features, digital covers and galleries, laid out like print.",
            "Pages load fast, even with large photography.",
            "One login to post stories, upload issues and schedule covers.",
        ],
        stats: [
            { value: "1M+", label: "Readers a month" }, // TODO: confirm
            { value: "2x", label: "Faster pages" }, // TODO: confirm
            { value: "+40%", label: "Time on page" }, // TODO: confirm
        ],
        img: "/images/expertisePage/custom-cms/proof_cms/robbreport.jpg",
        alt: "Robb Report India digital cover",
    },
    {
        name: "Esquire India",
        group: "RPSG Lifestyle Media",
        line: "Style, culture and long reads, published on the same platform and set up for search from day one.",
        built: ["Custom CMS", "Frontend", "Backend", "SEO and AI search"],
        points: [
            "Cover stories, essays and interviews published from one dashboard.",
            "Schema and clean URLs on every story, so search engines pick them up fast.",
            "Monthly issues uploaded and live as digital editions the same day.",
        ],
        stats: [
            { value: "150%", label: "More organic traffic" }, // TODO: confirm
            { value: "+52%", label: "Subscriber growth" }, // TODO: confirm
            { value: "+35%", label: "Reader retention" }, // TODO: confirm
        ],
        img: "/images/expertisePage/custom-cms/proof_cms/esquire.jpg",
        alt: "Esquire India magazine cover",
    },
];

const CustomProof = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Stacking effect is desktop only; on mobile the panels scroll normally
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const panels = gsap.utils.toArray(".proof_panel");

            // As each next panel slides up, the one underneath eases back and dims
            panels.forEach((panel, i) => {
                const next = panels[i + 1];
                if (!next) return;
                gsap.to(panel.querySelector(".proof_inner"), {
                    scale: 0.92,
                    opacity: 0.4,
                    ease: "none",
                    scrollTrigger: {
                        trigger: next,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    },
                });
            });
        });
        return () => mm.revert();
    }, { scope: containerRef });

    return (
        <div ref={containerRef} data-hide-header className="w-full relative text_blue">
            {proofItems.map((item, index) => (
                <div
                    key={index}
                    className="proof_panel relative md:sticky md:top-0 md:h-screen w-full md:overflow-hidden bg-white border-t border-[#002bba20]"
                    style={{ zIndex: index + 1 }}
                >
                    <div className="proof_inner origin-top w-full md:h-full padding py-section! flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16">
                        {/* Left: content */}
                        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-7">

                            <div className="space-y-3">
                                <h2 className="h3" data-para-effect>{item.name}</h2>
                                <p className="para-lg  md:max-w-[80%]">{item.line}</p>
                            </div>

                            <ul className="max-sm:hidden space-y-2 max-w-xl para-lg">
                                {item.points.map((point) => (
                                    <li key={point} className="flex gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-current" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="grid grid-cols-3 border-t border-[#002bba20] pt-4 md:pt-6">
                                {item.stats.map((stat) => (
                                    <div key={stat.label} className="pr-3">
                                        <p className="h3">{stat.value}</p>
                                        <p className="mt-2 para-sm">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: cover at its natural portrait ratio */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            <div className="relative w-full m md:h-[95vh] aspect-[3/4] overflow-hidden">
                                <Image
                                    src={item.img}
                                    alt={item.alt}
                                    fill
                                    sizes="(min-width: 768px) 45vw, 60vw"
                                    className="cover object-top"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomProof;
