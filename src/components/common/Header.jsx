import gsap from 'gsap';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ViewTransitionLink from '../hooks/ViewTransitionLink';
import { Link } from 'next-view-transitions';
import { useGSAP } from '@gsap/react';
import AnimatedPixelIcon from '../animation/AnimatedPixelIcon';

const menuLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "About us",
    href: "/about",
  },
  {
    id: 3,
    title: "Our Works",
    href: "/work",
  },
  {
    id: 4,
    title: "Expertise",
    href: "/expertise",
    sublinks: [
      "Website Development",
      "E-commerce Development",
      "Custom CMS Development",
      "Branding, Marketing & SEO"
    ]
  },
  {
    id: 5,
    title: "Contact",
    href: "/contact",
  },
]

const Header = () => {

  const [openMenu, setOpenMenu] = useState(false)
  const [openExpertise, setOpenExpertise] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    if (openMenu) {
      if (window.lenis) { window.lenis.stop() }
      const openMenuTl = gsap.timeline();
      openMenuTl.to(".drop_menu", {
        height: "auto",
        pointerEvents: "auto",
        opacity: 1,
        duration: .5,
        ease: "expo.out"
      })
      openMenuTl.to([".menu_title_a", ".sublinks_anim"], {
        transform: "translateY(0%)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.05
      }, "<")
    } else {
      if (window.lenis) { window.lenis.start() }
      const closeMenuTl = gsap.timeline();
      closeMenuTl.to([".menu_title_a", ".sublinks_anim"], {
        transform: "translateY(115%)",
        duration: 0.5,
        ease: "expo.out",
      })
      closeMenuTl.to(".drop_menu", {
        height: "0",
        pointerEvents: "none",
        opacity: 0,
        duration: .5,
        ease: "expo.out"
      }, "<")
      setTimeout(() => setOpenExpertise(false), 500); 
    }
  }, [openMenu])

  useGSAP(() => {
    gsap.to(".header_paren", {
      transform: "translateY(0)",
      delay: 1,
      ease: "power2.inOut"
    })
  })

  return (
    <>
      <div className="header_paren -translate-y-24 w-full pointer-events-none fixed py-5! padding z-9999 center">
        <div className="w-full relative z-99999 flex justify-center gap-x-1 md:gap-x-3 ">
          <div onClick={() => setOpenMenu(false)} className={`w-full h-screen fixed bg-black/20 backdrop-blur-sm z-9 top-0 left-0 transition-all duration-500 ${openMenu ? " pointer-events-auto opacity-100" : " opacity-0 pointer-events-none"} `}></div>

          <div className={`menu_paren pointer-events-auto relative z-100 w-[90vw] md:w-[45vw] max-w-125 rounded-lg transition-all duration-300 ease-out ${openMenu ? "bg-[#ffffff] " : "bg-black/15! backdrop-blur-[1.25rem]"} `}>

            <div onClick={() => setOpenMenu(!openMenu)} className={`menu_header cursor-pointer group px-6 w-full flex items-center justify-between h-14 `}>
              <div className="relative flex items-center w-25">
                <div className="block overflow-hidden w-5 h-5 relative">
                  <Image fill className={`object-contain transition-all duration-300 ease-out`} src="/svg/letter_z.svg" alt="logo" />
                </div>
                <div className={`block overflow-hidden w-26 h-26 absolute ${openMenu ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-out `}>
                  <Image fill className={` absolute object-contain transition-all duration-300 ease-out`} src="/svg/zerror.svg" alt="logo" />
                </div>
              </div>
              <div className="flex-1 flex justify-center relative h-full items-center">
                <p className={`absolute text-sm   uppercase  ${openMenu ? "opacity-100" : "opacity-0"} text_blue transition-all duration-300 ease-out whitespace-nowrap`}>Cases With Teeth</p>
                <p className={`absolute  text-sm text-white uppercase  ${!openMenu ? "opacity-100" : "opacity-0"} transition-all duration-300 ease-out`}>Menu</p>
              </div>

              <div onClick={(e) => setOpenMenu(!openMenu)} className={`ros_paren flex flex-col justify-center items-end w-25 transition-all duration-150 ease-out ${openMenu ? "gap-y-0" : " gap-y-1.5 group-hover:gap-y-2"} `}>
                <div className={`w-6 h-px transition-all duration-150 ease-out ${openMenu ? "rotate-45 translate-y-px bg-[#002bba]" : "bg-white"} `}></div>
                <div className={`w-6 h-px transition-all duration-150 ease-out ${openMenu ? "-rotate-45 bg-[#002bba]" : "bg-white"} `}></div>
              </div>
            </div>

            <div className="drop_menu h-0 opacity-0 overflow-hidden pointer-events-none w-full bg-[#ffffff] rounded-b-lg">
              <nav className="flex flex-col">
                {menuLinks.map((menu) => (
                  <div key={menu.id} className=" group w-full relative text_blue border-b border-black/10 flex flex-col">
                    <div
                      className={`flex justify-between items-center px-6 h-14 cursor-pointer hover:bg-[#002bba20] transition-colors`}
                      onClick={() => {
                        if (menu.sublinks) {
                          setOpenExpertise(!openExpertise);
                        } else {
                          setOpenMenu(false);
                        }
                      }}
                    >
                      {menu.sublinks ? (
                        <div className="w-full flex justify-between items-center">
                          <div className={`flex items-center gap-x-0 group-hover:gap-x-2 transition-all duration-300 overflow-hidden ${openExpertise && "gap-x-2"} `}>
                            <div className={`w-0 group-hover:opacity-100 group-hover:w-2 transition-all duration-300 opacity-0 -translate-y-0.5 ${openExpertise && "w-2 opacity-100"}`}>
                              <AnimatedPixelIcon />
                            </div>
                            <div className="overflow-hidden">
                              <p className="menu_title_a translate-y-[115%] ">{menu.title}</p>
                            </div>
                          </div>
                          <div className="overflow-hidden -translate-y-0.5">
                            <span className="menu_title_a translate-y-[115%] text-xl leading-none">...</span>
                          </div>
                        </div>
                      ) : (
                        <ViewTransitionLink href={menu.href} onClick={() => setOpenMenu(false)} delay={500} className="w-full h-full flex items-center">
                          <div className=" relative overflow-hidden flex gap-x-0 group-hover:gap-x-2 transition-all duration-300 items-center">
                            <div className=" w-0 group-hover:opacity-100 group-hover:w-2 transition-all duration-300 opacity-0 -translate-y-0.5">
                              <AnimatedPixelIcon />
                            </div>
                            <p className={`menu_title_a translate-y-[115%] `}>{menu.title}</p>
                          </div>
                        </ViewTransitionLink>
                      )}
                    </div>

                    {menu.sublinks && (
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openExpertise ? "max-h-64" : "max-h-0"}`}>
                        <div className="flex flex-col">
                          {menu.sublinks.map((sublink, i) => (
                            <ViewTransitionLink
                              key={i}
                              href="/expertise"
                              delay={500}
                              onClick={() => setOpenMenu(false)}
                              className="group/sublink flex items-center py-3 pl-10 hover:bg-[#002bba20] transition-all duration-300"
                            >
                              <div className="w-0 opacity-0 overflow-hidden -translate-y-0.5 transition-all duration-300 group-hover/sublink:w-4 group-hover/sublink:opacity-100">
                                <AnimatedPixelIcon />
                              </div>

                              <p className="text_blue transition-all duration-300 ">
                                {sublink}
                              </p>
                            </ViewTransitionLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-6 flex flex-col gap-y-3">
                <button className="w-full py-4 text-sm   text-white bg_blue border border-transparent hover:border-[#002bba] hover:bg-transparent! hover:text-[#002bba] transition-all duration-300 uppercase">
                  Our Pitchdeck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header