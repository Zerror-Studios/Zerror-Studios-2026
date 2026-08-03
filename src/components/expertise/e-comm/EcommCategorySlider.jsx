"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const categories = ["Fashion", "Jewellery", "Health", "Food", "Lifestyle"];

const slidesData = [
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_1.png",
        alt: "Fashion eCommerce store",
        category: "Fashion",
    },
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_2.png",
        alt: "Fashion product page",
        category: "Fashion",
    },
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_3.png",
        alt: "Jewellery eCommerce store",
        category: "Jewellery",
    },
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_1.png",
        alt: "Health products store",
        category: "Health",
    },
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_2.png",
        alt: "Food delivery platform",
        category: "Food",
    },
    {
        image: "/images/expertisePage/e-comm/categorySlider/fashion_img_3.png",
        alt: "Lifestyle eCommerce",
        category: "Lifestyle",
    },
];

const EcommCategorySlider = () => {
    const [activeCategory, setActiveCategory] = useState("Fashion");
    const [isFading, setIsFading] = useState(false);
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const fadeTimeout = useRef(null);

    const filteredSlides =
        activeCategory === "All"
            ? slidesData
            : slidesData.filter((slide) => slide.category === activeCategory);

    const handleCategoryClick = (cat) => {
        if (cat === activeCategory) return;

        if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

        setIsFading(true);

        fadeTimeout.current = setTimeout(() => {
            setActiveCategory(cat);
            if (swiperRef.current) {
                swiperRef.current.slideTo(0, 0); 
            }

            requestAnimationFrame(() => {
                setIsFading(false);
            });
        }, 200); 
    };

     useGSAP(()=>{
        gsap.from(".cat_inner_slides",{
            xPercent:100,
            opacity:0,
            stagger:0.15,
            scrollTrigger:{
                trigger:".ecomm_cat_slider_wrap",
                start:"top center",
                toggleActions:"play none none reverse"
            }
        })
    })

    return (
        <div
            ref={containerRef}
            className="w-full bg_blue relative overflow-hidden py-10! md:py-32! mt-10! md:mt-32!"
        >
            <div className="w-full   padding py-0!  text-white ">
                <div className="w-full space-y-12 pb-12 border-white/50 md:space-y-0 border-b  md:grid grid-cols-[28%_30%_42%]">
                    <div className="">
                        <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Shopify or a <br /> custom platform? </h2>
                    </div>
                    <div className="text-xs max-sm:hidden pt-4">
                    </div>
                    <div className="capitalize text-3xl  md:pl-2">
                        <h3 data-para-effect className="">
                            <span className='opacity-0 secondary-font max-sm:hidden pointer-events-none'>...............</span>
                            We're not platform loyalists. Shopify is right for most stores, and we build it well. But some
businesses don't fit a template — and forcing them never ends well.
                        </h3>
                    </div>
                </div>
            </div>

            <div className="padding pb-0! pt-8! md:pt-12! flex flex-wrap gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`ecomm_cat_pill px-5 py-2 pb-1.5 rounded-full text-sm  uppercase  border transition-all duration-300 cursor-pointer ${activeCategory === cat
                                ? "bg-white font-semibold text-[#002bba] border-white"
                                : "bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div
                className="ecomm_cat_slider_wrap mt-8 md:mt-12 padding py-0!"
                style={{
                    opacity: isFading ? 0 : 1,
                    transition: "opacity 0.3s ease",
                }}
            >
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={"auto"}
                    spaceBetween={12}
                    breakpoints={{
                        768: {
                            spaceBetween: 20,
                        },
                    }}
                    className="ecomm_category_swiper cursor-grab rounded-xl active:cursor-grabbing"
                >
                    {filteredSlides.map((slide, i) => (
                        <SwiperSlide
                            key={`${activeCategory}-${i}`}
                            className="cat_inner_slides w-[85vw]! md:w-[40vw]! lg:w-[60vw]!"
                        >
                            <div className="w-full rounded-xl overflow-hidden">
                                <div className="w-full aspect-video relative bg-white/5">
                                    <Image
                                        src={slide.image}
                                        alt={slide.alt}
                                        fill
                                        className="cover"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default EcommCategorySlider;