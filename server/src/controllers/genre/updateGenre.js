import { putQuery } from '../common/index.js';
import { table } from './index.js';

export default function updateGenre(req, res) {
  return putQuery(req, res, table);
}
