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
        title: "Smart Catalog & Inventory Sync",
        desc: "Real-time product variation control, live inventory feeds, and intuitive catalog search engineered for seamless store operations.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg1.webp",
        component: SmartInventoryAnim,
        textPosition: "top",
        brightness: "brightness-80"
    },
    {
        id: "workflow-model",
        title: "Automated Logistics & Tracking",
        desc: "Native Shiprocket logistics with real-time AWB tracking, live dispatch status, and visual Kanban order progression.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg2.webp",
        component: WorkflowModelAnim,
        textPosition: "bottom"
    },
    {
        id: "production-sync",
        title: "Live Revenue & Traffic Analytics",
        desc: "Monitor live site visits, order counts, and revenue velocity at a single glance with real-time heartbeat sales tracking.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg3.webp",
        component: ProductionSyncAnim,
        textPosition: "top"
    },
    {
        id: "analytics-answer",
        title: "Search Engine & SEO Visibility",
        desc: "Built-in search engine indexing controls and optimization tailored for top-tier Google, DuckDuckGo, and Yahoo! organic discovery.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg4.webp",
        component: AnalyticsAnswerAnim,
        textPosition: "bottom"
    },
    {
        id: "loyalty-system",
        title: "Memberships & Digital Masterclasses",
        desc: "Sell digital products, private masterclasses, and recurring subscriptions with proven 85% open and 26% engagement rates.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg5.webp",
        component: LoyaltySystemAnim,
        textPosition: "top"
    },
    {
        id: "admin-campaigns",
        title: "Omnichannel Outreach & Messaging",
        desc: "Engage high-intent customers directly across WhatsApp, email, and live chat with automated campaign tracking and checklist readiness.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg6.webp",
        component: AdminCampaignsAnim,
        textPosition: "bottom"
    },
    {
        id: "search-ai-arch",
        title: "Multi-Domain Brand Architecture",
        desc: "Unified multi-TLD domain routing engineered to scale global brand assets seamlessly across .com, .net, and custom extensions.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg7.webp",
        component: SearchAiArchAnim,
        textPosition: "top"
    },
    {
        id: "ip-ownership",
        title: "Global Gateways & Zero SaaS Fees",
        desc: "Direct checkout payouts with Stripe, Apple Pay, Klarna, and top global gateways with zero transaction cuts or platform lock-in.",
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