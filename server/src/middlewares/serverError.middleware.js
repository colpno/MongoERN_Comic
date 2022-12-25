import createError from 'http-errors';

const serverError = (err, req, res, next) => {
  next(createError(err.code || err.status || 500, err.message));
};

export default serverError;
