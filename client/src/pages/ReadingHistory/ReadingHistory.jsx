import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { readingHistoryService } from "services";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./styles/ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const HISTORIES_PER_PAGE = 25;
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(HISTORIES_PER_PAGE);

  const fetchData = () => {
    readingHistoryService
      .getAll({
        _page: pagination.page,
        _limit: pagination.limit,
      })
      .then((response) => {
        setHistories(response.data);
        setPaginationTotal(response.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page]);

  return (
    <>
      {histories.length > 0 ? (
        <Container className={cx("reading-history")}>
          <ReadingHistoryTable readingHistories={histories} cx={cx} />
          <Pagination pagination={pagination} setPagination={setPagination} />
        </Container>
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào được bạn theo dõi!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
      <div />
    </>
  );
}

export default ReadingHistory;
