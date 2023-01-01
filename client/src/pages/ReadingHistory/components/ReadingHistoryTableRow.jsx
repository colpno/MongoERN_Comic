import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { BiBookmark } from "react-icons/bi";
import classNames from "classnames/bind";

import styles from "../styles/ReadingHistoryTableRow.module.scss";

const cx = classNames.bind(styles);

function ReadingHistoryTableRow({ readingHistories }) {
  return (
    <>
      {readingHistories.map((data) => {
        const { history, title, chapter } = data;

        return (
          <Row className={cx("reading-history__container__content")} key={history._id}>
            <Col md={8} className={cx("reading-history__container__content__title-info")}>
              <div className={cx("box-img")}>
                <img src={title.cover.source} alt={title.title} className={cx("cover-image")} />
              </div>
              <div>
                <p className={cx("title")}>{title.title}</p>
                <p className={cx("chapter-number")}>
                  <BiBookmark className={cx("bookmark-icon")} />
                  Chương: {chapter.title}
                </p>
              </div>
            </Col>
            <Col className="center">
              <span>{`Đọc cách đây ${moment(history.updatedAt).fromNow()}`}</span>
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
      history: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }).isRequired,
      chapter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default ReadingHistoryTableRow;
