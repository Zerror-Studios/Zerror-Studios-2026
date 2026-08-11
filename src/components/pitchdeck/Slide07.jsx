import React from 'react';
import Image from 'next/image';
import { clientsData } from '../expertise/ClientsMarquee';

const Slide07 = () => {
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
      </div>

    </section>
  );
};

export default Slide07;

