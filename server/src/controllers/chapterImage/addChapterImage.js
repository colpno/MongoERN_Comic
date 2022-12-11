import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addChapterImage(req, res) {
  return postQuery(req, res, table, true);
}
