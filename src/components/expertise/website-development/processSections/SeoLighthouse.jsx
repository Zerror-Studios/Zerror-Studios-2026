"use client";
import React, { useState, useEffect } from 'react';
import {
    RiSearchLine,
    RiLockLine,
    RiSparklingLine,
    RiCheckLine,
    RiArrowRightLine,
    RiGlobalLine,
    RiFlashlightLine,
    RiComputerLine,
    RiSmartphoneLine,
    RiRefreshLine
} from '@remixicon/react';
import Image from 'next/image';

const TARGET_URL = "zerrorstudios.com";

const METRICS = [
    { label: "First Contentful Paint", abbr: "FCP", value: "0.4 s", status: "Good" },
    { label: "Largest Contentful Paint", abbr: "LCP", value: "0.8 s", status: "Good" },
    { label: "Total Blocking Time", abbr: "TBT", value: "0 ms", status: "Good" },
    { label: "Cumulative Layout Shift", abbr: "CLS", value: "0.00", status: "Good" },
    { label: "Speed Index", abbr: "SI", value: "0.6 s", status: "Good" },
    { label: "Interaction to Next Paint", abbr: "INP", value: "32 ms", status: "Good" },
];

const LIGHTHOUSE_CATEGORIES = [
    { label: "Performance", score: 99, color: "#0cce6b" },
    { label: "Accessibility", score: 100, color: "#0cce6b" },
    { label: "Best Practices", score: 100, color: "#0cce6b" },
    { label: "SEO", score: 100, color: "#0cce6b" },
];

const AUDIT_STEPS = [
    "Establishing secure connection to zerrorstudios.com...",
    "Benchmarking Next.js server response & TTFB...",
    "Measuring Core Web Vitals (LCP, CLS, FCP)...",
    "Validating Schema.org & OpenGraph metadata...",
    "Generating Google Lighthouse 90+ audit report...",
];

