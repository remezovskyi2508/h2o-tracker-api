import { UserCollection } from '../db/models/user.js';

export const updateUserWaterRate = async (userId, dailyNorm) => {
  return await UserCollection.findByIdAndUpdate(
    userId,
    { dailyNorm },
    { new: true },
  );
};
