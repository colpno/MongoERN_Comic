import { db } from '../../database/connect.js';

export default function filterQuery(
  res,
  table,
  filters,
  page,
  limit,
  defaultSortCol = 'id',
  order = 'ASC',
  select = '*'
) {
  const filterKeys = Object.keys(filters);
  const length = filterKeys.length - 1;
  const values = filterKeys.map((key) => `%${filters[key].toLowerCase()}%`);

  let sql = `
        SELECT ${select}
        FROM \`${table}\`
        WHERE ${filterKeys.reduce((string, key, index) => {
          return `${string}LOWER(\`${key}\`) LIKE ?${index !== length ? ' AND ' : ''}`;
        }, '')}
      `;

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
      return res.json(data);
    });
  }
}
