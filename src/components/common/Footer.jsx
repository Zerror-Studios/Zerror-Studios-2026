"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const hoverIn = (selector) => {
  gsap.to(selector, {
    backgroundColor: "#2147c4",
    ease: "power3.out",
    duration: 0.4,
  });
};

const hoverOut = (selector) => {
  gsap.to(selector, {
    backgroundColor: "#2147c400",
    ease: "power3.in",
    duration: 0.4,
  });
};

const footerRows = [
  {
    id: "I",
    items: [
      {
        text: "Built to last.",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[90%]",
      },
      {},
      { img: "/svg/e.svg", hover: "hover:pb-10" },
      {},
      {
        text: "Prototypes that bring ideas to life.",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[80%]",
      },
      {},
      {
        text: "|",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[88%]",
      },
      { img: "/svg/o.svg", hover: "hover:pb-10" },
      {},
    ],
  },
  {
    id: "S",
    items: [
      {
        text: "|",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[88%]",
      },
      { img: "/svg/z.svg", hover: "hover:pb-10" },
      {},
      {
        text: "|",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[88%]",
      },
      {},
      { img: "/svg/r.svg", hover: "hover:pb-10" },
      {
        text: "Bengaluru, India",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[85%]",
      },
      {
        text: "Design. Development. Marketing.",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[80%]",
      },
      { img: "/svg/r.svg", hover: "hover:pb-10" },
    ],
  },
  {
    id: "T",
    items: [
      {
        text: "Where ideas become usable.",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[80%]",
      },
      {},
      {
        text: "Crafted with intent.",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[85%]",
      },
      {},
      { img: "/svg/r.svg", hover: "hover:pb-10" },
      {
        text: "Refine through feedback.",
        align: "absolute top-[5%] left-[5%]",
        hover: "group-hover:top-[82%]",
      },
      {
        text: "|",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[88%]",
      },
      {},
      {
        text: "© 2025 Zerror Studio. All rights reserved. Made by the Zerror Team.",
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[67%]",
      },
    ],
  },
];

const Footer = () => {

  const flickerRefs = useRef([]);

  useEffect(() => {
    flickerRefs.current.forEach((el) => {
      if (!el) return;

      const delay = Math.random() * 10;
      el.style.animationDelay = `${delay}s`;
    });
  }, []);


  return (
    <div className="w-full md:h-screen bg_blue  padding relative z-100">
      <div className="w-full  md:h-full p-3">
        {footerRows.map((row) => (
          <div key={row.id} className="w-full h-[50vh] md:h-1/3 grid grid-cols-3 md:grid-cols-9">
            {row.items.map((item, i) => {
              const selector = `.hoverBg${row.id}${i}`;
              const isImage = !!item.img;

              return (
                <div
                  key={i}
                  onMouseEnter={() => hoverIn(selector)}
                  onMouseLeave={() => hoverOut(selector)}
                  className={`w-full hoverBg${row.id
                    }${i}  border relative  group border-white/10 rounded-md flex text-white  leading-tight
                   
                    ${isImage ? "px-0 py-0 justify-center  items-center" : "p-5"
                    }
                  `}
                >
                  {item.img && (
                    <img
                      ref={(el) => (flickerRefs.current.push(el))}
                      src={item.img} alt="icon" className="flicker h-[6vw]" />
                  )}

                  {item.text && (
                    <span
                      ref={(el) => (flickerRefs.current.push(el))}
                      className={` flicker text-xs leading-tight tracking-wider  uppercase text-[#f5f5f5]  transition-all duration-300  ${item.align}
                        ${item.hover}
                     `}
                      style={{
                        willChange: "opacity",
                        transition: "top 0.3s ease-in, bottom 0.3s ease-inOut",
                      }} // Only transition position, not opacity  }}
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
