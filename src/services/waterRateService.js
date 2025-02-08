import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/user.js';

export const updateUserWaterRate = async (userId, waterRate) => {
  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { waterRate },
    { new: true, runValidators: true },
  );
  if (!updatedUser) {
    throw createError(404, 'User not found');
  }

  return updatedUser;
};
