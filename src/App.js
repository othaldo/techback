import React, { useState, useEffect, useRef } from "react";
import DayChecklist from "./components/DayChecklist";
import FeedbackForm from "./components/FeedbackForm";
import Onboarding from "./components/Onboarding";
import Navbar from "./components/Navbar"; // Import Navbar

import { generateAdaptivePlan } from "./data/adaptivePlan";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("techbackUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [dayData, setDayData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const navbarRef = useRef(null);

  const refreshPlan = (resetToday = true) => {
    const storedFeedback = JSON.parse(
      localStorage.getItem("techback-weekly-feedback") || "{}"
    );

    const newPlan = generateAdaptivePlan(storedFeedback, 1);

    const startingDay = resetToday ? 1 : currentDay;
    setCurrentDay(startingDay);
    setDayData(newPlan[startingDay - 1] || newPlan[0]);
  };

  const refreshPlanAfterFeedback = (resetToday = true) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("techback-day-")) {
        localStorage.removeItem(key);
      }
    });
    refreshPlan(resetToday);
  };

  useEffect(() => {
    if (user) {
      refreshPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  const menuItems = [
    { label: "Credits", href: "#" },
    { label: "Settings", href: "#" },
  ];

  if (!user) {
    return <Onboarding onFinish={setUser} />;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-10"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/bg.jpg"})`,
      }}
    >
      <Navbar items={menuItems} isExpanded={isNavbarExpanded} ref={navbarRef} />
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white fixed top-0 left-0 right-0 z-30">
        <button
          onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
          className="text-white p-4 focus:outline-none z-40"
          style={{ fontSize: "24px" }}
        >
          &#9776;
        </button>
        <h1 className="text-2xl font-comfortaa flex-1 text-center">
          Hey {user.name}!
        </h1>
      </div>
      <div className="pt-16">
        {showMessage && (
          <p className="text-center text-green-700 mb-4 font-comfortaa font-medium">
            ✅ Dein Feedback wurde gespeichert. Dein Programm wurde neu
            gestartet.
          </p>
        )}

        {showFeedback ? (
          <FeedbackForm
            onCancel={() => setShowFeedback(false)}
            onSave={(resetToday = true) => {
              setShowFeedback(false);
              setShowMessage(true);
              refreshPlanAfterFeedback(resetToday);
              setTimeout(() => setShowMessage(false), 3000);
            }}
          />
        ) : (
          <>
            {dayData && <DayChecklist dayData={dayData} />}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowFeedback(true)}
                className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-md shadow-md transition"
              >
                Programm anpassen
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
