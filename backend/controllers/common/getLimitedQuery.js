import { db } from '../../database/connect.js';

export default function getLimitedQuery(
  res,
  table,
  limit,
  page,
  select = '*',
  defaultSortCol = 'id',
  order = 'ASC'
) {
  const sql = `
		SELECT ${select}
		FROM \`${table}\`
		ORDER BY \`${defaultSortCol}\` ${order}
		LIMIT ${(page - 1) * limit},${limit * page}
	`;

  db.query(sql, (error, data) => {
    if (error) return res.status(500).json(error);

    const sql = `
      SELECT COUNT(*) AS 'total'
      FROM \`${table}\`
    `;

    db.query(sql, (error, rows) => {
      if (error) return res.status(500).json(error);

      return res
        .status(200)
        .json({ data, pagination: { total: rows[0].total, page: +page, limit: +limit } });
    });
  });
}
