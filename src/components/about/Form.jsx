import React from "react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Button from "../common/Button";
gsap.registerPlugin(SplitText);

const Form = ({ closeForm }) => {

  return (
    <div className=" form_paren opacity-0 hidden  w-[80vw] h-full  p-10 px-20  justify-center  relative  text-white ">

      <button onClick={closeForm} className="absolute cursor-pointer leading-none right-10 top-10 text-2xl z-10">✕</button>

      <div className="w-1/2 h-full flex flex-col justify-between ">
        <div className="">
          <p className=' capitalize pfn  text-5xl   leading-none'>  Become a <br /> Zerrorian </p>
        </div>
        <div className="w-full">
          <p className="text-[#f5f5f59d] select-none cursor-pointer">
            By clicking connect you accept our{" "}
            <span className="text-white">Privacy Policy </span>
          </p>
          <p className="text-[#f5f5f59d] select-none cursor-pointer">
            Prefer email ? {" "}
            <span className="text-white">hello@zerrorstudios.com </span>
          </p>
        </div>
      </div>

      <form className="w-1/2 pl-20  flex flex-col  justify-between   text-white ">
        <div className=" w-full flex flex-col gap-y-10">

          <Input label="Full Name *" />

          <Select
            label="Role *"
            options={["Founder", "Designer", "Developer", "Marketing", "Other"]}
          />

          <Input label="Email *" type="email" />

          <Input label="Phone Number *" type="tel" />

          <Input label="Tell us about yourself *" type="tel"/>

          <button
            className="full w-full hover:gap-x-4 h-fit border   hover:bg-[#0b3bd6] transition-all duration-150  border-[#ffffff42] rounded-lg gap-x-2 flex  justify-center items-center py-3 cursor-pointer"
          >
            <img className="invert-100 w-4" src="/icons/attach_file.png" alt="" />
            <p>Attach Resume</p>
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

const Input = ({ label, type = "text", className }) => (
  <div className={`text-white ${className} `}>
    <div className="form relative  overflow-hidden  pt-4">
      <input type={type} name="name" required />
      <label htmlFor="name" className="label-name">
        <span className="content-name">{label}</span>
      </label>
    </div>
  </div>
);

const Select = ({ label, options }) => (
  <div className="text-white cursor-pointer flex flex-col justify-end pb-2">
    <label className="block font-medium mb-2 text-white">
      {label}
    </label>
    <select className="w-full bg-transparent border-b border-[#ffffff42] text-white  outline-none transition-all duration-300">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="text-blue-800">
          {opt}
        </option>
      ))}
    </select>
  </div>
);
