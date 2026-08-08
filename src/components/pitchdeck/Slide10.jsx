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

const Slide10 = () => {
  return (
    <section className="w-full h-full overflow-hidden    bg_blue flex flex-col">
      <div className="max-sm:overflow-y-scroll case-study-content z-10 w-full text-white p-5 flex flex-col space-y-10 md:space-y-16 relative">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-2">
            <h2 data-para-effect className="text-4xl primary-font ">
              Manifest
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-6 md:pr-10">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className=" leading-tight text-sm ">
              Manifest partnered with us to migrate from a restrictive WordPress setup to a fully custom publishing platform built for scalability, performance, and long-term growth. The challenge wasn't just redesigning the experience — it was preserving five years of SEO authority, editorial content, media assets, and search rankings without downtime or data loss. We engineered a custom migration infrastructure and rebuilt the platform from the ground up, enabling a seamless transition with zero disruption to readers while significantly improving performance, flexibility, and publishing capabilities. The result was a 200% increase in traffic post-launch alongside a completely preserved content ecosystem.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-2">
            <h3 data-para-effect className=" uppercase text-sm mb-2 text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className=" space-y-1 text-sm leading-none">
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
              <p>Manifest had spent five years building content, SEO authority, and editorial infrastructure on WordPress, but the platform had become limiting in both design flexibility and performance.</p>
              <p>They needed a modern, fully custom publishing experience without risking years of accumulated data, rankings, URLs, and media assets during migration.</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white/10 rounded-2xl p-5 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-10">
            <div data-para-effect className="text-8xl md:text-[10rem] md:h-[8rem] overflow-hidden md:pt-8 primary-font md:w-32 flex items-center shrink-0">2</div>
            <div className="md:w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Solution</h3>
            </div>
            <div className="max-sm:text-sm flex-1 leading-tight space-y-4">
              <p>We engineered a fully custom publishing platform alongside a custom migration infrastructure capable of intelligently translating and transferring large-scale content, metadata, media assets, and relationships from WordPress without disruption.</p>
              <p>Every original URL structure and SEO signal was preserved while the new platform was rebuilt for speed, scalability, and editorial flexibility.</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white/10 rounded-2xl p-5 md:p-10 flex flex-col lg:flex-row gap-4 md:gap-10">
            <div data-para-effect className="text-8xl md:text-[10rem] md:h-[8rem] overflow-hidden md:pt-8 primary-font md:w-32 flex items-center shrink-0">3</div>
            <div className="md:w-64 shrink-0">
              <h3 className="text-3xl primary-font">The Outcome</h3>
            </div>
            <div className="max-sm:text-sm flex-1 leading-tight space-y-4">
              <p>The migration launched with zero downtime, zero broken links, and zero data loss. Post-launch, traffic increased by 200%, page speeds improved significantly, and the editorial team gained the flexibility to scale and innovate on a modern publishing system built for long-term growth.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Slide10;
