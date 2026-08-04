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

const Slide12 = () => {
  return (
    <section className="w-full h-full overflow-hidden    bg_blue flex flex-col">
      <div className="case-study-content z-10 w-full text-white p-6 md:p-10 flex flex-col space-y-16 relative">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-2">
            <h2 data-para-effect className="text-4xl primary-font ">
              Deveshe <br />
              Dreams
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-6 pr-10">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className=" leading-tight text-sm ">
              Deveshe Dreams partnered with us to build a completely custom e-commerce platform reflecting the exclusivity, craftsmanship, and intentionality of their limited-collection fashion model. Traditional e-commerce systems built for mass retail couldn't support their operational workflows or premium brand positioning. We designed a proprietary platform tailored specifically to their business — combining sophisticated digital storytelling with custom infrastructure for pre-orders, collection drops, inventory management, and customer experience. The result was a significant transformation in both brand perception and business performance.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-2">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className=" space-y-1 text-sm leading-none">
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
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font flex items-center w-32 shrink-0">1</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Problem</h3>
            </div>
            <div className="flex-1 leading-tight space-y-4">
              <p>Deveshe Dreams operates on limited handcrafted collections with premium positioning, scarcity-based releases, and pre-order workflows.</p>
              <p>Traditional platforms like Shopify and WooCommerce are designed for volume retail and couldn't support the brand's unique operational model or communicate the exclusivity and artistry central to the experience.</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">2</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Solution</h3>
            </div>
            <div className="flex-1 leading-tight space-y-4">
              <p>We engineered a completely custom e-commerce platform tailored specifically to the brand's workflow and positioning.</p>
              <p>Beyond the storefront experience, the system included collection-based releases, pre-order handling, real-time inventory tracking, production workflow management, customer automation, and analytics, all managed through a unified backend designed around the business itself.</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center shrink-0">3</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Outcome</h3>
            </div>
            <div className="flex-1 leading-tight space-y-4">
              <p>The platform drove 165% traffic growth, 350% year-over-year revenue growth, significantly higher average order values, and strong repeat customer retention.</p>
              <p>More importantly, the digital experience finally aligned with the brand's premium identity, allowing every interaction to communicate craftsmanship, scarcity, and intentional design.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Slide12;
