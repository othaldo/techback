import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Onboarding from "./components/Onboarding";
import { useNavbar } from "./hooks/useNavbar";
import { getViewComponent } from "./viewRegistry";
import { VIEW_IDS } from "./views/viewIds";
import { useViewInitializer } from "./hooks/useViewInitializer";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("techbackUser");
    return saved ? JSON.parse(saved) : null;
  });

  const { isNavbarExpanded, setIsNavbarExpanded, navbarRef } = useNavbar();
  const [activeView, setActiveView] = useState(VIEW_IDS.HOME);
  const { dayData, showMessage, setShowMessage } = useViewInitializer({
    setActiveView,
    user,
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
        })}
      </div>
    </div>
  );
}

export default App;
