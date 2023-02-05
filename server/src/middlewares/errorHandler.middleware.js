// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(500).json(err.message);
};

export default errorHandler;
