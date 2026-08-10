"use client";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  RiLineChartLine,
  RiStoreLine,
  RiShoppingBagLine,
  RiBankCardLine,
  RiSearchLine,
  RiNotification3Line,
  RiMailLine,
  RiArrowRightSLine,
  RiHome4Line,
  RiSettings3Line,
  RiContactsBook2Line,
  RiFileTextLine,
  RiMegaphoneLine,
  RiArticleLine,
  RiArrowUpLine
} from "@remixicon/react";
import HomePage from "./HomePage";
import AnalyticsPage from "./AnalyticsPage";
import StorePage from "./StorePage";
import OrdersPage from "./OrdersPage";
import PaymentsPage from "./PaymentsPage";
import ContactBookPage from "./ContactBookPage";
import FormSubmissionsPage from "./FormSubmissionsPage";
import MarketingPage from "./MarketingPage";
import BlogsPage from "./BlogsPage";
import SettingsPage from "./SettingsPage";
import "./cmsDashboard.css";

const sidebarConfig = [
  { id: "home", label: "Home", Icon: RiHome4Line },
  { id: "analytics", label: "Analytics", Icon: RiLineChartLine, hasSub: true },
  { id: "store", label: "Store", Icon: RiStoreLine, hasSub: true },
  { id: "orders", label: "Orders", Icon: RiShoppingBagLine },
  { id: "payments", label: "Payments", Icon: RiBankCardLine },
  { id: "contact", label: "Contact Book", Icon: RiContactsBook2Line, hasSub: true },
  { id: "forms", label: "Form Submissions", Icon: RiFileTextLine, hasSub: true },
  { id: "marketing", label: "Marketing", Icon: RiMegaphoneLine, hasSub: true },
  { id: "blogs", label: "Blogs", Icon: RiArticleLine, hasSub: true },
  { id: "settings", label: "Settings", Icon: RiSettings3Line },
];

const tabPageMap = {
  home: HomePage,
  analytics: AnalyticsPage,
  store: StorePage,
  orders: OrdersPage,
  payments: PaymentsPage,
  contact: ContactBookPage,
  forms: FormSubmissionsPage,
  marketing: MarketingPage,
  blogs: BlogsPage,
  settings: SettingsPage,
};

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [tabKey, setTabKey] = useState(0);

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setTabKey((prev) => prev + 1); // Force re-mount for animations
  };

  const contentRef = useRef(null);

  useGSAP(() => {
    if (contentRef.current) {
      // Main fade-in and slide-up for the container
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
      
      // Staggered animation for internal elements (text, buttons, svgs, cards, table rows)
      const elements = contentRef.current.querySelectorAll(
        "h2, .cms-page-subtitle, button, svg, .cms-stat-box, .cms-panel, table tr, .cms-empty-state"
      );
      
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.02, ease: "power2.out", delay: 0.1 }
        );
      }
    }
  }, { dependencies: [tabKey], scope: contentRef });

  const ActivePage = tabPageMap[activeTab] || HomePage;

  return (
    <div className="cms-app-container cms-animate-scale-in">
      {/* Top Navigation Bar */}
      <div className="cms-topbar">
        <div className="cms-topbar-brand">
          ZCOMMERCE
        </div>
        <div className="cms-topbar-search">
          <div className="cms-search-input-wrapper">
            <RiSearchLine size={14} className="cms-search-icon" />
            <input type="text" placeholder="Search for tools, apps, help & more..." />
          </div>
        </div>
        <div className="cms-topbar-actions">
          <button className="cms-icon-btn">
            <RiNotification3Line size={16} />
            <span className="cms-badge">2</span>
          </button>
          <button className="cms-icon-btn">
            <RiMailLine size={16} />
            <span className="cms-badge">2</span>
          </button>
          <button className="cms-profile-btn">
            Nahara <span className="cms-profile-avatar">N</span>
          </button>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="cms-app-layout">
        {/* Sidebar */}
        <nav className="cms-app-sidebar">
          <div className="cms-sidebar-scrollable">
            <div className="cms-sidebar-nav">
              {sidebarConfig.map((item) => (
                <button
                  key={item.id}
                  className={`cms-sidebar-item ${activeTab === item.id ? "active" : ""}`}
                  onClick={() => handleTabChange(item.id)}
                >
                  <div className="sidebar-item-left">
                    <span className="sidebar-icon">
                      <item.Icon size={16} />
                    </span>
                    {item.label}
                  </div>
                  {item.hasSub && (
                    <span className="sidebar-chevron">
                      <RiArrowRightSLine size={14} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="cms-sidebar-footer">
            <div className="cms-sidebar-promo">
              <div className="cms-promo-icon">
                <RiArrowUpLine size={14} />
              </div>
              <p>Ready to go beyond basic plan</p>
              <button className="cms-btn-primary full-width">View Plans</button>
            </div>
            <div className="cms-sidebar-credits">
              <p>Developed by <strong>Zerror Studios</strong></p>
              <p>© 2026 | Version 1.01.000</p>
            </div>
          </div>
        </nav>

        {/* Main content area */}
        <div className="cms-app-main">
          <div data-lenis-prevent className="cms-tab-content" key={tabKey} ref={contentRef}>
            <ActivePage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
