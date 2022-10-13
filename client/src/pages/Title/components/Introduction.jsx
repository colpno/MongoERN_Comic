import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";
import { AiFillCopy, AiFillEye, AiFillHeart, AiFillStar } from "react-icons/ai";

import Button from "components/Button";
import styles from "pages/Title/assets/styles/introduction.module.scss";
import { roundNumByUnit } from "utils";

const cx = classNames.bind(styles);

function Introduction({ title, genres, setPopup }) {
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
    <Container className={cx("introduction")}>
      <div className={cx("box-img")}>
        <img src={title.coverImage} alt={title.titleName} />
      </div>
      <div className={cx("introduction__info")}>
        <h4 className={cx("title")}>{title.titleName}</h4>
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
          <small className={cx("author")}>{title.authors}</small>
          <small className={cx("genres")}>{genres}</small>
          <small className={cx("summary")}>
            {`${title.summary.slice(
              0,
              title.summary.slice(0, 135).lastIndexOf(" ")
            )} ... `}
            <Button text className={cx("more")} onClick={handlePopupContent}>
              Xem thêm
            </Button>
          </small>
        </div>
        <div className={cx("introduction__info__interact")}>
          {/* TODO: add to favorite list */}
          <Button outline large>
            <AiFillStar />
            Theo dõi
          </Button>
          <Button to="1" primary large>
            <AiFillCopy />
            Đọc chương đầu
          </Button>
        </div>
      </div>
    </Container>
  );
}

Introduction.propTypes = {
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    coverImage: PropTypes.string.isRequired,
    titleName: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
    authors: PropTypes.string.isRequired,
    genreId: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
  genres: PropTypes.string.isRequired,
};

export default memo(Introduction);
