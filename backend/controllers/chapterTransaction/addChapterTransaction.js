import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';
import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addChapterTransaction(req, res) {
  const { chapterId } = req.body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json('Not logged in');

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json('Invalid token');

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND chapterId = ?`;
    const values = [userInfo.guid, chapterId];

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length)
        return res
          .status(409)
          .json('This chapter was bought by you, and you have permission to access this chapter');
      return postQuery(req, res, table);
    });
  });
}
