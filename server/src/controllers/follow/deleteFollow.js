import jwt from 'jsonwebtoken';
import { db } from '../../config/mysql.config.js';
import { table } from './index.js';

export default function deleteFollow(req, res) {
  const token = req.cookies.accessToken;
  const { titleId } = req.params;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `
      SELECT f.userId
      FROM \`${table}\` as f
      JOIN \`title\` as t ON (t.guid = f.titleId)
      WHERE f.titleId = ?
    `;

    db.query(checkExistSQL, [titleId], async (err, data) => {
      if (err) return res.status(500).json({ error: 'Lỗi do server', detail: err });

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      }

      const sql = `DELETE FROM ${table} WHERE titleId = ? AND userId = ?`;

      const values = [titleId, userInfo.guid];

      db.query(sql, values, (error3, data3) => {
        if (error3) return res.status(500).json({ error: 'Lỗi do server', detail: error3 });
        if (data3.affectedRows > 0) {
          return res.status(200).json({ message: 'Hủy theo dõi thành cồng' });
        }
        return res.status(400).json({ error: data3 });
      });
    });
  });
}
