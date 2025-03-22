import React, { useState } from "react";
import { exerciseLibrary } from "../data/exerciseLibrary";

const DayChecklist = ({ dayData }) => {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(`techback-day-${dayData.day}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [openInfo, setOpenInfo] = useState(null);

  const toggleCheck = (index) => {
    const newChecked = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index];
    setChecked(newChecked);
    localStorage.setItem(
      `techback-day-${dayData.day}`,
      JSON.stringify(newChecked)
    );
  };

  const toggleInfo = (baseName) => {
    setOpenInfo((prev) => (prev === baseName ? null : baseName));
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-800/70 text-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/30">
      <h2 className="text-xl font-semibold font-comfortaa mb-4 text-gray-800">
        {dayData.title}
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
                    ? "bg-white/10 border border-green-400/30 text-green-200 bg-emerald-400/20 shadow-inner"
                    : "hover:bg-white/20 border border-white/10 text-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCheck(index)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 scale-125 accent-green-600"
                />

                <div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (info) toggleInfo(baseName);
                    }}
                    className={
                      info ? "font-comfortaa text-blue-600 hover:underline" : ""
                    }
                  >
                    {exercise}
                  </div>

                  {info && openInfo === baseName && (
                    <div className="mt-2 text-sm font-comfortaa text-gray-700">
                      <p>{info.description}</p>

                      {info.image && (
                        <div className="mt-2">
                          <img
                            src={info.image}
                            alt={baseName}
                            className="w-full max-w-sm rounded-md"
                          />

                          {info.credit && (
                            <p className="text-xs text-gray-500 mt-1">
                              Foto:{" "}
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
    </div>
  );
};

export default DayChecklist;
