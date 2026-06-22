"use client";
import React from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import { useGSAP } from '@gsap/react'
const DetailedExpertiseHero = ({
    expertiseName,
    expertiseHeading,
    btnsLabels,
}) => {


    useGSAP(() => {
        const heading_split = SplitText.create(".heading_split", {
            type: "lines",
            linesClass: "split-line"
        });
        const paragraph_split = SplitText.create(".paragraph_split", {
            type: "lines",
            linesClass: "split-line"
        });

        [...heading_split.lines, ...paragraph_split.lines].forEach((line) => {
            const wrapper = document.createElement("div");

            wrapper.classList.add("line-wrapper");

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set([heading_split.lines, paragraph_split.lines], { yPercent: 100, x: 10 });

        const tl = gsap.timeline({
            delay: 0.5
        })
        tl.to(".content_box", {
            opacity: 1,
            duration: 0.01
        })
        tl.to(heading_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<");
        tl.to(paragraph_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<+0.2");
        tl.to([".blink_btn",], {
            opacity: 1,
            stagger: 0.15
        }, "<");

    });

    return (
        <div className=' content_box opacity-0 padding'>
            <div className="w-full pt-[15vw] pb-40 border-b flex flex-col items-center capitalize text_blue gap-y-5 text-center ">
                <p className='paragraph_split uppercase text-xs'>[ {expertiseName} ] </p>
                <h1 className='heading_split text-8xl primary-font capitalize'>{expertiseHeading}</h1>
                <div className="flex flex-wrap gap-x-1">
                    {btnsLabels.map((item, i) => (
                        <button key={i} className='blink_btn text-xs uppercase px-4 py-2 bg-[#002bba20] leading-none'>{item}</button>
                    ))}
                </div>
            </div>

            <div className="w-full py-14 flex">
                <div className="w-1/2 pr-32 space-y-10 text_blue">
                    <h3 data-para-effect className='text-5xl'>Your website isn’t just a page,
                        it’s the stage. We design and
                        develop digital experiences
                        that capture attention, guide
                        users and drive action.</h3>

                    <p className='text-xl leading-tight'>Smooth in motion. Sharp in function. Built to feel, and built to
                        convert.</p>
                </div>
                <div className="w-1/2 flex flex-col gap-10">
                    <div className="w-full aspect-video overflow-hidden">
                        <video data-img-effect className='cover' loop autoPlay muted playsInline src="https://vz-f76b55f9-7b8.b-cdn.net/2b3c385c-35e7-406c-bb11-8c7d71d90001/playlist.m3u8"></video>
                    </div>
                </div>
            </div>

            <div className="w-full  flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 flex items-end">
                    <p className='w-[50%] leading-tight text-xl text_blue'>
                        Every digital experience should feel effortless. We combine strategy, design and development to create websites that not only look sharp, but actually perform under pressure.    </p>
                </div>

                <div className="w-full md:w-1/2 text_blue">
                    <div className="flex flex-col w-full">
                        {[
                            { label: 'Bounce rate', value: '-41%' },
                            { label: 'Load time', value: '< 1.6s' },
                            { label: 'Engagement duration', value: '+78%' },
                            { label: 'Conversion uplift', value: '+35%' },
                            { label: 'Return visits', value: '+46%' },
                            { label: 'Mobile responsiveness score', value: '98%' },
                            { label: 'Design system reusability', value: '+62%' },
                            { label: 'PageSpeed Insights', value: '94' },
                        ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center py-4 border-b border-[#002bba20] last:border-b-0">
                                <span data-para-effect className="text-xl font-medium">{stat.label}</span>
                                <span className=" font-semibold ">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailedExpertiseHero
