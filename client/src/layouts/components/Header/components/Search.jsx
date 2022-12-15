import classNames from "classnames/bind";
import { useClickOutSide, useDebounce, useSearch } from "hooks";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";

import styles from "layouts/components/Header/assets/styles/Search.module.scss";
import { getAllTitles } from "services/title";
import { Button } from "components";
import SearchDropdownList from "./SearchDropdownList";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [titles, setTitles] = useState([]);
  const searchText = useDebounce(searchValue, 500);

  const searchRef = useClickOutSide(
    showResult,
    () => showResult && setShowResult(false)
  );

  const fetchData = () => {
    getAllTitles()
      .then((response) => setTitles(response))
      .catch((error) => console.log(error));
  };

  const handleClear = () => {
    setSearchValue("");
    setShowResult(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const searched = useSearch(titles, searchValue, 3);
      setSearchResult(searched);
    }
  }, [titles, searchText]);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <div className={cx("search")} ref={searchRef}>
      <div className={cx("wrapper")}>
        <Button wrapper to="/search" className={cx("search-extend")}>
          <MdOutlineOpenInNew className={cx("icon")} />
        </Button>
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
      {showResult && searchText && (
        <SearchDropdownList cx={cx} searchResult={searchResult} />
      )}
    </div>
  );
}

export default Search;
