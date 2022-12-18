import { db } from '../../config/mysql.config.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/switchCaseConvert.js';

export default function sortQuery(res, table, sort, order, page, limit, select = '*') {
  let sql = `
      SELECT ${select}
      FROM \`${table}\`
      ORDER BY \`${sort}\`+0 ${order.toUpperCase()}, \`${sort}\` ${order.toUpperCase()}
    `;

  let pagination;
  if (limit && page) {
    sql += `
      LIMIT ${(page - 1) * limit},${limit * page}
    `;

    const subQuery = `SELECT COUNT(*) as total FROM ${table}`;

    db.query(subQuery, (error, data) => {
      if (error) return res.status(500).json(error);

      pagination = {
        total: data[0].total,
        page,
        limit,
      };
    });
  }

  if (!!sql) {
    db.query(sql, (error, data) => {
      if (error) return res.status(500).json(error);
      if (pagination) {
        return res.status(200).json({ data: switchCaseConvert(data, table), pagination });
      }
      if (data.length) {
        return res.status(200).json(switchCaseConvert(data, table));
      }
      if (data.length === 0) return res.status(200).json([]);
      return res.status(400).json({ error });
    });
  }
}
