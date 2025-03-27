import React, { useState } from "react";
import DayChecklist from "./components/DayChecklist";
import FeedbackForm from "./components/FeedbackForm";
import Onboarding from "./components/Onboarding";
import Navbar from "./components/Navbar";
import Credits from "./components/Credits";
import StandUpTimer from "./components/StandUpTimer";
import Stats from "./components/Stats";
import Header from "./components/Header";
import { useNavbar } from "./hooks/useNavbar";
import { useTrainingPlan } from "./hooks/useTrainingPlan";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("techbackUser");
    return saved ? JSON.parse(saved) : null;
  });

  const { isNavbarExpanded, setIsNavbarExpanded, navbarRef } = useNavbar();
  const {
    dayData,
    showMessage,
    setShowMessage,
    refreshPlan,
    refreshPlanAfterFeedback,
  } = useTrainingPlan(user);

  const [activeView, setActiveView] = useState("home");

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

          if (view === "home") {
            refreshPlan(false);
          }
        }}
        ref={navbarRef}
      />

      <Header
        user={user}
        isNavbarExpanded={isNavbarExpanded}
        setIsNavbarExpanded={setIsNavbarExpanded}
      />

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
