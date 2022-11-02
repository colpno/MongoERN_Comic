export const separateOtherParams = (others) => {
  const otherKeys = Object.keys(others);

  const separated = otherKeys.reduce(
    (obj, param) => {
      if (param.includes('_gte')) {
        return {
          ...obj,
          gte: {
            ...obj.gte,
            [param.slice(0, param.indexOf('_gte'))]: others[param],
          },
        };
      }

      if (param.includes('_lte')) {
        return {
          ...obj,
          lte: {
            ...obj.lte,
            [param.slice(0, param.indexOf('_lte'))]: others[param],
          },
        };
      }

      if (param.includes('_ne')) {
        return {
          ...obj,
          ne: {
            ...obj.ne,
            [param.slice(0, param.indexOf('_ne'))]: others[param],
          },
        };
      }

      if (param.includes('_like')) {
        return {
          ...obj,
          filter: {
            ...obj.filter,
            [param.slice(0, param.indexOf('_like'))]: others[param],
          },
        };
      }

      return {
        ...obj,
        search: {
          ...obj.search,
          [param]: others[param],
        },
      };
    },
    { gte: {}, lte: {}, ne: {}, filter: {}, search: {} }
  );

  const { gte, lte, ne, filter, search } = separated;
  return { gte, lte, ne, filter, search };
};
