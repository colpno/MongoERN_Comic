export default function corsMiddleWare(req, res, next, corsURL) {
  res.header('Access-Control-Allow-Origin', corsURL);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type: application/json',
    'Content-Type: multipart/form-data'
  );
  res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS');

  next();
}
