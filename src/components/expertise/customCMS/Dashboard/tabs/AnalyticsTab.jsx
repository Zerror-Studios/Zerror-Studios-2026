"use client";
import React, { useRef } from "react";
import { getTokens } from "../ui/tokens";
import { Card, CardHeader, StatCard, useTabEntrance } from "../ui/Primitives";

const kpis = [
  { label: "Conversion rate", value: "3.42%", delta: "0.4%", note: "vs last week" },
  { label: "Average order value", value: "₹10,350", delta: "₹1,015", note: "vs last month" },
  { label: "Cart abandonment", value: "22.8%", delta: "3.1%", note: "improved" },
  { label: "Returning customers", value: "44.2%", delta: "2.6%", note: "vs last month" },
];

const channels = [
  { source: "Instagram and Meta ads", pct: 45, rev: "₹40,341" },
  { source: "Google search", pct: 30, rev: "₹26,894" },
  { source: "Direct", pct: 15, rev: "₹13,447" },
  { source: "Email and affiliates", pct: 10, rev: "₹8,965" },
];

const funnel = [
  { step: "Product page views", count: "1,48,900", pct: 100 },
  { step: "Added to cart", count: "38,200", pct: 25.6 },
  { step: "Started checkout", count: "12,400", pct: 8.3 },
  { step: "Completed order", count: "5,092", pct: 3.4 },
];

export default function AnalyticsTab({ theme }) {
  const tabRef = useRef(null);
  const isDark = theme === "dark";
  const t = getTokens(isDark);
  useTabEntrance(tabRef);

  return (
    <div ref={tabRef} className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {kpis.map((k) => (
          <StatCard key={k.label} t={t} label={k.label} value={k.value} delta={k.delta} note={k.note} up={k.up ?? true} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        <Card t={t} className="p-4 md:p-5">
          <CardHeader t={t} title="Revenue by channel" sub="Where this month's sales came from" />
          <div className="space-y-4">
            {channels.map((c, i) => (
              <div key={c.source} className="space-y-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <span className={t.body}>{c.source}</span>
                  <span className={`shrink-0 tabular-nums ${t.muted}`}>
                    <span className={`font-semibold ${t.strong}`}>{c.rev}</span> · {c.pct}%
                  </span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${t.track}`}>
                  <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: t.bar, opacity: 1 - i * 0.22 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card t={t} className="p-4 md:p-5">
          <CardHeader t={t} title="Checkout funnel" sub="From first view to completed order" />
          <div className="space-y-2">
            {funnel.map((f, i) => (
              <div key={f.step} className={`relative overflow-hidden rounded-lg border ${t.border}`}>
                {/* Bar width shows how many visitors are left at each step */}
                <div
                  className="absolute inset-y-0 left-0"
                  style={{ width: `${Math.max(f.pct, 6)}%`, background: t.bar, opacity: isDark ? 0.22 : 0.08 }}
                />
                <div className="relative flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
                  <span className={`flex items-center gap-2.5 ${t.body}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${t.badge.brand} ring-1 ring-inset`}>{i + 1}</span>
                    {f.step}
                  </span>
                  <span className={`shrink-0 tabular-nums ${t.muted}`}>
                    <span className={`font-semibold ${t.strong}`}>{f.count}</span> · {f.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
