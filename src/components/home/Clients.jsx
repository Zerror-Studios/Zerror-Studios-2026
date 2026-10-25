"use client"
import React, { useState, useEffect } from 'react'
import { clientsData } from '../expertise/ClientsMarquee';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';
import { useProjectForm } from '@/context/ProjectFormContext';
import Button from '../common/Button';

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

            {/* Logos are white silhouettes — use them as a mask so they take the brand color */}
            <div
                role="img"
                aria-label={item.title}
                className={`client-icon w-full h-full relative z-10 bg-[#002bba] transition-colors duration-300 ${
                    isHovered ? "md:bg-white" : ""
                }`}
                style={{
                    WebkitMaskImage: `url(${item.icon})`,
                    maskImage: `url(${item.icon})`,
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                }}
            />
            <div className={`w-full max-sm:hidden uppercase absolute z-20 bottom-0 flex justify-between p-2 transition-colors duration-300 ${
                isHovered ? "text-white" : "text_blue"
            }`}>
                <h5 className="secondary-font leading-none">{item.title}</h5>
            </div>
        </div>
    );
};

const ClientCtaBox = () => {
    const { openProjectForm } = useProjectForm();

    return (
        <div className="w-full aspect-square bg_blue text-white border border-[#002bba]/10 p-2 md:p-4 flex flex-col justify-between items-start">
            <h3 className="secondary-font text-xl md:text-3xl leading-none">
                Your brand <br /> could be next.
            </h3>
            <div className="max-sm:scale-75 max-sm:-translate-x-4 max-sm:translate-y-2">
            <Button variant="white" title="Start a project" onClick={openProjectForm} />
            </div>
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
        <div className='clients_paren relative z-10   py-8 md:py-16 space-y-8 md:space-y-16 text_blue w-full bg-white '>

            <div className=" padding w-full z-20 relative text_blue space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className=' primary-font   text-5xl  leading-none'>Our <br /> clients</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p data-para-effect className=' font-thin'>The company </p>
                    <p data-para-effect className=' font-thin'>we keep.</p>
                </div>
                <div className="text-3xl md:pl-2">
                    <h3 data-para-effect className="secondary-font">
                        <span className="opacity-0 max-sm:hidden pointer-events-none" aria-hidden="true">...............</span>
                        Publishers, film houses, fashion labels and founders on their first launch. More than 100 brands since 2022.
                    </h3>
                </div>
            </div>

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