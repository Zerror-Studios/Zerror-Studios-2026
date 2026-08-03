"use client";
import useDevice from '@/components/hooks/useDevice';
import MobileWorkListing from '@/components/work/MobileWorkListing';
import WorkListing from '@/components/work/WorkListing';
import React from 'react'

const WorkClient = () => {
    const { isMobile, isDesktop } = useDevice();

    return (
        <>
            {isDesktop ? <WorkListing /> : <MobileWorkListing />}

        </>
    )
}

export default WorkClient