/* eslint-disable no-unreachable */
import { convertToSQL } from '../common/index.js';
import { table } from './index.js';
import { db } from '../../config/database.js';

export default function getTitles(req, res) {
  const { page, limit, embed } = req.query;
  const { values, whereStatement, limitStatement, orderStatement } = convertToSQL(req.query);

  const joinStatement = embed ? `INNER JOIN \`${embed}\` as b ON a.guid = b.titleId` : '';

  const sql = `
    SELECT ${!!joinStatement ? 'a.' : ''}*
    FROM \`${table}\` as a ${joinStatement || ''}
    ${whereStatement || ''}
    ${orderStatement || ''}
    ${limitStatement || ''}
  `;
  let pagination;

  if (limitStatement) {
    const paginationSQL = `
      SELECT COUNT(${!!joinStatement ? 'a.' : ''}guid) as total
      FROM \`${table}\` as a ${joinStatement || ''}
      ${whereStatement || ''}
    `;

    db.query(paginationSQL, values, (error, data) => {
      if (error) return res.status(500).json(error);

      pagination = {
        total: data[0].total,
        page,
        limit,
      };
    });
  }

  db.query(sql, values, (error, data) => {
    if (error) return res.status(500).json(error);
    if (pagination) return res.status(200).json({ data, pagination });
    return res.status(200).json(data);
  });
}

// import {
//   filterQuery,
//   getAllQuery,
//   getLimitedQuery,
//   searchQuery,
//   separateOtherParams,
//   sortQuery,
// } from '../common/index.js';
// import { table } from './index.js';

// export default function getTitles(req, res) {
//   const { sort, order, page, limit, ...others } = req.query;
//   const { filter, search } = separateOtherParams(others);

//   // URL: ?column_like=...
//   if (Object.keys(filter).length > 0) {
//     return filterQuery(res, table, filter, page, limit, sort, order);
//   }

//   // URL: ?column=...
//   if (Object.keys(search).length > 0) {
//     return searchQuery(res, table, search, page, limit, sort, order);
//   }

//   // URL: ?sort=column&order=...
//   if (sort && order) return sortQuery(res, table, sort, order, page, limit);

//   // URL: ?limit=...&page=...
//   if (limit && page) return getLimitedQuery(res, table, limit, page);

//   return getAllQuery(res, table);
// }
