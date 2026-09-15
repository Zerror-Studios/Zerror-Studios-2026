"use client";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  IncomeSparkline,
  ProfitSparkline,
  CustomersSparkline,
  SalesAnalyticsBarChart,
  EcommDonutChart,
  TrendUpArrow,
  TrendDownArrow
} from "../ui/SvgAnimatedIcons";

const initialProducts = [
  { id: 1, name: "Jacquemus Largo", sub: "T-shirt", price: "$114.00", qty: 124, total: "$14,136.00", icon: "👕", bg: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300" },
  { id: 2, name: "Aries x Umbro Centenary", sub: "Jersey", price: "$140.90", qty: 76, total: "$10,708.40", icon: "🎽", bg: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300" },
  { id: 3, name: "There Was One", sub: "Pants", price: "$85.50", qty: 54, total: "$4,617.00", icon: "👖", bg: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300" },
  { id: 4, name: "Song For The Mute", sub: "Baseball cap", price: "$230.00", qty: 68, total: "$15,640.00", icon: "🧢", bg: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300" },
];

const geographyList = [
  { country: "Spain", flag: "🇪🇸", percent: 33, color: "bg-blue-600" },
  { country: "USA", flag: "🇺🇸", percent: 25, color: "bg-blue-400" },
  { country: "Canada", flag: "🇨🇦", percent: 22, color: "bg-slate-400" },
  { country: "Portugal", flag: "🇵🇹", percent: 20, color: "bg-slate-300" },
];

export default function OverviewTab({ searchTerm, theme }) {
  const [timeFilter, setTimeFilter] = useState("Monthly");
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

  const filteredProducts = initialProducts.filter(
    p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         p.sub.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = isDark
    ? "bg-[#0F1524] border-white/10 text-white shadow-xl"
    : "bg-white border-gray-200/80 text-gray-800 shadow-sm";

  return (
    <div ref={tabRef} className="space-y-3 font-sans">
      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Total income */}
        <div className={`tab-card p-5 rounded-2xl border flex items-center justify-between transition-colors duration-300 ${cardStyle}`}>
          <div>
            <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Total income
            </span>
            <div className={`text-2xl font-extrabold tracking-tight mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              $89 648
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
              <span>2.3%</span>
              <TrendUpArrow />
            </div>
          </div>
          <IncomeSparkline />
        </div>

        {/* Total profit */}
        <div className={`tab-card p-5 rounded-2xl border flex items-center justify-between transition-colors duration-300 ${cardStyle}`}>
          <div>
            <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Total profit
            </span>
            <div className={`text-2xl font-extrabold tracking-tight mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              $52 994
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
              <span>1.2%</span>
              <TrendDownArrow />
            </div>
          </div>
          <ProfitSparkline />
        </div>

        {/* Total customers */}
        <div className={`tab-card p-5 rounded-2xl border flex items-center justify-between transition-colors duration-300 ${cardStyle}`}>
          <div>
            <span className={`text-xs font-semibold block mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Total customers
            </span>
            <div className={`text-2xl font-extrabold tracking-tight mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              31 517
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
              <span>1.2%</span>
              <TrendUpArrow />
            </div>
          </div>
          <CustomersSparkline />
        </div>
      </div>

      {/* Middle Row: Sales Analytics & Orders Geography */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Sales Analytics Chart (2 cols) */}
        <div className={`tab-card lg:col-span-2 p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-300 ${cardStyle}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
              Sales analytics
            </h3>
            <div className="flex items-center gap-4 text-xs">
              <span className={`flex items-center gap-1.5 font-medium text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Income
              </span>
              <span className={`flex items-center gap-1.5 font-medium text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Profit
              </span>
            </div>
          </div>

          <SalesAnalyticsBarChart />
        </div>

        {/* Orders Geography (1 col) */}
        <div className={`tab-card p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-300 ${cardStyle}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
              Orders geography
            </h3>
            <span className="text-gray-400 text-sm font-bold cursor-pointer">•••</span>
          </div>

          <div className="space-y-4">
            {geographyList.map((geo, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={`flex items-center gap-2 font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                    <span>{geo.flag}</span>
                    <span>{geo.country}</span>
                  </span>
                  <span className={`font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{geo.percent}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-100"}`}>
                  <div
                    className={`${geo.color} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${geo.percent * 2.5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className={`pt-4 mt-2 border-t flex items-center justify-between text-[11px] ${isDark ? "border-white/10 text-gray-400" : "border-gray-100 text-gray-400"}`}>
            <span>Updated live from global fulfillment</span>
            <span className="text-blue-500 font-semibold cursor-pointer">View Map →</span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Product Sales Table & Top Categories Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Product Table (2 cols) */}
        <div className={`tab-card lg:col-span-2 p-5 rounded-2xl border overflow-hidden transition-colors duration-300 ${cardStyle}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
              Top Selling Products
            </h3>
            <span className="text-xs text-blue-500 font-semibold cursor-pointer">View All</span>
          </div>

          <div className="overflow-x-auto" data-lenis-prevent="true">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`font-semibold text-[11px] border-b pb-2 ${isDark ? "text-gray-400 border-white/10" : "text-gray-400 border-gray-100"}`}>
                  <th className="pb-3">Product</th>
                  <th className="pb-3 text-center">Price</th>
                  <th className="pb-3 text-center">Quantity</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-white/5 text-gray-300" : "divide-gray-100 text-gray-700"}`}>
                {filteredProducts.map(prod => (
                  <tr key={prod.id} className={`transition-colors ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50/80"}`}>
                    <td className="py-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${prod.bg} flex items-center justify-center text-base shadow-sm shrink-0`}>
                        {prod.icon}
                      </div>
                      <div>
                        <div className={`font-bold text-xs ${isDark ? "text-white" : "text-gray-900"}`}>{prod.name}</div>
                        <div className={`text-[11px] ${isDark ? "text-gray-400" : "text-gray-400"}`}>{prod.sub}</div>
                      </div>
                    </td>
                    <td className={`py-3 text-center font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{prod.price}</td>
                    <td className={`py-3 text-center font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{prod.qty}</td>
                    <td className={`py-3 text-right font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{prod.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Categories Donut (1 col) */}
        <div className={`tab-card p-5 rounded-2xl border flex flex-col justify-between transition-colors duration-300 ${cardStyle}`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-sm font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
                Top categories
              </h3>
              <span className="text-gray-400 text-sm font-bold cursor-pointer">•••</span>
            </div>

            {/* Time Filter Pills */}
            <div className={`flex items-center justify-center p-1 rounded-xl gap-1 text-[11px] font-semibold mb-2 ${isDark ? "bg-white/5" : "bg-gray-100"}`}>
              {["All time", "Weekly", "Monthly"].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    timeFilter === t
                      ? "bg-blue-600 text-white font-bold shadow-sm"
                      : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <EcommDonutChart timeFilter={timeFilter} />
          </div>

          <div className={`grid grid-cols-2 gap-2 text-xs pt-3 border-t ${isDark ? "border-white/10" : "border-gray-100"}`}>
            <span className={`flex items-center gap-2 text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> T-shirts
            </span>
            <span className={`flex items-center gap-2 text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span> Hoodies
            </span>
            <span className={`flex items-center gap-2 text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-300"></span> Jeans
            </span>
            <span className={`flex items-center gap-2 text-[11px] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Jackets
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
