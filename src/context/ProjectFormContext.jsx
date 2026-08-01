"use client";
import React, { createContext, useContext, useState } from "react";

const ProjectFormContext = createContext(undefined);

export const ProjectFormProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openProjectForm = () => {
    setIsOpen(true);
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.stop();
    }
  };

  const closeProjectForm = () => {
    setIsOpen(false);
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.start();
    }
  };

  return (
    <ProjectFormContext.Provider value={{ isOpen, openProjectForm, closeProjectForm }}>
      {children}
    </ProjectFormContext.Provider>
  );
};

export const useProjectForm = () => {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error("useProjectForm must be used within a ProjectFormProvider");
  }
  return context;
};
