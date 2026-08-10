import React, { useState } from "react";
import {
  RiArrowDropDownLine,
  RiAddLine,
  RiShoppingCartLine,
  RiSettings3Line,
  RiLineChartLine,
  RiGlobalLine,
  RiInformationLine,
  RiArrowRightSLine
} from "@remixicon/react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { bottomCards, recentOrders, topSellingProducts, topTrafficSources, liveFeed } from "./dashboardData";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const homeHighlighted = ["IND"];

const revenueData = [
  { name: '00:00', sessions: 2100, date: '07 Aug 2026' },
  { name: '04:00', sessions: 3500, date: '07 Aug 2026' },
  { name: '08:00', sessions: 4200, date: '07 Aug 2026' },
  { name: '12:00', sessions: 5200, date: '07 Aug 2026' },
  { name: '16:00', sessions: 6800, date: '07 Aug 2026' },
  { name: '20:00', sessions: 7900, date: '07 Aug 2026' },
  { name: '08 Aug', sessions: 9100, date: '08 Aug 2026' },
  { name: '04:00', sessions: 10500, date: '08 Aug 2026' },
  { name: '08:00', sessions: 11800, date: '08 Aug 2026' },
  { name: '12:00', sessions: 12900, date: '08 Aug 2026' },
  { name: '16:00', sessions: 14100, date: '08 Aug 2026' },
  { name: '20:00', sessions: 14600, date: '08 Aug 2026' },
  { name: '09 Aug', sessions: 14800, date: '09 Aug 2026' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        fontFamily: 'sans-serif',
        fontSize: '13px',
        minWidth: '130px',
        backgroundColor: '#fff'
      }}>
        <div style={{ backgroundColor: '#e2e8f0', padding: '10px 14px', color: '#4b5563', fontWeight: '500' }}>
          {data.date}
        </div>
        <div style={{ backgroundColor: '#000', padding: '12px 14px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'inline-block' }}></span>
          <span>Sessions: <span style={{ fontWeight: 'bold' }}>{payload[0].value.toLocaleString()}</span></span>
        </div>
      </div>
    );
  }
  return null;
};

const HomePage = () => {
  return (
    <div className="cms-page-wrapper">
      {/* Header */}
      <div className="cms-page-header">
        <div className="cms-header-left">
          <h2 className="cms-page-title">Welcome back, Nahara</h2>
          <div className="cms-page-subtitle">
            Here's what's happening with your store today, August 10, 2026.
            <span className="cms-time-update">Last updated: 11:56 AM</span>
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

      {/* Action Buttons Row */}
      <div className="cms-action-row">
        <button className="cms-action-btn"><RiAddLine size={16} className="cms-blue-text" /> Add Product</button>
        <button className="cms-action-btn"><RiShoppingCartLine size={16} className="cms-blue-text" /> Create Order</button>
        <button className="cms-action-btn"><RiLineChartLine size={16} className="cms-blue-text" /> View Sales</button>
        <button className="cms-action-btn"><RiSettings3Line size={16} className="cms-blue-text" /> Settings</button>
      </div>

      {/* Stats Row */}
      <div className="cms-stats-grid">
        {bottomCards.map((card, idx) => (
          <div className="cms-stat-box" key={idx}>
            <div className="cms-stat-box-title">{card.title}</div>
            <div className="cms-stat-box-body">
              <div className="cms-stat-value">{card.value}</div>
              <div className={`cms-stat-badge ${card.badge.type}`}>{card.badge.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="cms-two-col-layout">
        {/* Left Column */}
        <div className="cms-col-left">
          {/* Chart */}
          <div className="cms-panel">
            <div className="cms-panel-header">Revenue over time</div>
            <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    tickFormatter={(val) => val.toLocaleString()}
                  />
                  <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '3 3' }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorSessions)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="cms-panel">
            <div className="cms-panel-header">Recent orders</div>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>STATUS</th>
                  <th className="text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={i}>
                    <td className="cms-blue-text">{order.id}</td>
                    <td>
                      <div className="cms-customer-name">{order.customer}</div>
                      <div className="cms-customer-email">{order.email}</div>
                    </td>
                    <td><span className={`cms-status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td className="text-right font-medium">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cms-panel-footer text-right cms-blue-text cursor-pointer">
              View All Orders <RiArrowRightSLine size={14} className="inline" />
            </div>
          </div>

          {/* Sales by Location */}
          <div className="cms-panel">
            <div className="cms-panel-header">Sales by location</div>
            <div className="cms-map-mock-container" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cms-map-left" style={{ flex: '1.5' }}>
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <ComposableMap projectionConfig={{ scale: 120, center: [0, 20] }} width={600} height={300} style={{ width: "100%", height: "100%" }}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const isHighlighted = homeHighlighted.includes(geo.id);
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
              <div className="cms-map-right" style={{ flex: '1', paddingLeft: '2rem' }}>
                <div className="cms-map-stat-label" style={{ color: '#6b7280', fontSize: '11px', fontWeight: '600', marginBottom: '1rem', letterSpacing: '0.5px' }}>COUNTRIES</div>
                <div className="cms-map-stat-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#4b5563' }}>India <RiArrowRightSLine size={12} color="#ccc" style={{ display: 'inline', verticalAlign: 'middle' }} /></span>
                  <span style={{ fontWeight: '600', color: '#1f2937' }}>20,419</span>
                </div>
                <div className="cms-progress-bar" style={{ height: '6px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="cms-progress-fill blue" style={{ width: '100%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="cms-col-right">
          {/* Insights */}
          <div className="cms-panel">
            <div className="cms-panel-header">Insights</div>
            <div className="cms-insight-card">
              <div className="cms-insight-icon"><RiLineChartLine size={14} /></div>
              <div className="cms-insight-content">
                <div className="cms-insight-title">Revenue Surge</div>
                <div className="cms-insight-desc">Your revenue is up by 100%! Consider restocking your top selling items to maintain momentum.</div>
              </div>
            </div>
          </div>

          {/* Top selling products */}
          <div className="cms-panel">
            <div className="cms-panel-header">Top selling products</div>
            <div className="cms-product-list">
              {topSellingProducts.map((p, i) => (
                <div className="cms-product-item" key={i}>
                  <div className="cms-product-img-mock">{p.image}</div>
                  <div className="cms-product-info">
                    <div className="cms-product-name">{p.name}</div>
                    <div className="cms-product-sold">{p.sold}</div>
                  </div>
                  <div className="cms-product-price">{p.price}</div>
                </div>
              ))}
            </div>
            <div className="cms-panel-footer text-right cms-blue-text cursor-pointer">
              Manage Inventory <RiArrowRightSLine size={14} className="inline" />
            </div>
          </div>

          {/* Top traffic sources */}
          <div className="cms-panel">
            <div className="cms-panel-header">Top traffic sources</div>
            <div className="cms-traffic-list">
              {topTrafficSources.map((t, i) => (
                <div className="cms-traffic-item" key={i}>
                  <div className="cms-traffic-header">
                    <span>{t.source}</span>
                    <span>{t.visits}</span>
                  </div>
                  <div className="cms-progress-bar">
                    <div className="cms-progress-fill" style={{ width: `${(t.visits / t.max) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live feed */}
          <div className="cms-panel">
            <div className="cms-panel-header">Live feed</div>
            <div className="cms-feed-list">
              {liveFeed.map((f, i) => (
                <div className="cms-feed-item" key={i}>
                  <div className="cms-feed-dot"></div>
                  <div className="cms-feed-content">
                    <div className="cms-feed-action">{f.action}</div>
                    <div className="cms-feed-time">{f.time}</div>
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

export default HomePage;
