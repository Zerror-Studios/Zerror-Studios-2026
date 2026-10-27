"use client"
import React, { useState, useEffect } from 'react'
import { clientsData } from '../expertise/ClientsMarquee';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
import { useProjectForm } from '@/context/ProjectFormContext';
import Button from '../common/Button';
import { RiArrowRightUpLine } from '@remixicon/react';
import SectionHeader from "@/components/common/SectionHeader";
import Br from "@/components/common/Br";
import ClientLogo from "@/components/common/ClientLogo";

const studioNumbers = [
    { prefix: "Since", value: "2022" },
    { value: "100+", label: "clients" },
    { value: "200+", label: "websites and products" },
    { value: "80+", label: "online stores" },
];

const ClientBox = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group client-box w-full overflow-hidden border border-[#002bba]/10 relative aspect-square center relative cursor-pointer"
        >
            <PixelGridCanvas
                isActive={isHovered}
                color="#002bba"
                boxSize={30}
                duration={1.5}
                className="absolute max-sm:hidden inset-0 w-full h-full pointer-events-none z-0"
            />

            <ClientLogo
                src={item.icon}
                title={item.title}
                className={`client-icon w-full relative z-10 text-[#002bba] transition-colors duration-300 ${isHovered ? "md:text-white" : ""
                    }`}
            />
            <div className={`w-full max-sm:hidden uppercase absolute z-20 bottom-0 flex justify-between p-2 transition-colors duration-300 ${isHovered ? "text-white" : "text_blue"
                }`}>
                <p className="para">{item.title}</p>
            </div>
        </div>
    );
};

const ClientCtaBox = () => {
    const { openProjectForm } = useProjectForm();

    return (
        <div
            onClick={openProjectForm}
            className="w-full aspect-square bg_blue text-white border border-[#002bba]/10 p-2 md:p-4 flex flex-col justify-between items-start">
            <p className="secondary-font h5 max-sm:text-[1.25rem]!">
                Your brand <Br /> could be next.
            </p>
            <div className="max-sm:hidden">
                <Button variant="white" title="Start a project" onClick={openProjectForm} />
            </div>
            {/* Mobile: just an arrow; the card is too small for the full button */}
            <button
                type="button"
                aria-label="Start a project"
                className="md:hidden! size-7 center rounded-full border border-white text-white active:bg-white active:text-[#002bba] transition-colors"
            >
                <RiArrowRightUpLine size={14} />
            </button>
        </div>
    );
};

const Clients = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <>
            <div className='clients_paren relative z-10   py-section space-y-block text_blue w-full bg-white '>

                <SectionHeader
                    title={<>Our <Br /> clients</>}
                    lines={["The company", "we keep."]}
                    className="padding z-20 relative text_blue"
                >
                    Publishers, film houses, fashion labels and founders on their first launch. More than 100 brands since 2022.
                </SectionHeader>

                <div className=" padding relative z-10 w-full grid grid-cols-3 md:grid-cols-5 ">
                    {clientsData.map((item, i) => (
                        <ClientBox key={i} item={item} />
                    ))}
                    <ClientCtaBox />
                </div>


            </div>
        </>

    )
}

export default Clients