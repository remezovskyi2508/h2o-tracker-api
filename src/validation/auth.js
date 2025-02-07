import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const resetPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).max(64).required(),
  newPassword: Joi.string().min(8).max(64).required(),
});

// export const emailResetSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
// });
