import Joi from 'joi';
import { dateRegexp } from '../constants/users.js';

export const addWaterSchema = Joi.object({
  date: Joi.string().required(),
  waterVolume: Joi.number().min(1).max(5000),
});

export const updateWaterSchema = Joi.object({
  date: Joi.string(),
  waterVolume: Joi.number().min(1).max(5000),
});
