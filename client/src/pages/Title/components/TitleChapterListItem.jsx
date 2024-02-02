import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Button } from "components";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { separateNumberDigit } from "utils";
import { convertToDateString, formatTime } from "utils/convertTime";
import TitleChapterPriceButton from "./TitleChapterPriceButton.jsx";
import styles from "../styles/ComicChapters.module.scss";

const cx = classNames.bind(styles);

function TitleChapterListItem({ user, title, chapter, checkIsPurchased, onOpenPurchasedBox }) {
  const { day, month, year } = formatTime(chapter.createdAt);
  const isOwned = checkIsPurchased(chapter._id) || title.user_id === user._id;
  const isFree = !chapter.cost;
  const canRead = isOwned || isFree;

  return (
    <Button
      wrapper
      to={canRead ? `${chapter.order}` : ""}
      className={cx("chapters__content__chapter")}
      onClick={() => !canRead && onOpenPurchasedBox(chapter)}
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
        <small className={cx("release-date")}>{convertToDateString(day, month, year)}</small>
      </div>
      <div className={cx("chapters__content__chapter__price")}>
        <TitleChapterPriceButton isOwned={isOwned} isFree={isFree} />
      </div>
    </Button>
  );
}

TitleChapterListItem.propTypes = {
  chapter: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    cost: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
  }).isRequired,
  checkIsPurchased: PropTypes.func.isRequired,
  onOpenPurchasedBox: PropTypes.func.isRequired,
};

export default TitleChapterListItem;