const SeoLighthouse = () => {
    // Phases: 'typing' | 'analyzing' | 'results'
    const [phase, setPhase] = useState('typing');
    const [typedText, setTypedText] = useState('');
    const [analysisStep, setAnalysisStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    const [deviceTab, setDeviceTab] = useState('desktop');

    // Main animation loop orchestration
    useEffect(() => {
        let isCancelled = false;

        const runLoop = async () => {
            if (isCancelled) return;

            // --- PHASE 1: TYPING ---
            setPhase('typing');
            setTypedText('');
            setProgress(0);
            setAnalysisStep(0);
            setCounts([0, 0, 0, 0]);

            // Initial pause before typing
            await new Promise(r => setTimeout(r, 600));
            if (isCancelled) return;

            // Type "zerrorstudios.com" character by character
            for (let i = 1; i <= TARGET_URL.length; i++) {
                if (isCancelled) return;
                setTypedText(TARGET_URL.slice(0, i));
                await new Promise(r => setTimeout(r, 70));
            }

            // Brief pause after typing before auto-submitting
            await new Promise(r => setTimeout(r, 700));
            if (isCancelled) return;

            // --- PHASE 2: ANALYZING ---
            setPhase('analyzing');
            const totalAnalyzingMs = 2200;
            const intervalStep = 50;
            let elapsed = 0;

            const progressTimer = setInterval(() => {
                elapsed += intervalStep;
                const ratio = Math.min(1, elapsed / totalAnalyzingMs);
                setProgress(Math.round(ratio * 100));

                const stepIndex = Math.min(
                    AUDIT_STEPS.length - 1,
                    Math.floor(ratio * AUDIT_STEPS.length)
                );
                setAnalysisStep(stepIndex);

                if (elapsed >= totalAnalyzingMs) {
                    clearInterval(progressTimer);
                }
            }, intervalStep);

            await new Promise(r => setTimeout(r, totalAnalyzingMs + 200));
            clearInterval(progressTimer);
            if (isCancelled) return;

            // --- PHASE 3: RESULTS ---
            setPhase('results');

            // Animate counter scores up to target scores
            const countDuration = 1200;
            const countInterval = 30;
            let countElapsed = 0;

            const counterTimer = setInterval(() => {
                countElapsed += countInterval;
                const p = Math.min(1, countElapsed / countDuration);
                // Ease out quad
                const ease = 1 - (1 - p) * (1 - p);

                setCounts([
                    Math.round(99 * ease),
                    Math.round(100 * ease),
                    Math.round(100 * ease),
                    Math.round(100 * ease),
                ]);

                if (countElapsed >= countDuration) {
                    clearInterval(counterTimer);
                }
            }, countInterval);

            // Hold results view for 8 seconds
            await new Promise(r => setTimeout(r, 8000));
            clearInterval(counterTimer);
            if (isCancelled) return;

            // Smooth loop repeat
            runLoop();
        };

        runLoop();

        return () => {
            isCancelled = true;
        };
    }, []);

    const radius = 34;
    const circumference = 2 * Math.PI * radius;

    return (
        <section className="w-full h-full flex flex-col overflow-hidden">
            <style>{`
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.03); }
                }
                @keyframes cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .cursor-blink {
                    animation: cursorBlink 0.9s infinite;
                }
                .glow-pulse {
                    animation: pulseGlow 2.5s ease-in-out infinite;
                }
            `}</style>

            <div className="w-full h-full bg-white text-gray-800 flex flex-col font-sans overflow-hidden relative border border-gray-200/80 rounded-2xl">

                {/* Top Browser / Audit Tool Header */}
                <div className="w-full bg-gray-50/60 border-b border-gray-100 px-4 py-2 grid grid-cols-3 shrink-0 select-none items-center">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                        </div>

                        {/* Breadcrumb / Title */}
                        <div className="hidden sm:flex items-center gap-2 ml-3 pl-3 border-l border-gray-200 text-xs text-gray-400">
                            <div className="w-14 opacity-80">
                                <Image width={100} height={100} src="/icons/google.webp" alt="google icon" />
                            </div>
                        </div>
                    </div>

                    {/* URL Status Bar */}
                    <div className="flex justify-center items-center">
                        <div className="flex items-center justify-center gap-2 bg-white border border-gray-200/80 rounded-full px-3 py-0.5 text-xs text-gray-600 max-w-[16rem] sm:max-w-xs truncate shadow-2xs">
                            <RiLockLine size={12} className="text-[#0cce6b] shrink-0" />
                            <span className="text-gray-400">https://</span>
                            <span className="text-gray-700 truncate">
                                {typedText || "zerrorstudios.com"}
                            </span>
                        </div>
                    </div>

                    {/* Device Toggle & Live Status */}
                    <div className="flex items-center justify-end gap-2">
                        <div className="hidden sm:flex items-center bg-gray-100/70 p-0.5 rounded-lg text-xs">
                            <button
                                type="button"
                                onClick={() => setDeviceTab('desktop')}
                                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md transition-all ${deviceTab === 'desktop' ? 'bg-white border border-gray-200/60 text_blue' : 'text-gray-400 hover:text-gray-700'}`}
                            >
                                <RiComputerLine size={12} />
                                <span>Desktop</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Body View */}
                <div className="flex-1 w-full overflow-y-auto relative flex flex-col">

                    {/* --- VIEW A: TYPING & SEARCH BAR CENTER STATE --- */}
                    {phase === 'typing' && (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                            {/* Google / Lighthouse Hero Badge */}
                            <div className="mb-6 flex flex-col items-center">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 center">
                                        <RiFlashlightLine size={22} className="text-amber-500" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xl tracking-tight text-gray-900 flex items-center gap-1.5">
                                            <span>Lighthouse</span>
                                            <span className="text_blue text-[11px] px-2 py-0.5 bg-blue-50 rounded-full border border-blue-100">
                                                v12.0
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">Google Core Web Vitals & Search Engine Optimization</p>
                                    </div>
                                </div>
                            </div>

                            {/* Centered Search Bar */}
                            <div className="w-full max-w-lg">
                                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-xs p-1.5 transition-all hover:border-blue-300">
                                    <div className="pl-3 pr-2 text_blue">
                                        <RiSearchLine size={18} />
                                    </div>
                                    <div className="flex-1 flex items-center text-left text-sm text-gray-700 font-mono">
                                        <span className="text-gray-400 select-none">https://</span>
                                        <span className="text_blue">{typedText}</span>
                                        <span className="w-0.5 h-4 bg-blue-600 ml-0.5 cursor-blink inline-block" />
                                    </div>
                                    <button
                                        type="button"
                                        className="bg_blue hover:opacity-90 text-white text-xs px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                                    >
                                        <span>Analyze</span>
                                        <RiArrowRightLine size={14} />
                                    </button>
                                </div>

                                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <RiCheckLine size={13} className="text-emerald-500" /> Real-time Chrome UX Report
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <RiCheckLine size={13} className="text-emerald-500" /> Google Search SERP Preview
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="flex items-center gap-1">
                                        <RiCheckLine size={13} className="text-emerald-500" /> 90+ Score Target
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- VIEW B: ANALYZING STATE --- */}
                    {phase === 'analyzing' && (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 rounded-full border-2 border-blue-100 border-t-blue-600 animate-spin center" />
                                <div className="absolute inset-0 center">
                                    <RiSparklingLine size={24} className="text_blue animate-pulse" />
                                </div>
                            </div>

                            <h3 className="text-lg text-gray-800 mb-1">
                                Auditing {TARGET_URL}
                            </h3>
                            <p className="text-xs text-gray-400 mb-6 h-5 transition-all">
                                {AUDIT_STEPS[analysisStep]}
                            </p>

                            {/* Progress bar */}
                            <div className="w-full max-w-xs bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
                                <div
                                    className="bg-blue-600 h-full transition-all duration-100 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-xs text_blue">
                                {progress}% Complete
                            </span>
                        </div>
                    )}

                    {/* --- VIEW C: FULL RESULTS DASHBOARD --- */}
                    {phase === 'results' && (
                        <div className="p-4 sm:p-5 space-y-4 animate-fadeIn">

                            {/* Top Summary Banner */}
                            <div className="bg-gray-50/70 rounded-xl p-4 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                            Audit Passed
                                        </span>
                                        <span className="text-xs text-gray-400">Tested on Next.js 16 Production Build</span>
                                    </div>
                                    <h2 className="text-lg text-gray-800 flex items-center gap-2">
                                        <span>https://{TARGET_URL}</span>
                                        <RiCheckLine size={20} className="text-emerald-600 shrink-0" />
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3 self-start md:self-auto">
                                    <div className="text-right">
                                        <p className="text-[11px] text-gray-400 uppercase tracking-wider">Overall Grade</p>
                                        <p className="text-sm text-emerald-600">Grade A+ (Optimal)</p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-emerald-500 text-white center text-sm shadow-xs">
                                        A+
                                    </div>
                                </div>
                            </div>

                            {/* 1. Lighthouse 4 Category Score Gauges */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {LIGHTHOUSE_CATEGORIES.map((cat, idx) => {
                                    const currentScore = counts[idx] || 0;
                                    const offset = circumference - (currentScore / 100) * circumference;

                                    return (
                                        <div
                                            key={cat.label}
                                            className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 flex flex-col items-center text-center transition-all hover:border-gray-200 shadow-2xs"
                                        >
                                            {/* Circular Gauge */}
                                            <div className="relative w-18 h-18 sm:w-20 sm:h-20 center mb-2">
                                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                                                    {/* Background ring */}
                                                    <circle
                                                        cx="40"
                                                        cy="40"
                                                        r={radius}
                                                        stroke="#F1F5F9"
                                                        strokeWidth="5"
                                                        fill="transparent"
                                                    />
                                                    {/* Filled progress ring */}
                                                    <circle
                                                        cx="40"
                                                        cy="40"
                                                        r={radius}
                                                        stroke={cat.color}
                                                        strokeWidth="5"
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={offset}
                                                        strokeLinecap="round"
                                                        fill="transparent"
                                                        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 center flex-col">
                                                    <span className="text-lg sm:text-xl text-emerald-600">
                                                        {currentScore}
                                                    </span>
                                                </div>
                                            </div>

                                            <span className="text-xs text-gray-700">
                                                {cat.label}
                                            </span>
                                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 border border-emerald-100">
                                                90–100 (Pass)
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 2. Middle Grid: Core Web Vitals + Google Search (SERP) Preview */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                                {/* Core Web Vitals Metrics Breakdown (5 cols) */}
                                <div className="lg:col-span-5 bg-white rounded-xl p-4 border border-gray-100 shadow-2xs flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs text-gray-700 flex items-center gap-1.5">
                                            <RiFlashlightLine size={15} className="text_blue" />
                                            <span>Core Web Vitals Metrics</span>
                                        </h3>
                                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                            Fast ⚡
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        {METRICS.map((m) => (
                                            <div
                                                key={m.abbr}
                                                className="p-2.5 rounded-lg bg-gray-50/60 border border-gray-100 flex flex-col justify-between"
                                            >
                                                <div className="flex items-center justify-between text-gray-400 text-[10px] mb-1">
                                                    <span>{m.abbr}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <div className="text-xs text-gray-800">
                                                    {m.value}
                                                </div>
                                                <div className="text-[10px] text-gray-400 truncate">
                                                    {m.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
                                        <span>Initial Server Response (TTFB)</span>
                                        <span className="text-gray-700">42 ms</span>
                                    </div>
                                </div>

                                {/* Google Search SERP Rich Snippet (7 cols) */}
                                <div className="lg:col-span-7 bg-white rounded-xl p-4 border border-gray-100 shadow-2xs flex flex-col justify-between">
                                    <div>
                                        {/* Mock Google Search Top Bar */}
                                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <RiGlobalLine size={15} className="text-gray-400" />
                                                <span className="text-xs text-gray-700">
                                                    Google Search Result (Live Snippet)
                                                </span>
                                            </div>
                                            <span className="text-[10px] bg-blue-50 text_blue px-2 py-0.5 rounded-full border border-blue-100">
                                                Rank #1 Top Placement
                                            </span>
                                        </div>

                                        {/* Authentic Google Search Result Card */}
                                        <div className="p-3 bg-gray-50/40 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                            {/* URL Breadcrumb */}
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                <div className="w-4 h-4 rounded-full bg-blue-600 text-white center text-[9px]">
                                                    Z
                                                </div>
                                                <div className="flex items-center gap-1 truncate text-[11px]">
                                                    <span className="text-gray-700">Zerror Studios</span>
                                                    <span className="text-gray-400">› expertise › website-development</span>
                                                </div>
                                            </div>

                                            {/* Blue Clickable Title Tag */}
                                            <h4 className="text-sm text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1.5">
                                                Custom Website Design & Development — Zerror Studios
                                            </h4>

                                            {/* Meta Description */}
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                                Award-winning digital studio crafting hyper-fast Next.js websites, 3D interactive experiences, and 90+ Lighthouse optimized web applications.
                                            </p>

                                            {/* Rich Snippets / Stars */}
                                            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                                                <span className="text-amber-500">★★★★★</span>
                                                <span className="text-gray-700">5.0</span>
                                                <span className="text-gray-400">(52 client reviews)</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                                                    Mobile-Friendly
                                                </span>
                                            </div>

                                            {/* Sitelinks Mini Grid */}
                                            <div className="mt-3 pt-2.5 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                                                <div className="text-[#1a0dab] hover:underline cursor-pointer text-[11px]">
                                                    Our Featured Works
                                                </div>
                                                <div className="text-[#1a0dab] hover:underline cursor-pointer text-[11px]">
                                                    Development Process
                                                </div>
                                                <div className="text-[#1a0dab] hover:underline cursor-pointer text-[11px]">
                                                    Schedule Discovery Call
                                                </div>
                                                <div className="text-[#1a0dab] hover:underline cursor-pointer text-[11px]">
                                                    Technology Stack & CMS
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEO Checklist Pills */}
                                    <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center gap-2 text-[10px] text-gray-400">
                                        <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                                            <RiCheckLine size={12} className="text-emerald-500" /> Schema JSON-LD Valid
                                        </span>
                                        <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                                            <RiCheckLine size={12} className="text-emerald-500" /> OpenGraph & Twitter Cards
                                        </span>
                                        <span className="flex items-center gap-1 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                                            <RiCheckLine size={12} className="text-emerald-500" /> Canonical & Robots.txt OK
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Status bar */}
                            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                                <span className="flex items-center gap-1 text_blue">
                                    <RiRefreshLine size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
                                    Looping audit preview simulation
                                </span>
                                <span>Powered by Next.js & Google Lighthouse</span>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </section>
    );
};

export default SeoLighthouse;
