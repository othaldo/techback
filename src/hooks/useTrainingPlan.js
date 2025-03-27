import { useState, useEffect, useCallback } from "react";
import { generateDay } from "../data/adaptivePlan";
import { getCurrentTrainingDay } from "../utils/trainingUtils";

export const useTrainingPlan = (user) => {
  const [dayData, setDayData] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const refreshPlan = useCallback(() => {
    const storedFeedback = JSON.parse(
      localStorage.getItem("techback-weekly-feedback") || "{}"
    );
    const currentDay = getCurrentTrainingDay();
    const todayData = generateDay(currentDay, storedFeedback);
    setDayData(todayData);
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
