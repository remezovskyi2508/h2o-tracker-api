export const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({
    status,
    message: message || 'Something went wrong',
    data: err.message || 'An unexpected error occurred.',
  });
};
