import {
  addWaterEntry,
  updateWaterEntry,
  deleteWaterEntry,
  getTodayWaterRecords,
} from '../services/waterService.js';

import * as statsService from '../../src/services/waterStatsService.js';

export const addWaterRecord = async (req, res, next) => {
  const date = new Date(Number(req.body.date));

  try {
    const newRecord = await addWaterEntry(
      req.user.id,
      req.body.waterVolume,
      date,
    );
    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

export const updateWaterRecord = async (req, res, next) => {
  try {
    const record = await updateWaterEntry(
      req.params.recordId,
      req.user.id,
      req.body.waterVolume,
    );
    res.json(record);
  } catch (error) {
    next(error);
  }
};

export const deleteWaterRecord = async (req, res, next) => {
  try {
    await deleteWaterEntry(req.params.recordId, req.user.id);
    res.status(200).json({ message: 'Record deleted' });
  } catch (error) {
    next(error);
  }
};

export const getTodayWater = async (req, res, next) => {
  try {
    const records = await getTodayWaterRecords(req.user.id);
    const totalAmount = records.reduce(
      (sum, record) => sum + record.waterVolume,
      0,
    );
    const dailyGoal = req.user.dailyWaterGoal || 1500;
    const percentage = ((totalAmount / dailyGoal) * 100).toFixed(2);
    res.json({ percentage, totalAmount, records });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyStats = async (req, res, next) => {
  console.log(req.user);

  try {
    const userId = req.user.id;
    const { year, month } = req.query;
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10);

    if (isNaN(parsedYear) || isNaN(parsedMonth)) {
      return res.status(400).json({ message: 'Invalid year or month' });
    }

    const stats = await statsService.getMonthlyStats(
      userId,
      parsedYear,
      parsedMonth,
      req.user.dailyNorm,
    );
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
