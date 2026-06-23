"use client";
import React, { useState, useEffect } from "react";
import { bottomCards, sessionData, revenueStats, overviewChart } from "./dashboardData";

// Animated counter hook
const useCounter = (end, duration = 1500, startAnimation = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    let startTime = null;
    const numEnd = parseFloat(String(end).replace(/[^0-9.]/g, "")) || 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numEnd));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startAnimation]);
  return count;
};

const HomePage = () => {
  const [animateCharts, setAnimateCharts] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCharts(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Build line chart path from overview data
  const chartWidth = 280;
  const chartHeight = 80;
  const points = overviewChart.points;
  const maxY = Math.max(...points.map((p) => p.y));
  const scaledPoints = points.map((p) => ({
    x: (p.x / 280) * chartWidth,
    y: chartHeight - (p.y / maxY) * (chartHeight - 10),
  }));

  const linePath = scaledPoints.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaPath = `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`;

  return (
    <div className="cms-tab-page">
      {/* Top 3 cards */}
      <div className="cms-cards-row">
        {/* 30-Day Overview */}
        <div className="cms-card cms-overview-card cms-animate-fade-up cms-delay-1">
          <span className="cms-overview-badge">30-Day Overview</span>
          <h3 className="cms-overview-title">
            Store performance trending
            <br />
            upward
          </h3>
          <p className="cms-overview-desc">Revenue up 100% compared to previous period. Keep it going.</p>
          <div className="cms-overview-chart">
            <svg className="cms-mini-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="miniAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#002bba" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#002bba" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#miniAreaGrad)" className="cms-mini-area" />
              <path d={linePath} className="cms-mini-line" />
              {/* End dot */}
              <circle
                cx={scaledPoints[scaledPoints.length - 1].x}
                cy={scaledPoints[scaledPoints.length - 1].y}
                r="3"
                fill="#002bba"
                className="cms-mini-dot"
              />
            </svg>
            <span className="cms-mini-chip">{overviewChart.amount}</span>
          </div>
          <button className="cms-view-analytics-btn">View analytics</button>
        </div>

        {/* Sessions this week */}
        <div className="cms-card cms-sessions-card cms-animate-fade-up cms-delay-2">
          <h4 className="cms-card-title">Sessions this week</h4>
          <div className="cms-bar-chart">
            {sessionData.days.map((day, i) => {
              const maxVal = Math.max(...sessionData.values);
              const height = animateCharts ? `${(sessionData.values[i] / maxVal) * 100}%` : "0%";
              const isActive = i === sessionData.activeDay;
              return (
                <div key={day} className="cms-bar-wrapper">
                  <div
                    className={`cms-bar ${isActive ? "active" : i === sessionData.activeDay - 1 ? "highlight" : "default"}`}
                    style={{ height, transitionDelay: `${i * 0.08}s` }}
                  >
                    {isActive && <span className="cms-bar-value">{sessionData.values[i]}</span>}
                  </div>
                  <span className="cms-bar-label">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="cms-sessions-stats">
            <div className="cms-session-stat">
              <span className="cms-session-stat-label">Sessions</span>
              <div className="cms-session-stat-bar">
                <div
                  className="cms-session-stat-fill green"
                  style={{ width: animateCharts ? "75%" : "0%" }}
                />
              </div>
              <span className="cms-session-stat-value">584</span>
            </div>
            <div className="cms-session-stat">
              <span className="cms-session-stat-label">Orders</span>
              <div className="cms-session-stat-bar">
                <div
                  className="cms-session-stat-fill blue"
                  style={{ width: animateCharts ? "8%" : "0%" }}
                />
              </div>
              <span className="cms-session-stat-value">5</span>
            </div>
            <div className="cms-session-stat">
              <span className="cms-session-stat-label">Unique visitors</span>
              <div className="cms-session-stat-bar">
                <div
                  className="cms-session-stat-fill gray"
                  style={{ width: animateCharts ? "0%" : "0%" }}
                />
              </div>
              <span className="cms-session-stat-value">—</span>
            </div>
          </div>
        </div>

        {/* Revenue Split */}
        <div className="cms-card cms-revenue-card cms-animate-fade-up cms-delay-3">
          <h4 className="cms-card-title">Revenue split</h4>
          <div className="cms-donut-container">
            <svg className="cms-donut-svg" viewBox="0 0 100 100">
              <circle className="cms-donut-track" cx="50" cy="50" r="40" />
              <circle
                className={`cms-donut-fill ${animateCharts ? "cms-donut-animate" : ""}`}
                cx="50"
                cy="50"
                r="40"
                strokeDasharray="251.2"
                strokeDashoffset={animateCharts ? "0" : "251.2"}
              />
            </svg>
            <div className="cms-donut-center">
              <div className="cms-donut-percent">{animateCharts ? "100%" : "0%"}</div>
              <div className="cms-donut-sublabel">orders</div>
            </div>
          </div>
          <div className="cms-revenue-legend">
            <div className="cms-legend-item">
              <span className="cms-legend-dot green" />
              <span className="cms-legend-label">Direct orders</span>
              <span className="cms-legend-value">5</span>
            </div>
            <div className="cms-legend-item">
              <span className="cms-legend-dot blue" />
              <span className="cms-legend-label">Referral</span>
              <span className="cms-legend-value">0</span>
            </div>
          </div>
          <div className="cms-revenue-stats-row">
            {revenueStats.bottomStats.map((stat, i) => (
              <div key={i} className="cms-revenue-stat">
                <div className="cms-revenue-stat-value">{stat.value}</div>
                <div className="cms-revenue-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="cms-stats-row">
        {bottomCards.map((card, i) => (
          <div
            key={i}
            className={`cms-stat-card cms-animate-fade-up cms-delay-${i + 4} ${card.highlight ? "highlight" : ""}`}
          >
            <div className="cms-stat-card-title">{card.title}</div>
            <div className="cms-stat-card-value">{card.value}</div>
            {card.subValue && (
              <div className="cms-stat-card-sub" style={{ marginBottom: "0.2rem" }}>
                {card.subValue}
              </div>
            )}
            <div className={`cms-stat-badge ${card.badge.type}`}>
              {card.badge.type === "green" ? "↑" : card.badge.type === "blue" ? "↑" : "—"} {card.badge.text}
            </div>
            <div className="cms-stat-card-sub">{card.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
