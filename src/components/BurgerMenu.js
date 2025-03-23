import React from "react";

const BurgerMenu = ({ items, onItemClick }) => {
  return (
    <ul className="text-white text-center">
      {items.map((item, index) => (
        <li key={index} className="py-4">
          <a
            href={item.href}
            onClick={() => {
              item.onClick?.(); // falls individuelle Logik
              onItemClick?.(); // Menü schließen
            }}
            className="text-2xl"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BurgerMenu;
