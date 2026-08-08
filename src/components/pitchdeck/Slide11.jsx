"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const slideImages = [
  {
    src: '/images/projects/salmaankhan/cover_img.webp',
    alt: 'Salman Khan Films Showcase 1',
    label: 'Salman Khan Films'
  },
  {
    src: '/images/projects/salmaankhan/gen_cover_img.png',
    alt: 'Salman Khan Films Showcase 2',
    label: 'Salman Khan Films'
  },
  {
    src: '/images/projects/salmaankhan/cover_img.webp',
    alt: 'Salman Khan Films Showcase 3',
    label: 'Salman Khan Films'
  },
  {
    src: '/images/projects/salmaankhan/gen_cover_img.png',
    alt: 'Salman Khan Films Showcase 4',
    label: 'Salman Khan Films'
  }
];

const Slide11 = () => {
  return (
    <section className="w-full h-full overflow-hidden    bg_blue flex flex-col">
      <div className="max-sm:overflow-y-scroll case-study-content z-10 w-full text-white p-5 flex flex-col space-y-10 md:space-y-16 relative">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-2">
            <h2 data-para-effect className="text-4xl primary-font ">
              Salman <br className="max-sm:hidden" />
              Khan Films
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-6 md:pr-10">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className=" leading-tight text-sm ">
              Salman Khan Films partnered with us to create a premium digital showcase reflecting the scale, prestige, and timelessness of one of Bollywood's most recognized production houses. Rather than building a trend-driven entertainment website, the focus was on crafting a refined and cinematic digital experience designed to remain visually relevant across multiple film cycles. Through custom design, intentional motion, and restrained visual storytelling, we developed a platform that continues to feel contemporary years after launch.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-2">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className=" space-y-1 text-sm leading-none">
              <li>Custom Website Design & Development</li>
              <li>Creative Direction & Digital Experience Design</li>
              <li>Motion & Interaction Design</li>
              <li>Responsive Frontend Development</li>
            </ul>
          </div>

        </div>

        {/* Middle/Bottom: Swiper Slider Section */}
        <div className="w-full">
          <Swiper
            spaceBetween={10}
            slidesPerView={1.1}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2.1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            {slideImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div data-img-effect className="w-full aspect-square relative overflow-hidden bg-black/20 group">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full space-y-4">

          {/* Block 1 */}
          <div className="bg-white/10 rounded-2xl p-5 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-10">
            <div data-para-effect className="text-8xl md:text-[10rem] md:h-[8rem] overflow-hidden md:pt-8 primary-font flex items-center md:w-32 shrink-0">1</div>
            <div className="md:w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Problem</h3>
            </div>
            <div className="max-sm:text-sm flex-1 leading-tight space-y-4">
              <p>Salman Khan Films needed a digital presence that reflected their position as one of Bollywood's leading production houses. Most entertainment websites rely heavily on design trends that age quickly, making it difficult to create something that feels modern today while remaining relevant years later.</p>
              <p>The challenge was to build a sophisticated, cinematic experience without sacrificing timelessness.</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white/10 rounded-2xl p-5 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-10">
            <div data-para-effect className="text-8xl md:text-[10rem] md:h-[8rem] overflow-hidden md:pt-8 primary-font md:w-32 flex items-center shrink-0">2</div>
            <div className="md:w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Solution</h3>
            </div>
            <div className="max-sm:text-sm flex-1 leading-tight space-y-4">
              <p>We designed and developed a completely custom showcase website rooted in cinematic storytelling and restrained visual design.</p>
              <p>Every interaction from typography and spacing to animations and transitions was carefully crafted to communicate elegance, confidence, and premium brand positioning without relying on temporary design trends or visual excess.</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white/10 rounded-2xl p-5 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-10">
            <div data-para-effect className="text-8xl md:text-[10rem] md:h-[8rem] overflow-hidden md:pt-8 primary-font md:w-32 flex items-center shrink-0">3</div>
            <div className="md:w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Outcome</h3>
            </div>
            <div className="max-sm:text-sm flex-1 leading-tight space-y-4">
              <p>The platform continues to remain visually contemporary years after launch, adapting seamlessly across multiple film releases and portfolio updates without requiring redesign.</p>
              <p>The result is a timeless digital experience that reinforces the production house's prestige while sustaining long-term brand relevance.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Slide11;
