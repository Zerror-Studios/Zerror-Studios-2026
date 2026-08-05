"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { Link } from 'next-view-transitions';

gsap.registerPlugin(MotionPathPlugin);

const TicketEffect = () => {

    const wrapRef = useRef(null);
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);

    const handleEnter = () => {
        gsap.to([img1Ref.current, img2Ref.current], {
            rotate: 0,
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const handleMove = (e) => {
        const bounds = wrapRef.current.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        gsap.to([img1Ref.current, img2Ref.current], {
            rotateX,
            rotateY,
            duration: 0.3,
            ease: "expo.out",
            transformPerspective: 1000,
        });
    };

    const handleLeave = () => {
        gsap.to([img1Ref.current, img2Ref.current], {
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "expo.out",
        });

        gsap.to(img1Ref.current, {
            rotate: -5,
            duration: 0.5,
            ease: "expo.out",
        });

        gsap.to(img2Ref.current, {
            rotate: 3,
            duration: 0.5,
            ease: "expo.out",
        });
    };

    // useEffect(() => {
    //     const button = document.querySelector(".contact_btn");
    //     const plane = document.querySelector(".plane");

    //     let isAnimating = false;
    //     let cloudInterval = null;

    //     const tl = gsap.timeline({
    //         paused: true,
    //         onComplete: () => {
    //             isAnimating = false;
    //             clearInterval(cloudInterval);
    //         },
    //     });

    //     tl.to(plane, {
    //         duration: 10,
    //         ease: "power2.inOut",
    //         motionPath: {
    //             path: [
    //                 { x: 0, y: 0 },
    //                 { x: 500, y: -400 },
    //                 { x: 260, y: -20 },
    //                 { x: -100, y: -400 },
    //                 { x: -500, y: -100 },
    //                 { x: -600, y: -400 },
    //                 { x: 0, y: 0 },
    //             ],
    //             autoRotate: true,
    //         },
    //         width: "20rem",
    //     }).to(
    //         plane,
    //         {
    //             width: "1.25rem",
    //             ease: "expo.out",
    //             duration: 1,
    //         },
    //         "<+=9"
    //     );

    //     const createCloud = () => {
    //         const cloud = document.createElement("img");
    //         cloud.src = "/svg/cloud.png";
    //         cloud.className = "cloud";

    //         document.body.appendChild(cloud);

    //         const rect = plane.getBoundingClientRect();

    //         // PLACE IT EXACTLY BEHIND THE PLANE
    //         gsap.set(cloud, {
    //             x: rect.left + rect.width / 10,
    //             y: rect.top + rect.height / 10,
    //             rotation: gsap.getProperty(plane, "rotation"),
    //             scale: gsap.utils.random(0.6, 1),
    //         });

    //         // FADE IN → FADE OUT
    //         gsap.fromTo(
    //             cloud,
    //             { opacity: 0 },
    //             {
    //                 opacity: 1,
    //                 duration: 0.15,
    //                 ease: "power1.out",
    //             }
    //         );

    //         gsap.to(cloud, {
    //             opacity: 0,
    //             scale: "+=2",
    //             duration: 1.8,
    //             ease: "power2.out",
    //             delay: 0.2,
    //             onComplete: () => cloud.remove(),
    //         });
    //     };


    //     const handleMouseEnter = () => {
    //         if (isAnimating) return;
    //         isAnimating = true;

    //         // spawn clouds while plane is flying
    //         cloudInterval = setInterval(createCloud, 120);

    //         tl.restart();
    //     };

    //     button.addEventListener("mouseenter", handleMouseEnter);

    //     return () => {
    //         clearInterval(cloudInterval);
    //         button.removeEventListener("mouseenter", handleMouseEnter);
    //     };
    // }, []);


    return (
        <>
            <div className="w-full pt-24 center text_blue text-center space-y-10 bg-white relative z-10 flex-col">
                <p data-para-effect className=' text-5xl md:text-8xl primary-font  leading-none'>Ready to build <br />
                    something with<br /> <span className='primary-font_italic'> zero errors? </span> </p>

                <p className=' leading-tight '>Your next version starts here. <br /> Tell us what you're making.</p>

                <Link href="/contact" className="contact_btn relative flex group items-center gap-1">
                    <div className="w-0 group-hover:w-full transition-all duration-300 absolute bg_blue bottom-1 rounded-full h-px"></div>
                    <p>Contact</p>
                    <img
                        className="w-5  absolute -right-7 contrast-[6]  plane"
                        src="/svg/plane.svg"
                        alt="Plane Graphic"
                    />
                </Link>



                <div
                    ref={wrapRef}
                    onMouseEnter={handleEnter}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="relative mb-14 mt-5 md:mt-12 md:mb-36  w-full center md:w-[65%] perspective-[1000px]"
                >

                    <div
                        className="opacity-0 pointer-events-none"
                    >
                        <img
                            className="w-full hidden md:block pointer-events-none select-none"
                            src="/images/homePage/ticket_back.svg"
                            alt="Ticket back Graphic"
                        />
                        <img
                            className="w-full md:hidden pointer-events-none select-none"
                            src="/images/homePage/mobile_ticket_back.svg"
                            alt="Mobile ticket back Graphic"
                        />
                    </div>
                    <div
                        ref={img1Ref}
                        className=" ticket_1 absolute top-0 md:rotate-[-5deg] transform-style-preserve-3d"
                    >
                        <img
                            className="w-full hidden md:block pointer-events-none select-none"
                            src="/images/homePage/ticket_back.svg"
                            alt="Ticket back Graphic"
                        />
                        <img
                            className="w-full md:hidden pointer-events-none select-none"
                            src="/images/homePage/mobile_ticket_back.svg"
                            alt="Mobile ticket back Graphic"
                        />
                    </div>

                    <div
                        ref={img2Ref}
                        className=" ticket_2 absolute top-0 md:rotate-[3deg] transform-style-preserve-3d"
                    >
                        <img
                            className="w-full hidden md:block pointer-events-none select-none"
                            src="/images/homePage/ticket_front.svg"
                            alt="Ticket front Graphic"
                        />
                        <img
                            className="w-full md:hidden pointer-events-none select-none"
                            src="/images/homePage/mobile_ticket_front.svg"
                            alt="Mobile ticket front Graphic"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TicketEffect