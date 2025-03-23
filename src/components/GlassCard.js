import React from "react";

const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`max-w-xl mx-auto bg-slate-800/70 text-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/30 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
