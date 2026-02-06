import { RiArrowRightUpLine } from '@remixicon/react';
import gsap from 'gsap';
import { Link } from 'next-view-transitions'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const menuLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
    img: "/images/menu/1.webp"
  },
  {
    id: 2,
    title: "about",
    href: "/about",
    img: "/images/menu/2.webp"
  },
  {
    id: 3,
    title: "our work",
    href: "/work",
    img: "/images/menu/3.webp"
  },
  {
    id: 4,
    title: "expertise",
    href: "/expertise",
    img: "/images/menu/4.webp",
    sublinks: [
      "Website Development",
      "E-commerce Development",
      "Custom CMS Development",
      "Branding, Marketing & SEO"
    ]
  },
  {
    id: 5,
    title: "contact",
    href: "/contact",
    img: "/images/menu/5.webp"
  },
]

const socialLinks = [
  {
    title: "instagram",
    href: ""
  }, {
    title: "linkedin",
    href: ""
  },
  {
    title: "behance",
    href: ""
  }
]

const Header = () => {

  const [openMenu, setOpenMenu] = useState(false)

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
      openMenuTl.to(".menu_img_paren", {
        // clipPath: "inset(0%)",
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1
      }, "<+=0.1")
      openMenuTl.to(".menu_img", {
        scale: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1
      }, "<")
      openMenuTl.to([".menu_title_a", ".social_anim_links"], {
        transform: "translateY(0%)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.1
      }, "<")
      openMenuTl.to(".sublinks_title_paren", {
        opacity: 1,
        transform: "translateY(0%)",
        duration: 1,
        ease: "expo.out",
        stagger: 0.1
      }, "<+=0.5")

    } else {
      if (window.lenis) { window.lenis.start() }
      const closeMenuTl = gsap.timeline();
      closeMenuTl.to(".sublinks_title_paren", {
        opacity: 0,
        transform: "translateY(1rem)",
        duration: 1,
        ease: "expo.out",
        stagger: {
          amount: 0.1,
          from: "end"
        }
      })
      closeMenuTl.to([".menu_title_a", ".social_anim_links"], {
        transform: "translateY(115%)",
        duration: 1,
        ease: "expo.out",
        stagger: {
          amount: 0.1,
          from: "end"
        }
      }, "<")
      closeMenuTl.to(".menu_img_paren", {
        // clipPath: "inset(50%)",
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: {
          amount: 0.1,
          from: "end"
        }
      }, "<")
      closeMenuTl.to(".menu_img", {
        scale: 1.5,
        duration: 1,
        ease: "expo.out",
        stagger: {
          amount: 0.1,
          from: "end"
        }
      }, "<")
      closeMenuTl.to(".drop_menu", {
        height: "0",
        pointerEvents: "none",
        opacity: 0,
        duration: .5,
        ease: "expo.out"
      }, "<+=0.2")
    }

  }, [openMenu])

  return (
    <>
      <div className="w-full pointer-events-none fixed py-5  z-[9999] center">
        <div className="w-full relative z-[99999] flex justify-center gap-x-3 ">
          <div onClick={() => setOpenMenu(false)} className={`w-full h-screen fixed bg-black/20 backdrop-blur-sm z-[9] top-0 left-0 transition-all duration-300 ease-out ${openMenu ? " pointer-events-auto opacity-100" : " opacity-0 pointer-events-none"} `}></div>

          <div onClick={() => setOpenMenu(!openMenu)} className={`menu_paren pointer-events-auto relative z-[100] w-[80vw] md:w-[38vw]  rounded-lg  transition-all duration-300 ease-out ${openMenu ? "rounded-b bg-white" : "bg-black/15! backdrop-blur-[1.25rem]"}  `}>

            <div className={`menu_header   cursor-pointer group px-6 w-full flex items-center justify-between h-12    `}>
              <div className="relative flex items-center ">
                <div className="absolute block overflow-hidden w-20 ">
                  <Image width={50} height={20} className={`w-full ${openMenu ? "translate-y-0" : " translate-y-5 "}  transition-all duration-300 ease-out `} src="/logo.svg" alt="" />
                </div>
                <p className={`uppercase text-sm leading-none translate-y-[1px] text-white ${openMenu ? "opacity-0" : ""} transition-all duration-300 ease-out `}>MENU</p>
              </div>
              <div className={`ros_paren flex flex-col transition-all duration-150 ease-out ${openMenu ? "gap-y-0" : " gap-y-1 group-hover:gap-y-2.5"} `}>
                <div className={`w-7 bar_1   h-px   transition-all duration-150 ease-out ${openMenu ? "rotate-[40deg] translate-y-[1px] bg_blue" : "bg-white"} `}></div>
                <div className={`w-7 bar_2   h-px   transition-all duration-150 ease-out  ${openMenu ? "-rotate-[40deg] bg_blue" : "bg-white"} `}></div>
              </div>
            </div>

            <div className=" drop_menu h-0 opacity-0 overflow-hidden pointer-events-none w-full bg-white rounded-b-lg   ">
              <div className="">
                {
                  menuLinks.map((menu) => (
                    <Link onClick={() => setOpenMenu(false)} href={menu.href} key={menu.id} className={`w-full relative  text_blue  capitalize  border-b border-black/10 py-4 flex flex-col md:flex-row  justify-between ${pathname === menu.href ? "" : "group"} `}>
                      {pathname === menu.href && <div className="w-full h-full  absolute  bg-[#00000010] top-0 left-0 z-[9]"></div>}
                      <div className="flex px-6 gap-x-3">
                        <div
                          className=" menu_img_paren opacity-0 aspect-[4.25/3] group-hover:aspect-[5/3] transition-all duration-300 ease-out overflow-hidden rounded-xs h-[4.5rem] ">
                          <Image width={100} height={75} src={menu.img} alt="" className={` menu_img  cover scale-[1.5] ${pathname === menu.href ? "grayscale-100" : ""} `} />
                        </div>
                        <div className="w-fit h-fit block overflow-hidden translate-y-[1.55rem]">
                          <p className={`menu_title_a font-medium text-lg  translate-y-[115%] leading-none ${pathname === menu.href ? "opacity-[.4]" : ""} `}>{menu.title}</p>
                        </div>
                      </div>
                      {menu.sublinks && (
                        <div className=" max-sm:hidden mt-5 md:mt-0 w-full md:w-1/2 relative border-l border-r border-black/10 px-6 gap-y-5 gap-x-5 grid grid-cols-2">
                          <div className=" h-full absolute top-0 left-[47%] border-l border-black/10"></div>
                          {
                            menu.sublinks?.map((sublink, i) => (
                              <div key={i} className="  sublinks_title_paren translate-y-4 w-full opacity-0 text-sm space-y-2 hover:pl-2 transition-all duration-150">
                                <p className=' leading-none font-semibold'>0{i + 1}/</p>
                                <p className=' leading-4 w-[95%]'>{sublink}</p>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </Link>
                  ))
                }
              </div>
              <div className=" py-4 px-6  flex flex-col gap-y-2">
                {socialLinks.map((link, i) => (
                  <Link href={link.href} target='_blank' key={i} className="w-fit overflow-hidden  pb-1 text_blue group    ">
                    <div className=" social_anim_links capitalize translate-y-[115%] relative flex items-center ">
                      <div className="w-0 group-hover:w-full transition-all duration-300 h-px bg_blue absolute -bottom-1 "></div>
                      <p className='leading-none'>{link.title}</p>
                      {/* <RiArrowRightUpLine size={14} /> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          <Link href={`${pathname === "/deck" ? "/" : "/deck"}`} className='relative z-[100] h-fit pointer-events-auto'>
            <div className={` menu_deck relative w-16 h-12 cursor-pointer group ${openMenu ? " bg-white" : "bg-black/15! backdrop-blur-[1.25rem]"} transition-all duration-300  rounded-lg overflow-hidden flex items-center relative justify-center`}>
              <div className={`w-4  h-3 border  rounded-xs group-hover:top-1/2 group-hover:left-1/2  transition-all duration-300 absolute top-[55%] left-[54%] ${openMenu ? "border-[#002bba]" : "border-[#fafafa]"}  -translate-x-[50%] -translate-y-[50%] `}></div>
              <div className={`w-4  h-3 border-l border-t  group-hover:top-1/2 group-hover:left-1/2  rounded-xs transition-all duration-300 absolute top-[50%] left-[50%] ${openMenu ? "border-[#002bba]" : "border-[#fafafa]"}  -translate-x-[50%] -translate-y-[50%] `}></div>
              <div className={`w-4  h-3 border-l border-t  group-hover:top-1/2 group-hover:left-1/2  rounded-xs transition-all duration-300 absolute top-[45%] left-[46%]  ${openMenu ? "border-[#002bba]" : "border-[#fafafa]"} -translate-x-[50%] -translate-y-[50%] `}></div>
            </div>
          </Link>


        </div>
      </div>
    </>
  )
}

export default Header