"use client";
import React, { useState, useEffect } from "react";
import { analyticsData } from "./dashboardData";

const AnalyticsPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Build revenue chart
  const months = analyticsData.monthlyRevenue;
  const maxRevenue = Math.max(...months.map((m) => m.revenue));
  const chartW = 300;
  const chartH = 100;
  const padding = 10;

  const revenuePoints = months.map((m, i) => ({
    x: padding + (i / (months.length - 1)) * (chartW - padding * 2),
    y: chartH - padding - (m.revenue / maxRevenue) * (chartH - padding * 2),
  }));

  const linePath = revenuePoints.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaPath = `${linePath} L${revenuePoints[revenuePoints.length - 1].x},${chartH} L${revenuePoints[0].x},${chartH} Z`;

  return (
    <div className="cms-tab-page">
      {/* Quick stats row */}
      <div className="cms-stats-row" style={{ marginBottom: "0.75rem" }}>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-1">
          <div className="cms-stat-card-title">Conversion Rate</div>
          <div className="cms-stat-card-value">{analyticsData.conversionRate}%</div>
          <div className="cms-stat-badge green">↑ 0.8%</div>
          <div className="cms-stat-card-sub">vs last month</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-2">
          <div className="cms-stat-card-title">Avg. Session</div>
          <div className="cms-stat-card-value">{analyticsData.avgSessionDuration}</div>
          <div className="cms-stat-badge green">↑ 12%</div>
          <div className="cms-stat-card-sub">vs last month</div>
        </div>
        <div className="cms-stat-card cms-animate-fade-up cms-delay-3">
          <div className="cms-stat-card-title">Bounce Rate</div>
          <div className="cms-stat-card-value">{analyticsData.bounceRate}%</div>
          <div className="cms-stat-badge blue">↓ 5%</div>
          <div className="cms-stat-card-sub">improvement</div>
        </div>
        <div className="cms-stat-card highlight cms-animate-fade-up cms-delay-4">
          <div className="cms-stat-card-title">Total Page Views</div>
          <div className="cms-stat-card-value">3,013</div>
          <div className="cms-stat-badge green">↑ 24%</div>
          <div className="cms-stat-card-sub">vs last month</div>
        </div>
      </div>

      <div className="cms-analytics-grid">
        {/* Revenue chart */}
        <div className="cms-card cms-animate-fade-up cms-delay-3">
          <h4 className="cms-card-title" style={{ fontSize: "0.72rem", fontFamily: "grotesk-bold", color: "#111", marginBottom: "0.5rem" }}>
            Monthly Revenue Trend
          </h4>
          <div className="cms-line-chart-container">
            <svg width="100%" height="100%" viewBox={`0 0 ${chartW} ${chartH}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#002bba" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#002bba" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((f, i) => (
                <line key={i} className="cms-chart-grid-line" x1={padding} y1={chartH * f} x2={chartW - padding} y2={chartH * f} />
              ))}
              {/* Area */}
              <path d={areaPath} className="cms-chart-area" style={{ opacity: animate ? 0.15 : 0, transition: "opacity 1s ease 1s" }} />
              {/* Line */}
              <path d={linePath} className={`cms-chart-line ${animate ? "cms-line-animate" : ""}`} />
              {/* Dots */}
              {revenuePoints.map((p, i) => (
                <circle key={i} className="cms-chart-dot" cx={p.x} cy={p.y} r={3} style={{ opacity: animate ? 1 : 0, transition: `opacity 0.3s ease ${1.5 + i * 0.1}s` }} />
              ))}
              {/* Labels */}
              {months.map((m, i) => (
                <text key={i} className="cms-chart-label" x={revenuePoints[i].x} y={chartH - 1} textAnchor="middle">
                  {m.month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="cms-card cms-animate-fade-up cms-delay-4">
          <h4 className="cms-card-title" style={{ fontSize: "0.72rem", fontFamily: "grotesk-bold", color: "#111", marginBottom: "0.6rem" }}>
            Traffic Sources
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {analyticsData.trafficSources.map((source, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6rem", marginBottom: "0.2rem" }}>
                  <span style={{ color: "#333", fontFamily: "grotesk-medium" }}>{source.source}</span>
                  <span style={{ color: "#888" }}>{source.visits} visits ({source.percent}%)</span>
                </div>
                <div style={{ width: "100%", height: "0.35rem", background: "#f0f0f0", borderRadius: "1rem", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: animate ? `${source.percent}%` : "0%",
                      background: i === 0 ? "#002bba" : i === 1 ? "#28a745" : i === 2 ? "#3355cc" : "#888",
                      borderRadius: "1rem",
                      transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="cms-card cms-animate-fade-up cms-delay-5" style={{ marginTop: "0.75rem" }}>
        <h4 className="cms-card-title" style={{ fontSize: "0.72rem", fontFamily: "grotesk-bold", color: "#111", marginBottom: "0.5rem" }}>
          Top Pages
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {analyticsData.pageViews.map((page, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.6rem", padding: "0.35rem 0", borderBottom: i < analyticsData.pageViews.length - 1 ? "1px solid #f6f8ff" : "none" }}>
              <span style={{ color: "#002bba", fontFamily: "grotesk-medium" }}>{page.page}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "5rem", height: "0.25rem", background: "#f0f0f0", borderRadius: "1rem", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: animate ? `${(page.views / 1240) * 100}%` : "0%",
                      background: "#002bba",
                      borderRadius: "1rem",
                      transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
                    }}
                  />
                </div>
                <span style={{ color: "#333", fontFamily: "grotesk-medium", minWidth: "2.5rem", textAlign: "right" }}>
                  {page.views.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
