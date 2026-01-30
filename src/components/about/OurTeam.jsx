import React, { useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import Flip from "gsap/dist/Flip";
import Image from "next/image";
import Form from "./Form";
gsap.registerPlugin(Flip);

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/1.png",
  },
  {
    id: 2,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/2.png",
  },
  {
    id: 3,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/3.png",
  },
  {
    id: 4,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/4.png",
  },
  {
    id: 5,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/1.png",
  },
  {
    id: 6,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/2.png",
  },
  {
    id: 7,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/3.png",
  },
  {
    id: 8,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/4.png",
  },
  {
    id: 9,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/2.png",
  },
  {
    id: 10,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/3.png",
  },
  {
    id: 11,
    name: "ARTUR SHARF",
    role: "Co-Founder And Lead Architect",
    img: "/images/outTeam/3.png",
  },
];

const OurTeam = () => {

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
  }, []);

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
    gsap.to(".inner_paren", {
      width: "80%",
      height: "42vw",
      duration: 0.8,
      ease: "expo.inOut",
    });
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
      duration: 0.2,
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
      delay: 0.3,
      ease: "expo.inOut",
    });
    gsap.to(".dummy_txt", {
      opacity: 1,
      duration: 0.4,
      delay: 0.4,
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


  return (
    <div className="w-full relative">
      <div className=" form_blur_overlay opacity-0 fixed top-0 left-0 z-[9999] backdrop-blur-xs pointer-events-none w-full h-screen"></div>
      <div className="w-full px-10 pb-42">
        <div className="grid gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
              className="   relative overflow-hidden"
            >
              {/* Blocks */}
              <div className="absolute inset-0 grid grid-cols-7 z-10">
                {[...Array(70)].map((_, i) => (
                  <div
                  key={i}
                  className="grid_blocks shrink-0  w-full aspect-square bg-white opacity-0 pointer-events-none"
                  />
                ))}
              </div>

              {/* Image */}
              <div className="w-full relative aspect-4/5">
                  <div className="card_border absolute inset-0 border border-black/10 opacity-0 pointer-events-none z-20" />
                <Image
                  width={400}
                  height={500}
                  src={member.img}
                  alt={member.name}
                  className="cover"
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-xl font-semibold mt-2 uppercase text_blue">
                  {member.name}
                </p>
                <p className="text_blue text-sm">{member.role}</p>
              </div>
            </div>
          ))}

          <div
            ref={ctaRef}
            onClick={!isOpen ? openForm : undefined}
            className="w-full h-full center overflow-hidden relative"
          >
            <div className=" inner_paren w-full h-full overflow-hidden text-white bg_blue  ">

              <Form closeForm={closeForm} />

              <div className="dummy_txt absolute pointer-events-none  bottom-8 left-8 space-y-5 w-[80%]">
                <p className="pfn leading-none text-6xl">
                  Become A <br /> Zerrorian
                </p>
                <p className="leading-tight">
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
