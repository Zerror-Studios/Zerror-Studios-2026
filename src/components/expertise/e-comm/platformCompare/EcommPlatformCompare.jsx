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
} from "@remixicon/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════ DATA ══════════════════════════ */

const tabs = [
    { key: "customization", label: "Customization", icon: RiPaintBrushLine },
    { key: "technology", label: "Technology", icon: RiCodeLine },
    { key: "performance", label: "Performance", icon: RiSpeedLine },
    { key: "dashboard", label: "Dashboard", icon: RiDashboardLine },
    { key: "ownership", label: "Ownership", icon: RiLockLine },
    { key: "seo", label: "SEO", icon: RiSearchLine },
    { key: "pricing", label: "Pricing", icon: RiMoneyDollarCircleLine },
];

const dashboardData = {
    customization: {
        custom: {
            score: 98,
            grade: "A+",
            tagline: "Built around your business, not a template",
            metrics: [
                { label: "Design Freedom", value: "100%", icon: RiPaletteLine },
                { label: "Frontend", value: "Fully Custom", icon: RiCodeLine },
                { label: "Backend", value: "Fully Custom", icon: RiServerLine },
            ],
            features: [
                { name: "Fully custom frontend UI", available: true },
                { name: "Custom backend architecture", available: true },
                { name: "Custom admin dashboard", available: true },
                { name: "Custom checkout & business flows", available: true },
                { name: "3D / GSAP / advanced interactions", available: true },
            ],
            highlight:
                "Your business gets its own digital experience — designed, developed and engineered around your exact requirements.",
        },

        template: {
            score: 75,
            grade: "B",
            tagline: "Fast to launch with themes and apps",
            metrics: [
                { label: "Design Freedom", value: "Theme-Based", icon: RiPaletteLine },
                { label: "Frontend", value: "Theme + Liquid", icon: RiCodeLine },
                { label: "Backend", value: "Platform Managed", icon: RiServerLine },
            ],
            features: [
                { name: "Fully custom frontend UI", available: false },
                { name: "Custom backend architecture", available: false },
                { name: "Custom admin dashboard", available: false },
                { name: "Custom checkout & business flows", available: false },
                { name: "3D / GSAP / advanced interactions", available: true },
            ],
            highlight:
                "Excellent for getting a standard store online quickly, but deeper customization depends on the platform's theme ecosystem and available extensions.",
        },
    },

    technology: {
        custom: {
            score: 96,
            grade: "A+",
            tagline: "Modern technology, engineered for your product",
            metrics: [
                { label: "Framework", value: "Next.js + MERN", icon: RiCodeLine },
                { label: "Database", value: "MongoDB", icon: RiDatabase2Line },
                { label: "Infrastructure", value: "AWS", icon: RiCloudLine },
            ],
            features: [
                { name: "Next.js application architecture", available: true },
                { name: "Node.js + Express backend", available: true },
                { name: "MongoDB database", available: true },
                { name: "AWS deployment", available: true },
                { name: "GSAP / Three.js / 3D experiences", available: true },
            ],
            highlight:
                "A complete custom MERN + Next.js commerce system — from frontend experience to backend infrastructure.",
        },

        template: {
            score: 86,
            grade: "A",
            tagline: "Reliable commerce infrastructure",
            metrics: [
                { label: "Framework", value: "SaaS Engine", icon: RiCodeLine },
                { label: "Database", value: "Platform Managed", icon: RiDatabase2Line },
                { label: "Infrastructure", value: "Shared Cloud", icon: RiCloudLine },
            ],
            features: [
                { name: "Next.js application architecture", available: false },
                { name: "Custom Node.js + Express backend", available: false },
                { name: "Own MongoDB database", available: false },
                { name: "Custom AWS architecture", available: false },
                { name: "Advanced custom interactions", available: true },
            ],
            highlight:
                "Template platforms manage the infrastructure for you, reducing technical complexity but limiting control over the underlying platform.",
        },
    },

    performance: {
        custom: {
            score: 94,
            grade: "A",
            tagline: "Built for speed from the ground up",
            metrics: [
                { label: "Frontend", value: "Next.js", icon: RiSpeedLine },
                { label: "Optimization", value: "Custom", icon: RiBarChartBoxLine },
                { label: "Scaling", value: "~10K Users", icon: RiGlobalLine },
            ],
            features: [
                { name: "Server-side rendering", available: true },
                { name: "Optimized assets & loading", available: true },
                { name: "Custom performance architecture", available: true },
                { name: "AWS scalable deployment", available: true },
                { name: "Performance-focused development", available: true },
            ],
            highlight:
                "Every part of the application can be optimized for your specific traffic, content and customer experience.",
        },

        template: {
            score: 91,
            grade: "A",
            tagline: "Reliable managed performance",
            metrics: [
                { label: "Infrastructure", value: "Managed", icon: RiCloudLine },
                { label: "Optimization", value: "Platform", icon: RiBarChartBoxLine },
                { label: "Scaling", value: "Managed", icon: RiGlobalLine },
            ],
            features: [
                { name: "Server-side rendering", available: true },
                { name: "Optimized infrastructure", available: true },
                { name: "Custom performance architecture", available: false },
                { name: "Custom AWS deployment", available: false },
                { name: "Platform-managed scaling", available: true },
            ],
            highlight:
                "Managed platforms take care of infrastructure, simplifying store maintenance while keeping optimizations within platform bounds.",
        },
    },

    dashboard: {
        custom: {
            score: 99,
            grade: "A+",
            tagline: "Your business gets its own dashboard",
            metrics: [
                { label: "Admin UI", value: "100% Custom", icon: RiLayoutGridLine },
                { label: "Workflows", value: "Business Specific", icon: RiSettings3Line },
                { label: "Control", value: "Full", icon: RiDashboardLine },
            ],
            features: [
                { name: "Custom admin dashboard", available: true },
                { name: "Custom business workflows", available: true },
                { name: "Custom analytics views", available: true },
                { name: "Role-based dashboard features", available: true },
                { name: "Features designed around your team", available: true },
            ],
            highlight:
                "Instead of adapting your business to a generic dashboard, we build the dashboard around how your business actually works.",
        },

        template: {
            score: 82,
            grade: "A-",
            tagline: "Standardized platform admin dashboard",
            metrics: [
                { label: "Admin UI", value: "Platform-Based", icon: RiLayoutGridLine },
                { label: "Workflows", value: "Standard", icon: RiSettings3Line },
                { label: "Control", value: "Limited", icon: RiDashboardLine },
            ],
            features: [
                { name: "Custom admin dashboard", available: false },
                { name: "Custom business workflows", available: false },
                { name: "Custom analytics views", available: true },
                { name: "Role-based dashboard features", available: true },
                { name: "Features designed around your team", available: false },
            ],
            highlight:
                "A mature and feature-rich admin experience, but businesses must work within the platform's rigid predefined management structure.",
        },
    },

    ownership: {
        custom: {
            score: 97,
            grade: "A+",
            tagline: "Built once. Built for you.",
            metrics: [
                { label: "Development", value: "One-Time", icon: RiMoneyDollarCircleLine },
                { label: "Codebase", value: "Custom", icon: RiCodeLine },
                { label: "Control", value: "Full", icon: RiLockLine },
            ],
            features: [
                { name: "Custom codebase", available: true },
                { name: "Custom frontend & backend", available: true },
                { name: "No theme dependency", available: true },
                { name: "No mandatory app ecosystem", available: true },
                { name: "Long-term customization possible", available: true },
            ],
            highlight:
                "Higher upfront investment, but your platform is engineered specifically for your business instead of being assembled from a standard theme.",
        },

        template: {
            score: 79,
            grade: "B+",
            tagline: "Lower entry cost, recurring platform model",
            metrics: [
                { label: "Development", value: "Subscription + Build", icon: RiMoneyDollarCircleLine },
                { label: "Codebase", value: "Platform-Based", icon: RiCodeLine },
                { label: "Control", value: "Platform-Limited", icon: RiLockLine },
            ],
            features: [
                { name: "Custom codebase", available: false },
                { name: "Custom frontend & backend", available: false },
                { name: "No theme dependency", available: false },
                { name: "No mandatory app ecosystem", available: false },
                { name: "Long-term customization possible", available: true },
            ],
            highlight:
                "Lower initial barrier makes template platforms accessible, while advanced custom workflows require extra paid plugins and external workarounds.",
        },
    },

    seo: {
        custom: {
            score: 96,
            grade: "A+",
            tagline: "SEO architecture built into the application",
            metrics: [
                { label: "SEO Control", value: "Full", icon: RiSearchLine },
                { label: "Rendering", value: "Next.js", icon: RiCodeLine },
                { label: "Optimization", value: "Custom", icon: RiSpeedLine },
            ],
            features: [
                { name: "Custom metadata architecture", available: true },
                { name: "Next.js SSR / SSG capabilities", available: true },
                { name: "Custom structured data", available: true },
                { name: "Custom URL architecture", available: true },
                { name: "Technical SEO optimization", available: true },
            ],
            highlight:
                "SEO is engineered into the application architecture instead of being restricted to predefined platform patterns.",
        },

        template: {
            score: 88,
            grade: "A",
            tagline: "Strong SEO for standard stores",
            metrics: [
                { label: "SEO Control", value: "Good", icon: RiSearchLine },
                { label: "Rendering", value: "Platform SSR", icon: RiCodeLine },
                { label: "Optimization", value: "Platform", icon: RiSpeedLine },
            ],
            features: [
                { name: "Custom metadata architecture", available: true },
                { name: "Next.js SSR / SSG capabilities", available: false },
                { name: "Custom structured data", available: true },
                { name: "Custom URL architecture", available: false },
                { name: "Technical SEO optimization", available: true },
            ],
            highlight:
                "Template platforms provide solid built-in SEO capabilities, with deeper technical customization constrained by the platform.",
        },
    },

    pricing: {
        custom: {
            score: 84,
            grade: "A",
            tagline: "Higher upfront. Lower dependency on subscriptions.",
            metrics: [
                { label: "Initial Cost", value: "Higher", icon: RiMoneyDollarCircleLine },
                { label: "Billing Model", value: "One-Time Build", icon: RiLockLine },
                { label: "Discount", value: "10–15%*", icon: RiPriceTag3Line },
            ],
            features: [
                { name: "One-time development investment", available: true },
                { name: "Frontend development included", available: true },
                { name: "Backend development included", available: true },
                { name: "Custom dashboard included", available: true },
                { name: "10–15% annual/monthly package discount", available: true },
            ],
            highlight:
                "A custom platform costs more upfront because you're investing in a complete dedicated system rather than adapting a ready-made template.",
        },

        template: {
            score: 88,
            grade: "A",
            tagline: "Lower entry cost with recurring expenses",
            metrics: [
                { label: "Initial Cost", value: "Lower", icon: RiMoneyDollarCircleLine },
                { label: "Billing Model", value: "Recurring", icon: RiLockLine },
                { label: "Customization", value: "Extra Dev Cost", icon: RiPriceTag3Line },
            ],
            features: [
                { name: "Low initial platform cost", available: true },
                { name: "Frontend development included", available: false },
                { name: "Backend development included", available: false },
                { name: "Custom dashboard included", available: false },
                { name: "Additional developer cost", available: true },
            ],
            highlight:
                "Template platforms can be cheaper to start, but advanced customization may require specialized developers, themes and additional apps.",
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

const ScoreRing = ({ score, size = 56 }) => {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const scoreColor = getScoreColor(score);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={scoreColor} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.8s ease-out, stroke 0.5s ease-out" }}
                />
            </svg>
            <span className="absolute text-sm font-bold text-gray-900">{score}</span>
        </div>
    );
};

/* ═══════════════ PROGRESS BAR ═══════════════ */

const ProgressBar = ({ value, max = 100 }) => {
    const gradient = getScoreGradient(value);
    return (
        <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                    width: `${Math.min(100, Math.max(0, (value / max) * 100))}%`,
                    background: gradient,
                }}
            />
        </div>
    );
};

