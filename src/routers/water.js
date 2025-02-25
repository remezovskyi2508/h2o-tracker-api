import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addWaterSchema,
  updateWaterSchema,
  updateWaterRateSchema,
} from '../validation/waterValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
  getTodayWater,
  getMonthlyStats,
} from '../controllers/waterController.js';
import { updateWaterRate } from '../controllers/waterRateController.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.patch(
  '/water-rate',
  validateBody(updateWaterRateSchema),
  ctrlWrapper(updateWaterRate),
);
waterRouter.post(
  '/',
  validateBody(addWaterSchema),
  ctrlWrapper(addWaterRecord),
);

waterRouter.get('/today', ctrlWrapper(getTodayWater));

waterRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterRecord),
);

waterRouter.delete('/:id', isValidId, ctrlWrapper(deleteWaterRecord));

waterRouter.get('/month', ctrlWrapper(getMonthlyStats));

export default waterRouter;
