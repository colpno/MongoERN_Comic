import { db } from '../../database/connect.js';

export default function getAllQuery(
  res,
  table,
  select = '*',
  defaultSortCol = 'id',
  order = 'ASC'
) {
  const sql = `
    SELECT ${select}
    FROM ${table}
    ORDER BY \`${defaultSortCol}\` ${order}
  `;

  db.query(sql, (error, data) => {
    if (error) return res.status(500).json(error);
    return res.json(data);
  });
}
