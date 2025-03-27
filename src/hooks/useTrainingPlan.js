import { useState, useEffect, useCallback } from "react";
import { generateAdaptivePlan } from "../data/adaptivePlan";

export const useTrainingPlan = (user) => {
  const [dayData, setDayData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const getCurrentTrainingDay = () => {
    const startDateStr = localStorage.getItem("techback-start-date");
    if (!startDateStr) return 1;

    const startDate = new Date(startDateStr);
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const refreshPlan = useCallback(() => {
    const storedFeedback = JSON.parse(
      localStorage.getItem("techback-weekly-feedback") || "{}"
    );
    const newPlan = generateAdaptivePlan(storedFeedback, 1);
    const currentDay = getCurrentTrainingDay();
    console.log("Current day", currentDay);
    setDayData(newPlan[currentDay - 1] || newPlan[0]);
  }, []);

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
  }, [user, refreshPlan]);

  return {
    dayData,
    showMessage,
    setShowMessage,
    refreshPlan,
    refreshPlanAfterFeedback,
  };
};
