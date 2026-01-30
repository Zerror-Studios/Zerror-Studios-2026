"use client";
import FormSection from "@/components/contact/FormSection";
import HelpSection from "@/components/contact/HelpSection";
import SocialSection from "@/components/contact/SocialSection";
import ThanksSection from "@/components/contact/ThanksSection";
import React, { useState } from "react";

const contact = () => {
  const [Num, SetNum] = useState(1);

  return (
    <div className="w-full h-screen flex bg-[#002bba]">
      {/* Left */}
      <div className="w-1/2 h-screen relative">
        <p className=" absolute bottom-[4%] left-[4%] flex flex-col pfn text-8xl text-white">
          Let’s <br />
          Talk
        </p>
      </div>

      {/* Right */}
      <div className="w-1/2 h-screen flex justify-end items-end pb-[2vw] pr-[5vw] relative">
        <div className="w-full h-[80vh] relative">
          {/* Sections with smooth transitions */}
          <div className="w-full h-full relative overflow-hidden">
            <div className={`absolute inset-0 transition-all duration-500 ${Num === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <FormSection />
            </div>
            <div className={`absolute inset-0 transition-all duration-500 ${Num === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <HelpSection />
            </div>
            <div className={`absolute inset-0 transition-all duration-500 ${Num === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <SocialSection />
            </div>
            <div className={`absolute inset-0 transition-all duration-500 ${Num === 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
              <ThanksSection />
            </div>
          </div>

          {/* BTN-Section */}
          <div
            className={`w-full flex items-center ${Num == 1 && "justify-end"} ${Num == 4 && "hidden"
              }  justify-between absolute bottom-0`}
          >
            <button
              onClick={() => SetNum(Num - 1)}
              className={`bg-white ${Num == 1 && "hidden"
                }  text_blue px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors `}
            >
              Prev
            </button>

            <button
              onClick={() => SetNum(Num + 1)}
              className="bg-white text_blue px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact;
