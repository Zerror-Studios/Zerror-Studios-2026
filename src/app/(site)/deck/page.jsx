"use client";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function deck() {

  const flickerRefs = useRef([]);


  useEffect(() => {
    flickerRefs.current.forEach((el) => {
      if (!el) return;

      const delay = Math.random() * 10;
      el.style.animationDelay = `${delay}s`;
    });
  }, []);

  const handelMouseEnter = (item) => {
    gsap.to(item, {
      backgroundColor: "#2147c4",
      ease: "power4.in",
      duration: 0.06,
    });
  };

  const handelMouseLeave = (item) => {
    gsap.to(item, {
      backgroundColor: "#0000FF",
      ease: "power1.in",
      duration: 0.4,
    });
  };

  useEffect(() => {
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div1",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div2",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div3",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div4",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div5",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div6",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl7 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div7",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl8 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div8",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl9 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div9",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });
    const tl10 = gsap.timeline({
      scrollTrigger: {
        trigger: ".div10",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers:true
      },
    });

    tl1.to(
      ".card1",
      {
        top: "9%",
        scale: 0.9,
      },
      "c1"
    );
    tl1.to(
      ".card2",
      {
        top: "14%",
      },
      "c1"
    );
    tl1.to(
      ".i1",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c1"
    );
    tl1.to(
      ".i2",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c1"
    );
    // -----------
    tl2.to(
      ".card1",
      {
        top: "4%",
        scale: 0.8,
        opacity: 0.5,
      },
      "c2"
    );
    tl2.to(
      ".card2",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c2"
    );
    tl2.to(
      ".card3",
      {
        top: "14%",
      },
      "c2"
    );
    tl2.to(
      ".i2",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c2"
    );
    tl2.to(
      ".i3",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c2"
    );
    // -----------
    tl3.to(
      ".card1",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c3"
    );
    tl3.to(
      ".card2",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c3"
    );
    tl3.to(
      ".card3",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c3"
    );
    tl3.to(
      ".card4",
      {
        top: "14%",
      },
      "c3"
    );
    tl3.to(
      ".i3",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c3"
    );
    tl3.to(
      ".i4",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c3"
    );

    // -------------
    tl4.to(
      ".card2",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c4"
    );
    tl4.to(
      ".card3",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c4"
    );
    tl4.to(
      ".card4",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c4"
    );
    tl4.to(
      ".card5",
      {
        top: "14%",
      },
      "c4"
    );
    tl4.to(
      ".i4",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c4"
    );
    tl4.to(
      ".i5",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c4"
    );

    // ----------------------
    tl5.to(
      ".card3",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c5"
    );
    tl5.to(
      ".card4",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c5"
    );
    tl5.to(
      ".card5",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c5"
    );
    tl5.to(
      ".card6",
      {
        top: "14%",
      },
      "c5"
    );
    tl5.to(
      ".i5",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c5"
    );
    tl5.to(
      ".i6",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c5"
    );
    // ----------------------
    tl6.to(
      ".card4",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c6"
    );
    tl6.to(
      ".card5",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c6"
    );
    tl6.to(
      ".card6",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c6"
    );
    tl6.to(
      ".card7",
      {
        top: "14%",
      },
      "c6"
    );
    tl6.to(
      ".i6",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c6"
    );
    tl6.to(
      ".i7",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c6"
    );
    // ----------------------
    tl7.to(
      ".card5",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c7"
    );
    tl7.to(
      ".card6",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c7"
    );
    tl7.to(
      ".card7",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c7"
    );
    tl7.to(
      ".card8",
      {
        top: "14%",
      },
      "c7"
    );
    tl7.to(
      ".i7",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c7"
    );
    tl7.to(
      ".i8",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c7"
    );
    // ----------------------
    tl8.to(
      ".card6",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c8"
    );
    tl8.to(
      ".card7",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c8"
    );
    tl8.to(
      ".card8",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c8"
    );
    tl8.to(
      ".card9",
      {
        top: "14%",
      },
      "c8"
    );
    tl8.to(
      ".i8",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c8"
    );
    tl8.to(
      ".i9",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c8"
    );

    // ----------------------
    tl9.to(
      ".card7",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c9"
    );
    tl9.to(
      ".card8",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c9"
    );
    tl9.to(
      ".card9",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c9"
    );
    tl9.to(
      ".card10",
      {
        top: "14%",
      },
      "c9"
    );
    tl9.to(
      ".i9",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c9"
    );
    tl9.to(
      ".i10",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c9"
    );

    // ----------------------

    tl10.to(
      ".card8",
      {
        top: "0%",
        scale: 0.7,
        opacity: 0,
      },
      "c10"
    );
    tl10.to(
      ".card9",
      {
        top: "4%",
        scale: 0.8,
        background: "#666666",
        opacity: 0.5,
      },
      "c10"
    );
    tl10.to(
      ".card10",
      {
        top: "9%",
        scale: 0.9,
        background: "#666666",
      },
      "c10"
    );
    tl10.to(
      ".card11",
      {
        top: "14%",
      },
      "c10"
    );
    tl10.to(
      ".i10",
      {
        width: "20px",
        borderBottom: "1px solid #666666",
      },
      "c10"
    );
    tl10.to(
      ".i11",
      {
        width: "40px",
        borderBottom: "1px solid white",
      },
      "c10"
    );
  }, []);

  useGSAP(() => {
    gsap.set(".SXCrd", {
      xPercent: 0,
      yPercent: -100,
      opacity: 0,
      scale: 2,
    });
  });

  useEffect(() => {
    const tlLast = gsap.timeline({
      scrollTrigger: {
        trigger: ".div10",
        start: "bottom top",
        end: "bottom top",
        // scrub: true,
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });
    // Show SMBOX
    tlLast.to(".SMBOX", { opacity: 1, pointerEvents: "auto" }, "l1");

    // Hide main cards
    tlLast.to(".crd", { opacity: 0 }, "l1");

    // ".SXCrd",
    //   {
    //     opacity: 0,
    //     scale: 3,
    //     xPercent: -0,
    //     yPercent: -100,
    //   },

    // SXCrd (small cards) grow out staggered
    tlLast.fromTo(
      ".SXCrd",
      {
        xPercent: 0,
        yPercent: -100,
        scale: 1.3,
        opacity: 0,
        opacity: 1,
      },
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        stagger: {
          each: 0.05,
          from: "end",
          grid: [4, 3],
        },
        duration: 0.1,
        scale: 1,
        // ease: "power2.out",
      },
      "<0.1"
    );
  }, []);

  // useEffect(() => {
  //   const tlLast = gsap.timeline({
  //     paused: true, // we control manually
  //   });

  //   // Show SMBOX
  //   tlLast.to(".SMBOX", { opacity: 1, pointerEvents: "auto" }, "l1");

  //   // Hide main cards
  //   tlLast.to(".crd", { opacity: 0 }, "l1");

  //   // Small cards grow staggered
  //   tlLast.to(".SXCrd", {
  //     xPercent: 0,
  //     yPercent: 0,
  //     opacity: 1,
  //     scale: 1,
  //     duration: 0.1,
  //     stagger: 0.01,
  //     ease: "linear",
  //   });

  //   // ScrollTrigger to control timeline manually
  //   ScrollTrigger.create({
  //     trigger: ".div10",
  //     start: "bottom top",
  //     onEnter: () => tlLast.play(), // play when entering viewport
  //     onLeaveBack: () => tlLast.reverse(), // optional: reverse if scrolling back
  //   });
  // }, []);

  const aHash = [
    "div1",
    "div2",
    "div3",
    "div4",
    "div5",
    "div6",
    "div7",
    "div8",
    "div9",
    "div10",
    "div11",
  ];


  return (
    <>
      <div className="w-full h-fit relative max-lg:hidden z-10 ">
        {/* PCBOX */}
        <div className="w-full LMBOX MC h-screen bg-[#151515] fixed top-0 left-0">
          {/* Card-Info */}
          <div className="w-10 h-fit  transition-all  ease-in-out cursor-pointer duration-100  flex flex-col items-center absolute top-1/2 right-[8%] -translate-y-1/2 z-100 ">
            {[
              "i1",
              "i2",
              "i3",
              "i4",
              "i5",
              "i6",
              "i7",
              "i8",
              "i9",
              "i10",
              "i11",
            ].map((item, i) => {
              return (
                <a key={i} href={`#${aHash[i]}`}>
                  <div
                    key={i}
                    className={`w-5 h-2.5  border-b border-[#666666] hover:w-7 hover:border-[#d9d9d9]  ${item} transition-all ease-in-out cursor-pointer duration-100 ${i === 0 && "w-10 border-white"
                      } `}
                  ></div>
                </a>
              );
            })}
          </div>

          {/* Card-1 */}
          <div className="w-[69%]  crd card1 h-[76vh] p-3 bg-[#0000FF] absolute top-[12%] left-1/2 -translate-x-1/2 rounded-xl select-none">
            <div className="w-full h-1/3 flex">
              {[
                "Pich deck 2026--",
                "Over Capabilities",
                "",
                "",
                "",
                "",
                "and",
                "I",
                "",
                "",
                "",
                "Portfolio",
              ].map((item, i) => {
                return (
                  <div
                    onMouseEnter={() =>
                      handelMouseEnter(`.hoverBgAnimateT${i}`)
                    }
                    onMouseLeave={() =>
                      handelMouseLeave(`.hoverBgAnimateT${i}`)
                    }
                    key={i}
                    ref={(el) => (flickerRefs.current.push(el))}
                    className={` w-1/12 flicker   hoverBgAnimateT${i}  border bg-[#2147c400] border-[#2147c4] flex ${i == 0 && "items-end"
                      } text-[#f5f5f5b6] rounded-xl text-[11px] p-2 `}
                  >
                    <p>
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-1/3 flex">
              {["", "", "", "", "", "", "", "", "", "", "", "I"].map(
                (item, i) => {
                  return (
                    <div
                      ref={(el) => (flickerRefs.current.push(el))}
                      onMouseEnter={() =>
                        handelMouseEnter(`.hoverBgAnimateM${i}`)
                      }
                      onMouseLeave={() =>
                        handelMouseLeave(`.hoverBgAnimateM${i}`)
                      }
                      key={i}
                      className={` w-1/12 flicker   hoverBgAnimateM${i} border bg-[#2147c400] border-[#2147c4] flex rounded-xl text-[11px] p-2 text-[#f5f5f5b6] `}
                    >
                      <p>
                        {item}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
            <div className="w-full h-1/3 flex">
              {[
                "",
                "",
                "I",
                "design",
                "",
                "",
                "",
                "and development",
                "",
                "agency.",
                "",
                "I",
              ].map((item, i) => {
                return (
                  <div
                    ref={(el) => (flickerRefs.current.push(el))}
                    onMouseEnter={() =>
                      handelMouseEnter(`.hoverBgAnimateB${i}`)
                    }
                    onMouseLeave={() =>
                      handelMouseLeave(`.hoverBgAnimateB${i}`)
                    }
                    key={i}
                    className={` w-1/12 flicker  hoverBgAnimateB${i} border bg-[#2147c400] border-[#2147c4] flex rounded-xl  ${i == 3 && "items-end"
                      }  ${i == 9 && "items-end"}  ${i == 11 && "items-end"
                      } text-[11px] p-2 text-[#f5f5f5b6] `}
                  >
                    <p>
                      {item}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-full absolute top-0 left-0 gap-5 pointer-events-none flex justify-center items-center">
              <p className="text-white font3 text-5xl md:text-6xl  font-medium">ZERROR STUDIOS</p>
            </div>
          </div>

          {/* Card-2 */}
          <div className="w-[69%] crd card2 h-[76%] px-10 py-10 bg-white absolute top-[99%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">Hi, we are Zerror Studios</p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px]">
                Here How we Got FROM 0 To 30
              </p>
              <div className="max-w-100 text-[1rem] font1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, <div className="h-5"></div> when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </div>
            </div>
          </div>

          {/* Card-3 */}
          <div className="w-[69%] crd card3 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px] max-w-60">
                Lorem Ipsum is simply dummy text of the printing
              </p>
              <div className="max-w-120 w-full text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card-4 */}
          <div className="w-[69%] crd card4 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">Hi, we are Zerror Studio</p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px]">
                Here How we Got FROM 0 To 30
              </p>
              <div className="max-w-100 text-[1rem] font1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, <div className="h-5"></div> when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </div>
            </div>
          </div>

          {/* Card-5 */}
          <div className="w-[69%] crd card5 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px] max-w-60">
                Lorem Ipsum is simply dummy text of the printing
              </p>
              <div className="max-w-120 w-full text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card-6 */}
          <div className="w-[69%] crd card6 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between gap-20 items-end ">
              <div className=" w-1/2 h-[35vh] overflow-hidden rounded-2xl ">
                <Image
                  src={`/img.jpg`}
                  className="w-full h-full object-cover object-center"
                  width={1000}
                  height={1000}
                  alt="loading img"
                />
              </div>
              <div className="w-[50%] text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card-7 */}
          <div className="w-[69%] crd card7 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">Hi, we are Zerror Studio</p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px]">
                Here How we Got FROM 0 To 30
              </p>
              <div className="max-w-100 text-[1rem] font1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, <div className="h-5"></div> when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </div>
            </div>
          </div>

          {/* Card-8 */}
          <div className="w-[69%] crd card8 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px] max-w-60">
                Lorem Ipsum is simply dummy text of the printing
              </p>
              <div className="max-w-120 w-full text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card-9 */}
          <div className="w-[69%] crd card9 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">Hi, we are Zerror Studio</p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px]">
                Here How we Got FROM 0 To 30
              </p>
              <div className="max-w-100 text-[1rem] font1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, <div className="h-5"></div> when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </div>
            </div>
          </div>

          {/* Card-10 */}
          <div className="w-[69%] crd card10 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between ">
              <p className=" uppercase font1 text-[14px] max-w-60">
                Lorem Ipsum is simply dummy text of the printing
              </p>
              <div className="max-w-120 w-full text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card-11 */}
          <div className="w-[69%] crd card11 h-[76%] px-10 py-10 bg-white absolute top-[120%] left-1/2 -translate-x-1/2 rounded-xl select-none flex flex-col justify-between">
            <p className="font3 text-[2.5rem]">
              simply dummy text of the printing and typesetting industry.
            </p>
            <div className="w-full h-fit flex justify-between gap-20 items-end ">
              <div className=" w-1/2 h-[35vh] overflow-hidden rounded-2xl ">
                <Image
                  src={`/img.jpg`}
                  className="w-full h-full object-cover object-center"
                  width={1000}
                  height={1000}
                  alt="loading img"
                />
              </div>
              <div className="w-[50%] text-[1rem] font1 flex flex-col  gap-5">
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
                <div className="border-b border-[#20202038] w-full">
                  <p className="pb-3.75">Lorem Ipsum is simply dummy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blank div */}
        {[
          "div1",
          "div2",
          "div3",
          "div4",
          "div5",
          "div6",
          "div7",
          "div8",
          "div9",
          "div10",
          "div11",
        ].map((divName, i) => {
          return (
            <div
              id={`${divName}`}
              key={i}
              className={`w-full h-screen ${divName}`}
            ></div>
          );
        })}

        {/* SMBOX */}
        <div
          className="w-full opacity-0 SMBOX pointer-events-none scale-[0.65] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 grid-rows-3 gap-5
  "
        >
          {/* CARD 1 */}
          <div className="w-full h-full hover:bg-[#0000FF] transition-all ease-in cursor-pointer duration-200 SXCrd p-3 bg-[#0000FF] rounded-xl select-none relative overflow-hidden">
            <div className="w-full h-[33%] flex gap-1">
              {[
                "Pich dech 2025--",
                "Over Capabilities",
                "",
                "",
                "",
                "",
                "and",
                "I",
                "",
                "",
                "",
                "Portfolio",
              ].map((item, i) => (
                <div
                  onMouseEnter={() => handelMouseEnter(`.hoverBgAnimateT${i}`)}
                  onMouseLeave={() => handelMouseLeave(`.hoverBgAnimateT${i}`)}
                  key={i}
                  className={`w-1/12 hoverBgAnimateT${i} border bg-[#0000FF00] border-[#2147c4]
            flex items-center justify-center text-[#ffffffb6]
            rounded-lg text-[7px] p-1`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <p className="text-white font3 text-[20px]">Zerror Studio</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[18px] leading-tight">
              Hi, we are Zerror Studio
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[8px] w-[40%]">
                Here How we Got FROM 0 To 30
              </p>

              <p className="font1 text-[10px] leading-tight w-[69%]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px] leading-tight">
              simply dummy text of the printing and typesetting industry.
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[9px] w-[40%]">
                Lorem Ipsum is simply dummy
              </p>

              <div className="font1 text-[10px] w-[69%] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div className="border-b border-[#20202038] pb-1" key={i}>
                      Lorem Ipsum is simply dummy
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 4 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[18px]">Hi, we are Zerror Studio</p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[8px] w-[40%]">
                Here How we Got FROM 0 To 30
              </p>

              <p className="font1 text-[10px] leading-tight w-[69%]">
                Lorem Ipsum is simply dummy text...
              </p>
            </div>
          </div>

          {/* CARD 5 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px] leading-tight">
              simply dummy text of the printing and typesetting industry.
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[9px] w-[40%]">
                Lorem Ipsum is simply dummy
              </p>

              <div className="w-[69%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div className="border-b border-[#20202038] pb-1" key={i}>
                      Lorem Ipsum is simply dummy
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 6 — IMAGE */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px] leading-tight">
              simply dummy text of the printing and typesetting industry.
            </p>

            <div className="flex justify-between gap-3 items-end">
              <div className="w-[45%] h-[120px] rounded-xl overflow-hidden">
                <Image
                  src="/img.jpg"
                  width={500}
                  height={500}
                  alt="loading img"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[55%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <p className="border-b border-[#20202038] pb-1" key={i}>
                      Lorem Ipsum is simply dummy
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 7 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[18px] leading-tight">
              Hi, we are Zerror Studio
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[8px] w-[40%]">
                Here How we Got FROM 0 To 30
              </p>

              <p className="font1 text-[10px] w-[69%]">
                Lorem Ipsum is simply dummy text...
              </p>
            </div>
          </div>

          {/* CARD 8 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px]">
              simply dummy text of the printing industry.
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[9px] w-[40%]">
                Lorem Ipsum is simply dummy
              </p>

              <div className="w-[69%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="border-b border-[#20202038] pb-1">
                      Lorem Ipsum is simply dummy
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 9 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[18px] leading-tight">
              Hi, we are Zerror Studio
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[8px] w-[40%]">
                Here How we Got FROM 0 To 30
              </p>

              <p className="font1 text-[10px] w-[69%]">
                Lorem Ipsum is simply dummy text...
              </p>
            </div>
          </div>

          {/* CARD 10 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px]">
              simply dummy text of the printing industry.
            </p>

            <div className="flex justify-between gap-3">
              <p className="uppercase font1 text-[9px] w-[40%]">
                Lorem Ipsum is simply dummy
              </p>

              <div className="w-[69%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="border-b border-[#20202038] pb-1">
                      Lorem Ipsum is simply dummy
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* CARD 11 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px]">
              simply dummy text of the printing industry.
            </p>

            <div className="flex justify-between gap-3 items-end">
              <div className="w-[45%] h-[120px] rounded-xl overflow-hidden">
                <Image
                  src="/img.jpg"
                  width={500}
                  height={500}
                  alt="loading img"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[55%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <p key={i} className="border-b border-[#20202038] pb-1">
                      Lorem Ipsum is simply dummy
                    </p>
                  ))}
              </div>
            </div>
          </div>
          {/* CARD 12 */}
          <div className="w-full h-60 hover:bg-[#666666] transition-all ease-in cursor-pointer duration-200 SXCrd bg-white rounded-lg p-4 select-none flex flex-col justify-between">
            <p className="font3 text-[16px]">
              simply dummy text of the printing industry.
            </p>

            <div className="flex justify-between gap-3 items-end">
              <div className="w-[45%] h-[120px] rounded-xl overflow-hidden">
                <Image
                  src="/img.jpg"
                  width={500}
                  height={500}
                  alt="loading img"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[55%] font1 text-[10px] flex flex-col gap-1">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <p key={i} className="border-b border-[#20202038] pb-1">
                      Lorem Ipsum is simply dummy
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No Mobile View */}
      <div className="w-full h-screen bg-[#202020] flex justify-center text-white items-center lg:hidden px-[5vw]">
        Please open the link on a PC/Laptop
      </div>
    </>
  );
}
