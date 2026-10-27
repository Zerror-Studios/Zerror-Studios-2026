"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Flip from 'gsap/dist/Flip';
import { RiAddLine } from '@remixicon/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip);
}

export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Builds the calendar columns and events from a list of process steps.
// steps: [{ when?, title, line, events?: [{ title, day?, row?, line?, stage?, component? }] }]
// Each step becomes one column. Events with a day sit on that weekday row (MON to SAT),
// and the calendar shows the days down the left side.
// A step without events gets one card holding its line, placed on a diagonal.
export const buildCalendar = (steps = []) => {
    const total = steps.length;
    const useDays = steps.some((step) => step.events?.some((ev) => ev.day));

    const columns = steps.map((step, i) => ({
        label: step.when || `Step ${i + 1}`,
        subtitle: step.title,
        short: String(i + 1).padStart(2, '0'),
        line: step.line,
    }));

    const rawEvents = steps.flatMap((step, col) => {
        const list = step.events && step.events.length > 0
            ? step.events
            : [{ title: step.line, row: col, auto: true }];

        return list.map((ev) => {
            const dayName = ev.day ? ev.day.charAt(0) + ev.day.slice(1).toLowerCase() : null;
            const when = [step.when || `Step ${col + 1} of ${total}`, dayName].filter(Boolean).join(' · ');
            const content = `### ${ev.auto ? step.title : ev.title}\n**When:** ${when}\n\n- ${ev.line || step.line}`;

            return {
                col,
                row: useDays && ev.day ? DAYS.indexOf(ev.day) : ev.row ?? col,
                title: ev.title,
                line: ev.line || step.line,
                when,
                tag: dayName ? `${columns[col].label} · ${dayName}` : columns[col].label,
                content,
                stage: ev.stage,
                component: ev.component,
                auto: Boolean(ev.auto),
            };
        });
    });

    const rowCount = useDays ? DAYS.length : Math.max(total, 1, ...rawEvents.map((e) => e.row + 1));

    const events = rawEvents.map((e) => ({
        ...e,
        align: e.col >= Math.ceil(total / 2) ? 'left' : 'right',
        vAlign: e.row < rowCount / 3 ? 'top' : e.row >= (rowCount * 2) / 3 ? 'bottom' : 'center',
    }));

    return { columns, events, rowCount, days: useDays ? DAYS : null };
};

