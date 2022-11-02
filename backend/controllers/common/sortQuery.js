import { db } from '../../database/connect.js';

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
      if (!!pagination) return res.json({ data, pagination });
      return res.json(data);
    });
  }
}
