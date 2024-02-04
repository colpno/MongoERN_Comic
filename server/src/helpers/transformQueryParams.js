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
      return { $in: Array.isArray(value) ? value : [value] };

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

const convertNullValue = (value) => {
  if (value === 'null') return null;
  if (Array.isArray(value)) {
    return value.map((val) => (val === 'null' ? null : val));
  }

  return value;
};

const handleEmbed = (value) => {
  const transform = (queryValue = []) =>
    queryValue.map((parsedValue) => {
      if ('match' in parsedValue) {
        return {
          ...parsedValue,
          match: transformQueryParams(parsedValue.match),
        };
      }
      return parsedValue;
    });

  if (!Array.isArray(value) && typeof value === 'string') {
    const parsedQueryValue = JSON.parse(value);

    if (!Array.isArray(parsedQueryValue)) {
      throw new Error('Value of _embed must be an array of objects');
    }

    return transform(parsedQueryValue);
  }

  return transform(value);
};

function transformQueryParams(queries = {}) {
  const queryKeys = Object.keys(queries);

  const transformedQuery = queryKeys.reduce((result, queryKey) => {
    const queryValue = convertNullValue(queries[queryKey]);
    let newResult = {
      ...result,
    };

    if (queryKey === '_embed') {
      newResult[queryKey] = handleEmbed(queryValue);
    }

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
