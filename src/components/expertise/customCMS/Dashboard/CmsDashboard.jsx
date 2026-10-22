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
import { getTokens } from "./ui/tokens";

const DEFAULT_THEME = "light";

export default function CmsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState(DEFAULT_THEME); // "light" | "dark"
  const [isDemoActive, setIsDemoActive] = useState(false);

  const containerRef = useRef(null);
  const t = getTokens(theme === "dark");

  // Reset the demo (and theme) once the dashboard scrolls out of view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsDemoActive(false);
          setTheme(DEFAULT_THEME);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Clear search when switching tabs so results never look empty by surprise
  const changeTab = (id) => {
    setActiveTab(id);
    setSearchTerm("");
  };

  const renderActiveTabContent = () => {
    const props = { searchTerm, theme };
    switch (activeTab) {
      case "products":
        return <ProductsTab {...props} />;
      case "payments":
        return <PaymentsTab {...props} />;
      case "analytics":
        return <AnalyticsTab {...props} />;
      case "customers":
        return <CustomersTab {...props} />;
      default:
        return <OverviewTab {...props} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full rounded-xl md:rounded-2xl border overflow-hidden shadow-2xl flex flex-col lg:flex-row font-sans relative transition-colors duration-300 ${t.shell}`}
    >
      {/* "Try the demo" overlay; fades away on click, returns when scrolled out of view */}
      <div
        className={`absolute inset-0 z-50 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ease-in-out ${t.overlay} ${isDemoActive
          ? "opacity-0 pointer-events-none scale-[0.98]"
          : "opacity-100 pointer-events-auto scale-100"
          }`}
      >
        <div
          className={`w-full max-w-sm rounded-2xl border p-6 sm:p-8 flex flex-col items-center gap-4 shadow-[0_20px_50px_-12px_rgba(16,24,40,0.25)] transition-transform duration-300 ${t.card}`}
        >
          <div className="space-y-2">
            <h3 className={` font-medium text-2xl ${t.strong}`}>
              Explore a custom CMS
            </h3>
            <p className={`text-base leading-tight ${t.muted}`}>
              Click through products, payments, analytics and customers in a working sample dashboard, built the way we build yours.
            </p>
          </div>
          <Button
            title="Try the demo"
            onClick={() => setIsDemoActive(true)}
          />
        </div>
      </div>

      <DashboardSidebar activeTab={activeTab} setActiveTab={changeTab} theme={theme} />

      <div className={`flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden transition-colors duration-300 ${t.main}`}>
        <DashboardHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          theme={theme}
          setTheme={setTheme}
          setIsDemoActive={setIsDemoActive}
        />

        {/* Scrollable viewport; Lenis is kept out so it scrolls on its own */}
        <main
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-6"
        >
          <div key={activeTab} className="max-w-6xl mx-auto">
            {renderActiveTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
