import jwt from 'jsonwebtoken';
import { db } from '../../config/database.js';
import { getCurrentDateTime } from './index.js';

export default function putQuery(req, res, table) {
  const { body, params } = req;
  const { guid } = params;
  const bodyKeys = Object.keys(body);
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    console.log('------------------------------------------------------');
    const sql = `
        UPDATE \`${table}\`
        SET ${bodyKeys.map((key) => `\`${key}\` = ?`)},\`updatedAt\` = ?
        WHERE guid = ?
      `;

    const now = getCurrentDateTime();
    const values = [...bodyKeys.map((dataKey) => body[dataKey]), now, guid];

    db.query(sql, [...values], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        console.log('Updated');
        console.log('------------------------------------------------------');
        return res.status(200).json(data);
      }
      return res.status(400).json({ error: data });
    });

    // if (userInfo.role === 'admin') {
    // } else {
    //   const sql = `
    //     UPDATE \`${table}\`
    //     SET ${bodyKeys.map((key) => `\`${key}\` = ?`)},\`updatedAt\` = ?
    //     WHERE guid = ? AND userId = ?
    //   `;

    //   const now = getCurrentDateTime();
    //   const values = [...bodyKeys.map((dataKey) => body[dataKey]), now, guid, userInfo.guid];

    //   db.query(sql, [...values], (err, data) => {
    //     if (err) return res.status().json(err);
    //     if (data.affectedRows > 0) {
    //       console.log('Updated');
    //       console.log('------------------------------------------------------');
    //       return res.status().json(data);
    //     }
    //     return res.status().json({error: 'You can only update your item'});
    //   });
    // }
  });
}
