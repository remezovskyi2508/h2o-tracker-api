import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { recordId } = req.params;
  if (!isValidObjectId(recordId)) {
    return next(createError(404, `${recordId} not valid id`));
  }
  next();
};
