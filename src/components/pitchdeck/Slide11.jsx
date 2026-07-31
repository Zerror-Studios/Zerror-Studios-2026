"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const slideImages = [
  {
    src: '/images/projects/Manifest/manifest_cover.webp',
    alt: 'Manifest Showcase 1',
    label: 'Manifest'
  },
  {
    src: '/images/projects/Manifest/manifest_cover.webp',
    alt: 'Manifest Showcase 2',
    label: 'Manifest'
  },
  {
    src: '/images/projects/Manifest/manifest_cover.webp',
    alt: 'Manifest Showcase 3',
    label: 'Manifest'
  },
  {
    src: '/images/projects/Manifest/manifest_cover.webp',
    alt: 'Manifest Showcase 4',
    label: 'Manifest'
  }
];

const Slide11 = () => {
  return (
    <section className="h-screen w-full snap-start p-1 relative flex flex-col">
      <div className="w-full h-full bg_blue text-white p-6 md:p-10 flex flex-col justify-between relative overflow-hidden">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-4">
            <h2 data-para-effect className="text-5xl primary-font">
              Case Study<br />
              02: Manifest
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-5 pr-0 lg:pr-4">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className="text-lg leading-tight">
              Manifest partnered with us to migrate from a restrictive WordPress setup to a fully custom publishing platform built for scalability, performance, and long-term growth. The challenge wasn't just redesigning the experience — it was preserving five years of SEO authority, editorial content, media assets, and search rankings without downtime or data loss. We engineered a custom migration infrastructure and rebuilt the platform from the ground up, enabling a seamless transition with zero disruption to readers while significantly improving performance, flexibility, and publishing capabilities. The result was a 200% increase in traffic post-launch alongside a completely preserved content ecosystem.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-3">
            <h3 data-para-effect className="text-xl uppercase mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className="text-lg leading-tight">
              <li>Custom CMS Development</li>
              <li>Wordpress Migration Infrastructure</li>
              <li>Website design & Development</li>
              <li>SEO & Data Preservation Systems</li>
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

export default Slide11;


