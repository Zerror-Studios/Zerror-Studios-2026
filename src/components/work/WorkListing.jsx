"use client";
import React from 'react'
import { useTexture, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Vertex, Fragment } from "@/shaders/plpShaders/PLPShaderGLSL";
import { useTransitionRouter } from "next-view-transitions";
import { caseStudies } from "@/data/ProjectsData";
gsap.registerPlugin(useGSAP);

const CAMERA_DISTANCE = 600;
const RADIUS = 300;

function createScrambler(element) {
  const chars = "▤▨▧▦▩";
  let frame = 0;
  let running = false;
  let targetText = "";
  let resolve = false;

  const update = () => {
    if (!running) return;

    frame++;
    const progress = resolve ? Math.min(frame / 20, 1) : 0;

    element.textContent = targetText
      .split("")
      .map((char, i) => {
        if (char === " ") return " ";
        if (resolve && i < Math.floor(progress * targetText.length)) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (resolve && progress === 1) {
      running = false;
      element.textContent = targetText;
      return;
    }

    requestAnimationFrame(update);
  };

  return {
    start(text) {
      targetText = text;
      resolve = false;
      frame = 0;
      if (!running) {
        running = true;
        update();
      }
    },
    stopAndResolve(text) {
      targetText = text;
      resolve = true;
      frame = 0;
      if (!running) {
        running = true;
        update();
      }
    },
  };
}

function scrambleText(element, newText, duration = 0.2) {
  const chars = "▤▨▧▦▩";
  const totalFrames = Math.round(duration * 60);
  let frame = 0;

  const original = newText.split("");

  const tick = () => {
    frame++;
    const progress = frame / totalFrames;

    element.textContent = original
      .map((char, i) => {
        if (char === " ") return " ";
        if (i < Math.floor(progress * original.length)) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (frame < totalFrames) requestAnimationFrame(tick);
    else element.textContent = newText;
  };

  requestAnimationFrame(tick);
}

function padIndex(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function calcFov() {
  return 2 * Math.atan(window.innerHeight / 2 / CAMERA_DISTANCE) * (180 / Math.PI);
}

function getTargetRotY(index) {
  return Math.PI * 1.5 - Math.PI * index;
}

function getThumbWidth() {
  const el = document.querySelector(".thumbItem");
  return el ? el.getBoundingClientRect().width : 0;
}

function Scene({ fov, meshRef, snapRef, onCardClick }) {
  const scramblers = useRef({});
  const total = caseStudies.length;
  const textures = caseStudies.map((item) => useTexture(item.cover_img));

  const uIntroCurve = useRef({ value: 1.0 });
  const uScrollSpeed = useRef({ value: 0 });
  const scrollVelocity = useRef(0);
  const allMeshesRef = useRef([]);
  const snapTimer = useRef(null);
  const rawY = useRef(0);
  const currentIndex = useRef(0);

  const isSnapping = useRef(false);

  const vFov = (fov * Math.PI) / 180;
  const viewHeight = 2 * Math.tan(vFov / 2) * CAMERA_DISTANCE;
  const planeHeight = viewHeight * 0.37;
  const planeWidth = planeHeight * 0.7;
  const gap = planeHeight;

  const getTargetY = (index) => index * gap;

  const positions = useMemo(() =>
    Array.from({ length: total }, (_, i) => {
      const angle = i % 2 === 0 ? 0 : Math.PI;
      return [Math.cos(angle) * RADIUS, -i * gap, Math.sin(angle) * RADIUS];
    }),
    [total, gap]
  );

  const snapTo = (index) => {
    isSnapping.current = true;
    const clamped = Math.max(0, Math.min(total - 1, index));
    const distance = Math.abs(clamped - currentIndex.current);
    currentIndex.current = clamped;
    snapRef.activeIndex = clamped;
    rawY.current = getTargetY(clamped);

    const thumbWidth = getThumbWidth();
    const project = caseStudies[clamped];

    scramblers.current.index.stopAndResolve(padIndex(clamped + 1));
    scramblers.current.title.stopAndResolve(project.title);
    scramblers.current.category.stopAndResolve(project.category);
    scramblers.current.year.stopAndResolve(project.year);

    // scrollVelocity.current = Math.min(1.5 + distance * 0.8, 4);
    gsap.to(uScrollSpeed.current, {
      value: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(meshRef.current.position, {
      y: getTargetY(clamped),
      duration: 0.75,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        isSnapping.current = false;
      }
    });

    gsap.to(meshRef.current.rotation, {
      y: getTargetRotY(clamped),
      duration: 0.75,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(".highlightDiv", {
      x: thumbWidth * clamped,
      duration: 0.75,
      ease: "power3.out",
      overwrite: true,
    });

    const allThumbs = document.querySelectorAll(".thumbItem img");
    allThumbs.forEach((img, i) => {
      gsap.to(img, {
        filter: i === clamped ? "grayscale(0) blur(0px)" : "grayscale(1) blur(1px)",
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      });
    });

    const indexEl = document.querySelector(".proj-index");
    const titleEl = document.querySelector(".proj-title");
    const categoryEl = document.querySelector(".proj-category");
    const yearEl = document.querySelector(".proj-year");

    if (indexEl) scrambleText(indexEl, padIndex(clamped + 1), 0.5);
    if (titleEl) scrambleText(titleEl, project.title, 0.7);
    if (categoryEl) scrambleText(categoryEl, project.category, 0.6);
    if (yearEl) scrambleText(yearEl, project.year, 0.4);
  };

  useEffect(() => {
    snapRef.current = snapTo;
    snapRef.activeIndex = 0;
  }, [total, gap, planeHeight]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    uIntroCurve.current.value = 1.0;

    gsap.set(meshRef.current.rotation, { y: -Math.PI * 4 });
    gsap.set(meshRef.current.position, { y: planeHeight * (total + 2) });
    gsap.set(".thumbItem img", { filter: "grayscale(1) blur(1px)" });
    gsap.set(".thumbItem:nth-child(1) img", { filter: "grayscale(0) blur(0px)" });


    gsap.timeline()
      .to(meshRef.current.rotation, { y: getTargetRotY(0), duration: 3, ease: "power2.inOut" }, 0)
      .to(meshRef.current.position, { y: getTargetY(0), duration: 3, ease: "power2.inOut" }, 0)
      .to(uIntroCurve.current, { value: 0, duration: 3.5, ease: "power2.inOut" }, 0)
      // Inside intro .add() callback:
      .add(() => {
        document.body.style.overflow = "";
        rawY.current = 0;
        gsap.set(".highlightDiv", { x: 0 });

        // Set initial text without scramble (already shown from JSX defaults)
        // Optionally scramble on load for a nice entrance:
        const project = caseStudies[0];
        const indexEl = document.querySelector(".proj-index");
        const titleEl = document.querySelector(".proj-title");
        const categoryEl = document.querySelector(".proj-category");
        const yearEl = document.querySelector(".proj-year");

        if (indexEl) scrambleText(indexEl, padIndex(1), 0.5);
        if (titleEl) scrambleText(titleEl, project.title, 0.9);
        if (categoryEl) scrambleText(categoryEl, project.category, 0.7);
        if (yearEl) scrambleText(yearEl, project.year, 0.5);
      });
  }, []);

  useEffect(() => {
    const onWheel = (e) => {
      if (!meshRef.current) return;
      if (isSnapping.current) return;
      const prevY = rawY.current;
      const delta = e.deltaY * 0.3;
      rawY.current = Math.max(
        getTargetY(0),
        Math.min(getTargetY(total - 1), rawY.current + delta)
      );
      const didMove = Math.abs(rawY.current - prevY) > 0.5;

      gsap.to(meshRef.current.position, {
        y: rawY.current,
        duration: 0.15,
        ease: "none",
        overwrite: true,
      });

      const rawIndex = rawY.current / gap;
      const floorIdx = Math.max(0, Math.min(total - 2, Math.floor(rawIndex)));
      const t = rawIndex - floorIdx;
      const rotY = getTargetRotY(floorIdx) + (getTargetRotY(floorIdx + 1) - getTargetRotY(floorIdx)) * t;
      if (didMove && scramblers.current.title) {
        const previewIndex = Math.round(rawY.current / gap);
        const project = caseStudies[previewIndex];

        scramblers.current.index.start(padIndex(previewIndex + 1));
        scramblers.current.title.start(project.title);
        scramblers.current.category.start(project.category);
        scramblers.current.year.start(project.year);
      }
      gsap.to(meshRef.current.rotation, {
        y: rotY,
        duration: 0.15,
        ease: "none",
        overwrite: true,
      });

      const thumbWidth = getThumbWidth();
      gsap.to(".highlightDiv", {
        x: rawIndex * thumbWidth,
        duration: 0.15,
        ease: "none",
        overwrite: true,
      });

      scrollVelocity.current = Math.min(Math.abs(e.deltaY) / 50, 4);

      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        const nearestIndex = Math.round(rawY.current / gap);
        snapTo(Math.max(0, Math.min(total - 1, nearestIndex)));
      }, 350);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimer.current);
    };
  }, [total, gap, planeHeight]);

  useEffect(() => {
    let touchStartY = 0;

    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY; };

    const onTouchMove = (e) => {
      if (!meshRef.current) return;
      if (isSnapping.current) return;
      const prevY = rawY.current;
      const deltaY = (touchStartY - e.touches[0].clientY) * 1.2;
      touchStartY = e.touches[0].clientY;

      rawY.current = Math.max(
        getTargetY(0),
        Math.min(getTargetY(total - 1), rawY.current + deltaY)
      );

      gsap.to(meshRef.current.position, {
        y: rawY.current,
        duration: 0.1,
        ease: "none",
        overwrite: true,
      });

      const rawIndex = rawY.current / gap;
      const floorIdx = Math.max(0, Math.min(total - 2, Math.floor(rawIndex)));
      const t = rawIndex - floorIdx;
      const rotY = getTargetRotY(floorIdx) + (getTargetRotY(floorIdx + 1) - getTargetRotY(floorIdx)) * t;
      const didMove = Math.abs(rawY.current - prevY) > 0.5;

      if (didMove && scramblers.current.title) {
        const previewIndex = Math.round(rawY.current / gap);
        const project = caseStudies[previewIndex];

        scramblers.current.index.start(padIndex(previewIndex + 1));
        scramblers.current.title.start(project.title);
        scramblers.current.category.start(project.category);
        scramblers.current.year.start(project.year);
      }
      gsap.to(meshRef.current.rotation, {
        y: rotY,
        duration: 0.1,
        ease: "none",
        overwrite: true,
      });

      const thumbWidth = getThumbWidth();
      gsap.to(".highlightDiv", {
        x: rawIndex * thumbWidth,
        duration: 0.1,
        ease: "none",
        overwrite: true,
      });

      scrollVelocity.current = Math.min(Math.abs(deltaY) / 30, 4);

      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        const nearestIndex = Math.round(rawY.current / gap);
        snapTo(Math.max(0, Math.min(total - 1, nearestIndex)));
      }, 200);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [total, gap, planeHeight]);

  useFrame(() => {
    if (isSnapping.current) {
      uScrollSpeed.current.value = 0;
      return;
    }

    uScrollSpeed.current.value += (scrollVelocity.current - uScrollSpeed.current.value) * 0.1;
    scrollVelocity.current *= 0.85;
  });

  const handleClick = (index) => {
    const tl = gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } });
    allMeshesRef.current.forEach((mesh) => {
      if (!mesh) return;
      tl.to(mesh.scale, { x: 0, y: 0, z: 0 }, 0);
      tl.to(mesh.material, { opacity: 0 }, 0);
    });
    tl.to(".OptionCont", { opacity: 0, onComplete: () => onCardClick(index) }, 0);
  };

  useEffect(() => {
    scramblers.current = {
      index: createScrambler(document.querySelector(".proj-index")),
      title: createScrambler(document.querySelector(".proj-title")),
      category: createScrambler(document.querySelector(".proj-category")),
      year: createScrambler(document.querySelector(".proj-year")),
    };
  }, []);

  return (
    <group ref={meshRef} rotation={[0, Math.PI * 1.5, 0]}>
      {positions.map((position, index) => (
        <mesh
          key={index}
          ref={(el) => (allMeshesRef.current[index] = el)}
          position={position}
          rotation={[0, (index % 2 === 0 ? 0 : Math.PI) + Math.PI / 2, 0]}
          onClick={() => handleClick(index)}
        >
          <planeGeometry args={[planeWidth, planeHeight, 50, 50]} />
          <shaderMaterial
            vertexShader={Vertex}
            fragmentShader={Fragment}
            side={DoubleSide}
            uniforms={{
              uTexture: { value: textures[index] },
              uScrollSpeed: uScrollSpeed.current,
              uIntroCurve: uIntroCurve.current,
            }}
          />
        </mesh>
      ))}
    </group>
  );
}

