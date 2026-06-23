"use client";
import React, { useRef, useState } from 'react'
import icon1 from "../../../../public/icons/animatedJson/icon1.json";
import icon2 from "../../../../public/icons/animatedJson/icon2.json";
import icon3 from "../../../../public/icons/animatedJson/icon3.json";
import icon4 from "../../../../public/icons/animatedJson/icon4.json";
import icon5 from "../../../../public/icons/animatedJson/icon5.json";
import icon6 from "../../../../public/icons/animatedJson/icon6.json";
import Lottie from 'lottie-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)


const services = [
    {
        title: "UI/UX Design",
        // animationData: icon4,
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
        // animationData: icon6,
        description: "Deploying secure cloud infrastructure with scalable hosting solutions."
    }
];

const ServiceCard = ({ service }) => {
    const lottieRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const isReversingRef = useRef(false);

    const handleMouseEnter = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            isReversingRef.current = false;
            lottieRef.current?.setDirection(1);
            lottieRef.current?.goToAndPlay(0, true);
        }
    };
    return (
        <div
            onMouseEnter={handleMouseEnter}
            className=" serv_crd relative group "
        >
            <div
                className={`iner_crd w-full  cursor-pointer bg-[#f4f4f4] group-hover:bg-[#002bba] transition-all duration-300 hover:text-white rounded-2xl flex flex-col justify-between p-6 md:p-8 `}
            >
                <div className="w-18 h-18 flex justify-start text-[#002bba] group-hover:text-white [&_path]:!stroke-current [&_path]:!fill-current transition-colors duration-300">
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

                <div className="flex flex-col mt-12 space-y-2">
                    <h4 className="text-xl font-semibold ">
                        {service.title}
                    </h4>
                    <p className=" font-medium leading-tight w-[85%]">
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
            <div ref={containerRef} className="w-full  relative text_blue flex py-5 flex-col">

                <div className="w-full relative z-10   padding  shrink-0 ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Built for better <br /> experiences </h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>How We</p>
                            <p className='font-thin'>Build</p>
                        </div>
                        <div className="capitalize text-3xl  md:pl-2">
                            <h3 data-para-effect className="">
                                <span  className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                Everything you need to build a modern, smooth, and high-performing <br /> website.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className=" padding relative z-10 flex-1 w-full grid grid-cols-3  auto-rows-fr  items-stretch gap-5 text_blue">

                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default WebDevExperiencesCards