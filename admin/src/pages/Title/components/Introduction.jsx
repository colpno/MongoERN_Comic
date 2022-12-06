import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillCopy, AiFillEye, AiFillHeart, AiFillStar } from "react-icons/ai";

import Button from "components/Button";
import styles from "pages/Title/assets/styles/introduction.module.scss";
import { roundNumByUnit } from "utils";

const cx = classNames.bind(styles);

function Introduction({ title, firstChapter, genres, setPopup, handleFollow }) {
  const handlePopupContent = () => {
    setPopup({
      trigger: true,
      title: "Mô tả",
      content: (
        <div className={cx("popup-summary")}>
          <span>{title.summary}</span>
        </div>
      ),
    });
  };

  return (
    <Container fluid="md" className={cx("introduction")}>
      <Row>
        <Col md={12} lg={5} className={cx("box-img")}>
          <img src={title.cover} alt={title.name} />
        </Col>
        <Col md={12} lg={7} className={cx("introduction__info")}>
          <h4 className={cx("title")}>{title.name}</h4>
          <div className={cx("introduction__info__statistic")}>
            <span className="like">
              <AiFillHeart />
              <span>{roundNumByUnit(title.like)}</span>
            </span>
            <span className="view">
              <AiFillEye />
              <span>{roundNumByUnit(title.view)}</span>
            </span>
          </div>
          <div className={cx("introduction__info__detail")}>
            <small className={cx("author")}>{title.author}</small>
            <small className={cx("genres")}>{genres}</small>
            <small className={cx("summary")}>
              {title.summary.slice(
                0,
                title.summary.slice(0, 135).lastIndexOf(" ")
              )}
              {title.summary.length >= 135 && (
                <>
                  <span> ... </span>
                  <Button
                    text
                    className={cx("more")}
                    onClick={handlePopupContent}
                  >
                    Xem thêm
                  </Button>
                </>
              )}
            </small>
          </div>
          <div className={cx("button-container")}>
            {/* TODO: add to favorite list */}
            <Button outline large onClick={() => handleFollow(title.guid)}>
              <AiFillStar />
              Theo dõi
            </Button>
            {firstChapter && (
              <Button to={firstChapter} primary large>
                <AiFillCopy />
                Đọc chương đầu
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Introduction.propTypes = {
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    guid: PropTypes.string.isRequired,
  }).isRequired,
  genres: PropTypes.string.isRequired,
  handleFollow: PropTypes.func.isRequired,
  firstChapter: PropTypes.string.isRequired,
};

export default memo(Introduction);
