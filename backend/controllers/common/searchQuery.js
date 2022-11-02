import { db } from '../../database/connect.js';

export default function searchQuery(
  res,
  table,
  searches,
  page,
  limit,
  defaultSortCol = 'id',
  order = 'ASC',
  select = '*'
) {
  const searchKeys = Object.keys(searches);
  const length = searchKeys.length - 1;

  const values = searchKeys.map((key) => searches[key]);
  const whereStatement = `
    WHERE ${searchKeys.reduce((string, key, index) => {
      return `${string}\`${key}\` = ?${index !== length ? ' AND ' : ''}`;
    }, '')}
  `;
  let sql = `
    SELECT ${select}
    FROM \`${table}\`
    ${whereStatement}
  `;

  let pagination;
  if (limit && page) {
    sql += `
      ORDER BY \`${defaultSortCol}\` ${order}
      LIMIT ${(page - 1) * limit},${limit * page}
    `;

    const subQuery = `
      SELECT COUNT(*) as total
      FROM ${table} 
      ${whereStatement}
    `;

    db.query(subQuery, [values], (error, data) => {
      if (error) return res.status(500).json(error);

      pagination = {
        total: data[0].total,
        page,
        limit,
      };
    });
  }

  if (!!sql) {
    db.query(sql, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      if (!!pagination) return res.json({ data, pagination });
      return res.json(data);
    });
  }
}
