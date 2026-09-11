"use client";

import React, { useState } from "react";
import {
  RiSearchLine,
  RiMessage3Fill,
  RiMoreFill,
  RiGlobeLine,
  RiThumbUpLine,
  RiRepeatLine,
  RiSendPlaneLine,
  RiHome4Fill,
  RiTeamLine,
  RiAddBoxLine,
  RiNotification3Line,
  RiBriefcase4Line
} from "@remixicon/react";

export default function LinkedInStepUi() {
  const [linkedInLiked, setLinkedInLiked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-[#1b1f2b] text-white overflow-hidden relative">
      {/* 1. LinkedIn Top Search / Navigation Header */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/10 sticky top-0 bg-[#1b1f2b]/95 backdrop-blur-md z-30 gap-2">
        <div className="w-7 h-7 rounded-full bg-[#002bba] border border-white/20 center text-[8px]   text-white shrink-0">
          ZS
        </div>
        
        <div className="flex-1 bg-white/10 rounded-md px-2.5 py-1 flex items-center gap-2 border border-white/10">
          <RiSearchLine size={13} className="text-white/60" />
          <span className="text-[10px] text-white/60 font-sans truncate">Search</span>
        </div>

        <button className="text-white/80 hover:text-white shrink-0">
          <RiMessage3Fill size={17} />
        </button>
      </div>

      {/* 2. Feed Post Social Proof Banner Header */}
      <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/5 text-[9px] text-white/60">
        <div className="flex items-center gap-1.5 truncate">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 center text-[6px]   text-white">AW</div>
          <span className="truncate"><strong className="text-white/80  ">Abram Workman</strong> loves this</span>
        </div>
        <button className="text-white/40 hover:text-white">
          <RiMoreFill size={15} />
        </button>
      </div>

      {/* 3. Author Profile Bar */}
      <div className="px-3 py-2 w-full flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-[#002bba] center text-[9px]   text-white border border-white/20 shrink-0">
            ZS
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h5 className="text-xs   text-white leading-none">Zerror Studios</h5>
              <span className="text-[9px] text-white/50">• 1st</span>
            </div>
            <p className="text-[9px] text-white/60 leading-tight mt-0.5 line-clamp-1">
              Brand Identity & Organic Search Engine
            </p>
            <div className="flex items-center gap-1 text-[8px] text-white/40 mt-0.5 font-mono">
              <span>2h</span>
              <span>•</span>
              <RiGlobeLine size={10} />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-0.5 text-blue-400   text-[10px] hover:text-blue-300 transition-colors shrink-0 pt-0.5">
          <span className="text-xs">+</span> Follow
        </button>
      </div>

      {/* 4. Article Post Caption */}
      <div className="px-3 text-xs space-y-1">
        <p className="text-[10px] sm:text-[11px] leading-relaxed text-white/90">
          Why building identity, content, and search as ONE integrated system outperforms isolated marketing campaigns by +300%. <span className="text-white/50 cursor-pointer hover:underline  ">... see more</span>
        </p>
      </div>

      {/* 5. Executive Article Banner Card */}
      <div className="mt-2 w-full bg-gradient-to-r from-[#002bba] to-[#0a66c2] p-3 flex flex-col justify-between border-y aspect-square border-white/10 relative overflow-hidden shrink-0">
        <div className="flex justify-between items-center text-[8px] uppercase font-mono text-white/70 z-10">
          <span>Executive Case Study</span>
          <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs">zerrorstudios.com</span>
        </div>

        <div className="z-10 py-1">
          <h4 className="  text-xs sm:text-sm text-white leading-snug">
            The Search & Brand Recall Engine Architecture
          </h4>
          <p className="text-[9px] text-white/80 mt-0.5 font-light">
            Scale brand authority through integrated SEO & design.
          </p>
        </div>

        <div className="flex items-center justify-between text-[8px] text-white/80 z-10 font-mono">
          <span>ARTICLE • 4 MIN READ</span>
          <span className="underline   text-white">Read Article →</span>
        </div>
      </div>

      {/* 6. Social Reactions Count Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between text-[9px] text-white/60 border-b border-white/10">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="w-3.5 h-3.5 rounded-full bg-blue-600 center text-[7px] text-white">👍</span>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 center text-[7px] text-white">👏</span>
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 center text-[7px] text-white">💡</span>
          </div>
          <span className="text-white/70   pl-1">482</span>
        </div>
        <span>94 comments • 38 reposts</span>
      </div>

      {/* 7. Post Action Bar (Like, Comment, Repost, Send) */}
      <div className="px-2 py-1 grid grid-cols-4 border-b border-white/10 text-white/70 text-[9px]">
        <button 
          onClick={() => setLinkedInLiked(!linkedInLiked)} 
          className={`flex items-center justify-center gap-1 py-1 hover:bg-white/5 rounded transition-colors ${linkedInLiked ? "text-blue-400  " : ""}`}
        >
          <RiThumbUpLine size={13} />
          <span>Like</span>
        </button>

        <button className="flex items-center justify-center gap-1 py-1 hover:bg-white/5 rounded transition-colors">
          <RiMessage3Fill size={13} />
          <span>Comment</span>
        </button>

        <button className="flex items-center justify-center gap-1 py-1 hover:bg-white/5 rounded transition-colors">
          <RiRepeatLine size={13} />
          <span>Repost</span>
        </button>

        <button className="flex items-center justify-center gap-1 py-1 hover:bg-white/5 rounded transition-colors">
          <RiSendPlaneLine size={13} />
          <span>Send</span>
        </button>
      </div>

      {/* 8. Second Post Preview (Divider) */}
      <div className="p-2.5 bg-white/5 space-y-1 opacity-60">
        <div className="flex items-center justify-between text-[8px] text-white/60">
          <span>Alfonso Baptista • Following</span>
          <span>16h • 🌐</span>
        </div>
        <p className="text-[9px] text-white/80">
          This is something I have been saying for months: LLMs are extremely insensitive...
        </p>
      </div>

      {/* 9. Bottom LinkedIn Navigation Bar */}
      <div className="mt-auto border-t border-white/10 px-2 py-1.5 grid grid-cols-5 bg-[#1b1f2b] sticky bottom-0 z-30 text-white/60 text-[8px] text-center">
        <div className="flex flex-col items-center gap-0.5 text-white   cursor-pointer">
          <RiHome4Fill size={15} />
          <span>Home</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer">
          <RiTeamLine size={15} />
          <span>My Network</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer">
          <RiAddBoxLine size={15} />
          <span>Post</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer">
          <RiNotification3Line size={15} />
          <span>Notifications</span>
        </div>

        <div className="flex flex-col items-center gap-0.5 hover:text-white cursor-pointer">
          <RiBriefcase4Line size={15} />
          <span>Jobs</span>
        </div>
      </div>
    </div>
  );
}
