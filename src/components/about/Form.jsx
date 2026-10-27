"use client";
import React, { useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/dist/SplitText";
import Link from "next/link";
import Button from "../common/Button";
import Select from "../common/Select";
import { Input } from "../common/Input";
import { FORM_MESSAGES, STUDIO_EMAIL, failureKind, isValidEmail, isValidPhone } from "@/lib/formMessages";
import { trackLead } from "@/lib/analytics";
import { notifySuccess, showFailure, showFieldErrors } from "@/lib/notify";
import Br from "@/components/common/Br";
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
  // "idle" | "sending" | "sent" | "error" | "offline" | "invalid"
  const [status, setStatus] = useState("idle");
  const isSending = status === "sending";

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const errors = {};
    if (!formData.firstName.trim() || !formData.lastName.trim()) errors.name = FORM_MESSAGES.fields.name;
    if (!formData.role) errors.role = "Pick the role you're applying for.";
    if (!isValidEmail(formData.email)) errors.email = FORM_MESSAGES.fields.email;
    if (!isValidPhone(formData.phone)) errors.phone = FORM_MESSAGES.fields.phone;
    if (!formData.about.trim()) errors.about = "Tell us a little about yourself.";
    if (file && file.size > 5 * 1024 * 1024) errors.file = "Your resume needs to be under 5 MB.";

    if (Object.keys(errors).length) {
      setStatus("invalid");
      showFieldErrors(errors);
      return;
    }

    setStatus("sending");

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

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("sent");
        trackLead("careers");
        notifySuccess("Application sent.", FORM_MESSAGES.careersSent);
      } else {
        setStatus("error");
        showFailure("error");
      }
    } catch {
      const kind = failureKind();
      setStatus(kind);
      showFailure(kind);
    }
  };

  return (
    <>
      <div className=" form_paren max-sm:flex-col opacity-0 hidden  w-[90vw] md:w-[80vw] h-full  p-5 py-10 md:p-20  justify-between md:justify-center  relative  text-white ">

        <button onClick={closeForm} aria-label="Close" className="absolute cursor-pointer leading-none right-10 top-10 text-2xl z-10">✕</button>

        <div className="w-full space-y-5 mb-10 md:mb-0 md:space-y-0 md:h-full flex flex-col justify-between ">
          <div>
            <h2 className='h3'>  Become a <Br /> Zerrorian </h2>
          </div>
          <div className="w-full">
            <p className="text-[#f6f8ff9d] select-none  font-thin">
              By sending this, you agree to our{" "}
              <Link href="/privacy" className="text-white font-thin underline">Privacy policy</Link>.
            </p>
            <p className="text-[#f6f8ff9d] select-none font-thin">
              Prefer email?{" "}
              <a href={`mailto:${STUDIO_EMAIL}`} className="text-white  font-thin underline">{STUDIO_EMAIL}</a>
            </p>
          </div>
        </div>

        {status === "sent" ? (
          <div className="w-full flex flex-col justify-center text-white" role="status" aria-live="polite">
            <p className="h5">
              {FORM_MESSAGES.careersSent}
            </p>
          </div>
        ) : (
          <form className="w-full   flex flex-col space-y-5  md:space-y-0  justify-between   text-white " onSubmit={handleSubmit} noValidate>
            <div className=" w-full flex flex-col max-sm:mb-10 gap-y-10">

              <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
                <Input name="firstName" label="First name *" onChange={handleChange} />
                <Input name="lastName" label="Last name *" onChange={handleChange} />
              </div>

              <Select
                label="Role *"
                name="role"
                options={["Co-founder", "UI/UX designer", "Frontend developer", "Backend developer", "Marketing specialist", "Other"]}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-x-5 md:gap-x-10">
                <Input name="email" label="Email *" type="email" onChange={handleChange} />
                <Input name="phone" label="Phone number *" type="tel" onChange={handleChange} />
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
                onChange={(e) => {
                  const picked = e.target.files[0];
                  setFile(picked);
                  if (picked) notifySuccess("Resume attached.", picked.name);
                }}
              />

              <button
                type="button"
                onClick={() => document.getElementById("resumeUpload").click()}
                className="full w-full hover:gap-x-4 h-fit border hover:bg-[#002bba] transition-all duration-150 border-[#ffffff42] rounded-lg gap-x-2 flex justify-center items-center py-3 cursor-pointer"
              >
                <img className="invert-100 w-4" src="/icons/attach_file.png" alt="attach" />
                <p className="font-thin">
                  {file ? file.name : "Attach resume"}
                </p>
              </button>

            </div>

            <div className="w-full  center flex-col gap-y-4">
              <Button
                type="submit"
                title={isSending ? FORM_MESSAGES.sending : FORM_MESSAGES.send}
                variant="fill"
                disabled={isSending}
                aria-busy={isSending}
              />
            </div>
          </form>
        )}

      </div>
    </>
  );
};

export default Form;
