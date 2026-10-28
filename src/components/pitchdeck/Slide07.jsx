"use client";
import React from 'react';
import { clientsData } from '../expertise/ClientsMarquee';
import ClientLogo from '../common/ClientLogo';
import Button from '../common/Button';
import { useProjectForm } from '@/context/ProjectFormContext';
import { RiArrowRightUpLine } from '@remixicon/react';

const Slide07 = () => {
  const { openProjectForm } = useProjectForm();

  return (
    <section className="w-full h-full flex flex-col justify-center bg-black text-white relative">

      <div className="w-full h-full grid grid-cols-3 md:grid-cols-5">
        {clientsData.map((client) => (
          <div key={client.id} className="center border border-white/10">
            <div
              data-img-effect className=" size-32 md:size-44 lg:size-52 relative">
              {/* 3x PNG renders of the logo SVGs — mobile browsers rasterize the mask-based SVGs at 288px and blur them */}
              <img
                src={client.icon.replace('/images/homePage/clients/', '/images/pitchdeck/clients/').replace('.svg', '.png')}
                alt={client.title}
                className="w-full"
              />

            </div>
          </div>
        ))}

        {/* Last tile: opens the header's Start a project form */}
        <div onClick={openProjectForm} className="bg-white text-black border-2 rounded-br-md border-black p-3 md:p-5 flex flex-col justify-between items-start">
          <h3 className="secondary-font text-base md:text-3xl leading-tight">
            Your brand <br /> could be next.
          </h3>
          <Button variant="black" title="Start a project" className="max-sm:hidden"/>
          <button
            type="button"
            aria-label="Start a project"
            className="md:hidden! size-7 center rounded-full border border-black text-black"
          >
            <RiArrowRightUpLine size={14} />
          </button>
        </div>
      </div>

    </section>
  );
};

export default Slide07;
