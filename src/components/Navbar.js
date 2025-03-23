import React, { forwardRef } from "react";
import BurgerMenu from "./BurgerMenu";

const Navbar = forwardRef(({ items, isExpanded }, ref) => {
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 h-full bg-gray-800 z-40 transition-transform w-64 ${
        isExpanded ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center mt-10">
        <BurgerMenu items={items} />
      </div>
    </div>
  );
});

export default Navbar;
