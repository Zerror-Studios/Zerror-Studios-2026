"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Pulsing status dot
export const PulseDot = ({ color = "bg-emerald-500", size = "w-2.5 h-2.5" }) => (
  <span className="relative flex items-center justify-center">
    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
    <span className={`relative inline-flex rounded-full ${size} ${color}`}></span>
  </span>
);

// Sidebar Nav Icons matching reference image
export const DashboardIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const ProductsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const CustomersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const PaymentsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export const AnalyticsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

export const ReportsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const SettingsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const NotificationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const TrendUpArrow = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

export const TrendDownArrow = ({ className = "w-3 h-3" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7l10 10M17 17H7M17 17V7" />
  </svg>
);

// Mini line charts for the KPI tiles; one calm palette instead of mixed gradients
const Sparkline = ({ id, line, color }) => (
  <div className="w-24 h-10">
    <svg viewBox="0 0 110 42" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L 110,42 L 0,42 Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export const IncomeSparkline = ({ isDark }) => (
  <Sparkline id="spark-income" color={isDark ? "#7b93ff" : "#002bba"} line="M 0,32 Q 20,38 35,20 T 70,24 T 90,8 T 110,4" />
);

export const ProfitSparkline = ({ isDark }) => (
  <Sparkline id="spark-profit" color={isDark ? "#94a3b8" : "#64748b"} line="M 0,12 Q 25,32 45,15 T 75,30 T 95,14 T 110,22" />
);

export const CustomersSparkline = ({ isDark }) => (
  <Sparkline id="spark-customers" color={isDark ? "#34d399" : "#059669"} line="M 0,35 Q 25,28 45,22 T 80,12 T 110,5" />
);

export const SparklineGraph = ({ type = "income", isDark }) => {
  if (type === "profit") return <ProfitSparkline isDark={isDark} />;
  if (type === "customers") return <CustomersSparkline isDark={isDark} />;
  return <IncomeSparkline isDark={isDark} />;
};

// Sales bar chart; colours come from the dashboard theme, not the OS dark mode
export const SalesAnalyticsBarChart = ({ isDark = false }) => {
  const chartRef = useRef(null);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const incomeData = [65, 75, 60, 50, 58, 65, 60, 74, 60];
  const profitData = [38, 66, 44, 32, 50, 38, 52, 56, 46];
  const incomeColor = isDark ? "#4d6fff" : "#002bba";
  const profitColor = isDark ? "#334155" : "#CBD5E1";

  useGSAP(() => {
    gsap.fromTo(
      ".analytics-bar",
      { scaleY: 0 },
      { scaleY: 1, transformOrigin: "bottom", duration: 0.7, stagger: 0.025, ease: "power3.out" }
    );
  }, { scope: chartRef });

  return (
    <div ref={chartRef} className="relative w-full h-48 md:h-56 flex flex-col">
      {/* Gridlines */}
      <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`border-t border-dashed ${isDark ? "border-white/[0.06]" : "border-slate-100"}`} />
        ))}
      </div>
      <div className="relative flex-1 flex items-end justify-between gap-1 md:gap-2">
        {months.map((month, idx) => (
          <div key={month} className="flex-1 h-full flex items-end justify-center gap-1 group cursor-pointer">
            <div className="analytics-bar w-2 md:w-3 rounded-t-[3px] transition-opacity group-hover:opacity-80" style={{ height: `${incomeData[idx]}%`, background: incomeColor }} />
            <div className="analytics-bar w-2 md:w-3 rounded-t-[3px] transition-opacity group-hover:opacity-80" style={{ height: `${profitData[idx]}%`, background: profitColor }} />
          </div>
        ))}
      </div>
      <div className={`flex justify-between gap-1 md:gap-2 pt-2 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
        {months.map((month) => (
          <span key={month} className={`flex-1 text-center text-[10px] md:text-[11px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>{month}</span>
        ))}
      </div>
    </div>
  );
};

// Category donut; ring centred in its viewBox and started from 12 o'clock
export const DONUT_COLORS = ["#002bba", "#4d6fff", "#a9baff", "#dbe2ff"];

export const EcommDonutChart = ({ timeFilter = "Monthly", isDark = false }) => {
  const donutRef = useRef(null);

  // Circumference = 2 * PI * 32 = 201
  const filterPresets = {
    "All time": { displayPct: "40%", label: "Kurtas", segments: [["77.4 201", 0], ["53.3 201", -80.4], ["33.2 201", -136.7], ["25.1 201", -172.9]] },
    "Weekly": { displayPct: "30%", label: "Kurtas", segments: [["57.3 201", 0], ["53.3 201", -60.3], ["45.3 201", -116.6], ["33.2 201", -164.9]] },
    "Monthly": { displayPct: "21%", label: "Kurtas", segments: [["41.2 201", 0], ["67.4 201", -44.2], ["47.3 201", -114.6], ["33.2 201", -164.9]] },
  };

  const currentPreset = filterPresets[timeFilter] || filterPresets["Monthly"];
  const colors = isDark ? ["#4d6fff", "#7b93ff", "#334155", "#1e293b"] : DONUT_COLORS;

  useGSAP(() => {
    gsap.fromTo(
      ".donut-segment",
      { strokeDashoffset: 201, opacity: 0 },
      {
        strokeDashoffset: (i, target) => target.getAttribute("data-offset") || 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      ".donut-text-content",
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, { scope: donutRef, dependencies: [timeFilter] });

  return (
    <div ref={donutRef} className="relative w-40 h-40 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
        <circle cx="44" cy="44" r="32" fill="transparent" stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"} strokeWidth="12" />
        {currentPreset.segments.map(([array, offset], idx) => (
          <circle
            key={idx}
            cx="44"
            cy="44"
            r="32"
            fill="transparent"
            stroke={colors[idx]}
            strokeWidth="12"
            strokeDasharray={array}
            data-offset={offset}
            className="donut-segment hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
      </svg>
      <div className="donut-text-content text-center absolute pointer-events-none">
        <p className={`text-xl font-semibold leading-none ${isDark ? "text-white" : "text-slate-900"}`}>{currentPreset.displayPct}</p>
        <p className={`text-[10px] mt-1 font-medium uppercase tracking-wide ${isDark ? "text-slate-400" : "text-slate-500"}`}>{currentPreset.label}</p>
      </div>
    </div>
  );
};

export const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);
