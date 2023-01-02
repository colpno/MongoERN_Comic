export const filterFalsy = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return Object.keys(value).reduce((acc, key) => {
      if (value[key]) {
        acc[key] = value[key];
      }

      return acc;
    }, {});
  }
};
