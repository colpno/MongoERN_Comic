import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { BiBookmark } from "react-icons/bi";

function ReadingHistoryTableRow({ readingHistories, cx }) {
  const calculateCountdown = (now, time) => {
    const duration = moment.duration(moment(now).diff(time));

    if (duration.years() > 1) {
      return `${duration.years()} năm ${duration.months()} tháng`;
    }
    if (duration.months() > 1) {
      return `${duration.months()} tháng ${duration.days()} ngày`;
    }
    if (duration.days() > 1) {
      return `${duration.days()} ngày ${duration.hours()} giờ`;
    }
    if (duration.hours() > 1) {
      return `${duration.hours()} giờ ${duration.minutes()} phút`;
    }
    if (duration.minutes() > 1) {
      return `${duration.minutes()} phút ${duration.seconds()} giây`;
    }

    return `${duration.seconds()} giây`;
  };
  const now = moment().format("YYYY-MM-DD hh:mm:ss");

  return (
    <>
      {readingHistories.map((history) => {
        const { title, id, chapter, updatedAt } = history;

        return (
          <Row className={cx("reading-history__container__content")} key={id}>
            <Col
              md={8}
              className={cx("reading-history__container__content__title-info")}
            >
              <div className={cx("box-img")}>
                <img
                  src={title.cover}
                  alt={title.name}
                  className={cx("cover-image")}
                />
              </div>
              <div>
                <p className={cx("title")}>{title.name}</p>
                <p className={cx("chapter-number")}>
                  <BiBookmark className={cx("bookmark-icon")} />
                  Chương: {chapter.name}
                </p>
              </div>
            </Col>
            <Col className="center">
              <span>{`Đọc cách đây ${calculateCountdown(
                now,
                updatedAt
              )}`}</span>
            </Col>
          </Row>
        );
      })}
    </>
  );
}

ReadingHistoryTableRow.propTypes = {
  readingHistories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      chapter: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      updatedAt: PropTypes.string.isRequired,
      title: PropTypes.shape({
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default ReadingHistoryTableRow;
