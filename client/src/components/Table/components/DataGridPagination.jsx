import classNames from "classnames/bind";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { memo, useState } from "react";

import { Button } from "components";
import { createArrayFromTo } from "utils";
import styles from "../styles/DataGridPagination.module.scss";

const cx = classNames.bind(styles);

function Pagination() {
  const apiRef = useGridApiContext();
  const total = useGridSelector(apiRef, gridPageCountSelector);
  const [page, setPage] = useState(useGridSelector(apiRef, gridPageSelector));
  const LIMIT_NEARBY_PAGES = 2;

  let startRange = page - LIMIT_NEARBY_PAGES < 0 ? 0 : page - LIMIT_NEARBY_PAGES;
  let endRange = page + LIMIT_NEARBY_PAGES > total ? total : page + LIMIT_NEARBY_PAGES;

  // extend startRange if second 3 dots disappeared
  if (total - page - 2 * LIMIT_NEARBY_PAGES < 0) {
    startRange -= Math.abs(total - page - 2 * LIMIT_NEARBY_PAGES);
  }
  // extend endRange if first 3 dots disappeared
  if (page - LIMIT_NEARBY_PAGES * 2 < 0) {
    endRange += Math.abs(page - LIMIT_NEARBY_PAGES * 2);
  }

  const range = createArrayFromTo(startRange, endRange);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    apiRef.current.setPage(newPage);
  };

  return (
    <>
      {total > 0 && (
        <div className={cx("pagination")}>
          <Button
            text
            className={cx("prev")}
            disabled={page <= 0}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </Button>
          {startRange > 0 ? (
            <Button className={cx("page")} onClick={() => handlePageChange(0)}>
              1
            </Button>
          ) : (
            ""
          )}
          {startRange > 1 ? (
            <Button className={cx("page")} disabled>
              ...
            </Button>
          ) : (
            ""
          )}
          {range.map((pageIndex) => (
            <Button
              key={pageIndex}
              className={cx("page", page === pageIndex ? "current" : "")}
              onClick={() => handlePageChange(pageIndex)}
            >
              {pageIndex + 1}
            </Button>
          ))}
          {total - endRange > 1 ? (
            <Button className={cx("page")} disabled>
              ...
            </Button>
          ) : (
            ""
          )}
          {total - endRange > 0 ? (
            <Button className={cx("page")} onClick={() => handlePageChange(total)}>
              {total + 1}
            </Button>
          ) : (
            ""
          )}
          <Button
            text
            className={cx("next")}
            disabled={page >= total}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
      {}
    </>
  );
}

Pagination.propTypes = {};

export default memo(Pagination);
