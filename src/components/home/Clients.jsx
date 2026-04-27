"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import React, { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

const clientsData = [
    {
        id: 1,
        title: "Vishwa Samudra",
        icon: "/images/homePage/clients/1_Vishwa_Samudra.png"
    },
    {
        id: 2,
        title: "Rupay",
        icon: "/images/homePage/clients/2_Rupay.png"
    },
    {
        id: 3,
        title: "Devgn",
        icon: "/images/homePage/clients/3_Devgn.png"
    },
    {
        id: 4,
        title: "Flipkart",
        icon: "/images/homePage/clients/4_Flipkart.png"
    },
    {
        id: 5,
        title: "Golden",
        icon: "/images/homePage/clients/5_Golden.png"
    },
    {
        id: 6,
        title: "Imagine",
        icon: "/images/homePage/clients/6_Imagine.png"
    },
    {
        id: 7,
        title: "Kuwait Airways",
        icon: "/images/homePage/clients/7_Kuwait.png"
    },
    {
        id: 8,
        title: "TATA Motors",
        icon: "/images/homePage/clients/8_TATA.png"
    },
    {
        id: 9,
        title: "Piramal",
        icon: "/images/homePage/clients/9_Piramal.png"
    },
    {
        id: 10,
        title: "Prominance",
        icon: "/images/homePage/clients/10_Prominance.png"
    },
    {
        id: 11,
        title: "Proost",
        icon: "/images/homePage/clients/11_Proost.png"
    },
    {
        id: 12,
        title: "Punjab Kings",
        icon: "/images/homePage/clients/12_Punjab Kings.png"
    },
    {
        id: 13,
        title: "Flaunt Your Ink",
        icon: "/images/homePage/clients/13_Flaunt Your Ink.png"
    },
    {
        id: 14,
        title: "Shivdutt Das Art Foundation",
        icon: "/images/homePage/clients/14_SDAF.png"
    },
    {
        id: 15,
        title: "Superyou",
        icon: "/images/homePage/clients/15_Superyou.png"
    },
    {
        id: 16,
        title: "The Laundry House",
        icon: "/images/homePage/clients/16_TLH.png"
    },
    {
        id: 17,
        title: "Candor Foods",
        icon: "/images/homePage/clients/17_Candor_Foods.png"
    },
    {
        id: 18,
        title: "Guyana",
        icon: "/images/homePage/clients/18_Guyana.png"
    },
    {
        id: 19,
        title: "Ellementry",
        icon: "/images/homePage/clients/19_Ellementry.png"
    },
    {
        id: 20,
        title: "Dalhousie Public school",
        icon: "/images/homePage/clients/20_Dalhousie.png"
    },
]

const Clients = () => {

    const containerRef = useRef(null);

    useEffect(() => {
        const boxes = containerRef.current.querySelectorAll(".client-box");

        boxes.forEach((box) => {
            const icon = box.querySelector(".client-icon");
            const img = box.querySelector(".client-img");
            const inr_boxes = box.querySelectorAll(".client_innr_box");

            box.addEventListener("mouseenter", () => {
                gsap.killTweensOf([icon, img, inr_boxes]);

                gsap.to(icon, {
                    filter: "invert(100%)",
                    duration: 0.25,
                    ease: "power2.out",
                });

                gsap.to(inr_boxes, {
                    opacity: 1,
                    duration: 0.05,
                    ease: "expo.out",
                    stagger: {
                        each: 0.009,
                        from: "random", // 🔥 much better than random
                    },
                });

                gsap.to(img, {
                    opacity: 1,
                    duration: 0.35,
                    ease: "power2.out",
                });
            });

            box.addEventListener("mouseleave", () => {
                gsap.killTweensOf([icon, img, inr_boxes]);

                gsap.to(icon, {
                    filter: "invert(0%)",
                    duration: 0.25,
                    ease: "power2.in",
                });

                gsap.to(inr_boxes, {
                    opacity: 0,
                    duration: 0.05,
                    ease: "expo.in",
                    stagger: {
                        each: 0.009,
                        from: "random",
                    },
                });

                gsap.to(img, {
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.in",
                });
            });
        });


        return () => {
            boxes.forEach((box) => {
                box.replaceWith(box.cloneNode(true)); // cleanup event listeners
            });
        };
    }, []);

    return (
        <div className=' noise-bg clients_paren relative bg_blue -mt-1 pt-10 text-white w-full'>

            <div className=" relative z-10 md:hidden w-screen space-y-16 mb-10  padding text-white ">
                <div className="">
                    <p className=' split_wrd text-5xl md:text-6xl   primary-font leading-none'>Our <br /> Clients</p>
                </div>
                <div className="text-xs max-sm:hidden ">
                    <p className='split_wrd font-thin'>Brands we’ve </p>
                    <p className='split_wrd font-thin'>worked with.</p>
                </div>
                <div className="text-2xl">
                    <p className=" split_wrd "> We work with startups, studios, and growing brands to design and build digital products that are clear, scalable, and impactful. From strategy to launch, we focus on thoughtful design, clean code, and meaningful user experiences.</p>
                </div>
            </div>

            <div
                ref={containerRef}
                className=" relative z-10 w-full grid grid-cols-3 md:grid-cols-5 ">
                {clientsData.map((item, i) => {
                    return (
                        <div key={i} className="client-box w-full  overflow-hidden border border-white/10 relative aspect-square center">
                            <div className="w-full h-full absolute grid grid-cols-7 pointer-events-none">
                                {[...Array(49)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="client_innr_box w-full aspect-square bg-white opacity-0"
                                    />
                                ))}
                            </div>
                            <div className="w-full h-full center">
                                <img className='client-icon w-[90%] absolute z-[1]' src={item.icon} alt="loading img" />
                                {/* <img
                                    className="client-img absolute w-full h-full object-cover opacity-0 "
                                    src="https://www.zerrorstudios.com/projects/Manifest/manifest_cover.webp"
                                    alt="loading" title="Disrptive"
                                /> */}
                            </div>
                            <div className="w-full  uppercase text-xs md:text-sm absolute z-[4] bottom-0 flex justify-between p-2 md:p-3">
                                <p>{item.title}</p>
                                {/* <p>2025</p> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Clients