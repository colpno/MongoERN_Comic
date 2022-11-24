export const convertToSQL = (queries) => {
  const { sort, order, limit, page, embed, ...otherQueries } = queries;
  const queryKeys = Object.keys(otherQueries);

  const whereArray = [];
  const values = [];

  for (let i = 0; i < queryKeys.length; i++) {
    const query = queryKeys[i];

    if (otherQueries[query].length === 0) {
      continue;
    }

    if (typeof otherQueries[query] === typeof []) {
      values.push(...otherQueries[query]);
      whereArray.push(...otherQueries[query].map(() => `${query} = ?`));
      continue;
    }

    if (query.includes('_like')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_like'))}\` LIKE ?`);
      values.push(`%${otherQueries[query]}%`);
      continue;
    }

    values.push(otherQueries[query]);

    if (query.includes('genreId')) {
      whereArray.push(`b.\`${query}\` = ?`);
      continue;
    }

    if (query.includes('_gte')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_gte'))}\` >= ?`);
      continue;
    }

    if (query.includes('_lte')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_lte'))}\` <= ?`);
      continue;
    }

    if (query.includes('_gt')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_gt'))}\` > ?`);
      continue;
    }

    if (query.includes('_lt')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_lt'))}\` < ?`);
      continue;
    }

    if (query.includes('_ne')) {
      whereArray.push(`a.\`${query.slice(0, query.indexOf('_ne'))}\` <> ?`);
      continue;
    }

    whereArray.push(`a.\`${query}\` = ?`);
  }

  const whereStatement = whereArray.reduce(
    (str, sql, index) => (index === 0 ? `WHERE${str} ${sql}` : `${str} AND ${sql}`),
    ''
  );

  const orderStatement =
    sort &&
    order &&
    `ORDER BY
    a.\`${sort}\`+0 ${order.toUpperCase()}, a.\`${sort}\` ${order.toUpperCase()}`;

  const limitStatement = page && limit && `LIMIT ${(page - 1) * limit},${limit * page}`;

  return { whereStatement, orderStatement, limitStatement, values };
};
