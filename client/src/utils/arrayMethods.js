export function createArrayFromTo(from, to) {
  const array = [];
  for (let i = from; i <= to; i++) {
    array.push(i);
  }
  return array;
}

export function makeUnique(array) {
  return Array.from(new Set(array));
}

export function sort(array, key, order) {
  switch (order.toLowerCase()) {
    case "asc":
      return array.sort((a, b) => {
        if (typeof a[key] === typeof 1) {
          return a[key] - b[key];
        }
        if (typeof a[key] === typeof "1") {
          return a[key].localeCompare(b[key]);
        }
        return -1;
      });
    case "desc":
      return array.sort((a, b) => {
        if (typeof a[key] === typeof 1) {
          return b[key] - a[key];
        }
        if (typeof a[key] === typeof "1") {
          return b[key].localeCompare(a[key]);
        }
        return -1;
      });
    default:
      throw new Error("Order not found");
  }
}
