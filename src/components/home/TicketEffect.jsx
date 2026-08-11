"use client"
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import Button from '../common/Button';
import { useProjectForm } from "@/context/ProjectFormContext";
import GlobeEffect from './GlobeEffect';

gsap.registerPlugin(MotionPathPlugin);

const TicketEffect = () => {

    const { openProjectForm } = useProjectForm();

    return (
        <div className="w-full relative overflow-hidden bg-white">
            {/* Globe Background */}
            <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
                <GlobeEffect />
            </div>

            <div className="w-full py-24 center text_blue text-center space-y-10 pointer-events-none relative z-10 flex-col">
                <p data-para-effect className=' text-5xl md:text-8xl primary-font   leading-none'>Ready to build <br />
                    something with<br /> <span className='primary-font_italic'> zero errors? </span> </p>

                <p className=' leading-tight '>Your next version starts here. <br /> Tell us what you're making.</p>

                <div className="flex gap-x-5">
                    <div className="bg-white pointer-events-auto rounded-md">
                        <Button title={"start a project"} onClick={openProjectForm} />
                    </div>
                    <div className="bg-white pointer-events-auto rounded-md">
                        <Button title={"Contact"} link={"/contact"} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TicketEffect