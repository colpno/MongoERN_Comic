import jsonServer from 'json-server';
import queryString from 'query-string';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }
  if (req.method === 'PATCH') {
    req.body.updatedAt = new Date().toISOString();
  }

  // Continue to JSON Server router
  next();
});

// Custom response
router.render = (req, res) => {
  const xTotalCount = res.getHeaders()['x-total-count'];
  const method = req.method;

  // if method is GET and header has x-total-count,
  // add pagination property to response
  if (method === 'GET' && xTotalCount) {
    const params = queryString.parse(req._parsedOriginalUrl.query);

    return res.jsonp({
      data: res.locals.data,
      pagination: { _limit: params._limit, _page: params._page, total: xTotalCount },
    });
  }

  // Otherwise, default response
  res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
