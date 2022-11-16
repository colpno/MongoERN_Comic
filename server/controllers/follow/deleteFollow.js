import { deleteQuery } from '../common/index.js';
import { table } from './index.js';
import jwt from 'jsonwebtoken';

export default function deleteFollow(req, res) {
  const token = req.cookies.accessToken;
  const { guid } = req.params;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT userId FROM \`${table}\` as f JOIN title as t ON (t.guid = f.titleId) WHERE guid = ?`;

    db.query(sql, [guid], async (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      } else {
        return deleteQuery(req, res, table);
      }
    });
  });
}
