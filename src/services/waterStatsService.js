import Water from '../db/models/water.js';
import createHttpError from 'http-errors';

export const getMonthlyStats = async (userId, year, month, dailyNorm) => {
  if (!year || !month) throw createHttpError(400, 'Year and month is required');

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const records = await Water.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate },
  });

  const dailyStats = {};
  records.forEach(({ date, amount }) => {
    const day = date.getDate();
    if (!dailyStats[day]) dailyStats[day] = { total: 0, count: 0 };
    dailyStats[day].total += amount;
    dailyStats[day].count += 1;
  });

  return Object.entries(dailyStats).map(([day, { total, count }]) => ({
    date: `${day}, ${startDate.toLocaleString('en', { month: 'long' })}`,
    dailyGoal: `${(dailyNorm / 1000).toFixed(1)} L`,
    percentage: `${((total / dailyNorm) * 100).toFixed(2)}%`,
    entries: count,
  }));
};
