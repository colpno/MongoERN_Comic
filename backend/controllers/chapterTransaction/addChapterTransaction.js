import { db } from '../../config/database.js';
import jwt from 'jsonwebtoken';
import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addChapterTransaction(req, res) {
  const { chapterId } = req.body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND chapterId = ?`;
    const values = [userInfo.guid, chapterId];

    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length) return res.status(409).json({ error: 'Bạn đã sở hữu chương này' });
      return postQuery(req, res, table);
    });
  });
}
