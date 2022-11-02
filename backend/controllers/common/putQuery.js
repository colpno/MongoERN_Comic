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

    const sql = `
        UPDATE \`${table}\`
        SET ${bodyKeys.map((key) => `\`${key}\` = ?`)},\`updatedAt\` = ?
        WHERE guid = ? AND userId = ?
      `;

    const now = getCurrentDateTime();
    const values = [...bodyKeys.map((dataKey) => body[dataKey]), now, guid, userInfo.guid];

    db.query(sql, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json(data);
      return res.status(403).json('You can only update your item');
    });
  });
}
