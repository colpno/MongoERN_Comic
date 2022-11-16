import { searchQuery } from '../common/index.js';
import { table } from './index.js';

export default function getCoinTransaction(req, res) {
  const { params, query } = req;
  const { guid } = params;
  const { page, limit } = query;

  return searchQuery(res, table, { guid }, page, limit);
}
