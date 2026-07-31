"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const slideImages = [
  {
    src: '/images/projects/deveshe/cover_img.webp',
    alt: 'Deveshe Dreams Showcase 1',
    label: 'Deveshe Dreams'
  },
  {
    src: '/images/projects/deveshe/cover_img.webp',
    alt: 'Deveshe Dreams Showcase 2',
    label: 'Deveshe Dreams'
  },
  {
    src: '/images/projects/deveshe/cover_img.webp',
    alt: 'Deveshe Dreams Showcase 3',
    label: 'Deveshe Dreams'
  },
  {
    src: '/images/projects/deveshe/cover_img.webp',
    alt: 'Deveshe Dreams Showcase 4',
    label: 'Deveshe Dreams'
  }
];

const Slide15 = () => {
  return (
    <section className="h-screen w-full snap-start p-1 relative flex flex-col">
      <div className="w-full h-full bg_blue text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-4">
            <h2 data-para-effect className="text-5xl primary-font">
              Case Study<br />
              04: Deveshe<br />
              Dreams
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-5 pr-0 lg:pr-4">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className="text-lg leading-tight">
              Deveshe Dreams partnered with us to build a completely custom e-commerce platform reflecting the exclusivity, craftsmanship, and intentionality of their limited-collection fashion model. Traditional e-commerce systems built for mass retail couldn't support their operational workflows or premium brand positioning. We designed a proprietary platform tailored specifically to their business — combining sophisticated digital storytelling with custom infrastructure for pre-orders, collection drops, inventory management, and customer experience. The result was a significant transformation in both brand perception and business performance.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-3">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className="text-lg leading-tight">
              <li>Custom E-Commerce Platform Development</li>
              <li>Custom Storefront Design & Development</li>
              <li>Inventory & Collection Management Systems</li>
              <li>Customer Experience & Automation Infrastructure</li>
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

export default Slide15;


