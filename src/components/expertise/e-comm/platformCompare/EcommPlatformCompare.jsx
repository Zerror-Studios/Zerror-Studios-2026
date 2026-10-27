"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    RiCheckLine,
    RiCloseLine,
    RiSpeedLine,
    RiExpandUpDownLine,
    RiPaintBrushLine,
    RiMoneyRupeeCircleLine,
    RiTeamLine,
    RiSparkling2Line,
    RiStarLine,
    RiArrowRightLine,
    RiLayoutGridLine,
    RiApps2Line,
    RiCodeLine,
    RiShieldCheckLine,
    RiBarChartBoxLine,
    RiLockLine,
    RiPlugLine,
    RiPaletteLine,
    RiDashboardLine,
    RiSettings3Line,
    RiNotification3Line,
    RiSearchLine,
    RiGlobalLine,
    RiTerminalBoxLine,
    RiServerLine,
    RiDatabase2Line,
    RiCloudLine,
    RiPriceTag3Line,
    RiLightbulbLine,
} from "@remixicon/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SectionHeader from "@/components/common/SectionHeader";
import Br from "@/components/common/Br";
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════ DATA ══════════════════════════ */

const tabs = [
    { key: "design", label: "Design", icon: RiPaintBrushLine },
    { key: "speed", label: "Speed", icon: RiSpeedLine },
    { key: "costs", label: "Running costs", icon: RiMoneyRupeeCircleLine },
    { key: "search", label: "Search", icon: RiSearchLine },
    { key: "changes", label: "Who makes changes", icon: RiTeamLine },
    { key: "dashboard", label: "Dashboard", icon: RiDashboardLine },
    { key: "ai", label: "AI", icon: RiSparkling2Line },
];

