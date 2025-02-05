import { WaterCollection } from '../db/models/water.js';
import createHttpError from 'http-errors';

export const addWaterEntry = async (userId, waterVolume, date) => {
  if (waterVolume > 5000) {
    throw createHttpError(400, 'The amount of water cannot exceed 5000 ml');
  }
  return await new WaterCollection({ userId, waterVolume, date }).save();
};

export const updateWaterEntry = async (recordId, userId, waterVolume) => {
  const record = await WaterCollection.findByIdAndUpdate(
    { _id: recordId, user: userId },
    { waterVolume },
    { new: true },
  );
  if (!record) throw createHttpError(404, 'Entry not found');
  return record;
};
export const deleteWaterEntry = async (recordId, userId) => {
  const record = await WaterCollection.findByIdAndDelete({
    _id: recordId,
    user: userId,
  });
  if (!record) throw createHttpError(404, 'Entry not found');
  return record;
};
export const getTodayWaterRecords = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return await WaterCollection.find({ user: userId, date: { $gte: today } });
};
