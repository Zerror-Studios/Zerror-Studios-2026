"use client";
import React, { useState } from 'react';
import { RiCloseLine } from '@remixicon/react';

const disciplines = [
    {
        num: "01",
        title: "Brand Identity",
        tags: "STRATEGY,\nDESIGN,\nGUIDELINES",
        desc: "We build timeless, adaptable identities that capture your essence and communicate your vision effectively across all touchpoints.",
    },
    {
        num: "02",
        title: "Technical SEO",
        tags: "STRATEGY,\nDESIGN,\nGUIDELINES",
        desc: "We ensure your site is technically sound to maximize crawlability, indexation, and overall search engine performance.",
    },
    {
        num: "03",
        title: "Link Building",
        tags: "STRATEGY,\nDESIGN,\nGUIDELINES",
        desc: "White-hat outreach that earns high-authority backlinks and skyrockets your domain rating through genuine editorial placements.",
    },
    {
        num: "04",
        title: "Content Strategy",
        tags: "STRATEGY,\nDESIGN,\nGUIDELINES",
        desc: "Data-driven content that engages your audience, builds authority, and ranks for the keywords that matter most to your business.",
    }
];

const BrandingDisciplines = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full  bg-white">
            {/* Heading */}
            <div className="w-full padding pb-12! md:pb-24! text_blue space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 className='capitalize primary-font text-5xl leading-none'>
                        Everything You Need To Dominate.
                    </h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p className='font-thin'>Services</p>
                </div>
                <div className="capitalize text-3xl md:pl-2">
                    <h3 className="leading-tight">
                        <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                        Six Core Disciplines. One Integrated Team. Designed To Work Together For Maximum Impact.
                    </h3>
                </div>
            </div>

            {/* Accordion List */}
            <div className="w-full border-b border-[#002bba]/20">
                {disciplines.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`w-full border-t border-[#002bba]/20 transition-colors duration-300 cursor-pointer ${
                                isOpen ? 'bg-[#002bba] text-white' : 'bg-white text-[#002bba]'
                            }`}
                            onClick={() => toggleOpen(index)}
                        >
                            <div className="padding py-8! md:py-10! flex flex-col w-full">
                                {/* Top visible row */}
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex gap-4 md:gap-6 text-3xl  items-baseline">
                                        <span className="">{item.num}</span>
                                        <h4 className="">{item.title}</h4>
                                    </div>

                                    <div className="flex items-center gap-6 md:gap-16">
                                        <p className="text-xs uppercase  whitespace-pre-line hidden md:block leading-snug">
                                            {item.tags}
                                        </p>
                                        <button
                                            className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                                isOpen ? 'bg-white text-[#002bba]' : 'bg-[#002bba] text-white'
                                            }`}
                                        >
                                            <RiCloseLine
                                                size={24}
                                                className={`transition-transform duration-300 ${isOpen ? 'rotate-0' : '-rotate-45'}`}
                                            />
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-8 md:mt-24' : 'grid-rows-[0fr] opacity-0 mt-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="w-full md:w-[40%] text-xl leading-tight">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BrandingDisciplines;