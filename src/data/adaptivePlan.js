import { exerciseLibrary } from "./exerciseLibrary";
import seedrandom from "seedrandom";

export const generateAdaptivePlan = (feedback = {}, startDay = 1) => {
  // eslint-disable-next-line
  const { intensity = "normal", pain = "none", mobility = "same" } = feedback;

  const intensityMap = {
    easy: 1.3,
    normal: 1.0,
    hard: 0.7,
  };

  const repsFactor = intensityMap[intensity] || 1.0;
  const adjust = (base, factor) => Math.max(1, Math.round(base * factor));

  // Seed aus Feedback + Starttag generieren (beliebig, aber stabil)
  const seed = JSON.stringify({ feedback, startDay });
  const rng = seedrandom(seed);

  // pickRandom nutzt jetzt rng statt Math.random
  const pickRandom = (arr, count = 1) => {
    const shuffled = [...arr].sort(() => 0.5 - rng());
    return shuffled.slice(0, count);
  };

  // Übungen nach Kategorie gruppieren
  const grouped = Object.entries(exerciseLibrary).reduce(
    (acc, [name, entry]) => {
      const cat = entry.category || "unsortiert";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(name);
      return acc;
    },
    {}
  );

  const plan = [];
  const totalDays = 14;

  for (let i = 0; i < totalDays; i++) {
    const day = startDay + i;

    const gluteReps = adjust(12, repsFactor);
    const birdSeconds = adjust(15, repsFactor);

    let exercises = [];

    // Aktivierung
    if (grouped["Aktivierung"]?.length)
      exercises.push(
        ...pickRandom(grouped["Aktivierung"], 1).map(
          (name) => `${name} (2×${gluteReps})`
        )
      );

    // Stabilität
    if (grouped["Stabilität"]?.length)
      exercises.push(
        ...pickRandom(grouped["Stabilität"], 1).map(
          (name) => `${name} (${birdSeconds} Sek. halten)`
        )
      );

    // Mobilisierung
    if (grouped["Mobilisierung"]?.length)
      exercises.push(...pickRandom(grouped["Mobilisierung"], 1));

    // Dehnung (immer, außer bei pain ≠ none vielleicht weniger)
    if (pain === "none" && grouped["Dehnung"]?.length)
      exercises.push(
        ...pickRandom(grouped["Dehnung"], 1).map(
          (name) => `${name} (30 Sek./Seite)`
        )
      );

    // Entlastung (optional z. B. nur jeden 2. Tag)
    if (day % 2 === 1 && grouped["Entlastung"]?.length)
      exercises.push(
        ...pickRandom(grouped["Entlastung"], 1).map(
          (name) => `${name} (optional, 30 Sek.)`
        )
      );

    // Bewegung
    if (grouped["Bewegung"]?.length)
      exercises.push(...pickRandom(grouped["Bewegung"], 1));

    plan.push({
      day,
      title: `Tag ${day}`,
      exercises,
    });
  }

  return plan;
};
