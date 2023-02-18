import PropTypes from "prop-types";
import { memo } from "react";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

import { Button } from "components";

function ReadingNav({ cx, chapter, totalChapter, titleId }) {
  return (
    <div className={cx("reading-header__nav")}>
      <Button
        text
        to={`/comic/title/${titleId}/${chapter.order > 1 ? chapter.order - 1 : totalChapter}`}
        className={cx("reading-header__nav__left", chapter.order <= 1 ? "disabled" : "")}
      >
        <IoChevronBackCircleOutline />
      </Button>
      <span className={cx("reading-header__nav__title")} title={chapter.title}>
        {chapter.title}
      </span>
      <Button
        text
        to={`/comic/title/${titleId}/${
          chapter.order < totalChapter ? chapter.order + 1 : totalChapter
        }`}
        className={cx(
          "reading-header__nav__right",
          chapter.order >= totalChapter ? "disabled" : ""
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
    title: PropTypes.string.isRequired,
  }).isRequired,
  totalChapter: PropTypes.number.isRequired,
  titleId: PropTypes.string.isRequired,
};

export default memo(ReadingNav);
