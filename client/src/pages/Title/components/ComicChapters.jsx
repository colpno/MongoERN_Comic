/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";

import { CircleC, CircleP } from "assets/images";
import { Button } from "components";
import { NoData } from "features";
import { separateNumberDigit } from "utils";
import { convertToDateString, formatTime } from "utils/convertTime";
import styles from "../styles/ComicChapters.module.scss";

const cx = classNames.bind(styles);

function ComicChapters({
  title,
  chapters,
  user,
  isDESCSorting,
  handleSorting,
}) {
  return (
    <>
      {chapters.length > 0 ? (
        <div className={cx("chapters")}>
          <div className={cx("chapters__head")}>
            <span className="chapters__head__total">
              Số chương hiện tại:
              <strong className={cx("chapters__head__total__number")}>
                {title.total_chapter}
              </strong>
            </span>
            <Button
              text
              className={cx("chapters__head__sorting")}
              onClick={handleSorting}
            >
              {isDESCSorting ? <BsSortNumericUp /> : <BsSortNumericDown />}
              <span>Sắp xếp</span>
            </Button>
          </div>
          <div className={cx("chapters__content")}>
            {chapters.map((chapter) => {
              const { day, month, year } = formatTime(chapter.createdAt);

              return (
                <Button
                  wrapper
                  to={chapter._id}
                  className={cx("chapters__content__chapter")}
                  key={chapter._id}
                >
                  <div className={cx("chapters__content__chapter__box-img")}>
                    <img src={chapter.cover.source} alt={chapter.title} />
                  </div>
                  <div className={cx("chapters__content__chapter__info")}>
                    <h4 className={cx("title")}>{chapter.title}</h4>
                    <div className={`like ${cx("like")}`}>
                      <AiFillHeart />
                      <span>{separateNumberDigit(chapter.like)}</span>
                    </div>
                    <small className={cx("release-date")}>
                      {convertToDateString(day, month, year)}
                    </small>
                  </div>
                  <div className={cx("chapters__content__chapter__price")}>
                    {!chapter.cost && (
                      <Button
                        outline
                        success
                        className={cx(
                          "chapters__content__chapter__price__free"
                        )}
                      >
                        Miễn phí
                      </Button>
                    )}
                    {/* TODO: {title.chargeTime !== 0 && (
                      <Button
                        outline
                        success
                        className={cx(
                          "chapters__content__chapter__price__charge"
                        )}
                      >
                        <div className={cx("charge__icon")}>
                          <ChargeIcon className={cx("charge-icon")} />
                          <span className={cx("charge__icon__label")}>
                            {title.chargeTime}
                          </span>
                        </div>
                        Mien phi
                      </Button>
                      <div className={cx("divider")} />
                    )} */}
                    {chapter.cost && (
                      <>
                        <div
                          className={cx(
                            "chapters__content__chapter__price__point"
                          )}
                        >
                          <span>{title.point}</span>
                          <CircleP />
                        </div>
                        <div className={cx("divider")} />
                        <div
                          className={cx(
                            "chapters__content__chapter__price__coin"
                          )}
                        >
                          <span>{title.coin}</span>
                          <CircleC />
                        </div>
                      </>
                    )}
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
    total_chapter: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
    // TODO: chargeTime: PropTypes.number.isRequired,
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
    // TODO paid: PropTypes.bool.isRequired,
  }).isRequired,
  isDESCSorting: PropTypes.bool.isRequired,
  handleSorting: PropTypes.func.isRequired,
};

export default memo(ComicChapters);
