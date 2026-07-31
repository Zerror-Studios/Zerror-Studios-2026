'use client';
import { RiArrowDownSLine, RiMenuLine } from '@remixicon/react';
import React, { useState, useRef } from 'react';

const slidesData = [
  { id: 'slide-01', num: '01', title: 'Business Deck' },
  { id: 'slide-02', num: '02', title: 'The Solution' },
  { id: 'slide-03', num: '03', title: 'Our Belief' },
  { id: 'slide-04', num: '04', title: 'Zerror' },
  { id: 'slide-05', num: '05', title: 'Our Audience' },
  { id: 'slide-06', num: '06', title: 'Our Services' },
  { id: 'slide-07', num: '07', title: 'Our Clients' },
  {
    id: 'slide-08',
    num: '08',
    title: 'Case Studies',
    subItems: [
      { id: 'slide-09', title: 'RPSG Media' },
      { id: 'slide-11', title: 'Manifest' },
      { id: 'slide-13', title: 'Salman Khan Films' },
      { id: 'slide-15', title: 'Deveshe Dreams' },
    ]
  },
  { id: 'slide-17', num: '09', title: 'Synthesis' },
  { id: 'slide-18', num: '10', title: 'Lets Build Together' },
];

const PaginationSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 500);
  };

  const scrollToSlide = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        className={`w-10 h-10 top-3 left-3 flex items-center justify-center bg-white fixed z-1000 shrink-0 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "opacity-0" : "opacity-100"}`}
      >
        <RiMenuLine size={16} />
      </div>
      <div className={`w-full fixed h-screen inset-0 z-10 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "backdrop-blur-md" : "backdrop-blur-none"}`}>
        <div
          className={`h-screen fixed pointer-events-auto bg-black/20 backdrop-blur-xs text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shrink-0 overflow-hidden z-50 ${isExpanded ? 'w-64' : 'w-0'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div data-lenis-prevent className="flex-1 overflow-y-auto scroller_none py-4">
            {slidesData.map((slide) => {
              if (slide.subItems) {
                return (
                  <div key={slide.id} className="flex flex-col">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToSlide(slide.id);
                        setIsCaseStudiesOpen(!isCaseStudiesOpen);
                      }}
                      className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap overflow-hidden group"
                    >
                      <div className="flex items-center">
                        <div className="text-xs w-8 shrink-0 group-hover:text-white transition-colors">{slide.num}</div>
                        <div className={`text-sm font-medium uppercase transition-all duration-500 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                          {slide.title}
                        </div>
                      </div>
                      <div className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCaseStudiesOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <RiArrowDownSLine size={16} />
                      </div>
                    </div>

                    {/* Dropdown Items with Smooth Height & Opacity Animation */}
                    <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/5 overflow-hidden ${isCaseStudiesOpen ? 'grid-rows-[1fr] opacity-100 py-1' : 'grid-rows-[0fr] opacity-0 py-0'}`}>
                      <div className="min-h-0 flex flex-col">
                        {slide.subItems.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => {
                              scrollToSlide(sub.id);
                              setIsExpanded(false);
                            }}
                            className="pl-12 py-3 text-sm font-medium uppercase hover:bg-white/10 rounded cursor-pointer transition-colors text-white/80 hover:text-white"
                          >
                            {sub.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                );
              }

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    scrollToSlide(slide.id);
                    setIsExpanded(false);
                  }}
                  className="flex items-center px-4 py-4 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap overflow-hidden group"
                >
                  <div className="text-xs w-8 shrink-0 group-hover:text-white transition-colors">{slide.num}</div>
                  <div className={`text-sm font-medium uppercase transition-all duration-500 ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    {slide.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginationSidebar;

