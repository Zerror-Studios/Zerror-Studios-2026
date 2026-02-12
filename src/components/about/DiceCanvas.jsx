import { Environment, OrbitControls } from '@react-three/drei';
import TyrusCubeModel from './../../../public/models/TyrusCubeModel';
import { Canvas } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const DiceCanvas = () => {

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".canvas_space",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // markers: true
      }
    })
    tl.to(".CanvasDiv", {
      zIndex: 100,
      duration: 0.01,
    })
    tl.to(".CanvasDiv", {
      zIndex: 1,
      top: "-101%",
      ease: "linear",
    })
  })

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 750

  return (
    <div className="CanvasDiv w-full overflow-hidden h-screen fixed top-0 left-0 z-[999] pointer-events-none ">
      <Canvas
        className="tyrus_canvas absolute top-[-42%] left-[-46%] w-full h-full pointer-events-none "
        camera={{ position: isMobile ? [0, 0, 10] : [0, 0, 7], fov: 45 }}
      >
        <TyrusCubeModel />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default DiceCanvas;