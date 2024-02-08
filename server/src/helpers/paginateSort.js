const paginateSort = async (queries, MongooseModel) => {
  if (!queries._page) queries._page = 1;
  try {
    if (queries._sort) queries._sort = JSON.parse(queries._sort);
  } catch (error) {
    if ('message' in error && !error.message.includes('not valid JSON')) {
      throw new Error(error);
    }
  }

  const { _sort, _page, _limit, _fields, _embed, ...others } = queries;

  if (_limit && _sort) {
    const data = await MongooseModel.find(others)
      .select(_fields)
      .populate(_embed)
      .skip(_limit * _page - _limit)
      .limit(_limit)
      .sort(_sort);

    const count = await MongooseModel.countDocuments(others);

    return {
      pagination: {
        page: _page,
        limit: _limit,
        total: count,
      },
      data,
    };
  }

  if (_limit) {
    const data = await MongooseModel.find(others)
      .select(_fields)
      .populate(_embed)
      .skip(_limit * _page - _limit)
      .limit(_limit);

    const count = await MongooseModel.countDocuments(others);

    return {
      pagination: {
        page: _page,
        limit: _limit,
        total: count,
      },
      data,
    };
  }

  if (_sort) {
    const data = await MongooseModel.find(others).select(_fields).populate(_embed).sort(_sort);

    return { data };
  }
};

export default paginateSort;
