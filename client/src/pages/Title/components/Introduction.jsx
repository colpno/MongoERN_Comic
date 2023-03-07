import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Fragment, memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiFillCopy, AiFillEye, AiFillHeart, AiFillStar } from "react-icons/ai";

import { Button } from "components";
import { roundNumByUnit } from "utils";
import styles from "../styles/Introduction.module.scss";

const cx = classNames.bind(styles);

function Introduction({ title, genres, firstChapter, setPopup, handleFollow }) {
  const sortGenres = () => {
    const genreLength = title.genres.length - 1;
    const sortedGenres = [...title.genres].sort();

    return (
      <>
        {sortedGenres.map((genre, index) => {
          const genreObj = genres.find((genr) => genr.name === genre);
          const redirect = genreObj ? `/content-list/${genreObj._id}` : null;

          return (
            <Fragment key={index}>
              <Button to={redirect} wrapper className={cx("genre")}>
                {genre}
              </Button>
              {index !== genreLength ? ", " : null}
            </Fragment>
          );
        })}
      </>
    );
  };

  const handlePopupContent = () => {
    setPopup({
      isShown: true,
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
          <img src={title.cover.source} alt={title.title} />
        </Col>
        <Col md={12} lg={7} className={cx("introduction__info")}>
          <h4 className={cx("title")}>{title.title}</h4>
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
            <small className={cx("genres")}>{sortGenres()}</small>
            <small className={cx("summary")}>
              {title.summary.slice(0, title.summary.slice(0, 135).lastIndexOf(" "))}
              {title.summary.length >= 135 && (
                <>
                  <span> ... </span>
                  <Button text className={cx("more")} onClick={handlePopupContent}>
                    Xem thêm
                  </Button>
                </>
              )}
            </small>
          </div>
          <div className={cx("button-container")}>
            <Button outline large onClick={() => handleFollow(title._id)}>
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
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleFollow: PropTypes.func.isRequired,
  firstChapter: PropTypes.string.isRequired,
};

export default memo(Introduction);
