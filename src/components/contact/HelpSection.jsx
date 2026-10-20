"use client";
import React from "react";
import ChoiceList from "@/components/contact/ChoiceList";
import { SERVICE_OPTIONS } from "@/lib/formMessages";

const HelpSection = ({ formData, setFormData, errors = {} }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <div>
          <h3 className="  secondary-font   text-3xl">
            What do you need? <span className="text-red-500">*</span>
          </h3>
          <p className="text-white mt-3">Pick one or more.</p>
        </div>

        <div className="w-full space-y-8">
          <div>
            <ChoiceList
              name="services"
              multiple
              options={SERVICE_OPTIONS}
              value={formData.services}
              onChange={(services) => setFormData((prev) => ({ ...prev, services }))}
            />
          </div>

          <div>
            <label htmlFor="contact-details" className="block text-white  mb-2">
              Tell us a little about it
            </label>
            <textarea
              id="contact-details"
              name="details"
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData((prev) => ({ ...prev, details: e.target.value }))}
              className="w-full bg-transparent border-b-2 border-white text-white placeholder-blue-300 focus:outline-none focus:border-blue-200 pb-2  transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
