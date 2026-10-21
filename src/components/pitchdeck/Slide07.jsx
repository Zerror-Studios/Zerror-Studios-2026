"use client";
import React from 'react';
import Image from 'next/image';
import { clientsData } from '../expertise/ClientsMarquee';
import Button from '../common/Button';
import { useProjectForm } from '@/context/ProjectFormContext';

const Slide07 = () => {
  const { openProjectForm } = useProjectForm();

  return (
    <section className="w-full h-full flex flex-col justify-center bg-black text-white relative">

      <div className="w-full h-full grid grid-cols-3 md:grid-cols-5">
        {clientsData.map((client) => (
          <div key={client.id} className="center border border-white/10">
            <div
             data-img-effect className=" size-32 md:size-44 lg:size-52 relative">
              <Image
                src={client.icon}
                alt={client.title}
                fill
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}

        {/* Last tile: opens the header's Start a project form */}
        <div className="bg-white text-black border-2 rounded-br-xl border-black p-3 md:p-5 flex flex-col justify-between items-start">
          <h3 className="secondary-font text-xl md:text-3xl leading-tight">
            Your brand <br /> could be next.
          </h3>
          <Button variant="black" title="Start a project" onClick={openProjectForm} />
        </div>
      </div>

    </section>
  );
};

export default Slide07;
