"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import GoogleMeet from './GoogleMeet';
import ColorPalette from './ColorPalette';
import FigmaWireframe from './FigmaWireframe';
import FigmaApprovedDesign from './FigmaApprovedDesign';
import VsCode from './VsCode';
import SeoLighthouse from './SeoLighthouse';
import FinalView from './FinalView';
import { RiAddLine } from '@remixicon/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

// 1. Column configuration: 5 Weeks
export const WEEKS = [
    { label: "WEEK 1", subtitle: "Discovery & Wireframes" },
    { label: "WEEK 2", subtitle: "Figma UI Design" },
    { label: "WEEK 3", subtitle: "Dev Kickoff & WIP" },
    { label: "WEEK 4", subtitle: "Full Build & Iteration" },
    { label: "WEEK 5", subtitle: "Launch & Handoff" },
];

// 2. Row configuration: 6 Days
export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 3. Central Event Data Array (Single Source of Truth)
export const CALENDAR_EVENTS = [
    // --- Week 1 ---
    {
        day: "MON",
        week: 1,
        title: "Client Kickoff Meet",
        tag: "Day 1",
        align: "right",
        vAlign: "top",
        stage: "kickoff",
        component: <GoogleMeet />,
        content: `### 🤝 Client Kickoff Meet\n**Phase:** Week 1 • Day 1\n\n- Align on project goals, timeline & core deliverables.\n- Identify target audience & brand positioning strategies.\n- Establish communication channels & workspace access.\n\n*Kickoff alignment completed — setting strong project foundations.*`
    },
    {
        day: "WED",
        week: 1,
        title: "Sitemap & IA Structure",
        tag: "Day 2",
        align: "right",
        vAlign: "top",
        stage: "sitemap",
        component: <ColorPalette />,
        content: `### 🗺️ Sitemap & IA Structure\n**Phase:** Week 1 • Day 3\n\n- Map out user journeys & complete website page hierarchy.\n- Plan conversion pathways & main CTA placements.\n- Define brand color tokens & foundational visual guidelines.\n\n*Information architecture approved — ready for wireframing.*`
    },
    {
        day: "FRI",
        week: 1,
        title: "Share Figma Wireframe",
        tag: "Day 5",
        align: "right",
        vAlign: "bottom",
        stage: "wireframe",
        component: <FigmaWireframe />,
        content: `### 📐 Share Figma Low-Fi Wireframe\n**Phase:** Week 1 • Day 5\n\n- Deliver interactive structural wireframes in Figma.\n- Validate section layouts, page flow & content hierarchy.\n- Collect preliminary client feedback on content structure.\n\n*Low-fidelity wireframe approved for visual UI design stage.*`
    },

    // --- Week 2 ---
    {
        day: "TUE",
        week: 2,
        title: "Hi-Fi UI Design",
        tag: "Day 8",
        align: "right",
        vAlign: "top",
        stage: "design",
        component: <FigmaApprovedDesign />,
        content: `### 🎨 High-Fidelity UI Design\n**Phase:** Week 2 • Day 8\n\n- Craft custom visual aesthetics, typography & UI elements.\n- Design responsive layouts for desktop, tablet & mobile views.\n- Build interactive hover states, micro-interactions & visual assets.\n\n*Transforming structural wireframes into high-fidelity designs.*`
    },
    {
        day: "FRI",
        week: 2,
        title: "Share Figma Design",
        tag: "Day 11",
        align: "right",
        vAlign: "bottom",
        content: `### 🚀 Share Overall Figma Website Design\n**Phase:** Week 2 • Day 11\n\n- Present full high-fidelity Figma UI design to client.\n- Walk through desktop & mobile interactive prototypes.\n- Open Figma comment mode for client team review.\n\n*Milestone: Complete website design shared for review.*`
    },
    {
        day: "SAT",
        week: 2,
        title: "Design Confirmation",
        tag: "Day 12",
        align: "right",
        vAlign: "bottom",
        content: `### ✅ Design Confirmation & Approval\n**Phase:** Week 2 • Day 12\n\n- Review final Figma design comments with client.\n- Apply minor visual adjustments based on feedback.\n- Secure formal client sign-off on full website design.\n\n*Design freeze achieved — green light for development!*`
    },

    // --- Week 3 ---
    {
        day: "MON",
        week: 3,
        title: "Dev Process Started",
        tag: "Day 13",
        align: "right",
        vAlign: "top",
        stage: "dev",
        component: <VsCode />,
        content: `### 💻 Development Process Kickoff\n**Phase:** Week 3 • Day 13\n\n- Initialize Next.js codebase & setup Tailwind CSS environment.\n- Establish component architecture & reusable UI design tokens.\n- Configure repository version control & automated CI/CD pipeline.\n\n*Codebase initialized — full-stack development underway.*`
    },
    {
        day: "WED",
        week: 3,
        title: "Hero & Motion Setup",
        tag: "Day 15",
        align: "right",
        vAlign: "center",
        content: `### 🌊 Hero Section & Motion Setup\n**Phase:** Week 3 • Day 15\n\n- Build high-impact Hero section with GSAP scroll triggers.\n- Implement smooth micro-animations & smooth parallax.\n- Optimize rendering performance to maintain 60fps.\n\n*Motion-led design implementation in production code.*`
    },
    {
        day: "FRI",
        week: 3,
        title: "Share WIP Link",
        tag: "Day 17",
        align: "right",
        vAlign: "bottom",
        content: `### 🔗 Share Initial WIP Link\n**Phase:** Week 3 • Day 17\n\n- Deploy early build to Vercel live staging URL.\n\n- Share Work-In-Progress (WIP) link with the client.\n- Enable live browser preview for client tracking.\n\n*Milestone: Live WIP link shared for real-time progress preview.*`
    },

    // --- Week 4 ---
    {
        day: "TUE",
        week: 4,
        title: "API & Form Integration",
        tag: "Day 20",
        align: "left",
        vAlign: "top",
        content: `### ⚡ API & Form Integration\n**Phase:** Week 4 • Day 20\n\n- Connect dynamic API endpoints & backend services.\n- Wire contact forms with validation & success handlers.\n- Implement secure client data transmission.\n\n*Ensures seamless functional interactivity on staging.*`
    },
    {
        day: "WED",
        week: 4,
        title: "Client Demo Walkthrough",
        tag: "Day 21",
        align: "left",
        vAlign: "center",
        content: `### 🖥️ Client Demo Walkthrough\n**Phase:** Week 4 • Day 21\n\n- Live walkthrough of fully built staging website.\n- Test interactive forms, animations & mobile navigation.\n- Collect consolidated client feedback list.\n\n*Interactive demonstration of production-ready website.*`
    },
    {
        day: "FRI",
        week: 4,
        title: "Feedback Changes",
        tag: "Day 23",
        align: "left",
        vAlign: "bottom",
        content: `### 🛠️ Implementing Feedback Changes\n**Phase:** Week 4 • Day 23\n\n- Apply requested copy updates, image swaps & layout tweaks.\n- Fine-tune animation timings & hover micro-interactions.\n- Adjust color contrasts & spacing based on feedback.\n\n*Iterative refinement to match client expectations.*`
    },

    // --- Week 5 ---
    {
        day: "TUE",
        week: 5,
        title: "SEO & Lighthouse 90+",
        tag: "Day 26",
        align: "left",
        vAlign: "top",
        stage: "seo",
        component: <SeoLighthouse />,
        content: `### ⚡ SEO & Lighthouse 90+ Tuning\n**Phase:** Week 5 • Day 26\n\n- Optimize Core Web Vitals (LCP < 1.5s, INP, CLS scores).\n- Compress images, set WebP formats & lazy loading.\n- Inject Meta tags, OpenGraph previews & Schema markup.\n\n*Guarantees top search visibility & 90+ Lighthouse score.*`
    },
    {
        day: "THU",
        week: 5,
        title: "Domain & Live Launch",
        tag: "Day 28",
        align: "left",
        vAlign: "center",
        content: `### 🌐 Domain Pointing & Live Launch\n**Phase:** Week 5 • Day 28\n\n- Point custom domain DNS records (A-records / CNAME) to production.\n- Verify SSL certificate generation & HTTPS redirection.\n- Push website LIVE to production domain!\n\n*Milestone: Website is officially LIVE! 🎉*`
    },
    {
        day: "SAT",
        week: 5,
        title: "Final Project Handoff",
        tag: "Day 30",
        align: "left",
        vAlign: "bottom",
        stage: "handoff",
        component: <FinalView />,
        content: `### 🎁 Final Project Handoff & Training\n**Phase:** Week 5 • Day 30\n\n- Transfer source code repositories & domain administrative access.\n- Deliver documentation, CMS video tutorials & operating guidelines.\n- Conduct wrap-up meeting & establish long-term maintenance support.\n\n*Project successfully delivered & handed off! 🚀*`
    },
];

