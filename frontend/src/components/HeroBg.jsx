// src/components/HeroBg.jsx
import React from "react";

const HeroBg = ({ children, background }) => {
  return (
    <div
      className="relative min-h-[85vh] flex items-center justify-center text-white text-center px-4 sm:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 sm:opacity-50"></div>
      <div className="z-10 max-w-4xl">{children}</div>
    </div>
  );
};

export default HeroBg;
