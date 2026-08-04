"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React from 'react';
gsap.registerPlugin(ScrollTrigger)

const disciplines = [
    {
        num: "01",
        title: "STRATEGY",
        subtitle: "[ WHAT DRIVES OUR GROWTH ]",
        list: ["Marketing strategy", "Campaign Planning", "Channel Mix"],
        desc: "Growth without direction is just noise. We dig deep into your goals, your users, your numbers and your niche. Search trends. Competitors. Funnels. Gaps. Then we map where the real leverage lives. What follows? A clear, focused strategy that fits your ambition (and budget).",
    },
    {
        num: "02",
        title: "DATA",
        subtitle: "[ WHAT brings the click ]",
        list: ["Copywriting for Ads", "Landing Pages", "Email Marketing"],
        desc: "Can’t measure it? Can’t grow it. We build solid setups with real insight, from event tracking to server-side logic. Because growth isn’t about chasing clicks. It’s about impact. POAS. Lifetime value. Patterns that matter.",
    },
    {
        num: "03",
        title: "Channels",
        subtitle: "[ WHAT sharpens the edge ]",
        list: ["CRO", "Paid Media", "A/B Testing"],
        desc: "Not every channel is for every brand. We don’t spray and pray, we design the right mix for your funnel. For e-commerce, it’s performance, retention and smart personalization. For B2B, it’s lead engines that connect content, targeting and nurturing in one smart flow.",
    },
    {
        num: "04",
        title: "SEO & AI",
        subtitle: "[ WHAT makes us smile ]",
        list: ["SEO strategy", "AI Content Systems", "Search & AI Insights"],
        desc: "Visibility is shifting. We don’t fight it, we move with it. We use AI to strengthen SEO, sharpen insights and scale content. Not gimmicks. Just smart systems that help brands show up where it counts. In search. In LLMs. In decisions.",
    },
    {
        num: "05",
        title: "Growth that doesn’t quit",
        subtitle: "[ WHAT growth compounds ]",
        list: ["CRO & Experimentation", "Funnel & UX Optimization", "Email & Lifecycle Flows"],
        desc: "Launch ≠ finish line. We analyse, tweak and test, continuously. CRO. Funnel hacks. UX fixes. Email flows. Whatever moves the needle.",
    },
];

const BrandingDisciplines = () => {

    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:".disc_paren",
                start:"top top",
                end:"bottom bottom",
                scrub:true,
            }
        })
        gsap.utils.toArray(".disc_chld").forEach((item, index, array)=>{
            if (index !== array.length - 1) {
                tl.to(item,{
                    height:"5rem",
                    ease: "none"
                })
            }
        })
    })

    return (
        <div className="w-full bg-white">
            {/* Heading */}
            <div className="w-full padding pb-0!  text_blue space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>
                        Everything You Need To Dominate.
                    </h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className='font-thin'>Services</p>
                </div>
                <div className=" text-3xl md:pl-2">
                    <h3 data-para-effect className="leading-tight">
                        <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                        Six core disciplines. One integrated team. Designed to work together for maximum impact.
                    </h3>
                </div>
            </div>

            <div className=" disc_paren w-full  h-[350vh] relative">
                <div className="w-full sticky h-screen top-0 pt-24 flex flex-col justify-start">
                    <div className="w-full border-b border-[#002bba]/20">
                        {disciplines.map((item, index) => (
                            <div
                                key={index}
                                className=" disc_chld w-full border-t border-[#002bba]/20 text_blue overflow-hidden"
                            >
                                <div className="padding py-6! flex flex-col md:flex-row gap-10 md:gap-0 items-start">
                                    <div className="w-full md:w-[20%]">
                                        <h3 data-para-effect className="text-3xl md:text-5xl font-bold leading-none primary-font">{item.num}</h3>
                                    </div>

                                    <div className="w-full md:w-[50%] flex flex-col">
                                        <h3 data-para-effect className="text-3xl md:text-5xl font-bold w-1/2 primary-font uppercase leading-none">{item.title}</h3>

                                        <div className="mt-12 md:mt-24 flex flex-col gap-4">
                                            <p className="text-xs uppercase ">
                                                {item.subtitle}
                                            </p>
                                            <ul className=" md:text-xl mt-2 leading-tight">
                                                {item.list.map((listItem, i) => (
                                                    <li key={i}>{listItem}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-[30%] flex flex-col">
                                        <p data-para-effect className=" md:text-xl leading-tight">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandingDisciplines;