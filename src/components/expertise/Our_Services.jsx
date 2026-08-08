"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Button from "../common/Button";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger)

const servicesContent = [
  {
    id: 1,
    title: "Website Design & Development",
    href: "/expertise/website-development",
    description:
      "Designing and building web platforms as structured systems where UX, performance, and engineering work in sync. Every layer is intentional — ensuring clarity, scalability, and long-term reliability.",
  },
  {
    id: 2,
    title: "Ecommerce Development",
    href: "/expertise/e-commerce",
    description:
      "Building commerce systems that balance experience, performance, and growth. Designed to scale with users and products while maintaining clarity, speed, and conversion efficiency.",
  },
  {
    id: 3,
    title: "Custom Software Development",
    href: "/expertise/custom-cms-development",
    description:
      "Creating tailored digital systems built around specific workflows and operational needs. Modular, scalable, and engineered for efficiency — enabling flexibility as products and teams evolve.",
  },
  {
    id: 4,
    title: "Branding, Marketing & SEO",
    href: "/expertise/branding-marketing-and-seo",
    description:
      "Developing brand and growth systems that ensure consistency across every touchpoint. From identity to visibility, each element is structured to perform, adapt, and scale over time.",
  },
];

const Our_Services = () => {
  const canvasRef = useRef(null)
  const parentRef = useRef(null)
  const stateRef = useRef({ progress: 0 })
  const imagesRef = useRef([])
  const cropRef = useRef({ sx: 0, sy: 0, sw: 0, sh: 0 })
  const drawRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const recalcCrop = () => {
      const imgs = imagesRef.current
      if (!imgs.length || !imgs[0].complete) return
      const img = imgs[0]
      const dpr = window.devicePixelRatio || 1
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height

      let sx, sy, sw, sh
      if (imgRatio > canvasRatio) {
        sh = img.height
        sw = sh * canvasRatio
        sx = (img.width - sw) / 2
        sy = 0
      } else {
        sw = img.width
        sh = sw / canvasRatio
        sx = 0
        sy = (img.height - sh) / 2
      }
      cropRef.current = { sx, sy, sw, sh }
    }

    const resizeCanvas = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const size = isMobile ? 250 : isTablet ? 300 : 400
      const dpr = window.devicePixelRatio || 1

      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      canvas.width = size * dpr
      canvas.height = size * dpr

      recalcCrop()

      if (drawRef.current) drawRef.current()
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const STRIPS = 32
    const imageSources = [
      "/images/homePage/services/website_development.svg",
      "/images/homePage/services/ecommerce.svg",
      "/images/homePage/services/customcms.svg",
      "/images/homePage/services/branding.svg",
    ]

    let loaded = 0

    function draw() {
      const { sx, sy, sw, sh } = cropRef.current
      const imgs = imagesRef.current
      if (!imgs.length || !sw || !sh) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const stripSrcH = sh / STRIPS
      const stripDstH = canvas.height / STRIPS
      const TOTAL = imgs.length - 1
      const progress = stateRef.current.progress
      const segment = Math.min(TOTAL - 1, Math.floor(progress))
      const t = progress - segment

      const current = imgs[segment]
      const next = imgs[segment + 1]
      if (!current || !next) return

      const wH = window.innerHeight;
      const cH = canvas.clientHeight;
      const t_start = 0.5 - cH / (2 * wH);
      const t_end = 0.5 + cH / (2 * wH);

      const t_active = (t - t_start) / (t_end - t_start);

      const animDuration = 3 / STRIPS;
      const stagger = (1 - animDuration) / (STRIPS - 1);

      for (let i = 0; i < STRIPS; i++) {
        const revI = STRIPS - 1 - i

        const srcY = Math.floor(sy + revI * stripSrcH)
        const nextSrcY = Math.floor(sy + (revI + 1) * stripSrcH)
        const curStripSrcH = nextSrcY - srcY

        const dstY = Math.floor(revI * stripDstH)
        const nextDstY = Math.floor((revI + 1) * stripDstH)
        const curStripDstH = nextDstY - dstY

        const delay = i * stagger
        let r = (t_active - delay) / animDuration
        r = Math.max(0, Math.min(1, r))

        const h1 = curStripDstH * (1 - r)
        if (h1 > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(0, dstY, canvas.width, Math.ceil(h1) + 1)
          ctx.clip()
          ctx.drawImage(current, sx, srcY, sw, curStripSrcH, 0, dstY, canvas.width, curStripDstH + 1)
          ctx.restore()
        }

        const h2 = curStripDstH * r
        if (h2 > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(0, dstY, canvas.width, Math.ceil(h2) + 1)
          ctx.clip()
          ctx.drawImage(next, sx, srcY, sw, curStripSrcH, 0, dstY, canvas.width, curStripDstH + 1)
          ctx.restore()
        }
      }
    }

    drawRef.current = draw

    function initScroll() {
      const TOTAL = imagesRef.current.length - 1
      gsap.to(stateRef.current, {
        progress: TOTAL,
        ease: "linear",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: draw,
      })
    }

    imageSources.forEach((src, idx) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        imagesRef.current[idx] = img

        if (loaded === imageSources.length) {
          const first = imagesRef.current[0]
          const dpr = window.devicePixelRatio || 1
          const imgRatio = first.width / first.height
          const canvasRatio = canvas.width / canvas.height

          let sx, sy, sw, sh
          if (imgRatio > canvasRatio) {
            sh = first.height
            sw = sh * canvasRatio
            sx = (first.width - sw) / 2
            sy = 0
          } else {
            sw = first.width
            sh = sw / canvasRatio
            sx = 0
            sy = (first.height - sh) / 2
          }
          cropRef.current = { sx, sy, sw, sh }
          initScroll()
          draw()
        }
      }
      imagesRef.current[idx] = img
    })
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".serv_page_paren",
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    })

    tl.to(".works_paren_header", {
      yPercent: -100,
      ease: "linear"
    })
    tl.to(".works_paren_header_in", {
      opacity: 0,
    }, "<")
  })

  return (
    <div ref={parentRef} className={`serv_page_paren  w-full padding z-10 bg-white relative py-0! h-[400vh] `}>

      <div className="sticky w-full h-screen top-0 left-0 pointer-events-none z-[-1] center  ">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
      </div>

      <div className="-mt-[100vh]">
        {servicesContent.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-full h-screen flex justify-start pt-[2.5rem] border-t last:border-b border-black/50  `}
            >
              <div className="w-full space-y-5 md:space-y-0 md:grid grid-cols-[65%_35%]">
                {/* Left */}
                <div className="  md:w-1/2">
                  <h2 data-para-effect className=" md:w-[85%] capitalize text-5xl text_blue primary-font">
                    {item.title}
                  </h2>
                </div>
                {/* Right */}
                <div className=" space-y-5 md:space-y-10 ">
                  <h3 data-para-effect className=" text-3xl secondary-font  text_blue">
                    {item.description}
                  </h3>

                  <Button link={item.href} title="View More" />

                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Our_Services;
