import React, { useState, useEffect, useRef } from "react";
import DayChecklist from "./components/DayChecklist";
import FeedbackForm from "./components/FeedbackForm";
import Onboarding from "./components/Onboarding";
import Navbar from "./components/Navbar";
import Credits from "./components/Credits";
import StandUpTimer from "./components/StandUpTimer";
import Stats from "./components/Stats";

import { generateAdaptivePlan } from "./data/adaptivePlan";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("techbackUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [dayData, setDayData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const navbarRef = useRef(null);

  const getCurrentTrainingDay = () => {
    const startDateStr = localStorage.getItem("techback-start-date");
    if (!startDateStr) return 1;

    const startDate = new Date(startDateStr);
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const refreshPlan = () => {
    const storedFeedback = JSON.parse(
      localStorage.getItem("techback-weekly-feedback") || "{}"
    );
    const newPlan = generateAdaptivePlan(storedFeedback, 1);
    const currentDay = getCurrentTrainingDay();
    console.log("Current day", currentDay);
    setDayData(newPlan[currentDay - 1] || newPlan[0]);
  };

  const refreshPlanAfterFeedback = (resetToday = false) => {
    if (resetToday) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("techback-day-")) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem("techback-start-date", new Date().toISOString());
    }
    refreshPlan();
  };

  useEffect(() => {
    if (user) {
      // Check ob es bereits ein Startdatum gibt
      if (!localStorage.getItem("techback-start-date")) {
        const doneDays = Object.keys(localStorage)
          .filter((key) => key.startsWith("techback-day-"))
          .map((key) => parseInt(key.split("-")[2], 10))
          .filter((n) => !isNaN(n));

        const maxDone = Math.max(0, ...doneDays);
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - maxDone);

        localStorage.setItem("techback-start-date", startDate.toISOString());
        console.log(
          "[techback] Initialisiere Startdatum:",
          startDate.toISOString()
        );
      }
      refreshPlan();
    }
    // eslint-disable-next-line
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
    { label: "Home", view: "home" },
    { label: "Feedback", view: "feedback" },
    { label: "Statistiken", view: "stats" },
    { label: "Credits", view: "credits" },
    { label: "Please Stand Up", view: "standup" },
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
      <Navbar
        items={menuItems}
        isExpanded={isNavbarExpanded}
        onItemClick={(view) => {
          setActiveView(view);
          setIsNavbarExpanded(false);
        }}
        ref={navbarRef}
      />

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

      <div className="pt-16">
        {showMessage && (
          <p className="text-center text-green-700 mb-4 font-comfortaa font-medium">
            ✅ Dein Feedback wurde gespeichert. Dein Programm wurde neu
            gestartet.
          </p>
        )}

        {activeView === "standup" && <StandUpTimer />}
        {activeView === "credits" && <Credits />}
        {activeView === "feedback" && (
          <FeedbackForm
            onCancel={() => setActiveView("home")}
            onSave={(resetToday = false) => {
              setShowMessage(true);
              refreshPlanAfterFeedback(resetToday);
              setActiveView("home");
              setTimeout(() => setShowMessage(false), 3000);
            }}
          />
        )}
        {activeView === "home" && (
          <>
            {dayData && <DayChecklist dayData={dayData} />}
            <div className="text-center mt-6">
              <button
                onClick={() => setActiveView("feedback")}
                className="bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg backdrop-blur-md shadow-md transition"
              >
                Programm anpassen
              </button>
            </div>
          </>
        )}
        {activeView === "stats" && <Stats />}
      </div>
    </div>
  );
}

export default App;
