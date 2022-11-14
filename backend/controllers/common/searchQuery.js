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
    ORDER BY \`${defaultSortCol}\` ${order}
  `;

  let pagination;
  if (limit && page) {
    sql += `
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

  db.query(sql, [values], (error, data) => {
    if (error) return res.status(500).json(error);
    if (pagination) return res.status(200).json({ data, pagination });
    if (data.length) return res.status(200).json(data);
    return res.status(400).json({ error: data });
  });
}
