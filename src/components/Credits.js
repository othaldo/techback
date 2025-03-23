import React from "react";
import GlassCard from "./GlassCard";
import { exerciseLibrary } from "../data/exerciseLibrary";

const Credits = () => {
  const imageCredits = Object.entries(exerciseLibrary)
    .filter(([_, entry]) => entry.credit)
    .map(([name, entry]) => ({
      name,
      label: entry.credit.label,
      url: entry.credit.url,
    }));

  return (
    <GlassCard>
      <h2 className="text-3xl font-comfortaa mb-4">🎨 Credits</h2>
      <p className="mb-4 text-lg">
        Diese App wurde mit ❤️ entwickelt, um dich bei deinem Rückentraining zu
        unterstützen.
      </p>

      <div className="text-left space-y-4 text-sm text-blue-200">
        {imageCredits.length > 0 && (
          <div>
            <strong>Bilder / Übungen:</strong>
            <ul className="list-disc pl-5 mt-1">
              {imageCredits.map((credit, i) => (
                <li key={i}>
                  {credit.name}:{" "}
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white"
                  >
                    {credit.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <strong>Hintergrundbild:</strong>
          <br />
          Foto:{" "}
          <a
            href="https://www.pexels.com/photo/photo-of-half-moon-598661/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Pexels – Pixabay
          </a>
        </div>

        <div>
          <strong>Icons & Emojis:</strong>
          <br />
          Native Emojis · Unicode
        </div>

        <div>
          <strong>Schriftarten:</strong>
          <br />
          Comfortaa (lokal eingebunden)
        </div>
      </div>

      <p className="mt-6 text-xs text-blue-100">
        Diese App ist ein persönliches Projekt und nicht kommerziell.
      </p>
    </GlassCard>
  );
};

export default Credits;
