"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {
  RiPlayFill,
  RiPauseFill,
  RiMusic2Fill,
  RiSparklingFill,
  RiArrowRightUpLine,
  RiVolumeUpFill,
  RiShieldFlashLine,
  RiCpuLine,
  RiDropLine,
} from "@remixicon/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────────────
   Three.js Clean Glass Specular Reflection Shader (No Water Wobble)
───────────────────────────────────────────────────────────── */
const VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uScrollY;
  uniform float uExpansion;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // 1. Fresnel Edge Rim Highlight (Apple Glass Rim)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);

    // 2. Glossy Glass Diagonal Reflection Sweep
    float diag = vUv.x * 0.9 + vUv.y * 0.9;
    float lightSweep = sin(diag * 12.0 - uTime * 0.8) * 0.5 + 0.5;
    lightSweep = pow(lightSweep, 6.0) * 0.35;

    // 3. Specular Glare & Cyan-Blue Lens Tint
    vec3 specularColor = vec3(0.4, 0.75, 1.0) * fresnel * 1.3;
    specularColor += vec3(1.0, 1.0, 1.0) * lightSweep;

    // 4. Subtle Rim Highlight Ring
    float distFromCenter = length(vUv - vec2(0.5));
    float edgeRing = smoothstep(0.49, 0.43, distFromCenter);
    vec3 edgeGlow = vec3(0.1, 0.5, 1.0) * (1.0 - edgeRing) * 0.5;

    vec3 finalColor = specularColor + edgeGlow;

    // Controlled alpha for glass reflection overlay
    float alpha = fresnel * 0.65 + lightSweep * 0.4 + (1.0 - edgeRing) * 0.2;

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.1, 0.75));
  }
