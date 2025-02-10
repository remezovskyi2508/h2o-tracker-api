import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  logoutController,
} from '../controllers/auth.js';
import {
  authLoginSchema,
  authRegisterSchema,
} from '../validation/auth.js';


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),

  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;


// authRouter.put(
//   '/reset-pwd',
//   authenticate,
//   validateBody(resetPasswordSchema),
//   ctrlWrapper(authController.resetPasswodController),
// );


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
