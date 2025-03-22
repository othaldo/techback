import React, { useState, useEffect } from "react";

import DayChecklist from "./components/DayChecklist";
import FeedbackForm from "./components/FeedbackForm";
import Onboarding from "./components/Onboarding";

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
      <h1 className="text-center text-4xl font-comfortaa text-white mb-6">
        Hey {user.name}! Hier ist Tag {dayData?.day} deines Rückenprogramms
      </h1>

      {showMessage && (
        <p className="text-center text-green-700 mb-4 font-comfortaa font-medium">
          ✅ Dein Feedback wurde gespeichert. Dein Programm wurde neu gestartet.
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
  );
}

export default App;
