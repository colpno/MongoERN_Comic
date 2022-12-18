import jwt from 'jsonwebtoken';
import { db } from '../../config/mysql.config.js';

export default function deleteQuery(req, res, table) {
  const { params } = req;
  const { guid } = params;

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    if (userInfo.role === 'admin') {
      const sql = `DELETE FROM ${table} WHERE guid = ?`;

      db.query(sql, [guid], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json(data);
        return res.status(400).json({ error: data });
      });
    } else {
      const sql = `DELETE FROM ${table} WHERE guid = ? AND userId = ?`;

      db.query(sql, [guid, userInfo.guid], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json(data);
        return res.status(400).json({ error: data });
      });
    }
  });
}
