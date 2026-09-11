"use client";
import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import OverviewTab from "./tabs/OverviewTab";
import ProductsTab from "./tabs/ProductsTab";
import PaymentsTab from "./tabs/PaymentsTab";
import AnalyticsTab from "./tabs/AnalyticsTab";
import CustomersTab from "./tabs/CustomersTab";

export default function CmsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light"); // "light" | "dark"
  const [isDemoActive, setIsDemoActive] = useState(false);

  const containerRef = useRef(null);
  const isDark = theme === "dark";

  // Automatically disable demo and show "Try Interactive Demo" button when dashboard scrolls out of screen view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsDemoActive(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab searchTerm={searchTerm} theme={theme} />;
      case "products":
        return <ProductsTab searchTerm={searchTerm} theme={theme} />;
      case "payments":
        return <PaymentsTab searchTerm={searchTerm} theme={theme} />;
      case "analytics":
        return <AnalyticsTab searchTerm={searchTerm} theme={theme} />;
      case "customers":
      case "settings":
        return <CustomersTab searchTerm={searchTerm} theme={theme} />;
      default:
        return <OverviewTab searchTerm={searchTerm} theme={theme} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full rounded-xl border overflow-hidden shadow-2xl flex flex-col lg:flex-row font-sans relative transition-colors duration-300 ${isDark
          ? "bg-[#090D16] text-white border-white/15"
          : "bg-[#F4F6F9] text-gray-900 border-gray-200/90"
        }`}
    >
      {/* Try Demo Blue Overlay (Disappears when clicked, reappears when scrolled out of view) */}
      {!isDemoActive && (
        <div className="absolute inset-0 z-50 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="pt-3">
            <Button
              title="Try Demo"
              variant=""
              onClick={() => setIsDemoActive(true)}
            />
          </div>
        </div>
      )}

      {/* Sidebar Component */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Dashboard Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#0B0F19]" : "bg-[#F8FAFC]"
          }`}
      >
        {/* Header Component */}
        <DashboardHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          theme={theme}
          setTheme={setTheme}
          setIsDemoActive={setIsDemoActive}
        />

        {/* Scrollable Viewport with Lenis scroll protection */}
        <main
          data-lenis-prevent="true"
          className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin transition-colors duration-300 ${isDark
              ? "scrollbar-thumb-white/10 scrollbar-track-transparent"
              : "scrollbar-thumb-gray-200 scrollbar-track-transparent"
            }`}
        >
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}
