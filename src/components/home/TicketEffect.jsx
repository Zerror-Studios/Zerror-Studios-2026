"use client";
import React, { useEffect, useRef } from 'react';
import Button from '../common/Button';
import { useProjectForm } from '@/context/ProjectFormContext';
import BackgroundSnake from '../animation/BackgroundSnake';
import { STUDIO_EMAIL } from '@/lib/formMessages';
import Br from "@/components/common/Br";

const TicketEffect = () => {
    const { openProjectForm } = useProjectForm();


    return (
        <div className="w-full relative overflow-hidden bg-white py-section select-none z-10">
           <BackgroundSnake/>
            {/* Text Header */}
            <div className="w-full center text_blue text-center space-y-6 relative z-50 flex-col px-4">
                <p data-para-effect className='h1'>
                    Have a brand <Br />
                    <span className='primary-font_italic'> in mind? </span>
                </p>

                <p className='max-w-md para'>
                    Let’s talk.
                </p>
                <Button onClick={openProjectForm} title={"Start a project"} />
                <a href={`mailto:${STUDIO_EMAIL}`} className='para underline decoration-1 underline-offset-4 hover:opacity-60 transition-opacity duration-300'>
                    {STUDIO_EMAIL}
                </a>
            </div>

        </div>
    );
};

export default TicketEffect;




