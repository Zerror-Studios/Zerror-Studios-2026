"use client";
import React from "react";
const Input = ({ label, type = "text", className }) => (
  <div className={` form relative  text-white ${className} `}>
    <input type={type} name="name" required className="font-thin" />
    <label htmlFor="name" className="label-name">
      <span className="content-name font-thin">{label}</span>
    </label>
  </div>
);

export default Input;