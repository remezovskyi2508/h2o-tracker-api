import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';

export const userSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).required(),
  gender: Joi.string().valid('female', 'male'),
  password: Joi.string().min(8).max(64).required(),
  oldPassword: Joi.string().min(8).max(64),
  dailyNorm: Joi.number().max(15000)
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().max(32).optional().messages({
    'string.max': 'The maximum name length is 32 characters',
  }),
  email: Joi.string().pattern(emailRegexp).optional().messages({
    'string.email': 'Invalid email format',
  }),
  gender: Joi.string().valid('female', 'male').optional(),
  oldPassword: Joi.string().min(8).max(64),
   newPassword: Joi.string().min(8).max(64),

});

export const userAvatarUpdateSchema = Joi.object({
  avatar: Joi.object({
    url: Joi.string().uri().required(),
    public_id: Joi.string().required(),
  }),
});
