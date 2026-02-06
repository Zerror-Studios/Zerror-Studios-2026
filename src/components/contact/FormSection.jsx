import React from "react";

const FormSection = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <p className=" text-2xl  md:text-4xl">
          Tell us a little bit about yourself and we will get back to you as
          soon as we can
        </p>

        {/* Form */}
        <div className="w-full">
          <div className="space-y-8">
            <div>
              <label className="block text-white  mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-blue-300 focus:outline-none focus:border-blue-200 pb-2  transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-white  mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-blue-300 focus:outline-none focus:border-blue-200 pb-2  transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-white  mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-transparent border-b-2 border-white text-white placeholder-blue-300 focus:outline-none focus:border-blue-200 pb-2  transition-colors"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
