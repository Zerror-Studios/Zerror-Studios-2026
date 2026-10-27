"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cmsPoints = [
    {
        num: "01",
        title: "Made for your work",
        desc: "Every screen exists for a reason."
    },
    {
        num: "02",
        title: "Your workflow",
        desc: "Approvals and roles that match how you run."
    },
    {
        num: "03",
        title: "Room to grow",
        desc: "Add features without starting again."
    },
    {
        num: "04",
        title: "Fewer weak spots",
        desc: "No pile of plugins to patch."
    },
    {
        num: "05",
        title: "Fast",
        desc: "For your team, and for your readers."
    }
];

const CustomWhyCms = () => {
    const containerRef = useRef(null);

    const audioPoolRef = useRef([]);
    const poolIndexRef = useRef(0);

    useGSAP(() => {
        const POOL_SIZE = 8;
        const pool = [];
        for (let i = 0; i < POOL_SIZE; i++) {
            const a = new Audio("/audio/tick.mp3");
            a.volume = 1;
            pool.push(a);
        }
        audioPoolRef.current = pool;

        gsap.set(".stroke_circle", {
            transformOrigin: "center center",
        });

        let lastStep = 0;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        tl.to({}, {
            duration: 1,
            ease: "none",


            onUpdate() {
                const progress = tl.progress();

                const rotationDeg = progress * 140;
                const step = Math.floor(rotationDeg / 2);

                if (step !== lastStep) {
                    // Play a tick for every skipped step (covers fast scrolling)
                    const diff = Math.abs(step - lastStep);
                    const ticks = Math.min(diff, POOL_SIZE); // cap to pool size
                    for (let i = 0; i < ticks; i++) {
                        const audio = audioPoolRef.current[poolIndexRef.current % POOL_SIZE];
                        audio.currentTime = 0;
                        audio.play().catch(() => { });
                        poolIndexRef.current++;
                    }
                    lastStep = step;
                }

                gsap.set(".stroke_circle", {
                    rotation: progress * -140
                });

                gsap.set(".arc_container", {
                    "--progress": progress
                });
            }
        });

    });

    return (
        <div
        data-hide-header
            ref={containerRef}
            className="  py-0!  h-[200vh]! bg_blue text-white relative"
        >
            <div className="arc flex flex-col  justify-center">

                <div className="w-full z-2 h-screen absolute inset-0 bg-linear-to-r from-[#002bba] to-transparent"></div>

                <div className="absolute z-1 top-1/2 left-[-5%] -translate-y-1/2 w-screen max-sm:left-[-80%] md:w-[50vw]">
                    <img
                        className="stroke_circle block w-full h-auto"
                        src="/images/expertisePage/custom-cms/stroke_circle.png"
                        alt="Stroke circle Graphic"
                    />
                </div>
                <div className=" top-8 absolute  md:hidden z-10 padding py-0! space-y-2">
                    <h2 data-para-effect>Why custom</h2>
                    <p className='max-w-xs para-lg opacity-80'>Software that fits your team, not the other way round.</p>
                </div>
                <div className=" max-sm:hidden z-10 padding py-0! space-y-2">
                    <h2 data-para-effect>Why custom</h2>
                    <p className='max-w-xs para-lg opacity-80'>Software that fits your team, not the other way round.</p>
                </div>
                <div
                    className="arc_container"
                    style={{
                        "--total-items": cmsPoints.length,
                        "--progress": 0,
                    }}
                >
                    {cmsPoints.map((item, index) => (
                        <div
                            key={index}
                            className={`arc_item flex items-center gap-6`}
                            style={{
                                "--index": index,
                            }}
                        >
                            <span className="h1 translate-y-2.5 arc_num">{item.num}</span>
                            <div className="arc_text flex flex-col max-w-[18rem] w-[18rem] space-y-2 md:max-w-sm whitespace-normal">
                                <h3 className="h4 font-bold">{item.title}</h3>
                                <p className=" leading-tight">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomWhyCms;