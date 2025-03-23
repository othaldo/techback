import React, { useState, useEffect, useRef, useCallback } from "react";
import GlassCard from "./GlassCard";

const StandUpTimer = () => {
  const storageKey = "techback-standup-settings";
  const defaultSettings = { enabled: false, interval: 45 }; // Minuten

  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  const [timeLeft, setTimeLeft] = useState(settings.interval * 60); // Sekunden
  const intervalRef = useRef(null);

  // === Timer-Logik ===
  const notifyUser = useCallback(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("⏰ Please Stand Up!", {
        body: "Zeit, dich zu strecken oder kurz zu gehen 💪",
        icon: process.env.PUBLIC_URL + "/favicon.ico",
      });
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("⏰ Please Stand Up!", {
            body: "Zeit, dich zu strecken oder kurz zu gehen 💪",
            icon: process.env.PUBLIC_URL + "/favicon.ico",
          });
        } else {
          alert("⏰ Zeit, dich zu strecken oder kurz zu gehen!");
        }
      });
    } else {
      alert("⏰ Zeit, dich zu strecken oder kurz zu gehen!");
    }
  }, []);

  useEffect(() => {
    // Cleanup alten Timer – selbst wenn disabled
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!settings.enabled) {
      return;
    }

    const newInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          try {
            notifyUser();
          } catch (error) {
            console.error("Benachrichtigung fehlgeschlagen:", error);
          }
          return settings.interval * 60;
        }
        return prev - 1;
      });
    }, 1000);

    intervalRef.current = newInterval;
    return () => {
      clearInterval(newInterval);
    };
  }, [settings.enabled, settings.interval, notifyUser]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleToggle = () => {
    const updated = { ...settings, enabled: !settings.enabled };
    setSettings(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setTimeLeft(updated.interval * 60);
  };

  const handleIntervalChange = (e) => {
    const updated = { ...settings, interval: Number(e.target.value) };
    setSettings(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setTimeLeft(updated.interval * 60);
  };

  return (
    <GlassCard>
      <h2 className="text-3xl font-comfortaa mb-4">🕒 Please Stand Up</h2>

      <p className="mb-4 text-white/90">
        Aktiviere diesen Timer, um regelmäßig erinnert zu werden, aufzustehen
        und dich zu bewegen. Gut gegen zu langes Sitzen – für deinen Rücken! 💪
      </p>

      <div className="flex items-center justify-between bg-slate-800/60 backdrop-blur-md p-4 rounded-lg border border-white/20 mb-4">
        <span className="text-white font-semibold">Aktivieren:</span>
        <input
          type="checkbox"
          checked={settings.enabled}
          onChange={handleToggle}
          className="scale-150 accent-emerald-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-white font-semibold mb-1">
          Intervall:
        </label>
        <select
          value={settings.interval}
          onChange={handleIntervalChange}
          className="w-full p-2 rounded bg-slate-700 text-white border border-white/20"
        >
          {[15, 30, 45, 60].map((min) => (
            <option key={min} value={min}>
              Alle {min} Minuten
            </option>
          ))}
        </select>
      </div>

      {settings.enabled && (
        <div className="text-center mt-6">
          <p className="text-lg font-mono text-emerald-300">
            ⏳ Nächste Erinnerung in: {formatTime(timeLeft)}
          </p>
        </div>
      )}
    </GlassCard>
  );
};

export default StandUpTimer;
