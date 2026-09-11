"use client";
import React from "react";
import {
  DashboardIcon,
  ProductsIcon,
  CustomersIcon,
  PaymentsIcon,
  AnalyticsIcon,
  SettingsIcon
} from "./ui/SvgAnimatedIcons";

const navTabs = [
  { id: "overview", label: "Dashboard", icon: DashboardIcon },
  { id: "products", label: "Products", icon: ProductsIcon },
  { id: "payments", label: "Transaction", icon: PaymentsIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "customers", label: "Customers", icon: CustomersIcon },
];

export default function DashboardSidebar({ activeTab, setActiveTab, theme }) {
  const isDark = theme === "dark";

  return (
    <aside
      className={`w-full lg:w-60 flex flex-col justify-between p-4 shrink-0 transition-colors duration-300 font-sans ${
        isDark
          ? "bg-[#0D121F] border-b lg:border-b-0 lg:border-r border-white/10 text-white"
          : "bg-white border-b lg:border-b-0 lg:border-r border-gray-200/80 text-gray-800"
      }`}
    >
      <div>
        {/* User Profile / Header */}
        <div className="flex items-center gap-2.5 px-3 py-3 mb-6">
          <div className={`flex items-center gap-2.5 ${isDark ? "border-white/10" : "border-gray-200"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              KM
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <h4 className={`text-xs font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Kenneth Mendoza</h4>
              <span className="text-[10px] text-gray-400 font-medium">Sales manager</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="space-y-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? "bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30"
                      : "bg-blue-50 text-blue-600 font-bold shadow-sm"
                    : isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (isDark ? "text-blue-400" : "text-blue-600") : "text-gray-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Premium Plan Card */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-rose-500 via-purple-600 to-blue-600 text-white shadow-lg relative overflow-hidden">
        <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
          <span className="text-xs font-bold">👑</span>
        </div>
        <h4 className="text-xs font-bold mb-1">Premium plan</h4>
        <p className="text-[11px] text-white/80 leading-snug mb-3">
          Get access to advanced SalesRadar features
        </p>
        <button className="w-full py-1.5 rounded-xl bg-white text-blue-600 text-xs font-bold hover:bg-gray-50 transition-colors shadow-md">
          Upgrade now!
        </button>
      </div>
    </aside>
  );
}
