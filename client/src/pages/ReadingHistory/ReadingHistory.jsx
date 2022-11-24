import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData, Pagination } from "features";
import { getLimitedReadingHistoriesByUserID } from "services/readingHistory";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const user = useSelector((state) => state.user.user);
  const { readingHistories, pagination, setPagination } =
    getLimitedReadingHistoriesByUserID(user.guid, 25);
  const hasData = readingHistories.length > 0;

  return (
    <>
      {hasData ? (
        <Container className={cx("reading-history")}>
          <ReadingHistoryTable readingHistories={readingHistories} cx={cx} />
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
