import { deleteQuery } from '../common/index.js';
import { table } from './index.js';

export default function deleteChapterImage(req, res) {
  return deleteQuery(req, res, table);
}
