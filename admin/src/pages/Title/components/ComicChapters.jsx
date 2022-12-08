/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { ChargeIcon, CircleC, CircleP } from "assets/images";
import Button from "components/Button";
import { NoData } from "features";
import styles from "pages/Title/assets/styles/ComicChapters.module.scss";
import { convertToDateString, formatTime } from "utils/convertTime";
import { separateNumberDigit } from "utils";

const cx = classNames.bind(styles);

function ComicChapters({ title, chapters, user, isDESCSorting, sorting }) {
  return (
    <>
      {chapters.length > 0 ? (
        <div className={cx("chapters")}>
          <div className={cx("chapters__head")}>
            <span className="chapters__head__total">
              Số chương hiện tại:
              <strong className={cx("chapters__head__total__number")}>
                {title.totalChapter}
              </strong>
            </span>
            {/* TODO: sorting chapters */}
            <Button
              text
              className={cx("chapters__head__sorting")}
              onClick={() => sorting("order")}
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
                  to={`${useLocation().pathname}/${chapter.guid}`}
                  className={cx("chapters__content__chapter")}
                  key={chapter.guid}
                >
                  <div className={cx("chapters__content__chapter__box-img")}>
                    <img src={chapter.cover} alt={chapter.name} />
                  </div>
                  <div className={cx("chapters__content__chapter__info")}>
                    <h4 className={cx("title")}>{chapter.name}</h4>
                    <div className={`like ${cx("like")}`}>
                      <AiFillHeart />
                      <span>{separateNumberDigit(chapter.like)}</span>
                    </div>
                    <small className={cx("release-date")}>
                      {convertToDateString(day, month, year)}
                    </small>
                  </div>
                  {/* TODO: if chapter cost coin or point then show pop up when click on a chapter */}
                  {/* TODO: when bought, free btn is showed up instead up others */}
                  <div className={cx("chapters__content__chapter__price")}>
                    {/* {!freeVisible && ( */}
                    <Button
                      outline
                      success
                      className={cx("chapters__content__chapter__price__free")}
                    >
                      Miễn phí
                    </Button>
                    {/* )} */}
                    {/* {chargeVisible && (
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
                    )} */}
                    {/* {chapter.charge && (chapter.point || chapter.coin) && (
                      <div className={cx("divider")} />
                    )} */}
                    {/* {pointVisible && (
                      <div
                        className={cx(
                          "chapters__content__chapter__price__point"
                        )}
                      >
                        <span>{title.point}</span>
                        <CircleP />
                      </div>
                    )} */}
                    {/* {chapter.point && chapter.coin && (
                      <div className={cx("divider")} />
                    )}
                    {coinVisible && (
                      <div
                        className={cx(
                          "chapters__content__chapter__price__coin"
                        )}
                      >
                        <span>{title.coin}</span>
                        <CircleC />
                      </div>
                    )} */}
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
    totalChapter: PropTypes.number.isRequired,
  }).isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      cost: PropTypes.bool.isRequired,
      order: PropTypes.number.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      like: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  user: PropTypes.shape({
    // paid: PropTypes.bool.isRequired,
  }).isRequired,
  isDESCSorting: PropTypes.bool.isRequired,
  sorting: PropTypes.func.isRequired,
};

export default memo(ComicChapters);
