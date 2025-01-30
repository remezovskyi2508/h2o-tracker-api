// import { Router } from 'express';

// import * as authController from '../controllers/auth.js';

// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// import { validateBody } from '../utils/validateBody.js';

// import {
//   authLoginSchema,
//   authRegisterSchema,
//   emailResetSchema,
//   resetPasswordSchema,
// } from '../validation/auth.js';

// const authRouter = Router();

// authRouter.post(
//   '/register',
//   validateBody(authRegisterSchema),
//   ctrlWrapper(authController.registerController),
// );

// authRouter.post(
//   '/login',
//   validateBody(authLoginSchema),
//   ctrlWrapper(authController.loginController),
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

// authRouter.post('/logout', ctrlWrapper(authController.logoutController));

// export default authRouter;
