"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedPixelIcon() {
  const iconRef = useRef(null);

  useEffect(() => {
    const main = iconRef.current.querySelector(".js-icon");
    const mid = iconRef.current.querySelector(".js-icon-mid");
    const midSecond = iconRef.current.querySelector(".js-icon-mid-second");
    const alt = iconRef.current.querySelector(".js-icon-alt");

    const paths = main.querySelectorAll("path");

    gsap.set(paths, {
      opacity: 0,
    });

    const introTl = gsap.timeline();

    introTl.to(paths, {
      opacity: 1,
      duration: 0.15,
      stagger: {
        amount: 0.075,
        from: "random",
      },
    });

    const speed = 0.1;

    const loopTl = gsap.timeline({
      repeat: -1,
      repeatDelay: speed,
    });

    loopTl
      .set(main, { opacity: 0 }, 0)
      .set(mid, { opacity: 1 }, 0)

      .set(mid, { opacity: 0 }, speed)
      .set(alt, { opacity: 1 }, speed)

      .set(alt, { opacity: 0 }, speed * 2)
      .set(midSecond, { opacity: 1 }, speed * 2)

      .set(midSecond, { opacity: 0 }, speed * 3)
      .set(main, { opacity: 1 }, speed * 3);

    return () => {
      introTl.kill();
      loopTl.kill();
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className="relative w-[10px] h-[10px] text-white shrink-0"
    >
      {/* ALT */}
      <div className="absolute inset-0 opacity-0 js-icon-alt">
        <svg viewBox="0 0 10 10" fill="currentColor">
          <path d="M4 8H2v2h2V8ZM6 6H4v2h2V6ZM8 8H6v2h2V8ZM10 6H8v2h2V6ZM8 4H6v2h2V4ZM4 4H2v2h2V4ZM10 2H8v2h2V2ZM6 2H4v2h2V2ZM8 0H6v2h2V0ZM4 0H2v2h2V0ZM2 6H0v2h2V6ZM2 2H0v2h2V2Z" />
        </svg>
      </div>

      {/* MID */}
      <div className="absolute inset-0 opacity-0 js-icon-mid">
        <svg viewBox="0 0 10 10" fill="currentColor">
          <path d="M3 8H1v2h2V8ZM5 6H3v2h2V6ZM7 8H5v2h2V8ZM9 6H7v2h2V6ZM7 4H5v2h2V4ZM3 4H1v2h2V4ZM9 2H7v2h2V2ZM5 2H3v2h2V2ZM7 0H5v2h2V0ZM10 8H9v2h1V8ZM10 4H9v2h1V4ZM10 0H9v2h1V0ZM3 0H1v2h2V0ZM1 6H0v2h1V6ZM1 2H0v2h1V2Z" />
        </svg>
      </div>

      {/* MID SECOND */}
      <div className="absolute inset-0 opacity-0 js-icon-mid-second">
        <svg viewBox="0 0 10 10" fill="currentColor">
          <path d="M1 8H0v2h1V8ZM3 6H1v2h2V6ZM5 8H3v2h2V8ZM9 8H7v2h2V8ZM7 6H5v2h2V6ZM5 4H3v2h2V4ZM9 4H7v2h2V4ZM1 4H0v2h1V4ZM7 2H5v2h2V2ZM3 2H1v2h2V2ZM10 6H9v2h1V6ZM10 2H9v2h1V2ZM5 0H3v2h2V0ZM1 0H0v2h1V0ZM9 0H7v2h2V0Z" />
        </svg>
      </div>

      {/* MAIN */}
      <div className="relative js-icon">
        <svg viewBox="0 0 10 10" fill="currentColor">
          <path d="M2 8H0V10H2V8Z" />
          <path d="M4 6H2V8H4V6Z" />
          <path d="M6 8H4V10H6V8Z" />
          <path d="M10 8H8V10H10V8Z" />
          <path d="M8 6H6V8H8V6Z" />
          <path d="M6 4H4V6H6V4Z" />
          <path d="M10 4H8V6H10V4Z" />
          <path d="M2 4H0V6H2V4Z" />
          <path d="M8 2H6V4H8V2Z" />
          <path d="M4 2H2V4H4V2Z" />
          <path d="M6 0H4V2H6V0Z" />
          <path d="M2 0H0V2H2V0Z" />
          <path d="M10 0H8V2H10V0Z" />
        </svg>
      </div>
    </div>
  );
}