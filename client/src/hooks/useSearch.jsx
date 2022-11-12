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

  return searchedArray.reduce((titleArray, title) => {
    const { name, author } = title;

    if (
      index !== limit &&
      checkContains(name, searchValue) &&
      checkContains(author, searchValue)
    ) {
      titleArray.push({
        ...title,
        name: handleHighlightText(name, searchValue),
        author: handleHighlightText(author, searchValue),
      });
      index += 1;
    }

    return titleArray;
  }, []);
};

const handleSearchTitleName = (searchedArray, searchValue, limit) => {
  let index = 0;

  return searchedArray.reduce((titleArray, title) => {
    const { name } = title;

    if (index !== limit && checkContains(name, searchValue)) {
      titleArray.push({
        ...title,
        name: handleHighlightText(name, searchValue),
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

function useSearch(searchedArray, searchValue, limit) {
  const checkEmpty = (...array) => {
    const tmp = array.map((arr) => arr.length === 0);
    return tmp.some((item) => item === true);
  };

  const searchTitleNameAuthor = handleSearchTitleNameAuthor(
    searchedArray,
    searchValue,
    limit
  );

  const searchTitleAuthor = checkEmpty(searchTitleNameAuthor)
    ? handleSearchTitleAuthor(searchedArray, searchValue, limit)
    : [];

  const searchTitleName = checkEmpty(searchTitleNameAuthor, searchTitleAuthor)
    ? handleSearchTitleName(searchedArray, searchValue, limit)
    : [];

  return [
    ...searchTitleNameAuthor,
    ...searchTitleName,
    ...searchTitleAuthor,
  ].slice(0, limit);
}

export default useSearch;
