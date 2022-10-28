import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData, Pagination } from "features";
import { getLimitedReadingHistoriesByUserID } from "services/readingHistory";
import { countdown } from "utils/convertTime";
import ReadingHistoryTable from "./components/ReadingHistoryTable";
import styles from "./ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const user = useSelector((state) => state.user.user);
  const { readingHistories, pagination, setPagination } =
    getLimitedReadingHistoriesByUserID(user.id, 25);
  const hasData = readingHistories.length > 0;

  const calculateCountdown = (date) => {
    const timeObj = countdown(new Date() - new Date(date));
    const year = timeObj.year > 0 ? `${timeObj.year} năm` : "";
    const day = timeObj.day > 0 ? `${timeObj.day} ngày` : "";
    const hour = timeObj.hour > 0 ? `${timeObj.hour} giờ` : "";
    const minute = timeObj.minute > 0 ? `${timeObj.minute} phút` : "";
    const second = timeObj.second > 0 ? `${timeObj.second} giây` : "";

    if (year) {
      return `${year} ${day}`;
    }
    if (day) {
      return `${day} ${hour}`;
    }
    if (hour) {
      return `${hour} ${minute}`;
    }
    if (minute) {
      return `${minute} ${second}`;
    }

    return second;
  };

  return (
    <>
      {hasData ? (
        <Container className={cx("reading-history")}>
          <ReadingHistoryTable
            readingHistories={readingHistories}
            cx={cx}
            calculateCountdown={calculateCountdown}
          />
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
