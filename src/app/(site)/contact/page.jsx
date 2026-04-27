"use client";
import FormSection from "@/components/contact/FormSection";
import HelpSection from "@/components/contact/HelpSection";
import SocialSection from "@/components/contact/SocialSection";
import ThanksSection from "@/components/contact/ThanksSection";
import React, { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/dist/SplitText";
import WebPageSchema from "@/components/seo/WebPageSchema";
gsap.registerPlugin(ScrollTrigger, SplitText);

const contact = () => {
  const [Num, SetNum] = useState(1);

  useGSAP(() => {
    const splitText = SplitText.create(".split_t", { type: "lines" });

    gsap.fromTo(splitText.lines, {
      yPercent: 50,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      ease: "expo.out",
      delay: .5,
      stagger: 0.03,
    })
  })

  return (
    <>
      <WebPageSchema
        name="Contact Zerror Studios"
        description="Get in touch with Zerror Studios to discuss GSAP-powered websites, creative development, and immersive digital experiences."
        url="https://www.zerrorstudios.com/contact"
      />

      <div className=" noise-bg relative w-full h-[100svh] flex flex-col md:flex-row overflow-hidden  bg-[#0000FF]">
        {/* Left */}
        <div className=" max-sm:hidden w-full md:w-1/2 h-[100svh] relative z-10">
          <p className=" split_t absolute bottom-[4%] left-[4%] flex flex-col primary-font text-5xl md:text-8xl text-white">
            Let’s <br />
            Talk
          </p>
        </div>

        {/* Right */}
        <div className=" w-full  relative z-10 md:w-1/2 h-[100svh] flex justify-end items-center max-sm:p-4  md:items-end md:pb-[2vw] md:pr-[5vw] relative">
          <div className="w-full pt-6 md:pt-0 h-[80vh] relative">
            {/* Sections with smooth transitions */}
            <div className="w-full h-full relative ">
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
                }  justify-between absolute -botttom-5 md:bottom-0`}
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
    </>
  );
};

export default contact;





// export const metadata = {
//   title: "Contact",
//   description:
//     "Get in touch with Zerror Studios to discuss animation-driven websites, creative development, and immersive digital experiences.",

//   keywords: [
//     "contact Zerror Studios",
//     "hire web studio",
//     "GSAP web agency",
//     "Next.js development contact",
//     "creative development inquiry",
//   ].join(", "),

//   alternates: {
//     canonical: "https://www.zerrorstudios.com/contact",
//   },

//   openGraph: {
//     title: "Contact | Zerror Studios",
//     description:
//       "Let’s collaborate on your next animation-driven website or digital product.",
//     url: "https://www.zerrorstudios.com/contact",
//     siteName: "Zerror Studios",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Contact | Zerror Studios",
//     description:
//       "Start a conversation with Zerror Studios about your next digital experience.",
//   },
// };
