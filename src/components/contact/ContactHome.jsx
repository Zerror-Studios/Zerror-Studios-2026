"use client";
import FormSection from "@/components/contact/FormSection";
import HelpSection from "@/components/contact/HelpSection";
import BudgetSection from "@/components/contact/BudgetSection";
import SocialSection from "@/components/contact/SocialSection";
import ThanksSection from "@/components/contact/ThanksSection";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import { dropHiddenBreaks } from "@/lib/splitText";
import HeroScene from "@/components/Scene/HeroScene.jsx";
import {
    FORM_MESSAGES,
    isValidEmail,
    isValidPhone,
    failureKind,
} from "@/lib/formMessages";
import { notifySuccess, showFailure, showFieldErrors } from "@/lib/notify";
import { trackLead } from "@/lib/analytics";
import Br from "@/components/common/Br";
gsap.registerPlugin(ScrollTrigger, SplitText);

const LAST_STEP = 4;
const SENT_STEP = 5;

const buttonClass =
    "bg-white text_blue px-8 py-3 rounded-lg font-medium hover:bg-[#002bba] hover:text-white! hover:border-white border transition-colors ";

const validateStep = (step, data) => {
    const errors = {};
    if (step === 1) {
        if (!data.name.trim()) errors.name = FORM_MESSAGES.fields.name;
        if (!data.brand.trim()) errors.brand = FORM_MESSAGES.fields.brand;
        if (!isValidEmail(data.email)) errors.email = FORM_MESSAGES.fields.email;
        if (data.phone.trim() && !isValidPhone(data.phone)) errors.phone = FORM_MESSAGES.fields.phone;
    }
    if (step === 2) {
        if (!data.services.length) errors.services = FORM_MESSAGES.fields.services;
    }
    return errors;
};

