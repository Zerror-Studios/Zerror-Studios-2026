"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
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
                            <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Meet Zcom.</h2>
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
                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Smart Inventory Management</h4>
                            <p className='leading-tight'>Monitor sales, Conversion rates .</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_1.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="pl-20 py-20">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_2.png" alt="" />
                        </div>
                        <div className="p-10 space-y-2 w-[80%]">
                            <h4 className='text-3xl primary-font'>Made for your model</h4>
                            <p className='leading-tight'>Pre-orders, drops, made-to-order: workflows templates refuse, built in from day one.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Live inventory</h4>
                            <p className='leading-tight'>Stock tied to real production, updated in real time, visible at a glance.</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="pl-10 py-10 pb-0">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_4.png" alt="" />
                        </div>
                        <div className="p-10 space-y-2 w-[80%]">
                            <h4 className='text-3xl primary-font'>Analytics that answe</h4>
                            <p className='leading-tight'>Sales, conversion and customer behaviour in reports built around your questions.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Built-in loyalty & referrals</h4>
                            <p className='leading-tight'> Repeat business by design, without a plugin bill attached.</p>
                        </div>
                        <div className="p-10">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_5.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Campaigns from the dashboard</h4>
                            <p className='leading-tight'> Email, SMS and WhatsApp, sent from where you already work.</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Search-ready structure</h4>
                            <p className='leading-tight'> Clean architecture that search engines, and AI engines, can actually read.</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw]  cms_crd aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Yours, fully</h4>
                            <p className='leading-tight'>Complete IP ownership on full payment. Your store, your system, your asset.</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EcommCmsCards