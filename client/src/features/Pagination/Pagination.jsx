import classNames from "classnames/bind";
import { Button } from "components";
import PropTypes from "prop-types";
import { memo } from "react";
import styles from "./Pagination.module.scss";
import PaginationPages from "./components/PaginationPages.jsx";

const cx = classNames.bind(styles);

function Pagination({ pagination, setPagination }) {
  const { page, limit, total } = pagination;
  const totalPage = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  if (totalPage <= 1) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <div className={cx("pagination")}>
      <Button
        text
        className={cx("prev")}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </Button>
      <PaginationPages
        currentPage={page}
        handlePageChange={handlePageChange}
        paginationStates={pagination}
        totalPage={totalPage}
      />
      <Button
        text
        className={cx("next")}
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default memo(Pagination);
