import createHttpError from 'http-errors';
import { WaterCollection } from '../db/models/water.js';

export const getMonthlyStats = async (userId, year, month, dailyNorm) => {
  if (!year || !month)
    throw createHttpError(400, 'Year and month are required');

  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));

  const records = await WaterCollection.find({
    userId,
    date: { $gte: startDate, $lte: endDate },
  });

  console.log('Records found:', records);

  if (records.length === 0) return [];

  const dailyStats = {};

  records.forEach(({ date, waterVolume }) => {
    const utcDate = new Date(date);
    const day = utcDate.getUTCDate();
    if (!dailyStats[day]) dailyStats[day] = { total: 0, count: 0 };
    dailyStats[day].total += waterVolume;
    dailyStats[day].count += 1;
  });

  return Object.entries(dailyStats).map(([day, { total, count }]) => ({
    date: `${day}, ${startDate.toLocaleString('en', { month: 'long' })}`,
    dailyGoal: `${(dailyNorm / 1000).toFixed(1)} L`,
    percentage: `${((total / dailyNorm) * 100).toFixed(2)}%`,
    entries: count,
  }));
};
