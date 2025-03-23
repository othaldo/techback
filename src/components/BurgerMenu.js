import React from "react";

const BurgerMenu = ({ items }) => {
  return (
    <ul className="text-white text-center">
      {items.map((item, index) => (
        <li key={index} className="py-4">
          <a href={item.href} className="text-2xl">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BurgerMenu;
