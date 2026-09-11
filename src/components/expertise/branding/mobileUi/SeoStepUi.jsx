"use client";

import React, { useState } from "react";
import {
  RiLineChartLine,
  RiSearchLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiGlobalLine,
  RiLink,
  RiPulseLine,
  RiDashboardLine,
  RiListCheck3,
  RiSettings3Line,
  RiEyeLine,
  RiTimeLine,
  RiBarChartBoxLine,
  RiArrowRightUpLine,
} from "@remixicon/react";

const KPI_DATA = [
  {
    label: "Organic Traffic",
    value: "14.2K",
    change: "+34%",
    up: true,
    icon: RiEyeLine,
    color: "from-emerald-500/20 to-emerald-500/5",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
  },
  {
    label: "Avg. Position",
    value: "4.7",
    change: "-2.1",
    up: true,
    icon: RiBarChartBoxLine,
    color: "from-[#002bba]/20 to-[#002bba]/5",
    accent: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    label: "Click Rate",
    value: "8.3%",
    change: "+1.2%",
    up: true,
    icon: RiPulseLine,
    color: "from-amber-500/20 to-amber-500/5",
    accent: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    label: "Bounce Rate",
    value: "32%",
    change: "+3%",
    up: false,
    icon: RiTimeLine,
    color: "from-rose-500/20 to-rose-500/5",
    accent: "text-rose-400",
    border: "border-rose-500/20",
  },
];

const KEYWORD_DATA = [
  { keyword: "branding agency", rank: 1, change: 3, volume: "12K", up: true },
  { keyword: "web design studio", rank: 3, change: 1, volume: "8.4K", up: true },
  { keyword: "seo optimization", rank: 5, change: -2, volume: "22K", up: false },
  { keyword: "ai search engine", rank: 2, change: 5, volume: "6.1K", up: true },
  { keyword: "digital branding", rank: 4, change: 0, volume: "9.8K", up: true },
];

// SVG chart data points for the area chart
const CHART_POINTS = [
  { x: 0, y: 72 },
  { x: 14, y: 65 },
  { x: 28, y: 58 },
  { x: 42, y: 62 },
  { x: 56, y: 48 },
  { x: 70, y: 35 },
  { x: 84, y: 28 },
  { x: 100, y: 12 },
];

