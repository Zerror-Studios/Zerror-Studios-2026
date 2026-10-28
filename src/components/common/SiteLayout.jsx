"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisScroll from "@/components/common/LenisScroll";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, ViewTransition } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import GlobalParaReveal from "@/components/animation/GlobalParaReveal";
import GlobalImgReveal from "@/components/animation/GlobalImgReveal";
import GlobalHeaderHide from "@/components/animation/GlobalHeaderHide";
import { ProjectFormProvider } from "@/context/ProjectFormContext";
import FormToaster from "@/components/common/FormToaster";

gsap.registerPlugin(ScrollTrigger);

export default function SiteLayout({ children }) {
  const pathname = usePathname();

  const skipFooterPaths = ["/deck", "/contact", "/pitchdeck"];

  // On phones the page fade snapshots the whole page (WebGL canvases included) twice,
  // which runs mobile browsers out of memory and they reload the tab. There the
  // viewport-sized root snapshot fades instead (see globals.css).
  const [pageTransition, setPageTransition] = useState("page-fade");
  const isFirstRender = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const update = () => setPageTransition(mq.matches ? "none" : "page-fade");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      if (window.lenis) {
        window.lenis.resize();
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  // Layout effect so the new page is already at the top when the view transition
  // captures it; otherwise it would fade in at the old scroll position and jump.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    if (window.lenis) {
      window.lenis.scrollTo(0, {
        immediate: true,
        force: true,
      });
    }

    // Browsers without view transitions (e.g. iOS < 18) still get a fade-in
    if (!isFirstRender.current && !document.startViewTransition) {
      gsap.fromTo(
        "main, footer",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out", clearProps: "opacity" }
      );
    }
    isFirstRender.current = false;

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      if (window.lenis) {
        window.lenis.resize();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <ProjectFormProvider>
        <LenisScroll>

          <GlobalImgReveal />
          <GlobalParaReveal />
          <GlobalHeaderHide />
          <FormToaster />

          <header>
            <Header />
          </header>

          <ViewTransition key={pathname} default="none" enter={pageTransition} exit={pageTransition}>
            <main>
              {children}
            </main>

            <footer>
              {!skipFooterPaths.includes(pathname) && <Footer />}
            </footer>
          </ViewTransition>
        </LenisScroll>
    </ProjectFormProvider>
  );
}
