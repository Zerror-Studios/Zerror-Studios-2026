"use client";
import React from "react";
import { SearchIcon, NotificationIcon, SunIcon, MoonIcon } from "./ui/SvgAnimatedIcons";
import { getTokens } from "./ui/tokens";
import { navTabs } from "./DashboardSidebar";

export default function DashboardHeader({ searchTerm, setSearchTerm, activeTab, theme, setTheme, setIsDemoActive }) {
  const isDark = theme === "dark";
  const t = getTokens(isDark);
  const title = navTabs.find((n) => n.id === activeTab)?.label || "Overview";

  return (
    <header className={`h-14 md:h-16 px-4 md:px-6 border-b flex items-center gap-3 md:gap-4 shrink-0 backdrop-blur transition-colors duration-300 ${t.header}`}>
      <div className={`hidden md:block text-[15px] font-semibold shrink-0 ${t.strong}`}>{title}</div>

      {/* Search */}
      <div className="relative flex-1 md:max-w-xs md:ml-auto">
        <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${t.subtle}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search…"
          aria-label="Search"
          className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border transition-colors focus:outline-none ${t.input}`}
        />
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`p-2 rounded-lg transition-colors ${t.iconBtn}`}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>

        <button className={`relative p-2 rounded-lg transition-colors max-sm:hidden ${t.iconBtn}`} aria-label="Notifications">
          <NotificationIcon className="w-4 h-4" />
          <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#002bba] ring-2 ${isDark ? "ring-[#0F131B]" : "ring-white"}`} />
        </button>

        {setIsDemoActive && (
          <button
            onClick={() => setIsDemoActive(false)}
            className={`flex items-center gap-1.5 px-2.5 md:px-3 py-2 rounded-lg text-xs font-medium transition-colors ${t.btnSecondary}`}
            aria-label="Close demo"
          >
            <span className="text-[11px] leading-none">✕</span>
            <span className="hidden sm:inline">Close demo</span>
          </button>
        )}
      </div>
    </header>
  );
}
