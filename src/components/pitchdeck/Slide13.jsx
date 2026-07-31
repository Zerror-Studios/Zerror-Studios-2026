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

const Slide13 = () => {
  return (
    <section className="h-screen w-full snap-start p-1 relative flex flex-col">
      <div className="w-full h-full bg_blue text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-4">
            <h2 data-para-effect className="text-5xl primary-font">
              Case Study<br />
              03: Salman<br />
              Khan Films
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-5 pr-0 lg:pr-4">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className="text-lg leading-tight">
              Salman Khan Films partnered with us to create a premium digital showcase reflecting the scale, prestige, and timelessness of one of Bollywood's most recognized production houses. Rather than building a trend-driven entertainment website, the focus was on crafting a refined and cinematic digital experience designed to remain visually relevant across multiple film cycles. Through custom design, intentional motion, and restrained visual storytelling, we developed a platform that continues to feel contemporary years after launch.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-3">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className="text-lg leading-tight">
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
            spaceBetween={20}
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
                <div data-img-effect className="w-full h-[36vh] md:h-[44vh] relative overflow-hidden bg-black/20 group">
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

      </div>
    </section>
  );
};

export default Slide13;


