"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  RiCalendarEventLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiGlobalLine,
  RiCheckLine,
  RiHeart3Fill,
  RiShareForwardLine,
  RiMessage3Line,
  RiSearchLine,
  RiLineChartLine,
  RiPlayFill,
  RiPauseFill,
  RiArrowRightLine
} from "@remixicon/react";

const STEPS = [
  {
    id: "calendar",
    num: "01",
    tabTitle: "Strategy Calendar",
    heading: "Content Strategy & Scheduling",
    desc: "We map out key branding milestones, social posts, articles, and SEO audits on a clear monthly execution calendar.",
    icon: RiCalendarEventLine,
  },
  {
    id: "instagram",
    num: "02",
    tabTitle: "Instagram Campaign",
    heading: "Visual Brand Story & Reels",
    desc: "Publishing visual branding carousels and high-impact Reels designed to build strong audience recall and engagement.",
    icon: RiInstagramLine,
  },
  {
    id: "linkedin",
    num: "03",
    tabTitle: "LinkedIn Authority",
    heading: "Thought Leadership & Articles",
    desc: "Deploying B2B positioning articles and case studies to establish domain authority and industry leadership.",
    icon: RiLinkedinBoxLine,
  },
  {
    id: "seo",
    num: "04",
    tabTitle: "SEO Traffic Growth",
    heading: "Search Visibility & Rank #1",
    desc: "Converting brand awareness into organic search dominance with continuous SEO optimization and traffic growth tracking.",
    icon: RiLineChartLine,
  },
];

const CALENDAR_EVENTS = [
  { day: "04", title: "Strategy & Kickoff", tag: "Branding", color: "bg-[#002bba] text-white" },
  { day: "08", title: "Insta Reel & Story", tag: "Social", color: "bg-[#e1306c] text-white" },
  { day: "14", title: "LinkedIn B2B Article", tag: "Authority", color: "bg-[#0a66c2] text-white" },
  { day: "18", title: "Blog: AI Search & SEO", tag: "SEO", color: "bg-[#10b981] text-white" },
  { day: "24", title: "Analytics & Growth Sync", tag: "Review", color: "bg-[#f59e0b] text-white" },
];

