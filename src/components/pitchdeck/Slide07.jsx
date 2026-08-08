import React from 'react';
import Image from 'next/image';
import { clientsData } from '../expertise/ClientsMarquee';

const Slide07 = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center bg-black text-white relative">

      <div className="w-full h-full grid grid-cols-5">
        {clientsData.map((client) => (
          <div key={client.id} className="center border border-white/10">
            <div
             data-img-effect className=" size-14 md:size-20 lg:size-32 relative">
              <Image
                src={client.icon}
                alt={client.title}
                fill
                className="w-full h-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Slide07;

