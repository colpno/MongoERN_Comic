/* eslint-disable no-use-before-define */
const convertToMongoQueryOperator = (suffix, value) => {
  switch (suffix) {
    /*
      Greater than.
      Input example: "field"_gt: "value"
    */
    case '_gt':
      return { $gt: value };

    /*
      Greater than or equal.
      Input example: "field"_gte: "value"
    */
    case '_gte':
      return { $gte: value };

    /*
      Lesser than.
      Input example: "field"_lt: "value"
    */
    case '_lt':
      return { $lt: value };

    /*
      Lesser than or equal.
      Input example: "field"_lte: "value"
    */
    case '_lte':
      return { $lte: value };

    /*
      Not equal.
      Input example: "field"_ne: "value"
    */
    case '_ne':
      return { $ne: value };

    /*
      In array.
      Input example: "field"_in: ["value", ...]
    */
    case '_in':
      return { $in: value };

    /*
      Not in array.
      Input example: "field"_nin: ["value", ...]
    */
    case '_nin':
      return { $nin: value };

    /*
      Field has all elements.
      Input example: "field"_all: ["value", ...]
    */
    case '_all':
      return { $all: value };

    /*
      Contains part of string.
      Input example: "field"_like: "value"
    */
    case '_like':
      return { $regex: value, $options: 'i' };

    /*
      For populate operator.
      Input example:
      _embed: [
        {
          collection: "field",
          fields: "field(s)",
          match: { query }
        },
        ...
      ]
    */
    case '_embed': {
      const values = JSON.parse(value);
      if (Array.isArray(values)) {
        const converted = values.map((val) => {
          const returnValue = { path: val };
          if (val.collection) returnValue.path = val.collection;
          if (val.fields) returnValue.select = val.fields;
          if (val.match) returnValue.match = transformQueryParams(val.match);
          return returnValue;
        });
        return { _embed: converted };
      }
      throw new Error('_embed phải là kiểu dữ liệu mảng');
    }

    /*
      Query with the "or" statement.
      Input example:
        1: _or: [ { query }, ...]
        2: _or: { query }
    */
    case '_or': {
      const values = JSON.parse(value);
      if (Array.isArray(values)) {
        const converted = values.map((query) => transformQueryParams(query));
        return { $or: converted };
      }

      return { $or: value };
    }
    default:
      return undefined;
  }
};

const sliceOffCondition = (queryParam, condition) =>
  queryParam.slice(0, queryParam.indexOf(condition));

const sliceKey = (key) => {
  const startOfSuffixIndex = key.lastIndexOf('_');
  const suffix = key.slice(startOfSuffixIndex);
  const field = sliceOffCondition(key, suffix);

  return { startOfSuffixIndex, suffix, field };
};

function transformQueryParams(queries = {}) {
  const queryKeys = Object.keys(queries);

  const transformedQuery = queryKeys.reduce((result, queryKey) => {
    const queryValue = queries[queryKey];
    let newResult = {
      ...result,
    };

    const { startOfSuffixIndex, suffix, field } = sliceKey(queryKey);

    if (startOfSuffixIndex !== -1) {
      // if query key contains suffix
      const mongoOperator = convertToMongoQueryOperator(suffix, queryValue);

      // suffix of query is in suffix array
      if (mongoOperator) {
        if (field) {
          newResult[field] = {
            ...result[field], // for multi operators
            ...mongoOperator,
          };
        } else {
          newResult = {
            ...result,
            ...mongoOperator,
          };
        }
        return newResult;
      }
    }

    // else just query like normal key = value pairs
    newResult[queryKey] = queryValue;
    return newResult;
  }, {});

  return transformedQuery;
}

export default transformQueryParams;
