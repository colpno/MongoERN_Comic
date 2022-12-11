import jwt from 'jsonwebtoken';
import { db } from '../../config/database.js';
import { table } from './index.js';

export default function getTitlePrivate(req, res) {
  const { guid } = req.params;

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
    if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

    const checkExistSQL = `SELECT userId FROM \`${table}\` WHERE guid = ?`;

    db.query(checkExistSQL, [guid], (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.length && data[0].userId !== userInfo.guid) {
        return res.status(403).json({ error: 'Token không hợp lệ' });
      }

      const searchData = {
        guid,
        userId: userInfo.guid,
      };

      const searchKeys = Object.keys(searchData);
      const length = searchKeys.length - 1;

      const values = [...searchKeys.map((key) => searchData[key])];

      const whereStatement = `
      WHERE ${searchKeys.reduce(
        (string, key, index) => `${string}\`${key}\` = ?${index !== length ? ' AND ' : ''}`,
        ''
      )}
    `;

      const sql = `
      SELECT *
      FROM \`${table}\`
      ${whereStatement}
    `;

      db.query(sql, [...values], (fail, result) => {
        if (fail) return res.status(500).json(fail);
        if (result.length) return res.status(200).json(result);
        return res.status(400).json({ error: result });
      });
    });
  });
}
