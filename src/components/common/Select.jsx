"use client";
import { useEffect, useRef, useState } from "react";

const Select = ({ label, options = [], name, onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef(null);
  const handleSelect = (opt) => {
    setValue(opt);
    onChange(name, opt);
    setOpen(false);
  };
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className={`form relative text-white ${value ? "filled" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left pt-6 pb-2 bg-transparent outline-none"
      >
        {value || ""}
      </button>

      <label className="label-name">
        <span className="content-name font-thin">{label}</span>
      </label>

      <span className={`absolute right-0 top-2 pointer-events-none ${value && " top-6"}  `}>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="w-full text-left px-4 py-3 font-thin hover:text-white font-medium  text-[#0000FF] transition-colors hover:bg-[#EA4E3D]"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;