import { db } from '../../config/mysql.config.js';
import { switchCaseConvert } from '../../helpers/convertDataFormat/switchCaseConvert.js';

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

    const getTotalRowSQL = `
      SELECT COUNT(*) AS 'total'
      FROM \`${table}\`
    `;

    db.query(getTotalRowSQL, (totalRowError, rows) => {
      if (totalRowError) return res.status(500).json({ error: totalRowError });

      return res.status(200).json({
        data: switchCaseConvert(data, table),
        pagination: { total: rows[0].total, page: +page, limit: +limit },
      });
    });
  });
}
