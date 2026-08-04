import React from "react";

const InfoSection = () => {
  return (

    <div className="w-full   padding py-10! md:py-24! text_blue ">
      <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
        <div className="">
          <h2 data-para-effect className=' capitalize primary-font   text-5xl  leading-none'>our <br /> team </h2>
        </div>
        <div className="text-xs max-sm:hidden pt-4">
          <p className='font-thin'>People behind the</p>
          <p className='font-thin'>systems we build.</p>
        </div>
        <div className=" text-3xl  md:pl-2">
          <h3 data-para-effect className="secondary-font">
            <span className='opacity-0  max-sm:hidden pointer-events-none'>...............</span>
            Our team brings together design, engineering, and strategy to build systems with clarity and intent. Every discipline works as part of a unified process — creating work that is precise, scalable, and built to perform.
          </h3>
        </div>
      </div>
    </div>

  );
};

export default InfoSection;
