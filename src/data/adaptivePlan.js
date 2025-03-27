// adaptivePlan.js
import seedrandom from "seedrandom";
import { exerciseLibrary } from "./exerciseLibrary";

export const generateDay = (day, feedback = {}) => {
  // eslint-disable-next-line
  const { intensity = "normal", pain = "none", mobility = "same" } = feedback;

  const intensityMap = {
    easy: 1.3,
    normal: 1.0,
    hard: 0.7,
  };

  const repsFactor = intensityMap[intensity] || 1.0;
  const adjust = (base, factor) => Math.max(1, Math.round(base * factor));

  const seed = JSON.stringify({ feedback, day });
  const rng = seedrandom(seed);

  const pickRandom = (arr, count = 1) => {
    const shuffled = [...arr].sort(() => 0.5 - rng());
    return shuffled.slice(0, count);
  };

  const grouped = Object.entries(exerciseLibrary).reduce(
    (acc, [name, entry]) => {
      const cat = entry.category || "unsortiert";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(name);
      return acc;
    },
    {}
  );

  const gluteReps = adjust(12, repsFactor);
  const birdSeconds = adjust(15, repsFactor);

  let exercises = [];

  if (grouped["Aktivierung"]?.length)
    exercises.push(
      ...pickRandom(grouped["Aktivierung"], 1).map(
        (name) => `${name} (2×${gluteReps})`
      )
    );

  if (grouped["Stabilität"]?.length)
    exercises.push(
      ...pickRandom(grouped["Stabilität"], 1).map(
        (name) => `${name} (${birdSeconds} Sek. halten)`
      )
    );

  if (grouped["Mobilisierung"]?.length)
    exercises.push(...pickRandom(grouped["Mobilisierung"], 1));

  if (pain === "none" && grouped["Dehnung"]?.length)
    exercises.push(
      ...pickRandom(grouped["Dehnung"], 1).map(
        (name) => `${name} (30 Sek./Seite)`
      )
    );

  if (day % 2 === 1 && grouped["Entlastung"]?.length)
    exercises.push(
      ...pickRandom(grouped["Entlastung"], 1).map(
        (name) => `${name} (optional, 30 Sek.)`
      )
    );

  if (grouped["Bewegung"]?.length)
    exercises.push(...pickRandom(grouped["Bewegung"], 1));

  return {
    day,
    title: `Tag ${day}`,
    exercises,
  };
};
