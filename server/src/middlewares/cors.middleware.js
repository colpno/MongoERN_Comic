export default function corsMiddleWare(req, res, next, corsURL) {
  const origin = corsURL.includes(req.header('origin').toLowerCase())
    ? req.headers.origin
    : corsURL[0];

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Credentials', true);

  // res.header(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type: application/json',
  //   'Content-Type: multipart/form-data'
  // );
  // res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS');

  next();
}
