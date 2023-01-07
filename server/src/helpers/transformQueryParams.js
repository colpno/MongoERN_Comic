const querySuffixes = [
  '_gt', // Greater than
  '_gte', // Greater than or equal
  '_lt', // Lesser than
  '_lte', // Lesser than or equal
  '_ne', // Not equal
  '_in', // In array
  '_nin', // Not in array
  '_all', // Match all elements in array
  '_like', // Contains part of string
  '_embed', // Embed collection
];

const convertToMongoQueryOperator = (suffix, value) => {
  switch (suffix) {
    case '_gt':
      return { $gt: value };
    case '_gte':
      return { $gte: value };
    case '_lt':
      return { $lt: value };
    case '_lte':
      return { $lte: value };
    case '_ne':
      return { $ne: value };
    case '_in':
      return { $in: value };
    case '_nin':
      return { $nin: value };
    case '_all':
      return { $all: value };
    case '_like':
      return { $regex: value, $options: 'i' };
    default:
      return undefined;
  }
};

const sliceOffCondition = (queryParam, condition) =>
  queryParam.slice(0, queryParam.indexOf(condition));

const transformQueryParams = (queries = {}) => {
  const queryKeys = Object.keys(queries);

  const transformedQuery = queryKeys.reduce((result, queryKey) => {
    const queryValue = queries[queryKey];
    const newResult = {
      ...result,
    };

    if (queryKey === '_embed') {
      const values = JSON.parse(queryValue);
      if (Array.isArray(values)) {
        const converted = values.map((val) => {
          const returnValue = { path: val };
          if (val.collection) returnValue.path = val.collection;
          if (val.fields) returnValue.select = val.fields;
          if (val.match) returnValue.match = transformQueryParams(val.match);
          return returnValue;
        });
        newResult[queryKey] = converted;
        return newResult;
      }
      throw new Error('_embed phải là kiểu dữ liệu mảng');
    }

    const startOfSuffixIndex = queryKey.lastIndexOf('_');
    const suffix = queryKey.slice(startOfSuffixIndex);
    const docField = sliceOffCondition(queryKey, suffix);

    if (startOfSuffixIndex !== -1) {
      // if query key contains suffix
      if (querySuffixes.includes(suffix)) {
        const mongoOperator = convertToMongoQueryOperator(suffix, queryValue);

        // suffix of query is in suffix array
        if (mongoOperator) {
          newResult[docField] = {
            ...result[docField], // for multi operators
            ...mongoOperator,
          };
          return newResult;
        }
      }
    }

    // else just query like normal key = value pairs
    newResult[queryKey] = queryValue;
    return newResult;
  }, {});

  return transformedQuery;
};

export default transformQueryParams;
