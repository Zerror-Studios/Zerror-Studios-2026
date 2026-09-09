"use client";
import React, { useRef, useState } from 'react'
import iconUiUx from "../../../../public/icons/animatedJson/iconUiUx.json";
import icon1 from "../../../../public/icons/animatedJson/icon1.json";
import icon2 from "../../../../public/icons/animatedJson/icon2.json";
import icon3 from "../../../../public/icons/animatedJson/icon3.json";
import icon5 from "../../../../public/icons/animatedJson/icon5.json";
import iconCloud from "../../../../public/icons/animatedJson/iconCloud.json";
import Lottie from 'lottie-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


const services = [
    {
        title: "UI/UX Design",
        animationData: iconUiUx,
        description: "Creating intuitive interfaces that enhance usability and user satisfaction."
    },
    {
        title: "Full Stack Development",
        animationData: icon2,
        description: "Building scalable frontend and backend solutions for modern applications."
    },
    {
        title: "GSAP Animations",
        animationData: icon1,
        description: "Crafting smooth interactive animations that elevate digital experiences."
    },
    {
        title: "SEO Optimization",
        animationData: icon3,
        description: "Improving search visibility to drive organic traffic and growth."
    },
    {
        title: "Testing & Security",
        animationData: icon5,
        description: "Ensuring reliable performance through rigorous testing and protection."
    },
    {
        title: "AWS Cloud Hosting",
        animationData: iconCloud,
        description: "Deploying secure cloud infrastructure with scalable hosting solutions."
    }
];

const ServiceCard = ({ service }) => {
    const lottieRef = useRef(null);
    const cardRef = useRef(null);
    const tlRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const isReversingRef = useRef(false);

    useGSAP(() => {
        if (!cardRef.current) return;
        const blocks = cardRef.current.querySelectorAll(".grid_blocks");

        tlRef.current = gsap.timeline({
            paused: true,
            defaults: {
                ease: "power2.out",
            },
        }).to(blocks, {
            opacity: 1,
            duration: 0.04,
            ease: "expo.out",
            stagger: {
                each: 0.003,
                from: "random",
            },
        });
    }, { scope: cardRef });

    const handleMouseEnter = () => {
        tlRef.current?.play();
        if (!isPlaying) {
            setIsPlaying(true);
            isReversingRef.current = false;
            lottieRef.current?.setDirection(1);
            lottieRef.current?.goToAndPlay(0, true);
        }
    };

    const handleMouseLeave = () => {
        tlRef.current?.reverse();
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="serv_crd relative group rounded-2xl overflow-hidden"
        >
            {/* Pixel Grid Blocks Overlay */}
            <div className="absolute inset-0 grid grid-cols-[repeat(15,1fr)] z-10">
                {[...Array(120)].map((_, i) => (
                    <div
                        key={i}
                        className="grid_blocks shrink-0 w-full aspect-square bg-[#002bba] opacity-0 pointer-events-none"
                    />
                ))}
            </div>

            <div
                className="iner_crd w-full h-full cursor-pointer bg-[#f4f4f4] group-hover:bg-transparent transition-colors duration-300 text-[#002bba] group-hover:text-white rounded-2xl flex flex-col justify-between p-6 md:p-8 relative z-10"
            >
                <div className="w-18 h-18 flex justify-start text-[#002bba] group-hover:text-white [&_path]:!stroke-current [&_path]:!fill-current transition-colors duration-300 relative z-10">
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={service?.animationData}
                        autoplay={false}
                        loop={false}
                        onDOMLoaded={() => {
                            setIsPlaying(true);
                            isReversingRef.current = false;
                            lottieRef.current?.setDirection(1);
                            lottieRef.current?.goToAndPlay(0, true);
                        }}
                        onComplete={() => {
                            if (!isReversingRef.current) {
                                isReversingRef.current = true;
                                lottieRef.current?.setDirection(-1);
                                lottieRef.current?.play();
                            } else {
                                setIsPlaying(false);
                                isReversingRef.current = false;
                                lottieRef.current?.setDirection(1);
                            }
                        }}
                    />
                </div>

                <div className="flex flex-col mt-12 space-y-2 relative z-10">
                    <h4 className="text-xl font-semibold text-[#002bba] group-hover:text-white transition-colors duration-300">
                        {service.title}
                    </h4>
                    <p className="font-medium leading-tight w-[85%] text-[#002bba]/80 group-hover:text-white/90 transition-colors duration-300">
                        {service.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const WebDevExperiencesCards = () => {

    const containerRef = useRef()

    useGSAP(() => {
        gsap.from(".serv_crd", {
            y: 100,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
    })
    return (
        <>
            <div ref={containerRef} className="w-full  relative text_blue flex py-8 md:py-16 space-y-8 md:space-y-16 flex-col">

                <div className="w-full relative z-10   padding  shrink-0 ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Built for better <br /> experiences </h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>How We</p>
                            <p className='font-thin'>Build</p>
                        </div>
                        <div className=" text-3xl  md:pl-2">
                            <h3 data-para-effect className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                Everything you need to build a modern, smooth, and high-performing <br /> website.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className=" padding relative z-10 flex-1 w-full grid grid-cols-1 md:grid-cols-3  auto-rows-fr  items-stretch gap-5 text_blue">

                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default WebDevExperiencesCards