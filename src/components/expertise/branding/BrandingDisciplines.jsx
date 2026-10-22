import React from 'react';

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

// Height of each card's title strip; cards stick this far apart so earlier titles stay visible
const STACK_STEP = 6; // rem

const BrandingDisciplines = () => {
    return (
        <div data-hide-header className="w-full bg_blue py-8 md:py-16 text-white">
            <div className="padding sticky w-full space-y-12 md:space-y-16">

                {/* ── Heading (matches about/InfoSection layout) ── */}
                <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className="primary-font text-5xl leading-none">What <br /> we do</h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                        <p className="font-thin">Five disciplines,</p>
                        <p className="font-thin">one team.</p>
                    </div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect className="secondary-font">
                            <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
                            Identity, content, campaigns, search and growth, run by the same people.
                        </h3>
                    </div>
                </div>

                {/* ── Stacking discipline cards (sticky on desktop) ── */}
                <div className="w-full relative">
                    {disciplines.map((item, index) => (
                        <div
                            key={index}
                            className="w-full bg_blue border-t border-white/20 md:sticky md:min-h-[22rem]"
                            style={{ top: `${index * STACK_STEP}rem`, zIndex: index + 1 }}
                        >
                            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                                {/* Left: number + title */}
                                <div className="flex items-start gap-x-5">
                                    <h3 className="text-3xl md:text-5xl font-bold leading-none primary-font shrink-0">
                                        {item.num}
                                    </h3>
                                    <h3 className="text-3xl md:text-5xl font-bold primary-font uppercase leading-none">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Right: what's included + description */}
                                <div className="flex flex-col gap-6 md:gap-8 md:pt-24">
                                    <p className="text-3xl">
                                        {item.desc}
                                    </p>
                                    <ul className="border-b border-white/15">
                                        {item.list.map((listItem, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center justify-between gap-4 border-t border-white/15 py-3 text-xl"
                                            >
                                                <span>{listItem}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandingDisciplines;