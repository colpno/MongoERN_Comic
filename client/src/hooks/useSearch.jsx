const checkContains = (text, match) => {
  return text.toLowerCase().includes(match.toLowerCase());
};

const handleHighlightText = (text, searchValue) => {
  const highlightedText = text.split(new RegExp(`(${searchValue})`, "gi"));
  return highlightedText.map((item, ind) => {
    return item.toLowerCase() === searchValue.toLowerCase() ? (
      <mark key={ind}>{item}</mark>
    ) : (
      <span key={ind}>{item}</span>
    );
  });
};

const handleSearchTitleNameAuthor = (searchedArray, searchValue, limit) => {
  let index = 0;

  return searchedArray.reduce((titleArray, ttl) => {
    const { title, author } = ttl;

    if (
      index !== limit &&
      checkContains(title, searchValue) &&
      checkContains(author, searchValue)
    ) {
      titleArray.push({
        ...ttl,
        title: handleHighlightText(title, searchValue),
        author: handleHighlightText(author, searchValue),
      });
      index += 1;
    }

    return titleArray;
  }, []);
};

const handleSearchTitleName = (searchedArray, searchValue, limit) => {
  let index = 0;

  return searchedArray.reduce((titleArray, ttl) => {
    const { title } = ttl;

    if (index !== limit && checkContains(title, searchValue)) {
      titleArray.push({
        ...ttl,
        title: handleHighlightText(title, searchValue),
      });
      index += 1;
    }

    return titleArray;
  }, []);
};

const handleSearchTitleAuthor = (searchedArray, searchValue, limit) => {
  let index = 0;

  return searchedArray.reduce((titleArray, title) => {
    const { author } = title;

    if (index !== limit && checkContains(author, searchValue)) {
      titleArray.push({
        ...title,
        author: handleHighlightText(author, searchValue),
      });
      index += 1;
    }

    return titleArray;
  }, []);
};

const checkDuplicate = (result = [], array = [], field = "") => {
  const temp = [];

  for (let i = 0; i < array.length; i++) {
    const arr = array[i];

    const isDuplicate = result.some((res) => arr[field] === res[field]);

    if (!isDuplicate) temp.push(arr);
  }

  return temp;
};

function useSearch(searchedArray, searchValue, limit) {
  const checkEmpty = (...array) => {
    const tmp = array.map((arr) => arr.length === 0);
    return tmp.some((item) => item === true);
  };

  const result = [];

  const searchTitleNameAuthor = handleSearchTitleNameAuthor(
    searchedArray,
    searchValue,
    limit
  );

  result.push(...searchTitleNameAuthor);

  const searchTitleAuthor = checkEmpty(searchTitleNameAuthor)
    ? handleSearchTitleAuthor(searchedArray, searchValue, limit)
    : [];

  result.push(...checkDuplicate(result, searchTitleAuthor, "_id"));

  const searchTitleName = checkEmpty(searchTitleNameAuthor, searchTitleAuthor)
    ? handleSearchTitleName(searchedArray, searchValue, limit)
    : [];

  result.push(...checkDuplicate(result, searchTitleName, "_id"));

  return result.slice(0, limit);
}

export default useSearch;
