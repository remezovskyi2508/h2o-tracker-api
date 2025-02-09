import { updateUserWaterRate } from '../services/waterRateService.js';

export const updateWaterRate = async (req, res, next) => {
  try {
    const { dailyNorm } = req.body;
    const { _id } = req.user;

    const updatedUser = await updateUserWaterRate(_id, dailyNorm);

    res.json({
      message: 'Water rate updated successfully',
      dailyNorm: updatedUser.dailyNorm,
    });
  } catch (error) {
    next(error);
  }
};
