export function convertToString(number) {
  return `${number}`;
}

export function replaceAt(string, from, to, replacement) {
  return string.substring(0, from) + replacement + string.substring(to);
}
