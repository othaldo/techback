import React, { forwardRef } from "react";
import BurgerMenu from "./BurgerMenu";

const Navbar = forwardRef(({ isExpanded, onItemClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 h-full bg-slate-900/80 backdrop-blur-md shadow-xl z-40 transition-transform w-64 ${
        isExpanded ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center mt-10">
        <BurgerMenu onItemClick={onItemClick} />
      </div>
    </div>
  );
});

export default Navbar;
