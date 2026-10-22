"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {
  RiCalendarEventLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiLineChartLine,
  RiBatteryFill
} from "@remixicon/react";

import CalendarStepUi from "./mobileUi/CalendarStepUi";
import InstagramStepUi from "./mobileUi/InstagramStepUi";
import LinkedInStepUi from "./mobileUi/LinkedInStepUi";
import SeoStepUi from "./mobileUi/SeoStepUi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    id: "calendar",
    num: "01",
    tabTitle: "Plan",
    heading: "Plan",
    desc: "We map out the month's posts, campaigns and key dates in one shared calendar, and you approve it before anything goes live.",
    icon: RiCalendarEventLine,
  },
  {
    id: "instagram",
    num: "02",
    tabTitle: "Instagram",
    heading: "Instagram",
    desc: "Carousels and Reels designed in-house, in your voice, and posted on the days we agreed.",
    icon: RiInstagramLine,
  },
  {
    id: "linkedin",
    num: "03",
    tabTitle: "LinkedIn",
    heading: "LinkedIn",
    desc: "Thought-leadership posts for the founder and updates for the company page, written to sound like you.",
    icon: RiLinkedinBoxLine,
  },
  {
    id: "seo",
    num: "04",
    tabTitle: "Search and report",
    heading: "Search and report",
    desc: "Ongoing SEO on your site, then a short monthly report on what moved, what didn't, and what comes next.",
    icon: RiLineChartLine,
  },
];

export default function BrandingWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2840);
  const containerRef = useRef(null);
  const screenRef = useRef(null);

  // GSAP ScrollTrigger for 400vh container (Desktop only)
  useGSAP(() => {
    if (!containerRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const stepIndex = Math.min(
            STEPS.length - 1,
            Math.floor(progress * STEPS.length)
          );
          setActiveStep((prev) => (prev !== stepIndex ? stepIndex : prev));
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Handle step content change animation inside phone
  useEffect(() => {
    if (!screenRef.current) return;
    gsap.fromTo(
      screenRef.current,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeStep]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleStepClick = (idx) => {
    if (window.innerWidth < 768) {
      setActiveStep(prev => prev === idx ? null : idx);
    } else {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const containerHeight = container.offsetHeight - window.innerHeight;
      const targetScroll = containerTop + (idx / (STEPS.length - 1 || 1)) * containerHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div data-hide-header className="w-full pt-8 md:pt-16 text_blue relative ">
      <div className="padding w-full space-y-12 md:space-y-16">

        {/* ── Heading Section (Matches BrandingWhyUs layout) ── */}
        <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
          <div className="">
            <h2 data-para-effect className="primary-font text-5xl leading-none">How a <br /> month runs</h2>
          </div>
          <div className="text-xs max-sm:hidden pt-4">
            <p className="font-thin">Plan, post,</p>
            <p className="font-thin">measure, repeat.</p>
          </div>
          <div className="text-3xl md:pl-2">
            <h3 data-para-effect className="secondary-font">
              <span className="opacity-0 max-sm:hidden pointer-events-none">...............</span>
              One calendar, four steps, and a report at the end of every month.
            </h3>
          </div>
        </div>

        {/* ── Scroll-based Interactive Workflow Container (400vh Track on Desktop) ── */}
        <div ref={containerRef} className="w-full md:h-[400vh] relative">
          <div className="w-full md:h-screen md:sticky top-0 flex items-center justify-center md:py-4 overflow-hidden">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center">

              {/* Navigation Steps Column */}
              <div className="flex flex-col gap-2.5 sm:gap-3 md:pr-20">
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      className={`cursor-pointer rounded-xl p-3 sm:p-5 border transition-all duration-300 relative overflow-hidden ${isActive
                        ? "bg-[#002bba] text-white border-[#002bba]"
                        : "bg-white text-[#002bba] border-[#002bba]/15 hover:border-[#002bba]/40 hover:bg-white/80"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-md center transition-colors ${isActive ? "bg-white/20 text-white" : "bg-[#002bba]/10 text-[#002bba]"
                              }`}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg sm:text-3xl leading-tight">{step.tabTitle}</h4>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows,opacity,margin,padding] duration-500 ease-in-out ${isActive
                          ? "grid-rows-[1fr] opacity-100 mt-2.5 sm:mt-5 pt-2.5 sm:pt-5 border-t border-white/20"
                          : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t border-transparent pointer-events-none"
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-base sm:text-xl font-light leading-relaxed text-white/90">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Custom Mobile Hardware Frame */}
              <div className="hidden md:flex justify-center items-center">

                {/* Mobile Device Mockup Container */}
                <div className="relative h-[65vh] sm:h-[80vh] lg:h-[90vh] max-h-[760px] aspect-[9/18] select-none rounded-[3rem] p-2 bg-gradient-to-b from-[#1c2030] via-[#0f121d] to-black flex flex-col justify-between shrink-0">

                  {/* Top Notch / Dynamic Island at Center */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 border border-white/10 flex items-center justify-between px-3 shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
                    <div className="w-2 h-2 rounded-full bg-[#002bba] animate-pulse" />
                  </div>

                  {/* Inner Screen Viewport inside Custom Bezels */}
                  <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-black flex flex-col relative border border-white/10">

                    {/* Status Bar */}
                    <div className="w-full h-11 bg-black text-white px-7 flex items-center justify-between text-xs font-semibold relative z-30 pt-1">
                      <span className="text-[11px] font-mono tracking-tight text-white/90">9:41</span>
                      <div className="flex items-center gap-1.5 text-white/80">
                        <span className="text-[9px] font-mono font-bold">5G</span>
                        <RiBatteryFill className="size-4" />
                      </div>
                    </div>

                    {/* Animated Screen Content Area */}
                    <div ref={screenRef} className="flex-1 w-full bg-[#0d0f17] text-white overflow-hidden flex flex-col relative">
                      {activeStep === 0 && <CalendarStepUi />}
                      {activeStep === 1 && (
                        <InstagramStepUi
                          liked={liked}
                          likeCount={likeCount}
                          toggleLike={toggleLike}
                        />
                      )}
                      {activeStep === 2 && <LinkedInStepUi />}
                      {activeStep === 3 && <SeoStepUi />}
                    </div>

                    {/* iPhone Bottom Home Indicator Bar */}
                    <div className="w-full h-4 bg-black flex items-center justify-center relative z-30">
                      <div className="w-28 h-1 bg-white/40 rounded-full" />
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


