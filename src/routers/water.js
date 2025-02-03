import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addWaterSchema,
  updateWaterSchema,
} from '../validation/waterValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
  getTodayWater,
  getMonthlyStats,
} from '../controllers/waterController.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post(
  '/',
  validateBody(addWaterSchema),
  ctrlWrapper(addWaterRecord),
);

waterRouter.get('/today', ctrlWrapper(getTodayWater));

waterRouter.patch(
  '/:recordId',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterRecord),
);

waterRouter.delete('/:recordId', isValidId, ctrlWrapper(deleteWaterRecord));

waterRouter.get('/month', ctrlWrapper(getMonthlyStats));
