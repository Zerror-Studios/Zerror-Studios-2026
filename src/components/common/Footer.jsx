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
        text: "Mumbai, India",
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
        text: `©${new Date().getFullYear()} Zerror Studios. All rights reserved.`,
        align: "absolute bottom-[5%] left-[5%]",
        hover: "group-hover:bottom-[67%]",
      },
    ],
  },
];

const mobileFooterData = [
  {
    label: "Built to last", alignment: "flex items-end"
  }
  , {}
  , {
    label: "I", alignment: "flex items-end"
  }, {
    label: "I", alignment: "flex items-end"

  }, {}, {
    links: [
      {
        label: "Home",
        href: "/"
      }, {
        label: "About",
        href: "/about"
      },
      {
        label: "Work",
        href: "/work"
      },
      {
        label: "Contact",
        href: "/contact"
      }
    ]
  }, {
    label: "Mumbai, India", alignment: " flex items-end text-start"
  }, {}, {
    label: "crafted with intent", alignment: "flex items-end"
  }
  , {
    label: `©${new Date().getFullYear()} Zerror Studios.`, alignment: ""
  }
  , {
    label: "I", alignment: "flex items-start"
  }
  , {
    label: " All rights reserved.", alignment: "flex items-end"
  }
]

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
    <div className=" noise-bg w-full md:h-screen bg_blue  padding relative z-100">

      <div className=" relative z-10 w-full hidden md:block  md:h-full p-3">
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
                      className={` flicker text-xs font-thin leading-tight tracking-wider  uppercase text-[#f6f8ff]  transition-all duration-300  ${item.align}
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

      <div className=" relative z-10 h-full w-full md:hidden text-white uppercase">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img className="scale-150" src="/logo_white.svg" alt="logo" /></div>

        <div className=" grid grid-cols-3">
          {mobileFooterData.map((item, index) => {
            if (Object.keys(item).length === 0) {
              return <div className={`h-[25svh]  ${item.alignment} p-3 border border-white/10 rounded-xl`} key={index} />;
            }

            if (item.label) {
              return (
                <div
                  ref={(el) => (flickerRefs.current.push(el))}
                  key={index} className={` h-[25svh] flicker ${item.alignment} p-3 border border-white/10 rounded-xl text-xs font-thin uppercase`}>
                  <p>
                    {item.label}
                  </p>
                </div>
              );
            }

            if (item.links) {
              return (
                <div
                  key={index} className={` h-[25svh] ${item.alignment} p-3 border border-white/10 rounded-xl flex flex-col gap-2`}>
                  {item.links.map((link, i) => (
                    <a
                      ref={(el) => (flickerRefs.current.push(el))}
                      key={i}
                      href={link.href}
                      className="flicker text-xs  hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              );
            }
          })}
        </div>

      </div>
    </div>
  );
};

export default Footer;