const ContactHome = () => {

    const [Num, SetNum] = useState(1);
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const sendingRef = useRef(false);

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        email: "",
        phone: "",
        services: [],
        details: "",
        budget: "",
        socialSources: [],
    });

    useGSAP(() => {
        dropHiddenBreaks(".heading_split");
        const heading_split = SplitText.create(".heading_split", {
            type: "lines",
            linesClass: "split-line"
        });

        [...heading_split.lines].forEach((line) => {
            const wrapper = document.createElement("div");

            wrapper.classList.add("line-wrapper");

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set([heading_split.lines], { yPercent: 100, x: 10 });

        const tl = gsap.timeline({
            delay: 0.5
        })
        tl.to(".content_box", {
            opacity: 1,
            duration: 0.01
        })
        tl.to(heading_split.lines, {
            yPercent: 0,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
        }, "<");


    });

    const handleSubmit = async () => {
        if (sendingRef.current) return;

        // Re-check the required steps in case someone skipped ahead.
        for (const step of [1, 2]) {
            const stepErrors = validateStep(step, formData);
            if (Object.keys(stepErrors).length) {
                setErrors(stepErrors);
                showFieldErrors(stepErrors);
                SetNum(step);
                return;
            }
        }

        if (typeof navigator !== "undefined" && navigator.onLine === false) {
            showFailure("offline");
            return;
        }

        sendingRef.current = true;
        setSending(true);

        const payload = {
            // New field names
            name: formData.name.trim(),
            brand: formData.brand.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            services: formData.services,
            details: formData.details.trim(),
            budget: formData.budget,
            source: formData.socialSources.join(", "),
            // Old field names, kept so the current API route still works
            firstName: formData.name.trim(),
            phoneNumber: formData.phone.trim(),
            helpType: formData.services.join(", "),
            socialSources: formData.socialSources,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok && data.success) {
                trackLead("contact");
                notifySuccess(FORM_MESSAGES.sentTitle, "We read every message ourselves and will be in touch soon.");
                SetNum(SENT_STEP);
            } else {
                showFailure("error");
            }
        } catch (err) {
            console.error(err);
            showFailure(failureKind());
        } finally {
            sendingRef.current = false;
            setSending(false);
        }
    };

    const handleNext = () => {
        if (Num === LAST_STEP) {
            handleSubmit();
            return;
        }
        const stepErrors = validateStep(Num, formData);
        setErrors(stepErrors);
        showFieldErrors(stepErrors);
        if (Object.keys(stepErrors).length) return;
        SetNum(Num + 1);
    };

    // Desktop stacks every step in a fixed-height box; on mobile the active step sits in the flow so the page takes its height
    const stepClass = (step) =>
        `transition-all duration-500 ${Num === step ? 'relative md:absolute md:inset-0 opacity-100 translate-x-0' : 'absolute inset-0 opacity-0 translate-x-full pointer-events-none'}`;

    const sendFooter = (
        <div className="space-y-4">
            <p className="text-white para-sm">
                By sending this, you agree to our{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-blue-200 transition-colors">
                    Privacy policy
                </Link>
                .
            </p>
        </div>
    );

    return (
        <>
            <div className="site-background  site-background-desktop  fixed bg_blue top-0 left-0   w-full h-screen z-[1]">
                <HeroScene />
            </div>

            <div className="bg_blue relative w-full md:h-[100svh] flex flex-col md:flex-row overflow-hidden">
                {/* Left */}
                <div className=" content_box padding md:pr-0! md:pb-5 w-full md:w-1/2 h-[50svh] md:h-[100svh] flex flex-col justify-end relative z-10">
                    <h1 className="w-full heading_split text-white">
                        Tell us about <Br />
                        your brand.
                    </h1>
                </div>

                {/* Right */}
                <div className="w-full relative z-10 md:w-1/2 md:h-[100svh] max-md:flex-col flex justify-end items-center padding md:pb-5 md:pl-0! md:items-end max-md:pt-hero max-md:pb-section">
                    <div className="w-full md:h-[80vh] relative">
                        {/* Sections with smooth transitions */}
                        <div className="w-full md:h-full relative" aria-live="polite">
                            <div className={stepClass(1)} inert={Num !== 1}>
                                <FormSection formData={formData} setFormData={setFormData} errors={errors} />
                            </div>
                            <div className={stepClass(2)} inert={Num !== 2}>
                                <HelpSection formData={formData} setFormData={setFormData} errors={errors} />
                            </div>
                            <div className={stepClass(3)} inert={Num !== 3}>
                                <BudgetSection formData={formData} setFormData={setFormData} />
                            </div>
                            <div className={stepClass(LAST_STEP)} inert={Num !== LAST_STEP}>
                                <SocialSection formData={formData} setFormData={setFormData}>
                                    {sendFooter}
                                </SocialSection>
                            </div>
                            <div className={stepClass(SENT_STEP)} inert={Num !== SENT_STEP}>
                                <ThanksSection />
                            </div>
                        </div>

                        {/* BTN-Section */}
                        <div
                            className={`w-full flex items-center ${Num == 1 && "justify-end"} ${Num == SENT_STEP && "hidden"
                                }  justify-between max-md:mt-block md:absolute md:bottom-0`}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setErrors({});
                                    SetNum(Num - 1);
                                }}
                                disabled={sending}
                                className={`bg-white ${Num == 1 && "hidden"
                                    }  text_blue px-8 py-3 rounded-lg font-medium hover:bg-[#002bba] hover:text-white! hover:border-white border transition-colors `}
                            >
                                <p className="translate-y-0.5 uppercase">
                                    Back
                                </p>

                            </button>

                            <button
                                type="button"
                                className={`${buttonClass} disabled:opacity-60 disabled:cursor-not-allowed`}
                                onClick={handleNext}
                                disabled={sending}
                                aria-busy={sending || undefined}
                            >
                                <p className="translate-y-0.5 uppercase">
                                    {Num === LAST_STEP
                                        ? (sending ? FORM_MESSAGES.sending : FORM_MESSAGES.send)
                                        : "Next"}
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