const dashboardData = {
    design: {
        zcom: {
            score: 100,
            grade: "A+",
            tagline: "Built around your business.",
            metrics: [
                { label: "Design", value: "Made for you", icon: RiPaletteLine },
                { label: "Checkout", value: "Custom", icon: RiCodeLine },
                { label: "Motion", value: "GSAP", icon: RiSettings3Line },
            ],
            features: [
                { name: "A design made for your brand", available: true },
                { name: "A checkout shaped around how you sell", available: true },
                { name: "Lookbooks and shop the look", available: true },
                { name: "Animation that feels like you", available: true },
            ],
            highlight:
                "Our own platform. Your design, your checkout, and our team for every change.",
        },

        shopify: {
            score: 90,
            grade: "A",
            tagline: "The world's favourite store platform, made to look like yours.",
            metrics: [
                { label: "Design", value: "Custom theme", icon: RiPaletteLine },
                { label: "Platform", value: "Shopify", icon: RiCodeLine },
                { label: "Apps", value: "The right ones", icon: RiApps2Line },
            ],
            features: [
                { name: "A custom theme, designed by us", available: true },
                { name: "The right apps, nothing extra", available: true },
                { name: "Audits for stores already live", available: true },
                { name: "Animation where it helps", available: true },
            ],
            highlight:
                "Custom themes, the right apps, and audits for stores that are already live.",
        },
    },

    speed: {
        zcom: {
            score: 98,
            grade: "A",
            tagline: "Fast, because we tune it for you.",
            metrics: [
                { label: "Frontend", value: "Next.js", icon: RiSpeedLine },
                { label: "Tuning", value: "Per store", icon: RiBarChartBoxLine },
                { label: "Traffic", value: "Ready for sale days", icon: RiGlobalLine },
            ],
            features: [
                { name: "Pages that load fast on mobile", available: true },
                { name: "Images sized for every screen", available: true },
                { name: "Tuned to your products and traffic", available: true },
                { name: "Ready for sale-day spikes", available: true },
            ],
            highlight:
                "We tune speed around your store, your products and your customers. Not around a default.",
        },

        shopify: {
            score: 92,
            grade: "A",
            tagline: "Reliable speed, hosted by Shopify.",
            metrics: [
                { label: "Hosting", value: "Shopify", icon: RiCloudLine },
                { label: "Theme", value: "Kept lean", icon: RiBarChartBoxLine },
                { label: "Scaling", value: "Automatic", icon: RiGlobalLine },
            ],
            features: [
                { name: "Hosting and scaling handled", available: true },
                { name: "A lean theme, built by us", available: true },
                { name: "Only the apps you need", available: true },
            ],
            highlight:
                "Shopify handles the hosting. We keep the theme lean and the apps few, so the store stays quick.",
        },
    },

    costs: {
        zcom: {
            score: 100,
            grade: "A",
            tagline: "No app bills stacking up.",
            metrics: [
                { label: "Loyalty", value: "Built in", icon: RiStarLine },
                { label: "WhatsApp", value: "Built in", icon: RiNotification3Line },
                { label: "Lookbooks", value: "Built in", icon: RiLayoutGridLine },
            ],
            features: [
                { name: "Loyalty and referrals built in", available: true },
                { name: "WhatsApp and email built in", available: true },
                { name: "Lookbooks built in", available: true },
                { name: "Costs explained on a call", available: true },
            ],
            highlight:
                "The features most stores pay apps for are already part of Zcom. We take you through the costs on a call.",
        },

        shopify: {
            score: 70,
            grade: "A",
            tagline: "A monthly plan, plus the apps you choose.",
            metrics: [
                { label: "Plan", value: "Monthly", icon: RiPriceTag3Line },
                { label: "Apps", value: "As needed", icon: RiApps2Line },
                { label: "Theme", value: "Custom", icon: RiPaletteLine },
            ],
            features: [
                { name: "A Shopify plan, billed by Shopify", available: true },
                { name: "Apps picked with care", available: true },
                { name: "No apps you don't need", available: true },
            ],
            highlight:
                "Shopify charges a monthly plan, and apps can add up. We pick only the ones that earn their place.",
        },
    },

    search: {
        zcom: {
            score: 96,
            grade: "A+",
            tagline: "Search set up from day one.",
            metrics: [
                { label: "Page settings", value: "Every page", icon: RiSearchLine },
                { label: "Rendering", value: "Server-side", icon: RiCodeLine },
                { label: "Schema", value: "Built in", icon: RiSpeedLine },
            ],
            features: [
                { name: "Titles and descriptions for every page", available: true },
                { name: "Clean links for every product", available: true },
                { name: "Structured data built in", available: true },
                { name: "Ready for AI search", available: true },
            ],
            highlight:
                "Control how every page shows on Google. We set it all up before launch.",
        },

        shopify: {
            score: 84,
            grade: "A",
            tagline: "Solid search tools, set up properly.",
            metrics: [
                { label: "Page settings", value: "Built in", icon: RiSearchLine },
                { label: "Sitemap", value: "Automatic", icon: RiCodeLine },
                { label: "Schema", value: "In the theme", icon: RiSpeedLine },
            ],
            features: [
                { name: "Titles and descriptions", available: true },
                { name: "Sitemaps handled by Shopify", available: true },
                { name: "Structured data in the theme", available: true },
                { name: "Search checked in every audit", available: true },
            ],
            highlight:
                "Shopify covers the basics. We set them up right and check them in every audit.",
        },
    },

    changes: {
        zcom: {
            score: 100,
            grade: "A+",
            tagline: "Our team, for every change.",
            metrics: [
                { label: "Changes", value: "Our team", icon: RiTeamLine },
                { label: "Platform", value: "Run by us", icon: RiServerLine },
                { label: "New features", value: "When you need them", icon: RiSettings3Line },
            ],
            features: [
                { name: "One team for every change", available: true },
                { name: "New features built when you need them", available: true },
                { name: "The platform kept up to date", available: true },
                { name: "No hunting for developers", available: true },
            ],
            highlight:
                "Ask for a change and the team that built your store makes it.",
        },

        shopify: {
            score: 50,
            grade: "A",
            tagline: "Your team, with us when you need us.",
            metrics: [
                { label: "Daily edits", value: "Your team", icon: RiTeamLine },
                { label: "Platform", value: "Run by Shopify", icon: RiServerLine },
                { label: "Bigger work", value: "Our team", icon: RiSettings3Line },
            ],
            features: [
                { name: "Edit products and pages yourself", available: true },
                { name: "Shopify keeps the platform updated", available: true },
                { name: "We step in for bigger changes", available: true },
            ],
            highlight:
                "Shopify runs the platform. Your team handles day-to-day edits, and we take on the bigger work.",
        },
    },

    dashboard: {
        zcom: {
            score: 80,
            grade: "A+",
            tagline: "The whole store on one screen.",
            metrics: [
                { label: "Sales", value: "Live", icon: RiBarChartBoxLine },
                { label: "Shipping", value: "Shiprocket", icon: RiGlobalLine },
                { label: "Brands", value: "One login", icon: RiLayoutGridLine },
            ],
            features: [
                { name: "Visits, orders and revenue at a glance", available: true },
                { name: "Shipping and live tracking", available: true },
                { name: "Several brands, one dashboard", available: true },
                { name: "Classes and memberships", available: true },
            ],
            highlight:
                "Products, orders, shipping and sales sit together, so your team spends less time switching screens.",
        },

        shopify: {
            score: 95,
            grade: "A",
            tagline: "Shopify admin, set up for how you work.",
            metrics: [
                { label: "Admin", value: "Shopify", icon: RiLayoutGridLine },
                { label: "Reports", value: "Built in", icon: RiBarChartBoxLine },
                { label: "Extras", value: "Through apps", icon: RiApps2Line },
            ],
            features: [
                { name: "Products and orders in one place", available: true },
                { name: "Reports built in", available: true },
                { name: "Apps for anything extra", available: true },
            ],
            highlight:
                "Shopify admin is familiar and easy to learn. We set it up around your products and your team.",
        },
    },

    ai: {
        zcom: {
            score: 95,
            grade: "A+",
            tagline: "Built-in AI that helps it sell.",
            metrics: [
                { label: "AI coach", value: "Built in", icon: RiSparkling2Line },
                { label: "Chat control", value: "Claude, ChatGPT", icon: RiTerminalBoxLine },
                { label: "Answers", value: "From your data", icon: RiDatabase2Line },
            ],
            features: [
                { name: "Ask why sales dipped", available: true },
                { name: "Get the next step", available: true },
                { name: "Add products by chat", available: true },
                { name: "Launch a sale from Claude or ChatGPT", available: true },
            ],
            highlight:
                "An AI coach answers questions about your store. And you can run the store by chat.",
        },

        shopify: {
            score: 80,
            grade: "A",
            tagline: "Shopify's own AI tools, plus apps.",
            metrics: [
                { label: "AI tools", value: "Shopify's own", icon: RiSparkling2Line },
                { label: "Extras", value: "Through apps", icon: RiApps2Line },
                { label: "Setup", value: "By us", icon: RiSettings3Line },
            ],
            features: [
                { name: "Shopify's built-in AI tools", available: true },
                { name: "AI apps where they help", available: true },
                { name: "Set up and tested by us", available: true },
            ],
            highlight:
                "Shopify has its own AI features. We switch on the ones that help and leave the rest.",
        },
    },
};

