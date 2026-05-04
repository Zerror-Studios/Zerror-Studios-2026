"use client";
import React, { useEffect, useRef } from "react";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Button from "../common/Button";

gsap.registerPlugin(ScrollTrigger)


const servicesContent = [
  {
    id: 1,
    title: "Website Design & Development",
    description:
      "Designing and building web platforms as structured systems where UX, performance, and engineering work in sync. Every layer is intentional — ensuring clarity, scalability, and long-term reliability.",
  },
  {
    id: 2,
    title: "Custom Software Development",
    description:
      "Creating tailored digital systems built around specific workflows and operational needs. Modular, scalable, and engineered for efficiency — enabling flexibility as products and teams evolve.",
  },
  {
    id: 3,
    title: "Ecommerce Development",
    description:
      "Building commerce systems that balance experience, performance, and growth. Designed to scale with users and products while maintaining clarity, speed, and conversion efficiency.",
  },
  {
    id: 4,
    title: "Branding, Marketing & SEO",
    description:
      "Developing brand and growth systems that ensure consistency across every touchpoint. From identity to visibility, each element is structured to perform, adapt, and scale over time.",
  },
];

const Our_Services = () => {

  const canvasRef = useRef(null)
  const parentRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const STRIPS = 32
    const imageSources = [
      "/images/expertisePage/bit-mano.svg",
      "/images/expertisePage/bit-pocima.svg",
      "/images/expertisePage/bit-reloj.svg",
      "/images/expertisePage/bit-trofeo.svg",
    ]

    const images = []
    let loaded = 0
    const state = { progress: 0 }

    let sx = 0, sy = 0, sw = 0, sh = 0

    function setupImage(img) {
      const imgRatio = img.width / img.height
      const canvasRatio = canvas.width / canvas.height

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
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const stripSrcH = sh / STRIPS
      const stripDstH = canvas.height / STRIPS

      const TOTAL = images.length - 1
      const segment = Math.min(TOTAL - 1, Math.floor(state.progress))
      const t = state.progress - segment // 0 → 1

      const current = images[segment]
      const next = images[segment + 1]

      const stagger = 0.6 / STRIPS
      const animDuration = 0.1

      for (let i = 0; i < STRIPS; i++) {
        const revI = STRIPS - 1 - i

        const srcY = sy + revI * stripSrcH
        const dstY = revI * stripDstH

        const delay = i * stagger

        let r = (t - delay) / animDuration
        r = Math.max(0, Math.min(1, r))

        const h1 = stripDstH * (1 - r)
        if (h1 > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(
            0,
            dstY + (stripDstH - h1),
            canvas.width,
            h1
          )
          ctx.clip()
          ctx.drawImage(
            current,
            sx, srcY, sw, stripSrcH,
            0, dstY,
            canvas.width, stripDstH
          )
          ctx.restore()
        }

        const h2 = stripDstH * r
        if (h2 > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.rect(
            0,
            dstY + (stripDstH - h2),
            canvas.width,
            h2
          )
          ctx.clip()
          ctx.drawImage(
            next,
            sx, srcY, sw, stripSrcH,
            0, dstY,
            canvas.width, stripDstH
          )
          ctx.restore()
        }
      }
    }


    function initScroll() {
      const TOTAL = images.length - 1

      gsap.to(state, {
        progress: TOTAL,
        ease: "linear",
        scrollTrigger: {
          trigger: parentRef.current,
          start: "4% top",
          end: "103% bottom",
          scrub: true
        },
        onUpdate: draw
      })
    }
    imageSources.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        if (loaded === imageSources.length) {
          setupImage(img)
          initScroll()
          draw()
        }
      }
      images.push(img)
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])


  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

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

    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])


  return (
    <div ref={parentRef} className={` serv_page_paren  w-full padding relative py-0! h-[400vh] `}>

      <div className="sticky w-full h-screen top-0 pointer-events-none z-[-1] center  ">
        <canvas
          ref={canvasRef}
          className="block"
        />
      </div>

      <div className="absolute padding  w-full h-screen left-0 top-0">
        <div className="w-full h-screen pt-[2.5rem] md:pt-0 space-y-5 md:space-y-0 md:grid grid-cols-[70%_30%]">
          <div className="  md:w-1/2">
            <h2 className=" md:w-[70%]  capitalize text-5xl text_blue primary-font">
              {servicesContent[0].title}
            </h2>
          </div>
          <div className=" space-y-5 md:space-y-10 ">
            <h3 className="text-3xl secondary-font  text_blue">
              {servicesContent[0].description}
            </h3>

            {/* <Button title="View More" /> */}

          </div>
        </div>
      </div>

      {servicesContent.slice(1, 4).map((item, index) => {
        return (
          <div
            key={index}
            className={`w-full h-screen flex justify-start pt-[2.5rem] border-t border-black/50  `}
          >
            <div className="w-full space-y-5 md:space-y-0 md:grid grid-cols-[70%_30%]">
              {/* Left */}
              <div className="  md:w-1/2">
                <h2 className=" md:w-[70%]  capitalize text-5xl text_blue primary-font">
                  {item.title}
                </h2>
              </div>
              {/* Right */}
              <div className=" space-y-5 md:space-y-10 ">
                <h3 className=" text-3xl secondary-font  text_blue">
                  {item.description}
                </h3>

                {/* <Button title="View More" /> */}

              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Our_Services;
