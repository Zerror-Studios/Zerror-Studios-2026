"use client";
import React, { useState, useRef } from "react";
import {
  IncomeSparkline,
  ProfitSparkline,
  CustomersSparkline,
  SalesAnalyticsBarChart,
  EcommDonutChart,
} from "../ui/SvgAnimatedIcons";
import { getTokens } from "../ui/tokens";
import { Card, CardHeader, StatCard, DataTable, Avatar, useTabEntrance } from "../ui/Primitives";

const topProducts = [
  { id: 1, name: "FabIndia Kurta", sub: "Kurtas", price: "₹2,499", qty: 124, total: "₹3,09,876" },
  { id: 2, name: "Manyavar Sherwani", sub: "Sherwanis", price: "₹4,999", qty: 76, total: "₹3,79,924" },
  { id: 3, name: "Biba Salwar Suit", sub: "Suits", price: "₹1,999", qty: 54, total: "₹1,07,946" },
  { id: 4, name: "Puma Cricket Cap", sub: "Accessories", price: "₹999", qty: 68, total: "₹67,932" },
];

const geographyList = [
  { country: "India", percent: 33 },
  { country: "UAE", percent: 25 },
  { country: "UK", percent: 22 },
  { country: "Singapore", percent: 20 },
];

const categories = ["Kurtas", "Sherwanis", "Suits", "Accessories"];

export default function OverviewTab({ searchTerm, theme }) {
  const [timeFilter, setTimeFilter] = useState("Monthly");
  const tabRef = useRef(null);
  const isDark = theme === "dark";
  const t = getTokens(isDark);
  useTabEntrance(tabRef);

  const q = searchTerm.toLowerCase();
  const filteredProducts = topProducts.filter(
    (p) => p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q)
  );

  const donutColors = isDark ? ["#4d6fff", "#7b93ff", "#334155", "#1e293b"] : ["#002bba", "#4d6fff", "#a9baff", "#dbe2ff"];

  return (
    <div ref={tabRef} className="space-y-3 md:space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <StatCard t={t} label="Total income" value="₹74,40,784" delta="2.3%" note="vs last month">
          <IncomeSparkline isDark={isDark} />
        </StatCard>
        <StatCard t={t} label="Total profit" value="₹43,98,502" delta="1.2%" up={false} note="vs last month">
          <ProfitSparkline isDark={isDark} />
        </StatCard>
        <StatCard t={t} label="Customers" value="31,517" delta="1.2%" note="vs last month">
          <CustomersSparkline isDark={isDark} />
        </StatCard>
      </div>

      {/* Sales + geography */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <Card t={t} className="lg:col-span-2 p-4 md:p-5">
          <CardHeader
            t={t}
            title="Sales"
            sub="Income and profit, Jan to Sep"
            action={
              <div className={`flex items-center gap-3 text-[11px] ${t.muted}`}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm" style={{ background: t.bar }} /> Income
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm" style={{ background: t.barAlt }} /> Profit
                </span>
              </div>
            }
          />
          <SalesAnalyticsBarChart isDark={isDark} />
        </Card>

        <Card t={t} className="p-4 md:p-5 flex flex-col">
          <CardHeader t={t} title="Orders by country" sub="Share of orders this month" />
          <div className="space-y-4 flex-1">
            {geographyList.map((geo, idx) => (
              <div key={geo.country} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={t.body}>{geo.country}</span>
                  <span className={`font-semibold tabular-nums ${t.strong}`}>{geo.percent}%</span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${t.track}`}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${geo.percent * 2.5}%`, background: donutColors[Math.min(idx, 2)], opacity: idx === 3 ? 0.6 : 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={`pt-3 mt-4 border-t flex items-center justify-between text-[11px] ${t.border} ${t.subtle}`}>
            <span>Updated live</span>
            <button className={`font-medium ${t.link}`}>View map →</button>
          </div>
        </Card>
      </div>

      {/* Top products + categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
        <Card t={t} className="lg:col-span-2 p-4 md:p-5">
          <CardHeader t={t} title="Top selling products" action={<button className={`text-xs font-medium ${t.link}`}>View all</button>} />
          <DataTable
            t={t}
            rows={filteredProducts}
            columns={[
              {
                key: "name",
                label: "Product",
                render: (p) => (
                  <div className="flex items-center gap-3">
                    <Avatar t={t} label={p.name[0]} />
                    <div className="min-w-0">
                      <div className={`text-xs font-medium truncate ${t.strong}`}>{p.name}</div>
                      <div className={`text-[11px] ${t.muted}`}>{p.sub}</div>
                    </div>
                  </div>
                ),
              },
              { key: "price", label: "Price", align: "right" },
              { key: "qty", label: "Sold", align: "right" },
              { key: "total", label: "Revenue", align: "right", render: (p) => <span className={`font-semibold ${t.strong}`}>{p.total}</span> },
            ]}
          />
        </Card>

        <Card t={t} className="p-4 md:p-5 flex flex-col">
          <CardHeader t={t} title="Top categories" />
          <div className={`flex p-0.5 rounded-lg gap-0.5 text-[11px] font-medium mb-4 ${t.soft}`}>
            {["All time", "Weekly", "Monthly"].map((f) => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`flex-1 py-1.5 rounded-md transition-all ${timeFilter === f
                  ? isDark ? "bg-white/10 text-white" : "bg-white text-slate-900 shadow-sm"
                  : `${t.muted}`
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <EcommDonutChart timeFilter={timeFilter} isDark={isDark} />

          <div className={`grid grid-cols-2 gap-2 pt-4 mt-4 border-t ${t.border}`}>
            {categories.map((c, i) => (
              <span key={c} className={`flex items-center gap-2 text-[11px] ${t.body}`}>
                <span className="w-2 h-2 rounded-sm" style={{ background: donutColors[i] }} /> {c}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
