// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.code || err.status || 500).json(err.message);
};

export default errorHandler;
