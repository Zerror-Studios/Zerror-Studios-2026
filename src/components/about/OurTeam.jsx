"use client";
import React, { useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import Flip from "gsap/dist/Flip";
import Image from "next/image";
import Form from "./Form";
import useDevice from "../hooks/useDevice";
gsap.registerPlugin(Flip);

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Rohit Tiwari",
    role: "Founder & CEO",
    img: "/images/outTeam/rohit.png",
  },
  {
    id: 2,
    name: "Anand Vishwakarma",
    role: "CTO / Sr. Full Stack Developer",
    img: "/images/outTeam/anand.png",
  },
  {
    id: 4,
    name: "Ayush Ahirwar",
    role: "Jr. Full Stack Developer",
    img: "/images/outTeam/ayush.png",
  },
  {
    id: 3,
    name: "Sunny Kurmi",
    role: " Sr. Frontend Developer",
    img: "/images/outTeam/sunny.png",
  },
  {
    id: 5,
    name: "Inderjit Singh",
    role: "Jr. Frontend Developer",
    img: "/images/outTeam/inderjeet.png",
  },
  {
    id: 6,
    name: "Mridulla Devi",
    role: "UI/UX Designer",
    img: "/images/outTeam/mridulla.png",
  },
  {
    id: 7,
    name: "Lingkan Mondal",
    role: "UI/UX Designer",
    img: "/images/outTeam/lingkan.png",
  },
];

