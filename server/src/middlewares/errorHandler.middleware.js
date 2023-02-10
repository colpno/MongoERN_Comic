// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { status, message } = err;

  if (status && typeof status === 'number') return res.status(status).json(message);

  res.status(500).json(message);
};

export default errorHandler;
