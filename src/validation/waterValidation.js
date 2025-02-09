import Joi from 'joi';

export const addWaterSchema = Joi.object({
  date: Joi.string().required(),
  waterVolume: Joi.number().min(1).max(5000),
});

export const updateWaterSchema = Joi.object({
  date: Joi.string(),
  waterVolume: Joi.number().min(1).max(5000),
});

export const updateWaterRateSchema = Joi.object({
  dailyNorm: Joi.number().min(0).max(15000).required(),
});
