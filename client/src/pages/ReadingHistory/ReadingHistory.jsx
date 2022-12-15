import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { getAllReadingHistories } from "services/readingHistory";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const HISTORIES_PER_PAGE = 25;
  const user = useSelector((state) => state.user.user);
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(HISTORIES_PER_PAGE);

  const fetchData = () => {
    getAllReadingHistories({
      userId: user.guid,
      page: pagination.page,
      limit: pagination.limit,
    })
      .then((response) => {
        setHistories(response.data);
        setPaginationTotal(response.pagination.total);
      })
      .catch((error) => console.log(error));
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
