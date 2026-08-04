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
    <section className="w-full h-full overflow-hidden    bg_blue flex flex-col">
      <div className="case-study-content w-full z-10 text-white p-5  flex flex-col space-y-16 relative">

        {/* Top Header & Details Section */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-10 gap-8 items-start pt-2 md:pt-4">

          {/* Left: Case Study Title */}
          <div className="lg:col-span-2">
            <h2 data-para-effect className="text-4xl primary-font ">
              RPSG <br />
              Media
            </h2>
          </div>

          {/* Middle: Overview */}
          <div className="lg:col-span-6 pr-10">
            <h3 data-para-effect className=" uppercase text-sm  mb-2 text-white">OVERVIEW</h3>
            <p data-para-effect className=" leading-tight text-sm ">
              RPSG Media partnered with us to launch the India editions of The Hollywood Reporter, Esquire, and Robb Report through a completely custom publishing ecosystem built for scale, speed, and brand distinction. Instead of relying on restrictive templates, we developed a unified backend with tailored CMS workflows and custom websites for each publication, optimized individually for breaking news, editorial storytelling, and luxury curation. The result: 500+ editors publishing seamlessly, 3M+ monthly users, and all three brands reaching #1 category rankings within 12 months.
            </p>
          </div>

          {/* Right: Scope of Work */}
          <div className="lg:col-span-2">
            <h3 data-para-effect className=" uppercase  mb-2 text-sm text-white">SCOPE OF WORK</h3>
            <ul data-para-effect className=" space-y-1 text-sm leading-none">
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
                <div data-img-effect className="w-full aspect-square relative  overflow-hidden bg-black/20 group">
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

        <div className="w-full  space-y-4">

          {/* Block 1 */}
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font   flex items-center  w-32 shrink-0">1</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl  primary-font">The Problem</h3>
            </div>
            <div className="flex-1  leading-tight space-y-4 ">
              <p >RPSG Media launched three international publishing brands in India, but standard WordPress templates couldn't support the scale, speed, or premium editorial experience required.</p>
              <p >While the backend infrastructure remained unified and scalable, every editorial workflow and frontend experience was tailored specifically to each publication's content style, audience, and publishing needs.</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center  shrink-0">2</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl  primary-font">The Solution</h3>
            </div>
            <div className="flex-1  leading-tight space-y-4 ">
              <p >We designed and developed a completely custom CMS and custom built websites for The Hollywood Reporter, Esquire, and Robb Report.</p>
              <p >Each publication had entirely different operational needs from breaking news publishing to luxury product curation while still needing to maintain the prestige and identity of globally recognized media brands.</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-white/10 rounded-2xl p-10 flex flex-col lg:flex-row gap-10">
            <div data-para-effect className="text-[10rem] h-[8rem] overflow-hidden pt-8 primary-font w-32 flex items-center  shrink-0">3</div>
            <div className="w-64 shrink-0">
              <h3 className="text-3xl  primary-font">The Outcome</h3>
            </div>
            <div className="flex-1  leading-tight space-y-4 ">
              <p >The platform now supports 500+ editors publishing seamlessly at scale and delivers sophisticated digital experiences to over 3M+ monthly users.</p>
              <p >Within 12 months, all three publications achieved category-leading rankings, powered by infrastructure designed to enable editorial excellence rather than restrict it.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Slide09;


