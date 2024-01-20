export const moveItemInArray = (array, currentIndex, destinationIndex) => {
  if (
    currentIndex < 0 ||
    currentIndex >= array.length ||
    destinationIndex < 0 ||
    destinationIndex >= array.length
  ) {
    // Invalid index, do nothing
    return array;
  }

  const item = array.splice(currentIndex, 1)[0];
  array.splice(destinationIndex, 0, item);

  return array;
};
