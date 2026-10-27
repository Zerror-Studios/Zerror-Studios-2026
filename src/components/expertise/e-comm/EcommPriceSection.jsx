"use client";
import { RiCheckLine, RiCloseLine } from '@remixicon/react';
import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SectionHeader from "@/components/common/SectionHeader";
gsap.registerPlugin(ScrollTrigger)

const features = [
    { name: "A design made for your brand", zcom: true, shopify: true },
    { name: "No app bills stacking up", zcom: true, shopify: false },
    { name: "Loyalty and referrals built in", zcom: true, shopify: true },
    { name: "Lookbooks and shop the look", zcom: true, shopify: false },
    { name: "WhatsApp campaigns built in", zcom: true, shopify: true },
    { name: "An AI coach and chat control", zcom: true, shopify: false },
    { name: "One team for every change", zcom: true, shopify: false },
];

const CheckIcon = () => (
    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#002bba] text-white flex items-center justify-center">
        <RiCheckLine />
    </div>
);

const CrossIcon = () => (
    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full text-white bg-gray-200 flex items-center justify-center">
        <RiCloseLine />
    </div>
);

const EcommPriceSection = () => {

    useGSAP(() => {
        gsap.from(".sclw_1", {
            scale: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".price_section_table",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
        gsap.from(".sclw_2", {
            scale: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".price_section_table",
                start: "top center",
                toggleActions: "play none none reverse"
            }
        })
    })
    return (
        <div className="w-full padding py-section! text_blue">

            {/* ── Heading, matches InfoSection.jsx ──────────── */}
            <SectionHeader
                title="Why Zcom"
                titleClassName="capitalize"
            >
                Ready-made platforms are built for everyone. Zcom is built for you.
            </SectionHeader>

            {/* ── Comparison Table ────────────────────────────── */}
            <div className="price_section_table w-full mt-block border border-[#002bba]/20 rounded-xl overflow-hidden">

                {/* Table header */}
                <div className="w-full grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] bg_blue text-white">
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center">
                        <p className="h6">Features</p>
                    </div>
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-center">
                        <p className="para-sm font-semibold uppercase tracking-wider">Zcom</p>
                    </div>
                    <div className="px-4 md:px-10 py-4 md:py-6 flex items-center justify-center gap-2">
                        <img src="/icons/shopify.svg" className='w-24' alt="Shopify Icon" />
                    </div>
                </div>

                {/* Feature rows */}
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className={`w-full grid grid-cols-[3fr_1fr_1fr] md:grid-cols-[2fr_1fr_1fr] border-t border-[#002bba]/10 ${i % 2 === 1 ? 'bg-[#f8f9ff]' : 'bg-white'
                            } transition-colors duration-200 hover:bg-[#eef1ff]`}
                    >
                        <div className="px-4 md:px-10 py-5 md:py-7 flex items-center">
                            <p className="para-lg text-[#002bba]">{feature.name}</p>
                        </div>
                        <div className=" sclw_1 px-4 md:px-10 py-5 md:py-7 flex items-center justify-center">
                            {feature.zcom ? <CheckIcon /> : <CrossIcon />}
                        </div>
                        <div className=" sclw_2 px-4 md:px-10 py-5 md:py-7 flex items-center justify-center">
                            {feature.shopify ? <CheckIcon /> : <CrossIcon />}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default EcommPriceSection