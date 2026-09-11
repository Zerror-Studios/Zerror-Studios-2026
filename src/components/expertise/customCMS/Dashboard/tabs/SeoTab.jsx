"use client";
import React, { useState } from "react";
import { AnimatedRadialGauge, SparklesIcon, CheckIcon, PulseDot } from "../ui/SvgAnimatedIcons";

export default function SeoTab({ searchTerm }) {
  const [metaTitle, setMetaTitle] = useState("Custom CMS Development & Scalable Headless Solutions | Zerror Studios");
  const [metaDesc, setMetaDesc] = useState("Build, manage, and scale high-performance digital platforms with our enterprise custom CMS. 100% SEO optimized, edge cached, and developer friendly.");
  const [canonicalUrl, setCanonicalUrl] = useState("https://zerrorstudios.com/expertise/custom-cms");
  const [autoSchema, setAutoSchema] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top SEO Health Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radial Gauge Card */}
        <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl flex flex-col items-center justify-center text-center">
          <AnimatedRadialGauge score={96} label="Overall SEO & Core Web Vitals" />
          <p className="text-[11px] text-gray-400 mt-2">
            Structured Data, OpenGraph, Canonical URLs & LCP timing passed validation.
          </p>
        </div>

        {/* Live SEO Optimization Checklist */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-emerald-400" />
              Automated SEO Audit Checklist
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Passed 9 / 9 Checks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {[
              { check: "Dynamic Sitemap XML", status: "Auto-Generated", ok: true },
              { check: "Robots.txt & Meta Directives", status: "Valid Index/Follow", ok: true },
              { check: "Structured JSON-LD Schema", status: "Organization & Service", ok: true },
              { check: "OpenGraph & Twitter Cards", status: "Configured", ok: true },
              { check: "H1 Single Hierarchy Test", status: "Passed (1 H1)", ok: true },
              { check: "Mobile Responsive CWV", status: "100/100 Mobile Score", ok: true }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-gray-300 font-medium text-[11px] flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                  {item.check}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Google & Social Preview Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Controls */}
        <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2">Meta Title & Snippet Live Editor</h3>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-gray-300 font-semibold">Meta Title</label>
              <span className={`text-[10px] ${metaTitle.length > 60 ? "text-amber-400" : "text-gray-400"}`}>
                {metaTitle.length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-gray-300 font-semibold">Meta Description</label>
              <span className={`text-[10px] ${metaDesc.length > 160 ? "text-amber-400" : "text-gray-400"}`}>
                {metaDesc.length} / 160 chars
              </span>
            </div>
            <textarea
              rows="3"
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Canonical URL</label>
            <input
              type="text"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-[11px] text-blue-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-gray-300 font-semibold">Auto-Generate JSON-LD Schema</span>
            <button
              onClick={() => setAutoSchema(!autoSchema)}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${autoSchema ? "bg-blue-600" : "bg-gray-700"}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${autoSchema ? "translate-x-5" : "translate-x-0"}`}></span>
            </button>
          </div>
        </div>

        {/* Live Search & Social Card Simulator */}
        <div className="p-5 rounded-2xl bg-[#0F1524]/90 border border-white/10 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white">Live Search Engine Preview</h3>

          {/* Google Preview Card */}
          <div className="p-4 rounded-xl bg-[#202124] border border-gray-700/50 space-y-1">
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono truncate">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">G</span>
              <span>{canonicalUrl}</span>
            </div>
            <h4 className="text-sm font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-1">
              {metaTitle || "Page Title Here"}
            </h4>
            <p className="text-[11px] text-[#bdc1c6] leading-relaxed line-clamp-2">
              {metaDesc || "Enter description above..."}
            </p>
          </div>

          {/* OpenGraph Social Card Preview */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Social Share Card (Twitter / LinkedIn)</span>
            <div className="rounded-lg bg-gradient-to-tr from-blue-900 to-indigo-900 h-28 flex flex-col justify-end p-3 border border-white/10">
              <span className="text-[10px] font-bold text-blue-300 uppercase">zerrorstudios.com</span>
              <h5 className="text-xs font-bold text-white truncate">{metaTitle}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
