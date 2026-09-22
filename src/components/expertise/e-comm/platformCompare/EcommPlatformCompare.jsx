"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    RiCheckLine,
    RiCloseLine,
    RiSpeedLine,
    RiExpandUpDownLine,
    RiPaintBrushLine,
    RiMoneyDollarCircleLine,
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
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════ DATA ══════════════════════════ */

const tabs = [
    { key: "customization", label: "Customization", icon: RiPaintBrushLine },
    { key: "performance", label: "Performance", icon: RiSpeedLine },
    { key: "pricing", label: "Pricing", icon: RiMoneyDollarCircleLine },
    { key: "seo", label: "SEO", icon: RiSearchLine },
    { key: "ownership", label: "Ownership", icon: RiLockLine },
    { key: "dashboard", label: "Dashboard", icon: RiDashboardLine },
    { key: "technology", label: "Technology", icon: RiCodeLine },
];

const dashboardData = {
    customization: {
        zcom: {
            score: 98,
            grade: "A+",
            tagline: "Built around your business, not a template",
            metrics: [
                { label: "Design Freedom", value: "100%", icon: RiPaletteLine },
                { label: "Frontend", value: "Fully Custom", icon: RiCodeLine },
                { label: "Backend", value: "Fully Custom", icon: RiServerLine },
            ],
            features: [
                { name: "Design every part of your website", available: true },
                { name: "Build features specifically for your business", available: true },
                { name: "Create custom shopping & checkout experiences", available: true },
                { name: "Add advanced 3D, animations & interactions", available: true },
            ],
            highlight:
                "Z-Com is built around your business. From the way your website looks to how customers shop and how your team manages orders, everything can be tailored to your exact needs.",
        },

        shopify: {
            score: 75,
            grade: "B",
            tagline: "Quick to launch with ready-made themes",
            metrics: [
                { label: "Design Freedom", value: "Theme-Based", icon: RiPaletteLine },
                { label: "Setup", value: "Ready-Made", icon: RiCodeLine },
                { label: "Customization", value: "Platform-Based", icon: RiSettings3Line },
            ],
            features: [
                { name: "Ready-made themes", available: true },
                { name: "Theme customization", available: true },
                { name: "Large app ecosystem", available: true },
                { name: "Custom animations & interactions", available: true },
            ],
            highlight:
                "Shopify makes it easy to launch a store using themes and apps. It works well for standard stores, while highly specific experiences may require working within Shopify's platform and theme structure.",
        },
    },

    technology: {
        zcom: {
            score: 96,
            grade: "A+",
            tagline: "Your technology, your rules",
            metrics: [
                { label: "Technology", value: "Custom Built", icon: RiCodeLine },
                { label: "Database", value: "Your Own", icon: RiDatabase2Line },
                { label: "Infrastructure", value: "Your Control", icon: RiCloudLine },
            ],
            features: [
                { name: "Modern Next.js + MERN architecture", available: true },
                { name: "Your own database & backend", available: true },
                { name: "Custom cloud infrastructure", available: true },
                { name: "Built for your specific business requirements", available: true },
            ],
            highlight:
                "Z-Com gives you a complete custom technology foundation. The system can be changed, extended and improved as your business grows instead of being restricted to a fixed platform structure.",
        },

        shopify: {
            score: 86,
            grade: "A",
            tagline: "Reliable commerce infrastructure, managed for you",
            metrics: [
                { label: "Technology", value: "Platform Managed", icon: RiCodeLine },
                { label: "Database", value: "Shopify Managed", icon: RiDatabase2Line },
                { label: "Infrastructure", value: "Shopify Managed", icon: RiCloudLine },
            ],
            features: [
                { name: "Managed hosting & infrastructure", available: true },
                { name: "Built-in commerce technology", available: true },
                { name: "Large ecosystem of apps & integrations", available: true },
            ],
            highlight:
                "Shopify takes care of the technical infrastructure, hosting and core commerce system, making it easier to manage but giving you less control over the underlying technology.",
        },
    },

    performance: {
        zcom: {
            score: 94,
            grade: "A",
            tagline: "Performance designed around your customers",
            metrics: [
                { label: "Frontend", value: "Next.js", icon: RiSpeedLine },
                { label: "Optimization", value: "Custom", icon: RiBarChartBoxLine },
                { label: "Scaling", value: "Built to Scale", icon: RiGlobalLine },
            ],
            features: [
                { name: "Fast, optimized website experience", available: true },
                { name: "Custom image & asset optimization", available: true },
                { name: "Performance tuned for your website", available: true },
                { name: "Infrastructure that can grow with your traffic", available: true },
            ],
            highlight:
                "With Z-Com, performance decisions are made around your website and customers. We can optimize the experience based on your actual content, features and traffic instead of relying only on platform-wide defaults.",
        },

        shopify: {
            score: 91,
            grade: "A",
            tagline: "Reliable performance with managed infrastructure",
            metrics: [
                { label: "Infrastructure", value: "Managed", icon: RiCloudLine },
                { label: "Optimization", value: "Platform", icon: RiBarChartBoxLine },
                { label: "Scaling", value: "Managed", icon: RiGlobalLine },
            ],
            features: [
                { name: "Managed hosting & infrastructure", available: true },
                { name: "Automatic platform scaling", available: true },
                { name: "Optimized commerce infrastructure", available: true },
            ],
            highlight:
                "Shopify handles the infrastructure and scaling for you, making performance management simpler. Your store's performance is still influenced by the themes, apps and features you add.",
        },
    },

    dashboard: {
        zcom: {
            score: 99,
            grade: "A+",
            tagline: "A dashboard built around your team",
            metrics: [
                { label: "Admin Dashboard", value: "100% Custom", icon: RiLayoutGridLine },
                { label: "Workflows", value: "Your Business", icon: RiSettings3Line },
                { label: "Control", value: "Full", icon: RiDashboardLine },
            ],
            features: [
                { name: "Dashboard designed around your business", available: true },
                { name: "Custom order & product workflows", available: true },
                { name: "Business-specific analytics & reports", available: true },
                { name: "Team roles & permissions", available: true },
            ],
            highlight:
                "Instead of changing your business process to fit a standard dashboard, Z-Com lets us build the dashboard around the way your team actually works.",
        },

        shopify: {
            score: 82,
            grade: "A-",
            tagline: "A mature dashboard for standard store management",
            metrics: [
                { label: "Admin Dashboard", value: "Shopify Admin", icon: RiLayoutGridLine },
                { label: "Workflows", value: "Standard", icon: RiSettings3Line },
                { label: "Management", value: "Platform-Based", icon: RiDashboardLine },
            ],
            features: [
                { name: "Product & order management", available: true },
                { name: "Built-in store analytics", available: true },
                { name: "Staff accounts & permissions", available: true },
            ],
            highlight:
                "Shopify provides a powerful ready-made admin system for managing products, orders, customers and analytics. Businesses generally work within the workflows provided by the platform.",
        },
    },

    ownership: {
        zcom: {
            score: 97,
            grade: "A+",
            tagline: "Your platform. Your code. Your control.",
            metrics: [
                { label: "Codebase", value: "Custom Owned", icon: RiCodeLine },
                { label: "Control", value: "Full", icon: RiLockLine },
                { label: "Dependency", value: "Low", icon: RiSettings3Line },
            ],
            features: [
                { name: "Custom codebase built for your business", available: true },
                { name: "Full control over frontend & backend", available: true },
                { name: "No dependency on a theme system", available: true },
                { name: "Long-term customization & development", available: true },
            ],
            highlight:
                "Z-Com gives your business its own platform rather than making your business fit into someone else's platform. You have greater control over how the system evolves over time.",
        },

        shopify: {
            score: 79,
            grade: "B+",
            tagline: "Convenient platform with ongoing subscription",
            metrics: [
                { label: "Codebase", value: "Platform-Based", icon: RiCodeLine },
                { label: "Control", value: "Platform Rules", icon: RiLockLine },
                { label: "Model", value: "Subscription", icon: RiMoneyDollarCircleLine },
            ],
            features: [
                { name: "Access to your store content & configuration", available: true },
                { name: "Large ecosystem of themes & apps", available: true },
                { name: "Ongoing platform updates & maintenance", available: true },
            ],
            highlight:
                "Shopify reduces the technical work required to run a store, but the core platform remains Shopify's. Your store operates within its subscription model, rules and ecosystem.",
        },
    },

    seo: {
        zcom: {
            score: 96,
            grade: "A+",
            tagline: "SEO built into your website from the start",
            metrics: [
                { label: "SEO Control", value: "Full", icon: RiSearchLine },
                { label: "Rendering", value: "Next.js", icon: RiCodeLine },
                { label: "Optimization", value: "Custom", icon: RiSpeedLine },
            ],
            features: [
                { name: "Custom SEO structure for every page", available: true },
                { name: "Fast server-rendered pages", available: true },
                { name: "Custom structured data & metadata", available: true },
                { name: "Custom URL & content architecture", available: true },
            ],
            highlight:
                "Z-Com gives us control over the technical foundation of your SEO. This means the website can be structured specifically around your products, content and search strategy.",
        },

        shopify: {
            score: 88,
            grade: "A",
            tagline: "Strong SEO tools for standard stores",
            metrics: [
                { label: "SEO Control", value: "Good", icon: RiSearchLine },
                { label: "SEO Tools", value: "Built-In", icon: RiCodeLine },
                { label: "Optimization", value: "Platform", icon: RiSpeedLine },
            ],
            features: [
                { name: "Page titles & meta descriptions", available: true },
                { name: "Sitemap & SEO basics", available: true },
                { name: "Structured data through themes/apps", available: true },
            ],
            highlight:
                "Shopify provides the essential SEO tools most online stores need, making it straightforward to manage SEO without handling the underlying technical architecture.",
        },
    },

    pricing: {
        zcom: {
            score: 84,
            grade: "A",
            tagline: "Invest in a platform built specifically for you",
            metrics: [
                { label: "Initial Cost", value: "Higher", icon: RiMoneyDollarCircleLine },
                { label: "Build Model", value: "Custom Development", icon: RiCodeLine },
                { label: "Long-Term", value: "More Control", icon: RiLockLine },
            ],
            features: [
                { name: "Complete custom platform development", available: true },
                { name: "Custom frontend & backend included", available: true },
                { name: "Custom dashboard & business workflows", available: true },
                { name: "Future customization without changing platforms", available: true },
            ],
            highlight:
                "Z-Com requires a larger initial investment because you are building a platform specifically for your business. In return, the system is designed to grow and change with your requirements.",
        },

        shopify: {
            score: 88,
            grade: "A",
            tagline: "Lower starting cost with ongoing platform expenses",
            metrics: [
                { label: "Initial Cost", value: "Lower", icon: RiMoneyDollarCircleLine },
                { label: "Billing", value: "Recurring", icon: RiPriceTag3Line },
                { label: "Customization", value: "Additional Cost", icon: RiCodeLine },
            ],
            features: [
                { name: "Lower platform entry cost", available: true },
                { name: "Monthly platform subscription", available: true },
                { name: "Large selection of paid & free apps", available: true },
                { name: "Additional development for advanced customization", available: true },
            ],
            highlight:
                "Shopify is generally easier to start with because the platform is already built. However, ongoing subscriptions, apps, themes and development can add to the total cost as your requirements grow.",
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
        <div className={`dashboard-panel rounded-2xl overflow-hidden border bg-white shadow-xl transition-[border-color,box-shadow] duration-500 flex flex-col ${isWinner ? "border-[#002bba]/50 shadow-2xl ring-2 ring-[#002bba]/20" : "border-black/10"}`}>
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
            <div className="px-6 pt-6 pb-5 border-b border-black/10 bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-3xl md:text-4xl text-black font-semibold">{platform}</h4>
                        <p className="text-xs text-black opacity-70 mt-1">{data.tagline}</p>
                    </div>
                    <div className="flex py-2 items-center gap-3">
                        <ScoreRing score={score} activeTab={activeTab} />
                        <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: scoreColor }}>{data.grade}</div>
                            <div className="text-xs text-black opacity-60 uppercase font-semibold">Grade</div>
                        </div>
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
                <p className="text-xs uppercase opacity-60 text-black mb-3">Feature Checklist</p>
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
                <div className="panel-highlight px-6 pb-6 pt-3 bg-white mt-auto border-t border-black/10">
                    <div
                        className={`p-4 rounded-xl border transition-all duration-300 ${
                            isWinner
                                ? "bg-gradient-to-br from-[#002bba]/[0.04] to-transparent border-[#002bba]/20 ring-1 ring-[#002bba]/10"
                                : "bg-black/[0.02] border-black/10"
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                                    isWinner
                                        ? "bg-[#002bba]/10 text-[#002bba]"
                                        : "bg-black/5 text-black opacity-60"
                                }`}
                            >
                                <RiLightbulbLine size={13} />
                            </div>
                            <span
                                className={`text-xs uppercase font-bold ${
                                    isWinner ? "text-[#002bba]" : "text-black opacity-60"
                                }`}
                            >
                                Key Takeaway
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
    const [activeTab, setActiveTab] = useState("customization");
    const containerRef = useRef(null);
    const panelsRef = useRef(null);
    const isFirstRender = useRef(true);

    const currentData = dashboardData[activeTab] || dashboardData.customization;
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
        <div ref={containerRef} className="w-full bg_blue relative overflow-hidden pt-10! md:pt-24! mt-10! md:mt-24!">

            {/* ── Heading ── */}
            <div className="w-full padding py-0! text-white">
                <div className="w-full space-y-12 pb-12 border-white/50 md:space-y-0 border-b md:grid grid-cols-[28%_30%_42%]">
                    <div>
                        <h2 data-para-effect className="capitalize primary-font text-5xl">
                         Which Platform <br /> to Choose
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4"></div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect>
                            <span className="opacity-0 secondary-font max-sm:hidden pointer-events-none">
                                ..................
                            </span>
                            Every e-commerce journey is unique. Template platforms offer rapid setup for standard stores, while custom platforms deliver complete ownership, bespoke workflows, and ultimate scale. Compare both architectures below to find your perfect fit.
                        </h3>
                    </div>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="compare-tabs-wrap padding pb-0! pt-8! md:pt-12! flex flex-wrap gap-3">
                {tabs.map((t) => {
                    const Icon = t.icon;
                    return (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`compare-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm uppercase border transition-colors duration-300 cursor-pointer ${activeTab === t.key
                                ? "bg-white  text-[#002bba] border-white"
                                : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
                                }`}
                        >
                            <Icon size={16} />
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Dashboard Panels ── */}
            <div ref={panelsRef} className="dashboards-wrap padding py-0! my-8 md:my-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <DashboardPanel
                        platform="Z-Com"
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
