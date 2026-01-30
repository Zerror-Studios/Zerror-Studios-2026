"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisScroll from "@/components/common/LenisScroll";
import { ViewTransitions } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  const skipFooterPaths = ["/deck", "/contact", "/work"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.lenis) {
        window.lenis.resize();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <ViewTransitions routeKey={pathname}>
      <LenisScroll>
        <div className="page-root">
          <Header />
          <main>{children}</main>
          {!skipFooterPaths.includes(pathname) && <Footer />}
        </div>
      </LenisScroll>
    </ViewTransitions>
  );
}
