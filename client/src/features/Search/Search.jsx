import classNames from "classnames/bind";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

import styles from "./Search.module.scss";
import useSearch from "./hooks/useSearch.jsx";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
  };

  useSearch(searchValue, handleClear);

  return (
    <div className={cx("search")}>
      <div className={cx("wrapper")}>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <AiFillCloseCircle
            className={cx("search__wrapper__field__clear-btn")}
            onClick={() => handleClear()}
          />
        )}
        <IoSearchOutline className={cx("search__icon")} />
      </div>
    </div>
  );
}

export default Search;