const CHART_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function SeoStepUi() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Build SVG path for area chart
  const chartHeight = 52;
  const chartWidth = 100;
  const linePath = CHART_POINTS.map(
    (p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`
  ).join(" ");
  const areaPath = `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

  return (
    <div className="w-full h-full flex flex-col bg-[#0b0e1a] text-white overflow-hidden relative">

      {/* ── App Header ── */}
      <div className="px-3.5 pt-1 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002bba] to-emerald-500 center">
            <RiLineChartLine size={14} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-xs leading-tight">SEO Analytics</h4>
            <span className="text-[8px] text-white/50 font-mono">zerrorstudios.com</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[8px] font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-hidden px-3 pb-2 space-y-2.5" data-lenis-prevent>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-2">
          {KPI_DATA.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div
                key={i}
                className={`rounded-xl p-2.5 bg-gradient-to-b ${kpi.color} border ${kpi.border} flex flex-col gap-1.5 relative overflow-hidden`}
              >
                {/* Subtle glow */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full blur-xl opacity-20 ${kpi.accent === "text-emerald-400" ? "bg-emerald-400" : kpi.accent === "text-blue-400" ? "bg-blue-400" : kpi.accent === "text-amber-400" ? "bg-amber-400" : "bg-rose-400"}`} />
                <div className="flex items-center justify-between relative z-10">
                  <Icon size={12} className={`${kpi.accent} opacity-80`} />
                  <div className={`flex items-center gap-0.5 text-[8px] font-mono font-bold ${kpi.up ? "text-emerald-400" : "text-rose-400"}`}>
                    {kpi.up ? <RiArrowUpLine size={8} /> : <RiArrowDownLine size={8} />}
                    {kpi.change}
                  </div>
                </div>
                <div className="relative z-10">
                  <span className="text-lg font-bold leading-none text-white">{kpi.value}</span>
                  <p className="text-[8px] text-white/50 mt-0.5 leading-tight">{kpi.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traffic Chart Card */}
        <div className="rounded-xl bg-[#111427] border border-white/[0.06] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] text-white/50 uppercase font-mono tracking-wider">Organic Traffic</span>
              <div className="flex items-baseline gap-1.5">
                <h4 className="text-base font-bold text-white leading-tight">14,237</h4>
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-0.5">
                  <RiArrowRightUpLine size={9} />+340%
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              {["7D", "1M", "6M"].map((period, i) => (
                <button
                  key={period}
                  className={`px-1.5 py-0.5 rounded text-[7px] font-mono font-bold transition-colors ${
                    i === 2
                      ? "bg-[#002bba]/30 text-blue-300 border border-[#002bba]/40"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="w-full relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight + 4}`}
              className="w-full h-14"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#002bba" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#002bba" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={(chartHeight / 3) * i}
                  x2={chartWidth}
                  y2={(chartHeight / 3) * i}
                  stroke="white"
                  strokeOpacity="0.04"
                  strokeWidth="0.3"
                />
              ))}
              {/* Area fill */}
              <path d={areaPath} fill="url(#chartGrad)" />
              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {CHART_POINTS.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="1.5"
                  fill={i === CHART_POINTS.length - 1 ? "#10b981" : "#002bba"}
                  stroke={i === CHART_POINTS.length - 1 ? "#10b981" : "#002bba"}
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                />
              ))}
              {/* End point glow */}
              <circle
                cx={CHART_POINTS[CHART_POINTS.length - 1].x}
                cy={CHART_POINTS[CHART_POINTS.length - 1].y}
                r="3"
                fill="#10b981"
                fillOpacity="0.3"
              />
            </svg>
            {/* X-axis labels */}
            <div className="flex justify-between text-[7px] text-white/30 font-mono px-0.5 -mt-0.5">
              {CHART_LABELS.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Keyword Rankings Card */}
        <div className="rounded-xl bg-[#111427] border border-white/[0.06] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-white/50 uppercase font-mono tracking-wider flex items-center gap-1.5">
              <RiSearchLine size={10} className="text-blue-400" />
              Keyword Rankings
            </span>
            <span className="text-[8px] text-white/40 font-mono">Top 5</span>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[1fr_36px_36px_40px] gap-1.5 text-[7px] text-white/30 font-mono uppercase pb-1 border-b border-white/[0.06]">
            <span>Keyword</span>
            <span className="text-center">Rank</span>
            <span className="text-center">Δ</span>
            <span className="text-right">Vol</span>
          </div>

          {/* Table Body */}
          {KEYWORD_DATA.map((kw, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_36px_36px_40px] gap-1.5 items-center py-1.5 ${
                i < KEYWORD_DATA.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-4 rounded-full ${i === 0 ? "bg-emerald-400" : i === 3 ? "bg-blue-400" : "bg-white/10"}`} />
                <span className="text-[9px] text-white/80 truncate">{kw.keyword}</span>
              </div>
              <div className="text-center">
                <span className={`text-[10px] font-bold font-mono ${kw.rank <= 3 ? "text-emerald-400" : "text-white/70"}`}>
                  #{kw.rank}
                </span>
              </div>
              <div className="text-center">
                <span className={`text-[8px] font-mono flex items-center justify-center gap-0.5 ${
                  kw.change > 0 ? "text-emerald-400" : kw.change < 0 ? "text-rose-400" : "text-white/30"
                }`}>
                  {kw.change > 0 ? <RiArrowUpLine size={7} /> : kw.change < 0 ? <RiArrowDownLine size={7} /> : "—"}
                  {kw.change !== 0 ? Math.abs(kw.change) : ""}
                </span>
              </div>
              <span className="text-[8px] text-white/50 font-mono text-right">{kw.volume}</span>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom Navigation Bar ── */}
      <div className="shrink-0 border-t border-white/[0.06] px-5 py-1.5 flex items-center justify-between bg-[#0b0e1a] relative z-30">
        {[
          { id: "dashboard", icon: RiDashboardLine, label: "Dashboard" },
          { id: "keywords", icon: RiSearchLine, label: "Keywords" },
          { id: "rankings", icon: RiListCheck3, label: "Rankings" },
          { id: "settings", icon: RiSettings3Line, label: "Settings" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                isActive ? "text-blue-400" : "text-white/35 hover:text-white/60"
              }`}
            >
              <Icon size={16} />
              <span className={`text-[7px] font-mono ${isActive ? "font-bold" : ""}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-blue-400 -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
