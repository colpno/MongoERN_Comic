import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import Button from "components/Button";
import { createArrayFromTo } from "utils";
import styles from "./assets/Pagination.module.scss";

const cx = classNames.bind(styles);

function Pagination({ pagination, onPageChange }) {
  const { page, limit, total } = pagination;
  const totalPage = Math.ceil(total / limit);
  const LIMIT_NEARBY_PAGES = 2;

  let firstPage = page > LIMIT_NEARBY_PAGES ? page - LIMIT_NEARBY_PAGES : 1;
  let lastPage =
    page < totalPage - LIMIT_NEARBY_PAGES
      ? page + LIMIT_NEARBY_PAGES
      : totalPage;
  if (page <= LIMIT_NEARBY_PAGES + 2) {
    lastPage += LIMIT_NEARBY_PAGES + 3 - page;
  }
  if (lastPage > totalPage) {
    lastPage = totalPage;
  }
  if (page >= totalPage - LIMIT_NEARBY_PAGES - 1) {
    firstPage += totalPage - LIMIT_NEARBY_PAGES - 2 - page;
  }
  if (firstPage < 1) {
    firstPage = 1;
  }
  const pages = createArrayFromTo(firstPage, lastPage);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <div className={cx("pagination")}>
      {totalPage > 1 && (
        <>
          <Button
            text
            className={cx("prev")}
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </Button>
          {firstPage >= 2 ? (
            <Button className={cx("page")} onClick={() => handlePageChange(1)}>
              1
            </Button>
          ) : (
            ""
          )}
          {firstPage > 2 ? (
            <Button className={cx("page")} disabled>
              ...
            </Button>
          ) : (
            ""
          )}
          {pages.map((index) => (
            <Button
              key={index}
              className={cx("page", page === index ? "current" : "")}
              onClick={() => handlePageChange(index)}
            >
              {index}
            </Button>
          ))}
          {lastPage + 1 < totalPage ? (
            <Button className={cx("page")} disabled>
              ...
            </Button>
          ) : (
            ""
          )}
          {lastPage < totalPage ? (
            <Button
              className={cx("page")}
              onClick={() => handlePageChange(totalPage)}
            >
              {totalPage}
            </Button>
          ) : (
            ""
          )}
          <Button
            text
            className={cx("next")}
            disabled={page >= totalPage}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </>
      )}
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
