"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
    RiAmazonFill,
    RiGithubFill,
    RiNextjsFill,
    RiTerminalBoxFill,
    RiTerminalBoxLine,
    RiCheckLine,
    RiCheckDoubleLine,
    RiExternalLinkLine,
    RiFileCopyLine,
    RiRefreshLine,
    RiPlayFill,
    RiRocketLine,
    RiLockLine,
    RiGlobalLine,
    RiGitBranchLine,
    RiGitCommitLine,
    RiShieldCheckLine,
    RiCloudLine,
    RiServerLine,
    RiDatabase2Line,
    RiCpuLine,
    RiTimeLine,
    RiSearchLine,
    RiNotification3Line,
    RiSettings4Line,
    RiSparklingLine,
    RiArrowRightLine,
    RiCodeSSlashLine,
    RiPulseLine
} from '@remixicon/react';

// Simulated terminal build log entries with timing
const TERMINAL_LOGS = [
    { text: "Initializing AWS Amplify Hosting Build Environment (Agent v14.2.1)...", delay: 300, type: "info" },
    { text: "Cloning GitHub repository: sunny-zerror/Zerror-Studios-2026 (branch: main)...", delay: 600, type: "command" },
    { text: "Checked out commit #a7f92e1: \"feat: prepare production release v1.0.0 for live launch\"", delay: 900, type: "info" },
    { text: "Detected framework: Next.js 16.0.10 (App Router + Turbopack)", delay: 1200, type: "success" },
    { text: "Decrypting & injecting 4 AWS KMS environment variables (NODE_ENV=production)...", delay: 1500, type: "info" },
    { text: "Executing: npm ci --prefer-offline (installed 42 packages in 0.9s)", delay: 1900, type: "command" },
    { text: "Executing build command: next build", delay: 2300, type: "command" },
    { text: "▲ Next.js 16.0.10 — Creating an optimized production build...", delay: 2600, type: "nextjs" },
    { text: "  ✓ Compiled successfully in 580ms", delay: 2900, type: "success" },
    { text: "  ✓ Generated 28 SSG static routes and edge functions", delay: 3200, type: "success" },
    { text: "  ✓ Compressed 114 image assets using next/image (WebP & AVIF)", delay: 3400, type: "info" },
    { text: "Uploading build artifacts to Amazon S3 edge origin buckets...", delay: 3700, type: "info" },
    { text: "Configuring Amazon Route 53 DNS records & ACM SSL certificate (*.zerrorstudios.com)...", delay: 4000, type: "info" },
    { text: "Propagating static assets across 450+ CloudFront Global Edge PoPs...", delay: 4300, type: "info" },
    { text: "✔ SUCCESS: Deployment complete! Site is LIVE at https://zerrorstudios.com (2.8s)", delay: 4600, type: "finish" },
];

const ENV_VARIABLES = [
    { key: "NEXT_PUBLIC_SITE_URL", value: "https://zerrorstudios.com", secret: false },
    { key: "NODE_ENV", value: "production", secret: false },
    { key: "DATABASE_URL", value: "postgresql://zerror_admin:••••••••••••@aws.neon.tech/prod", secret: true },
    { key: "AWS_REGION", value: "us-east-1", secret: false },
];

