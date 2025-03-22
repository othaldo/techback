import React, { useState } from "react";

const Onboarding = ({ onFinish }) => {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (!name.trim()) return;

    const userData = {
      name: name.trim(),
      startDate: new Date().toISOString().split("T")[0], // z. B. "2025-03-22"
    };

    localStorage.setItem("techbackUser", JSON.stringify(userData));
    onFinish(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          👋 Willkommen bei techback
        </h1>
        <label className="block text-sm font-medium mb-2">Wie heißt du?</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Dein Name"
        />
        <button
          onClick={handleStart}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Los geht's!
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
