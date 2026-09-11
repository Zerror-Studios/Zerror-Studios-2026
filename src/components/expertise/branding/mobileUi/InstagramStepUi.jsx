"use client";

import React, { useState } from "react";
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiMessage3Line,
  RiSearchLine,
  RiAddBoxLine,
  RiSendPlaneLine,
  RiMoreFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiHome5Fill,
  RiMovieLine
} from "@remixicon/react";

export default function InstagramStepUi({ liked, likeCount, toggleLike }) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-y-auto no-scrollbar relative">
      {/* 1. Top Instagram App Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between border-b border-white/10 sticky top-0 bg-black/90 backdrop-blur-md z-30">
        <span className="font-serif   text-lg tracking-tight text-white select-none">
          Instagram
        </span>
        <div className="flex items-center gap-3 text-white/90">
          <button className="hover:opacity-80 transition-opacity">
            <RiAddBoxLine size={18} />
          </button>
          <button className="hover:opacity-80 transition-opacity relative">
            <RiHeart3Line size={18} />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-rose-500 rounded-full" />
          </button>
          <button className="hover:opacity-80 transition-opacity">
            <RiSendPlaneLine size={18} />
          </button>
        </div>
      </div>

      {/* 2. Stories Bar */}
      <div className="py-2 px-2 flex items-center gap-2.5 border-b border-white/10 overflow-x-auto no-scrollbar bg-black shrink-0">
        {/* Your Story */}
        <div className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className="relative w-11 h-11 rounded-full p-[1.5px] border border-white/20">
            <div className="w-full h-full rounded-full bg-[#002bba] center text-[10px]     text-white">
              ZS
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-blue-500 text-white center text-[9px]     border border-black">
              +
            </div>
          </div>
          <span className="text-[8px] text-white/70 truncate w-12 text-center">Your Story</span>
        </div>

        {/* Story 1 */}
        <div className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-black p-0.5">
              <div className="w-full h-full rounded-full bg-emerald-600 center text-[9px]     text-white">
                AZ
              </div>
            </div>
          </div>
          <span className="text-[8px] text-white/70 truncate w-12 text-center">alex_z</span>
        </div>

        {/* Story 2 */}
        <div className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-black p-0.5">
              <div className="w-full h-full rounded-full bg-purple-600 center text-[9px]     text-white">
                KD
              </div>
            </div>
          </div>
          <span className="text-[8px] text-white/70 truncate w-12 text-center">kenzoere</span>
        </div>

        {/* Story 3 */}
        <div className="flex flex-col items-center gap-1 min-w-[48px]">
          <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-black p-0.5">
              <div className="w-full h-full rounded-full bg-rose-600 center text-[9px]     text-white">
                LF
              </div>
            </div>
          </div>
          <span className="text-[8px] text-white/70 truncate w-12 text-center">lofi9232</span>
        </div>
      </div>

      {/* 3. Feed Post Header */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
            <div className="w-full h-full rounded-full bg-black p-0.5">
              <div className="w-full h-full rounded-full bg-[#002bba] center text-[8px]     text-white">
                ZS
              </div>
            </div>
          </div>
          <div>
            <p className="    leading-none text-xs flex items-center gap-1">
              zerrorstudios
              <span className="w-3 h-3 rounded-full bg-blue-500 text-white text-[7px] center    ">✓</span>
            </p>
            <p className="text-[9px] text-white/50 mt-0.5">Sponsored • Mumbai, India</p>
          </div>
        </div>
        <button className="text-white/70 hover:text-white">
          <RiMoreFill size={16} />
        </button>
      </div>

      {/* 4. Post Media Creative Graphic */}
      <div className="w-full aspect-square bg-gradient-to-br from-[#002bba] via-[#0b31a5] to-[#00105c] relative center p-4 text-center flex-col justify-between overflow-hidden">
        <div className="w-full flex justify-between items-center text-[8px] uppercase font-mono tracking-widest text-white/70 z-10">
          <span>Zerror Studios</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-xs">Brand Engine</span>
        </div>

        <div className="my-auto z-10 py-1">
          <h4 className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug drop-shadow-md">
            "Design That Speaks. <br /> Search That Wins."
          </h4>
          <p className="text-[9px] text-white/80 mt-1 font-light max-w-[180px] mx-auto leading-tight">
            Transforming visual recall into market authority.
          </p>
        </div>

        <div className="w-full z-10 flex items-center justify-between">
          <div className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[8px]   text-white border border-white/20">
            zerrorstudios.com
          </div>
          <span className="text-[8px] font-mono text-emerald-400     bg-emerald-500/20 px-2 py-0.5 rounded">
            +340% ROAS
          </span>
        </div>
      </div>

      {/* 5. Post Actions Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={toggleLike} className="transition-transform active:scale-125">
            {liked ? (
              <RiHeart3Fill size={18} className="text-rose-500" />
            ) : (
              <RiHeart3Line size={18} className="text-white/90 hover:text-white" />
            )}
          </button>
          <button className="hover:opacity-80">
            <RiMessage3Line size={18} className="text-white/90" />
          </button>
          <button className="hover:opacity-80">
            <RiSendPlaneLine size={18} className="text-white/90" />
          </button>
        </div>
        <button onClick={() => setBookmarked(!bookmarked)} className="hover:opacity-80">
          {bookmarked ? (
            <RiBookmarkFill size={18} className="text-white" />
          ) : (
            <RiBookmarkLine size={18} className="text-white/90" />
          )}
        </button>
      </div>

      {/* 6. Post Caption & Likes Info */}
      <div className="px-3 text-xs space-y-1 pb-2">
        <div className="flex items-center gap-1.5 text-white text-[10px]">
          <div className="flex -space-x-1">
            <div className="w-3.5 h-3.5 rounded-full bg-purple-500 border border-black center text-[6px]    ">K</div>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-black center text-[6px]    ">A</div>
          </div>
          <span>Liked by <strong className="  text-white">kenzoere</strong> and <strong className="  text-white">{likeCount.toLocaleString()} others</strong></span>
        </div>
        <p className="text-white/90 text-[10px] leading-tight">
          <strong className="text-white   mr-1">zerrorstudios</strong>
          Building brand positioning that commands category ownership. 🚀 #Branding #SEO
        </p>
        <p className="text-[8px] text-white/40 font-mono">2 MINUTES AGO</p>
      </div>

      {/* 7. Bottom Navigation Bar */}
      <div className="mt-auto border-t border-white/10 px-5 py-1.5 flex items-center justify-between bg-black sticky bottom-0 z-30 text-white">
        <RiHome5Fill size={18} className="text-white" />
        <RiSearchLine size={18} className="text-white/60 hover:text-white" />
        <RiMovieLine size={18} className="text-white/60 hover:text-white" />
        <RiHeart3Line size={18} className="text-white/60 hover:text-white" />
        <div className="w-4 h-4 rounded-full bg-[#002bba] border border-white center text-[7px]     text-white">
          ZS
        </div>
      </div>
    </div>
  );
}