const WorkListing = () => {
  const router = useTransitionRouter();
  const meshRef = useRef();
  const snapRef = useRef(null);
  const [fov, setFov] = useState(75);

  useEffect(() => {
    const update = () => setFov(calcFov());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useGSAP(() => {
    const int_tl = gsap.timeline({ delay: 1.7 })
    int_tl.to(".scroll_paren", { opacity: 1 });
    int_tl.to([".thumbItem"], { stagger: 0.1, ease: "power2.out", scale: 1, opacity: 1 });
    int_tl.to([".highlightDiv", ".current_id_paren", ".proj-title", ".proj-category", ".proj-year"], { stagger: 0.2, opacity: 1 });
  });

  return (
    <div className="scroll_paren opacity-0 w-full h-[100svh] overflow-hidden relative">
      <Canvas className="w-full h-[100svh] bg-[#f6f8ff]">
        <PerspectiveCamera makeDefault fov={fov} position={[0, 0, CAMERA_DISTANCE]} />
        <Scene
          fov={fov}
          meshRef={meshRef}
          snapRef={snapRef}
          onCardClick={(index) => router.push(`/work/${caseStudies[index].slug}`)}
        />
      </Canvas>

      <div className="bottomImgCont OptionCont absolute  bottom-5 left-0 w-full z-[100] flex justify-center items-center">
        <div className="w-fit h-fit flex relative">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="thumbItem scale-0 opacity-0 relative w-[6vw] md:w-[2.5vw] aspect-[3/4] overflow-hidden cursor-pointer"
              onClick={() => snapRef.current?.(index)}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget.querySelector("img"), {
                  filter: "grayscale(0) blur(0px)",
                  scale: 0.9,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }}
              onMouseLeave={(e) => {
                // Read activeIndex from the ref that snapTo actually updates
                const activeIndex = snapRef.activeIndex ?? 0;
                if (index === activeIndex) return; // don't re-gray the active thumb
                gsap.to(e.currentTarget.querySelector("img"), {
                  filter: "grayscale(1) blur(1px)",
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }}
            >
              <Image
                height={40}
                width={40}
                src={item.cover_img}
                alt={item.title}
                className="cover"
              />
            </div>
          ))}
          <div className="highlightDiv opacity-0 absolute w-[7vw] md:w-[2.5vw] scale-[1.4] aspect-[3/4] top-1/2 left-0 -translate-y-1/2 border-1 border-[#002bba] pointer-events-none" />
        </div>
      </div>

      <div className="w-full max-sm:py-24! pointer-events-none absolute text_blue h-[100svh] padding inset-0 flex flex-col-reverse md:flex-row md:items-center justify-between">

        {/* Project info — top right */}
        <div className=" uppercase space-y-1 pointer-events-auto">
          <h2 className="opacity-0 proj-title primary-font text-2xl  md:text-3xl font-medium leading-none">
            {caseStudies[0].title}
          </h2>
          <h3 className="opacity-0 proj-category secondary-font capitalize   font-medium leading-none">
            {caseStudies[0].category}
          </h3>
          <h3 className="opacity-0 proj-year secondary-font   font-medium leading-none">
            {caseStudies[0].year}
          </h3>
        </div>

        {/* Index — bottom left */}
        <div className=" current_id_paren opacity-0 flex text-end items-end">
          <h2 className="proj-index primary-font  text-3xl   md:text-5xl  leading-none">
            {padIndex(1)}
          </h2>
          <h2 className=" text-3xl primary-font  md:text-5xl  leading-none">
            {`/`}
          </h2>
          <h3 className=" primary-font text-xl  md:text-3xl  mb-0.5 md:mb-1 leading-none">{caseStudies.length}</h3>
        </div>

      </div>

    </div>
  );
}

export default WorkListing