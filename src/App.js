import React, { useState } from "react";
import Onboarding from "./components/Onboarding";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useNavbar } from "./hooks/useNavbar";
import { useTrainingPlan } from "./hooks/useTrainingPlan";
import { registerAllViews } from "./views/registerAllViews";
import { getViewComponent } from "./viewRegistry";
import { VIEW_IDS } from "./views/viewIds";

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

  const [activeView, setActiveView] = useState(VIEW_IDS.HOME);

  registerAllViews({
    dayData,
    setActiveView,
    setShowMessage,
    refreshPlan,
    refreshPlanAfterFeedback,
  });

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
        isExpanded={isNavbarExpanded}
        onItemClick={(view) => {
          setActiveView(view);
          setIsNavbarExpanded(false);
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
        {getViewComponent(activeView, {
          dayData,
          setActiveView,
          setShowMessage,
          refreshPlan,
          refreshPlanAfterFeedback,
        })}
      </div>
    </div>
  );
}

export default App;
