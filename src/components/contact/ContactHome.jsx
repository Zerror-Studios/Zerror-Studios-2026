"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSection from "@/components/contact/FormSection";
import HelpSection from "@/components/contact/HelpSection";
import SocialSection from "@/components/contact/SocialSection";
import ThanksSection from "@/components/contact/ThanksSection";
import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import WebPageSchema from "@/components/seo/WebPageSchema";
gsap.registerPlugin(ScrollTrigger, SplitText);
import HeroScene from "@/components/Scene/HeroScene.jsx";


const ContactHome = () => {

    const [Num, SetNum] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        phoneNumber: "",
        email: "",
        helpType: "",
        socialSources: [],
    });

    useGSAP(() => {
        const splitText = SplitText.create(".split_t", { type: "lines" });

        gsap.fromTo(splitText.lines, {
            yPercent: 50,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            ease: "expo.out",
            delay: .5,
            stagger: 0.03,
        })
    })

    const handleSubmit = async () => {
        // 🔴 VALIDATION FIRST
        if (!formData.firstName.trim()) {
            toast.error("First name is required");
            return;
        }

        if (!formData.phoneNumber.trim()) {
            toast.error("Phone number is required");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required");
            return;
        }

        // Optional: email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Enter a valid email");
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // ⚠️ you missed this earlier
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Message sent successfully 🚀");
                SetNum(4);
            } else {
                toast.error("Something went wrong");
            }
        } catch (err) {
            console.log(err);
            toast.error("Server error");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />

                <div className="site-background  site-background-desktop  fixed bg_blue top-0 left-0   w-full h-screen z-[1]">
                    <HeroScene />
                  </div>
            <div className="  bg_blue relative w-full h-[100svh] flex flex-col md:flex-row overflow-hidden">
                {/* Left */}
                <div className=" max-sm:hidden w-full md:w-1/2 h-[100svh] relative z-10">
                    <h1 className=" split_t absolute bottom-[4%] left-[4%] flex flex-col primary-font text-5xl md:text-8xl text-white">
                        Let’s <br />
                        Talk
                    </h1>
                </div>

                {/* Right */}
                <div className=" w-full  relative z-10 md:w-1/2 h-[100svh] flex justify-end items-center max-sm:p-4  md:items-end md:pb-[2vw] md:pr-[5vw] relative">
                    <div className="w-full pt-6 md:pt-0 h-[80vh] relative">
                        {/* Sections with smooth transitions */}
                        <div className="w-full h-full relative ">
                            <div className={`absolute inset-0 transition-all duration-500 ${Num === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                                <FormSection formData={formData} setFormData={setFormData} />
                            </div>
                            <div className={`absolute inset-0 transition-all duration-500 ${Num === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                                <HelpSection formData={formData} setFormData={setFormData} />
                            </div>
                            <div className={`absolute inset-0 transition-all duration-500 ${Num === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                                <SocialSection formData={formData} setFormData={setFormData} />
                            </div>
                            <div className={`absolute inset-0 transition-all duration-500 ${Num === 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                                <ThanksSection />
                            </div>
                        </div>

                        {/* BTN-Section */}
                        <div
                            className={`w-full flex items-center ${Num == 1 && "justify-end"} ${Num == 4 && "hidden"
                                }  justify-between absolute -botttom-5 md:bottom-0`}
                        >
                            <button
                                onClick={() => SetNum(Num - 1)}
                                className={`bg-white ${Num == 1 && "hidden"
                                    }  text_blue px-8 py-3 rounded-lg font-medium hover:bg-[#002bba] hover:text-white! hover:border-white border transition-colors `}
                            >
                                                            <p className="translate-y-0.5 uppercase">
                                Prev
                                </p>
                                    
                            </button>

                            <button
                                className="bg-white text_blue px-8 py-3 rounded-lg font-medium hover:bg-[#002bba] hover:text-white! hover:border-white border transition-colors "
                                onClick={() => {
                                    if (Num === 1) {
                                        if (!formData.firstName || !formData.email || !formData.phoneNumber) {
                                            toast.error("Please fill all required fields");
                                            return;
                                        }
                                        SetNum(2);
                                    } else if (Num === 3) {
                                        handleSubmit();
                                    } else {
                                        SetNum(Num + 1);
                                    }
                                }}
                            >
                                <p className="translate-y-0.5 uppercase">
                                {Num === 3 ? "Submit" : "Next"}
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactHome