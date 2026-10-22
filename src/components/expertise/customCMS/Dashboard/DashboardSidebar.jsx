"use client";
import React from "react";
import {
  DashboardIcon,
  ProductsIcon,
  CustomersIcon,
  PaymentsIcon,
  AnalyticsIcon,
} from "./ui/SvgAnimatedIcons";
import { getTokens } from "./ui/tokens";

export const navTabs = [
  { id: "overview", label: "Overview", icon: DashboardIcon },
  { id: "products", label: "Products", icon: ProductsIcon },
  { id: "payments", label: "Payments", icon: PaymentsIcon },
  { id: "analytics", label: "Analytics", icon: AnalyticsIcon },
  { id: "customers", label: "Customers", icon: CustomersIcon },
];

// Vertical sidebar from lg up; a scrollable tab bar on smaller screens
export default function DashboardSidebar({ activeTab, setActiveTab, theme }) {
  const t = getTokens(theme === "dark");

  return (
    <aside className={`w-full lg:w-56 shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r transition-colors duration-300 ${t.sidebar}`}>
      {/* Store */}
      <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-3 lg:px-5 lg:pt-5 lg:pb-6">
        <div className="w-8 h-8 rounded-lg bg-[#002bba] text-white font-semibold text-[11px] flex items-center justify-center shrink-0">
          YS
        </div>
        <div className="leading-tight min-w-0">
          <h4 className={`text-[13px] font-semibold truncate ${t.strong}`}>Your store</h4>
          <span className={`text-[11px] ${t.muted}`}>Admin</span>
        </div>
      </div>

      <p className={`hidden lg:block px-5 pb-2 text-[10px] font-medium uppercase tracking-wider ${t.subtle}`}>Menu</p>

      <nav
        data-lenis-prevent="true"
        className="flex lg:flex-col gap-1 px-3 pb-3 lg:pb-0 overflow-x-auto scroller_none"
      >
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] font-medium transition-colors duration-200 ${isActive ? t.navActive : t.navIdle}`}
            >
              {isActive && <span className="hidden lg:block absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#002bba]" />}
              <Icon className={`w-4 h-4 ${isActive ? t.navIcon : t.subtle}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Plan footer, desktop only */}
      <div className={`hidden lg:block mt-auto m-3 p-3 rounded-lg border ${t.border} ${t.soft}`}>
        <p className={`text-[11.5px] font-semibold ${t.strong}`}>Built for your team</p>
        <p className={`text-[11px] mt-0.5 leading-snug ${t.muted}`}>Every screen here is shaped around how you work.</p>
      </div>
    </aside>
  );
}
