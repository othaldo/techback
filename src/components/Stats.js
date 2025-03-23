import React, { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

const Stats = () => {
  const [exerciseStats, setExerciseStats] = useState({});
  const [totalDays, setTotalDays] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [streak, setStreak] = useState(0);
  const [perfectStreak, setPerfectStreak] = useState(0);

  useEffect(() => {
    let daysCount = 0;
    let allDays = [];
    let currentStreak = 0;
    let maxPerfectStreak = 0;
    let currentPerfectStreak = 0;

    for (let key in localStorage) {
      if (key.startsWith("techback-day-")) {
        const day = parseInt(key.split("-")[2], 10);
        const indices = JSON.parse(localStorage.getItem(key));
        allDays.push({ day, count: indices.length });
        daysCount++;

        // Perfekte Tage zählen (angenommen 5+ = perfekt)
        if (indices.length >= 5) {
          currentPerfectStreak++;
          maxPerfectStreak = Math.max(maxPerfectStreak, currentPerfectStreak);
        } else {
          currentPerfectStreak = 0;
        }
      }
    }

    // Streak berechnen (Tage in Folge abgehakt)
    allDays.sort((a, b) => a.day - b.day);
    const today = allDays.length > 0 ? allDays[allDays.length - 1].day : 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      if (allDays[i].day === today - (allDays.length - 1 - i)) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Stats zu Übungen laden
    const storedStats = JSON.parse(
      localStorage.getItem("techback-stat-exercises") || "{}"
    );
    let total = 0;
    for (let key in storedStats) {
      total += storedStats[key];
    }

    setExerciseStats(storedStats);
    setTotalDays(daysCount);
    setTotalExercises(total);
    setStreak(currentStreak);
    setPerfectStreak(maxPerfectStreak);
  }, []);

  return (
    <GlassCard>
      <h2 className="text-3xl font-comfortaa mb-4">📊 Statistiken</h2>

      <p className="text-white/90 mb-4">
        Deine bisherigen Fortschritte im Rückentraining – nice work!
      </p>

      <ul className="text-white/80 space-y-2 text-sm">
        <li>
          <strong>✅ Absolvierte Tage:</strong> {totalDays}
        </li>
        <li>
          <strong>🏋️ Übungen insgesamt erledigt:</strong> {totalExercises}
        </li>
        <li>
          <strong>🔥 Aktuelle Streak:</strong> {streak} Tage
        </li>
        <li>
          <strong>🌟 Perfekte Streak:</strong> {perfectStreak} Tage
        </li>
      </ul>

      <h3 className="mt-6 mb-2 font-semibold text-white">
        Häufigkeit je Übung
      </h3>
      <ul className="text-sm text-blue-100 space-y-1">
        {Object.entries(exerciseStats).map(([name, count]) => (
          <li key={name}>
            {name}: {count}×
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Bist du sicher, dass du alle Statistiken zurücksetzen möchtest?"
              )
            ) {
              localStorage.removeItem("techback-stat-exercises");
              Object.keys(localStorage).forEach((key) => {
                if (key.startsWith("techback-day-")) {
                  localStorage.removeItem(key);
                }
              });
              window.location.reload();
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Statistiken zurücksetzen
        </button>
      </div>
    </GlassCard>
  );
};

export default Stats;
