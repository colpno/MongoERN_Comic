export const isEmpty = (checkObject) => {
  if (typeof checkObject === typeof []) {
    return checkObject.length === 0;
  }

  if (typeof checkObject === typeof {}) {
    return Object.keys(checkObject).length === 0;
  }

  if (typeof checkObject === typeof "") {
    return checkObject.length === 0;
  }

  if (checkObject) {
    return true;
  }

  return false;
};
