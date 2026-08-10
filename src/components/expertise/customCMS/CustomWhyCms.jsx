"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cmsPoints = [
    {
        num: "01",
        title: "No Limitations",
        desc: "You're not restricted by templates or pre-built structures. Everything is designed specifically for your needs."
    },
    {
        num: "02",
        title: "Tailored Workflow",
        desc: "Streamline your content management with an intuitive interface that matches your team's exact processes."
    },
    {
        num: "03",
        title: "Scalable Architecture",
        desc: "Built to grow with your business. Add new features, integrations, and content types without breaking the system."
    },
    {
        num: "04",
        title: "Enhanced Security",
        desc: "Custom solutions eliminate the vulnerabilities of popular open-source plugins, keeping your data protected."
    },
    {
        num: "05",
        title: "Blazing Performance",
        desc: "Optimized code and databases ensure faster load times, better SEO rankings, and an exceptional user experience."
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
            ref={containerRef}
            className="  py-0!  h-[200vh]! bg_blue text-white relative"
        >
            <div className="arc flex flex-col  justify-center">

                <div className="w-full z-2 h-screen absolute inset-0 bg-linear-to-r from-[#002bba] to-transparent"></div>

                <div className="absolute z-1 top-1/2 left-[-5%] -translate-y-1/2 w-[50vw]">
                    <img
                        className="stroke_circle block w-full h-auto"
                        src="/images/expertisePage/custom-cms/stroke_circle.png"
                        alt="Stroke circle Graphic"
                    />
                </div>

                <div className=" padding  z-10 py-0!  w-[25%] top-24 right-0  absolute text-3xl  md:pl-2">
                    <h3 data-para-effect className="">
                        A custom CMS gives you the freedom to build exactly what you need.
                    </h3>
                </div>
                <div className=" z-10 padding py-0! space-y-2">
                    <p data-para-effect className='capitalize w-[60%] text-xs'>what we build</p>
                    <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'> Why  <br /> Go Custom?</h2>
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
                            <span className=" primary-font text-5xl md:text-8xl translate-y-2.5 arc_num">{item.num}</span>
                            <div className="arc_text flex flex-col max-w-[200px] space-y-2 md:max-w-sm whitespace-normal">
                                <h4 className="font-bold text-3xl">{item.title}</h4>
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