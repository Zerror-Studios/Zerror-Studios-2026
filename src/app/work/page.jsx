import useDevice from '@/components/hooks/useDevice';
import MobileWorkListing from '@/components/work/MobileWorkListing';
import WorkListing from '@/components/work/WorkListing'
import React from 'react'
import WorkClient from './WorkClient';
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Selected Work — Zerror Studios",
  description: "Cases with teeth. Real clients, real stakes, real results — from global magazine launches to a commerce platform built from scratch.",
  path: "/work",
});

const page = () => {

  return (
    <>
      <h1 className='opacity-0 fixed  pointer-events-none'>Explore Latest Work</h1>
      <WorkClient />
    </>
  )
}

export default page