"use client";
import React, { useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Button from "../common/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "../common/Select";
import { Input } from "../common/Input";
gsap.registerPlugin(SplitText);

const Form = ({ closeForm }) => {

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    phone: "",
    about: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      if (file) {
        form.append("resume", file);
      }

      const res = await fetch("/api/becomeZerrorian", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Form submitted successfully 🚀");
        closeForm();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <>
      <div className=" form_paren max-sm:flex-col opacity-0 hidden  w-[90vw] md:w-[80vw] h-full  p-5 py-10 md:p-20  justify-between md:justify-center  relative  text-white ">

        <button onClick={closeForm} className="absolute cursor-pointer leading-none right-10 top-10 text-2xl z-10">✕</button>

        <div className="w-full space-y-5 mb-10 md:mb-0 md:space-y-0 md:h-full flex flex-col justify-between ">
          <div className="">
            <h2 className=' capitalize primary-font text-3xl md:text-5xl   leading-none'>  Become a <br /> Zerrorian </h2>
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

        <form className="w-full   flex flex-col space-y-5  md:space-y-0  justify-between   text-white " onSubmit={handleSubmit}>
          <div className=" w-full flex flex-col max-sm:mb-10 gap-y-10">

            <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
              <Input name="firstName" label="First Name *" onChange={handleChange} />
              <Input name="lastName" label="Last Name *" onChange={handleChange} />
            </div>

            <Select
              label="Role *"
              name="role"
              options={["Co-Founder", "Ui/Ux Designer", "Frontend Developer", "Backend Developer", "Marketing Specialist", "Other"]}
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
              <Input name="email" label="Email *" type="email" onChange={handleChange} />
              <Input name="phone" label="Phone Number *" type="tel" onChange={handleChange} />
            </div>

            <div className="form relative h-[10vw]">
              <textarea
                name="about"
                required
                placeholder=" "
                onChange={(e) => handleChange("about", e.target.value)}
                className="w-full resize-none scroller_none outline-none bg-transparent"
              />
              <label className="label-name">
                <span className="content-name font-thin">
                  Tell us a little bit about yourself
                </span>
              </label>
            </div>


            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="resumeUpload"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              type="button"
              onClick={() => document.getElementById("resumeUpload").click()}
              className="full w-full hover:gap-x-4 h-fit border hover:bg-[#0b3bd6] transition-all duration-150 border-[#ffffff42] rounded-lg gap-x-2 flex justify-center items-center py-3 cursor-pointer"
            >
              <img className="invert-100 w-4" src="/icons/attach_file.png" alt="attach" />
              <p className="font-thin">
                {file ? file.name : "Attach Resume"}
              </p>
            </button>

          </div>

          <div className="w-full  center">
            <Button type="submit" title="Submit" variant="fill" />
          </div>
        </form>

      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Form;

