import React from 'react';
import { createMetadata } from "@/lib/seo";
import WorksGrid from '@/components/work/WorksGrid';
import TicketEffect from '@/components/home/TicketEffect';

export const metadata = createMetadata({
  title: "Selected Work — Zerror Studios",
  description: "Cases with teeth. Real clients, real stakes, real results — from global magazine launches to a commerce platform built from scratch.",
  path: "/work",
});

const page = () => {
  return (
    <>
      <h1 className='opacity-0 fixed pointer-events-none'>Explore Latest Work</h1>
      <WorksGrid />
      <TicketEffect/>
    </>
  );
};

export default page;