export default function BrandingWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2840);
  const timerRef = useRef(null);
  const screenRef = useRef(null);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Handle step change animation
  useEffect(() => {
    if (!screenRef.current) return;
    gsap.fromTo(
      screenRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" }
    );
  }, [activeStep]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-full  py-16 md:py-28 text_blue relative overflow-hidden border-t border-[#002bba]/10">
      <div className="padding w-full  space-y-12 md:space-y-16">

        {/* ── Heading Section (Matches BrandingWhyUs layout) ── */}
        <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%] items-start">
          <div>
            <h2 data-para-effect className=" capitalize primary-font   text-5xl  leading-none">
              Branding & <br /> Marketing Workflow
            </h2>
          </div>
          <div className="text-xs max-sm:hidden pt-4">
            <p className="">How We</p>
            <p className="">Execute & Grow</p>
          </div>
          <div className="text-3xl md:pl-2">
            <h3 data-para-effect className="leading-tight font-medium">
              <span className="opacity-0 secondary-font max-sm:hidden pointer-events-none">...............</span>
              From strategy calendar planning to multi-channel campaign deployment — watch how we transform brand identity into organic growth.
            </h3>
          </div>
        </div>

        {/* ── Interactive Workflow Container ── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-6">

          {/* Left / Navigation Steps Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Play/Pause Control Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-[#002bba]/15">
              <span className="text-xs font-bold uppercase tracking-widest text-[#002bba]/60">
                Interactive iPhone Demo
              </span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#002bba]/10 hover:bg-[#002bba] hover:text-white transition-colors duration-200"
              >
                {isPlaying ? (
                  <>
                    <RiPauseFill size={14} /> Auto Playing
                  </>
                ) : (
                  <>
                    <RiPlayFill size={14} /> Play Sequence
                  </>
                )}
              </button>
            </div>

            {/* Step Pills */}
            <div className="flex flex-col gap-3 mt-2">
              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlaying(false);
                    }}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-[#002bba] text-white border-[#002bba] shadow-xl shadow-[#002bba]/20 scale-[1.02]"
                        : "bg-white text-[#002bba] border-[#002bba]/15 hover:border-[#002bba]/40 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl center transition-colors ${
                            isActive ? "bg-white/20 text-white" : "bg-[#002bba]/10 text-[#002bba]"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-xs font-mono tracking-wider opacity-75">
                            STEP {step.num}
                          </span>
                          <h4 className="font-bold text-lg leading-tight">{step.tabTitle}</h4>
                        </div>
                      </div>
                      <RiArrowRightLine
                        size={18}
                        className={`transition-transform duration-300 ${
                          isActive ? "translate-x-1 opacity-100" : "opacity-30"
                        }`}
                      />
                    </div>

                    {isActive && (
                      <p className="text-sm mt-3 pt-3 border-t border-white/20 leading-relaxed font-light text-white/90">
                        {step.desc}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium iPhone Hardware Mockup (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center items-center py-4">
            
            {/* iPhone PNG Image Container */}
            <div className="relative w-[23rem]  select-none">
              
              {/* iPhone PNG Image Overlay */}
              <img
                src="/images/expertisePage/branding/iphone_mockup.png"
                alt="iPhone Mockup"
                className="w-full relative  inset-0 z-20 pointer-events-none object-contain drop-shadow-[0_25px_50px_rgba(0,43,186,0.35)]"
              />

              {/* Inner Screen Area inside PNG bezel */}
              <div className="absolute rounded-[3.5rem] w-full h-full inset-0 overflow-hidden z-10 bg-black flex flex-col">

                {/* Status Bar */}
                <div className="w-full h-12 bg-black text-white px-10 flex items-center justify-between text-xs font-semibold relative z-30 pt-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <span className="text-[10px]">5G</span>
                    <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-white rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* Animated Screen Content Area */}
                <div ref={screenRef} className="flex-1 w-full bg-[#0d0f17] text-white overflow-hidden flex flex-col relative">

                  {/* ──────────────── STEP 01: GOOGLE CALENDAR ──────────────── */}
                  {activeStep === 0 && (
                    <div className="w-full h-full flex flex-col bg-[#121522] text-white p-4">
                      {/* Calendar Top Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#002bba] center font-bold text-sm">
                            OCT
                          </div>
                          <div>
                            <h4 className="font-bold text-sm leading-tight">October 2026</h4>
                            <span className="text-[10px] text-white/60">Content & Campaign Map</span>
                          </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                          Active Plan
                        </div>
                      </div>

                      {/* Calendar Week Days Header */}
                      <div className="grid grid-cols-5 gap-1 text-center text-[10px] text-white/50 font-bold my-3">
                        <span>MON</span>
                        <span>TUE</span>
                        <span>WED</span>
                        <span>THU</span>
                        <span>FRI</span>
                      </div>

                      {/* Event Cards List */}
                      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-0.5">
                        {CALENDAR_EVENTS.map((evt, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-xl flex items-center justify-between transition-all duration-300 border border-white/10 ${
                              i === 1 ? "ring-2 ring-[#e1306c] bg-[#1c1829]" : "bg-[#1a1d2e]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-white/10 center font-mono text-sm font-bold text-white">
                                {evt.day}
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white leading-tight">{evt.title}</h5>
                                <span className={`text-[9px] px-2 py-0.5 rounded-full inline-block mt-1 font-semibold ${evt.color}`}>
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
                        <span className="text-[11px] text-white/80">Scheduled Milestones</span>
                        <span className="font-bold text-white font-mono">5 / 5 Done</span>
                      </div>
                    </div>
                  )}

                  {/* ──────────────── STEP 02: INSTAGRAM POST ──────────────── */}
                  {activeStep === 1 && (
                    <div className="w-full h-full flex flex-col bg-[#000000] text-white">
                      {/* Insta Header */}
                      <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                        <span className="font-bold text-base tracking-tight font-sans">Instagram</span>
                        <div className="flex items-center gap-3">
                          <RiHeart3Fill size={20} className="text-rose-500" />
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        </div>
                      </div>

                      {/* Profile Bar */}
                      <div className="px-3 py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                            <div className="w-full h-full rounded-full bg-black center text-[10px] font-bold">
                              ZS
                            </div>
                          </div>
                          <div>
                            <p className="font-bold leading-none text-xs flex items-center gap-1">
                              zerrorstudios
                              <span className="w-3 h-3 rounded-full bg-blue-500 text-white text-[8px] center">✓</span>
                            </p>
                            <p className="text-[10px] text-white/50">Sponsored • Mumbai</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-blue-400">Follow</span>
                      </div>

                      {/* Post Media Graphic */}
                      <div className="w-full aspect-square bg-gradient-to-br from-[#002bba] via-[#103bb8] to-[#001778] relative center p-6 text-center flex-col justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/70">
                          Zerror Brand Identity
                        </span>
                        <h4 className="text-xl font-bold text-white uppercase tracking-tight leading-tight">
                          "Design That Speaks. <br /> Search That Wins."
                        </h4>
                        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[10px] font-semibold text-white">
                          www.zerrorstudios.com
                        </div>
                      </div>

                      {/* Post Action Buttons */}
                      <div className="px-4 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <button onClick={toggleLike} className="transition-transform active:scale-125">
                            <RiHeart3Fill size={22} className={liked ? "text-rose-500" : "text-white/80"} />
                          </button>
                          <RiMessage3Line size={20} className="text-white/80" />
                          <RiShareForwardLine size={20} className="text-white/80" />
                        </div>
                        <span className="text-[10px] text-white/50">2 MINS AGO</span>
                      </div>

                      {/* Post Caption */}
                      <div className="px-4 text-xs space-y-1">
                        <p className="font-bold text-white">{likeCount.toLocaleString()} likes</p>
                        <p className="text-white/80 text-[11px] leading-tight">
                          <strong className="text-white">zerrorstudios</strong> Transforming brand recall into organic market dominance. 🚀
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ──────────────── STEP 03: LINKEDIN POST ──────────────── */}
                  {activeStep === 2 && (
                    <div className="w-full h-full flex flex-col bg-[#1b1f2b] text-white p-3.5 gap-3">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-[#0a66c2] center font-bold text-white text-xs">
                            in
                          </div>
                          <span className="text-xs font-bold">LinkedIn Feed</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                          Promoted
                        </span>
                      </div>

                      {/* Author Card */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#002bba] center text-xs font-bold border border-white/20">
                          ZS
                        </div>
                        <div>
                          <h5 className="text-xs font-bold leading-none">Zerror Studios</h5>
                          <p className="text-[10px] text-white/60 mt-0.5">10,400 followers • 1h</p>
                        </div>
                      </div>

                      {/* Article Text */}
                      <p className="text-xs leading-relaxed text-white/90">
                        Why building identity, content, and search as ONE integrated system outperforms isolated marketing campaigns by +300%.
                      </p>

                      {/* Article Banner Card */}
                      <div className="w-full rounded-xl bg-gradient-to-r from-[#002bba] to-[#0a66c2] p-4 flex flex-col justify-between h-36 border border-white/10">
                        <span className="text-[9px] uppercase font-mono text-white/70">Executive Case Study</span>
                        <h4 className="font-bold text-base text-white leading-snug">
                          The Search & Brand Recall Engine Architecture
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-white/80">
                          <span>zerrorstudios.com</span>
                          <span className="underline font-bold">Read Article →</span>
                        </div>
                      </div>

                      {/* Social Reaction Stats */}
                      <div className="flex items-center justify-between text-[10px] text-white/60 pt-2 border-t border-white/10">
                        <span>👏 👍 482 Reactions</span>
                        <span>94 Comments • 38 Shares</span>
                      </div>
                    </div>
                  )}

                  {/* ──────────────── STEP 04: SEO TRAFFIC GROWTH ──────────────── */}
                  {activeStep === 3 && (
                    <div className="w-full h-full flex flex-col bg-[#0f172a] text-white p-4 gap-3">
                      {/* Search Header */}
                      <div className="w-full p-2.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-2">
                        <RiSearchLine size={16} className="text-emerald-400" />
                        <span className="text-xs font-mono text-white/90 truncate">
                          "best branding & web agency"
                        </span>
                      </div>

                      {/* Search Result Card #1 */}
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            #1 ORGANIC RANK
                          </span>
                          <span className="text-[9px] text-white/50">www.zerrorstudios.com</span>
                        </div>
                        <h5 className="text-xs font-bold text-white">
                          Zerror Studios — Found First. Remembered Longer.
                        </h5>
                        <p className="text-[10px] text-white/70 leading-tight">
                          Identity, content, and AI search optimization built as one high-performing system.
                        </p>
                      </div>

                      {/* Analytics Traffic Chart Card */}
                      <div className="flex-1 rounded-xl bg-[#1e293b] p-3.5 flex flex-col justify-between border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-white/60 uppercase font-mono">Organic Traffic Lift</span>
                            <h4 className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                              +340% <RiLineChartLine size={18} />
                            </h4>
                          </div>
                          <div className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                            Monthly Surge
                          </div>
                        </div>

                        {/* Simulated Graph Lines */}
                        <div className="w-full h-20 flex items-end gap-1.5 pt-2">
                          {[25, 32, 40, 38, 55, 68, 82, 95, 100].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                              <div
                                className="w-full rounded-t bg-gradient-to-t from-[#002bba] to-emerald-400 transition-all duration-500"
                                style={{ height: `${h}%` }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between text-[9px] text-white/40 font-mono pt-1">
                          <span>W1</span>
                          <span>W2</span>
                          <span>W3</span>
                          <span>W4</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* iPhone Bottom Home Indicator Bar */}
                <div className="w-full h-5 bg-black center">
                  <div className="w-32 h-1 bg-white/40 rounded-full" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
