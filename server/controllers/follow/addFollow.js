import { db } from '../../config/database.js';
import { postQuery } from '../common/index.js';
import { table } from './index.js';
import jwt from 'jsonwebtoken';

export default function addFollow(req, res) {
  const { titleId } = req.body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT * FROM ${table} WHERE userId = ? AND titleId = ?`;

    db.query(sql, [`${userInfo.guid}`, `${titleId}`], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.length)
        return res.status(409).json({ error: 'Truyện đã có sẵn trong danh mục theo dõi' });
      return postQuery(req, res, table, true);
    });
  });
}