const AwsDeploy = () => {
    // Phases: 'connect' -> 'building' -> 'dashboard'
    const [phase, setPhase] = useState('connect');
    const [terminalLines, setTerminalLines] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'domain' | 'monitoring'
    const [copied, setCopied] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const terminalBottomRef = useRef(null);

    // Auto-scroll terminal
    useEffect(() => {
        if (terminalBottomRef.current) {
            terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
        }
    }, [terminalLines]);

    // Main Orchestration Loop
    useEffect(() => {
        let isCancelled = false;
        let timers = [];

        const clearAllTimers = () => {
            timers.forEach(t => clearTimeout(t));
            timers = [];
        };

        const runDeploymentCycle = async () => {
            if (!isAutoPlaying || isCancelled) return;

            // Step 1: Connect Repo & Env setup (hold for 4.5 seconds)
            setPhase('connect');
            setTerminalLines([]);
            setCurrentStepIndex(0);

            const timer1 = setTimeout(() => {
                if (isCancelled) return;

                // Step 2: Trigger Build & Stream Terminal logs
                setPhase('building');
                setCurrentStepIndex(1);

                TERMINAL_LOGS.forEach((log) => {
                    const logTimer = setTimeout(() => {
                        if (isCancelled) return;
                        setTerminalLines(prev => [...prev, log]);
                    }, log.delay);
                    timers.push(logTimer);
                });

                // Step 3: Transition to Dashboard after terminal finishes (5.4s total)
                const timer2 = setTimeout(() => {
                    if (isCancelled) return;
                    setPhase('dashboard');
                    setCurrentStepIndex(2);

                    // Hold dashboard for 12 seconds then loop
                    const timer3 = setTimeout(() => {
                        if (isCancelled) return;
                        runDeploymentCycle();
                    }, 12000);
                    timers.push(timer3);
                }, 5400);
                timers.push(timer2);

            }, 4500);
            timers.push(timer1);
        };

        runDeploymentCycle();

        return () => {
            isCancelled = true;
            clearAllTimers();
        };
    }, [isAutoPlaying]);

    // Manual trigger for deploy button
    const handleTriggerDeploy = () => {
        setIsAutoPlaying(false);
        setPhase('building');
        setCurrentStepIndex(1);
        setTerminalLines([]);

        TERMINAL_LOGS.forEach((log) => {
            setTimeout(() => {
                setTerminalLines(prev => [...prev, log]);
            }, log.delay);
        });

        setTimeout(() => {
            setPhase('dashboard');
            setCurrentStepIndex(2);
        }, 5400);
    };

    const handleCopyDomain = () => {
        navigator.clipboard?.writeText("https://zerrorstudios.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleResetFlow = () => {
        setIsAutoPlaying(false);
        setPhase('connect');
        setCurrentStepIndex(0);
        setTerminalLines([]);
    };

    return (
        <section className="w-full h-full flex flex-col font-sans overflow-hidden bg-[#0D1117] text-gray-100 select-none border border-gray-800/80 rounded-2xl">
            {/* --- AWS CONSOLE GLOBAL HEADER --- */}
            <header className="w-full bg-[#131921] border-b border-[#232F3E] px-3 sm:px-4 py-2 flex items-center justify-between shrink-0">
                {/* Left: AWS Logo & Service Navigation */}
                <div className="flex items-center gap-3">
                    {/* AWS Brand Badge */}
                    <div className="flex items-center gap-2">
                        <div className="bg-[#FF9900] text-black text-xs px-2 py-0.5 rounded font-mono tracking-wider flex items-center gap-1 shadow-2xs">
                            <RiAmazonFill size={15} />
                            <span>aws</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-gray-700">
                            <span className="text-white text-sm tracking-tight">Amplify</span>
                            <span className="text-[10px] text-gray-400 bg-[#232F3E] px-1.5 py-0.5 rounded border border-gray-700">
                                Gen 2 Hosting
                            </span>
                        </div>
                    </div>

                    {/* Quick Search mock */}
                    <div className="hidden md:flex items-center gap-2 bg-[#232F3E] border border-gray-700/80 rounded-md px-3 py-1 text-xs text-gray-300 w-64 lg:w-72">
                        <RiSearchLine size={13} className="text-gray-400" />
                        <span className="text-gray-400 truncate">Search AWS services, DNS, Route 53</span>
                        <span className="text-[10px] text-gray-500 ml-auto border border-gray-600 rounded px-1">[Alt+S]</span>
                    </div>
                </div>

                {/* Right: Region & Account Info */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs">
                    {/* Region */}
                    <div className="hidden sm:flex items-center gap-1.5 text-gray-300 bg-[#232F3E] px-2 py-1 rounded border border-gray-700">
                        <RiGlobalLine size={13} className="text-[#00A4E4]" />
                        <span className="font-mono text-[11px]">us-east-1</span>
                        <span className="text-gray-500 text-[10px]">(N. Virginia)</span>
                    </div>

                    {/* Account */}
                    <div className="flex items-center gap-1.5 text-gray-200 bg-[#232F3E] px-2.5 py-1 rounded border border-gray-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] truncate max-w-[90px] sm:max-w-none">
                            Zerror Studios
                        </span>
                        <span className="text-gray-500 text-[10px] hidden md:inline font-mono">
                            (prod-8492)
                        </span>
                    </div>

                    {/* Notifications & Settings */}
                    <div className="flex items-center gap-1 text-gray-400">
                        <button className="p-1 hover:text-white rounded hover:bg-gray-800 transition-colors">
                            <RiNotification3Line size={15} />
                        </button>
                        <button className="p-1 hover:text-white rounded hover:bg-gray-800 transition-colors">
                            <RiSettings4Line size={15} />
                        </button>
                    </div>
                </div>
            </header>

            {/* --- AWS CONSOLE BREADCRUMB & FLOW STEPPER BAR --- */}
            <div className="w-full bg-[#1C2430] border-b border-[#2B384A] px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="hover:text-gray-200 cursor-pointer">AWS Console</span>
                    <span>›</span>
                    <span className="hover:text-gray-200 cursor-pointer">Amplify Hosting</span>
                    <span>›</span>
                    <span className="text-[#00A4E4] flex items-center gap-1">
                        <RiGithubFill size={13} />
                        zerror-studios-2026
                    </span>
                </div>

                {/* 3 Step Indicator */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {[
                        { label: "1. Repo & Env", p: 'connect' },
                        { label: "2. Build & Deploy", p: 'building' },
                        { label: "3. Live Dashboard", p: 'dashboard' },
                    ].map((step, idx) => {
                        const isActive = phase === step.p;
                        const isPast = (step.p === 'connect' && (phase === 'building' || phase === 'dashboard')) ||
                                       (step.p === 'building' && phase === 'dashboard');

                        return (
                            <button
                                key={step.label}
                                onClick={() => {
                                    setIsAutoPlaying(false);
                                    setPhase(step.p);
                                    setCurrentStepIndex(idx);
                                }}
                                className={`px-2 py-0.5 rounded text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                                    isActive
                                        ? 'bg-[#FF9900] text-black shadow-2xs'
                                        : isPast
                                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                                        : 'bg-[#232F3E] text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                {isPast && <RiCheckLine size={11} />}
                                <span>{step.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- MAIN WORKSPACE AREA --- */}
            <div className="flex-1 w-full overflow-y-auto p-3 sm:p-5 relative flex flex-col bg-[#0F141C]">

                {/* ========================================================= */}
                {/* PHASE 1: CONNECT GITHUB REPO, AUTO-DETECT NEXT.JS & ENV */}
                {/* ========================================================= */}
                {phase === 'connect' && (
                    <div className="max-w-4xl mx-auto w-full space-y-4 animate-fadeIn">
                        {/* Hero Header */}
                        <div className="bg-[#161F2E] border border-[#2B384A] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] uppercase tracking-wider text-[#FF9900] bg-[#FF9900]/10 px-2 py-0.5 rounded border border-[#FF9900]/20">
                                        Step 1 of 3
                                    </span>
                                    <span className="text-xs text-gray-400">Continuous CI/CD Pipeline</span>
                                </div>
                                <h1 className="text-lg sm:text-xl text-white flex items-center gap-2">
                                    <span>Deploy Next.js Application to AWS Cloud</span>
                                    <RiRocketLine size={18} className="text-[#FF9900]" />
                                </h1>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Connect GitHub repository, verify Next.js runtime, and configure production environment secrets.
                                </p>
                            </div>

                            <button
                                onClick={handleTriggerDeploy}
                                className="bg-[#FF9900] hover:bg-[#E68A00] text-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer group"
                            >
                                <RiPlayFill size={16} className="text-black group-hover:scale-110 transition-transform" />
                                <span>Deploy Website to AWS</span>
                            </button>
                        </div>

                        {/* Two Columns: 1. GitHub & Framework Detection | 2. Environment Variables */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Left Card: Git Connection & Framework Auto-Detect */}
                            <div className="bg-[#161F2E] border border-[#2B384A] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                                <div>
                                    <h3 className="text-xs text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <RiGithubFill size={16} className="text-white" />
                                        <span>Source Repository & Branch</span>
                                    </h3>

                                    {/* Repo Card */}
                                    <div className="bg-[#0D131C] border border-[#28364A] rounded-lg p-3 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gray-800 center text-white">
                                                    <RiGithubFill size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-white font-mono">
                                                        sunny-zerror/Zerror-Studios-2026
                                                    </p>
                                                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                                                        Connected via GitHub App
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded">
                                                Verified
                                            </span>
                                        </div>

                                        <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                                            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-300">
                                                <RiGitBranchLine size={13} className="text-[#00A4E4]" />
                                                <span>branch:</span>
                                                <span className="text-white">main</span>
                                            </div>
                                            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
                                                <RiGitCommitLine size={13} />
                                                <span>#a7f92e1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Framework Detection Banner */}
                                <div className="bg-[#0D131C] border border-blue-900/40 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-black center text-white border border-gray-700">
                                                <RiNextjsFill size={16} />
                                            </div>
                                            <span className="text-xs text-white">Next.js Framework Auto-Detected</span>
                                        </div>
                                        <span className="text-[10px] text-[#00A4E4] bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded">
                                            v16.0 App Router
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-300 pt-1">
                                        <div className="bg-[#151D2A] p-2 rounded border border-gray-800">
                                            <span className="text-gray-500 block text-[10px]">Build Command</span>
                                            <span className="text-[#FF9900]">next build</span>
                                        </div>
                                        <div className="bg-[#151D2A] p-2 rounded border border-gray-800">
                                            <span className="text-gray-500 block text-[10px]">Output Directory</span>
                                            <span className="text-emerald-400">.next (SSG/SSR)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Card: Environment Credentials & Secrets */}
                            <div className="bg-[#161F2E] border border-[#2B384A] rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xs text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                            <RiLockLine size={16} className="text-[#FF9900]" />
                                            <span>Environment Credentials (AWS KMS)</span>
                                        </h3>
                                        <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
                                            Encrypted
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-400 mb-3">
                                        Production secrets automatically synced from your workspace repository into AWS Cloud securely.
                                    </p>

                                    {/* Env Key-Value Table */}
                                    <div className="space-y-2">
                                        {ENV_VARIABLES.map((env) => (
                                            <div
                                                key={env.key}
                                                className="bg-[#0D131C] border border-[#28364A] rounded-lg p-2.5 flex items-center justify-between text-xs"
                                            >
                                                <div className="font-mono text-gray-300 truncate pr-2">
                                                    {env.key}
                                                </div>
                                                <div className="font-mono text-[11px] text-gray-400 bg-[#151D2A] px-2 py-0.5 rounded border border-gray-800 truncate max-w-[150px] sm:max-w-[180px]">
                                                    {env.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Security Assurance Note */}
                                <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2 border-t border-gray-800/80">
                                    <RiShieldCheckLine size={16} className="text-emerald-400 shrink-0" />
                                    <span>256-bit AES encryption enabled with AWS IAM Key Management Service.</span>
                                </div>
                            </div>

                        </div>

                        {/* Bottom Action Footer */}
                        <div className="bg-[#121A26] border border-[#28364A] rounded-xl p-3 sm:p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <RiCloudLine size={16} className="text-[#00A4E4]" />
                                <span>Target Infrastructure: <span className="text-gray-200">Amazon CloudFront + S3 Origin + Route 53 Edge</span></span>
                            </div>
                            <button
                                onClick={handleTriggerDeploy}
                                className="bg-[#FF9900] hover:bg-[#E68A00] text-black text-xs px-4 py-2 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                                <span>Save & Deploy</span>
                                <RiArrowRightLine size={14} />
                            </button>
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* PHASE 2: RUN BUILD TERMINAL (DEPLOYING COMMANDS STREAM) */}
                {/* ========================================================= */}
                {phase === 'building' && (
                    <div className="max-w-4xl mx-auto w-full h-full flex flex-col space-y-3 animate-fadeIn">
                        {/* Terminal Header Info */}
                        <div className="bg-[#161F2E] border border-[#2B384A] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FF9900]/10 border border-[#FF9900]/30 center text-[#FF9900]">
                                    <RiTerminalBoxFill size={18} />
                                </div>
                                <div>
                                    <h2 className="text-sm text-white flex items-center gap-2">
                                        <span>AWS CodeBuild & Amplify Build Terminal</span>
                                        <span className="w-2 h-2 rounded-full bg-[#FF9900] animate-ping" />
                                    </h2>
                                    <p className="text-[11px] text-gray-400">
                                        Streaming real-time continuous deployment logs for <span className="text-white font-mono">zerror-studios-2026</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-400">Runtime:</span>
                                <span className="font-mono text-[#00A4E4] bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded">
                                    Next.js 16 (Node.js 20.x)
                                </span>
                                <button
                                    onClick={() => {
                                        setPhase('dashboard');
                                        setCurrentStepIndex(2);
                                    }}
                                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] px-2.5 py-1 rounded transition-colors"
                                >
                                    Skip to Dashboard →
                                </button>
                            </div>
                        </div>

                        {/* Interactive Terminal Window */}
                        <div className="flex-1 min-h-[360px] bg-[#0A0D13] border border-[#253245] rounded-xl overflow-hidden flex flex-col shadow-lg">
                            {/* Terminal Top Bar (macOS style lights) */}
                            <div className="bg-[#161C26] px-4 py-2.5 border-b border-[#253245] flex items-center justify-between shrink-0 select-none">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                                    <span className="text-xs text-gray-400 font-mono ml-2">
                                        aws-build-agent@amplify-us-east-1:~ $ npm run build
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>LIVE STREAM</span>
                                </div>
                            </div>

                            {/* Terminal Output Stream */}
                            <div
                                ref={terminalBottomRef}
                                className="flex-1 p-4 font-mono text-xs sm:text-[13px] overflow-y-auto space-y-1.5 leading-relaxed scroller_none"
                            >
                                {terminalLines.map((log, index) => {
                                    let textColor = "text-gray-300";
                                    let prefix = "•";

                                    if (log.type === "command") {
                                        textColor = "text-[#00A4E4]";
                                        prefix = "$";
                                    } else if (log.type === "success") {
                                        textColor = "text-emerald-400";
                                        prefix = "✔";
                                    } else if (log.type === "nextjs") {
                                        textColor = "text-white";
                                        prefix = "▲";
                                    } else if (log.type === "finish") {
                                        textColor = "text-[#FF9900] bg-[#FF9900]/10 p-2 rounded border border-[#FF9900]/30 mt-2 block";
                                        prefix = "🚀";
                                    }

                                    return (
                                        <div key={index} className={`flex items-start gap-2 ${textColor} animate-fadeIn`}>
                                            <span className="text-gray-600 select-none shrink-0 w-4 text-right">{prefix}</span>
                                            <span className="break-all">{log.text}</span>
                                        </div>
                                    );
                                })}

                                {terminalLines.length < TERMINAL_LOGS.length && (
                                    <div className="flex items-center gap-2 text-[#00A4E4] pt-1">
                                        <span className="w-2 h-4 bg-[#00A4E4] animate-pulse inline-block" />
                                        <span className="text-gray-500 text-xs italic">Compiling Next.js production build...</span>
                                    </div>
                                )}
                            </div>

                            {/* Terminal Footer Status */}
                            <div className="bg-[#121620] px-4 py-2 border-t border-[#253245] flex items-center justify-between text-xs text-gray-400 shrink-0 font-mono">
                                <span>Target: S3 + CloudFront Edge CDN</span>
                                <span className="text-emerald-400 flex items-center gap-1">
                                    <RiCheckLine size={13} />
                                    Status: Zero-downtime Blue/Green Deploy
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ========================================================= */}
                {/* PHASE 3: AUTHENTIC AWS AMPLIFY PRODUCTION DASHBOARD */}
                {/* ========================================================= */}
                {phase === 'dashboard' && (
                    <div className="max-w-5xl mx-auto w-full space-y-4 animate-fadeIn">
                        {/* Live Status Card */}
                        <div className="bg-[#162030] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            DEPLOYED & LIVE
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            AWS Amplify App ID: <span className="text-white font-mono">d3k8x9zerror</span>
                                        </span>
                                    </div>

                                    <h2 className="text-xl sm:text-2xl text-white flex items-center gap-2">
                                        <span>Zerror Studios Production</span>
                                        <RiShieldCheckLine size={20} className="text-emerald-400 shrink-0" />
                                    </h2>

                                    {/* Prominent Live Domain Bar */}
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="bg-[#0C121C] border border-gray-700/80 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-200">
                                            <RiLockLine size={14} className="text-emerald-400 shrink-0" />
                                            <span className="text-gray-400 font-mono text-xs">https://</span>
                                            <a
                                                href="https://zerrorstudios.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-white hover:text-[#00A4E4] font-mono transition-colors"
                                            >
                                                zerrorstudios.com
                                            </a>
                                        </div>

                                        <button
                                            onClick={handleCopyDomain}
                                            className="bg-[#232F3E] hover:bg-[#2F3E50] text-gray-200 p-2 rounded-lg border border-gray-700 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                                            title="Copy Domain URL"
                                        >
                                            {copied ? <RiCheckLine size={14} className="text-emerald-400" /> : <RiFileCopyLine size={14} />}
                                            <span className="text-[11px] hidden sm:inline">
                                                {copied ? "Copied!" : "Copy"}
                                            </span>
                                        </button>

                                        <a
                                            href="https://zerrorstudios.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-[#FF9900] hover:bg-[#E68A00] text-black text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                                        >
                                            <span>Visit Website</span>
                                            <RiExternalLinkLine size={13} />
                                        </a>
                                    </div>
                                </div>

                                {/* Redeploy / Re-run CTA */}
                                <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                                    <button
                                        onClick={handleResetFlow}
                                        className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-lg border border-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <RiRefreshLine size={13} className="text-[#FF9900]" />
                                        <span>Re-run Deploy Simulation</span>
                                    </button>
                                    <span className="text-[11px] text-gray-400">
                                        Last commit: <span className="font-mono text-white">#a7f92e1</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Functionality Tabs Bar */}
                        <div className="flex items-center gap-2 border-b border-gray-800 pb-1 text-xs">
                            <button
                                onClick={() => setDashboardTab('overview')}
                                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                                    dashboardTab === 'overview'
                                        ? 'bg-[#232F3E] text-white border-b-2 border-[#FF9900]'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <RiGlobalLine size={14} className="text-[#00A4E4]" />
                                <span>Overview & Live Preview</span>
                            </button>
                            <button
                                onClick={() => setDashboardTab('domain')}
                                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                                    dashboardTab === 'domain'
                                        ? 'bg-[#232F3E] text-white border-b-2 border-[#FF9900]'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <RiServerLine size={14} className="text-[#FF9900]" />
                                <span>Route 53 DNS & SSL</span>
                            </button>
                            <button
                                onClick={() => setDashboardTab('monitoring')}
                                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                                    dashboardTab === 'monitoring'
                                        ? 'bg-[#232F3E] text-white border-b-2 border-[#FF9900]'
                                        : 'text-gray-400 hover:text-gray-200'
                                }`}
                            >
                                <RiPulseLine size={14} className="text-emerald-400" />
                                <span>CloudFront Edge Metrics</span>
                            </button>
                        </div>

                        {/* --- TAB 1: OVERVIEW & LIVE PREVIEW --- */}
                        {dashboardTab === 'overview' && (
                            <div className="space-y-4 animate-fadeIn">
                                {/* 4 Live Metrics Cards */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-3 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                                            <span>Build Duration</span>
                                            <RiTimeLine size={14} className="text-[#FF9900]" />
                                        </div>
                                        <div className="text-lg text-white font-mono">2.8 s</div>
                                        <div className="text-[10px] text-emerald-400">Turbopack Optimized</div>
                                    </div>

                                    <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-3 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                                            <span>Edge Cache Hit</span>
                                            <RiPulseLine size={14} className="text-emerald-400" />
                                        </div>
                                        <div className="text-lg text-emerald-400 font-mono">99.4%</div>
                                        <div className="text-[10px] text-gray-400">CloudFront Global</div>
                                    </div>

                                    <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-3 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                                            <span>SSL / TLS Status</span>
                                            <RiShieldCheckLine size={14} className="text-emerald-400" />
                                        </div>
                                        <div className="text-sm text-white truncate">Amazon Trust</div>
                                        <div className="text-[10px] text-emerald-400">Auto-Renew Active</div>
                                    </div>

                                    <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-3 flex flex-col justify-between">
                                        <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                                            <span>Active Edge PoPs</span>
                                            <RiCloudLine size={14} className="text-[#00A4E4]" />
                                        </div>
                                        <div className="text-lg text-white font-mono">450+</div>
                                        <div className="text-[10px] text-[#00A4E4]">Global Distribution</div>
                                    </div>
                                </div>

                                {/* Live Website Simulated Mockup Frame */}
                                <div className="bg-[#151D2A] border border-[#273549] rounded-xl overflow-hidden shadow-xs">
                                    {/* Browser bar */}
                                    <div className="bg-[#1F2A3D] px-4 py-2 flex items-center justify-between border-b border-[#2B3B52] text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 inline-block" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 inline-block" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 inline-block" />
                                            <span className="text-gray-300 ml-2 font-mono text-[11px]">
                                                https://zerrorstudios.com
                                            </span>
                                        </div>
                                        <a
                                            href="https://zerrorstudios.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#00A4E4] hover:underline flex items-center gap-1"
                                        >
                                            <span>Live Web App</span>
                                            <RiExternalLinkLine size={12} />
                                        </a>
                                    </div>

                                    {/* Website Preview Content */}
                                    <div className="p-4 sm:p-6 bg-[#0A0E17] text-white space-y-4">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
                                            <div>
                                                <span className="text-[10px] font-mono text-[#00A4E4] bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded">
                                                    PRODUCTION PREVIEW
                                                </span>
                                                <h3 className="text-xl sm:text-2xl tracking-tight text-white mt-1">
                                                    Zerror Studios — Digital Experience Platform
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    Award-winning digital studio crafting hyper-fast Next.js websites & 3D interactive applications.
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-3 py-1 rounded-full">
                                                    HTTP/3 Ready
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                            <div className="bg-[#162030] p-3 rounded-lg border border-gray-800">
                                                <p className="text-gray-400 text-[11px]">Hosting Provider</p>
                                                <p className="text-white text-sm">AWS Amplify Hosting</p>
                                            </div>
                                            <div className="bg-[#162030] p-3 rounded-lg border border-gray-800">
                                                <p className="text-gray-400 text-[11px]">Primary Domain</p>
                                                <p className="text-emerald-400 font-mono text-sm">zerrorstudios.com</p>
                                            </div>
                                            <div className="bg-[#162030] p-3 rounded-lg border border-gray-800">
                                                <p className="text-gray-400 text-[11px]">Edge Invalidation</p>
                                                <p className="text-white text-sm">Instant (0s cache flush)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- TAB 2: ROUTE 53 DNS & SSL DOMAIN MANAGEMENT --- */}
                        {dashboardTab === 'domain' && (
                            <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-4 sm:p-5 space-y-4 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm text-white flex items-center gap-2">
                                            <span>Amazon Route 53 DNS Configuration</span>
                                            <RiShieldCheckLine size={16} className="text-emerald-400" />
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Configured DNS records for apex domain and www subdomain with AWS Certificate Manager (ACM).
                                        </p>
                                    </div>
                                    <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                                        All DNS Verified
                                    </span>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs font-mono">
                                        <thead>
                                            <tr className="border-b border-gray-800 text-gray-400 text-[11px]">
                                                <th className="pb-2">RECORD TYPE</th>
                                                <th className="pb-2">HOST NAME</th>
                                                <th className="pb-2">VALUE / TARGET</th>
                                                <th className="pb-2">STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800/70 text-gray-300">
                                            <tr>
                                                <td className="py-2.5 text-[#00A4E4]">A (Alias)</td>
                                                <td>@ (zerrorstudios.com)</td>
                                                <td>d3k8x9.cloudfront.net</td>
                                                <td className="text-emerald-400 font-sans">Active (Resolved)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2.5 text-[#00A4E4]">CNAME</td>
                                                <td>www.zerrorstudios.com</td>
                                                <td>zerrorstudios.com</td>
                                                <td className="text-emerald-400 font-sans">Active (Resolved)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2.5 text-[#FF9900]">CNAME (ACM)</td>
                                                <td>_a4f81c9b.zerrorstudios.com</td>
                                                <td>_ca38102d.acm-validations.aws</td>
                                                <td className="text-emerald-400 font-sans">Issued & Valid</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* --- TAB 3: CLOUDFRONT EDGE MONITORING --- */}
                        {dashboardTab === 'monitoring' && (
                            <div className="bg-[#151D2A] border border-[#273549] rounded-xl p-4 sm:p-5 space-y-4 animate-fadeIn">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm text-white flex items-center gap-2">
                                            <span>CloudFront Global Edge Performance</span>
                                            <RiPulseLine size={16} className="text-[#00A4E4]" />
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Real-time traffic telemetry and low-latency delivery metrics across North America, Europe & Asia.
                                        </p>
                                    </div>
                                    <span className="text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                                        100% Uptime
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                    <div className="bg-[#0E1420] p-3 rounded-lg border border-gray-800">
                                        <span className="text-gray-400 block text-[11px]">Global TTFB</span>
                                        <span className="text-lg text-emerald-400 font-mono">24 ms</span>
                                        <span className="text-[10px] text-gray-500 block">Edge Cached Worldwide</span>
                                    </div>
                                    <div className="bg-[#0E1420] p-3 rounded-lg border border-gray-800">
                                        <span className="text-gray-400 block text-[11px]">DDoS Protection</span>
                                        <span className="text-lg text-white">AWS Shield</span>
                                        <span className="text-[10px] text-emerald-400 block">Active Layer 3/4/7</span>
                                    </div>
                                    <div className="bg-[#0E1420] p-3 rounded-lg border border-gray-800">
                                        <span className="text-gray-400 block text-[11px]">Compression</span>
                                        <span className="text-lg text-[#FF9900]">Brotli + Gzip</span>
                                        <span className="text-[10px] text-gray-400 block">Dynamic Edge Minification</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
};

export default AwsDeploy;
