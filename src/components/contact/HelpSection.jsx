"use client";
import React, { useState } from "react";

const HelpSection = () => {
  const [selected, setSelected] = useState("start-project-1");

  const options = [
    { id: "start-project-1", label: "Start A Project" },
    { id: "media-inquiry", label: "Media Inquiry" },
    { id: "join-team", label: "Join The Team" },
    { id: "start-project-2", label: "Start A Project" },
    { id: "start-project-3", label: "Start A Project" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-18 flex flex-col">
        <p className=" text-2xl  md:text-4xl">
          Happy to hear from you, Mridula. How can we help you?
        </p>

        {/* Next */}
        <div className="w-full max-w-md space-y-6">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="project-option"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={(e) => setSelected(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                    selected === option.id ? "bg-transparent" : "bg-transparent"
                  }`}
                >
                  {selected === option.id && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <span className="text-white text-lg group-hover:text-blue-200 transition-colors">
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
