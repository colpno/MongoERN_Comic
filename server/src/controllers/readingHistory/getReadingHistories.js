import { db } from '../../config/mysql.config.js';
import { separateOtherParams } from '../common/index.js';
import { table } from './index.js';

export default function getReadingHistories(req, res) {
  const { sort, order, page, limit, ...others } = req.query;
  const { filter, search } = separateOtherParams(others);

  const values = [];
  let whereStatement = '';

  const filterKeys = Object.keys(filter);
  const filterLength = filterKeys.length - 1;
  values.push(...filterKeys.map((key) => `%${filter[key].toLowerCase()}%`));
  whereStatement += filterKeys.reduce(
    (string, key, index) =>
      `${string}LOWER(a.\`${key}\`) LIKE ?${index !== filterLength ? ' AND ' : ''}`,
    ''
  );

  const searchKeys = Object.keys(search);
  const searchLength = searchKeys.length - 1;
  values.push(...searchKeys.map((key) => search[key]));
  whereStatement += searchKeys.reduce(
    (string, key, index) => `${string}a.\`${key}\` = ?${index !== searchLength ? ' AND ' : ''}`,
    ''
  );

  const orderStatement = `
    ORDER BY a.\`${sort || 'id'}\`+0 ${order?.toUpperCase() || 'ASC'},
    a.\`${sort || 'id'}\` ${order?.toUpperCase() || 'ASC'}`;

  let titleSQL = `
    SELECT b.*
    FROM ${table} as a JOIN title as b ON a.titleId = b.guid
    ${whereStatement.trim() !== '' ? `WHERE ${whereStatement}` : ''}
    ${orderStatement}
  `;

  let chapterSQL = `
    SELECT b.*
    FROM ${table} as a JOIN chapter as b ON a.chapterId = b.guid
    ${whereStatement.trim() !== '' ? `WHERE ${whereStatement}` : ''}
    ${orderStatement}
  `;

  let sql = `
    SELECT *
    FROM ${table} as a
    ${whereStatement.trim() !== '' ? `WHERE ${whereStatement}` : ''}
    ${orderStatement}
  `;

  let pagination;
  if (limit && page) {
    const limitSQL = `
      LIMIT ${(page - 1) * limit},${limit * page}
    `;
    sql += limitSQL;
    titleSQL += limitSQL;
    chapterSQL += limitSQL;

    const subQuery = `
      SELECT COUNT(guid) as total
      FROM ${table} as a
      WHERE ${whereStatement}
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

  db.query(titleSQL, [...values], (error, titles) => {
    if (error) return res.status(500).json({ error: 'Lỗi do server', detail: error });
    // if (titles.length === 0) return res.status(404).json({ error: 'Không tìm thấy' });

    db.query(chapterSQL, [...values], (error2, chapters) => {
      if (error2) return res.status(500).json({ error: 'Lỗi do server', detail: error2 });
      // if (chapters.length === 0) return res.status(404).json({ error: 'Không tìm thấy' });

      db.query(sql, [...values], (error3, histories) => {
        if (error3) return res.status(500).json({ error: 'Lỗi do server', detail: error3 });
        // if (histories.length === 0) return res.status(404).json({ error: 'Không tìm thấy' });
        if (histories.length) {
          const result = [];

          for (let i = 0; i < histories.length; i++) {
            const history = histories[i];

            const fulfilled = {
              ...history,
              chapter: chapters.find((chapter) => chapter.guid === history.chapterId),
              title: titles.find((title) => title.guid === history.titleId),
            };

            result.push(fulfilled);
          }

          // histories.reduce((array, history) => {
          //   const fulfilled = {
          //     ...history,
          //     chapter: chapters.find((chapter) => chapter.guid === history.chapterId),
          //     title: titles.find((title) => title.guid === history.titleId),
          //   };

          //   return [...array, fulfilled];
          // }, []);

          if (pagination) return res.status(200).json({ data: result, pagination });
          return res.status(200).json(result);
        }

        if (pagination) return res.status(200).json({ data: histories, pagination });
        return res.status(200).json(histories);
        // return res.status(400).json({ error });
      });
    });
  });
}
