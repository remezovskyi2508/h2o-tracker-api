import {
  addWaterEntry,
  updateWaterEntry,
  deleteWaterEntry,
  getTodayWaterRecords,
} from '../services/waterService.js';

import * as statsService from '../services/waterStatsService';

export const addWaterRecord = async (req, res, next) => {
  try {
    const newRecord = await addWaterEntry(
      req.user.id,
      req.body.waterVolume,
      req.body.date,
    );
    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

export const updateWaterRecord = async (req, res, next) => {
  try {
    const record = await updateWaterEntry(
      req.params.id,
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
    await deleteWaterEntry(req.params.id, req.user.id);
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
    const percentage = ((totalAmount / req.user.dailyWaterGoal) * 100).toFixed(
      2,
    );

    res.json({ percentage, totalAmount, records });
  } catch (err) {
    next(err);
  }
};

export const getMonthlyStats = async (req, res, next) => {
  try {
    const stats = await statsService.getMonthlyStats(
      req.user.id,
      req.query.year,
      req.query.month,
      req.user.dailyNorm,
    );
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