// Dynamically derived animated stages
export const STAGES = CALENDAR_EVENTS.filter(e => e.stage && e.component);

const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl md:text-2xl mb-3 ">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('**') && line.includes('**', 2)) {
            const parts = line.split('**');
            return <p key={i} className="mb-2 text-xs md:text-sm"><strong>{parts[1]}</strong>{parts[2]}</p>;
        }
        if (line.startsWith('- ')) {
            return <li key={i} className="ml-5 list-disc mb-1 text-xs md:text-sm">{line.replace('- ', '')}</li>;
        }
        if (line.startsWith('*') && line.endsWith('*')) {
            return <p key={i} className="mt-3 italic text-xs opacity-90 border-t border-white/20 pt-2">{line.replace(/\*/g, '')}</p>;
        }
        if (line.trim() === '') {
            return <div key={i} className="h-1"></div>;
        }
        return <p key={i} className="mb-2 text-xs md:text-sm ">{line}</p>;
    });
};

const EventCard = ({
    title,
    tag,
    content,
    bgColor = "bg_blue",
    textColor = "text-white",
    align = "right",
    vAlign = "center",
    isTarget = false,
    cardRef = null,
    labelRef = null,
    contentRef = null,
    enlargedContent = null
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const localCardRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        let totalDelta = 0;
        let lastWindowY = window.scrollY;

        const handleScroll = (e) => {
            const currentWindowY = window.scrollY;
            const windowDelta = Math.abs(currentWindowY - lastWindowY);
            lastWindowY = currentWindowY;

            if (windowDelta > 0) {
                totalDelta += windowDelta;
            } else {
                totalDelta += 10;
            }

            if (totalDelta >= 10) {
                setIsOpen(false);
            }
        };

        const handleClickOutside = (e) => {
            if (localCardRef.current && !localCardRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        document.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll, { capture: true });
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const popupX = align === "left"
        ? "right-[calc(100%+0.5rem)] md:right-[calc(100%+0.75rem)]"
        : "left-[calc(100%+0.5rem)] md:left-[calc(100%+0.75rem)]";

    let popupY = "top-1/2 -translate-y-1/2";
    if (vAlign === "top") popupY = "top-0";
    if (vAlign === "bottom") popupY = "bottom-0";

    const setCombinedCardRef = (node) => {
        localCardRef.current = node;
        if (typeof cardRef === 'function') {
            cardRef(node);
        } else if (cardRef && 'current' in cardRef) {
            cardRef.current = node;
        }
    };

    const togglePopup = (e) => {
        e.stopPropagation();
        if (content) {
            setIsOpen(prev => !prev);
        }
    };

    return (
        <div
            ref={setCombinedCardRef}
            className={` rounded-md text-[#002bba] bg-[#DFE4F6] p-2 md:p-2.5 h-full w-full flex flex-col justify-between relative  hover:bg-[#002bba]! hover:text-white! ${isOpen ? 'z-[5000]! bg-[#002bba]! text-white!' : 'z-10'} ! ${isTarget
                ? `target_blue_card  pointer-events-auto`
                : '  '
                }`}
        >
            {/* Card Header / Title */}
            <div
                onClick={togglePopup}
                ref={labelRef} className="card_label w-full cursor-pointer h-full flex flex-col justify-between relative">
                <div className='w-full h-full flex flex-col justify-between'>
                    <h4 className="font-thin">{title}</h4>
                    <div className="justify-end flex items-end w-full">
                        <RiAddLine className={`size-4 bg-white rounded-sm text_blue transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                    </div>
                </div>

                {/* Popup Details Card */}
                {content && (
                    <div
                        className={`card-popup absolute ${popupX} ${popupY} w-[18rem] sm:w-[21rem] md:w-[23rem] rounded-lg shadow-[0_25px_60px_-15px_rgba(0,43,186,0.3)] p-4 md:p-5 transition-all duration-300 overflow-y-auto scroller_none border border-black/10 bg-white text_blue ${isOpen
                            ? 'opacity-100 translate-x-0 visible pointer-events-auto'
                            : 'opacity-0 invisible pointer-events-none ' + (align === 'left' ? 'translate-x-2' : '-translate-x-2')
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderContent(content)}
                    </div>
                )}
            </div>

            <div
                ref={contentRef}
                className="meet_container absolute inset-0 w-full h-full opacity-0 pointer-events-none overflow-hidden rounded-xl bg-white"
            >
                {enlargedContent}
            </div>

        </div>
    );
};

const Calendar = () => {
    const containerRef = useRef(null);
    const fullCardsRef = useRef([]);
    const gridSlotsRef = useRef({});
    const cardsRef = useRef({});
    const labelsRef = useRef({});
    const contentsRef = useRef({});

    useGSAP(() => {
        const stageData = STAGES.map((stage, i) => {
            const card = cardsRef.current[stage.stage];
            const fullCard = fullCardsRef.current[i];
            const gridSlot = gridSlotsRef.current[stage.stage];
            const content = contentsRef.current[stage.stage];
            const label = labelsRef.current[stage.stage];
            return { stage, card, fullCard, gridSlot, content, label, i };
        });

        // Ensure all stages are present in DOM
        const validStages = stageData.filter(s => s.card && s.fullCard && s.gridSlot);
        if (validStages.length !== STAGES.length) return;

        // 1. Ensure each card is in its grid slot before capturing state
        validStages.forEach(s => {
            if (s.card.parentElement !== s.gridSlot) {
                s.gridSlot.appendChild(s.card);
            }
        });

        // 2. Capture initial state of all cards inside the grid
        const states = validStages.map(s => Flip.getState(s.card));

        // 3. Reparent each card into its fullCard destination container
        validStages.forEach(s => {
            s.fullCard.appendChild(s.card);
        });

        // 4. Create standalone Flip animations (from grid slot to full card)
        const flipTweens = validStages.map((s, idx) => {
            const tween = Flip.from(states[idx], {
                ease: "none",

                duration: 1,
                absolute: true,
                paused: true,
            });
            tween.progress(0);
            return tween;
        });

        // 5. Create timeline with ScrollTrigger scrub
        const progressValues = validStages.map(() => ({ val: 0 }));

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });



        // Build sequential timeline dynamically for all valid stages
        validStages.forEach((s, idx) => {
            const tween = flipTweens[idx];
            const prog = progressValues[idx];

            // Elevate active card above all others during animation
            tl.set(s.fullCard, { zIndex: 999 });
            tl.set(s.card, { zIndex: 999 });

            // Step A: Enlarge card from grid slot to full card
            tl.to(prog, {
                val: 1,
                duration: 1,
                ease: "power2.inOut",
                onUpdate: () => {
                    tween.progress(prog.val);
                },
            });

            // Fade out small card label as card expands
            if (s.label) {
                tl.to(s.label, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.out",
                }, "<0.1");
            }

            // Fade in enlarged content inside the card
            if (s.content) {
                tl.to(s.content, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onStart: () => {
                        s.content.style.pointerEvents = "auto";
                    },
                    onReverseComplete: () => {
                        s.content.style.pointerEvents = "none";
                    },
                }, "<0.25");
            }

            // Step B: Brief hold at full size for interaction
            tl.to({}, { duration: 0.4 });

            // Step C: Fade out enlarged content inside shrinking card
            if (s.content) {
                tl.to(s.content, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        s.content.style.pointerEvents = "none";
                    },
                    onReverseComplete: () => {
                        s.content.style.pointerEvents = "auto";
                    },
                });
            }

            // Fade back in small card label as card shrinks
            if (s.label) {
                tl.to(s.label, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power1.in",
                }, "<0.2");
            }

            // Shrink card back to original position in grid slot
            tl.to(prog, {
                val: 0,
                duration: 1,
                ease: "power2.inOut",
                onUpdate: () => {
                    tween.progress(prog.val);
                },
            }, "<");

            // Reset z-index after animation completes
            tl.set(s.card, { zIndex: "auto" });
            tl.set(s.fullCard, { zIndex: "auto" });


            // Short transition pause between stages (if not last stage)
            if (idx < validStages.length - 1) {
                tl.to({}, { duration: 0.2 });
            }
        });

        ScrollTrigger.refresh();

        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            tl.kill();
            flipTweens.forEach(t => t.kill());
            validStages.forEach(s => {
                if (s.card && s.gridSlot && s.card.parentElement !== s.gridSlot) {
                    s.gridSlot.appendChild(s.card);
                }
            });
        };
    }, { scope: containerRef });

    // Calculate dynamic scroll height based on number of animated stages
    const dynamicTrackHeight = `${Math.max(600, STAGES.length * 135 + 100)}vh`;

    return (
        <div ref={containerRef} className="w-full relative" style={{ height: dynamicTrackHeight }}>
            <div className="w-full h-screen sticky top-0 center">
                <div className="w-full  md:w-[95%] lg:w-[90%] xl:w-[80%] bg-white rounded-xl border-black/10 flex flex-col primary-font relative border overflow-hidden">

                    {/* Header Graphic */}
                    <div className="bg_blue w-full py-3 flex flex-col justify-center items-center text-center px-4 rounded-t-xl shrink-0">
                        <p className="primary-font text-white text-3xl uppercase">
                            PROCESS CALENDAR
                        </p>
                    </div>

                    {/* Calendar Grid Container */}
                    <div className="p-3 sm:p-6 flex-1 overflow-x-auto scroller_none relative flex flex-col justify-center">
                        <div className="relative">
                            <div className="relative grid grid-cols-[5rem_repeat(5,1fr)] gap-2">

                                {/* HEADER ROW - WEEKS */}
                                <div className="pb-1 flex items-center justify-center text-xs text-gray-400"></div>

                                {WEEKS.map((week, idx) => (
                                    <div key={idx} className="pb-1">
                                        <div className=" border border-[#002bba40] py-1 flex flex-col items-center justify-center rounded-md text-[#002bba]">
                                            <span className="text-sm">{week.label}</span>
                                            <span className="text-xs uppercase">{week.subtitle}</span>
                                        </div>
                                    </div>
                                ))}

                                {/* DAYS & EVENT CELLS */}
                                {DAYS.map((day) => (
                                    <React.Fragment key={day}>
                                        {/* Day row label */}
                                        <div className="text-xs text-center flex items-center justify-center bg_blue/10 border border-[#002bba40] rounded-md text_blue h-[10vh]">
                                            {day}
                                        </div>

                                        {/* 5 Week Slots */}
                                        {WEEKS.map((_, weekIdx) => {
                                            const weekNum = weekIdx + 1;
                                            const event = CALENDAR_EVENTS.find(e => e.day === day && e.week === weekNum);

                                            if (!event) {
                                                return (
                                                    <div
                                                        key={`${day}-${weekNum}`}
                                                        className="h-[10vh] rounded-md border border-dashed bg_blue/10 text_blue border-[#002bba50]"
                                                    />
                                                );
                                            }

                                            const isTarget = Boolean(event.stage && event.component);

                                            return (
                                                <div
                                                    key={`${day}-${weekNum}`}
                                                    ref={isTarget ? (el) => (gridSlotsRef.current[event.stage] = el) : undefined}
                                                    className="h-[10vh] relative"
                                                >
                                                    <EventCard
                                                        title={event.title}
                                                        tag={event.tag}
                                                        content={event.content}
                                                        bgColor={event.bgColor || "bg_blue"}
                                                        textColor={event.textColor || "text-white"}
                                                        align={event.align || "right"}
                                                        vAlign={event.vAlign || "center"}
                                                        isTarget={isTarget}
                                                        cardRef={isTarget ? (el) => (cardsRef.current[event.stage] = el) : undefined}
                                                        labelRef={isTarget ? (el) => (labelsRef.current[event.stage] = el) : undefined}
                                                        contentRef={isTarget ? (el) => (contentsRef.current[event.stage] = el) : undefined}
                                                        enlargedContent={event.component}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}

                            </div>
                        </div>
                    </div>

                    {/* Destination containers for GSAP Flip (one for each animated stage) */}
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage.stage}
                            ref={(el) => (fullCardsRef.current[i] = el)}
                            className="full_card absolute w-full h-full inset-0 pointer-events-none rounded-xl"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
