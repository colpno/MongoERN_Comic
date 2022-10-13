import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiBookmark } from "react-icons/bi";

import readingHistoriesApi from "api/readingHistoryApi";
import GridTable from "components/GridTable";
import NoData from "features/NoData";
import { countdown } from "utils/convertTime";
import styles from "./ReadingHistory.module.scss";

const cx = classNames.bind(styles);

function ReadingHistory() {
  const userId = 1;
  const [readingHistories, setReadingHistories] = useState([]);
  const hasData = readingHistories.length > 0;

  useEffect(() => {
    const fetchReadingHistories = async () => {
      try {
        const response = await readingHistoriesApi.getAll(userId, {
          _limit: 25,
          _page: 1,
        });
        setReadingHistories(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchReadingHistories();
  }, []);

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
          <GridTable
            head={[
              { label: "Hiển thị 25 nội dung được đọc gần đây nhất", md: 8 },
              { label: "Ngày đọc", center: true },
            ]}
          >
            <>
              {readingHistories.map((history) => {
                const { title } = history;

                return (
                  <Row
                    className={cx("reading-history__container__content")}
                    key={history.id}
                  >
                    <Col
                      md={8}
                      className={cx(
                        "reading-history__container__content__title-info"
                      )}
                    >
                      <div className={cx("box-img")}>
                        <img
                          src={title.coverImage}
                          alt={title.titleName}
                          className={cx("cover-image")}
                        />
                      </div>
                      <div>
                        <p className={cx("title")}>{title.titleName}</p>
                        <p className={cx("chapter-number")}>
                          <BiBookmark className={cx("bookmark-icon")} />
                          Chương {history.chapter}
                        </p>
                      </div>
                    </Col>
                    <Col className="center">
                      <span>{`Đọc cách đây ${calculateCountdown(
                        history.readTime
                      )}`}</span>
                    </Col>
                  </Row>
                );
              })}
            </>
          </GridTable>
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
