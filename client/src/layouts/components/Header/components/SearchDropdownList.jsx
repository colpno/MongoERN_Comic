import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { noSearchResult } from "assets/images";
import { NoData } from "features";
import styles from "../styles/SearchDropdownList.module.scss";
import SearchDropdownGroup from "./SearchDropdownGroup";

const cx = classNames.bind(styles);

function SearchDropdownList({ searchResult }) {
  return (
    <>
      {searchResult.length > 0 ? (
        <div className={cx("dropdown")}>
          <SearchDropdownGroup cx={cx} searchResult={searchResult} />
        </div>
      ) : (
        <div className={cx("dropdown")}>
          <NoData image={noSearchResult} className={cx("no-data")}>
            <h6>Không có kết quả nào phù hợp!</h6>
          </NoData>
        </div>
      )}
      {}
    </>
  );
}

SearchDropdownList.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default SearchDropdownList;
