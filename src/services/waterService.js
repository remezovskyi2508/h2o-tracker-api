import createHttpError from 'http-errors';
import { WaterCollection } from '../db/models/water.js';

export const addWaterEntry = async (userId, waterVolume, date) => {
  if (!waterVolume || waterVolume < 1 || waterVolume > 5000) {
    throw createHttpError(400, 'Water volume must be between 1 and 5000 ml');
  }

  return await new WaterCollection({
    userId,
    waterVolume,
    date: new Date(date || Date.now()),
  }).save();
};

export const updateWaterEntry = async (recordId, payload, userId, options) => {
  const record = await WaterCollection.findOneAndUpdate(
    { _id: recordId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  if (!record) throw createHttpError(404, 'Entry not found');
  return record;
};

export const deleteWaterEntry = async (recordId, userId) => {
  const record = await WaterCollection.findOneAndDelete({
    _id: recordId,
    userId,
  });
  if (!record) {
    throw createHttpError(404, 'Entry not found');
  }
  return record;
};

export const getTodayWaterRecords = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const records = await WaterCollection.find({
    userId,
    date: { $gte: today, $lt: tomorrow },
  }).lean();

  return records;
};
