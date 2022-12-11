import { putQuery } from '../common/index.js';
import { table } from './index.js';

export default function updatePaymentMethod(req, res) {
  return putQuery(req, res, table);
}
