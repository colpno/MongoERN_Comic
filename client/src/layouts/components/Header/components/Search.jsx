import classNames from "classnames/bind";
import { useClickOutSide, useDebounce, useSearch } from "hooks";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

import styles from "layouts/components/Header/assets/styles/Search.module.scss";
import { getTitles } from "services/titleServices";
import SearchDropdownList from "./SearchDropdownList";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const { titles } = getTitles();
  const debounced = useDebounce(searchValue, 500);

  const searchRef = useClickOutSide(
    showResult,
    () => showResult && setShowResult(false)
  );

  const handleClear = () => {
    setSearchValue("");
    setShowResult(false);
  };

  useEffect(() => {
    if (debounced.length > 0) {
      const searched = useSearch(titles, searchValue, 3);
      setSearchResult(searched);
    }
  }, [titles, debounced]);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <div className={cx("search")} ref={searchRef}>
      <div className={cx("search__wrapper__field")}>
        <input
          type="text"
          placeholder="Tìm tên truyện, tên tác giả"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />
        {searchValue && (
          <AiFillCloseCircle
            className={cx("search__wrapper__field__clear-btn")}
            onClick={() => handleClear()}
          />
        )}
        <IoSearchOutline className={cx("search__icon")} />
      </div>
      {showResult && debounced && (
        <SearchDropdownList cx={cx} searchResult={searchResult} />
      )}
    </div>
  );
}

Search.propTypes = {};

export default Search;