/* ═══════════════ DASHBOARD PANEL ═══════════════ */

const DashboardPanel = ({ platform, data, icon: PlatformIcon, activeTab, isWinner }) => {
    const scoreColor = getScoreColor(data.score);

    return (
        <div className={`dashboard-panel rounded-2xl overflow-hidden border bg-white shadow-xl transition-[border-color,box-shadow] duration-500 flex flex-col ${isWinner ? "border-[#002bba]/50 shadow-2xl ring-2 ring-[#002bba]/20" : "border-black/10"}`}>
            {/* ─── Dashboard Title Bar ─── */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/70">
                <div className="flex items-center gap-2.5">
                    {/* Window dots */}
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <PlatformIcon size={16} className={platform.toLowerCase().includes("custom") ? "text-[#002bba]" : "text-gray-500"} />
                        <span className="text-xs text-gray-600 font-mono font-medium">{platform.toLowerCase()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <RiSearchLine size={14} className="text-gray-400" />
                    <RiNotification3Line size={14} className="text-gray-400" />
                    <RiSettings3Line size={14} className="text-gray-400" />
                </div>
            </div>

            {/* ─── Platform Header ─── */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-3xl md:text-4xl font-normal text-gray-900">{platform}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-medium">{data.tagline}</p>
                    </div>
                    <div className="flex py-2 items-center gap-3">
                        <ScoreRing score={data.score} />
                        <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: scoreColor }}>{data.grade}</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Grade</div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <ProgressBar value={data.score} />
                </div>
            </div>

            {/* ─── Metrics Row ─── */}
            <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/40">
                {data.metrics.map((m, i) => {
                    const MIcon = m.icon;
                    return (
                        <div key={i} className={`metric-item px-4 py-4 flex flex-col items-center text-center gap-1.5 ${i < 2 ? "border-r border-gray-100" : ""}`}>
                            <MIcon size={16} className="text-gray-400" />
                            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{m.label}</span>
                            <span className="text-sm font-semibold text-gray-900">{m.value}</span>
                        </div>
                    );
                })}
            </div>

            {/* ─── Features Checklist ─── */}
            <div className="px-6 py-5 flex-1 bg-white">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mb-3">Feature Checklist</p>
                <div className="space-y-3">
                    {data.features.map((f, i) => (
                        <div key={i} className="feature-row flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${f.available ? "bg-emerald-50 text-emerald-600 border border-emerald-200/70" : "bg-rose-50 text-rose-400 border border-rose-200/70"}`}>
                                {f.available
                                    ? <RiCheckLine size={13} className="text-emerald-600" />
                                    : <RiCloseLine size={13} className="text-rose-400" />
                                }
                            </div>
                            <span className={`text-sm ${f.available ? "text-gray-800 font-medium" : "text-gray-400 line-through"}`}>
                                {f.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

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
    const customWins = (currentData?.custom?.score ?? 0) >= (currentData?.template?.score ?? 0);

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

        return () => tl.kill();
    }, [activeTab]);

    return (
        <div ref={containerRef} className="w-full bg_blue relative overflow-hidden pt-10! md:pt-24! mt-10! md:mt-24!">

            {/* ── Heading ── */}
            <div className="w-full padding py-0! text-white">
                <div className="w-full space-y-12 pb-12 border-white/50 md:space-y-0 border-b md:grid grid-cols-[28%_30%_42%]">
                    <div>
                        <h2 data-para-effect className="capitalize primary-font text-5xl leading-none">
                            Template or Custom Platform
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4"></div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect>
                            <span className="opacity-0 secondary-font max-sm:hidden pointer-events-none">
                                ...............
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
                        platform="Custom Platform"
                        data={currentData.custom}
                        icon={RiTerminalBoxLine}
                        activeTab={activeTab}
                        isWinner={customWins}
                    />
                    <DashboardPanel
                        platform="Template-Based Platform"
                        data={currentData.template}
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
