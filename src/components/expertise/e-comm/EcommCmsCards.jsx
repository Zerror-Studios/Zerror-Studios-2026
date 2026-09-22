"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react';
import Image from 'next/image';
import SmartInventoryAnim from './cmsCardAnimations/SmartInventoryAnim';
import WorkflowModelAnim from './cmsCardAnimations/WorkflowModelAnim';
import ProductionSyncAnim from './cmsCardAnimations/ProductionSyncAnim';
import AnalyticsAnswerAnim from './cmsCardAnimations/AnalyticsAnswerAnim';
import LoyaltySystemAnim from './cmsCardAnimations/LoyaltySystemAnim';
import AdminCampaignsAnim from './cmsCardAnimations/AdminCampaignsAnim';
import SearchAiArchAnim from './cmsCardAnimations/SearchAiArchAnim';
import IpOwnershipAnim from './cmsCardAnimations/IpOwnershipAnim';

gsap.registerPlugin(ScrollTrigger);

const CMS_CARDS = [
    {
        id: "smart-inventory",
        title: "Smart Inventory & Orders",
        desc: "Real-time stock tracking, multi-channel feeds, and instant order sync engineered for seamless daily store operations.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg1.webp",
        component: SmartInventoryAnim,
        textPosition: "top",
        brightness: "brightness-80"
    },
    {
        id: "workflow-model",
        title: "Automated Shipping & Tracking",
        desc: "Native Shiprocket integration with real-time AWB tracking, live dispatch status, and automated Kanban order workflows.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg2.webp",
        component: WorkflowModelAnim,
        textPosition: "bottom"
    },
    {
        id: "production-sync",
        title: "Live Production & Sales Sync",
        desc: "Real-time revenue, order growth, and visit velocity tied directly to production sync rates at a single glance.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg3.webp",
        component: ProductionSyncAnim,
        textPosition: "top"
    },
    {
        id: "analytics-answer",
        title: "SEO & Search Engine Indexing",
        desc: "Guaranteed search engine indexing and organic ranking analytics tailored for top-tier Google and DuckDuckGo visibility.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg4.webp",
        component: AnalyticsAnswerAnim,
        textPosition: "bottom"
    },
    {
        id: "loyalty-system",
        title: "Built-In Loyalty & VIP Tiers",
        desc: "Drive repeat purchases with automated VIP reward tiers, point milestones, and exclusive perks without monthly app fees.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg5.webp",
        component: LoyaltySystemAnim,
        textPosition: "top"
    },
    {
        id: "admin-campaigns",
        title: "Unified Omnichannel Campaigns",
        desc: "Launch targeted WhatsApp broadcasts, cart recovery emails, and instant SMS alerts with real-time delivery tracking.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg6.webp",
        component: AdminCampaignsAnim,
        textPosition: "bottom"
    },
    {
        id: "search-ai-arch",
        title: "Multi-Domain & Brand Architecture",
        desc: "Unified domain routing and search infrastructure engineered to scale global brand assets across every top-level extension.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg7.webp",
        component: SearchAiArchAnim,
        textPosition: "top"
    },
    {
        id: "ip-ownership",
        title: "Direct Gateways & Zero SaaS Fees",
        desc: "Zero third-party transaction fees and direct multi-gateway payouts with full source code ownership and no platform lock-in.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg8.webp",
        component: IpOwnershipAnim,
        textPosition: "top"
    }
];

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
        <div ref={containerRef} className="w-full h-[200vw] relative">
            <div className='w-full sticky top-0 overflow-hidden mt-10! md:mt-24! h-screen flex gap-y-[5vh] flex-col justify-center'>
                <div className="w-full   padding py-0!  text_blue ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>Explore Zcom.</h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>Total control,</p>
                            <p className='font-thin'>zero restrictions.</p>
                        </div>
                        <div className="text-3xl md:pl-2">
                            <h3 data-para-effect className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                Our own commerce platform. Not a theme, not a template — a system that bends to your business.
                            </h3>
                        </div>
                    </div>
                </div>

                <div ref={sliderRef} className="padding py-0! w-full flex gap-x-5 will-change-transform">
                    {CMS_CARDS.map((card, index) => {
                        const isLast = index === CMS_CARDS.length - 1;
                        const AnimComponent = card.component;
                        const isTop = card.textPosition === "top";

                        const cardElement = (
                            <div
                                key={card.id}
                                className={`w-[85vw] sm:w-[50vw] md:w-[32vw] lg:w-[30vw] cms_crd relative overflow-hidden aspect-square shrink-0 flex flex-col ${
                                    isTop ? "justify-start" : "justify-end"
                                } text-white rounded-2xl transform-gpu will-change-transform`}
                            >
                                <Image
                                    src={card.bgImage}
                                    alt={card.title}
                                    fill
                                    className={`object-cover absolute z-0 ${card.brightness || ""}`}
                                />
                                <AnimComponent />
                                <div className={`p-8 md:p-10 ${isTop ? "pb-0" : ""} space-y-2 relative z-20`}>
                                    <h4 className='text-2xl md:text-3xl primary-font drop-shadow-md'>
                                        {card.title}
                                    </h4>
                                    <p className='leading-tight text-white/90 text-xs md:text-sm drop-shadow-sm'>
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        );

                        if (isLast) {
                            return (
                                <div key={card.id} className="pr-4 md:pr-10">
                                    {cardElement}
                                </div>
                            );
                        }

                        return cardElement;
                    })}
                </div>
            </div>
        </div>
    )
}

export default EcommCmsCards