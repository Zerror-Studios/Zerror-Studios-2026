"use client";
import React, { useState } from "react";
import {
  RiLineChartLine,
  RiStoreLine,
  RiShoppingBagLine,
  RiBankCardLine,
  RiShareBoxLine,
  RiAddLine,
  RiFileCopyLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiHome4Line,
  RiSettings3Line,
  RiLogoutBoxRLine,
  RiUserSettingsLine,
} from "@remixicon/react";
import HomePage from "./HomePage";
import AnalyticsPage from "./AnalyticsPage";
import StorePage from "./StorePage";
import OrdersPage from "./OrdersPage";
import PaymentsPage from "./PaymentsPage";
import "./cmsDashboard.css";

const sidebarConfig = [
  { id: "home", label: "Home", Icon: RiHome4Line },
  { id: "analytics", label: "Analytics", Icon: RiLineChartLine },
  { id: "store", label: "Store", Icon: RiStoreLine },
  { id: "orders", label: "Orders", Icon: RiShoppingBagLine },
  { id: "payments", label: "Payments", Icon: RiBankCardLine },
];

const tabPageMap = {
  home: HomePage,
  analytics: AnalyticsPage,
  store: StorePage,
  orders: OrdersPage,
  payments: PaymentsPage,
};

const tabHeaderMap = {
  home: { breadcrumb: ["Home Page", "Dashboard"], title: "Welcome Back" },
  analytics: { breadcrumb: ["Home Page", "Analytics"], title: "Analytics Overview" },
  store: { breadcrumb: ["Home Page", "Store"], title: "Store Manager" },
  orders: { breadcrumb: ["Home Page", "Orders"], title: "Order Management" },
  payments: { breadcrumb: ["Home Page", "Payments"], title: "Payment Center" },
};

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [tabKey, setTabKey] = useState(0);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setTabKey((prev) => prev + 1); // Force re-mount for animations
  };

  const ActivePage = tabPageMap[activeTab];
  const header = tabHeaderMap[activeTab];

  return (
    <div className="cms-browser cms-animate-scale-in">
      {/* Browser chrome */}
      <div className="cms-browser-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="cms-browser-dots">
            <span className="cms-browser-dot red" />
            <span className="cms-browser-dot yellow" />
            <span className="cms-browser-dot green" />
          </div>
          <div className="cms-browser-nav">
            <RiFileCopyLine size={12} color="#666" />
            <span className="cms-browser-nav-btn">
              <RiArrowLeftSLine size={12} />
            </span>
            <span className="cms-browser-nav-btn">
              <RiArrowRightSLine size={12} />
            </span>
          </div>
        </div>
        <div className="cms-browser-url">
          <span>Zcom.com</span>
        </div>
        <div className="cms-browser-actions">
          <RiShareBoxLine size={12} />
          <RiAddLine size={12} />
          <RiFileCopyLine size={12} />
        </div>
      </div>

      {/* Dashboard */}
      <div className="cms-dashboard">
        {/* Sidebar */}
        <nav className="cms-sidebar uppercase">
          <div>
            <div className="cms-sidebar-brand">
              <span>Zcom</span>
            </div>
            <div className="cms-sidebar-nav">
              {sidebarConfig.map((item) => (
                <button
                  key={item.id}
                  className={`cms-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => handleTabChange(item.id)}
                >
                  <span className="sidebar-icon">
                    <item.Icon size={14} />
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cms-sidebar-footer">
            <button className="cms-sidebar-action uppercase" type="button">
              <RiUserSettingsLine size={15} />
              Edit Profile
            </button>
            <button className="cms-sidebar-action uppercase" type="button">
              <RiSettings3Line size={15} />
              Settings
            </button>
            <button className="cms-sidebar-action uppercase" type="button">
              <RiLogoutBoxRLine size={15} />
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <div className="cms-main">
          <div className="cms-main-header cms-animate-fade-up">
            <div>
              <div className="cms-breadcrumb">
                <span>{header.breadcrumb[0]}</span>
                <span>/</span>
                <span className="active-crumb">{header.breadcrumb[1]}</span>
              </div>
              <h2 className="cms-welcome-title">{header.title}</h2>
              <p className="cms-welcome-subtitle">
                Here&apos;s what&apos;s happening with your store today, May 09, 2026 ·{" "}
                <a href="#">Last updated: 06:36 PM</a>
              </p>
            </div>
            <div className="cms-header-actions">
              <span className="cms-date-range">Apr 10 – May 9, 2026</span>
              <button className="cms-btn-outline">+ Add Widget</button>
              <button className="cms-btn-primary">Create a Report</button>
            </div>
          </div>

          {/* Tab content */}
          <div className="cms-tab-content" key={tabKey}>
            <ActivePage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
