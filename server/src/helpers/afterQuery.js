export const removeNullPopulate = (resultArray = [], embed = []) => {
  const populateField = embed.map((item) => item.path);
  return resultArray.filter((item) => populateField.every((field) => item[field] !== null));
};
