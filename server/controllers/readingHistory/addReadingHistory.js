import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/database.js';
import { getCurrentDateTime } from '../common/index.js';
import { table } from './index.js';

export default function addReadingHistory(req, res) {
  const { body } = req;
  const { titleId, chapterId } = body;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `SELECT * FROM ${table} WHERE userId = ? AND titleId = ?`;

    db.query(checkExistSQL, [userInfo.guid, titleId], (error1, data1) => {
      if (error1) return res.status(500).json({ error: 'Lỗi do server', detail: error1 });

      if (data1[0].chapterId === chapterId && data1[0].titleId === titleId) {
        return res.status(200);
      }

      // Read same title but difference chapter
      if (data1.length > 0) {
        const sql = `
          UPDATE \`${table}\` SET \`chapterId\` = ?, \`updatedAt\` = ?
          WHERE \`titleId\` = ? AND userId = ?;
        `;

        const now = getCurrentDateTime();
        const values = [chapterId, now, titleId, userInfo.guid];

        db.query(sql, values, (error2, data2) => {
          if (error2) return res.status(500).json({ error: 'Lỗi do server', detail: error2 });
          return res.status(200).json(data2);
        });
      }

      // Read new title
      if (data1.length === 0) {
        const bodyKeys = Object.keys(body);

        const sql = `
        INSERT INTO \`${table}\`
        (${bodyKeys.map((key) => `\`${key}\``)},\`guid\`,\`createdAt\`,\`updatedAt\`)
        VALUES (?)
      `;

        const now = getCurrentDateTime();
        const guid = uuidv4();
        const values = [...bodyKeys.map((dataKey) => body[dataKey]), guid, now, now];

        db.query(sql, [values], (error2, data2) => {
          if (error2) return res.status(500).json({ error: 'Lỗi do server', detail: error2 });
          if (data2.affectedRows > 0) return res.status(200).json({ message: 'Thêm thành công' });
          return res.status(400).json({ error: data2 });
        });
      }
    });
  });
}
