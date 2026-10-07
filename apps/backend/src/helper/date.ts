export const getCurrentDateForSQL = (): string => {
  const now = new Date();
  return now.toISOString(); // Converts the date to ISO string format
};

export const getDefaultDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return {
    today: today.toISOString().split("T")[0], // Format as YYYY-MM-DD
    sevenDaysAgo: sevenDaysAgo.toISOString().split("T")[0], // Format as YYYY-MM-DD
  };
};
