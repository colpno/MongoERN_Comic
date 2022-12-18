import { db } from '../../config/mysql.config.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/switchCaseConvert.js';
import { table } from './index.js';

export default function getTitlePrivate(req, res) {
  const { guid } = req.params;

  const checkExistSQL = `SELECT guid FROM \`${table}\` WHERE guid = ?`;

  db.query(checkExistSQL, [guid], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) {
      const searchData = {
        guid,
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
        if (result.length) return res.status(200).json(switchCaseConvert(result, table));
        return res.status(400).json({ error: result });
      });
    }
    if (data.lengt === 0) {
      return res.status(404).json({ error: 'Truyện không tồn tại' });
    }
  });
}
