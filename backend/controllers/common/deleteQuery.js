import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';

export default function deleteQuery(req, res, table) {
  const { params } = req;
  const { guid } = params;

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    if (userInfo.role === 'admin') {
      const sql = `DELETE FROM ${table} WHERE guid = ?`;

      db.query(sql, [guid], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json(data);
        return res.status(400).json('Something went wrong');
      });
      return res.status(400).json('Something went wrong');
    }

    const sql = `DELETE FROM ${table} WHERE guid = ? AND userId = ?`;
    const values = [guid, userInfo.guid];

    db.query(sql, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(200).json(data);
      return res.status(400).json('Something went wrong');
    });
  });
  return;
}
