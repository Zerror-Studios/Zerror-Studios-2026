import React from "react";

const InfoSection = () => {
  return (

    <div className="w-full   padding py-8! md:py-16! text_blue ">
      <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
        <div className="">
          <h2 data-para-effect className=' primary-font   text-5xl  leading-none'>The <br /> team </h2>
        </div>
        <div className="text-xs max-sm:hidden pt-4">
          <p className='font-thin'>The people behind</p>
          <p className='font-thin'>the brands.</p>
        </div>
        <div className=" text-3xl  md:pl-2">
          <h3 data-para-effect className="secondary-font">
            <span className='opacity-0  max-sm:hidden pointer-events-none'>...............</span>
            Designers, developers and strategists, under one name.
          </h3>
        </div>
      </div>
    </div>

  );
};

export default InfoSection;
