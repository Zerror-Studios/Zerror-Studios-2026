"use client";
import React, { useState } from "react";

const HelpSection = ({ formData, setFormData }) => {
  const [selected, setSelected] = useState("start-project-1");

  const options = [
    { id: "start-project", label: "Start A Project" },
    { id: "media-inquiry", label: "Media Inquiry" },
    { id: "join-team", label: "Join The Team" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <h3 className="  secondary-font   text-3xl">
          Happy to hear from you. <br /> How can we help you?
        </h3>

        {/* Next */}
        <div className="w-full max-w-md space-y-6">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center  gap-2 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="project-option"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    setFormData({ ...formData, helpType: e.target.value });
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all ${selected === option.id ? "bg-transparent" : "bg-transparent"
                    }`}
                >
                  {selected === option.id && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <span className="text-white mt-1   group-hover:text-blue-200 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
