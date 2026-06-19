"use client";
import Button from '@/components/common/Button'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image'
import React, { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger);

const WebDevProcessScroller = () => {

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
        <div ref={containerRef} className='w-full h-[400vw] relative'>
            <div ref={sliderRef} className=" sticky top-0  h-screen flex ">

                <div className="w-screen h-full flex shrink-0">
                    <div className=" padding flex flex-col items-stretch justify-between text_blue py-20!  h-full w-[60%]">
                        <div className="space-y-2">
                            <p>Our  Process</p>
                            <h2 className=' capitalize primary-font   text-5xl  leading-none'>A Clear Process <br /> you can rely on </h2>
                        </div>
                        <div className="w-full flex-1  center">
                            <div className="w-[80%]">
                                <img className='w-full' src={"/images/expertisePage/website-development/process_scroller/img1_a.png"} alt="process img" />
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%] h-full bg_blue py-20! flex gap-y-5 flex-col justify-between items-stretch padding text-white ">
                        <div className="w-full flex justify-between">
                            <h2 className=' capitalize primary-font   text-3xl  leading-none'>Mood Board and  <br />design Direction</h2>
                            <p className='text-8xl primary-font leading-none'>01</p>
                        </div>
                        <div className=" flex-1 w-full  relative overflow-hidden">
                            <Image src="/images/expertisePage/website-development/process_scroller/img1_b.png" alt="process img" fill className='cover' />
                        </div>
                    </div>
                </div>

                <div className="w-screen h-full flex shrink-0">
                    <div className=" padding flex flex-col justify-between items-stretch text_blue py-20!  h-full w-[50%]">
                        <h2 className=' capitalize primary-font   text-5xl  leading-none'>We create low-fi designs to show the structure, flow, and layout. This helps you clearly understand how the website will work.</h2>
                        <div className="w-full flex-1 flex items-end">
                            <h2 className='opacity-20 text-[20rem] leading-41  primary-font'>02</h2>
                        </div>
                    </div>
                    <div className="w-[50%] h-full py-20! flex justify-end padding relative  ">
                        <img src="/images/expertisePage/website-development/process_scroller/img2.png" alt="process img" className='h-full' />
                    </div>
                </div>

                <div className="w-screen h-full py-20 gap-y-10 flex flex-col justify-between items-stretch bg_blue shrink-0">
                    <div className=" padding h-fit flex  py-0!   justify-between text-white">
                        <h2 className='text-8xl leading-none  primary-font'>03</h2>
                        <h2 className=' w-[50%] capitalize primary-font   text-3xl  leading-none'>We design the final high-fi screens with all visuals. We also plan smooth animations and interactions to enhance the experience.</h2>
                    </div>
                    <div className="w-full flex-1 min-h-0 padding py-0! relative">
                        <div className="w-full h-full flex items-end justify-center overflow-hidden">
                            <img
                                src="/images/expertisePage/website-development/process_scroller/img3.png"
                                alt="process img"
                                className="max-h-full max-w-full w-auto h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-screen h-full flex shrink-0">
                    <div className="w-[30%] h-full flex padding py-20! flex-col  justify-between text_blue">
                        <div className="space-y-2">
                            <h2 className=' capitalize primary-font   text-5xl  leading-none'>04</h2>
                            <h2 className=' capitalize primary-font   text-5xl  leading-none'>Development & <br /> launch</h2>
                        </div>
                        <p className='text-3xl leading-none '>Once everything is approved, we move to development.
                            After your review, we launch and can also help with hosting.</p>
                    </div>
                    <div className="w-[70%] h-full flex items-center justify-end py-20! padding ">
                        <img className='h-full object-contain ' src="/images/expertisePage/website-development/process_scroller/img4.png" alt="" />
                    </div>
                </div>

                <div className="w-screen h-full center text-center flex-col gap-y-10 shrink-0">
                    <h2 className='text-5xl leading-none w-1/2 font-semibold text_blue'>You can contact us anytime, and we’re happy to have unlimited meetings whenever needed.</h2>
                    <Button title="Start Building" link="/contact" />
                </div>


            </div>
        </div>
    )
}

export default WebDevProcessScroller