const paginateSort = async (queries, MongooseModel) => {
  const { _limit, _sort, _order } = queries;
  let { _page } = queries;
  _page = _page || 1;

  if (_limit && _sort && _order) {
    const params = { ...queries };

    delete params._page;
    delete params._limit;
    delete params._sort;
    delete params._order;

    const data = await MongooseModel.find(params)
      .skip(_limit * _page - _limit)
      .limit(_limit)
      .sort({ [_sort]: _order });

    return {
      paginate: {
        page: _page,
        limit: _limit,
        total: data.length,
      },
      data,
    };
  }

  if (_limit) {
    const params = { ...queries };
    // console.log('file: paginateSort.js:29 ~ params', params);

    delete params._page;
    delete params._limit;

    const data = await MongooseModel.find(params)
      .skip(_limit * _page - _limit)
      .limit(_limit);

    return {
      paginate: {
        page: _page,
        limit: _limit,
        total: data.length,
      },
      data,
    };
  }

  if (_sort && _order) {
    const params = { ...queries };

    delete params._sort;
    delete params._order;

    const data = await MongooseModel.find(params).sort({ [_sort]: _order });

    return { data };
  }
};

export default paginateSort;
