import React, { useState } from "react";
import { exerciseLibrary } from "../data/exerciseLibrary";
import { ChevronDown, ChevronUp } from "lucide-react";
import GlassCard from "./GlassCard";

const DayChecklist = ({ dayData, preview = false }) => {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(`techback-day-${dayData.day}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [openInfo, setOpenInfo] = useState(null);

  const toggleCheck = (index) => {
    if (preview) return; // im Vorschau-Modus kein Speichern

    const baseName = dayData.exercises[index].split(" (")[0];
    const isChecked = checked.includes(index);
    const newChecked = isChecked
      ? checked.filter((i) => i !== index)
      : [...checked, index];

    setChecked(newChecked);
    localStorage.setItem(
      `techback-day-${dayData.day}`,
      JSON.stringify(newChecked)
    );

    const stats = JSON.parse(
      localStorage.getItem("techback-stat-exercises") || "{}"
    );

    if (!isChecked) {
      // Häkchen gesetzt → zählen
      stats[baseName] = (stats[baseName] || 0) + 1;
    } else {
      // Häkchen entfernt → rückgängig machen
      stats[baseName] = Math.max(0, (stats[baseName] || 1) - 1);
    }

    localStorage.setItem("techback-stat-exercises", JSON.stringify(stats));
  };

  const toggleInfo = (baseName) => {
    setOpenInfo((prev) => (prev === baseName ? null : baseName));
  };

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold font-comfortaa mb-4 text-white">
        {dayData.title} Rückenprogramm
      </h2>

      <ul className="space-y-3">
        {dayData.exercises.map((exercise, index) => {
          const baseName = exercise.split(" (")[0];
          const info = exerciseLibrary[baseName];
          const isChecked = checked.includes(index);

          return (
            <li key={index}>
              <div
                onClick={() => toggleCheck(index)}
                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition ${
                  isChecked
                    ? "border border-emerald-400 text-emerald-300 bg-emerald-400/20 shadow-inner"
                    : "hover:bg-slate-800/20 border border-white/10 text-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCheck(index)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 scale-125 accent-emerald-600"
                />

                <div className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-comfortaa text-white-600">
                      {exercise}
                    </span>

                    {info && (
                      <div className="flex-shrink-0 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleInfo(baseName);
                          }}
                          className="text-white hover:text-emerald-400 transition-transform"
                        >
                          {openInfo === baseName ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {info && openInfo === baseName && (
                    <div className="mt-2 text-sm font-comfortaa text-white">
                      <p>{info.description}</p>

                      {(info.image || info.video) && (
                        <div className="mt-2">
                          {info.image && (
                            <img
                              src={info.image}
                              alt={baseName}
                              className="w-full max-w-sm rounded-md"
                            />
                          )}

                          {info.video && (
                            <video
                              controls
                              className="w-full max-w-sm rounded-md mt-2"
                              preload="metadata"
                            >
                              <source src={info.video} type="video/mp4" />
                              Dein Browser unterstützt kein HTML5-Video.
                            </video>
                          )}

                          {info.credit && (
                            <p className="text-xs text-white-500 mt-1">
                              Quelle:{" "}
                              <a
                                href={info.credit.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                              >
                                {info.credit.label}
                              </a>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
};

export default DayChecklist;
