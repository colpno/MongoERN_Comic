import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BiBookmark } from "react-icons/bi";

function ReadingHistoryTableRow({ readingHistories, cx, calculateCountdown }) {
  return (
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
              className={cx("reading-history__container__content__title-info")}
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
  );
}

ReadingHistoryTableRow.propTypes = {
  readingHistories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      chapter: PropTypes.string.isRequired,
      readTime: PropTypes.string.isRequired,
      title: PropTypes.shape({
        coverImage: PropTypes.string.isRequired,
        titleName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
  calculateCountdown: PropTypes.func.isRequired,
};

export default ReadingHistoryTableRow;
