import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineOpenInNew } from "react-icons/md";

import { Button, Popper } from "components";
import { useClickOutSide, useDebounce, useSearch } from "hooks";
import { titleService } from "services";
import styles from "../styles/Search.module.scss";
import SearchDropdownList from "./SearchDropdownList";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const searchText = useDebounce(searchValue, 500);

  const searchRef = useClickOutSide(showResult, () => showResult && setShowResult(false));

  const handleClear = () => {
    setSearchValue("");
    setShowResult(false);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      const params = {
        _or: JSON.stringify([{ title_like: searchText }, { author_like: searchText }]),
      };

      titleService
        .getAll(params, false)
        .then((response) => {
          const searched = useSearch(response.data, searchValue, ["title", "author"]);
          setSearchResult(searched);
        })
        .catch((error) => console.error(error));
    }
  }, [searchText]);

  useEffect(() => {
    if (searchValue.trim().length === 0) {
      setSearchResult([]);
    }
  }, [searchValue]);

  return (
    <Popper
      width="400px"
      maxHeight="50vh"
      position="center"
      placeholder={
        <div className={cx("search")} ref={searchRef}>
          <div className={cx("wrapper")}>
            <Button
              wrapper
              to="/search"
              className={cx("advanced-search-btn")}
              title="Tìm kiếm nâng cao"
            >
              <MdOutlineOpenInNew className={cx("icon")} />
            </Button>
            <input
              type="text"
              placeholder="Tìm tên truyện, tên tác giả"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setShowResult(true)}
            />
            {searchValue.length > 0 && (
              <AiFillCloseCircle className={cx("clear-btn")} onClick={() => handleClear()} />
            )}
            <IoSearchOutline className={cx("search-icon")} />
          </div>
        </div>
      }
      content={<SearchDropdownList cx={cx} searchResult={searchResult} />}
      contentVisible={searchValue.length > 0 && searchText.length > 0}
    />
  );
}

export default Search;
