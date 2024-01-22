export default function corsMiddleWare(req, res, next, corsURL) {
  const origin = corsURL.includes(req.header('origin').toLowerCase())
    ? req.headers.origin
    : corsURL[0];

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);

  next();
}
