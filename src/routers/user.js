import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
import * as userController from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { upload } from '../middlewares/upload.js';
import { validateBody } from '../utils/validateBody.js';
import * as userValidSchema from '../validation/user.js';

const userRouter = Router();

// userRouter.use(authenticate);

userRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(userController.getUserByIdController),
);

userRouter.patch(
  '/:id/avatar',
  isValidId,
  upload.single('avatar'),
  validateBody(userValidSchema.userAvatarUpdateSchema),
  ctrlWrapper(userController.updateUserAvatar),
);

userRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(userValidSchema.userUpdateSchema),
  ctrlWrapper(userController.patchUserController),
);

export default userRouter;
