'use client'
import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {Vertex, Fragment} from '@/shaders/plpShaders/PLPShaderGLSL' 
import { useTransitionRouter } from "next-view-transitions";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const plp = () => {
  const router = useTransitionRouter();
  const meshRef = useRef();
  const img = [
    "/images/plpImg/img1.webp",
    "/images/plpImg/img3.webp",
    "/images/plpImg/img4.webp",
    "/images/plpImg/img5.webp",
    "/images/plpImg/img6.webp",
    "/images/plpImg/img7.webp",
    "/images/plpImg/img2.webp",
  ];
  const distance = 600;
  const [fov, setFov ] = useState(75);

  useEffect(()=>{
    const CalcuFOV = ()=>{
        setFov(2 * Math.atan(window.innerHeight / 2 / distance) * (180 / Math.PI))
    }

    CalcuFOV()

    window.addEventListener('resize', CalcuFOV);
    return () => window.removeEventListener('resize', CalcuFOV);
  },[])
    

  // ------------------------------------------- FUNCTIONS --------------------------------------------------
  const MESH = () => {
    // const navigate = useNavigate();
    const radius = 300;
    const total = 7;
    const { size } = useThree();
    const uIntroCurve = useRef({ value: 0 });

    const vFov = (fov * Math.PI) / 180; // convert to radians
    const viewHeight = 2 * Math.tan(vFov / 2) * distance; // world units visible vertically
    const aspect = size.width / size.height;
    const viewWidth = viewHeight * aspect;

    // Now scale plane size relative to viewport
    const planeHeight = viewHeight * 0.37; // 40% of screen height
    const planeWidth = planeHeight * 0.7; // maintain aspect ratio
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
    }, []);

    // -------------------------------------------- After Loadings ------------------------------------------

    // Pre ~ Animation Set
    useEffect(() => {
      document.body.classList.add("scroll-lock");

      uIntroCurve.current.value = 1.0;

      // ✅ Set initial (pre) values
      gsap.set(meshRef.current.rotation, { y: -360 * (Math.PI / 180) * 2 });
      gsap.set(meshRef.current.position, { y: planeHeight * 9 });
      gsap.set(".midsection", { opacity: 0 });
      gsap.set(".WEBETEXT", { opacity: 0 });
      gsap.set(".numTextCont", { opacity: 0 });
      gsap.set(".mentionCont", { opacity: 0 });
      gsap.set(".bottomImgCont", { opacity: 0 });

      const FTL = gsap.timeline();
      FTL.to(
        meshRef.current.rotation,
        {
          y: Math.PI * 1.5,
          duration: 3,
          ease: "power2.inOut",
        },
        "pre1"
      );

      FTL.to(
        meshRef.current.position,
        {
          y: 0,
          duration: 3,
          ease: "power2.inOut",
        },
        "pre1"
      );
      // ✅ Flatten meshes smoothly after animation finishes
      FTL.to(
        uIntroCurve.current,
        {
          value: 0,
          duration: 3.5,
          ease: "power2.inOut",
        },
        "pre1"
      );

      FTL.to(
        ".midsection",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "pre2"
      );

      FTL.to(
        ".WEBETEXT",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "pre2"
      );
      FTL.to(
        ".mentionCont",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "pre2"
      );
      FTL.to(
        ".bottomImgCont",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        "pre2"
      );

      FTL.to(
        ".numTextCont",
        {
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.classList.remove("scroll-lock");
          },
        },
        "pre2"
      );
    }, []);

    // Animations
    useEffect(() => {
      if (!meshRef.current) return;

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: ".cont1",
          start: "top 100%",
          end: "bottom top",
          scrub: true, // ✅ smoother transition
          invalidateOnRefresh: true,
        },
      });
      tl1.to(
        meshRef.current.rotation,
        {
          y: Math.PI / 2,
          ease: "linear",
        },
        "a1"
      );

      tl1.to(
        meshRef.current.position,
        {
          y: planeHeight * 1,
          ease: "linear",
        },
        "a1"
      );

      tl1.to(
        ".displayText",
        {
          y: "-24px",
          direction: 0.01,
          ease: "power3.inOut",
        },
        "a1"
      );

      tl1.to(
        ".numText",
        {
          y: "-64px",
          direction: 0.01,
          ease: "power3.inOut",
        },
        "a1"
      );

      tl1.to(
        ".mentionText",
        {
          y: "-16px",
          direction: 0.01,
          ease: "power3.inOut",
        },
        "a1"
      );

      tl1.to(
        ".highlightDiv",
        {
          x: "30px",
          direction: 0.01,
          ease: "power3.inOut",
        },
        "a1"
      );

      // ----------------------------------------------- CONT2

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".cont2",
            start: "top top",
            end: "bottom top",
            scrub: true, // ✅ smoother transition
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .to(
          meshRef.current.rotation,
          {
            y: -Math.PI / 2,
            ease: "linear",
          },
          "b1"
        ) // rotate further
        .to(
          meshRef.current.position,
          {
            y: planeHeight * 2,
            ease: "linear",
          },
          "b1"
        )
        .to(
          ".displayText",
          {
            y: "-48px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "b1"
        )
        .to(
          ".numText",
          {
            y: "-128px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "b1"
        )
        .to(
          ".mentionText",
          {
            y: "-32px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "b1"
        )
        .to(
          ".highlightDiv",
          {
            x: "60px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "b1"
        );

      // ----------------------------------------------- CONT3
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".cont3",
            start: "top top",
            end: "bottom top",
            scrub: true, // ✅ smoother transition
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .to(
          meshRef.current.rotation,
          {
            y: -Math.PI * 1.5,
            ease: "linear",
          },
          "C1"
        ) // rotate further
        .to(
          meshRef.current.position,
          {
            y: planeHeight * 3,
            ease: "linear",
          },
          "C1"
        )
        .to(
          ".displayText",
          {
            y: "-72px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "C1"
        ) // move further up
        .to(
          ".numText",
          {
            y: "-192px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "C1"
        ) // move further up
        .to(
          ".mentionText",
          {
            y: "-48px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "C1"
        ) // move further up
        .to(
          ".highlightDiv",
          {
            x: "90px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "C1"
        ); // move further up

      // ----------------------------------------------- CONT4
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".cont4",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .to(
          meshRef.current.rotation,
          {
            y: -Math.PI * 2.5,
            ease: "linear",
          },
          "D1"
        ) // rotate further
        .to(
          meshRef.current.position,
          {
            y: planeHeight * 4,
            ease: "linear",
          },
          "D1"
        )
        .to(
          ".displayText",
          {
            y: "-96px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "D1"
        ) // move further up
        .to(
          ".numText",
          {
            y: "-256px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "D1"
        ) // move further up
        .to(
          ".mentionText",
          {
            y: "-64px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "D1"
        ) // move further up
        .to(
          ".highlightDiv",
          {
            x: "120px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "D1"
        ); // move further up

      // ----------------------------------------------- CONT5
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".cont5",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .to(
          meshRef.current.rotation,
          {
            y: -Math.PI * 3.5,
            ease: "linear",
          },
          "E1"
        ) // rotate further
        .to(
          meshRef.current.position,
          {
            y: planeHeight * 5,
            ease: "linear",
          },
          "E1"
        )
        .to(
          ".displayText",
          {
            y: "-120px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "E1"
        ) // move further up
        .to(
          ".numText",
          {
            y: "-320px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "E1"
        ) // move further up
        .to(
          ".mentionText",
          {
            y: "-80px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "E1"
        ) // move further up
        .to(
          ".highlightDiv",
          {
            x: "150px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "E1"
        ); // move further up

      // ----------------------------------------------- CONT6
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".cont6",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .to(
          meshRef.current.rotation,
          {
            y: -Math.PI * 4.5,
            ease: "linear",
          },
          "F1"
        ) // rotate further
        .to(
          meshRef.current.position,
          {
            y: planeHeight * 6,
            ease: "linear", // ✅ added
          },
          "F1"
        )
        .to(
          ".displayText",
          {
            y: "-144px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "F1"
        ) // move further up
        .to(
          ".numText",
          {
            y: "-384px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "F1"
        ) // move further up
        .to(
          ".mentionText",
          {
            y: "-96px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "F1"
        ) // move further up
        .to(
          ".highlightDiv",
          {
            x: "180px",
            direction: 0.01,
            ease: "power3.inOut",
          },
          "F1"
        );
    }, []);

    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // -------------------- SCROLL SPEED DETECTION --------------------
    const uScrollSpeed = useRef({ value: 0 }); // shared uniform for all meshes
    const scrollVelocity = useRef(0);

    useEffect(() => {
      const handleWheel = (e) => {
        // Use the actual scroll delta speed
        const delta = Math.abs(e.deltaY);

        // Normalize speed
        const speed = Math.min(delta / 100, 3.0); // 0 to 3 range

        scrollVelocity.current = speed;
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      window.addEventListener(
        "touchmove",
        (e) => {
          scrollVelocity.current = 1.0; // approximate touch move
        },
        { passive: true }
      );

      return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchmove", handleWheel);
      };
    }, []);

    // -------------------- UPDATE UNIFORM EVERY FRAME --------------------
    useFrame(() => {
      uScrollSpeed.current.value +=
        (scrollVelocity.current - uScrollSpeed.current.value) * 0.1;

      scrollVelocity.current *= 0.9;
    });
    //  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // -------------------------------------------------------------------------------

    const allMeshesRef = useRef([]);

    const MeshActivatedClick = () => {
      if (!allMeshesRef.current.length) return;

      // GSAP timeline
      const tl = gsap.timeline({
        defaults: { duration: 1.5, ease: "power3.inOut" },
      });

      // scale to 0 and fade out
      allMeshesRef.current.forEach((mesh, i) => {
        if (!mesh) return;

        // animate scale down
        tl.to(
          mesh.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          0
        );

        // fade out by reducing material opacity (only works if transparent true)
        tl.to(
          mesh.material,
          {
            opacity: 0,
          },
          0
        );

        // Other ContData like text & slide Images
        tl.to(
          ".OptionCont",
          {
            opacity: 0,
            onComplete: () => {
             router.push("/work/disrptve");
            },
          },
          0
        );
      });
    };

    return (
      <>
        <group ref={meshRef} rotation={[0, Math.PI * 1.5, 0]}>
          {CalculatePosition.map((position, index) => {
            const tex = useTexture(img[index]);
            return (
              <mesh
                key={index}
                onClick={MeshActivatedClick}
                position={position}
                rotation={[0, (index % 2 === 0 ? 0 : Math.PI) + Math.PI / 2, 0]}
                scale={[1, 1, 1]}
                ref={(el) => (allMeshesRef.current[index] = el)}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = "default";
                }}
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
      </>
    );
  };

  return (
    <>
      <div className="w-full min-h-screen relative">
        {/* Canvas Screen on TOP */}
        <div className="w-full h-screen sticky top-0 left-0">
          <Canvas className="w-full h-screen bg-[#f5f5f5]">
            <PerspectiveCamera
              makeDefault
              fov={fov}
              position={[0, 0, distance]}
            />
            <MESH />
          </Canvas>

          {/* Top-Text-Cont */}
          <div className="w-full OptionCont h-screen absolute top-0 left-0 flex pointer-events-none justify-center items-center">
            {/* Content */}
            <div className="w-full h-screen flex text-center  justify-center items-center pointer-events-none ">
              <div className="w-full h-screen relative flex justify-center pointer-events-none px-[20px] ">

                <div className="w-fit WEBETEXT opacity-0 h-fit flex flex-col gap-1 text-[#002BBA] text-start absolute top-[23%] left-[70%]">
                  <p className="text-[1rem] leading-[1rem]">Website Design</p>
                  <p className="text-[1.5rem] leading-[1.5rem] RF_Font">2025</p>
                </div>

                {/* Inner-Center-Div */}
                <div className=" midsection absolute top-[73%] left-[70%] RF_Font  w-fit h-[1.5rem] flex flex-col text-start pointer-events-none text-[#002BBA] PNR_Font text-[1.5rem] leading-[1.5rem] overflow-hidden  opacity-0 tracking-tight ">
                  <span className="displayText">HILOWAVE</span>
                  <span className="displayText">BIGPICTURE</span>
                  <span className="displayText">AL</span>
                  <span className="displayText">Luminous seoul</span>
                  <span className="displayText">EATH lIBRARY</span>
                  <span className="displayText">SOMC</span>
                  <span className="displayText">MATPLAZA</span>
                </div>

                {/* right-abs */}
                <div className="text-[#002BBA] pointer-events-none numTextCont opacity-0  absolute top-[20%] left-[10%] transform-y-[-50%] text-[16px] flex justify-center items-end px-[20px]">
                  <span className="h-[4rem] text-[4rem]  flex justify-center items-center">0</span>
                  <span className="w-fit h-[4rem] flex flex-col leading-[4rem] text-[4rem] overflow-hidden ">
                    <span className="numText">1</span>
                    <span className="numText">2</span>
                    <span className="numText">3</span>
                    <span className="numText">4</span>
                    <span className="numText">5</span>
                    <span className="numText">6</span>
                    <span className="numText">7</span>
                  </span>
                  / 07
                </div>

                {/* Left-abs */}
                <div className="mentionCont  pointer-events-none opacity-0 w-fit h-fit absolute  top-[80%] left-[70%]  translate-y-[-50%] flex flex-col justify-start text-start text-[16px] text-[#002BBA] leading-[16px] tracking-tight">
                  <span className="w-fit h-[16px] overflow-hidden flex flex-col">
                    <span className="mentionText">COSMETICS</span>
                    <span className="mentionText">OUTDOOR ADVERTISING</span>
                    <span className="mentionText">ADVERTISING AGENCY</span>
                    <span className="mentionText">VIDEO PRODUCTION</span>
                    <span className="mentionText">COSMETICS</span>
                    <span className="mentionText">ARCHITECTURAL DESIGN</span>
                    <span className="mentionText">ARCHITECTURAL MATERIALS</span>
                  </span>
                  <span className="w-fit h-[16px] overflow-hidden flex flex-col">
                    <span className="mentionText">NOVEMBER 2024</span>
                    <span className="mentionText">DECEMBER 2023</span>
                    <span className="mentionText">JANUARY 2023</span>
                    <span className="mentionText">JULY 2022</span>
                    <span className="mentionText">JUNE 2022</span>
                    <span className="mentionText">MAY 2022</span>
                    <span className="mentionText">OCTOBER 2024</span>
                  </span>
                  <span>UXUI, WEB DEVELOPMENT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className=" bottomImgCont OptionCont absolute opacity-0 bottom-0 pointer-events-none left-0 w-full h-[70px] z-[100] flex justify-center items-center">
            <div className="w-fit h-fit flex relative bg-amber-700">
              {img.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[30px] h-[40px]  overflow-hidden"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={item}
                      alt=""
                    />
                  </div>
                );
              })}

              {/* HIGHLIGHT */}
              <div className="highlightDiv w-[40px] pointer-events-none h-[50px] absolute border-[2px] top-[50%] left-[-5px] translate-y-[-49%] bg-none border-white"></div>
            </div>
          </div>
        </div>

        {/* This Div help to create a  animation */}
        <div className=" cont1 h-screen w-full z-50"></div>
        <div className=" cont2 h-screen w-full "></div>
        <div className=" cont3 h-screen w-full "></div>
        <div className=" cont4 h-screen w-full "></div>
        <div className=" cont5 h-screen w-full "></div>
        <div className=" cont6 h-screen w-full "></div>
        <div className=" cont7 h-screen w-full "></div>
      </div>
    </>
  );
};

export default plp;