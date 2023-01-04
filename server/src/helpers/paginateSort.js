const paginateSort = async (queries, MongooseModel) => {
  if (!queries._page) queries._page = 1;
  const { _page, _limit, _sort, _order, _fields, ...others } = queries;

  if (_limit && _sort && _order) {
    const data = await MongooseModel.find(others)
      .select(_fields)
      .skip(_limit * _page - _limit)
      .limit(_limit)
      .sort({ [_sort]: _order });

    const count = await MongooseModel.countDocuments(others);

    return {
      paginate: {
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
      .skip(_limit * _page - _limit)
      .limit(_limit);

    const count = await MongooseModel.countDocuments(others);

    return {
      paginate: {
        page: _page,
        limit: _limit,
        total: count,
      },
      data,
    };
  }

  if (_sort && _order) {
    const data = await MongooseModel.find(others)
      .select(_fields)
      .sort({ [_sort]: _order });

    return { data };
  }
};

export default paginateSort;
