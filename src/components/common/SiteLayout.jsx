"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import LenisScroll from "@/components/common/LenisScroll";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, ViewTransition } from "react";

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

          {/* Page content and footer fade out / in on navigation (styles in globals.css, .page-fade).
              The header sits outside so it stays put. Keyed by route with enter/exit only, so
              in-page updates (e.g. a lazy component like the About dice loading in) don't
              trigger a full-page crossfade. */}
          <ViewTransition key={pathname} default="none" enter="page-fade" exit="page-fade">
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
