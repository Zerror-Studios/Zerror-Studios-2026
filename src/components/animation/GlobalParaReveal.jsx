"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const GlobalParaReveal = () => {
  const pathname = usePathname()

  useEffect(() => {
    let ctx;
    let splits = [];

    const initTimeout = setTimeout(() => {
      document.fonts.ready.then(() => {
        ctx = gsap.context(() => {
          const elements = gsap.utils.toArray("[data-para-effect]").filter(el => !el.closest('.disable-gsap-mobile'))

          elements.forEach((el) => {
            if (el.dataset.splitInitialized) return

            el.dataset.splitInitialized = "true"

            const scroller = el.closest(".overflow-y-scroll") || el.closest(".overflow-y-auto") || window

            const split = new SplitText(el, {
              type: "lines",
              linesClass: "split-line",
            })

            splits.push(split)

            split.lines.forEach((line) => {
              const wrapper = document.createElement("div")
              wrapper.style.overflow = "hidden"
              line.parentNode.insertBefore(wrapper, line)
              wrapper.appendChild(line)
            })

            gsap.set(split.lines, {
              yPercent: 110,
              x: 10,
              willChange: "transform",
            })

            gsap.to(split.lines, {
              yPercent: 0,
              x: 0,
              duration: 1,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                scroller: scroller,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            })
          })
        })
        ScrollTrigger.refresh()
      })
    }, 500)

    return () => {
      clearTimeout(initTimeout)
      if (ctx) ctx.revert()
      splits.forEach((split) => split.revert())
      document
        .querySelectorAll("[data-para-effect]")
        .forEach((el) => {
          delete el.dataset.splitInitialized
        })
    }

  }, [pathname])

  return null
}

export default GlobalParaReveal