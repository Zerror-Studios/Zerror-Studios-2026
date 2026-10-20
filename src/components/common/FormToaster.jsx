"use client";
import React from "react";
import { ToastContainer, cssTransition } from "react-toastify";

// Slides in from the right with a soft blur, slides back out (keyframes in globals.css)
const SlideBlur = cssTransition({
  enter: "zerror-toast-enter",
  exit: "zerror-toast-exit",
  collapseDuration: 300,
});

const FormToaster = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    closeButton={false}
    icon={false}
    newestOnTop
    pauseOnHover
    draggable
    transition={SlideBlur}
  />
);

export default FormToaster;
