import { updateUserWaterRate } from '../services/waterRateService.js';

export const updateWaterRate = async (req, res) => {
  const { dailyNorm } = req.body;

  try {
    const user = await updateUserWaterRate(req.user.id, dailyNorm);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
