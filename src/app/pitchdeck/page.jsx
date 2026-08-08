"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Slide01 from '@/components/pitchdeck/Slide01';
import Slide02 from '@/components/pitchdeck/Slide02';
import Slide03 from '@/components/pitchdeck/Slide03';
import Slide04 from '@/components/pitchdeck/Slide04';
import Slide05 from '@/components/pitchdeck/Slide05';
import Slide06 from '@/components/pitchdeck/Slide06';
import Slide07 from '@/components/pitchdeck/Slide07';
import Slide08 from '@/components/pitchdeck/Slide08';
import Slide09 from '@/components/pitchdeck/Slide09';
import Slide10 from '@/components/pitchdeck/Slide10';
import Slide11 from '@/components/pitchdeck/Slide11';
import Slide12 from '@/components/pitchdeck/Slide12';
import Slide13 from '@/components/pitchdeck/Slide13';
import Slide14 from '@/components/pitchdeck/Slide14';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_SLIDES = 14;

export default function PitchDeck() {
  const slideRefs = useRef([]);
  const progressRefs = useRef([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    const activeIndex = s.realIndex;
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index < activeIndex) {
          ref.style.width = '100%';
        } else if (index > activeIndex) {
          ref.style.width = '0%';
        } else {
          ref.style.width = `${Math.max(0, Math.min(100, (1 - progress) * 100))}%`;
        }
      }
    });
  };

  const handleSlideChange = (s) => {
    const activeIndex = s.realIndex;
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index < activeIndex) {
          ref.style.width = '100%';
        } else if (index > activeIndex) {
          ref.style.width = '0%';
        }
      }
    });
  };

  const scrollToSlide = (index) => {
    let targetY = (index - 1) * window.innerHeight;

    // Add 150vh for each spacer that comes BEFORE the target slide
    const spacerHeight = window.innerHeight * 1.5;
    if (index > 9) targetY += spacerHeight;
    if (index > 10) targetY += spacerHeight;
    if (index > 11) targetY += spacerHeight;
    if (index > 12) targetY += spacerHeight;

    if (window.lenis) {
      window.lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  useGSAP(() => {
    // Stacking card animations
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      if (i + 1 > TOTAL_SLIDES) continue;

      const endTriggerIndex = Math.min(i + 3, TOTAL_SLIDES);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.slide_${i + 1}`,
          start: "top bottom",
          endTrigger: `.slide_${endTriggerIndex}`,
          end: "top top",
          scrub: true
        }
      });

      tl.to(`.slide_${i}`, {
        scale: 0.9,
        yPercent: -8,
        filter: "brightness(0.8)",
        ease: "none"
      });

      if (i + 2 <= TOTAL_SLIDES) {
        tl.to(`.slide_${i}`, {
          scale: 0.8,
          yPercent: -16,
          filter: "brightness(0.7)",
          ease: "none"
        });
      }

      if (i + 3 <= TOTAL_SLIDES) {
        tl.to(`.slide_${i}`, {
          scale: 0.7,
          yPercent: -24,
          filter: "brightness(0.6)",
          opacity: 0,
          ease: "none"
        });
      }
    }

    // Case studies internal scrolling
    const caseStudies = [9, 10, 11, 12];
    caseStudies.forEach(i => {
      const spacer = document.querySelector(`#slide-${i < 10 ? '0' + i : i}-spacer`);
      const content = document.querySelector(`.slide_${i} .case-study-content`);
      if (spacer && content) {
        gsap.to(content, {
          y: () => {
            const card = document.querySelector(`.slide_${i}`);
            return -(content.scrollHeight - card.clientHeight);
          },
          ease: "none",
          scrollTrigger: {
            trigger: spacer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // Pagination active indicators logic
    for (let i = 1; i <= TOTAL_SLIDES; i++) {
      const baseId = `slide-${i < 10 ? '0' + i : i}`;
      const spacerId = `#${baseId}-spacer`;
      const spacerEl = document.querySelector(spacerId);

      ScrollTrigger.create({
        trigger: `#${baseId}`,
        start: "top center",
        endTrigger: spacerEl ? spacerId : `#${baseId}`,
        end: spacerEl ? "bottom center" : "bottom center",
        onToggle: (self) => {
          const el = document.querySelector(`.dot-indicator_${i}`);
          if (el) {
            if (self.isActive) {
              el.classList.add('active-slide');
            } else {
              el.classList.remove('active-slide');
            }
          }
        }
      });
    }
  });

  return (
    <main className="relative padding py-0! md:p-0!">

      <div className="fixed max-sm:hidden right-6 top-1/2 -translate-y-1/2 z-[999] flex justify-center w-14">
        <div className="flex flex-col items-center gap-1">
          {Array.from({ length: TOTAL_SLIDES }).map((_, index) => {
            const slideNum = index + 1;
            return (
              <button
                key={slideNum}
                onClick={() => scrollToSlide(slideNum)}
                className="pitchdeck-dot-wrapper py-0.5 px-4 cursor-pointer flex items-center justify-center"
                aria-label={`Go to slide ${slideNum}`}
              >
                <div
                  className={`pitchdeck-dot dot-indicator_${slideNum} ${slideNum === 1 ? 'active-slide' : ''}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="md:hidden disable-gsap-mobile w-full flex flex-col h-svh  pb-4">
        <div className="w-full h-28 pb-4 flex items-end ">
          <div className="w-full flex items-center justify-between gap-1 h-1">
            {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
              <div 
                key={index} 
                className="flex-1 h-1 bg-black/10 rounded-full overflow-hidden cursor-pointer"
                onClick={() => swiperInstance && swiperInstance.slideTo(index)}
              >
                <div
                  ref={el => progressRefs.current[index] = el}
                  className="h-full bg_blue w-0"
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-[calc(100%-7rem)] relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={handleSlideChange}
            onSwiper={setSwiperInstance}
            spaceBetween={10}
            className="w-full h-full rounded-md overflow-hidden absolute inset-0"
          >
            <SwiperSlide className='rounded-md overflow-hidden'><Slide01 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide02 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide03 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide04 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide05 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide06 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide07 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide08 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide09 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide10 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide11 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide12 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide13 /></SwiperSlide>
            <SwiperSlide className='rounded-md overflow-hidden'><Slide14 /></SwiperSlide>
          </Swiper>
        </div>
      </div>



      <div className="hidden md:block">
        <div ref={el => slideRefs.current[0] = el} id="slide-01" className="w-full h-screen sticky top-0 center">
          <div className="slide_1 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide01 />
          </div>
        </div>
        <div ref={el => slideRefs.current[1] = el} id="slide-02" className="w-full h-screen sticky top-0 center">
          <div className="slide_2 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide02 />
          </div>
        </div>
        <div ref={el => slideRefs.current[2] = el} id="slide-03" className="w-full h-screen sticky top-0 center">
          <div className="slide_3 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide03 />
          </div>
        </div>
        <div ref={el => slideRefs.current[3] = el} id="slide-04" className="w-full h-screen sticky top-0 center">
          <div className="slide_4 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide04 />
          </div>
        </div>
        <div ref={el => slideRefs.current[4] = el} id="slide-05" className="w-full h-screen sticky top-0 center">
          <div className="slide_5 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide05 />
          </div>
        </div>
        <div ref={el => slideRefs.current[5] = el} id="slide-06" className="w-full h-screen sticky top-0 center">
          <div className="slide_6 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide06 />
          </div>
        </div>
        <div ref={el => slideRefs.current[6] = el} id="slide-07" className="w-full h-screen sticky top-0 center">
          <div className="slide_7 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide07 />
          </div>
        </div>
        <div ref={el => slideRefs.current[7] = el} id="slide-08" className="w-full h-screen sticky top-0 center">
          <div className="slide_8 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide08 />
          </div>
        </div>
        <div ref={el => slideRefs.current[8] = el} id="slide-09" className="w-full h-screen sticky top-0 center">
          <div className="slide_9 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide09 />
          </div>
        </div>
        <div id="slide-09-spacer" className="w-full h-[150vh]"></div>

        <div ref={el => slideRefs.current[9] = el} id="slide-10" className="w-full h-screen sticky top-0 center">
          <div className="slide_10 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide10 />
          </div>
        </div>
        <div id="slide-10-spacer" className="w-full h-[150vh]"></div>

        <div ref={el => slideRefs.current[10] = el} id="slide-11" className="w-full h-screen sticky top-0 center">
          <div className="slide_11 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide11 />
          </div>
        </div>
        <div id="slide-11-spacer" className="w-full h-[150vh]"></div>

        <div ref={el => slideRefs.current[11] = el} id="slide-12" className="w-full h-screen sticky top-0 center">
          <div className="slide_12 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide12 />
          </div>
        </div>
        <div id="slide-12-spacer" className="w-full h-[150vh]"></div>
        <div ref={el => slideRefs.current[12] = el} id="slide-13" className="w-full h-screen sticky top-0 center">
          <div className="slide_13 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide13 />
          </div>
        </div>
        <div ref={el => slideRefs.current[13] = el} id="slide-14" className="w-full h-screen sticky top-0 center">
          <div className="slide_14 border border-white/20 md:aspect-video w-full md:w-[70%] brightness-100 rounded-xl overflow-hidden">
            <Slide14 />
          </div>
        </div>
      </div>
    </main>
  );
};
