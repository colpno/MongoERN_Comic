import Button from "components/Button";
import PropTypes from "prop-types";
import { memo } from "react";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

function ReadingNav({ cx, chapter, title, titleId }) {
  return (
    <div className={cx("reading-header__nav")}>
      <Button
        text
        to={`/comic/title/${titleId}/${
          chapter.order > 1 ? chapter.order - 1 : title.totalChapter
        }`}
        className={cx(
          "reading-header__nav__left",
          chapter.order <= 1 ? "disabled" : ""
        )}
      >
        <IoChevronBackCircleOutline />
      </Button>
      <span
        className={cx("reading-header__nav__title")}
        title={chapter.titleName}
      >
        {chapter.titleName}
      </span>
      <Button
        text
        to={`/comic/title/${titleId}/${
          chapter.order < title.totalChapter
            ? chapter.order + 1
            : title.totalChapter
        }`}
        className={cx(
          "reading-header__nav__right",
          chapter.order >= title.totalChapter ? "disabled" : ""
        )}
      >
        <IoChevronForwardCircleOutline />
      </Button>
    </div>
  );
}

ReadingNav.propTypes = {
  cx: PropTypes.func.isRequired,
  chapter: PropTypes.shape({
    order: PropTypes.number.isRequired,
    titleName: PropTypes.string.isRequired,
    title: PropTypes.shape({
      titleName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  title: PropTypes.shape({
    totalChapter: PropTypes.number.isRequired,
  }).isRequired,
  titleId: PropTypes.string.isRequired,
};

export default memo(ReadingNav);
