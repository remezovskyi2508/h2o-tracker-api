import { readFileSync } from 'fs';
import swaggerUIExpress from 'swagger-ui-express';
import createHttpError from 'http-errors';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const docs = JSON.parse(readFileSync(SWAGGER_PATH, 'utf-8'));
    return [...swaggerUIExpress.serve, swaggerUIExpress.setup(docs)];
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, 'Cannot load docs'));
    };
  }
};
