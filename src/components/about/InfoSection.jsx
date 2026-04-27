import React from "react";

const InfoSection = () => {
  return (

    <div className="w-full   padding py-10! md:py-32! text_blue ">
      <div className="w-full space-y-12 md:space-y-0  md:grid grid-cols-[28%_30%_42%]">
        <div className="">
          <p className=' capitalize primary-font  text-5xl md:text-6xl    leading-none'>our <br /> team </p>
        </div>
        <div className="text-xs max-sm:hidden pt-4">
          <p className='font-thin'>People behind the</p>
          <p className='font-thin'>systems we build.</p>
        </div>
        <div className="capitalize   text-2xl md:text-4xl  md:pl-2">
          <p className="">
            <span className='opacity-0 max-sm:hidden pointer-events-none'>...............</span>
            Our team brings together design, engineering, and strategy to build systems with clarity and intent. Every discipline works as part of a unified process — creating work that is precise, scalable, and built to perform.
          </p>
        </div>
      </div>
    </div>

  );
};

export default InfoSection;
