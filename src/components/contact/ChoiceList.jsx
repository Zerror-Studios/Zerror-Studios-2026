"use client";
import React from "react";

// Option rows in the original "How can we help" style (round marker + label).
// multiple = true behaves like checkboxes, otherwise like radios.
const ChoiceList = ({ name, options, value, onChange, multiple = false, describedBy }) => {
  const isChecked = (option) =>
    multiple ? (value || []).includes(option) : value === option;

  const handleChange = (option) => {
    if (multiple) {
      const current = value || [];
      onChange(
        current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option]
      );
    } else {
      onChange(option);
    }
  };

  return (
    <div
      className="w-full max-w-md space-y-6"
      role="group"
      aria-describedby={describedBy}
    >
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center  gap-2 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center">
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option}
              checked={isChecked(option)}
              onChange={() => handleChange(option)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all bg-transparent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white">
              {isChecked(option) && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </div>
          <span className="text-white mt-1   group-hover:text-blue-200 transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
};

export default ChoiceList;
