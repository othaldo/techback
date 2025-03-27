import { useState, useRef, useEffect } from "react";

export const useNavbar = () => {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarRef]);

  return {
    isNavbarExpanded,
    setIsNavbarExpanded,
    navbarRef,
  };
};
