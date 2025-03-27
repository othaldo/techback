export const getCurrentTrainingDay = () => {
  const startDateStr = localStorage.getItem("techback-start-date");
  if (!startDateStr) return 1;

  const startDate = new Date(startDateStr);
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};
