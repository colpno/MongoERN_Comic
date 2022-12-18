import jwt from 'jsonwebtoken';
import { table } from './index.js';
import { db } from '../../config/mysql.config.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/switchCaseConvert.js';

export default function getChapter(req, res) {
  const { guid } = req.params;
  const searchData = {
    guid,
  };

  const token = req.cookies.accessToken;

  if (!token) {
    // return res.status(401).json({ error: 'Cần đăng nhập để sử dụng chức năng này' });
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

    db.query(sql, [...values], (error2, data2) => {
      if (error2) return res.status(500).json(error2);
      if (data2.length) return res.status(200).json(switchCaseConvert(data2, table));
      return res.status(400).json({ error: data2 });
    });
  }

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, userInfo) => {
      if (error) return res.status(403).json({ error: 'Token không hợp lệ' });

      const checkExistSQL = `SELECT t.userId FROM \`${table}\` as c JOIN title as t ON (t.guid = c.titleId) WHERE c.guid = ?`;

      db.query(checkExistSQL, [guid], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length && data[0].userId !== userInfo.guid) {
          return res.status(403).json({ error: 'Token không hợp lệ' });
        }
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

        db.query(sql, [...values], (error2, data2) => {
          if (error2) return res.status(500).json(error2);
          if (data2.length) return res.status(200).json(switchCaseConvert(data, table));
          return res.status(400).json({ error: data2 });
        });
      });
    });
  }
}
