import { deleteQuery } from '../common/index.js';
import { table } from './index.js';

export default function deleteChapterTransaction(req, res) {
  return deleteQuery(req, res, table);
}
