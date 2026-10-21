import React from 'react';
import { createMetadata } from "@/lib/seo";
import WorksGrid from '@/components/work/WorksGrid';
import TicketEffect from '@/components/home/TicketEffect';

export const metadata = createMetadata({
  title: "Work | Zerror Studios",
  description: "Brands we've built, from RPSG Lifestyle Media and Salman Khan Films to founders on day one.",
  path: "/work",
});

const page = () => {
  return (
    <>
      <h1 className='opacity-0 fixed pointer-events-none'>Explore Latest Work</h1>
      <WorksGrid />
    </>
  );
};

export default page;