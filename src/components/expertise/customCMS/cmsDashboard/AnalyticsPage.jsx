import React, { useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  RiArrowDropDownLine,
  RiGlobalLine,
  RiInformationLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiLineChartLine,
} from "@remixicon/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { analyticsOverview, trafficInsights, avgSessionsByDay } from "./dashboardData";

// Data for Recharts AreaChart
const sessionsChartData = [
  { name: '13 Jul', value: 2 },
  { name: '15 Jul', value: 8 },
  { name: '17 Jul', value: 3 },
  { name: '19 Jul', value: 5 },
  { name: '21 Jul', value: 3 },
  { name: '23 Jul', value: 10 },
  { name: '25 Jul', value: 1 },
  { name: '27 Jul', value: 12 },
  { name: '29 Jul', value: 17 },
  { name: '31 Jul', value: 4 },
  { name: '02 Aug', value: 7 },
  { name: '04 Aug', value: 5 },
  { name: '06 Aug', value: 8 },
  { name: '08 Aug', value: 27 },
  { name: '10 Aug', value: 3 },
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
// Highlighted countries (ISO-3 codes)
const highlighted = ["IND", "USA", "IRL", "SWE", "NLD", "FRA", "AUS", "GBR"];

const AnalyticsPage = () => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.from(".cms-page-header > div", {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Stats boxes animation
    tl.from(".cms-stat-box", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");

    // Divider
    tl.from(".cms-divider", {
      scaleX: 0,
      transformOrigin: "left center",
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut"
    }, "-=0.4");

    // Panels animation
    tl.from(".cms-panel", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");

    // Traffic list items & Bar chart columns & Insight cards
    tl.from(".cms-traffic-item, .cms-bar-col, .cms-insight-card", {
      x: -10,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.2");

  }, { scope: container });

  return (
    <div className="cms-page-wrapper" ref={container}>
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title">Traffic Overview</h2>
          <div className="cms-page-subtitle">
            Track your site's traffic trends and get to know your visitors.
          </div>
          <div className="cms-date-picker-row">
            <button className="cms-date-btn">
              <span className="cms-blue-text">B</span> Jul 12, 2026 – Aug 10, 2026 <RiArrowDropDownLine size={16} />
            </button>
            <span className="cms-compare-text">compared to previous period (Dec 11, 2025)</span>
          </div>
        </div>
        <div className="cms-header-right">
          <button className="cms-btn-primary rounded-btn">
            <RiGlobalLine size={14} /> Live Site
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="cms-stats-grid cols-3">
        <div className="cms-stat-box border-none">
          <div className="cms-stat-box-title">SITE SESSIONS</div>
          <div className="cms-stat-box-body">
            <div className="cms-stat-value">{analyticsOverview.siteSessions.value}</div>
            <div className={`cms-stat-badge ${analyticsOverview.siteSessions.type}`}>{analyticsOverview.siteSessions.badge}</div>
          </div>
        </div>
        <div className="cms-stat-box border-none">
          <div className="cms-stat-box-title">UNIQUE VISITORS</div>
          <div className="cms-stat-box-body">
            <div className="cms-stat-value">{analyticsOverview.uniqueVisitors.value}</div>
            <div className={`cms-stat-badge ${analyticsOverview.uniqueVisitors.type}`}>{analyticsOverview.uniqueVisitors.badge}</div>
          </div>
        </div>
        <div className="cms-stat-box border-none">
          <div className="cms-stat-box-title">SESSIONS PER USER</div>
          <div className="cms-stat-box-body">
            <div className="cms-stat-value">{analyticsOverview.sessionsPerUser.value}</div>
            <div className={`cms-stat-badge ${analyticsOverview.sessionsPerUser.type}`}>{analyticsOverview.sessionsPerUser.badge}</div>
          </div>
        </div>
      </div>
      <div className="cms-divider" />

      {/* Two Column Layout */}
      <div className="cms-two-col-layout" style={{ marginTop: '20px' }}>
        {/* Left Column */}
        <div className="cms-col-left">
          {/* Sessions over time Chart */}
          <div className="cms-panel">
            <div className="cms-panel-header">Sessions over time</div>
            <div style={{ width: '100%', height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sessionsChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="cms-panel-link" style={{ marginTop: '0.5rem' }}>View Report</div>
          </div>

          <div className="cms-row-split">
            {/* New vs returning */}
            <div className="cms-panel half">
              <div className="cms-panel-header">New vs returning visitors</div>
              <div className="cms-donut-mock">
                <div className="cms-donut-chart">
                  <div className="cms-donut-center">
                    <span className="small">Active Users</span>
                    <span className="big">167</span>
                  </div>
                </div>
                <div className="cms-donut-legend">
                  <div className="legend-item"><span className="dot blue"></span> New <br/> 80% - 134</div>
                  <div className="legend-item"><span className="dot light-blue"></span> Returning <br/> 14% - 24</div>
                  <div className="legend-item"><span className="dot gray"></span> Recurring <br/> 5% - 9</div>
                </div>
              </div>
              <div className="cms-panel-link">View Report</div>
            </div>

            {/* Sessions by device */}
            <div className="cms-panel half">
              <div className="cms-panel-header">Sessions by device</div>
              <div className="cms-donut-mock">
                <div className="cms-donut-chart device">
                  <div className="cms-donut-center">
                    <span className="small">Site sessions</span>
                    <span className="big">217</span>
                  </div>
                </div>
                <div className="cms-donut-legend">
                  <div className="legend-item"><span className="dot light-blue"></span> desktop <br/> 59% - 127</div>
                  <div className="legend-item"><span className="dot dark-blue"></span> mobile <br/> 41% - 90</div>
                </div>
              </div>
              <div className="cms-panel-link">View Report</div>
            </div>
          </div>

          {/* Sessions by country */}
          <div className="cms-panel">
            <div className="cms-panel-header">Sessions by country and region</div>
            <div className="cms-map-mock-container large">
              <div className="cms-map-left">
                {/* Real World Map API integration */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <ComposableMap projectionConfig={{ scale: 120, center: [0, 20] }} width={600} height={300} style={{ width: "100%", height: "100%" }}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const isHighlighted = highlighted.includes(geo.id);
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={isHighlighted ? "#3b82f6" : "#e0e7ff"}
                              stroke="#ffffff"
                              strokeWidth={0.5}
                              style={{
                                default: { outline: "none" },
                                hover: { fill: "#2563eb", outline: "none" },
                                pressed: { fill: "#1e40af", outline: "none" },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ComposableMap>
                </div>
              </div>
              <div className="cms-map-right" style={{ paddingLeft: '1rem' }}>
                <div className="cms-map-stat-label">COUNTRIES</div>
                <div className="cms-traffic-list tight">
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>India &gt;</span><span>161</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '100%' }}></div></div>
                   </div>
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>United States &gt;</span><span>33</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '25%' }}></div></div>
                   </div>
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>Ireland</span><span>5</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '5%' }}></div></div>
                   </div>
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>Sweden</span><span>5</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '5%' }}></div></div>
                   </div>
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>Netherlands</span><span>3</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '3%' }}></div></div>
                   </div>
                   <div className="cms-traffic-item">
                     <div className="cms-traffic-header"><span>France &gt;</span><span>2</span></div>
                     <div className="cms-progress-bar"><div className="cms-progress-fill blue" style={{ width: '2%' }}></div></div>
                   </div>
                </div>
                <div className="cms-pagination-arrows">
                  <button className="cms-icon-btn circle" style={{ border: '1px solid #eee', color: '#ccc' }}><RiArrowLeftSLine size={16} /></button>
                  <button className="cms-icon-btn circle" style={{ border: '1px solid #3b82f6', color: '#3b82f6' }}><RiArrowRightSLine size={16} /></button>
                </div>
              </div>
            </div>
            <div className="cms-panel-link">View Report</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="cms-col-right">
          
          {/* Sessions - By Source and Category */}
          <div className="cms-panel">
            <div className="cms-panel-header">Sessions <RiArrowDropDownLine size={16} /> By Source and Category <RiInformationLine size={14} className="ml-1" /></div>
            <div className="cms-traffic-list separated">
              <div className="cms-traffic-item">
                <div className="cms-traffic-header">
                  <span>google / organic</span>
                  <span className="cms-green-text"><span className="arrow-up"></span> 0% 71</span>
                </div>
                <div className="cms-progress-bar">
                  <div className="cms-progress-fill blue" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="cms-traffic-item">
                <div className="cms-traffic-header">
                  <span>(direct) / (none)</span>
                  <span className="cms-green-text"><span className="arrow-up"></span> 0% 64</span>
                </div>
                <div className="cms-progress-bar">
                  <div className="cms-progress-fill blue" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div className="cms-traffic-item">
                <div className="cms-traffic-header">
                  <span>ig / social</span>
                  <span className="cms-green-text"><span className="arrow-up"></span> 0% 45</span>
                </div>
                <div className="cms-progress-bar">
                  <div className="cms-progress-fill blue" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="cms-traffic-item">
                <div className="cms-traffic-header">
                  <span>(not set)</span>
                  <span className="cms-green-text"><span className="arrow-up"></span> 0% 19</span>
                </div>
                <div className="cms-progress-bar">
                  <div className="cms-progress-fill blue" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="cms-traffic-item">
                <div className="cms-traffic-header">
                  <span>canva.com / referral</span>
                  <span className="cms-green-text"><span className="arrow-up"></span> 0% 14</span>
                </div>
                <div className="cms-progress-bar">
                  <div className="cms-progress-fill blue" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
            <div className="cms-panel-link">View Report</div>
          </div>

          {/* Avg sessions by day */}
          <div className="cms-panel">
            <div className="cms-panel-header">Avg. sessions by <span className="cms-blue-text inline-flex items-center">day <RiArrowDropDownLine size={16} /></span></div>
            <div className="cms-bar-chart-mock">
              {avgSessionsByDay.labels.map((label, idx) => (
                <div className="cms-bar-col" key={idx}>
                  <div className="cms-bar-fill" style={{ height: `${(avgSessionsByDay.values[idx] / 50) * 100}%` }}></div>
                  <div className="cms-bar-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="cms-panel-link">View Report</div>
          </div>

          {/* Traffic insights */}
          <div className="cms-panel">
            <div className="cms-panel-header">Traffic insights</div>
            <div className="cms-insights-list">
              {trafficInsights.map((insight, idx) => (
                <div className="cms-insight-card" key={idx}>
                  <div className="cms-insight-icon"><RiLineChartLine size={14} className={insight.type} /></div>
                  <div className="cms-insight-content">
                    <div className="cms-insight-title">{insight.title}</div>
                    <div className="cms-insight-desc">{insight.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
