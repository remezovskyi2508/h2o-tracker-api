import createHttpError from 'http-errors';
import UserCollection from '../db/models/user.js';

export const updateUserWaterRate = async (userId, dailyNorm) => {
  const updatedUser = await UserCollection.findByIdAndUpdate(
    userId,
    { dailyNorm },
    { new: true, runValidators: true },
  );
  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  return updatedUser;
};