const OurTeam = () => {
  const { isMobile, isDesktop } = useDevice();
  const [isOpen, setIsOpen] = useState(false);
  const ctaRef = useRef(null);
  const placeholderRef = useRef(null);

  const cardsRef = useRef([]);
  const tlRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      const blocks = card.querySelectorAll(".grid_blocks");
      const border = card.querySelector(".card_border");

      tlRef.current[i] = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
        },
      })
        // blocks animation
        .to(blocks, {
          opacity: 1,
          duration: 0.01,
          stagger: {
            each: 0.01,
            from: "random",
          },
        }, 0)

        // border animation (sync with blocks)
        .to(border, {
          opacity: 1,
          duration: 0.5,
          ease: "linear",
        }, 0);
    });
  }, [isDesktop]);

  const handleEnter = (index) => {
    tlRef.current.forEach((tl, i) => {
      if (!tl) return;
      i !== index ? tl.play() : tl.pause(0);
    });
  };

  const handleLeave = () => {
    tlRef.current.forEach((tl) => {
      if (!tl) return;
      tl.reverse();
    });
  };

  const openForm = () => {

    gsap.to(ctaRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "expo.out",
    });

    const card = ctaRef.current;
    const rect = card.getBoundingClientRect();

    const placeholder = document.createElement("div");
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    card.parentNode.insertBefore(placeholder, card);
    placeholderRef.current = placeholder;

    gsap.set(card, {
      position: "fixed",
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      zIndex: 999999,
    });

    setIsOpen(true);
    if (window.lenis) window.lenis.stop();

    gsap.to(card, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.8,
      ease: "expo.inOut",
    });
    gsap.set(".form_paren", {
      display: "flex",
      delay: 0.8
    });
    if (window.innerWidth < 750) {
      gsap.to(".inner_paren", {
        width: "90%",
        height: "90vh",
        duration: 0.8,
        ease: "expo.inOut",
      });
    } else {
      gsap.to(".inner_paren", {
        width: "80%",
        height: "45vw",
        duration: 0.8,
        ease: "expo.inOut",
      });
    }
    gsap.to(".dummy_txt", {
      opacity: 0,
      duration: 0.4,
      ease: "expo.inOut",
    });
    gsap.to(".form_paren", {
      opacity: 1,
      duration: 0.4,
      delay: 0.9,
      ease: "expo.inOut",
    });
    gsap.to(".form_blur_overlay", {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.8,
      ease: "expo.inOut",
    })
  }

  const closeForm = () => {

    const card = ctaRef.current;
    const rect = placeholderRef.current.getBoundingClientRect();

    gsap.to(".form_paren", {
      opacity: 0,
      duration: 0.3,
      ease: "expo.inOut",
    });
    gsap.set(".form_paren", {
      display: "none",
      delay: 0.2
    });

    gsap.to(".inner_paren", {
      width: "100%",
      height: "100%",
      duration: 0.5,
      delay: 0.4,
      ease: "expo.inOut",
    });
    gsap.to(".dummy_txt", {
      opacity: 1,
      duration: 0.4,
      delay: 0.45,
      ease: "expo.inOut",
    });

    gsap.to(card, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      duration: 0.8,
      delay: 0.3,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(card, {
          position: "relative",
          top: "auto",
          left: "auto",
          width: "100%",
          height: "100%",
          zIndex: "auto",
        });

        placeholderRef.current.remove();
        placeholderRef.current = null;
        setIsOpen(false);
        if (window.lenis) window.lenis.start();
      },
    });

    gsap.to(".form_blur_overlay", {
      opacity: 0,
      duration: 0.8,
      pointerEvents: "none",
      ease: "expo.inOut",
    })

  }


  const cardHandleMove = (e) => {
    if (!ctaRef.current || isOpen) return;

    const bounds = ctaRef.current.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(ctaRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "expo.out",
      transformPerspective: 1000,
      transformOrigin: "center",
    });
  };

  const cardHandleLeave = () => {
    if (!ctaRef.current) return;

    gsap.to(ctaRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "expo.out",
    });
  };



  return (
    <div className="w-full relative">
      <div className=" form_blur_overlay opacity-0 fixed top-0 left-0 z-[9999] backdrop-blur-xs pointer-events-none w-full h-screen"></div>
      <div className="w-full px-4 md:px-10 pb-10 md:pb-42">
        <div className="grid gap-x-2  gap-y-6 md:gap-x-4 md:gap-y-10  md:gap-20 grid-cols-2  md:grid-cols-4">

          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              className="   relative overflow-hidden"
            >
              {/* Blocks */}
              {isDesktop && (
              <div className="absolute inset-0 grid grid-cols-7 z-10">
                {[...Array(70)].map((_, i) => (
                  <div
                    key={i}
                    className="grid_blocks shrink-0  w-full aspect-square bg-white opacity-0 pointer-events-none"
                  />
                ))}
              </div>
              )}

              {/* Image */}
              <div className="   w-full relative aspect-4/5">
                {/* <div className="skeleton_box w-full h-full skeleton_animate"></div> */}
                <div className=" card_border absolute inset-0 border border-black/10 opacity-0 pointer-events-none z-20" />
                <Image
                  width={100}
                  height={125}
                  src={member.img}
                  alt={member.name}
                  className="cover grayscale brightness-0"
                />

                <div className="absolute inset-0 bg-[#002bba] mix-blend-screen pointer-events-none" />
              </div>

              {/* Text */}
              <div>
                <h4 className="text-xl leading-none primary-font mt-3 uppercase text_blue">
                  {member.name}
                </h4>
                <p className="text_blue leading-none mt-1">{member.role}</p>
              </div>
            </div>
          ))}

          <div
            ref={ctaRef}
            onMouseMove={cardHandleMove}
            onMouseLeave={cardHandleLeave}
            onClick={!isOpen ? openForm : undefined}
            className={`   w-full h-full center  overflow-hidden relative ${isOpen ? "cursor-default" : "cursor-pointer"}  `}
          >

            <div className="  inner_paren w-full h-full overflow-hidden text-white bg_blue  ">

              <Form closeForm={closeForm} />

              <div className="dummy_txt absolute pointer-events-none bottom-4 md:bottom-8 left-4 md:left-8 space-y-5 w-[80%]">
                <h2 className="primary-font leading-none text-3xl md:text-5xl">
                  Become A <br /> Zerrorian
                </h2>
                <p className="leading-tight font-thin">
                  Join us in creating great work share your resume.
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default OurTeam;
