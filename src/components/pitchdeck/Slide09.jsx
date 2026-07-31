"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const slideImages = [
  {
    src: '/images/projects/robb_report/cover_img.jpg',
    alt: 'Esquire India Desktop Showcase',
    label: 'Esquire India'
  },
  {
    src: '/images/projects/robb_report/cover_img.jpg',
    alt: 'Robb Report Showcase',
    label: 'Robb Report'
  },
  {
    src: '/images/projects/robb_report/cover_img.jpg',
    alt: 'The Hollywood Reporter India Showcase',
    label: 'THR India'
  },
  {
    src: '/images/projects/robb_report/cover_img.jpg',
    alt: 'Robb Report Showcase',
    label: 'Robb Report'
  },
  {
    src: '/images/projects/robb_report/cover_img.jpg',
    alt: 'The Hollywood Reporter India Showcase',
    label: 'THR India'
  }
];

const Slide09 = () => {
  return (
    <section className="h-screen w-full snap-start p-1 relative flex flex-col">
      <div className="w-full h-full bg_blue text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-4">
            <h2 data-para-effect className="text-5xl primary-font ">
              Case Study<br />
              01: RPSG<br />
              Media
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-5 pr-0 lg:pr-4">
            <h3 data-para-effect className="text-xl uppercase  mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className="text-lg leading-tight">
              RPSG Media partnered with us to launch the India editions of The Hollywood Reporter, Esquire, and Robb Report through a completely custom publishing ecosystem built for scale, speed, and brand distinction. Instead of relying on restrictive templates, we developed a unified backend with tailored CMS workflows and custom websites for each publication, optimized individually for breaking news, editorial storytelling, and luxury curation. The result: 500+ editors publishing seamlessly, 3M+ monthly users, and all three brands reaching #1 category rankings within 12 months.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-3">
            <h3 data-para-effect className="text-xl uppercase  mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className="text-lg leading-tight">
              <li>Custom CMS Development</li>
              <li>Custom Website Design & Development</li>
              <li>Editorial Workflow Systems</li>
              <li>Scalable Backend Infrastructure</li>
            </ul>
          </div>

        </div>

        {/* Middle/Bottom: Swiper Slider Section */}
        <div className="w-full ">
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
                <div data-img-effect className="w-full h-[36vh] md:h-[44vh] relative  overflow-hidden bg-black/20 group">
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

export default Slide09;