/* ═══════════════ COLOR & GRADIENT HELPERS ═══════════════ */

// Calculates a color along the red -> amber -> green spectrum based on score (0 to 100)
const getScoreColor = (score) => {
    const clamped = Math.max(0, Math.min(100, score));
    let hue;
    if (clamped <= 50) {
        // 0 to 50: red (0deg) to amber (48deg)
        hue = (clamped / 50) * 48;
    } else {
        // 50 to 100: amber (48deg) to emerald green (142deg)
        hue = 48 + ((clamped - 50) / 50) * 94;
    }
    return `hsl(${Math.round(hue)}, 84%, 42%)`;
};

// Returns a smooth gradient starting from solid red to the score's color (smoothly towards green)
const getScoreGradient = (score) => {
    const clamped = Math.max(0, Math.min(100, score));
    const endColor = getScoreColor(clamped);
    if (clamped <= 45) {
        return `linear-gradient(90deg, #dc2626 0%, ${endColor} 100%)`;
    } else if (clamped <= 75) {
        return `linear-gradient(90deg, #dc2626 0%, #f59e0b 45%, ${endColor} 100%)`;
    } else {
        return `linear-gradient(90deg, #dc2626 0%, #f59e0b 30%, #84cc16 60%, ${endColor} 100%)`;
    }
};

/* ═══════════════ SCORE RING COMPONENT ═══════════════ */

const ScoreRing = ({ score = 0, size = 56, activeTab }) => {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const scoreColor = getScoreColor(score);

    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (circleRef.current) {
            circleRef.current.style.strokeDashoffset = `${circumference}`;
        }
        if (textRef.current) {
            textRef.current.textContent = "0";
        }

        const obj = { val: 0 };
        const tween = gsap.to(obj, {
            val: score,
            duration: 1,
            delay: 0.25,
            ease: "power2.out",
            onUpdate: () => {
                if (circleRef.current) {
                    const offset = circumference - (obj.val / 100) * circumference;
                    circleRef.current.style.strokeDashoffset = `${offset}`;
                }
                if (textRef.current) {
                    textRef.current.textContent = Math.round(obj.val);
                }
            },
        });

        return () => {
            tween.kill();
        };
    }, [activeTab, score, circumference]);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
                <circle
                    ref={circleRef}
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={scoreColor} strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    style={{ transition: "stroke 0.4s ease-out" }}
                />
            </svg>
            <span ref={textRef} className="absolute text-sm font-bold text-black">0</span>
        </div>
    );
};

