import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as authController from '../controllers/auth.js';
import {
  authLoginSchema,
  authRegisterSchema,
  // resetPasswordSchema,
} from '../validation/auth.js';
// import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();


authRouter.post(
  '/register',
  validateBody(authRegisterSchema),

  ctrlWrapper(authController.registerController),
);
console.log(authController);
console.log(authController.loginController);
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authController.loginController),
);

// authRouter.put(
//   '/reset-pwd',
//   authenticate,
//   validateBody(resetPasswordSchema),
//   ctrlWrapper(authController.resetPasswodController),
// );

authRouter.post('/logout', ctrlWrapper(authController.logoutController));

export default authRouter;

// authRouter.post(
//   '/send-reset-email',
//   validateBody(emailResetSchema),
//   ctrlWrapper(authController.sendEmailController),
// );
// authRouter.post(
//   '/reset-pwd',
//   validateBody(resetPasswordSchema),
//   ctrlWrapper(authController.resetPWDController),
// );

// authRouter.post('/refresh', ctrlWrapper(authController.refreshTokenController));
