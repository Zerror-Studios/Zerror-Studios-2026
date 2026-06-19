"use client";
import React, { useState } from 'react'

const services = [
    {
        title: "UI/UX Design",
        subtitle: "User Experience",
        image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Front-End and Back-End Engineering",
        subtitle: "Full Stack",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "GSAP Animations",
        subtitle: "Smooth Motion",
        image: "https://images.unsplash.com/photo-1667830867711-183c683aeba2?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Search Engine Optimization",
        subtitle: "Search Growth",
        image: "https://images.unsplash.com/photo-1709281847981-73a69aa6f770?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Testing & Security",
        subtitle: "Safe Systems",
        image: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "AWS Cloud Hosting",
        subtitle: "Cloud Infra",
        image: "https://images.unsplash.com/photo-1597138768744-9f97be8cdd64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const WebDevExperiencesCards = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <>
            <div className="w-full h-screen relative bg_blue flex py-5 flex-col">

                <div className="absolute inset-0 overflow-hidden">
                    {services.map((service, i) => (
                        <img
                            key={i}
                            src={service.image}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ))}
                </div>


                <div className="w-full relative z-10   padding  text-white shrink-0 ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 className=' capitalize primary-font   text-5xl  leading-none'>Built for better <br /> experiences </h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>How We</p>
                            <p className='font-thin'>Build</p>
                        </div>
                        <div className="capitalize text-3xl  md:pl-2">
                            <h3 className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                Everything you need to build a modern, smooth, and high-performing <br /> website.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className=" padding relative z-10 flex-1 w-full grid grid-cols-3  auto-rows-fr  items-stretch gap-5 text_blue">

                    {services.map((service, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="border border-white"
                        >
                            <div
                                className={`iner_crd w-full h-full cursor-pointer bg-white flex flex-col justify-between p-5 transition-opacity duration-500 ${activeIndex === null
                                    ? "opacity-100"
                                    : activeIndex === i
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                            >
                                <div className="w-full flex justify-end">
                                    <p className="secondary-font">{service.subtitle}</p>
                                </div>

                                <h4 className="text-3xl w-1/2 font-semibold">
                                    {service.title}
                                </h4>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default WebDevExperiencesCards