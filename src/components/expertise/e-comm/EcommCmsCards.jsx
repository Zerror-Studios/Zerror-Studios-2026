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
import AiCoachAnim from './cmsCardAnimations/AiCoachAnim';
import ChatControlAnim from './cmsCardAnimations/ChatControlAnim';

gsap.registerPlugin(ScrollTrigger);

const CMS_CARDS = [
    {
        id: "smart-inventory",
        title: "Products and stock",
        desc: "Every variant, updated live.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg1.webp",
        component: SmartInventoryAnim,
        textPosition: "top",
        brightness: "brightness-80"
    },
    {
        id: "workflow-model",
        title: "Shipping",
        desc: "Shiprocket built in, with live tracking.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg2.webp",
        component: WorkflowModelAnim,
        textPosition: "bottom"
    },
    {
        id: "production-sync",
        title: "Sales at a glance",
        desc: "Visits, orders and revenue on one screen.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg3.webp",
        component: ProductionSyncAnim,
        textPosition: "top"
    },
    {
        id: "analytics-answer",
        title: "Search settings",
        desc: "Control how every page shows on Google.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg4.webp",
        component: AnalyticsAnswerAnim,
        textPosition: "bottom"
    },
    {
        id: "loyalty-system",
        title: "Classes and memberships",
        desc: "Sell courses and subscriptions from the same store.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg5.webp",
        component: LoyaltySystemAnim,
        textPosition: "top"
    },
    {
        id: "admin-campaigns",
        title: "WhatsApp and email",
        desc: "Reach customers where they already are.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg6.webp",
        component: AdminCampaignsAnim,
        textPosition: "bottom"
    },
    {
        id: "search-ai-arch",
        title: "More than one brand",
        desc: "Several brands, one dashboard.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg7.webp",
        component: SearchAiArchAnim,
        textPosition: "top"
    },
    {
        id: "indian-payments",
        title: "Indian payments",
        desc: "Razorpay, Cashfree, PhonePe and UPI, with GST handled.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg8.webp",
        component: IpOwnershipAnim,
        textPosition: "top"
    },
    {
        id: "ai-coach",
        title: "An AI coach",
        desc: "Ask why sales dipped. Get the answer and the next step.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg3.webp",
        component: AiCoachAnim,
        textPosition: "bottom"
    },
    {
        id: "chat-control",
        title: "Run it by chat",
        desc: "Add products and launch a sale from Claude or ChatGPT.",
        bgImage: "/images/expertisePage/e-comm/cmsCards/bg6.webp",
        component: ChatControlAnim,
        textPosition: "top"
    }
];

const EcommCmsCards = () => {

    const containerRef = useRef(null);
    const sliderRef = useRef(null);

    useGSAP(() => {
        if (window.innerWidth < 750) return;

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
        if (window.innerWidth < 768) return;

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
        <div data-hide-header ref={containerRef} className="w-full h-auto md:h-[200vw] relative">
            <div className='w-full md:sticky md:top-0 overflow-hidden mt-8! md:mt-16! max-sm:pb-8 h-auto md:h-screen flex gap-y-10 md:gap-y-[5vh] flex-col justify-center'>
                <div className="w-full   padding py-0!  text_blue ">
                    <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                        <div className="">
                            <h2 data-para-effect className='capitalize primary-font text-5xl leading-none'>Meet Zcom.</h2>
                        </div>
                        <div className="text-xs max-sm:hidden pt-4">
                            <p className='font-thin'>Your store.</p>
                            <p className='font-thin'>Our team. Built-in AI.</p>
                        </div>
                        <div className="text-3xl md:pl-2">
                            <h3 data-para-effect className="">
                                <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                                One store, designed for your brand, run by one team, with AI that helps it sell.
                            </h3>
                        </div>
                    </div>
                </div>

                <div ref={sliderRef} className="padding py-0! w-full flex gap-x-5 md:will-change-transform overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden">
                    {CMS_CARDS.map((card, index) => {
                        const isLast = index === CMS_CARDS.length - 1;
                        const AnimComponent = card.component;
                        const isTop = card.textPosition === "top";

                        const cardElement = (
                            <div
                                key={card.id}
                                className={`w-[80vw] md:w-[65vh] cms_crd snap-center md:snap-align-none relative overflow-hidden aspect-3/4 sm:aspect-square shrink-0 flex flex-col ${
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
                                <div className={`p-6 md:p-10 ${isTop ? "pb-0" : ""} space-y-2 relative z-20`}>
                                    <h4 className='text-3xl primary-font leading-none '>
                                        {card.title}
                                    </h4>
                                    <p className='leading-tight text-white/90 text-lg'>
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