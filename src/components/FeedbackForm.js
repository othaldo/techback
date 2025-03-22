import React, { useState, useEffect } from "react";

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

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-lg font-semibold mb-4">📝 Programm anpassen</h2>

      <label className="block mb-2">📈 Wie war die Belastung?</label>
      <select
        name="intensity"
        value={feedback.intensity}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Bitte auswählen</option>
        <option value="easy">Zu leicht</option>
        <option value="normal">Genau richtig</option>
        <option value="hard">Zu viel</option>
      </select>

      <label className="block mb-2">😖 Schmerzen?</label>
      <select
        name="pain"
        value={feedback.pain}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Bitte auswählen</option>
        <option value="none">Keine</option>
        <option value="mild">Leicht</option>
        <option value="strong">Deutlich</option>
      </select>

      <label className="block mb-2">🤸‍♂️ Beweglichkeit?</label>
      <select
        name="mobility"
        value={feedback.mobility}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Bitte auswählen</option>
        <option value="better">Besser</option>
        <option value="same">Gleich</option>
        <option value="worse">Schlechter</option>
      </select>

      <label className="block mt-4 mb-2">
        <input
          type="checkbox"
          className="mr-2"
          checked={resetToday}
          onChange={(e) => setResetToday(e.target.checked)}
        />
        Programm heute direkt neu starten
      </label>

      <div className="flex justify-between mt-6">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Abbrechen
        </button>
        <button
          onClick={saveFeedback}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Feedback speichern
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
