// hooks/useDevice.js
"use client";

import { useEffect, useState } from "react";

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 1020);
      setIsDesktop(width > 750);
    };

    checkDevice(); // initial run
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile, isDesktop };
}