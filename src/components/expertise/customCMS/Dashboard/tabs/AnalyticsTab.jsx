"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AnalyticsTab({ searchTerm, theme }) {
  const tabRef = useRef(null);

  const isDark = theme === "dark";

  useGSAP(() => {
    gsap.fromTo(
      ".tab-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out"
      }
    );
  }, { scope: tabRef });

  const cardStyle = isDark
    ? "bg-[#0F1524] border-white/10 text-white shadow-xl"
    : "bg-white border-gray-200/80 text-gray-800 shadow-sm";

  return (
    <div ref={tabRef} className="space-y-6 font-sans">
      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Conversion Rate", val: "3.42%", sub: "+0.4% from last week", color: "text-emerald-500" },
          { title: "Average Order Value (AOV)", val: "$124.50", sub: "+$12.20 increase", color: "text-blue-500" },
          { title: "Cart Abandonment", val: "22.8%", sub: "-3.1% improved", color: "text-emerald-500" },
          { title: "Customer Return Rate", val: "44.2%", sub: "High loyalty score", color: "text-purple-400" },
        ].map((item, idx) => (
          <div key={idx} className={`tab-card p-4 rounded-2xl border transition-colors duration-300 ${cardStyle}`}>
            <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.title}</span>
            <div className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{item.val}</div>
            <span className={`text-[11px] font-bold ${item.color}`}>{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Traffic & Conversion Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`tab-card p-5 rounded-2xl border space-y-4 transition-colors duration-300 ${cardStyle}`}>
          <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Traffic Source Revenue Attribution</h3>

          <div className="space-y-3">
            {[
              { source: "Instagram & Meta Ads", pct: 45, rev: "$40,341.00", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
              { source: "Google Organic Search", pct: 30, rev: "$26,894.40", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
              { source: "Direct Store Traffic", pct: 15, rev: "$13,447.20", color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
              { source: "Email Newsletter & Affiliates", pct: 10, rev: "$8,964.80", color: "bg-gradient-to-r from-amber-500 to-orange-500" },
            ].map((channel, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className={isDark ? "text-gray-200" : "text-gray-800"}>{channel.source}</span>
                  <span className={`font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{channel.rev} ({channel.pct}%)</span>
                </div>
                <div className={`w-full rounded-full h-2 overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
                  <div className={`${channel.color} h-2 rounded-full`} style={{ width: `${channel.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Heatmap Telemetry */}
        <div className={`tab-card p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-300 ${cardStyle}`}>
          <div>
            <h3 className={`text-sm font-extrabold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Product Funnel Drop-off Rate</h3>
            <p className={`text-[11px] mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Checkout optimization audit metrics</p>

            <div className="space-y-3 text-xs">
              <div className={`p-3 rounded-xl flex justify-between items-center ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
                <span className={`font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>1. Product Page Views</span>
                <span className={`font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>148,900 visits (100%)</span>
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${isDark ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-blue-50/50 text-blue-900"}`}>
                <span className="font-semibold">2. Added to Shopping Cart</span>
                <span className="font-extrabold">38,200 (25.6%)</span>
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${isDark ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" : "bg-indigo-50/50 text-indigo-900"}`}>
                <span className="font-semibold">3. Initiated Checkout</span>
                <span className="font-extrabold">12,400 (8.3%)</span>
              </div>
              <div className={`p-3 rounded-xl flex justify-between items-center ${isDark ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-emerald-50 text-emerald-900"}`}>
                <span className="font-semibold">4. Completed Orders</span>
                <span className="font-extrabold">5,092 (3.4%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
