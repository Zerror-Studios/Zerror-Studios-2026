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

// Distinct Sparkline Mini Line Charts for Top Metric Cards
export const IncomeSparkline = () => (
  <div className="w-28 h-11">
    <svg viewBox="0 0 110 42" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="incomeAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="incomeStrokeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        d="M 0,32 Q 20,38 35,20 T 70,24 T 90,8 T 110,4 L 110,42 L 0,42 Z"
        fill="url(#incomeAreaGrad)"
      />
      <path
        d="M 0,32 Q 20,38 35,20 T 70,24 T 90,8 T 110,4"
        fill="none"
        stroke="url(#incomeStrokeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="110" cy="4" r="2.5" fill="#3B82F6" />
    </svg>
  </div>
);

export const ProfitSparkline = () => (
  <div className="w-28 h-11">
    <svg viewBox="0 0 110 42" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="profitAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="profitStrokeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
      </defs>
      <path
        d="M 0,12 Q 25,32 45,15 T 75,30 T 95,14 T 110,22 L 110,42 L 0,42 Z"
        fill="url(#profitAreaGrad)"
      />
      <path
        d="M 0,12 Q 25,32 45,15 T 75,30 T 95,14 T 110,22"
        fill="none"
        stroke="url(#profitStrokeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="110" cy="22" r="2.5" fill="#EC4899" />
    </svg>
  </div>
);

export const CustomersSparkline = () => (
  <div className="w-28 h-11">
    <svg viewBox="0 0 110 42" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="customersAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="customersStrokeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path
        d="M 0,35 Q 25,28 45,22 T 80,12 T 110,5 L 110,42 L 0,42 Z"
        fill="url(#customersAreaGrad)"
      />
      <path
        d="M 0,35 Q 25,28 45,22 T 80,12 T 110,5"
        fill="none"
        stroke="url(#customersStrokeGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="110" cy="5" r="2.5" fill="#8B5CF6" />
    </svg>
  </div>
);

export const SparklineGraph = ({ type = "income" }) => {
  if (type === "profit") return <ProfitSparkline />;
  if (type === "customers") return <CustomersSparkline />;
  return <IncomeSparkline />;
};

// Sales Analytics Dual Bar Chart with GSAP Entry Animation
export const SalesAnalyticsBarChart = () => {
  const chartRef = useRef(null);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const incomeData = [65, 75, 60, 50, 58, 65, 60, 74, 60];
  const profitData = [38, 66, 44, 32, 50, 38, 52, 56, 46];

  useGSAP(() => {
    gsap.fromTo(
      ".analytics-bar",
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "bottom",
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.2)"
      }
    );
  }, { scope: chartRef });

  return (
    <div ref={chartRef} className="w-full h-56 pt-4 flex flex-col justify-between">
      {/* Bars Container */}
      <div className="flex-1 flex items-end justify-between px-2 gap-2">
        {months.map((month, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
            <div className="w-full flex items-end justify-center gap-1.5 h-44 border-b border-gray-100 dark:border-white/10 pb-1">
              {/* Income Bar (Solid Soft Blue) */}
              <div
                className="analytics-bar w-3 md:w-3.5 bg-blue-600 dark:bg-blue-500 rounded-t-sm transition-opacity group-hover:opacity-85"
                style={{ height: `${incomeData[idx]}%` }}
              ></div>
              {/* Profit Bar (Soft Muted Slate) */}
              <div
                className="analytics-bar w-3 md:w-3.5 bg-slate-300 dark:bg-slate-600 rounded-t-sm transition-opacity group-hover:opacity-85"
                style={{ height: `${profitData[idx]}%` }}
              ></div>
            </div>
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Top Categories Animated Donut Chart matching reference image
export const EcommDonutChart = ({ timeFilter = "Monthly" }) => {
  const donutRef = useRef(null);

  // Circumference = 2 * PI * 32 = 201
  const filterPresets = {
    "All time": {
      displayPct: "40%",
      label: "T-shirts",
      segments: [
        { stroke: "#2563EB", array: "77.4 201", offset: 0 },
        { stroke: "#64748B", array: "53.3 201", offset: -80.4 },
        { stroke: "#93C5FD", array: "33.2 201", offset: -136.7 },
        { stroke: "#CBD5E1", array: "25.1 201", offset: -172.9 },
      ]
    },
    "Weekly": {
      displayPct: "30%",
      label: "T-shirts",
      segments: [
        { stroke: "#2563EB", array: "57.3 201", offset: 0 },
        { stroke: "#64748B", array: "53.3 201", offset: -60.3 },
        { stroke: "#93C5FD", array: "45.3 201", offset: -116.6 },
        { stroke: "#CBD5E1", array: "33.2 201", offset: -164.9 },
      ]
    },
    "Monthly": {
      displayPct: "18%",
      label: "T-shirts",
      segments: [
        { stroke: "#2563EB", array: "41.2 201", offset: 0 },
        { stroke: "#64748B", array: "67.4 201", offset: -44.2 },
        { stroke: "#93C5FD", array: "47.3 201", offset: -114.6 },
        { stroke: "#CBD5E1", array: "33.2 201", offset: -164.9 },
      ]
    }
  };

  const currentPreset = filterPresets[timeFilter] || filterPresets["Monthly"];

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
      { scale: 0.6, opacity: 0, y: 4 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.5)" }
    );
  }, { scope: donutRef, dependencies: [timeFilter] });

  return (
    <div ref={donutRef} className="relative w-44 h-44 mx-auto flex  items-center justify-center  ">
      <svg viewBox="0 0 88 88" className="">
        {currentPreset.segments.map((seg, idx) => (
          <circle
            key={idx}
            cx="50"
            cy="50"
            r="32"
            fill="transparent"
            stroke={seg.stroke}
            strokeWidth="14"
            strokeDasharray={seg.array}
            data-offset={seg.offset}
            className="donut-segment hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
      </svg>
      <div className="donut-text-content text-center  absolute  pointer-events-none">
        <p className="text-xl font-medium text-gray-400">{currentPreset.displayPct}</p>
        <p className="text-[10px] text-gray-400 font-semibold uppercase">{currentPreset.label}</p>
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
