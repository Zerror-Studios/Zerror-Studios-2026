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
} from "@remixicon/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════ SHOPIFY ICON ══════════════════════════ */
const ShopifyIcon = ({ size = 16, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 34 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M15.481 1.36025C15.755 1.36025 15.892 1.49725 16.166 1.63425C14.522 2.31925 12.878 4.10025 12.056 7.93625L9.042 8.75825C10.001 6.01825 11.919 1.36025 15.481 1.36025ZM16.988 2.73025C17.262 3.55225 17.536 4.51125 17.536 6.01825C17.536 6.15525 17.536 6.15525 17.536 6.29225L13.563 7.38825C14.385 4.51125 15.755 3.27825 16.988 2.73025ZM20.55 5.19625L18.769 5.74425C18.769 5.60725 18.769 5.47025 18.769 5.33325C18.769 4.10025 18.632 3.14125 18.358 2.31925C19.317 2.59325 20.139 3.82625 20.55 5.19625ZM29.455 7.38825C29.455 7.25125 29.318 7.11425 29.181 7.11425C28.907 7.11425 26.03 6.84025 26.03 6.84025C26.03 6.84025 23.975 4.78525 23.701 4.64825C23.427 4.37425 23.016 4.51125 22.879 4.51125C22.879 4.51125 22.468 4.64825 21.783 4.92225C21.098 3.00425 19.865 1.22325 17.81 1.22325H17.673C17.125 0.401246 16.303 0.127246 15.618 0.127246C10.686 -0.0097542 8.357 6.15525 7.535 9.30625C6.439 9.58025 5.343 9.99125 4.11 10.4022C3.014 10.6762 3.014 10.8132 2.877 11.7722C2.74 12.4572 0 34.1032 0 34.1032L21.783 38.2132L33.565 35.6102C33.565 35.6102 29.455 7.66225 29.455 7.38825Z"
            fill="#96bf48"
        />
        <path
            d="M29.0442 7.11862C28.9072 7.11862 26.0302 6.84462 26.0302 6.84462C26.0302 6.84462 23.9752 4.78963 23.7012 4.65263C23.5642 4.51563 23.5642 4.51562 23.4272 4.51562L21.7832 38.2176L33.5652 35.6146C33.5652 35.6146 29.4552 7.66663 29.4552 7.39263C29.4552 7.25563 29.1812 7.11862 29.0442 7.11862Z"
            fill="#5A863E"
        />
        <path
            d="M17.8101 13.6911L16.3031 18.0751C16.3031 18.0751 15.0701 17.3901 13.4261 17.3901C11.0971 17.3901 10.9601 18.7601 10.9601 19.1711C10.9601 21.0891 16.1661 21.9111 16.1661 26.5691C16.1661 30.2681 13.8371 32.5971 10.6861 32.5971C6.98709 32.5971 5.06909 30.2681 5.06909 30.2681L6.02809 26.9801C6.02809 26.9801 7.94609 28.6241 9.59009 28.6241C10.6861 28.6241 11.0971 27.8021 11.0971 27.1171C11.0971 24.5141 6.85009 24.3771 6.85009 20.1301C6.85009 16.5681 9.45309 13.1431 14.5221 13.1431C16.8511 13.0061 17.8101 13.6911 17.8101 13.6911Z"
            fill="#FFFFFF"
        />
    </svg>
);

/* ══════════════════════════ DATA ══════════════════════════ */

const tabs = [
    { key: "ease", label: "Ease of Use", icon: RiSpeedLine },
    { key: "scale", label: "Scalability", icon: RiExpandUpDownLine },
    { key: "custom", label: "Customization", icon: RiPaintBrushLine },
    { key: "pricing", label: "Pricing", icon: RiMoneyDollarCircleLine },
];

const dashboardData = {
    ease: {
        zcom: {
            score: 92,
            grade: "A+",
            tagline: "Built for founders, not developers",
            metrics: [
                { label: "Setup Time", value: "~2 days", icon: RiSpeedLine },
                { label: "Learning Curve", value: "Minimal", icon: RiBarChartBoxLine },
                { label: "Admin Panel", value: "Visual Builder", icon: RiLayoutGridLine },
            ],
            features: [
                { name: "Drag & drop page builder", available: true },
                { name: "One-click product management", available: true },
                { name: "No coding required for edits", available: true },
                { name: "Intuitive order dashboard", available: true },
                { name: "Built-in analytics dashboard", available: true },
            ],
            highlight: "Everything a non-tech founder needs — no Liquid, no code, no friction.",
        },
        shopify: {
            score: 78,
            grade: "B+",
            tagline: "Powerful but takes time to learn",
            metrics: [
                { label: "Setup Time", value: "~5 days", icon: RiSpeedLine },
                { label: "Learning Curve", value: "Moderate", icon: RiBarChartBoxLine },
                { label: "Admin Panel", value: "Feature-Rich", icon: RiLayoutGridLine },
            ],
            features: [
                { name: "Drag & drop page builder", available: true },
                { name: "One-click product management", available: true },
                { name: "No coding required for edits", available: false },
                { name: "Intuitive order dashboard", available: true },
                { name: "Built-in analytics dashboard", available: true },
            ],
            highlight: "Extensive documentation & community, but Liquid templating adds complexity.",
        },
    },
    scale: {
        zcom: {
            score: 80,
            grade: "B+",
            tagline: "Perfect for growing brands",
            metrics: [
                { label: "Monthly Volume", value: "Up to ₹5L", icon: RiBarChartBoxLine },
                { label: "CDN", value: "Included", icon: RiGlobalLine },
                { label: "Uptime", value: "99.9%", icon: RiShieldCheckLine },
            ],
            features: [
                { name: "Auto-scaling architecture", available: true },
                { name: "Custom feature additions", available: true },
                { name: "Enterprise-grade traffic", available: false },
                { name: "Multi-region deployment", available: false },
                { name: "Zero third-party bloat", available: true },
            ],
            highlight: "Designed for emerging & mid-size brands — scales without plugin overload.",
        },
        shopify: {
            score: 95,
            grade: "A+",
            tagline: "Enterprise-grade infrastructure",
            metrics: [
                { label: "Monthly Volume", value: "Unlimited", icon: RiBarChartBoxLine },
                { label: "CDN", value: "Global", icon: RiGlobalLine },
                { label: "Uptime", value: "99.99%", icon: RiShieldCheckLine },
            ],
            features: [
                { name: "Auto-scaling architecture", available: true },
                { name: "Custom feature additions", available: true },
                { name: "Enterprise-grade traffic", available: true },
                { name: "Multi-region deployment", available: true },
                { name: "Zero third-party bloat", available: false },
            ],
            highlight: "Handles flash sales & millions of visitors. Shopify Plus for enterprise.",
        },
    },
    custom: {
        zcom: {
            score: 97,
            grade: "A+",
            tagline: "Your store, your rules",
            metrics: [
                { label: "Design Freedom", value: "100%", icon: RiPaletteLine },
                { label: "Code Access", value: "Full Source", icon: RiCodeLine },
                { label: "Plugin Deps", value: "Zero", icon: RiPlugLine },
            ],
            features: [
                { name: "Fully bespoke UI design", available: true },
                { name: "Custom checkout flows", available: true },
                { name: "Full source code ownership", available: true },
                { name: "No template restrictions", available: true },
                { name: "Custom feature development", available: true },
            ],
            highlight: "Unmatched flexibility — every pixel, every interaction, fully yours.",
        },
        shopify: {
            score: 68,
            grade: "C+",
            tagline: "Themes are nice — until they aren't",
            metrics: [
                { label: "Design Freedom", value: "Limited", icon: RiPaletteLine },
                { label: "Code Access", value: "Theme Only", icon: RiCodeLine },
                { label: "Plugin Deps", value: "Heavy", icon: RiPlugLine },
            ],
            features: [
                { name: "Fully bespoke UI design", available: false },
                { name: "Custom checkout flows", available: false },
                { name: "Full source code ownership", available: false },
                { name: "No template restrictions", available: false },
                { name: "Custom feature development", available: true },
            ],
            highlight: "1000+ themes available, but deep structural changes hit Liquid walls.",
        },
    },
    pricing: {
        zcom: {
            score: 85,
            grade: "A",
            tagline: "Pay once, own forever",
            metrics: [
                { label: "Monthly Cost", value: "₹0 plugins", icon: RiMoneyDollarCircleLine },
                { label: "Ownership", value: "Full IP", icon: RiLockLine },
                { label: "2-Year TCO", value: "Lower", icon: RiBarChartBoxLine },
            ],
            features: [
                { name: "No recurring plugin fees", available: true },
                { name: "Transparent one-time build cost", available: true },
                { name: "IP ownership on full payment", available: true },
                { name: "Low monthly maintenance", available: true },
                { name: "Affordable starter plans", available: false },
            ],
            highlight: "Higher upfront, but zero plugin subscriptions = lower long-term cost.",
        },
        shopify: {
            score: 72,
            grade: "B",
            tagline: "Affordable entry, costly at scale",
            metrics: [
                { label: "Monthly Cost", value: "₹200-500/mo plugins", icon: RiMoneyDollarCircleLine },
                { label: "Ownership", value: "Licensed", icon: RiLockLine },
                { label: "2-Year TCO", value: "Higher", icon: RiBarChartBoxLine },
            ],
            features: [
                { name: "No recurring plugin fees", available: false },
                { name: "Transparent one-time build cost", available: true },
                { name: "IP ownership on full payment", available: false },
                { name: "Low monthly maintenance", available: false },
                { name: "Affordable starter plans", available: true },
            ],
            highlight: "Plans start at $39/mo but paid apps stack up — avg $200-500/month extra.",
        },
    },
};

/* ═══════════════ SCORE RING COMPONENT ═══════════════ */

const ScoreRing = ({ score, color, size = 56 }) => {
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" className="text-white/10" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
                />
            </svg>
            <span className="absolute text-sm font-bold text-white">{score}</span>
        </div>
    );
};

