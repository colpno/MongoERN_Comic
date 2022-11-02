import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/connect.js';
import { getCurrentDateTime, postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addReadingHistory(req, res) {
  const { body } = req;
  const { titleId, chapterId } = body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND titleId = ?`;

    db.query(sql, [userInfo.guid, titleId], (error, data) => {
      if (error) return res.status(500).json(error);

      // Read same title but difference chapter
      if (data.length > 0) {
        const sql = `
          UPDATE \`${table}\` SET \`chapterId\` = ?, \`updatedAt\` = ?
          WHERE \`titleId\` = ? AND userId = ?;
        `;

        const now = getCurrentDateTime();
        const values = [chapterId, now, titleId, userInfo.guid];

        db.query(sql, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      }

      // Read new title
      return postQuery(req, res, table, true);
    });
  });
}
