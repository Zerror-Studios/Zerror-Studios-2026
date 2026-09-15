"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { clientsData } from '../expertise/ClientsMarquee';
import PixelGridCanvas from '@/components/common/PixelGridCanvas';

const ClientBox = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group client-box w-full overflow-hidden border border-white/10 relative aspect-square center cursor-pointer"
        >
            <PixelGridCanvas
                isActive={isHovered}
                color="#ffffff"
                boxSize={30}
                duration={1.5}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            <div className="w-full h-full relative z-10">
                <Image
                    src={item.icon}
                    fill
                    alt="Item icon Graphic"
                    className={`client-icon cover transition-all duration-300 ${
                        isHovered ? "invert" : ""
                    }`}
                />
            </div>
            <div className={`w-full uppercase absolute z-20 bottom-0 flex justify-between p-2 transition-colors duration-300 ${
                isHovered ? "text-black" : "text-white"
            }`}>
                <h5 className="secondary-font leading-none">{item.title}</h5>
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

    const visibleClients = isMobile
        ? clientsData.slice(0, clientsData.length - 2)
        : clientsData;

    return (
        <div className=' noise-bg clients_paren relative z-10  bg_blue py-8 md:py-16 space-y-8 md:space-y-16 text-white w-full'>

            <div className=" padding w-full z-20 relative text-white space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
                <div className="">
                    <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>Our <br /> Clients</h2>
                </div>
                <div className="text-xs max-sm:hidden pt-4">
                    <p data-para-effect className=' font-thin'>The company </p>
                    <p data-para-effect className=' font-thin'>we keep.</p>
                </div>
                <div className=" text-3xl  md:pl-2">
                    <h3 data-para-effect className=" secondary-font">
                        <span className='opacity-0  max-sm:hidden pointer-events-none' aria-hidden="true">...........................</span>
                        From global publishing houses to founders on their first launch, we work with teams that value clarity,
                        structure and scale.
                    </h3>
                </div>
            </div>

            <div className=" padding relative z-10 w-full grid grid-cols-3 md:grid-cols-5 ">
                {visibleClients.map((item, i) => (
                    <ClientBox key={i} item={item} />
                ))}
            </div>
        </div>
    )
}

export default Clients