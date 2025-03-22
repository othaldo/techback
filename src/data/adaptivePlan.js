export const generateAdaptivePlan = (feedback = {}, startDay = 15) => {
  const { intensity = "normal", pain = "none", mobility = "same" } = feedback;

  const intensityMap = {
    easy: 1.3,
    normal: 1.0,
    hard: 0.7,
  };

  const repsFactor = intensityMap[intensity] || 1.0;
  const adjust = (base, factor) => Math.max(1, Math.round(base * factor));

  const plan = [];

  for (let i = 0; i < 14; i++) {
    const day = startDay + i;
    const gluteReps = adjust(12, repsFactor);
    const birdSeconds = adjust(15, repsFactor);

    const exercises = [
      "Passive Bauchlage / Sphinx (5 Min)",
      `Glute Bridge (2×${gluteReps})`,
      `Bird-Dog (6×/Seite, ${birdSeconds} Sek. halten)`,
      ...(pain === "none" ? ["Hüftbeuger-Dehnung (30–60 Sek./Seite)"] : []),
      "Cat-Cow (10 Wh.)",
      ...(day % 2 === 0 ? ["Hängen (optional, 30 Sek.)"] : []),
      ...(mobility === "worse" ? ["Piriformis-Dehnung (30 Sek./Seite)"] : []),
    ];

    plan.push({
      day,
      title: `Tag ${day}`,
      exercises,
    });
  }

  return plan;
};
