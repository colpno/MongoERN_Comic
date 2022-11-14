import { table } from './index.js';
import { db } from '../../database/connect.js';
import jwt from 'jsonwebtoken';

export default function getTitle(req, res) {
  const { guid } = req.params;

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const sql = `SELECT userId FROM \`${table}\` WHERE guid = ?`;

    db.query(sql, [guid], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      } else {
        const searchData = {
          guid,
          userId: userInfo.guid,
        };

        const searchKeys = Object.keys(searchData);
        const length = searchKeys.length - 1;

        const values = [...searchKeys.map((key) => searchData[key])];

        const whereStatement = `
      WHERE ${searchKeys.reduce((string, key, index) => {
        return `${string}\`${key}\` = ?${index !== length ? ' AND ' : ''}`;
      }, '')}
    `;

        const sql = `
      SELECT *
      FROM \`${table}\`
      ${whereStatement}
    `;

        db.query(sql, [...values], (error, data) => {
          if (error) return res.status(500).json(error);
          if (data.length) return res.status(200).json(data);
          return res.status(400).json({ error: data });
        });
      }
    });
  });
}
