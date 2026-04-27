"use client";
import React from "react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Button from "../common/Button";
import Select from "../common/Select";
import Input from "../common/Input";
gsap.registerPlugin(SplitText);

const Form = ({ closeForm }) => {

  return (
    <div className=" form_paren max-sm:flex-col opacity-0 hidden  w-[90vw] md:w-[80vw] h-full  p-5 py-10 md:p-20  justify-between md:justify-center  relative  text-white ">

      <button onClick={closeForm} className="absolute cursor-pointer leading-none right-10 top-10 text-2xl z-10">✕</button>

      <div className="w-full space-y-5 mb-10 md:mb-0 md:space-y-0 md:h-full flex flex-col justify-between ">
        <div className="">
          <p className=' capitalize primary-font text-4xl md:text-5xl md:text-6xl   leading-none'>  Become a <br /> Zerrorian </p>
        </div>
        <div className="w-full">
          <p className="text-[#f5f5f59d] select-none  font-thin cursor-pointer">
            By clicking connect you accept our{" "}
            <span className="text-white font-thin underline">Privacy Policy </span>
          </p>
          <p className="text-[#f5f5f59d] select-none font-thin cursor-pointer">
            Prefer email ? {" "}
            <span className="text-white  font-thin underline">hello@zerrorstudios.com </span>
          </p>
        </div>
      </div>

      <form className="w-full   flex flex-col space-y-5  md:space-y-0  justify-between   text-white ">
        <div className=" w-full flex flex-col gap-y-10">

          <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
            <Input label="First Name *" />
            <Input label="Last Name *" />
          </div>

          <Select
            label="Role *"
            options={["Founder", "Designer", "Developer", "Marketing", "Other"]}
          />
          <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
            <Input label="Email *" type="email" />
            <Input label="Phone Number *" type="tel" />
          </div>

          <div className="form relative h-[10vw]">
            <textarea
              name="about"
              required
              placeholder=" "
              className="w-full resize-none scroller_none outline-none bg-transparent"
            />
            <label className="label-name">
              <span className="content-name font-thin">
                Tell us a little bit about yourself
              </span>
            </label>
          </div>


          <button
            className="full w-full hover:gap-x-4 h-fit border   hover:bg-[#0b3bd6] transition-all duration-150  border-[#ffffff42] rounded-lg gap-x-2 flex  justify-center items-center py-3 cursor-pointer"
          >
            <img className="invert-100 w-4" src="/icons/attach_file.png" alt="loading img" />
            <p className="font-thin">Attach Resume</p>
          </button>

        </div>

        <div className="w-full  center">
          <Button type="submit" title="Submit" variant="fill" />
        </div>
      </form>

    </div>
  );
};

export default Form;

