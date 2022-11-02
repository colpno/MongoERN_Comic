import { db } from '../../database/connect.js';
import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addTitle(req, res) {
  const { name } = req.body;
  const sql = `SELECT * FROM ${table} WHERE name = ?`;

  db.query(sql, [name], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(409).json("Title's name has already existed");
    return postQuery(req, res, table, true);
  });
}
