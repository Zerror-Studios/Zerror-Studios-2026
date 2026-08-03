"use client";

import { useEffect } from "react";
import { Link } from "next-view-transitions";

export default function NotFound() {
  // Hide footer when on 404
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) footer.style.display = "none";
    
    return () => {
      if (footer) footer.style.display = "block";
    };
  }, []);

  return (
    <main className="w-full h-[100svh] flex flex-col items-center pt-20 justify-center  text_blue relative overflow-hidden">
      
      {/* 404 Graphic */}
      <div className="flex gap-4 md:gap-10 items-center justify-center mb-12 scale-75 md:scale-100 relative">
        
        {/* First 4 */}
        <div className="relative">
          <Four />
        </div>

        {/* 0 */}
        <div className="relative">
          <Zero />
        </div>

        {/* Second 4 */}
        <div className="relative">
          <Four />
        </div>

      </div>

      <div className="flex flex-col items-center gap-6 text-center px-4">
        <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-200/50 rounded-md font-mono text-gray-500">
          Page Not Found
        </span>
        
        <h1 className="text-2xl md:text-3xl font-light text_blue mt-2">
          This is not the page you are looking for
        </h1>

        <Link
          href="/"
          className="mt-4 uppercase text-[10px] tracking-[0.2em] px-8 py-3 border border-dashed border-current hover:bg-[#002bba] hover:text-white hover:border-[#002bba] transition-all duration-300"
        >
          Return Home &gt;
        </Link>
      </div>
    </main>
  );
}

const Pixel = ({ filled }) => (
  <div className={`w-5 h-5 md:w-8 md:h-8 ${filled ? "bg-current" : "bg-transparent"}`} />
);

const Four = () => (
  <div className="grid grid-cols-4 grid-rows-7 gap-[2px]">
    {[
      0, 0, 0, 1,
      0, 0, 1, 1,
      0, 1, 0, 1,
      1, 0, 0, 1,
      1, 1, 1, 1,
      0, 0, 0, 1,
      0, 0, 0, 1,
    ].map((val, idx) => (
      <Pixel key={idx} filled={val === 1} />
    ))}
  </div>
);

const Zero = () => (
  <div className="grid grid-cols-4 grid-rows-7 gap-[2px]">
    {[
      0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      1, 0, 0, 1,
      0, 1, 1, 0,
    ].map((val, idx) => (
      <Pixel key={idx} filled={val === 1} />
    ))}
  </div>
);
