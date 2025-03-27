import React from "react";

const Header = ({ user, isNavbarExpanded, setIsNavbarExpanded }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-md bg-slate-900/70 border-b border-white/20 shadow-md px-6 py-3 flex items-center justify-between text-white">
      <button
        onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
        className="text-white px-4 py-2 rounded hover:bg-white/10 transition focus:outline-none z-40"
        style={{ fontSize: "24px" }}
      >
        &#9776;
      </button>
      <h1 className="text-2xl font-comfortaa flex-1 text-center text-white drop-shadow-sm">
        Hey {user.name}!
      </h1>
    </div>
  );
};

export default Header;
