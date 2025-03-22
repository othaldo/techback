import React, { useState, useEffect } from "react";

const DayChecklist = ({ dayData }) => {
  const storageKey = `techback-day-${dayData.day}`;
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setChecked(JSON.parse(stored));
    }
  }, [storageKey]);

  const toggleCheck = (index) => {
    const updated = checked.includes(index)
      ? checked.filter((i) => i !== index)
      : [...checked, index];
    setChecked(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{dayData.title}</h2>
      <ul className="space-y-2">
        {dayData.exercises.map((item, idx) => (
          <li key={idx}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={checked.includes(idx)}
                onChange={() => toggleCheck(idx)}
                className="w-5 h-5"
              />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayChecklist;