/* ═══════════════ PROGRESS BAR ═══════════════ */

const ProgressBar = ({ value = 0, max = 100, activeTab }) => {
    const barRef = useRef(null);
    const gradient = getScoreGradient(value);

    useEffect(() => {
        if (barRef.current) {
            barRef.current.style.width = "0%";
        }

        const obj = { val: 0 };
        const tween = gsap.to(obj, {
            val: value,
            duration: 1,
            delay: 0.25,
            ease: "power2.out",
            onUpdate: () => {
                if (barRef.current) {
                    const pct = Math.min(100, Math.max(0, (obj.val / max) * 100));
                    barRef.current.style.width = `${pct}%`;
                }
            },
        });

        return () => {
            tween.kill();
        };
    }, [activeTab, value, max]);

    return (
        <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
            <div
                ref={barRef}
                className="h-full rounded-full"
                style={{
                    width: "0%",
                    background: gradient,
                    transition: "background 0.4s ease-out",
                }}
            />
        </div>
    );
};

/* ═══════════════ DASHBOARD PANEL ═══════════════ */

const DashboardPanel = ({ platform, data, icon: PlatformIcon, activeTab, isWinner }) => {
    if (!data) return null;
    const score = data.score ?? 0;
    const scoreColor = getScoreColor(score);

    return (
        <div className={`ui-mock dashboard-panel rounded-2xl overflow-hidden border bg-white shadow-xl transition-[border-color,box-shadow] duration-500 flex flex-col ${isWinner ? "border-[#002bba]/50 shadow-2xl ring-2 ring-[#002bba]/20" : "border-black/10"}`}>
            {/* ─── Dashboard Title Bar ─── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/10 bg-black/[0.02]">
                <div className="flex items-center gap-2.5">
                    {/* Window dots */}
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <span className="text-xs text-black opacity-70 font-mono font-medium">{platform.toLowerCase()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <RiSearchLine size={14} className="text-black opacity-40" />
                    <RiNotification3Line size={14} className="text-black opacity-40" />
                    <RiSettings3Line size={14} className="text-black opacity-40" />
                </div>
            </div>

            {/* ─── Platform Header ─── */}
            <div className="px-6 py-4 border-b border-black/10 bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-3xl md:text-4xl text-black font-semibold">{platform}</div>
                        <p className="text-sm text-black opacity-70 mt-1">{data.tagline}</p>
                    </div>
                    <div className="flex py-2 items-center gap-3">
                        <ScoreRing score={score} activeTab={activeTab} />
                    </div>
                </div>
                <div className="mt-4">
                    <ProgressBar value={score} activeTab={activeTab} />
                </div>
            </div>

            {/* ─── Metrics Row ─── */}
            <div className="grid grid-cols-3 border-b border-black/10 bg-black/[0.02]">
                {data.metrics?.map((m, i) => {
                    const MIcon = m.icon;
                    return (
                        <div key={i} className={`metric-item px-4 py-4 flex flex-col items-center text-center gap-1.5 ${i < 2 ? "border-r border-black/10" : ""}`}>
                            <MIcon size={16} className="text-black opacity-40" />
                            <span className="text-xs text-black opacity-60 uppercase font-medium">{m.label}</span>
                            <span className="text-sm font-semibold text-black">{m.value}</span>
                        </div>
                    );
                })}
            </div>

            {/* ─── Features Checklist ─── */}
            <div className="px-6 py-5 flex-1 bg-white">
                <p className="text-xs uppercase opacity-60 text-black mb-3">Feature checklist</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.features?.map((f, i) => (
                        <div key={i} className="feature-row flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${f.available ? "bg-emerald-50 text-emerald-600 border border-emerald-200/70" : "bg-rose-50 text-rose-400 border border-rose-200/70"}`}>
                                {f.available
                                    ? <RiCheckLine size={13} className="text-emerald-600" />
                                    : <RiCloseLine size={13} className="text-rose-400" />
                                }
                            </div>
                            <span className={`text-sm ${f.available ? "text-black font-medium" : "text-black opacity-40 line-through"}`}>
                                {f.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* ─── Bottom Highlight ─── */}
            {data.highlight && (
                <div className="panel-highlight p-6 bg-white mt-auto lg:mt-0 h-full flex flex-col border-t border-black/10">
                    <div
                        className={`p-4 rounded-xl border transition-all duration-300 h-full flex flex-col justify-start bg-[#002bba10] border-[#002bba]/10 `}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 bg-[#002bba]/10 text-[#002bba]`}
                            >
                                <RiLightbulbLine className="size-3" />
                            </div>
                            <span
                                className={`text-xs uppercase font-bold text-[#002bba] `}
                            >
                                Key takeaway
                            </span>
                        </div>
                        <p className="text-xs md:text-sm text-black opacity-80 font-normal">
                            {data.highlight}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
};

/* ══════════════════ MAIN COMPONENT ══════════════════ */

const EcommPlatformCompare = () => {
    const [activeTab, setActiveTab] = useState("design");
    const containerRef = useRef(null);
    const panelsRef = useRef(null);
    const isFirstRender = useRef(true);

    const currentData = dashboardData[activeTab] || dashboardData.design;
    const customData = currentData?.zcom || currentData?.custom;
    const templateData = currentData?.shopify || currentData?.template;
    const customWins = (customData?.score ?? 0) >= (templateData?.score ?? 0);

    /* ── Scroll entry animation ── */
    useGSAP(() => {
        // Set initial hidden state
        gsap.set(".compare-tab-btn", { y: 20, opacity: 0 });
        gsap.set(".dashboard-panel", { y: 60, opacity: 0, scale: 0.95 });

        // Animate tabs in on scroll
        gsap.to(".compare-tab-btn", {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".compare-tabs-wrap",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        // Animate dashboard panels in on scroll
        gsap.to(".dashboard-panel", {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".dashboards-wrap",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: containerRef });

    /* ── Tab-change animation ── */
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!panelsRef.current) return;

        const panels = panelsRef.current.querySelectorAll(".dashboard-panel");
        const metrics = panelsRef.current.querySelectorAll(".metric-item");
        const features = panelsRef.current.querySelectorAll(".feature-row");
        const highlights = panelsRef.current.querySelectorAll(".panel-highlight");

        const tl = gsap.timeline();

        // Animate out
        tl.to(panels, {
            opacity: 0,
            y: 20,
            scale: 0.98,
            duration: 0.2,
            ease: "power2.in",
            stagger: 0.05,
        });

        // Animate back in
        tl.fromTo(panels,
            { opacity: 0, y: -15, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", stagger: 0.1 },
            "+=0.05"
        );

        // Stagger metrics
        tl.fromTo(metrics,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.04 },
            "<0.15"
        );

        // Stagger features
        tl.fromTo(features,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.25, ease: "power2.out", stagger: 0.03 },
            "<0.1"
        );

        // Stagger highlights
        if (highlights.length) {
            tl.fromTo(highlights,
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
                "<0.1"
            );
        }

        return () => tl.kill();
    }, [activeTab]);

    return (
        <div ref={containerRef} className="w-full bg_blue relative overflow-hidden pt-section!">

            {/* ── Heading ── */}
            <div className="w-full padding py-0! text-white">
                <SectionHeader
                    title={<>Shopify <Br /> or Zcom?</>}
                    className="pb-block border-white/50 border-b"
                >
                    Both are custom-designed by us. The difference is who runs the platform underneath.
                </SectionHeader>
            </div>

            {/* ── Tabs ── */}
            <div className="compare-tabs-wrap padding pb-0! pt-block! flex flex-wrap gap-3">
                {tabs.map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`compare-tab-btn flex items-center gap-2 px-4 leading-none py-2.5 rounded-md pl-3 text-sm uppercase border transition-colors duration-300 cursor-pointer ${activeTab === t.key
                                ? "bg-white  text-[#002bba] border-white"
                                : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
                                }`}
                        >
                            <Icon className="size-4" />
                            <span className="translate-y-0.25">
                            {t.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ── Dashboard Panels ── */}
            <div ref={panelsRef} className="dashboards-wrap padding py-0! my-block">
                <div className="dashboards-compare-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-y-0 lg:gap-x-6">
                    <DashboardPanel
                        platform="Zcom"
                        data={customData}
                        icon={RiTerminalBoxLine}
                        activeTab={activeTab}
                        isWinner={customWins}
                    />
                    <DashboardPanel
                        platform="Shopify"
                        data={templateData}
                        icon={RiLayoutGridLine}
                        activeTab={activeTab}
                        isWinner={!customWins}
                    />
                </div>

            </div>
        </div>
    );
};

export default EcommPlatformCompare;
