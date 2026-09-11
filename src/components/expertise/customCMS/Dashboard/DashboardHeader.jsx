"use client";
import React from "react";
import { SearchIcon, NotificationIcon, SunIcon, MoonIcon } from "./ui/SvgAnimatedIcons";

export default function DashboardHeader({ searchTerm, setSearchTerm, theme, setTheme, setIsDemoActive }) {
  const isDark = theme === "dark";

  return (
    <header
      className={`h-16 px-4 md:px-6 border-b flex items-center justify-between gap-4 shrink-0 transition-colors duration-300 font-sans ${isDark ? "bg-[#0B0F19] border-white/10 text-white" : "bg-white border-gray-200/80 text-gray-900"
        }`}
    >
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products, documents..."
          className={`w-full pl-4 pr-10 py-2 text-xs rounded-full transition-all focus:outline-none ${isDark
              ? "bg-white/5 border border-white/10 text-gray-200 placeholder-gray-400 focus:bg-white/10 focus:border-blue-500"
              : "bg-gray-100/80 border border-transparent text-gray-800 placeholder-gray-400 focus:bg-white focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            }`}
        />
        <SearchIcon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-2">
        {/* Sun / Moon Theme Toggle Button */}
        <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`p-2 rounded-full transition-all duration-200 ${isDark
              ? "bg-white/10 hover:bg-white/20 text-amber-400 border border-white/15"
              : "bg-gray-100 hover:bg-gray-200/80 text-indigo-600 border border-gray-200/60"
            }`}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button
          className={`relative p-2 rounded-full transition-colors ${isDark
              ? "bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10"
              : "bg-gray-100/80 hover:bg-gray-200/60 text-gray-600"
            }`}
        >
          <NotificationIcon className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
        </button>
        {setIsDemoActive && (
          <button
            onClick={() => setIsDemoActive(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${isDark
                ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                : "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200"
              }`}
            title="Close Demo"
          >
            <span className="text-[11px] font-black">✕</span>
            <span className="hidden sm:inline">Close Demo</span>
          </button>
        )}
      </div>
    </header>
  );
}
