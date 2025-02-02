import { WaterCollection } from '../db/models/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import createHttpError from 'http-errors';

export const addWaterRecord = async (req, res) => {
  const { _id: userId } = req.user;
  const { date } = req.body;

  const waterDate = await WaterCollection.findOne({ date, userId });
  if (waterDate) {
    throw createHttpError(
      409,
      `WaterVolume with this date ${date} already exists in DB`,
    );
  }
  const record = await WaterCollection.create({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a record!',
    data: record,
  });
};
export const getWaterRecordById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const record = await WaterCollection.findOne({ id, userId });

  res.json(record);
};
