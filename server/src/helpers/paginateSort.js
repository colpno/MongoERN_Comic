const paginateSort = async (queries, MongooseModel) => {
  const { _page, _limit, _sort, _order } = queries;

  if (_page && _limit && _sort && _order) {
    const params = { ...queries };

    delete params._page;
    delete params._limit;
    delete params._sort;
    delete params._order;

    const data = await MongooseModel.find(params)
      .skip(_limit * _page - _limit)
      .limit(_limit)
      .sort({ [_sort]: _order });
    const total = await MongooseModel.countDocuments();

    return {
      paginate: {
        page: _page,
        limit: _limit,
        total,
      },
      data,
    };
  }

  if (_page && _limit) {
    const params = { ...queries };

    delete params._page;
    delete params._limit;

    const data = await MongooseModel.find(params)
      .skip(_limit * _page - _limit)
      .limit(_limit);
    const total = await MongooseModel.countDocuments();

    return {
      paginate: {
        page: _page,
        limit: _limit,
        total,
      },
      data,
    };
  }

  if (_sort && _order) {
    const params = { ...queries };

    delete params._sort;
    delete params._order;

    const data = await MongooseModel.find(params).sort({ [_sort]: _order });

    return data;
  }
};

export default paginateSort;