/* ═══════════════ PROGRESS BAR ═══════════════ */

const ProgressBar = ({ value, max = 100, color }) => (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
            className="h-full rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
        />
    </div>
);

/* ═══════════════ DASHBOARD PANEL ═══════════════ */

const DashboardPanel = ({ platform, data, accentColor, accentGradient, icon: PlatformIcon, activeTab, isWinner }) => {

    return (
        <div className={`dashboard-panel rounded-2xl overflow-hidden border transition-[border-color,box-shadow] duration-500 flex flex-col ${isWinner ? "border-white/50" : "border-white/10"}`}
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)" }}
        >
            {/* ─── Dashboard Title Bar ─── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2.5">
                    {/* Window dots */}
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70"></div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <PlatformIcon size={16} className="text-white/60" />
                        <span className="text-xs text-white/50 font-mono">{platform.toLowerCase()}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <RiSearchLine size={14} className="text-white/30" />
                    <RiNotification3Line size={14} className="text-white/30" />
                    <RiSettings3Line size={14} className="text-white/30" />
                </div>
            </div>

            {/* ─── Platform Header ─── */}
            <div className="px-5 pt-5 pb-4 border-b border-white/10" style={{ background: accentGradient }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-4xl  text-white">{platform}</h4>
                        <p className="text-xs text-white/60 mt-0.5">{data.tagline}</p>
                    </div>
                    <div className="flex py-5 items-center gap-3">
                        <ScoreRing score={data.score} color={accentColor} />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{data.grade}</div>
                            <div className="text-xs text-white/40 uppercase tracking-wider">Grade</div>
                        </div>
                    </div>
                </div>
                <ProgressBar value={data.score} color={accentColor} />
            </div>

            {/* ─── Metrics Row ─── */}
            <div className="grid grid-cols-3 border-b border-white/10">
                {data.metrics.map((m, i) => {
                    const MIcon = m.icon;
                    return (
                        <div key={i} className={`metric-item px-4 py-4 flex flex-col items-center text-center gap-1.5 ${i < 2 ? "border-r border-white/10" : ""}`}>
                            <MIcon size={16} className="text-white/40" />
                            <span className="text-xs text-white/40 uppercase tracking-wider">{m.label}</span>
                            <span className="text-sm  text-white">{m.value}</span>
                        </div>
                    );
                })}
            </div>

            {/* ─── Features Checklist ─── */}
            <div className="px-5 py-4 flex-1">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Feature Checklist</p>
                <div className="space-y-2.5">
                    {data.features.map((f, i) => (
                        <div key={i} className="feature-row flex items-center gap-2.5">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${f.available ? "bg-green-500/20" : "bg-red-500/10"}`}>
                                {f.available
                                    ? <RiCheckLine size={12} className="text-green-400" />
                                    : <RiCloseLine size={12} className="text-red-400/60" />
                                }
                            </div>
                            <span className={`text-sm ${f.available ? "text-white/70" : "text-white/30 line-through"}`}>
                                {f.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Bottom Highlight ─── */}
            <div className="px-5 py-3.5 border-t border-white/10 bg-white/[0.03]">
                <p className="text-[11px] text-white/50 italic leading-relaxed">
                    &quot;{data.highlight}&quot;
                </p>
            </div>

            {/* ─── Winner Badge ─── */}
            {isWinner && (
                <div className="px-5 py-2.5 flex items-center justify-center gap-2 border-t border-white/20">
                    <RiStarLine size={14} className="text-yellow-300" />
                    <span className="text-xs  text-white uppercase ">Leads in {tabs.find(t => t.key === activeTab)?.label}</span>
                </div>
            )}
        </div>
    );
};

/* ══════════════════ MAIN COMPONENT ══════════════════ */

const EcommPlatformCompare = () => {
    const [activeTab, setActiveTab] = useState("ease");
    const containerRef = useRef(null);
    const panelsRef = useRef(null);
    const isFirstRender = useRef(true);

    const currentData = dashboardData[activeTab];
    const zcomWins = currentData.zcom.score >= currentData.shopify.score;

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
                            Shopify or a <br /> custom platform?
                        </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4"></div>
                    <div className="text-3xl md:pl-2">
                        <h3 data-para-effect>
                            <span className="opacity-0 secondary-font max-sm:hidden pointer-events-none">
                                ...............
                            </span>
                            We&apos;re not platform loyalists. Shopify is right for most stores, and we build it well. But
                            some businesses don&apos;t fit a template — and forcing them never ends well.
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
                        platform="Z-com"
                        data={currentData.zcom}
                        accentColor="#4f8cff"
                        accentGradient="linear-gradient(135deg, rgba(0,43,186,0.4) 0%, rgba(79,140,255,0.15) 100%)"
                        icon={RiTerminalBoxLine}
                        activeTab={activeTab}
                        isWinner={zcomWins}
                    />
                    <DashboardPanel
                        platform="Shopify"
                        data={currentData.shopify}
                        accentColor="#96bf48"
                        accentGradient="linear-gradient(135deg, rgba(94,142,62,0.4) 0%, rgba(150,191,72,0.15) 100%)"
                        icon={ShopifyIcon}
                        activeTab={activeTab}
                        isWinner={!zcomWins}
                    />
                </div>

            </div>
        </div>
    );
};

export default EcommPlatformCompare;
