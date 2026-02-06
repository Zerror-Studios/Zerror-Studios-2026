"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText';
gsap.registerPlugin(ScrollTrigger);
const About = () => {

    useGSAP(() => {
        const wrk_split_wrd = SplitText.create(".wrk_split_wrd", { type: "words, chars" });
        gsap.set(wrk_split_wrd.words, { y: 50, opacity: 0, display: "inline-block" })
        const abt_spt_1 = SplitText.create(".abt_spt_1", { type: "words, chars" });
        const abt_spt_2 = SplitText.create(".abt_spt_2", { type: "words, chars" });
        const abt_spt_3 = SplitText.create(".abt_spt_3", { type: "words, chars" });
        const abt_spt_4 = SplitText.create(".abt_spt_4", { type: "words, chars" });
        const txt_anime = SplitText.create(".txt_anime", { type: "words, chars" });
        const txt_anime_2 = SplitText.create(".txt_anime_2", { type: "words, chars" });
        gsap.set([txt_anime.chars, txt_anime_2.words], { yPercent: 100, display: "inline-block" })

        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about_paren",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            }
        })

        if (window.innerWidth > 750) {
            tl.from(".circ_3", {
                x: "11vw",
                ease: "linear"
            })
                .from(".circ_4", {
                    x: "33vw",
                    ease: "linear"
                }, "<")
                .from(".circ_2", {
                    x: "-11vw",
                    ease: "linear"
                }, "<")
                .from(".circ_1", {
                    x: "-33vw",
                    ease: "linear"
                }, "<")
                .to([abt_spt_1.chars, abt_spt_2.chars, abt_spt_3.chars, abt_spt_4.chars], {
                    yPercent: -100,
                    ease: "expo.out",
                    stagger: {
                        each: 0.01,
                        from: "start"
                    }
                }, "<")
                .from(".err_anim_letter", {
                    yPercent: 100,
                    ease: "expo.out",
                    stagger: 0.05
                }, "<+=0.4")
                .to(".err_anim_letter", {
                    yPercent: -100,
                    ease: "expo.out",
                    stagger: 0.05
                })
                .from(".anim_letter", {
                    yPercent: 100,
                    ease: "expo.out",
                    stagger: 0.05
                }, "<+=0.1")
                .to(".div_scale", {
                    scale: 1,
                    ease: "expo.out",
                    duration: 1
                })
        } else {
            tl.set(".circ_1", { x: "-20vw" })
            tl.set(".circ_2", { x: "35vw" })
            tl.set(".circ_3", { x: "80vw" })
            tl.set(".circ_4", { x: "80vw" })

            tl.to(".circ_2", {
                x: "-6.5vw",
                ease: "linear"
            }, "<")
                .to(".circ_3", {
                    x: "6.5vw",
                    ease: "linear"
                })
                .to(".circ_4", {
                    x: "20vw",
                    ease: "linear"
                })
                .to([".circ_1", ".circ_2", ".circ_3", ".circ_4"], {
                    x: "0",
                    ease: "linear"
                })
                .to(abt_spt_4.chars, {
                    yPercent: -100,
                    ease: "expo.out",
                    stagger: {
                        each: 0.01,
                        from: "start"
                    }
                })
                .from(".err_anim_letter", {
                    yPercent: 100,
                    ease: "expo.out",
                    stagger: 0.05
                }, "<")
                .to(".err_anim_letter", {
                    yPercent: -100,
                    ease: "expo.out",
                    stagger: 0.05
                })
                .from(".anim_letter", {
                    yPercent: 100,
                    ease: "expo.out",
                    stagger: 0.05
                }, "<+=0.1")
                .to(".div_scale", {
                    scale: 1.5,
                    ease: "expo.out",
                    duration: 1
                })
        }


        tl.to([".circ_1", ".circ_2", ".circ_3", ".circ_4"], {
            opacity: 0,
            duration: 0.2
        }, "<")

            .to(".opacity_z", {
                opacity: 0,
                duration: 0.01
            })
            .to(".drop_ltr_z", {
                opacity: 1,
                duration: 0.01
            }, "<")
            .to(".drop_ltr_z", {
                rotate: -180,
                // clipPath: "inset(42.5% 42.5% 42.5% 42.5%)",
                ease: "linear",
            }, "<")
            .to(".div_scale", {
                top: "-12vw",
                ease: "linear",
            }, "<")
            .to(".bar_center", {
                rotate: 0,
                ease: "linear",
            }, "<")
            .to(".bar_top", {
                top: "0%",
                rotate: 90,
                left: "50%",
                transform: "translateX(-50%)",
                ease: "linear",
            }, "<")
            .to(".bar_bottom", {
                bottom: "0%",
                rotate: 90,
                right: "50%",
                transform: "translateX(50%)",
                ease: "linear",
            }, "<")

            .to(".bar_top", {
                top: "50%",
                rotate: 90,
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                ease: "linear",
            })
            .to(".drop_ltr_z", {
                rotate: -360,
                ease: "linear",
            }, "<")
            .to(".bar_bottom", {
                bottom: "50%",
                rotate: 90,
                right: "50%",
                transform: "translateX(20%) translateY(50%)",
                ease: "linear",
            }, "<")

            .to([".bar_bottom", ".bar_top", ".bar_center"], {
                width: "2.2vw",
                ease: "linear",
            }, "<")

            .to(".drop_ltr_z", {
                left: "50%",
                ease: "linear",
            })
            .to(".works_paren_header", {
                width: "100vw",
                height: "100vh",
                ease: "linear",
            })
            .to(wrk_split_wrd.words, {
                y: 0,
                opacity: 1,
                stagger: 0.01
            })
            .to(".drop_ltr_z", {
                opacity: 0,
                duration: 0.001
            }, ">")

    })


    return (
        <>
            <div className=" about_paren   text-white   w-full h-[500vh] relative ">

                <div className="sticky top-0 center w-full h-screen overflow-hidden">
                    <div className="circ_1 size-[50vw] md:size-[22vw] mob_cir center  absolute  border border-white rounded-full">
                        <div className="block w-fit overflow-hidden">
                            <p className=' abt_spt_1 text-[5vw] md:text-3xl uppercase font-medium '>Creativity</p>
                        </div>
                    </div>
                    <div className="circ_2 size-[50vw] md:size-[22vw] mob_cir center  absolute  border border-white rounded-full">
                        <div className="block w-fit overflow-hidden">
                            <p className='abt_spt_2 text-[5vw] md:text-3xl uppercase font-medium '>Efficiency</p>
                        </div>
                    </div>
                    <div className="circ_3 size-[50vw] md:size-[22vw] mob_cir center  absolute  border border-white rounded-full">
                        <div className="block w-fit overflow-hidden">
                            <p className='abt_spt_3 text-[5vw] md:text-3xl uppercase font-medium '>Entertainment</p>
                        </div>
                    </div>
                    <div className="circ_4 size-[50vw] md:size-[22vw] mob_cir center  absolute  border border-white rounded-full">
                        <div className="block w-fit overflow-hidden">
                            <p className='abt_spt_4 text-[5vw] md:text-3xl uppercase font-medium '>Empathy</p>
                        </div>
                    </div>

                    <div className=" drop_ltr_z opacity-0 scale-150 md:scale-100 z-[2] fixed top-1/2 left-[18vw] md:left-[29.8%] pointer-events-none -translate-x-1/2 -translate-y-1/2">
                        <div className="relative h-[10vw]  center w-[12vw]">
                            <div className="bar_center w-[12vw] absolute  -rotate-45 h-[2.25vw]  rounded-xs  md:rounded-lg bg-white"></div>
                            <div className="bar_top w-[6vw] absolute  top-0 left-[1.5vw] h-[2.25vw]  rounded-xs  md:rounded-lg bg-white"></div>
                            <div className="bar_bottom w-[6vw] absolute  bottom-0 right-[1.5vw] h-[2.25vw]  rounded-xs  md:rounded-lg bg-white "></div>
                        </div>
                    </div>

                    <div className=" div_scale overflow-hidden scale-[.4]  md:scale-[.25]  gap-4 absolute center">
                        <div className=" absolute  word_error flex gap-4">
                            <div className=" err_anim_letter">
                                <img className='h-[10vw]' src="/svg/e.svg" alt="" />
                            </div>
                            <div className=" err_anim_letter">
                                <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                            </div>
                            <div className=" err_anim_letter">
                                <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                            </div>
                            <div className=" err_anim_letter">
                                <img className='h-[10vw]' src="/svg/o.svg" alt="" />
                            </div>
                            <div className=" err_anim_letter">
                                <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                            </div>
                        </div>
                        <div className="  word_zerror flex">
                            <div className=" anim_letter opacity_z">
                                <img className='h-[10vw]' src="/svg/z.svg" alt="" />
                            </div>
                            <div className="flex gap-x-2 md:gap-x-4">
                                <div className=" anim_letter">
                                    <img className='h-[10vw]' src="/svg/e.svg" alt="" />
                                </div>
                                <div className=" anim_letter">
                                    <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                                </div>
                                <div className=" anim_letter">
                                    <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                                </div>
                                <div className=" anim_letter">
                                    <img className='h-[10vw]' src="/svg/o.svg" alt="" />
                                </div>
                                <div className=" anim_letter">
                                    <img className='h-[10vw]' src="/svg/r.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" works_paren_header center fixed overflow-hidden  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-0 h-0 bg-white">
                        <div className="w-full  padding text_blue space-y-24 md:space-y-0 md:grid grid-cols-[28%_30%_42%]">
                            <div className="">
                                <p className=' wrk_split_wrd  pfn  text-6xl   leading-none'>Selected  <br />Works</p>
                            </div>
                            <div className="text-xs pt-4">
                                <p className='wrk_split_wrd '>Thoughtful Design.</p>
                                <p className='wrk_split_wrd '>Strong Technology.</p>
                            </div>
                            <div className=" max-sm:hidden text-4xl pl-2">
                                <p className=" wrk_split_wrd font-medium leading-11"> <span className='opacity-0 pointer-events-none'>................</span> We exist to end that trade off.  At Zerror, design and technology move as one — from first thought to final build. Every decision is intentional. Every detail measured. Every release stable.</p>
                            </div>
                            <div className=" md:hidden text-2xl ">
                                <p className=" wrk_split_wrd font-medium"> We exist to end that trade off.  At Zerror, design and technology move as one — from first thought to final build. Every decision is intentional. Every detail measured. Every release stable.</p>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}

export default About