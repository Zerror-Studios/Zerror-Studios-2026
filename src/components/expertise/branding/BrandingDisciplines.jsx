"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React from 'react';
gsap.registerPlugin(ScrollTrigger)

const disciplines = [
    {
        num: "01",
        title: "Identity",
        subtitle: "[ How you look and sound ]",
        list: ["Logo and identity", "Visual system", "Brand voice"],
        desc: "A look and a voice people recognise, written down so everyone uses them the same way.",
    },
    {
        num: "02",
        title: "Social and content",
        subtitle: "[ What people see every week ]",
        list: ["Content calendar", "Reels and carousels", "LinkedIn"],
        desc: "A month of posts, planned ahead, designed in-house, in your voice.",
    },
    {
        num: "03",
        title: "Campaigns",
        subtitle: "[ What brings the click ]",
        list: ["Paid social", "Landing pages", "Email"],
        desc: "Launches, sales and always-on ads, with pages made to match.",
    },
    {
        num: "04",
        title: "SEO and AI search",
        subtitle: "[ Where people find you ]",
        list: ["Monthly SEO", "Articles", "AI visibility"],
        desc: "Show up on Google, and when someone asks an AI about your category.",
    },
    {
        num: "05",
        title: "Growth",
        subtitle: "[ What turns visits into sales ]",
        list: ["CRO audits", "A/B tests", "Email flows"],
        desc: "Launch is not the finish line. We test, fix and keep what works.",
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
        <div data-hide-header className="w-full bg_blue  pt-8 md:pt-16 text-white">
            {/* Heading */}
            <div className="w-full padding pb-0!   space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className='primary-font text-5xl leading-none'>
                        What we do
                    </h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                </div>
                <div className=" text-3xl md:pl-2">
                    <h3 data-para-effect className="leading-tight">
                        <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                        Five disciplines. One team.
                    </h3>
                </div>
            </div>

            <div className=" disc_paren w-full  h-[350vh] relative">
                <div className="w-full sticky h-screen top-0 pt-12 flex flex-col justify-start">
                    <div className="w-full">
                        {disciplines.map((item, index) => (
                            <div
                                key={index}
                                className=" disc_chld w-full border-t border-[#ffffff]/20  overflow-hidden"
                            >
                                <div className="padding py-6! flex flex-col md:flex-row gap-8 md:gap-0 items-start">
                                    <div className="w-full flex gap-x-5 md:w-[20%]">
                                        <h3 data-para-effect className="text-3xl md:text-5xl font-bold leading-none primary-font">{item.num}</h3>
                                        <h3 data-para-effect className=" md:hidden text-3xl md:text-5xl font-bold w- primary-font uppercase leading-none">{item.title}</h3>
                                    </div>

                                    <div className="w-full md:w-[50%] flex flex-col">
                                        <h3 data-para-effect className=" hidden md:block text-3xl md:text-5xl font-bold w-1/2 primary-font uppercase leading-none">{item.title}</h3>

                                        <div className="mt-0 md:mt-24 flex flex-col gap-4">
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