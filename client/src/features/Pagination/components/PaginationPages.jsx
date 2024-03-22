import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import usePagination from "../hooks/usePagination.jsx";
import styles from "../Pagination.module.scss";

const cx = classNames.bind(styles);

const defaultPaginationStates = { page: 1, limit: 0, total: 0 };

function PaginationPages({
  currentPage,
  totalPage,
  handlePageChange,
  paginationStates = defaultPaginationStates,
}) {
  const { firstPage, lastPage, pages } = usePagination(paginationStates);

  return (
    <>
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
          className={cx("page", currentPage === index ? "current" : "")}
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
        <Button className={cx("page")} onClick={() => handlePageChange(totalPage)}>
          {totalPage}
        </Button>
      ) : (
        ""
      )}
    </>
  );
}

PaginationPages.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  paginationStates: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaginationPages;
