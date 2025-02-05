import UserAuthCollection from '../db/models/userAuth.js';

export const updateUserWaterRate = async (userId, dailyNorm) => {
  return await UserAuthCollection.findByIdAndUpdate(
    userId,
    { dailyNorm },
    { new: true },
  );
};
