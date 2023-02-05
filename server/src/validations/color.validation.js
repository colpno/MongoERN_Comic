export const isHex = (value = '') => {
  const regex = /^#[0-9A-F]{8}$/g;
  const matched = value.match(regex);
  if (!matched) return false;
  return true;
};
