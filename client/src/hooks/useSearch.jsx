/* eslint-disable no-unused-vars */
const checkContains = (text, match) => {
  return text.toLowerCase().includes(match.toLowerCase());
};

const highlightText = (text, match) => {
  const highlightedText = text.split(new RegExp(`(${match})`, "gi"));
  return highlightedText.map((item, ind) => {
    return item.toLowerCase() === match.toLowerCase() ? (
      <mark key={ind}>{item}</mark>
    ) : (
      <span key={ind}>{item}</span>
    );
  });
};

function useSearch(searchedArray, match, keys = []) {
  const result = searchedArray.map((item) => {
    const highlighted = {};
    keys.forEach((key) => {
      if (checkContains(item[key], match)) {
        highlighted[key] = highlightText(item[key], match);
      }
    });

    const highlightedItem = { ...item, ...highlighted };
    return highlightedItem;
  });

  return result;
}

export default useSearch;
