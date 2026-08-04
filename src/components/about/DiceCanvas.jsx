"use client";
import { Environment, OrbitControls } from '@react-three/drei';
import TyrusCubeModel from './../../../public/models/TyrusCubeModel';
import { Canvas } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const DiceCanvas = () => {

  useGSAP(() => {

    gsap.to(".tyrus_canvas", {
      opacity: 1,
      ease: "expo.out",
      duration: .8,
      delay: 1.5
    })
  })

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
        <Environment preset="studio" />
      </Canvas>
  );
};

export default DiceCanvas;