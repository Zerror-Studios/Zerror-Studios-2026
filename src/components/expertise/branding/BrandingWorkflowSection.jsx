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

export default function BrandingWorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2840);
  const containerRef = useRef(null);
  const screenRef = useRef(null);

  // GSAP ScrollTrigger for 400vh container
  useGSAP(() => {
    if (!containerRef.current) return;

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

    return () => {
      trigger.kill();
    };
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
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const containerHeight = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / (STEPS.length - 1 || 1)) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <div data-hide-header className="w-full py-8 md:py-16 text_blue relative border-b">
      <div className="padding w-full space-y-12 md:space-y-16">

        {/* ── Heading Section (Matches BrandingWhyUs layout) ── */}
        <div className="w-full space-y-12 md:space-y-0 md:grid grid-cols-[28%_30%_42%] items-start">
          <div>
            <h2 data-para-effect className="capitalize primary-font text-5xl leading-none">
              Workflow
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

        {/* ── Scroll-based Interactive Workflow Container (400vh Track) ── */}
        <div ref={containerRef} className="w-full h-[400vh] relative">
          <div className="w-full h-screen sticky top-0 flex items-center justify-center py-4 overflow-hidden">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center">

              {/* Navigation Steps Column */}
              <div className="flex flex-col gap-2.5 sm:gap-3 pr-20">
                {STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      className={`cursor-pointer rounded-xl p-4 sm:p-5 border transition-all duration-300 relative overflow-hidden ${isActive
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
                            <h4 className="font-bold text-base sm:text-3xl leading-tight">{step.tabTitle}</h4>
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
              <div className="flex justify-center items-center">

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


