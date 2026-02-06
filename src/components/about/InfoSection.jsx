import React from "react";

const InfoSection = () => {
  return (

    <div className="w-full   padding py-10! md:py-32! text_blue ">
      <div className="w-full space-y-24 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
        <div className="">
          <p className=' capitalize pfn  text-6xl   leading-none'>our <br /> team </p>
        </div>
        <div className="text-xs pt-4">
          <p className=''>Integral parts </p>
          <p className=''>of zerror</p>
        </div>
        <div className="capitalize   text-2xl md:text-4xl  md:pl-2">
          <p className="font-medium md:leading-11"> <span className='opacity-0 max-sm:hidden pointer-events-none'>...............</span> The people behind Zerror are designers, developers, and strategists who care deeply about craft, clarity, and impact.</p>
        </div>
      </div>
    </div>

  );
};

export default InfoSection;
