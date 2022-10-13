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
