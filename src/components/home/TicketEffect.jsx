"use client";
import React, { useEffect, useRef } from 'react';
import Button from '../common/Button';
import { useProjectForm } from '@/context/ProjectFormContext';
import BackgroundSnake from '../animation/BackgroundSnake';
import { STUDIO_EMAIL } from '@/lib/formMessages';

const TicketEffect = () => {
    const { openProjectForm } = useProjectForm();


    return (
        <div className="w-full relative overflow-hidden bg-white py-20 md:py-28 select-none z-10">
           <BackgroundSnake/>
            {/* Text Header */}
            <div className="w-full center text_blue text-center space-y-6 relative z-50 flex-col px-4">
                <p data-para-effect className='text-5xl md:text-8xl primary-font leading-none'>
                    Have a brand <br />
                    <span className='primary-font_italic'> in mind? </span>
                </p>

                <p className='leading-tight max-w-md text-base'>
                    Let’s talk.
                </p>
                <Button onClick={openProjectForm} title={"Start a project"} />
                <a href={`mailto:${STUDIO_EMAIL}`} className='leading-tight text-base underline decoration-1 underline-offset-4 hover:opacity-60 transition-opacity duration-300'>
                    {STUDIO_EMAIL}
                </a>
            </div>

        </div>
    );
};

export default TicketEffect;




