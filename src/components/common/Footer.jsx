"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const year = new Date().getFullYear();

// Placeholder URLs from site config until the final profiles arrive.
const socialLinks = [
  { label: "Instagram", href: siteConfig.socials.instagram, external: true },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, external: true },
];

const smallPrintLinks = [
  { label: `© ${year} Zerror Studios` },
];

const FooterLink = ({ link, className = "", ...rest }) => {
  if (!link.href) {
    return <span className={`${className} ${link.className || ""}`} {...rest}>{link.label}</span>;
  }
  if (link.external) {
    const isMail = link.href.startsWith("mailto:");
    return (
      <a
        href={link.href}
        {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        className={`${className} ${link.className || ""} hover:underline`}
        {...rest}
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={`${className} ${link.className || ""} hover:underline`} {...rest}>
      {link.label}
    </Link>
  );
};

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
      {},
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
      {
        links: socialLinks,
        align: "absolute bottom-[5%] left-[5%] right-[5%]",
      },
      {},
      {
        links: smallPrintLinks,
        align: "absolute bottom-[5%] left-[5%] right-[5%]",
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
  }, {}, {}, {}, {}, {}, {
    links: socialLinks, alignment: " justify-end"
  }
  , {
    label: `© ${year} Zerror Studios`, alignment: ""
  }
  , {
    label: "I", alignment: "flex items-start"
  }
  , {
    links: smallPrintLinks.slice(1), alignment: " justify-end"
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

      <div className=" relative z-10 w-full hidden md:block  md:h-full py-3">
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

                  {item.links && (
                    <div className={`flex flex-col gap-1 label font-thin tracking-wider uppercase text-[#f6f8ff] ${item.align}`}>
                      {item.links.map((link, li) => (
                        <FooterLink
                          key={li}
                          link={link}
                          ref={(el) => (flickerRefs.current.push(el))}
                          className="flicker w-fit"
                        />
                      ))}
                    </div>
                  )}

                  {item.text && (
                    <span
                      ref={(el) => (flickerRefs.current.push(el))}
                      className={` flicker label font-thin tracking-wider  uppercase text-[#f6f8ff]  transition-all duration-300  ${item.align}
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
              return <div className={`h-[25svh]  ${item.alignment} p-3 border border-white/10 rounded-md`} key={index} />;
            }

            if (item.label) {
              return (
                <div
                  ref={(el) => (flickerRefs.current.push(el))}
                  key={index} className={` h-[25svh] flicker ${item.alignment} p-3 border border-white/10 rounded-md label font-thin uppercase`}>
                  <p>
                    {item.label}
                  </p>
                </div>
              );
            }

            if (item.links) {
              return (
                <div
                  key={index} className={` h-[25svh] ${item.alignment} p-3 border border-white/10 rounded-md flex flex-col gap-2`}>
                  {item.links.map((link, i) => (
                    <FooterLink
                      ref={(el) => (flickerRefs.current.push(el))}
                      key={i}
                      link={link}
                      className="flicker label w-fit"
                    />
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
