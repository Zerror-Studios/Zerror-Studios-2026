"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: '01',
    title: <>Website Design & <br className='max-sm:hidden' />Development</>,
    items: [
      'Mood boarding',
      'UI/UX Design',
      'Front & Back End Development',
      'Responsive Design',
      'Performance & Security'
    ]
  },
  {
    id: '02',
    title: <>Custom Software <br className='max-sm:hidden' />Development</>,
    items: [
      'Content Architecture',
      'Headless CMS',
      'Admin Dashboards',
      'Custom Workflows',
      'Scalable Systems'
    ]
  },
  {
    id: '03',
    title: <>eCommerce <br className='max-sm:hidden' /> Solutions</>,
    items: [
      'Store Strategy',
      'UX-Led Design',
      'Payment & Checkout',
      'Platform Development',
      'Scalable Infrastructure'
    ]
  },
  {
    id: '04',
    title: <>Branding, Marketing <br className='max-sm:hidden' /> & SEO</>,
    items: [
      'Brand Identity',
      'Visual Systems',
      'Digital Marketing',
      'SEO Strategy',
      'Growth Optimisation'
    ]
  }
];

const Slide06 = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.fromTo('.line-anim_ncs',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="w-full h-full overflow-y-auto md:overflow-visible">
      <div className="w-full p-5 md:h-full bg-black flex flex-col justify-center text-white min-h-max ">
        {servicesData.map((service, index) => (
          <div key={index} className="flex flex-row flex-wrap md:grid md:grid-cols-7 relative py-6 md:py-4 gap-y-2 md:gap-y-0  md:items-stretch">
            <h2 data-para-effect className="pr-6 md:pr-0 w-18 md:w-auto text-5xl md:text-8xl  nd:flex items-center leading-none md:col-span-2 primary-font text-white">
              {service.id}
            </h2>
            <h2 className="flex-1 md:w-auto text-3xl md:text-3xl lg:text-4xl flex items-center leading-none font-medium md:col-span-3">
              {service.title}
            </h2>
            <div className="w-full md:w-auto max-sm:pl-18 opacity-60 md:col-span-2 text-sm md:text-base  pt-2 md:pt-0">
              {service.items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
            {index < servicesData.length - 1 && (
              <div className="w-full absolute bottom-0 left-0 origin-left scale-x-0 h-[1px] bg-white line-anim_ncs"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slide06;

