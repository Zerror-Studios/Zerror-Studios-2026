"use client";
import React, { useEffect, useRef } from 'react';
import Button from '../common/Button';
import { useProjectForm } from '@/context/ProjectFormContext';
import BackgroundSnake from '../animation/BackgroundSnake';

const TicketEffect = () => {
    const { openProjectForm } = useProjectForm();


    return (
        <div className="w-full relative overflow-hidden bg-white py-20 md:py-28 select-none z-10">
           <BackgroundSnake/>
            {/* Text Header */}
            <div className="w-full center text_blue text-center space-y-6 relative z-50 flex-col px-4">
                <p data-para-effect className='text-5xl md:text-8xl primary-font leading-none'>
                    Ready to build <br />
                    something with<br /> <span className='primary-font_italic'> zero errors? </span>
                </p>

                <p className='leading-tight max-w-md text-base'>
                    Treat it like a first date. We’ll get to know each other better, with no obligations. No worries, the check is on us
                </p>
                <Button onClick={openProjectForm} title={"Start a project"} />
            </div>

        </div>
    );
};

export default TicketEffect;




