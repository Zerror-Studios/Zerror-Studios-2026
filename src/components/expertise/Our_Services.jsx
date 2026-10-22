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
    title: "Websites",
    href: "/expertise/websites",
    description: "Designed and built as one, by the same team. Scroll-led motion in GSAP and Next.js, planned with the page from the start, and every site set up for Google and AI search before go-live.",
  },
  {
    id: 2,
    title: "eCommerce",
    href: "/expertise/ecommerce",
    description: "Stores that sell like the brand, not like a theme. Custom Shopify builds or Zcom, our own commerce platform, with every template designed, payments connected and test orders placed before go-live.",
  },
  {
    id: 3,
    title: "Software and tools",
    href: "/expertise/software-and-tools",
    description: "Built around how your team already works. A custom CMS, dashboard or internal tool, mapped screen by screen with you, then built in stages you can try as we go.",
  },
  {
    id: 4,
    title: "Branding, marketing and SEO",
    href: "/expertise/branding-marketing-and-seo",
    description: "Seen, found, remembered. A full identity with logo, colour, type and voice, then social, campaigns and SEO, run every month by the team that made it.",
  },
];

const IMAGE_SOURCES = [
  "/images/homePage/services/website_development.svg",
  "/images/homePage/services/ecommerce.svg",
  "/images/homePage/services/customcms.svg",
  "/images/homePage/services/branding.svg",
]
const STRIPS = 32

const Our_Services = () => {
  const canvasRef = useRef(null)
  const parentRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })

    const state = { progress: 0 }
    let svgs = []      // original decoded SVG images
    let frames = []    // SVGs pre-rendered at exact canvas pixel size (cover-cropped)
    let lastKey = null
    let tween = null
    let destroyed = false

    // Render each SVG once at the canvas' exact pixel size, so per-frame drawing
    // is a cheap 1:1 copy with no scaling and stays vector-sharp.
    const buildFrames = () => {
      if (!svgs.length) return
      const W = canvas.width
      const H = canvas.height
      frames = svgs.map((img) => {
        const iw = img.naturalWidth || W
        const ih = img.naturalHeight || H
        const canvasRatio = W / H
        let sx = 0, sy = 0, sw = iw, sh = ih
        if (iw / ih > canvasRatio) {
          sw = ih * canvasRatio
          sx = (iw - sw) / 2
        } else {
          sh = iw / canvasRatio
          sy = (ih - sh) / 2
        }
        const off = document.createElement("canvas")
        off.width = W
        off.height = H
        const octx = off.getContext("2d")
        octx.imageSmoothingQuality = "high"
        octx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H)
        return off
      })
      lastKey = null
    }

    const draw = () => {
      if (frames.length < 2) return
      const W = canvas.width
      const H = canvas.height
      const TOTAL = frames.length - 1
      const progress = state.progress
      const segment = Math.min(TOTAL - 1, Math.floor(progress))
      const t = progress - segment

      const wH = window.innerHeight
      const cH = canvas.clientHeight
      const t_start = 0.5 - cH / (2 * wH)
      const t_end = 0.5 + cH / (2 * wH)
      const t_active = Math.max(0, Math.min(1, (t - t_start) / (t_end - t_start)))

      // Skip identical frames (e.g. while scrolling between transitions)
      const key = segment + ":" + t_active.toFixed(4)
      if (key === lastKey) return
      lastKey = key

      const current = frames[segment]
      const next = frames[segment + 1]

      ctx.clearRect(0, 0, W, H)

      // Fast paths: transition not started / finished
      if (t_active === 0) { ctx.drawImage(current, 0, 0); return }
      if (t_active === 1) { ctx.drawImage(next, 0, 0); return }

      const stripH = H / STRIPS
      const animDuration = 3 / STRIPS
      const stagger = (1 - animDuration) / (STRIPS - 1)

      for (let i = 0; i < STRIPS; i++) {
        const revI = STRIPS - 1 - i
        const dstY = Math.floor(revI * stripH)
        const stripPx = Math.floor((revI + 1) * stripH) - dstY

        const r = Math.max(0, Math.min(1, (t_active - i * stagger) / animDuration))

        // Source rect == dest rect (frames match canvas size), so no clip/save needed
        const h1 = Math.min(stripPx, Math.ceil(stripPx * (1 - r)) + 1)
        if (r < 1) ctx.drawImage(current, 0, dstY, W, h1, 0, dstY, W, h1)

        const h2 = Math.min(stripPx, Math.ceil(stripPx * r) + 1)
        if (r > 0) ctx.drawImage(next, 0, dstY, W, h2, 0, dstY, W, h2)
      }
    }

    const resizeCanvas = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const size = isMobile ? 300 : isTablet ? 360 : 480
      // Match the screen's density, capped at 2x to keep per-frame cost low
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const px = Math.round(size * dpr)

      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      if (canvas.width !== px) {
        canvas.width = px
        canvas.height = px
        buildFrames()
      }
      lastKey = null
      draw()
    }

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(resizeCanvas)
    }

    resizeCanvas()
    window.addEventListener("resize", onResize)

    Promise.all(
      IMAGE_SOURCES.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image()
            img.decoding = "async"
            img.onload = () => resolve(img)
            img.onerror = () => resolve(null)
            img.src = src
          })
      )
    ).then((imgs) => {
      if (destroyed) return
      svgs = imgs.filter(Boolean)
      buildFrames()
      tween = gsap.to(state, {
        progress: svgs.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
        onUpdate: draw,
      })
      draw()
    })

    return () => {
      destroyed = true
      cancelAnimationFrame(resizeRaf)
      window.removeEventListener("resize", onResize)
      if (tween) {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }
  }, [])

  useGSAP(() => {
    if (window.innerWidth < 1020) return;
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

      {/* Canvas: centered on mobile, right half on desktop */}
      <div className="sticky w-full h-screen top-0 left-0 pointer-events-none z-[-1] flex items-center justify-center md:justify-end">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="block"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />
        </div>
      </div>

      <div className="-mt-[100vh]">
        {servicesContent.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-screen flex items-start md:items-center pt-10 md:pt-0 border-t last:border-b border-black/50"
            >
              {/* Left: content */}
              <div className="w-full md:w-1/2 md:pr-16 lg:pr-24 flex flex-col gap-5 md:gap-8">
                <span className="text-sm md:text-base secondary-font text_blue">
                  {String(index + 1).padStart(2, "0")} / {String(servicesContent.length).padStart(2, "0")}
                </span>
                <h2 data-para-effect className="text-5xl text_blue primary-font">
                  {item.title}
                </h2>
                <p data-para-effect className="text-3xl secondary-font text_blue ">
                  {item.description}
                </p>
                <div className="pt-2">
                  <Button link={item.href} title="Explore" />
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