`;

const LiquidIslandMesh = ({ isExpanded, scrollY }) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uScrollY: { value: 0 },
        uExpansion: { value: 0 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uScrollY.value = scrollY;

      const targetExpansion = isExpanded ? 1.0 : 0.0;
      materialRef.current.uniforms.uExpansion.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uExpansion.value,
        targetExpansion,
        0.1
      );
    }

    if (meshRef.current) {
      const targetScaleX = isExpanded ? 2.5 : 1.25;
      const targetScaleY = isExpanded ? 1.35 : 0.5;

      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScaleX, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScaleY, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3.2, 1.2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        args={[shaderArgs]}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

/* ─────────────────────────────────────────────────────────────
   Main Dynamic Island Refraction Demo Page
───────────────────────────────────────────────────────────── */
const DemoPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#050608] text-white min-h-screen relative font-sans overflow-x-hidden selection:bg-[#002bba] selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          STATIC GLASS LENS REFRACTION SVG FILTER (Crisp, no wobble)
      ───────────────────────────────────────────────────────────── */}
      <svg className="hidden absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="crisp-glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.025"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ─────────────────────────────────────────────────────────────
          FIXED DYNAMIC ISLAND (Sleek Glass Reflection Header)
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-9999 flex flex-col items-center">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backdropFilter: "blur(0) saturate(200%) contrast(115%) brightness(115%) url(#crisp-glass-refraction)",
            WebkitBackdropFilter: "blur(0) saturate(200%) contrast(115%) brightness(115%) url(#crisp-glass-refraction)",
            background: "rgba(10, 14, 28, 0.42)",
          }}
          className={`relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? "w-[360px] sm:w-[440px] h-[110px] rounded-[2.4rem] shadow-2xl shadow-[#002bba]/40 border-2 border-white/40"
              : "w-[210px] sm:w-[260px] h-[48px] rounded-[2rem] shadow-xl shadow-black/80 border border-white/30"
          } overflow-hidden flex items-center justify-between px-4 group hover:border-cyan-400/60`}
        >
          {/* Three.js Specular Glare & Reflection Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 2], fov: 45 }} dpr={[1, 2]}>
              <LiquidIslandMesh isExpanded={isExpanded} scrollY={scrollY} />
            </Canvas>
          </div>

          {/* ── Dynamic Island Content (Glass UI) ── */}
          <div className="relative z-10 w-full h-full flex items-center justify-between pointer-events-auto">
            {!isExpanded ? (
              /* Compact Pill View */
              <div className="w-full flex items-center justify-between text-xs font-medium px-1">
                {/* Left: Icon & Equalizer */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#002bba] center text-white shadow-sm shadow-[#002bba]/60">
                    <RiDropLine size={14} className="animate-pulse" />
                  </div>
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[3px] h-3 bg-cyan-300 rounded-full animate-[bounce_1s_infinite_100ms]"></span>
                    <span className="w-[3px] h-2 bg-white rounded-full animate-[bounce_1s_infinite_300ms]"></span>
                    <span className="w-[3px] h-3.5 bg-cyan-400 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                  </div>
                </div>

                {/* Center Title */}
                <span className="text-[11px] tracking-wider uppercase font-bold text-white drop-shadow-md">
                  Glass Reflection
                </span>

                {/* Right: Live Dot */}
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400"></div>
                </div>
              </div>
            ) : (
              /* Expanded View */
              <div className="w-full flex items-center justify-between p-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#002bba] via-indigo-600 to-cyan-400 center text-white shadow-lg shadow-[#002bba]/50 border border-white/20">
                    <RiSparklingFill size={28} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-300 bg-cyan-400/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                        Glass Reflection Lens
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 leading-none drop-shadow">
                      Dynamic Glass Island
                    </h4>
                    <p className="text-[11px] text-white/80 mt-1">
                      Refracting background content cleanly
                    </p>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(!isPlaying);
                    }}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 center text-white backdrop-blur-md transition-colors border border-white/20"
                  >
                    {isPlaying ? <RiPauseFill size={18} /> : <RiPlayFill size={18} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-cyan-400/80 mt-2 font-mono drop-shadow">
          Tap Island to expand • Scroll down to watch glass refraction over text
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LARGE CONTRAST TEXT & SCROLLABLE CONTENT FOR REFRACTION TEST
      ───────────────────────────────────────────────────────────── */}

      {/* Hero Section */}
      <section className="min-h-screen w-full relative flex flex-col items-center justify-center pt-32 px-6 overflow-hidden text-center">
        {/* Animated Background Gradient Blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#002bba]/50 via-purple-600/40 to-cyan-400/40 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

        <div className="max-w-5xl space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-cyan-300">
            <RiShieldFlashLine size={16} />
            <span>Static Glass Refraction + Three.js Specular Glare</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tight leading-[1.02] text-white">
            Liquid Glass <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-[#002bba] to-purple-500">
              Refraction Studio
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Scroll this text directly behind the fixed Dynamic Island at the top of the screen to watch every letter visibly bend, distort, and refract through the glass lens!
          </p>

          <div className="pt-6 flex items-center justify-center gap-4">
            <a
              href="#refraction-cards"
              className="px-9 py-4 rounded-full bg-[#002bba] text-white font-bold hover:bg-[#002bba]/80 transition-all shadow-xl shadow-[#002bba]/50 flex items-center gap-2 border border-white/20"
            >
              <span>Test Refraction Cards</span>
              <RiArrowRightUpLine size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Refraction Test Cards Section */}
      <section id="refraction-cards" className="py-32 px-6 max-w-6xl mx-auto space-y-20 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Vivid Refraction Passes
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            These high-contrast colorful blocks bend cleanly as they pass under the glass island
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Electric Blue */}
          <div className="h-[420px] rounded-[2.5rem] p-10 bg-gradient-to-br from-[#002bba] via-blue-700 to-indigo-950 border-2 border-white/30 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-white/20 center text-white backdrop-blur-md border border-white/30">
              <RiCpuLine size={28} />
            </div>
            <div className="space-y-3 relative z-10">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-300 font-bold">01 / Dynamic Lens</span>
              <h3 className="text-3xl font-black text-white">Glass Refraction</h3>
              <p className="text-sm text-white/90 leading-relaxed font-light">
                Every pixel passing under the island is warped by a crisp glass lens displacement map without water wobble.
              </p>
            </div>
          </div>

          {/* Card 2: Hot Magenta */}
          <div className="h-[420px] rounded-[2.5rem] p-10 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-950 border-2 border-white/30 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-white/20 center text-white backdrop-blur-md border border-white/30">
              <RiSparklingFill size={28} />
            </div>
            <div className="space-y-3 relative z-10">
              <span className="text-xs uppercase font-mono tracking-widest text-pink-300 font-bold">02 / Specular Glare</span>
              <h3 className="text-3xl font-black text-white">Fresnel Edge Shine</h3>
              <p className="text-sm text-white/90 leading-relaxed font-light">
                Three.js Additive Shader computes specular light sweeps and Fresnel edge highlights over the live refraction.
              </p>
            </div>
          </div>

          {/* Card 3: Cyber Emerald */}
          <div className="h-[420px] rounded-[2.5rem] p-10 bg-gradient-to-br from-emerald-500 via-teal-700 to-emerald-950 border-2 border-white/30 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-white/20 center text-white backdrop-blur-md border border-white/30">
              <RiVolumeUpFill size={28} />
            </div>
            <div className="space-y-3 relative z-10">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-300 font-bold">03 / Crisp Backdrop</span>
              <h3 className="text-3xl font-black text-white">Apple Glass Finish</h3>
              <p className="text-sm text-white/90 leading-relaxed font-light">
                Delivers an authentic, high-end Apple Dynamic Island glass reflection and refraction effect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Giant Bold Text Banner */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto rounded-[3.5rem] p-16 sm:p-24 bg-gradient-to-r from-cyan-400 via-[#002bba] to-purple-600 border-2 border-white/40 shadow-3xl text-center space-y-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0,transparent_70%)] pointer-events-none"></div>

          <h2 className="text-5xl sm:text-8xl font-black text-white tracking-tight leading-tight uppercase relative z-10 drop-shadow-2xl">
            ZERROR REFRACTION <br /> STUDIO 2026
          </h2>

          <p className="text-lg sm:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
            Combining Next.js 16, Three.js WebGL shaders, and CSS glass refraction for state-of-the-art web experiences.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-white/50 font-mono">
        © 2026 Zerror Studios — Sleek Glass Refraction Experience
      </footer>
    </div>
  );
};

export default DemoPage;