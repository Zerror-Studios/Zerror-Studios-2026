"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisScroll from "@/components/common/LenisScroll";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ViewTransitions } from "next-view-transitions";
import GlobalParaReveal from "@/components/animation/GlobalParaReveal";
import GlobalImgReveal from "@/components/animation/GlobalImgReveal";

gsap.registerPlugin(ScrollTrigger);

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  const skipFooterPaths = ["/deck", "/contact", "/work", "/pitchdeck"];

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
    <ViewTransitions>
      <LenisScroll>

        <GlobalImgReveal />
        <GlobalParaReveal />

        <header>
          {!["/pitchdeck"].includes(pathname) && <Header />}
        </header>

        <main>
          {children}
        </main>

        <footer>
          {!skipFooterPaths.includes(pathname) && <Footer />}
        </footer>
      </LenisScroll>
    </ViewTransitions>

  );
}
