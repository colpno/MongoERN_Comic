import { db } from '../../config/mysql.config.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/switchCaseConvert.js';

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
  const whereStatement = filterKeys.reduce(
    (string, key, index) => `${string}LOWER(\`${key}\`) LIKE ?${index !== length ? ' AND ' : ''}`,
    ''
  );

  let sql = `
    SELECT ${select}
    FROM \`${table}\`
    WHERE ${whereStatement}
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
      WHERE ${whereStatement}
    `;

    db.query(subQuery, [...values], (error, data) => {
      if (error) return res.status(500).json(error);

      pagination = {
        total: data[0].total,
        page,
        limit,
      };
    });
  }

  db.query(sql, [...values], (error, data) => {
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
