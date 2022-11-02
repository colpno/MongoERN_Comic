import { putQuery } from '../common/index.js';
import { table } from './index.js';

export default function updateCoinTransaction(req, res) {
  return putQuery(req, res, table);
}
