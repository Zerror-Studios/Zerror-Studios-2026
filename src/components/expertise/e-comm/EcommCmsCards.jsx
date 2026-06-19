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
    return (
        <div ref={containerRef} className="w-full h-[250vw] relative">
            <div  className='w-full sticky top-0 overflow-hidden mt-10! md:mt-32! h-screen flex gap-y-[5vh] flex-col justify-center'>
                <div className="w-full   padding py-0!  text_blue ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 className=' capitalize primary-font   text-5xl  leading-none'>Manage your eCommerce with our CMS </h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>Total control, zero </p>
                            <p className='font-thin'>restrictions</p>
                        </div>
                        <div className="capitalize text-3xl  md:pl-2">
                            <h3 className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                From storefront design to backend workflows, everything is tailored to match your brand, processes, and goals.
                            </h3>
                        </div>
                    </div>
                </div>
                <div ref={sliderRef} className=" padding py-0! w-full flex gap-x-5">
                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Smart Inventory Management</h4>
                            <p className='leading-tight'>Monitor sales, Conversion rates .</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_1.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="pl-20 py-20">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_2.png" alt="" />
                        </div>
                        <div className="p-10 space-y-2 w-[80%]">
                            <h4 className='text-3xl primary-font'>Built for Customization</h4>
                            <p className='leading-tight'>Easily customize every part of your store to fit your brand</p>
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Analytics & Reports</h4>
                            <p className='leading-tight'>Monitor sales, Conversion rates and Customer behaviour with detailed Custom Reports</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="pl-10 py-10 pb-0">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_4.png" alt="" />
                        </div>
                        <div className="p-10 space-y-2 w-[80%]">
                            <h4 className='text-3xl primary-font'>SEO tools</h4>
                            <p className='leading-tight'>Expand your reach and show up more in global search engine results with a powerful set.</p>
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Integrations and extensions</h4>
                            <p className='leading-tight'>Unite your digital world through integrations with popular social platforms and multi-media accounts.</p>
                        </div>
                        <div className="p-10">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_5.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Website analytics</h4>
                            <p className='leading-tight'>Monitor sales, Conversion rates and Customer behaviour with detailed Custom Reports</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw] aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Marketing Campaigns</h4>
                            <p className='leading-tight'>Launch bulk mail, SMS Campaign using Designers template direct from your dashboard</p>
                        </div>
                        <div className="">
                            <img src="/images/expertisePage/e-comm/cmsCards/card_3.png" alt="" />
                        </div>
                    </div>

                    <div className="w-[30vw]  aspect-square shrink-0 flex flex-col justify-between text-white rounded-xl bg_blue">
                        <div className="p-10 pb-0 space-y-2 ">
                            <h4 className='text-3xl primary-font'>Review Management</h4>
                            <p className='leading-tight'>Easily customize every part of your store to fit your brand</p>
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