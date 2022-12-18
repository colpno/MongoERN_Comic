import jwt from 'jsonwebtoken';
import { db } from '../../config/mysql.config.js';
import { postQuery } from '../common/index.js';
import { table } from './index.js';

export default function addChapterTransaction(req, res) {
  const { chapterId } = req.body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (tokenError, userInfo) => {
    if (tokenError) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND chapterId = ?`;
    const values = [userInfo.guid, chapterId];

    db.query(sql, [values], (queryError, data) => {
      if (queryError) return res.status(500).json({ error: queryError });
      if (data.length) return res.status(409).json({ error: 'Bạn đã sở hữu chương này' });
      return postQuery(req, res, table);
    });
  });
}
