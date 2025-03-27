import React from "react";
import { menuItems } from "../views/viewIds";

const BurgerMenu = ({ onItemClick }) => {
  return (
    <ul className="text-white text-center w-full">
      {menuItems.map((item, index) => (
        <li key={index} className="py-4 border-b border-white/10">
          <button
            onClick={() => onItemClick(item.view)}
            className="text-xl w-full hover:bg-slate-700/50 px-4 py-2 transition"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BurgerMenu;
