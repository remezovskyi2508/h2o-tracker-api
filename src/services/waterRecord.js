import { WaterCollection } from '../db/models/water.js';

export const createWaterRecord = async (payload) => {
  const contact = await WaterCollection.create(payload);
  return contact;
};
