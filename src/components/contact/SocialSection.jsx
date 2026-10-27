"use client";
import React from "react";

export const SOURCE_OPTIONS = ["Instagram", "LinkedIn", "Google", "A friend or client", "Other"];

const SocialSection = ({ formData, setFormData, children }) => {
  const selected = formData.socialSources || [];

  const toggleSelect = (name) => {
    setFormData((prev) => {
      const current = prev.socialSources || [];
      return {
        ...prev,
        socialSources: current.includes(name)
          ? current.filter((item) => item !== name)
          : [...current, name],
      };
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit  text-white gap-10 flex flex-col">
        <h2 className="para-lead">
          How did you find us?
        </h2>

        {/* Next */}
        <div className="grid grid-cols-2 gap-4  w-full">
          {SOURCE_OPTIONS.map((name) => {
            const isSelected = selected.includes(name);
            return (
              <div
                key={name}
                className={`${isSelected ? 'bg-[#EA4E3D]' : 'bg-white'
                  } p-6 rounded-lg shadow-lg relative cursor-pointer transition-all hover:scale-105`}
                onClick={() => toggleSelect(name)}
              >
                <div className="flex items-start justify-between mb-6 md:mb-12">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(name)}
                      aria-label={name}
                      className="w-5 h-5 border-2 border-blue-700 rounded cursor-pointer accent-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <span className={`para-sm font-medium uppercase ${isSelected ? 'text-white' : 'text-blue-700'
                    }`}>
                    {name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
};

export default SocialSection;
