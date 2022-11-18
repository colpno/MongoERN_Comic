import classNames from "classnames/bind";
import { useDebounce } from "hooks";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { setSearchText } from "libs/redux/slices/globalSlice";
import styles from "./Search.module.scss";

const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.global.searchText);
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebounce(searchValue, 500);

  const handleClear = () => {
    setSearchValue("");
  };

  useEffect(() => {
    if (searchText.length === 0) {
      handleClear();
    }
  }, [searchText]);

  useEffect(() => {
    dispatch(setSearchText(searchValue));
  }, [debounced]);

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
