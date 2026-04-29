"use client";
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Vertex, Fragment } from '@/shaders/plpShaders/PLPShaderGLSL'
import { useTransitionRouter } from "next-view-transitions";
import { caseStudies } from "@/data/ProjectsData";
import Image from "next/image";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const plp = () => {
  const router = useTransitionRouter();
  const meshRef = useRef();

  // ✅ dynamic images
  const img = caseStudies.map(item => item.cover_img);

  const distance = 600;
  const [fov, setFov] = useState(75);

  useEffect(() => {
    const CalcuFOV = () => {
      setFov(2 * Math.atan(window.innerHeight / 2 / distance) * (180 / Math.PI))
    }

    CalcuFOV()
    window.addEventListener('resize', CalcuFOV);
    return () => window.removeEventListener('resize', CalcuFOV);
  }, [])

  const MESH = () => {
    const radius = 300;
    const total = caseStudies.length; // ✅ dynamic
    const { size } = useThree();
    const uIntroCurve = useRef({ value: 0 });

    const vFov = (fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeHeight = viewHeight * 0.37;
    const planeWidth = planeHeight * 0.7;
    const gspY = planeHeight * 1;

    const CalculatePosition = useMemo(() => {
      const arr = [];

      for (let i = 0; i < total; i++) {
        const angle = i % 2 === 0 ? 0 : Math.PI;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -i * gspY;

        arr.push([x, y, z]);
      }

      return arr;
    }, [total]);

    // ================= INTRO =================
    useEffect(() => {
      document.body.classList.add("scroll-lock");

      uIntroCurve.current.value = 1.0;

      gsap.set(meshRef.current.rotation, { y: -360 * (Math.PI / 180) * 2 });
      gsap.set(meshRef.current.position, { y: planeHeight * (total + 2) });

      gsap.set(".midsection", { opacity: 0 });
      gsap.set(".WEBETEXT", { opacity: 0 });
      gsap.set(".numTextCont", { opacity: 0 });
      gsap.set(".mentionCont", { opacity: 0 });
      gsap.set(".bottomImgCont", { opacity: 0 });

      const FTL = gsap.timeline();

      FTL.to(meshRef.current.rotation, {
        y: Math.PI * 1.5,
        duration: 3,
        ease: "power2.inOut",
      });

      FTL.to(meshRef.current.position, {
        y: 0,
        duration: 3,
        ease: "power2.inOut",
      }, 0);

      FTL.to(uIntroCurve.current, {
        value: 0,
        duration: 3.5,
        ease: "power2.inOut",
      }, 0);

      FTL.to(".midsection, .WEBETEXT, .mentionCont, .bottomImgCont, .numTextCont", {
        opacity: 1,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          document.body.classList.remove("scroll-lock");
        },
      }, "-=1");
    }, [total]);

    // ================= SCROLL =================
    useEffect(() => {
      if (!meshRef.current) return;

      caseStudies.forEach((_, i) => {
        const step = i + 1;

        gsap.timeline({
          scrollTrigger: {
            trigger: `.cont${step}`,
            start: step === 1 ? "top 100%" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
          .to(meshRef.current.rotation, {
            y: step === 1 ? Math.PI / 2 : -Math.PI * (step - 1.5),
            ease: "linear",
          }, "a")
          .to(meshRef.current.position, {
            y: planeHeight * step,
            ease: "linear",
          }, "a")
          .to(".displayText", {
            y: `${-34 * step}px`,
            ease: "power3.inOut",
          }, "a")
          .to(".numText", {
            y: `${-60.25 * step}px`,
            ease: "power3.inOut",
          }, "a")
          .to(".mentionText", {
            y: `${-16 * step}px`,
            ease: "power3.inOut",
          }, "a")
          .to(".highlightDiv", {
            x: `${30 * step}px`,
            ease: "power3.inOut",
          }, "a");
      });
    }, []);

    // ================= SCROLL SPEED =================
    const uScrollSpeed = useRef({ value: 0 });
    const scrollVelocity = useRef(0);

    useEffect(() => {
      const handleWheel = (e) => {
        scrollVelocity.current = Math.min(Math.abs(e.deltaY) / 100, 3);
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    useFrame(() => {
      uScrollSpeed.current.value +=
        (scrollVelocity.current - uScrollSpeed.current.value) * 0.1;

      scrollVelocity.current *= 0.9;
    });

    const allMeshesRef = useRef([]);

    const MeshActivatedClick = (index) => {
      if (!allMeshesRef.current.length) return;

      const tl = gsap.timeline({
        defaults: { duration: 1.5, ease: "power3.inOut" },
      });

      allMeshesRef.current.forEach((mesh) => {
        if (!mesh) return;

        tl.to(mesh.scale, { x: 0, y: 0, z: 0 }, 0);
        tl.to(mesh.material, { opacity: 0 }, 0);
      });

      tl.to(".OptionCont", {
        opacity: 0,
        onComplete: () => {
          router.push(`/work/${caseStudies[index].slug}`);
        },
      }, 0);
    };

    return (
      <group ref={meshRef} rotation={[0, Math.PI * 1.5, 0]}>
        {CalculatePosition.map((position, index) => {
          const tex = useTexture(img[index]);

          return (
            <mesh
              key={index}
              onClick={() => MeshActivatedClick(index)}
              position={position}
              rotation={[0, (index % 2 === 0 ? 0 : Math.PI) + Math.PI / 2, 0]}
              scale={[1, 1, 1]}
              ref={(el) => (allMeshesRef.current[index] = el)}
            >
              <planeGeometry args={[planeWidth, planeHeight, 50, 50]} />
              <shaderMaterial
                vertexShader={Vertex}
                fragmentShader={Fragment}
                side={DoubleSide}
                uniforms={{
                  uTexture: { value: tex },
                  uScrollSpeed: uScrollSpeed.current,
                  uIntroCurve: uIntroCurve.current,
                }}
              />
            </mesh>
          );
        })}
      </group>
    );
  };

  useGSAP(() => {
    gsap.to(".scroll_paren", {
      opacity: 1
    })
  })

  return (
    <>
      <div className=" scroll_paren opacity-0 w-full min-h-screen relative">
        <div className="w-full h-screen sticky top-0 left-0">
          <Canvas className="w-full h-screen bg-[#f5f5f5]">
            <PerspectiveCamera makeDefault fov={fov} position={[0, 0, distance]} />
            <MESH />
          </Canvas>

          <div className="bottomImgCont OptionCont absolute opacity-0 bottom-5 pointer-events-none left-0 w-full  z-[100] flex justify-center items-center">
            <div className="w-fit h-fit flex relative">
              {caseStudies.map((item, index) => (
                <div key={index} className="w-[2vw] aspect-3/4 overflow-hidden">
                  <Image className="cover" width={20} height={20} src={item.cover_img} alt={item.title} />
                </div>
              ))}
              <div className="highlightDiv w-[2.7vw] pointer-events-none aspect-3/4 absolute border-[2px] top-[50%] left-[-5px] translate-y-[-49%] border-[#002bba]"></div>

            </div>
          </div>
        </div>

        {caseStudies.map((_, i) => (
          <div key={i} className={`cont${i + 1} h-screen w-full ${i === 0 ? "z-50" : ""}`}></div>
        ))}
      </div>
    </>
  );
};

export default plp;