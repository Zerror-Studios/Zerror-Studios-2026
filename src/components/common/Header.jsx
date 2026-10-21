import { getCalApi } from "@calcom/embed-react";
import gsap from 'gsap';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ViewTransitionLink from '../hooks/ViewTransitionLink';
import { useGSAP } from '@gsap/react';
import AnimatedPixelIcon from '../animation/AnimatedPixelIcon';
import { useProjectForm } from "@/context/ProjectFormContext";
import PixelGridCanvas from './PixelGridCanvas';
import { FORM_MESSAGES, SERVICE_OPTIONS, isValidEmail, failureKind } from "@/lib/formMessages";
import { notifySuccess, showFailure, showFieldErrors } from "@/lib/notify";
import { trackLead } from "@/lib/analytics";

const menuLinks = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Work",
    href: "/work",
  },
  {
    id: 3,
    title: "About",
    href: "/about",
  },
  {
    id: 4,
    title: "What we do",
    href: "/expertise",
    sublinks: [
      { title: "Websites", href: "/expertise/websites" },
      { title: "eCommerce", href: "/expertise/ecommerce" },
      { title: "Software and tools", href: "/expertise/software-and-tools" },
      { title: "Branding and marketing", href: "/expertise/branding-and-marketing" },
    ]
  },
  {
    id: 5,
    title: "Contact",
    href: "/contact",
  },
]

