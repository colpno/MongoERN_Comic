import {
  filterQuery,
  getAllQuery,
  getLimitedQuery,
  searchQuery,
  separateOtherParams,
  sortQuery,
} from '../common/index.js';
import { table } from './index.js';
import jwt from 'jsonwebtoken';

export default function getChapterTransactions(req, res) {
  const { sort, order, page, limit, ...others } = req.query;
  const { filter, search } = separateOtherParams(others);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    // URL: ?column_like=...
    if (Object.keys(filter).length > 0)
      return filterQuery(res, table, filter, page, limit, sort, order);

    // URL: ?column=...
    if (Object.keys(search).length > 0)
      return searchQuery(res, table, search, page, limit, sort, order);

    // URL: ?sort=column&order=...
    if (sort && order) return sortQuery(res, table, sort, order, page, limit);

    // URL: ?limit=...&page=...
    if (limit && page) return getLimitedQuery(res, table, limit, page);

    return getAllQuery(res, table);
  });
}
