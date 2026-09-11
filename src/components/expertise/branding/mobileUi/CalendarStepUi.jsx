"use client";

import React from "react";
import { RiCheckLine } from "@remixicon/react";

const CALENDAR_EVENTS = [
  { day: "04", title: "Strategy & Kickoff", tag: "Branding", color: "bg-[#002bba] text-white" },
  { day: "08", title: "Insta Reel & Story", tag: "Social", color: "bg-[#e1306c] text-white" },
  { day: "14", title: "LinkedIn B2B Article", tag: "Authority", color: "bg-[#0a66c2] text-white" },
  { day: "18", title: "Blog: AI Search & SEO", tag: "SEO", color: "bg-[#10b981] text-white" },
  { day: "24", title: "Analytics & Growth Sync", tag: "Review", color: "bg-[#f59e0b] text-white" },
];

export default function CalendarStepUi() {
  return (
    <div className="w-full h-full flex flex-col bg-[#121522] text-white p-3.5 sm:p-4">
      {/* Calendar Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#002bba] center font-bold text-xs sm:text-sm">
            OCT
          </div>
          <div>
            <h4 className=" text-xs sm:text-sm leading-tight">October 2026</h4>
            <span className="text-[10px] text-white/60">Content & Campaign Map</span>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
          Active Plan
        </div>
      </div>

      {/* Calendar Week Days Header */}
      <div className="grid grid-cols-5 gap-1 text-center text-[10px] text-white/50  my-3">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
      </div>

      {/* Event Cards List */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto px-2">
        {CALENDAR_EVENTS.map((evt, i) => (
          <div
            key={i}
            className={`p-2.5 sm:p-3 rounded-xl flex items-center justify-between transition-all duration-300 border border-white/10 ${
              i === 1 ? "ring-2 ring-[#e1306c] bg-[#1c1829]" : "bg-[#1a1d2e]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 center font-mono text-xs sm:text-sm  text-white">
                {evt.day}
              </div>
              <div>
                <h5 className="text-[11px] sm:text-xs  text-white leading-tight">{evt.title}</h5>
                <span className={`text-[9px] px-2 py-0.5 rounded-full inline-block mt-1  ${evt.color}`}>
                  {evt.tag}
                </span>
              </div>
            </div>
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 center">
              <RiCheckLine size={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Badge */}
      <div className="mt-2 p-2.5 rounded-xl bg-[#002bba]/20 border border-[#002bba]/40 flex items-center justify-between text-xs">
        <span className="text-[10px] sm:text-[11px] text-white/80">Scheduled Milestones</span>
        <span className="font-bold text-white font-mono">5 / 5 Done</span>
      </div>
    </div>
  );
}
