import React, { forwardRef } from "react";
import BurgerMenu from "./BurgerMenu";

const Navbar = forwardRef(({ isExpanded, onItemClick }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed top-[69px] left-0 h-[calc(100%-69px)] bg-slate-900/80 backdrop-blur-md shadow-xl z-40 transition-transform w-64 ${
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
