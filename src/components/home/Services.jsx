"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitText from 'gsap/dist/SplitText'
import React, { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger);

const ServicesData = [
  {
    id: 1,
    title: 'Website Design & Development',
    services: ["Mood boarding", "UI/UX Design", "Frontend & Backend Development", "Responsive Design", "Performance & Security"]
  },
  {
    id: 2,
    title: 'Custom software Development',
    services: ["Content Architecture", "Headless CMS", "Admin Dashboards", "Custom Workflows", "Scalable Systems"]
  },
  {
    id: 3,
    title: 'Ecommerce Development',
    services: ["Store Strategy", "UX-Led Design", "Payment & Checkout", "Platform Development", "Scalable Infrastructure"]
  },
  {
    id: 4,
    title: 'Branding, Marketing & SEO',
    services: ["Brand Identity", "Visual Systems", "Digital Marketing", "SEO Strategy", "Growth Optimization"]
  },
]
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();

const Services = () => {

  useGSAP(() => {

    if (window.innerWidth < 750) return

    const split_wrd = SplitText.create(".split_wrd", { type: "words, chars" });
    gsap.set(split_wrd.words, { y: 50, opacity: 0, display: "inline-block" })

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.services_paren',
        start: 'top top',
        end: "+=250%",
        pin: true,
        scrub: true
      }
    })
    tl.to(".expand_circ", {
      height: "120vw",
      width: "120vw",
      ease: "linear",
    })
      .to(split_wrd.words, {
        y: 0,
        opacity: 1,
        stagger: 0.01
      })
  })

  useEffect(() => {

    const items = document.querySelectorAll(".service-item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const chars = entry.target.querySelectorAll(".char");
          animateChars(chars);

          entry.target.dataset.animated = "true"; // run once
        }
      });
    },
      {
        threshold: 0.4,
      }
    );

    items.forEach((item) => {
      const chars = item.querySelectorAll(".char");

      observer.observe(item);

      item.addEventListener("mouseenter", () => {
        animateChars(chars);
      });
    });

    return () => observer.disconnect();
  }, []);


  return (
    <>
      <div className="w-full relative py-24 px-5 md:p-0 md:h-screen center text-center">
        <p className=" text-5xl md:text-8xl pb-5 leading-none pfn md:w-[70%] bg-clip-text text-transparent bg-[url('/images/homePage/mask_img.webp')] bg-fixed bg-cover bg-center">
          To build zero-error digital products where design and technology move as one.
        </p>
      </div>

      <div className=" services_paren overflow-hidden w-full md:h-screen relative  grid grid-cols-1  md:grid-cols-2 gap-x-24 ">

        <div className=" hidden md:flex h-full flex-col items-center gap-y-12 justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-px bg-[#D3D3D3] h-full"></div>
          <div className="size-3.5 opacity-0 shrink-0 bg_blue rounded-full "></div>
          <div className="w-px bg-[#D3D3D3] h-full"></div>
        </div>

        {ServicesData.map((item, i) => {
          const words = item.title.split(" ");
          const mid = Math.ceil(words.length / 2);

          return (
            <div
              key={item.id}
              className={`service-item  w-full group center flex-col gap-y-5  text-center h-full  max-sm:border-t max-sm:border-[#D3D3D3] max-sm:py-8 ${i === 0 || i === 1 ? "" : "md:border-t border-[#D3D3D3]"
                }`}
            >
              <p className="text-3xl uppercase font-bold w-[80%] md:w-[40%]  text_blue leading-none transition-all duration-300">
                {item.title}
              </p>

              <p className="  max-sm:hidden w-[80%] md:w-[48%]  text_blue leading-tight">
                {item.services.map((service, i) => (
                  <span key={i} className="inline-block">
                    {splitToChars(service)}

                    {i !== item.services.length - 1 && (
                      <span className="inline-block mx-1">
                        {splitToChars("/")}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className=" md:hidden w-[80%] md:w-1/2 text_blue leading-tight">
                {item.services.map((service, i) => (
                  <span key={i} className="inline-block">
                    {service}

                    {i !== item.services.length - 1 && (
                      <span className="inline-block mx-1">
                        {"/"}
                      </span>
                    )}
                  </span>
                ))}
              </p>

            </div>
          );
        })}

        <div className=" noise-bg max-sm:hidden! expand_circ overflow-hidden size-3.5 z-10 center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shrink-0 bg_blue rounded-full ">
          <div className="w-screen relative z-10  padding text-white grid grid-cols-[28%_30%_42%]">
            <div className="">
              <p className=' split_wrd text-5xl md:text-6xl   pfn leading-none'>Our <br /> Clients</p>
            </div>
            <div className="text-xs pt-4">
              <p className='split_wrd font-thin'>Brands we’ve </p>
              <p className='split_wrd font-thin'>worked with.</p>
            </div>
            <div className="text-4xl  pl-2">
              <p className=" split_wrd font-medium leading-11"> <span className='opacity-0 pointer-events-none'>...........................</span> We work with startups, studios, and growing brands to design and build digital products that are clear, scalable, and impactful. From strategy to launch, we focus on thoughtful design, clean code, and meaningful user experiences.</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Services





const splitToChars = (text) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      className={`char inline-block   opacity-0 ${char === " " ? "w-[0.35em]" : ""
        }`}
      data-char={char}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const animateChars = (chars) => {
  chars.forEach((char, i) => {
    const original = char.dataset.char;

    gsap.fromTo(
      char,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        delay: i * 0.04,
      }
    );

    gsap.delayedCall(i * 0.04, () => {
      let iterations = 0;

      const scramble = setInterval(() => {
        char.textContent =
          letters[Math.floor(Math.random() * letters.length)];
        iterations++;

        if (iterations > 3) {
          clearInterval(scramble);
          char.textContent = original;
        }
      }, 30);
    });
  });
};