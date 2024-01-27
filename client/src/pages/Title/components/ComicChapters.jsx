import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";

import { CircleC, CircleP } from "assets/images";
import { Button } from "components";
import { NoData } from "features";
import { separateNumberDigit } from "utils";
import { convertToDateString, formatTime } from "utils/convertTime";
import styles from "../styles/ComicChapters.module.scss";

const cx = classNames.bind(styles);

function PriceButton({ isOwned, isFree, title }) {
  const isUsePoint = title.point > 0;
  // const isUseCharge = title.chargeTime > 0;

  if (isOwned) {
    return (
      <Button
        outline
        success
        className={cx("chapters__content__chapter__price__free")}
        element="div"
      >
        Đã sở hữu
      </Button>
    );
  }

  if (isFree) {
    return (
      <Button
        outline
        success
        className={cx("chapters__content__chapter__price__free")}
        element="div"
      >
        Miễn phí
      </Button>
    );
  }

  return (
    <>
      {/* {isUseCharge && (
        <>
          <Button outline success className={cx("chapters__content__chapter__price__charge")}>
            <div className={cx("charge__icon")}>
              <ChargeIcon className={cx("charge-icon")} />
              <span className={cx("charge__icon__label")}>{title.chargeTime}</span>
            </div>
            Mien phi
          </Button>
          <div className={cx("divider")} />
        </>
      )} */}
      {isUsePoint && (
        <>
          <div className={cx("chapters__content__chapter__price__point")}>
            <span>{title.point}</span>
            <CircleP />
          </div>
          <div className={cx("divider")} />
        </>
      )}
      <div className={cx("chapters__content__chapter__price__coin")}>
        <span>{title.coin}</span>
        <CircleC />
      </div>
    </>
  );
}

function ComicChapters({
  title,
  chapters,
  user,
  purchasedHistories,
  isDESCSorting,
  handleSorting,
  handleOpenPurchaseBox,
}) {
  const findPurchasedChapter = (chapterId) => {
    const isPurchased = purchasedHistories.some((history) => history.chapter_id._id === chapterId);
    return isPurchased;
  };

  return (
    <>
      {chapters.length > 0 ? (
        <div className={cx("chapters")}>
          <div className={cx("chapters__head")}>
            <span className="chapters__head__total">
              Số chương hiện tại:
              <strong className={cx("chapters__head__total__number")}>{title.total_chapter}</strong>
            </span>
            <Button text className={cx("chapters__head__sorting")} onClick={handleSorting}>
              {isDESCSorting ? <BsSortNumericUp /> : <BsSortNumericDown />}
              <span>Sắp xếp</span>
            </Button>
          </div>
          <div className={cx("chapters__content")}>
            {chapters.map((chapter) => {
              const { day, month, year } = formatTime(chapter.createdAt);
              const isOwned = findPurchasedChapter(chapter._id) || title.user_id === user._id;
              const isFree = !chapter.cost;
              const canRead = isOwned || isFree;

              return (
                <Button
                  wrapper
                  to={canRead ? `${chapter.order}` : ""}
                  className={cx("chapters__content__chapter")}
                  onClick={() => !canRead && handleOpenPurchaseBox(chapter)}
                  key={chapter._id}
                >
                  <div className={cx("chapters__content__chapter__box-img")}>
                    <img src={chapter.cover.source} alt={chapter.title} />
                  </div>
                  <div className={cx("chapters__content__chapter__info")}>
                    <h4 className={cx("title")}>{chapter.title}</h4>
                    <div className={cx("popular-numbers")}>
                      <div className={`like ${cx("like")}`}>
                        <AiFillHeart />
                        <span>{separateNumberDigit(chapter.like)}</span>
                      </div>
                      <span className={`view ${cx("view")}`}>
                        <AiFillEye />
                        <span>{separateNumberDigit(chapter.view)}</span>
                      </span>
                    </div>
                    <small className={cx("release-date")}>
                      {convertToDateString(day, month, year)}
                    </small>
                  </div>
                  <div className={cx("chapters__content__chapter__price")}>
                    <PriceButton isOwned={isOwned} isFree={isFree} title={title} />
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        <NoData>
          <h6>Hiện tại truyện không có chương nào!</h6>
          <small>Xin vui lòng chờ cập nhật!</small>
        </NoData>
      )}
      {}
    </>
  );
}

ComicChapters.propTypes = {
  title: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    total_chapter: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    // chargeTime: PropTypes.number.isRequired,
  }).isRequired,

  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.bool.isRequired,
      order: PropTypes.number.isRequired,
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      like: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,

  purchasedHistories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      chapter_id: PropTypes.string.isRequired,
    }).isRequired
  ),

  isDESCSorting: PropTypes.bool.isRequired,
  handleSorting: PropTypes.func.isRequired,
  handleOpenPurchaseBox: PropTypes.func.isRequired,
};

ComicChapters.defaultProps = {
  purchasedHistories: [],
};

PriceButton.propTypes = {
  isOwned: PropTypes.bool.isRequired,
  isFree: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    total_chapter: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    // chargeTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(ComicChapters);
