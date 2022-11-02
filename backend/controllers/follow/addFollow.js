import { db } from '../../database/connect.js';
import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addFollow(req, res) {
  const { titleId } = req.body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND titleId = ?`;
    const values = [userInfo.guid, titleId];

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length) return res.status(409).json('You has been followed this title');
      return postQuery(req, res, table, true);
    });
  });
}
