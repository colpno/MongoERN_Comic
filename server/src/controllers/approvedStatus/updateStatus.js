import { putQuery } from '../common/index.js';
import { table } from './index.js';

export default function updateApprovedStatus(req, res) {
  return putQuery(req, res, table);
}
