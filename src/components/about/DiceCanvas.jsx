"use client";
import { Environment, useEnvironment } from '@react-three/drei';
import TyrusCubeModel from './../../../public/models/TyrusCubeModel';
import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Self-hosted copy of drei's "studio" preset (the preset downloads it from a slow third-party CDN)
export const ENV_URL = "/hdri/studio_small_03_1k.hdr";
useEnvironment.preload({ files: ENV_URL });

// Mounts only once the model and lighting have loaded (the scene suspends until then),
// so the fade starts when there is something to show.
const FadeInWhenReady = () => {
  useEffect(() => {
    gsap.to(".tyrus_canvas", {
      opacity: 1,
      ease: "expo.out",
      duration: .8,
    })
  }, [])
  return null
}

const DiceCanvas = () => {

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 750

  return (
      <Canvas
        className="tyrus_canvas opacity-0 absolute top-0 left-0 w-full h-full pointer-events-none"
        camera={{ position: isMobile ? [0, 0, 10] : [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
      >
        <TyrusCubeModel />
        <Environment files={ENV_URL} />
        <FadeInWhenReady />
      </Canvas>
  );
};

export default DiceCanvas;