const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) {
            return <div key={i} className="text-xl md:text-2xl mb-3 ">{line.replace('### ', '')}</div>;
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
    content,
    align = "right",
    vAlign = "center",
    isTarget = false,
    isOpen = false,
    isFaded = false,
    onToggle = null,
    cardRef = null,
    labelRef = null,
    contentRef = null,
    enlargedContent = null
}) => {
    const localCardRef = useRef(null);

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

    const handleMouseEnter = () => {
        if (localCardRef.current) {
            gsap.to(localCardRef.current, {
                backgroundColor: "#002bba",
                color: "#ffffff",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    };

    const handleMouseLeave = (e) => {
        if (e && e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
            return;
        }
        if (localCardRef.current && !isOpen) {
            gsap.to(localCardRef.current, {
                backgroundColor: "#DFE4F6",
                color: "#002bba",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    };

    useEffect(() => {
        if (!localCardRef.current) return;
        if (isOpen) {
            gsap.to(localCardRef.current, {
                backgroundColor: "#002bba",
                color: "#ffffff",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });
        } else {
            gsap.to(localCardRef.current, {
                backgroundColor: "#DFE4F6",
                color: "#002bba",
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto"
            });
        }
    }, [isOpen]);

    const togglePopup = (e) => {
        e.stopPropagation();
        if (content && onToggle) {
            onToggle();
        }
    };

    return (
        <div
            ref={setCombinedCardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseOut={handleMouseLeave}
            className={` text-[#002bba] bg-[#DFE4F6] rounded-md p-1 md:p-2.5 h-full w-full flex flex-col justify-between relative transition-opacity duration-300 ${isOpen
                ? 'z-[5000]! active-card-container opacity-100 shadow-md'
                : isFaded
                    ? 'opacity-50 hover:opacity-60 z-10 cursor-pointer'
                    : 'opacity-100 z-10'
                } ${isTarget
                    ? `target_blue_card pointer-events-auto`
                    : ''
                }`}
        >
            {/* Card Header / Title */}
            <div
                onClick={togglePopup}
                ref={labelRef} className="card_label w-full cursor-pointer h-full flex flex-col justify-between relative">
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className="font-thin text-[8px] sm:text-xs md:text-base leading-[1.1] md:leading-normal max-sm:line-clamp-2 overflow-hidden">{title}</div>
                    <div className="justify-end p-0.5 md:p-1 flex items-end w-full">
                        <div
                            className={`size-3.5 md:size-5 bg-white center rounded-sm text_blue transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                        >
                            <RiAddLine className='size-2.5 md:size-4' />
                        </div>
                    </div>
                </div>

                {/* Popup Details Card */}
                {content && (
                    <div
                        className={`card-popup max-sm:fixed md:absolute max-sm:left-1/2 max-sm:top-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 md:${popupX} md:${popupY} w-[90vw] sm:w-[21rem] md:w-[23rem] rounded-lg shadow-[0_25px_60px_-15px_rgba(0,43,186,0.3)] p-4 md:p-5 transition-all duration-300 overflow-y-auto scroller_none border border-black/10 bg-white text_blue ${isOpen
                            ? 'opacity-100 max-sm:scale-100 md:translate-x-0 visible pointer-events-auto z-[9999]'
                            : 'opacity-0 max-sm:scale-95 invisible pointer-events-none ' + (align === 'left' ? 'md:translate-x-2' : 'md:-translate-x-2')
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

const Calendar = ({ columns = [], events = [], rowCount = 6, days = null }) => {
    const containerRef = useRef(null);
    const fullCardsRef = useRef([]);
    const gridSlotsRef = useRef({});
    const cardsRef = useRef({});
    const labelsRef = useRef({});
    const contentsRef = useRef({});
    const [activeCardKey, setActiveCardKey] = useState(null);
    const [activeScrollStage, setActiveScrollStage] = useState(null);
    const activeScrollStageRef = useRef(null);

    // Animated stages: events that carry an enlarged mockup component
    const stages = useMemo(() => events.filter(e => e.stage && e.component), [events]);
    const hasStages = stages.length > 0;
    const rows = useMemo(() => Array.from({ length: rowCount }, (_, i) => i), [rowCount]);

    const currentActiveKey = activeCardKey || activeScrollStage;
    let activeCol = null;
    let activeRow = null;
    if (currentActiveKey) {
        const parts = currentActiveKey.split('-');
        activeRow = parseInt(parts[0], 10);
        activeCol = parseInt(parts[1], 10);
    }

    useEffect(() => {
        if (!activeCardKey) return;

        let startY = window.scrollY;
        let accumulatedScroll = 0;

        const handleWindowScroll = (e) => {
            // Ignore scroll events originating inside elements like the popup itself
            if (e.target && e.target !== window && e.target !== document) {
                return;
            }

            const currentY = window.scrollY;
            const delta = Math.abs(currentY - startY);
            startY = currentY;
            accumulatedScroll += delta;

            // Only close if window scrolled significantly (> 80px)
            if (accumulatedScroll > 80) {
                setActiveCardKey(null);
            }
        };

        const handleDocumentClick = (e) => {
            if (e.target && e.target.closest && (e.target.closest('.card-popup') || e.target.closest('.active-card-container'))) {
                return;
            }
            setActiveCardKey(null);
        };

        const timer = setTimeout(() => {
            document.addEventListener('click', handleDocumentClick);
        }, 50);

        window.addEventListener('scroll', handleWindowScroll, { passive: true });

        return () => {
            clearTimeout(timer);
            document.removeEventListener('click', handleDocumentClick);
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, [activeCardKey]);

    useGSAP(() => {
        if (!hasStages) return;

        const updateActiveScrollStage = (stageKey) => {
            if (activeScrollStageRef.current !== stageKey) {
                activeScrollStageRef.current = stageKey;
                setActiveScrollStage(stageKey);
            }
        };

        const stageData = stages.map((stage, i) => {
            const card = cardsRef.current[stage.stage];
            const fullCard = fullCardsRef.current[i];
            const gridSlot = gridSlotsRef.current[stage.stage];
            const content = contentsRef.current[stage.stage];
            const label = labelsRef.current[stage.stage];
            return { stage, card, fullCard, gridSlot, content, label, i };
        });

        // Ensure all stages are present in DOM
        const validStages = stageData.filter(s => s.card && s.fullCard && s.gridSlot);
        if (validStages.length !== stages.length) return;

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
                onLeave: () => updateActiveScrollStage(null),
                onLeaveBack: () => updateActiveScrollStage(null),
            },
        });

        // Build sequential timeline dynamically for all valid stages
        validStages.forEach((s, idx) => {
            const tween = flipTweens[idx];
            const prog = progressValues[idx];
            const stageKey = `${s.stage.row}-${s.stage.col}`;

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
                    if (prog.val > 0.05) {
                        updateActiveScrollStage(stageKey);
                    } else if (activeScrollStageRef.current === stageKey) {
                        updateActiveScrollStage(null);
                    }
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
                    if (prog.val < 0.05 && activeScrollStageRef.current === stageKey) {
                        updateActiveScrollStage(null);
                    } else if (prog.val >= 0.05) {
                        updateActiveScrollStage(stageKey);
                    }
                },
            }, "<");

            // Reset z-index after animation completes
            tl.set(s.card, { zIndex: "auto" });
            tl.set(s.fullCard, { zIndex: "auto" });


            // Short transition pause between stages (if not last stage)
            if (idx < validStages.length - 1) {
                tl.call(() => updateActiveScrollStage(null));
                tl.to({}, { duration: 0.2 });
            }
        });

        ScrollTrigger.refresh();

        return () => {
            updateActiveScrollStage(null);
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

    return (
        <div ref={containerRef} className={`w-full relative ${hasStages ? 'h-[1000vh]' : ''}`}>
            <div className="w-full h-screen padding py-8 md:py-12 sticky top-0 center">
                <div className="w-full h-full primary-font relative overflow-hidden">
                    <div
                        className="relative w-full h-full grid gap-1 md:gap-2"
                        style={{
                            gridTemplateColumns: `${days ? '8rem ' : ''}repeat(${columns.length}, minmax(0, 1fr))`,
                            gridTemplateRows: `auto repeat(${rowCount}, minmax(0, 1fr))`,
                        }}
                    >

                        {/* Empty corner above the day labels */}
                        {days && <div />}

                        {/* HEADER ROW - ONE COLUMN PER STEP */}
                        {columns.map((column, idx) => {
                            const isColActive = currentActiveKey ? activeCol === idx : true;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-md flex flex-col items-center justify-center py-2 md:py-4 transition-colors duration-300 ${isColActive ? 'opacity-100 text-white bg_blue' : 'opacity-50 text_blue bg-[#DFE4F6]'}`}
                                >
                                    <span className="text-[10px] md:text-sm uppercase max-sm:hidden">{column.label}</span>
                                    <span className="text-[10px] md:text-sm sm:hidden font-bold">{column.short}</span>
                                    <span className="text-[8px] md:text-sm uppercase text-center max-sm:leading-[1] max-sm:px-0.5">{column.subtitle}</span>
                                </div>
                            );
                        })}

                        {/* EVENT CELLS */}
                        {rows.map((row) => (
                            <React.Fragment key={row}>
                                {/* Day row label */}
                                {days && (
                                    <div
                                        className={`text-sm font-semibold rounded-md text-center flex items-center justify-center transition-colors duration-300 ${!currentActiveKey || activeRow === row ? 'opacity-100 text-white bg_blue' : 'opacity-50 text_blue bg-[#DFE4F6]'}`}
                                    >
                                        {days[row]}
                                    </div>
                                )}

                                {columns.map((_, col) => {
                                    const event = events.find(e => e.row === row && e.col === col);
                                    const eventKey = `${row}-${col}`;

                                    if (!event) {
                                        return (
                                            <div
                                                key={eventKey}
                                                className={`h-full border border-dashed rounded-md text_blue border-[#002bba50] transition-opacity duration-300 ${currentActiveKey ? 'opacity-50' : 'opacity-100'}`}
                                            />
                                        );
                                    }

                                    const isTarget = Boolean(event.stage && event.component);
                                    const isCardOpen = activeCardKey === eventKey;
                                    const isCardActive = currentActiveKey === eventKey;
                                    const isFaded = Boolean(currentActiveKey && !isCardActive);

                                    return (
                                        <div
                                            key={eventKey}
                                            ref={isTarget ? (el) => (gridSlotsRef.current[event.stage] = el) : undefined}
                                            className={`relative rounded-md border h-full transition-all duration-300 ${isCardOpen
                                                ? 'z-50 border-[#002bba]'
                                                : isFaded
                                                    ? 'border-[#DFE4F6]/40 z-auto'
                                                    : 'border-[#DFE4F6] z-auto'
                                                }`}
                                        >
                                            <EventCard
                                                title={event.title}
                                                content={event.content}
                                                align={event.align || "right"}
                                                vAlign={event.vAlign || "center"}
                                                isTarget={isTarget}
                                                isOpen={isCardOpen}
                                                isFaded={isFaded}
                                                onToggle={() => setActiveCardKey(prev => prev === eventKey ? null : eventKey)}
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

                    {/* Destination containers for GSAP Flip (one for each animated stage) */}
                    {stages.map((stage, i) => {
                        const isStageOpen = activeCardKey === `${stage.row}-${stage.col}`;
                        return (
                            <div
                                key={stage.stage}
                                ref={(el) => (fullCardsRef.current[i] = el)}
                                className={`full_card absolute ${days ? 'w-[calc(100%-8.5rem)]' : 'w-full'} h-[calc(100%-3rem)] md:h-[calc(100%-5rem)] bottom-0 right-0 pointer-events-none ${isStageOpen ? 'z-[5000]' : ''}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
