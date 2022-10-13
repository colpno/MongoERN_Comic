import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { noSearchResult } from "assets/images";
import { Scrollbar } from "components/Scrollbar";
import NoData from "features/NoData";
import SearchDropdownGroup from "./SearchDropdownGroup";
import styles from "../assets/styles/SearchDropdownList.module.scss";

const cx = classNames.bind(styles);

function SearchDropdownList({ searchResult }) {
  return (
    <>
      {searchResult.length > 0 ? (
        <div className={cx("dropdown")}>
          <Scrollbar>
            <SearchDropdownGroup
              cx={cx}
              searchResult={searchResult}
              label="Truyện chính thức"
            />
            <SearchDropdownGroup
              cx={cx}
              searchResult={searchResult}
              label="Truyện chính thức"
            />
          </Scrollbar>
        </div>
      ) : (
        <div className={cx("dropdown")}>
          <Scrollbar>
            <NoData image={noSearchResult} className={cx("no-data")}>
              <h6>Không có kết quả nào phù hợp!</h6>
            </NoData>
          </Scrollbar>
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
