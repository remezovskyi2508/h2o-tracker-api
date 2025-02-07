import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';
import waterRouter from './routers/water.js';

import { getEnvVar } from './utils/getEnvVar.js';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { authenticate } from './middlewares/authenticate.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(cookieParser());

  app.use(logger);

  // МІНЯЄМО ПІД НАШ ПРОЄКТ

  app.use('/auth', authRouter);

  app.use('/water', authenticate, waterRouter);

  app.use('/users', userRouter);

  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, console.log(`Server is running on port ${PORT}`));

  return app;
};