const Header = () => {
  const { openProjectForm, isOpen, closeProjectForm } = useProjectForm();
  const [openMenu, setOpenMenu] = useState(false)
  const [openExpertise, setOpenExpertise] = useState(false)
  const pathname = usePathname();
  const [hoveredMenuBtn, setHoveredMenuBtn] = useState(null);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectKinds, setProjectKinds] = useState([]);
  const [projectFormData, setProjectFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    details: "",
  });
  const [projectLoading, setProjectLoading] = useState(false);
  // "idle" | "sent" | "error" | "offline"
  const [projectStatus, setProjectStatus] = useState("idle");
  const [projectErrors, setProjectErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setOpenMenu(true);
      setShowProjectForm(true);
    } else {
      setShowProjectForm(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!openMenu) {
      const timer = setTimeout(() => {
        setShowProjectForm(false);
        closeProjectForm();
        setProjectStatus("idle");
        setProjectErrors({});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [openMenu, closeProjectForm]);

  useEffect(() => {
    if (openMenu) {
      const activePanel = document.querySelector(showProjectForm ? ".project-panel" : ".menu-panel");
      if (activePanel) {
        const targetHeight = activePanel.scrollHeight;
        const currentHeight = document.querySelector(".drop_menu")?.offsetHeight || 0;

        gsap.set(".drop_menu", { height: currentHeight });

        gsap.to(".drop_menu", {
          height: targetHeight,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(".drop_menu", { height: "auto" });
          }
        });
      }
    }
  }, [showProjectForm, openMenu]);

  const handleToggleKind = (kind) => {
    if (projectKinds.includes(kind)) {
      setProjectKinds(projectKinds.filter((k) => k !== kind));
    } else {
      setProjectKinds([...projectKinds, kind]);
      setProjectErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (projectErrors[name]) {
      setProjectErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (projectLoading) return;

    const errors = {};
    if (projectKinds.length === 0) errors.services = FORM_MESSAGES.fields.services;
    if (!projectFormData.name.trim()) errors.name = FORM_MESSAGES.fields.name;
    if (!isValidEmail(projectFormData.email)) errors.email = FORM_MESSAGES.fields.email;

    setProjectErrors(errors);
    showFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setProjectStatus("offline");
      showFailure("offline");
      return;
    }

    setProjectStatus("idle");
    setProjectLoading(true);
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectKinds,
          ...projectFormData,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        trackLead("start_project");
        notifySuccess(FORM_MESSAGES.sentTitle, "We read every message ourselves and will be in touch soon.");
        setProjectStatus("sent");
        setProjectFormData({
          name: "",
          email: "",
          companyName: "",
          details: "",
        });
        setProjectKinds([]);
      } else {
        setProjectStatus("error");
        showFailure("error");
      }
    } catch (err) {
      console.error(err);
      const kind = failureKind();
      setProjectStatus(kind);
      showFailure(kind);
    } finally {
      setProjectLoading(false);
    }
  };

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

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "45min" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#002bba" },
          dark: { "cal-brand": "#ffffff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  // On the pitch deck the bar stays hidden, but the project form can still open from it
  const hideBar = pathname === "/pitchdeck" && !openMenu;

  return (
    <>
      <div className={`header_wrapper fixed w-full flex justify-center z-9999 top-0 transition-[opacity,visibility] duration-500 ${hideBar ? "opacity-0 invisible" : "opacity-100 visible"}`}>
        <div className="header_paren -translate-y-24 w-full py-5! pointer-events-none fixed padding  center">
          <div className="w-full relative z-99999 flex justify-center gap-x-1 md:gap-x-3 ">
            <div onClick={() => setOpenMenu(false)} className={`w-full h-screen fixed bg-black/20 backdrop-blur-xs z-9 top-0 left-0 transition-all duration-500 ${openMenu ? " pointer-events-auto opacity-100" : " opacity-0 pointer-events-none"} `}></div>

            <div className={`menu_paren pointer-events-auto relative z-100 w-full md:w-[30vw]  rounded-xl backdrop-blur-sm transition-all duration-300 ease-out ${openMenu ? "bg-black/25  shadow-xl shadow-black/10" : "bg-black/20  shadow-lg shadow-black/5"} `}>

              <div onClick={() => setOpenMenu(!openMenu)} className={`menu_header cursor-pointer group px-6 w-full flex items-center justify-between h-14 `}>
                <div className="relative flex items-center w-25">
                  <div className="block overflow-hidden w-20 h-20 relative">
                    <Image fill className={`object-contain transition-all duration-300 ease-out ${openMenu ? "" : ""}`} src="/logo_white.svg" alt="logo" />
                  </div>
                </div>
                <div className="flex-1 flex justify-center relative h-3 items-center text-center whitespace-nowrap overflow-hidden">
                  <p className={`absolute text-sm  text-white font-medium uppercase  ${openMenu ? "-translate-y-full" : ""} transition-all duration-300 ease-out `}>Menu</p>
                </div>

                <div onClick={(e) => setOpenMenu(!openMenu)} className={`ros_paren flex flex-col justify-center items-end w-25 transition-all duration-150 ease-out ${openMenu ? "gap-y-0" : " gap-y-1.5 group-hover:gap-y-2"} `}>
                  <div className={`w-6 h-px transition-all duration-150 ease-out bg-[#ffffff]`}></div>
                  <div className={`w-6 h-px transition-all duration-150 ease-out bg-[#ffffff]`}></div>
                </div>
              </div>

              <div className="drop_menu h-0 opacity-0 overflow-hidden pointer-events-none w-full rounded-b-xl relative">

                {/* Menu Panel */}
                <div className={`menu-panel transition-all duration-300 ${!showProjectForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"}`}>
                  <nav className="flex flex-col">
                    {menuLinks.map((menu) => (
                      <div key={menu.id} className="group w-full relative first:border-t text-white border-b border-white/20 flex flex-col">
                        <div
                          className={`flex justify-between items-center px-6 h-14 cursor-pointer hover:bg-white/10 transition-colors`}
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
                                <div className="menu_title_a translate-y-[115%] flex items-center gap-x-0.75">
                                  <div className="size-0.75 bg-white"></div>
                                  <div className="space-y-0.75">
                                    <div className={`size-0.75 bg-white transition-all duration-300 ${openExpertise ? "translate-y-1.5" : ""} `}></div>
                                    <div className="size-0.75 bg-white"></div>
                                    <div className={`size-0.75 bg-white transition-all duration-300 ${openExpertise ? "-translate-y-1.5" : ""} `}></div>
                                  </div>
                                  <div className="size-0.75 bg-white"></div>
                                </div>
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
                          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openExpertise ? "max-h-64 " : "max-h-0"}`}>
                            <div className="flex flex-col">
                              {menu.sublinks.map((sublink, i) => (
                                <ViewTransitionLink
                                  key={i}
                                  href={sublink.href}
                                  delay={500}
                                  onClick={() => setOpenMenu(false)}
                                  className="group/sublink flex items-center py-3 pl-6 hover:bg-white/10 transition-all duration-300"
                                >
                                  <div className=" relative center size-4">
                                    <div className=" group-hover/sublink:opacity-0 transition-opacity duration-300 size-4 absolute center inset-0">
                                      <div className="size-1 aspect-square -translate-x-1/2 -translate-y-[30%] bg-[#ffffff] shrink-0 "></div>
                                    </div>
                                    <div className="w-0 opacity-0 overflow-hidden -translate-y-0.5 transition-all duration-300 group-hover/sublink:w-4 group-hover/sublink:opacity-100">
                                      <AnimatedPixelIcon />
                                    </div>
                                  </div>

                                  <p className="text-[#ffffff] transition-all duration-300 ">
                                    {sublink.title}
                                  </p>
                                </ViewTransitionLink>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>

                  <div className="p-6 py-2">
                    <ViewTransitionLink
                      href="/pitchdeck"
                      delay={500}
                      onMouseEnter={() => setHoveredMenuBtn('pitchdeck')}
                      onMouseLeave={() => setHoveredMenuBtn(null)}
                      onClick={() => setOpenMenu(false)}
                      className="group relative overflow-hidden w-full rounded-sm py-4 text-xs center border border-[#ffffff50] bg-transparent text-[#ffffff] hover:text-black transition-colors duration-300 uppercase flex"
                    >
                      <PixelGridCanvas
                        isActive={hoveredMenuBtn === 'pitchdeck'}
                        boxSize={12}
                        color="#ffffff"
                        duration={0.6}
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                      />
                      <span className="relative z-10 transition-colors duration-300">Pitch deck</span>
                    </ViewTransitionLink>
                  </div>

                  <div className="w-full pt-0 p-6 grid grid-cols-2 gap-x-1">
                    <div
                      data-cal-namespace="45min"
                      data-cal-link="zerror-studios-0hosjx/schedule-a-call"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
                      onMouseEnter={() => setHoveredMenuBtn('call')}
                      onMouseLeave={() => setHoveredMenuBtn(null)}
                      className="group relative overflow-hidden bg-transparent text-black hover:text-[#ffffff] border border-[#ffffff50] transition-colors duration-300 rounded-sm text-xs uppercase py-4 center cursor-pointer"
                    >
                      <PixelGridCanvas
                        isActive={hoveredMenuBtn !== 'call'}
                        boxSize={12}
                        color="#ffffff"
                        duration={0.6}
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                      />
                      <span className="relative z-10 transition-colors duration-300">Schedule a call</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredMenuBtn('project')}
                      onMouseLeave={() => setHoveredMenuBtn(null)}
                      onClick={() => {
                        setShowProjectForm(true);
                      }}
                      className="group relative overflow-hidden bg-transparent text-black hover:text-[#ffffff] border border-[#ffffff50] transition-colors duration-300 rounded-sm text-xs uppercase py-4 center cursor-pointer"
                    >
                      <PixelGridCanvas
                        isActive={hoveredMenuBtn !== 'project'}
                        boxSize={12}
                        color="#ffffff"
                        duration={0.6}
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                      />
                      <span className="relative z-10 transition-colors duration-300">Start a project</span>
                    </div>
                  </div>
                </div>

                {/* Project Form Panel */}
                <div className={`project-panel transition-all duration-300 p-6 flex flex-col gap-4 ${showProjectForm ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none absolute  inset-x-0 top-0  overflow-hidden"}`}>

                  {projectStatus === "sent" ? (
                    <div className="flex flex-col gap-4 text-white text-left">
                      <p className="text-xl leading-tight">{FORM_MESSAGES.sentTitle}</p>
                      <p className="text-white/80 leading-tight">{FORM_MESSAGES.sentText}</p>
                      <ViewTransitionLink
                        href="/work"
                        delay={500}
                        onMouseEnter={() => setHoveredMenuBtn('sent')}
                        onMouseLeave={() => setHoveredMenuBtn(null)}
                        onClick={() => setOpenMenu(false)}
                        className="group relative overflow-hidden w-full rounded-sm py-4 mt-2 text-xs center border border-[#ffffff50] bg-transparent text-[#ffffff] hover:text-black transition-colors duration-300 uppercase flex"
                      >
                        <PixelGridCanvas
                          isActive={hoveredMenuBtn === 'sent'}
                          boxSize={12}
                          color="#ffffff"
                          duration={0.6}
                          className="absolute inset-0 w-full h-full pointer-events-none z-0"
                        />
                        <span className="relative z-10 transition-colors duration-300">{FORM_MESSAGES.sentButton}</span>
                      </ViewTransitionLink>
                    </div>
                  ) : (
                  <form onSubmit={handleProjectSubmit} noValidate className="flex flex-col gap-4 text-white">

                    {/* Project Kinds */}
                    <div className="flex flex-col gap-2">
                      <label className="  text-white/80 text-left">What kind of project?</label>
                      <div className="flex flex-wrap gap-1">
                        {SERVICE_OPTIONS.map((kind) => {
                          const isActive = projectKinds.includes(kind);
                          return (
                            <button
                              key={kind}
                              type="button"
                              onClick={() => handleToggleKind(kind)}
                              className={`px-3 py-1.5 text-sm  pb-1  rounded border transition-all duration-200 cursor-pointer ${isActive
                                ? "bg-[#fcf7f2] border-[#fcf7f2] text-black"
                                : "bg-transparent border-white/20 text-white hover:bg-white/10"
                                }`}
                            >
                              {kind}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col  text-left">
                      <label className="  text-white/80">What's your name?</label>
                      <input
                        type="text"
                        name="name"
                        value={projectFormData.name}
                        onChange={handleInputChange}
                        placeholder="Jane Doe"
                        aria-invalid={!!projectErrors.name}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-1.5  text-white placeholder-white/30 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col  text-left">
                      <label className="  text-white/80">Your email</label>
                      <input
                        type="email"
                        name="email"
                        value={projectFormData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        aria-invalid={!!projectErrors.email}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-1.5  text-white placeholder-white/30 focus:outline-none transition-colors"
                      />
                    </div>
                    {/* Company Name */}
                    <div className="flex flex-col  text-left">
                      <label className="  text-white/80">
                        What is your company's name? <span className="text-white/40 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={projectFormData.companyName}
                        onChange={handleInputChange}
                        placeholder="Acme Inc."
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-1.5  text-white placeholder-white/30 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Project details */}
                    <div className="flex flex-col  relative text-left">
                      <label className="  text-white/80">What should we know?</label>
                      <textarea
                        data-lenis-prevent
                        name="details"
                        rows={6}
                        value={projectFormData.details}
                        onChange={handleInputChange}
                        placeholder="Goals, timeline, budget - whatever you've got"
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-1.5  text-white placeholder-white/30 focus:outline-none transition-colors resize-none"
                      />
                      <div className="absolute right-0 bottom-1 pointer-events-none opacity-20 text-white select-none text-[6px]">
                        ◢
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onMouseEnter={() => setHoveredMenuBtn('cancel')}
                        onMouseLeave={() => setHoveredMenuBtn(null)}
                        onClick={() => {
                          setShowProjectForm(false);
                          closeProjectForm();
                          setProjectStatus("idle");
                          setProjectErrors({});
                        }}
                        className="group relative overflow-hidden bg-transparent text-black hover:text-[#ffffff] border border-[#ffffff50] transition-colors duration-300 rounded-sm text-xs uppercase py-4 center cursor-pointer"
                      >
                        <PixelGridCanvas
                          isActive={hoveredMenuBtn !== 'cancel'}
                          boxSize={12}
                          color="#ffffff"
                          duration={0.6}
                          className="absolute inset-0 w-full h-full pointer-events-none z-0"
                        />
                        <span className="relative z-10 transition-colors duration-300">Cancel</span>
                      </button>
                      <button
                        type="submit"
                        disabled={projectLoading}
                        aria-busy={projectLoading}
                        onMouseEnter={() => setHoveredMenuBtn('submit')}
                        onMouseLeave={() => setHoveredMenuBtn(null)}
                        className={`group relative overflow-hidden bg-transparent text-black hover:text-[#ffffff] border border-[#ffffff50] transition-colors duration-300 rounded-sm text-xs uppercase py-4 center ${projectLoading ? "cursor-wait" : "cursor-pointer"}`}
                      >
                        <PixelGridCanvas
                          isActive={hoveredMenuBtn !== 'submit'}
                          boxSize={12}
                          color="#ffffff"
                          duration={0.6}
                          className="absolute inset-0 w-full h-full pointer-events-none z-0"
                        />
                        <span className="relative z-10 transition-colors duration-300">
                          {projectLoading ? FORM_MESSAGES.sending : FORM_MESSAGES.send}
                        </span>
                      </button>
                    </div>

                    <p className="text-xs text-white/50 text-left">
                      By sending this, you agree to our{" "}
                      <ViewTransitionLink
                        href="/privacy"
                        delay={500}
                        onClick={() => setOpenMenu(false)}
                        className="underline underline-offset-2 hover:text-white transition-colors duration-300"
                      >
                        Privacy policy
                      </ViewTransitionLink>
                      .
                    </p>
                  </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
