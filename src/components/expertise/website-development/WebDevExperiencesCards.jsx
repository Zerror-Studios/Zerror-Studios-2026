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


import PixelGridCanvas from '@/components/common/PixelGridCanvas';

export const services = [
    {
        title: "Design",
        animationData: iconUiUx,
        description: "Shaped around what you sell."
    },
    {
        title: "Development",
        animationData: icon2,
        description: "Next.js, and a CMS your team can use."
    },
    {
        title: "Scroll and motion",
        animationData: icon1,
        description: "GSAP, with Three.js where it earns its place."
    },
    {
        title: "SEO and AI search",
        animationData: icon3,
        description: "Found on Google, and in AI answers."
    },
    {
        title: "Testing",
        animationData: icon5,
        description: "Checked on real devices, then 30 days of free fixes."
    },
    {
        title: "Hosting and care",
        animationData: iconCloud,
        description: "Fast, secure, looked after every month."
    }
];

const ServiceCard = ({ service }) => {
    const lottieRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isReversingRef = useRef(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (!isPlaying) {
            setIsPlaying(true);
            isReversingRef.current = false;
            lottieRef.current?.setDirection(1);
            lottieRef.current?.goToAndPlay(0, true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="serv_crd relative group rounded-2xl overflow-hidden"
        >
            {/* Custom Canvas Pixel Grid Overlay */}
            <PixelGridCanvas isActive={isHovered} boxSize={30} color="#002bba" duration={1.5} />

            <div
                className="iner_crd w-full h-full cursor-pointer bg-[#002bba10] group-hover:bg-transparent transition-colors duration-300 text-[#002bba] group-hover:text-white rounded-2xl flex flex-col justify-between p-6 md:p-8 relative z-10"
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
                            <h2 data-para-effect className=' primary-font   text-5xl  leading-none'>In every <br /> site</h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p data-para-effect className="font-thin">Not add-ons.</p>
                            <p data-para-effect className="font-thin">Part of the build.</p>
                        </div>
                        <div className="text-3xl md:pl-2">
                            <h3 data-para-effect className="secondary-font">
                                <span className="opacity-0 max-sm:hidden pointer-events-none" aria-hidden="true">...............</span>
                                Six things every site gets, whatever its size. Design, build, motion, search, testing and care, all from the same team.
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