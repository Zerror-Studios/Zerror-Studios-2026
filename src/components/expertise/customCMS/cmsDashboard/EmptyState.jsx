import React from "react";

const EmptyState = ({ title = "No data available", message = "There's no data to display right now. Once data is available, it will appear here." }) => {
  return (
    <div className="cms-empty-state">
      <div className="cms-empty-icon">
        <svg width="80" height="60" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base */}
          <path d="M10 70H90" stroke="#002bba" strokeWidth="2" strokeLinecap="round"/>
          {/* Desert ground */}
          <path d="M15 70C20 60 30 65 40 70H15Z" fill="#e0e7ff"/>
          <path d="M60 70C70 55 80 65 85 70H60Z" fill="#e0e7ff"/>
          {/* Cactus */}
          <rect x="47" y="45" width="6" height="25" rx="3" fill="#3b82f6"/>
          <path d="M47 55H40C37.2386 55 35 52.7614 35 50V45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M53 50H60C62.7614 50 65 47.7614 65 45V40" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Sun */}
          <circle cx="35" cy="30" r="6" fill="#facc15"/>
        </svg>
      </div>
      <h3 className="cms-empty-title">{title}</h3>
      <p className="cms-empty-desc">{message}</p>
    </div>
  );
};

export default EmptyState;
