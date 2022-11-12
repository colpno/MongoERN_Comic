import { db } from '../../database/connect.js';
import { getCurrentDateTime } from './index.js';
import jwt from 'jsonwebtoken';

export default function putQuery(req, res, table) {
  const { body, params } = req;
  const { guid } = params;
  const bodyKeys = Object.keys(body);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    if (userInfo.role === 'admin') {
      const sql = `
        UPDATE \`${table}\`
        SET ${bodyKeys.map((key) => `\`${key}\` = ?`)},\`updatedAt\` = ?
        WHERE guid = ?
      `;

      const now = getCurrentDateTime();
      const values = [...bodyKeys.map((dataKey) => body[dataKey]), now, guid];

      db.query(sql, [...values], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) return res.json(data);
        return res.json('Something went wrong');
      });
    } else {
      const sql = `
        UPDATE \`${table}\`
        SET ${bodyKeys.map((key) => `\`${key}\` = ?`)},\`updatedAt\` = ?
        WHERE guid = ? AND userId = ?
      `;

      const now = getCurrentDateTime();
      const values = [...bodyKeys.map((dataKey) => body[dataKey]), now, guid, userInfo.guid];

      db.query(sql, [...values], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows > 0) return res.json(data);
        return res.json('You can only update your item');
      });
    }
  });
}
