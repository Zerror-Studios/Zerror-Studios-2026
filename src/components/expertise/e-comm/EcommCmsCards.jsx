"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);


const EcommCmsCards = () => {

    const containerRef = useRef(null);
    const sliderRef = useRef(null);

    useGSAP(() => {
        const slider = sliderRef.current;

        const scrollWidth = slider.scrollWidth;
        const viewportWidth = window.innerWidth;

        const maxTranslate = scrollWidth - viewportWidth;

        gsap.to(slider, {
            x: -maxTranslate,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `bottom bottom`,
                scrub: true,
            },
        });
    });

    useGSAP(() => {
        gsap.from(".cms_crd", {
            xPercent: 100,
            opacity: 0,
            stagger: 0.15,
            scrollTrigger: {
                trigger: sliderRef.current,
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
    })
    return (
        <div ref={containerRef} className="w-full h-[250vw] relative">
            <div className='w-full sticky top-0 overflow-hidden mt-10! md:mt-24! h-screen flex gap-y-[5vh] flex-col justify-center'>
                <div className="w-full   padding py-0!  text_blue ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Explore Zcom.</h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>Total control,  </p>
                            <p className='font-thin'>zero restrictions.</p>
                        </div>
                        <div className=" text-3xl  md:pl-2">
                            <h3 data-para-effect className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                Our own commerce platform. Not a theme, not a template — a system that bends to your business.
                            </h3>
                        </div>
                    </div>
                </div>
                <div ref={sliderRef} className=" padding py-0! w-full flex gap-x-5">
                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-start text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img1.webp" alt="Smart Inventory & Orders" fill className="object-cover absolute z-0" />
                        <div className="p-10 pb-0 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Smart Inventory & Orders</h4>
                            <p className='leading-tight'>Real-time stock tracking and order management engineered for seamless daily store operations.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-end text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img2.webp" alt="Made For Your Model" fill className="object-cover absolute z-0" />
                        <div className="p-10 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Made For Your Model</h4>
                            <p className='leading-tight'>Pre-orders, drops, and custom workflows built in from day one without template limits.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-start text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img3.webp" alt="Live Production Sync" fill className="object-cover absolute z-0" />
                        <div className="p-10 pb-0 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Live Production Sync</h4>
                            <p className='leading-tight'>Stock levels tied directly to production, updated instantly and visible at a single glance.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-end text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img4.webp" alt="Analytics That Answer" fill className="object-cover absolute z-0" />
                        <div className="p-10 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Analytics That Answer</h4>
                            <p className='leading-tight'>Sales trends, conversion rates, and customer behavior reports tailored to your key metrics.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-start text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img5.webp" alt="Built-In Loyalty System" fill className="object-cover absolute z-0" />
                        <div className="p-10 pb-0 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Built-In Loyalty System</h4>
                            <p className='leading-tight'>Drive repeat purchases with automated rewards and referrals without costly third-party apps.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-end text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img6.webp" alt="Unified Admin Campaigns" fill className="object-cover absolute z-0" />
                        <div className="p-10 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Unified Admin Campaigns</h4>
                            <p className='leading-tight'>Launch targeted Email, SMS, and WhatsApp campaigns directly inside your store dashboard.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-start text-white rounded-xl bg_blue">
                        <Image src="/images/expertisePage/e-comm/cmsCards/img7.webp" alt="Search & AI Architecture" fill className="object-cover absolute z-0" />
                        <div className="p-10 pb-0 space-y-2 relative z-10">
                            <h4 className='text-3xl primary-font'>Search & AI Architecture</h4>
                            <p className='leading-tight'>Clean semantic structure designed so modern search engines and AI discovery tools index you fast.</p>
                        </div>
                    </div>

                    <div className="pr-4 md:pr-10">
                        <div className="w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col justify-start text-white rounded-xl bg_blue">
                            <Image src="/images/expertisePage/e-comm/cmsCards/img8.webp" alt="Complete IP Ownership" fill className="object-cover absolute z-0" />
                            <div className="p-10 pb-0 space-y-2 relative z-10">
                                <h4 className='text-3xl primary-font'>Complete IP Ownership</h4>
                                <p className='leading-tight'>Full code and data ownership with zero recurring platform fees or proprietary lock-in.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EcommCmsCards