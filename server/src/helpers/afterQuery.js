export const removeNullPopulate = (resultArray = [], embed = []) => {
  if (embed.length > 0) {
    const populateField = embed.map((item) => item.path);
    return resultArray.filter((item) => populateField.every((field) => item[field] !== null));
  }
  return resultArray;
};
