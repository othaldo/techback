import React, { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import { getCurrentTrainingDay } from "../utils/trainingUtils";
import { generateDay } from "../data/adaptivePlan";
import DayChecklist from "./DayChecklist";

const FeedbackForm = ({ onCancel = () => {}, onSave = () => {} }) => {
  const storageKey = "techback-weekly-feedback";
  const [feedback, setFeedback] = useState({
    intensity: "",
    pain: "",
    mobility: "",
  });
  const [resetToday, setResetToday] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setFeedback(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const saveFeedback = () => {
    localStorage.setItem(storageKey, JSON.stringify(feedback));
    onSave(resetToday);
  };

  const currentDay = getCurrentTrainingDay();
  const previewDay = generateDay(currentDay + 1, feedback);

  return (
    <GlassCard>
      <h2 className="text-2xl font-comfortaa mb-4">Feedback</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveFeedback();
        }}
      >
        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="intensity"
          >
            📈 Wie war die Belastung?
          </label>
          <select
            name="intensity"
            value={feedback.intensity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Bitte auswählen</option>
            <option value="easy">Zu leicht</option>
            <option value="normal">Genau richtig</option>
            <option value="hard">Zu viel</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="pain"
          >
            😖 Schmerzen?
          </label>
          <select
            name="pain"
            value={feedback.pain}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Bitte auswählen</option>
            <option value="none">Keine</option>
            <option value="mild">Leicht</option>
            <option value="strong">Deutlich</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-white-700 text-sm font-bold mb-2"
            htmlFor="mobility"
          >
            🤸‍♂️ Beweglichkeit?
          </label>
          <select
            name="mobility"
            value={feedback.mobility}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Bitte auswählen</option>
            <option value="better">Besser</option>
            <option value="same">Gleich</option>
            <option value="worse">Schlechter</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={resetToday}
              onChange={(e) => setResetToday(e.target.checked)}
            />
            Programm heute direkt neu starten
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Abbrechen
          </button>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Speichern
          </button>
        </div>

        {previewDay && (
          <div className="mt-6">
            <h3 className="text-lg font-comfortaa mb-2 text-white">
              Vorschau auf den nächsten Trainingstag
            </h3>
            <DayChecklist dayData={previewDay} preview />
          </div>
        )}
      </form>
    </GlassCard>
  );
};

export default FeedbackForm;
