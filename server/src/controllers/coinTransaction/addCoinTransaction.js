import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addCoinTransaction(req, res) {
  return postQuery(req, res, table);
}
